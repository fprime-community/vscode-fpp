import * as vscode from 'vscode';
import * as path from 'path';

import * as Settings from './settings';

/**
 * Resolves the `fpp_lsp_server` executable to launch.
 *
 * The server ships as the pip distribution `fprime-fpp-lsp`, which installs a
 * console-script executable named `fpp_lsp_server` inside a venv's scripts
 * directory (`bin/` on POSIX, `Scripts/` on Windows). This module discovers
 * that executable so users don't have to hand-configure `fpp.serverPath`:
 *
 *   1. Explicit `fpp.serverPath` setting (verbatim, current behavior).
 *   2. The `fpp_lsp_server` executable inside the workspace's Python venv,
 *      discovered via the ms-python.python extension or by scanning for a venv.
 *   3. `fpp_lsp_server` on `PATH` (user activated the venv in their shell).
 *   4. If a venv exists but the package is not installed, prompt to
 *      `pip install fprime-fpp-lsp` and re-resolve.
 */

/** The distribution name on PyPI. */
const PIP_PACKAGE = 'fprime-fpp-lsp';

/** The console-script executable installed by the wheel. */
const EXE_NAME = 'fpp_lsp_server';

/** Sentinel historically documented in `fpp.serverPath` for "use the bundled binary". */
const DEFAULT_SENTINEL = '<default>';

const isWindows = process.platform === 'win32';

/** A discovered virtual environment and the resolved server executable within it. */
interface VenvInfo {
    /** Root directory of the venv (the dir containing `bin`/`Scripts` and `pyvenv.cfg`). */
    venvRoot: string;
    /** Absolute path to where `fpp_lsp_server` would live in this venv. */
    exePath: string;
    /** Absolute path to the venv's Python interpreter. */
    pythonPath: string;
    /** True if `exePath` currently exists on disk. */
    exeExists: boolean;
}

/**
 * Minimal shape of the ms-python.python extension API we consume.
 * See https://github.com/microsoft/vscode-python/blob/main/src/client/api/types.ts
 */
interface PythonExtensionApi {
    environments: {
        getActiveEnvironmentPath(resource?: vscode.Uri): { path: string; id: string };
        resolveEnvironment(
            env: { path: string; id: string } | string
        ): Promise<PythonEnvironment | undefined>;
    };
}

interface PythonEnvironment {
    executable: { uri?: vscode.Uri; sysPrefix?: string };
    environment?: { folderUri?: vscode.Uri };
}

/** The scripts subdirectory of a venv, platform-dependent. */
function scriptsDir(venvRoot: string): string {
    return path.join(venvRoot, isWindows ? 'Scripts' : 'bin');
}

/** Absolute path to the Python interpreter inside a venv root. */
function pythonPathIn(venvRoot: string): string {
    return path.join(scriptsDir(venvRoot), isWindows ? 'python.exe' : 'python');
}

async function pathExists(p: string): Promise<boolean> {
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(p));
        return true;
    } catch {
        return false;
    }
}

/**
 * Build a `VenvInfo` from a venv root. The interpreter and `fpp_lsp_server` both
 * live in the venv's scripts directory.
 */
async function venvInfo(venvRoot: string): Promise<VenvInfo> {
    return venvInfoFromInterpreter(pythonPathIn(venvRoot), venvRoot);
}

/**
 * Build a `VenvInfo` from an actual interpreter path. `fpp_lsp_server` is
 * installed alongside the interpreter in the same scripts directory, so we
 * resolve the executable relative to the interpreter rather than reconstructing
 * `<root>/bin` (which can be wrong for non-standard layouts).
 */
async function venvInfoFromInterpreter(
    pythonPath: string,
    venvRoot: string
): Promise<VenvInfo> {
    const scripts = path.dirname(pythonPath);
    const exePath = path.join(scripts, isWindows ? `${EXE_NAME}.exe` : EXE_NAME);
    return {
        venvRoot,
        exePath,
        pythonPath,
        exeExists: await pathExists(exePath),
    };
}

/**
 * Derive the venv root from an interpreter path. Interpreters live in the venv's
 * scripts directory (`<root>/bin/python` or `<root>\Scripts\python.exe`), so the
 * root is two levels up.
 */
function venvRootFromInterpreter(interpreterPath: string): string {
    return path.dirname(path.dirname(interpreterPath));
}

/** Query the ms-python.python extension for the active interpreter, if available. */
async function venvFromPythonExtension(
    resource: vscode.Uri | undefined
): Promise<VenvInfo | undefined> {
    try {
        const ext = vscode.extensions.getExtension<PythonExtensionApi>('ms-python.python');
        if (!ext) {
            return undefined;
        }
        const api = ext.isActive ? ext.exports : await ext.activate();
        const active = api.environments.getActiveEnvironmentPath(resource);
        if (!active?.path) {
            return undefined;
        }
        const resolved = await api.environments.resolveEnvironment(active);
        const interpreter = resolved?.executable.uri?.fsPath ?? active.path;
        // The extension can report a stale selection whose interpreter no longer
        // exists on disk. Don't trust it — fall through to scanning instead, so we
        // never build a pip command around a missing python.
        if (!(await pathExists(interpreter))) {
            return undefined;
        }
        const venvRoot = resolved?.executable.sysPrefix ?? venvRootFromInterpreter(interpreter);
        return await venvInfoFromInterpreter(interpreter, venvRoot);
    } catch {
        // The Python extension is optional; any failure just falls through to scanning.
        return undefined;
    }
}

/** Scan the primary workspace folder for a conventional venv directory. */
async function venvFromScan(): Promise<VenvInfo | undefined> {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) {
        return undefined;
    }
    // `fprime-venv` is the canonical venv name for F Prime projects; check it first.
    for (const name of ['fprime-venv', '.venv', 'venv', 'env']) {
        const root = path.join(folder.uri.fsPath, name);
        // A real venv has a `pyvenv.cfg` marker at its root.
        if (await pathExists(path.join(root, 'pyvenv.cfg'))) {
            return await venvInfo(root);
        }
    }
    return undefined;
}

/**
 * Locate the workspace venv, honoring (in order): the explicit `fpp.pythonVenv`
 * setting, the ms-python.python extension, then a directory scan.
 */
async function findVenv(): Promise<VenvInfo | undefined> {
    const override = Settings.pythonVenv();
    if (override) {
        return await venvInfo(override);
    }

    const resource = vscode.workspace.workspaceFolders?.[0]?.uri;
    return (await venvFromPythonExtension(resource)) ?? (await venvFromScan());
}

/**
 * Prompt the user to install `fprime-fpp-lsp` into the given venv and run
 * `python -m pip install` as a task. Resolves to true if the install completed
 * successfully.
 */
async function promptInstall(venv: VenvInfo): Promise<boolean> {
    const choice = await vscode.window.showInformationMessage(
        `${PIP_PACKAGE} is not installed in the workspace venv (${venv.venvRoot}). Install it?`,
        'Install',
        'Cancel'
    );
    if (choice !== 'Install') {
        return false;
    }

    const execution = new vscode.ShellExecution(venv.pythonPath, [
        '-m',
        'pip',
        'install',
        PIP_PACKAGE,
    ]);
    const task = new vscode.Task(
        { type: 'fpp-pip-install' },
        vscode.TaskScope.Workspace,
        `Install ${PIP_PACKAGE}`,
        'fpp',
        execution
    );

    const exitCode = await new Promise<number | undefined>((resolve) => {
        const disposable = vscode.tasks.onDidEndTaskProcess((e) => {
            if (e.execution.task === task) {
                disposable.dispose();
                resolve(e.exitCode);
            }
        });
        void vscode.tasks.executeTask(task);
    });

    if (exitCode === 0) {
        return true;
    }
    vscode.window.showErrorMessage(
        `Failed to install ${PIP_PACKAGE} (pip exited with code ${exitCode}).`
    );
    return false;
}

/**
 * Resolve the server executable to launch, or `undefined` if none could be found
 * and the user declined to install one. May show install prompts / error messages.
 */
export async function resolveServerPath(): Promise<string | undefined> {
    // 1. Explicit setting wins (ignore the legacy `<default>` sentinel).
    const configured = Settings.serverPath();
    if (configured && configured !== DEFAULT_SENTINEL) {
        return configured;
    }

    // 2. Executable inside the workspace venv.
    const venv = await findVenv();
    if (venv?.exeExists) {
        return venv.exePath;
    }

    // 3. `fpp_lsp_server` on PATH (venv activated in the user's shell, or global install).
    //    LanguageClient spawns via the shell's PATH, so a bare command works if resolvable.
    if (await onPath()) {
        return EXE_NAME;
    }

    // 4. Venv found but package missing — offer to install, then re-resolve.
    if (venv) {
        if (await promptInstall(venv)) {
            const after = await venvInfo(venv.venvRoot);
            if (after.exeExists) {
                return after.exePath;
            }
        }
        return undefined;
    }

    // Nothing to go on: guide the user to configure a server path.
    const pick = await vscode.window.showErrorMessage(
        'Could not find the FPP language server. Install it with ' +
            `\`pip install ${PIP_PACKAGE}\` into a workspace venv, or set \`fpp.serverPath\`.`,
        'Open Settings'
    );
    if (pick === 'Open Settings') {
        void vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'fpp.serverPath'
        );
    }
    return undefined;
}

/** Check whether `fpp_lsp_server` is resolvable on the current `PATH`. */
async function onPath(): Promise<boolean> {
    const pathVar = process.env.PATH ?? '';
    const sep = isWindows ? ';' : ':';
    const exts = isWindows ? ['.exe', '.cmd', '.bat', ''] : [''];
    for (const dir of pathVar.split(sep)) {
        if (!dir) {
            continue;
        }
        for (const ext of exts) {
            if (await pathExists(path.join(dir, EXE_NAME + ext))) {
                return true;
            }
        }
    }
    return false;
}
