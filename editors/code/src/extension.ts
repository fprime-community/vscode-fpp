import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from "vscode-languageclient/node";

import * as Settings from "./settings";
import { resolveServerPath } from "./serverPath";
import { LocsQuickPickFile, LocsQuickPickItem, LocsQuickPickType } from "./locs";
import { dumpSyntaxTree, reloadWorkspace } from "./lsp_ext";
import * as Config from "./fppLspConfig";
import { registerDiagramSupport } from "./diagram";

let extension: FppExtension;

class FppExtension implements vscode.Disposable {
    private subscriptions: vscode.Disposable[];
    private outputChannel: vscode.OutputChannel;
    private traceOutputChannel: vscode.OutputChannel;

    private projectStatus: vscode.LanguageStatusItem;

    client?: LanguageClient;

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        this.outputChannel = vscode.window.createOutputChannel("FPP");
        this.traceOutputChannel = vscode.window.createOutputChannel("FPP Trace", { log: true });

        this.projectStatus = vscode.languages.createLanguageStatusItem(
            'fpp.project', { language: "fpp" }
        );
        this.projectStatus.name = "FPP Project";
        this.projectStatus.command = { title: "Select", command: "fpp.select" };

        // The `.fpp-lsp` file is the source of truth for project config. Watch it so
        // the status reflects external edits (the server also reloads on change via
        // the client's synchronized file events).
        const configWatcher = Config.watchConfig();
        const refresh = () => { void this.refreshProjectStatus(); };
        configWatcher.onDidCreate(refresh);
        configWatcher.onDidChange(refresh);
        configWatcher.onDidDelete(refresh);

        this.subscriptions = [
            Settings.onLspServerPathChanged(() => {
                this.initializeClient();
            }),
            Settings.onPythonVenvChanged(() => {
                this.initializeClient();
            }),
            this.projectStatus,
            configWatcher,
            this.outputChannel,
            this.traceOutputChannel,
        ];

        void this.refreshProjectStatus();
    }

    async initializeClient() {
        try {
            await this.deactivate();
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to deactivate old language server: ${e}`);
        }

        // Resolve the server executable: explicit setting, then the workspace venv
        // (installing `fprime-fpp-lsp` on request), then PATH. Shows its own
        // guidance if nothing is found.
        const serverPath = await resolveServerPath();
        if (!serverPath) {
            return;
        }

        const serverOptions: ServerOptions = {
            run: {
                command: serverPath,
                transport: TransportKind.stdio,
                args: ["--log-level", Settings.lspServerRunLogLevel()],
                options: {
                    env: {
                        "RUST_BACKTRACE": "1"
                    }
                }
            },
            debug: {
                command: serverPath,
                transport: TransportKind.stdio,
                args: ["--log-level", Settings.lspServerDevLogLevel()],
                options: {
                    env: {
                        "RUST_BACKTRACE": "1"
                    }
                }
            },
        };

        const clientOptions: LanguageClientOptions = {
            documentSelector: [{ language: "fpp" }],
            diagnosticCollectionName: "fpp",
            synchronize: {
                fileEvents: [
                    vscode.workspace.createFileSystemWatcher("**/*.fpp"),
                    vscode.workspace.createFileSystemWatcher("**/*.fppi"),
                    // The server re-runs project discovery when `.fpp-lsp` changes.
                    vscode.workspace.createFileSystemWatcher("**/.fpp-lsp"),
                ],
            },
            outputChannel: this.outputChannel,
            traceOutputChannel: this.traceOutputChannel,
        };

        try {
            this.client = new LanguageClient("fpp", "F Prime Prime", serverOptions, clientOptions);
            await this.client.start();
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to start language server: ${e}`);
        }
    }

    /** Update the language-status item to reflect the current `.fpp-lsp` config. */
    private async refreshProjectStatus() {
        const cfg = await Config.readConfig();
        if (!cfg || (!cfg.locs && !cfg.buildCache && !cfg.scanWorkspace)) {
            this.projectStatus.text = "No FPP project configured";
            this.projectStatus.severity = vscode.LanguageStatusSeverity.Warning;
        } else if (cfg.scanWorkspace) {
            this.projectStatus.text = "FPP: entire workspace";
            this.projectStatus.severity = vscode.LanguageStatusSeverity.Information;
        } else {
            this.projectStatus.text = `FPP: ${cfg.locs ?? cfg.buildCache}`;
            this.projectStatus.severity = vscode.LanguageStatusSeverity.Information;
        }
    }

    /** Ask the server to re-run project discovery and re-index. */
    async reload() {
        await this.client?.sendRequest(reloadWorkspace);
    }

    /** Write a locs selection into `.fpp-lsp` and trigger a reload. */
    async setProjectLocs(locsFile: vscode.Uri) {
        if (await Config.setLocs(locsFile)) {
            await this.reload();
            await this.refreshProjectStatus();
        }
    }

    /** Write a full-workspace selection into `.fpp-lsp` and trigger a reload. */
    async setProjectScanWorkspace() {
        if (await Config.setScanWorkspace()) {
            await this.reload();
            await this.refreshProjectStatus();
        }
    }

    /** Clear the project selection in `.fpp-lsp` and trigger a reload. */
    async clearProject() {
        if (await Config.clearProject()) {
            await this.reload();
            await this.refreshProjectStatus();
        }
    }

    /**
     * Searches through the locs search paths in order to find an `fpp.locs` file
     * @returns Promise to locs file or `undefined` if not found
     */
    async searchForLocs() {
        try {
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
                title: "Searching for fpp.locs",
                cancellable: true
            }, async (progress, token) => {
                const searchPaths = Settings.locsSearch();
                const excludeGlob = Settings.excludeLocs();

                for (const searchPath of searchPaths) {
                    progress.report({
                        message: `Searching ${searchPath}`,
                        increment: (100 / searchPath.length)
                    });

                    const found = await vscode.workspace.findFiles(
                        searchPath,
                        excludeGlob,
                        1,
                        token
                    );

                    if (found.length > 0) {
                        return found[0];
                    }
                }

                return undefined;
            });
        }
        catch (e) {
            vscode.window.showWarningMessage(`Failed to find locs.fpp: ${e}`);
        }
    }

    async deactivate() {
        await this.client?.stop();
        await this.client?.dispose();
        this.client = undefined;
    }

    dispose() {
        for (const s of this.subscriptions) {
            s.dispose();
        }
    }
}

export async function activate(context: vscode.ExtensionContext) {
    extension = new FppExtension(context);
    registerDiagramSupport(context, () => extension.client);
    context.subscriptions.push(
        extension,
        vscode.commands.registerCommand("fpp.restartLsp", async () => {
            await extension.initializeClient();
        }),
        vscode.commands.registerCommand('fpp.reload', extension.reload.bind(extension)),
        vscode.commands.registerCommand('fpp.load', (file?: vscode.Uri) => {
            if (!file) {
                return vscode.commands.executeCommand('fpp.open');
            } else {
                return extension.setProjectLocs(file);
            }
        }),
        vscode.commands.registerCommand('fpp.dumpActiveTextEditorSyntaxTree', () => {
            if (vscode.window.activeTextEditor) {
                extension.client?.sendNotification(dumpSyntaxTree, { uri: vscode.window.activeTextEditor.document.uri.toString() })
            }
        }),
        vscode.commands.registerCommand('fpp.select', async () => {
            const currentLocs = (await Config.readConfig())?.locs;

            const picked = await vscode.window.showQuickPick(
                (async () => {
                    const searchPaths = Settings.locsSearch();
                    const excludeGlob = Settings.excludeLocs();

                    const files = new Map<string, vscode.Uri>();
                    const items: LocsQuickPickItem[] = [
                        {
                            kind: vscode.QuickPickItemKind.Default,
                            label: '$(open) Open',
                            locsKind: LocsQuickPickType.locsOpenDialog
                        },
                        {
                            kind: vscode.QuickPickItemKind.Default,
                            label: 'Scan entire workspace for .fpp files',
                            locsKind: LocsQuickPickType.workspaceScan
                        },
                        {
                            kind: vscode.QuickPickItemKind.Separator,
                            label: ''
                        }
                    ];

                    for (const searchPath of searchPaths) {
                        for (const file of await vscode.workspace.findFiles(
                            searchPath,
                            excludeGlob,
                        )) {
                            files.set(vscode.workspace.asRelativePath(file), file);
                        }
                    }

                    for (const [relPath, uri] of files.entries()) {
                        items.push({
                            kind: vscode.QuickPickItemKind.Default,
                            label: relPath,
                            uri,
                            locsKind: LocsQuickPickType.locsFile,
                            description: currentLocs === relPath ? '(Active)' : undefined
                        } as LocsQuickPickFile);
                    }

                    return items;
                })(),
                {
                    title: 'Select FPP Locs for project indexing',
                    canPickMany: false,
                }
            );

            if (picked?.kind === vscode.QuickPickItemKind.Default) {
                switch (picked.locsKind) {
                    case LocsQuickPickType.locsOpenDialog:
                        vscode.commands.executeCommand('fpp.open');
                        break;
                    case LocsQuickPickType.locsFile:
                        extension.setProjectLocs(picked.uri);
                        break;
                    case LocsQuickPickType.workspaceScan:
                        extension.setProjectScanWorkspace();
                        break;
                }
            }
        }),
        vscode.commands.registerCommand('fpp.close', async () => {
            await extension.clearProject();
        }),
        vscode.commands.registerCommand('fpp.open', () => {
            vscode.window.showOpenDialog({
                openLabel: "Open locs",
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                filters: { "FPP": ["fpp"] },
                title: "Open 'locs.fpp' files in build directory"
            }).then((value) => {
                if (value) {
                    extension.setProjectLocs(value[0]);
                }
            });
        }),
        Settings.onLspServerLogLevelChanged(() => {
            extension.initializeClient();
        }),
    );

    await extension.initializeClient();
}

export function deactivate(): Thenable<void> | undefined {
    if (!extension) {
        return undefined;
    }
    return extension.deactivate();
}
