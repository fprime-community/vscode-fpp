import * as vscode from 'vscode';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Read/write helper for the `.fpp-lsp` project configuration file.
 *
 * `.fpp-lsp` is a `.clangd`-style YAML file at the workspace root that is the
 * single source of truth for how the FPP language server indexes a project.
 * The server discovers and loads it; this module lets the VSCode UI populate it
 * (e.g. after the user picks a `locs.fpp`). Writes preserve any sibling keys the
 * user added by hand (comments are not preserved — js-yaml does not round-trip
 * them).
 */

const CONFIG_FILE_NAME = '.fpp-lsp';

export interface FppLspConfig {
    buildCache?: string;
    locs?: string;
    scanWorkspace?: boolean;
}

/** The workspace folder that owns the `.fpp-lsp`, or undefined if no folder is open. */
function primaryFolder(): vscode.WorkspaceFolder | undefined {
    return vscode.workspace.workspaceFolders?.[0];
}

function configUri(folder: vscode.WorkspaceFolder): vscode.Uri {
    return vscode.Uri.joinPath(folder.uri, CONFIG_FILE_NAME);
}

/** Read and parse `.fpp-lsp` from the primary workspace folder, or undefined if absent/invalid. */
export async function readConfig(): Promise<FppLspConfig | undefined> {
    const folder = primaryFolder();
    if (!folder) {
        return undefined;
    }

    try {
        const bytes = await vscode.workspace.fs.readFile(configUri(folder));
        const parsed = yaml.load(Buffer.from(bytes).toString('utf8'));
        return (parsed && typeof parsed === 'object') ? parsed as FppLspConfig : {};
    } catch {
        // Missing file (or parse error) — treat as no config.
        return undefined;
    }
}

/**
 * Apply an update to `.fpp-lsp`, preserving other keys. If the file does not
 * exist the user is prompted before it is created. Returns true if the file was
 * written.
 */
async function updateConfig(mutate: (cfg: FppLspConfig) => void): Promise<boolean> {
    const folder = primaryFolder();
    if (!folder) {
        vscode.window.showErrorMessage('Open a folder to configure an FPP project.');
        return false;
    }

    const uri = configUri(folder);
    let existing: FppLspConfig | undefined;
    try {
        const bytes = await vscode.workspace.fs.readFile(uri);
        const parsed = yaml.load(Buffer.from(bytes).toString('utf8'));
        existing = (parsed && typeof parsed === 'object') ? parsed as FppLspConfig : {};
    } catch {
        existing = undefined;
    }

    if (existing === undefined) {
        const choice = await vscode.window.showInformationMessage(
            `Create a ${CONFIG_FILE_NAME} file to configure the FPP project?`,
            { modal: false },
            'Create'
        );
        if (choice !== 'Create') {
            return false;
        }
        existing = {};
    }

    mutate(existing);

    const text = yaml.dump(existing);
    await vscode.workspace.fs.writeFile(uri, Buffer.from(text, 'utf8'));
    return true;
}

/** Point the project at a specific `locs.fpp`, stored relative to the workspace folder. */
export async function setLocs(locsFile: vscode.Uri): Promise<boolean> {
    const folder = primaryFolder();
    if (!folder) {
        return false;
    }
    const rel = path.relative(folder.uri.fsPath, locsFile.fsPath);
    return updateConfig((cfg) => {
        cfg.locs = rel;
        delete cfg.scanWorkspace;
    });
}

/** Configure the project to scan the entire workspace for `.fpp` files. */
export async function setScanWorkspace(): Promise<boolean> {
    return updateConfig((cfg) => {
        cfg.scanWorkspace = true;
        delete cfg.locs;
        delete cfg.buildCache;
    });
}

/** Clear the project selection (removes locs/buildCache/scanWorkspace keys). */
export async function clearProject(): Promise<boolean> {
    return updateConfig((cfg) => {
        delete cfg.locs;
        delete cfg.buildCache;
        delete cfg.scanWorkspace;
    });
}

/** A file-system watcher for `.fpp-lsp` changes across the workspace. */
export function watchConfig(): vscode.FileSystemWatcher {
    return vscode.workspace.createFileSystemWatcher(`**/${CONFIG_FILE_NAME}`);
}
