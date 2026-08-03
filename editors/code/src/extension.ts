import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from "vscode-languageclient/node";

import * as Settings from "./settings";
import { FppProject } from "./project";
import { locs, LocsQuickPickFile, LocsQuickPickItem, LocsQuickPickType } from "./locs";
import { dumpSyntaxTree } from "./lsp_ext";

let extension: FppExtension;

class FppExtension implements vscode.Disposable {
    private subscriptions: vscode.Disposable[];
    private outputChannel: vscode.OutputChannel;
    private traceOutputChannel: vscode.OutputChannel;

    client?: LanguageClient;
    project: FppProject;

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        this.outputChannel = vscode.window.createOutputChannel("FPP");
        this.traceOutputChannel = vscode.window.createOutputChannel("FPP Trace", { log: true });
        this.project = new FppProject({ language: "fpp" });

        this.subscriptions = [
            Settings.onLspServerPathChanged(() => {
                this.initializeClient();
            }),
            this.outputChannel,
            this.traceOutputChannel,
        ];
    }

    async initializeClient() {
        try {
            await this.deactivate();
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to deactivate old language server: ${e}`);
        }

        const serverPath = Settings.serverPath();
        if (!serverPath) {
            // TODO(tumbar) Add a button to open up settings
            vscode.window.showErrorMessage("No FPP server path set");
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

        await this.reload();
    }

    async setProjectLocs(locsFile: vscode.Uri | undefined) {
        await this.context.workspaceState.update('fpp.locsFile', locsFile?.path);
        if (this.client) {
            await this.project.locsFile(this.client, locsFile);
        }
    }

    async setProjectScanWorkspace() {
        await this.context.workspaceState.update('fpp.locsFile', '*');
        if (this.client) {
            await this.project.workspaceScan(this.client);
        }
    }

    async reload() {
        if (this.client) {
            await this.project.reload(this.client);
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
        vscode.commands.registerCommand('fpp.select', () => {
            vscode.window.showQuickPick(
                (async () => {
                    const currentLocs = locs(context);

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
                            description: currentLocs === uri.path ? '(Active)' : undefined
                        } as LocsQuickPickFile);
                    }

                    return items;
                })(),
                {
                    title: 'Select FPP Locs for project indexing',
                    canPickMany: false,
                }
            ).then((picked) => {
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
            });
        }),
        vscode.commands.registerCommand('fpp.close', async () => {
            await extension.setProjectLocs(undefined);
        }),
        vscode.commands.registerCommand('fpp.open', () => {
            const currentLocs = locs(context);
            vscode.window.showOpenDialog({
                defaultUri: currentLocs ? vscode.Uri.file(currentLocs) : undefined,
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
        Settings.onLocsSearchChanged(() => {
            // Don't re-scan if a locs file is already loaded
            if (!locs(context)) {
                extension.searchForLocs().then((f) => extension.setProjectLocs(f));
            }
        }),
        Settings.onLspServerLogLevelChanged(() => {
            extension.initializeClient();
        })
    );

    await extension.initializeClient();
}

export function deactivate(): Thenable<void> | undefined {
    if (!extension) {
        return undefined;
    }
    return extension.deactivate();
}
