/**
 * Diagram feature entry point.
 *
 * Wires the sprotty webview panel manager, the "Open in Diagram" CodeLens
 * (driven by the `fpp/diagramElements` LSP request), the toolbar commands, and
 * live re-render on save. All diagram data comes from the FPP language server
 * (`fpp/diagram`); this module owns none of the lowering.
 */
import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import { registerDefaultCommands } from "sprotty-vscode";
import { FppWebviewPanelManager, ClientProvider } from "./manager";
import { MermaidStateMachinePanel } from "./mermaid-panel";
import { DiagramType } from "./layout-config";
import * as lsp_ext from "../lsp_ext";

/** Map a wire diagram-kind string to the internal `DiagramType` enum. */
function toDiagramType(kind: lsp_ext.DiagramKind): DiagramType {
    switch (kind) {
        case "component": return DiagramType.component;
        case "topology": return DiagramType.topology;
        case "connectionGroup": return DiagramType.connectionGroup;
        case "stateMachine": return DiagramType.stateMachine;
    }
}

/** A CodeLens provider that offers "Open in Diagram" over diagrammable defs. */
class FppDiagramCodeLensProvider implements vscode.CodeLensProvider {
    private readonly changed = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses = this.changed.event;

    constructor(private readonly clientProvider: ClientProvider) { }

    /** Notify VSCode that lenses may have changed (e.g. after re-analysis). */
    refresh() {
        this.changed.fire();
    }

    async provideCodeLenses(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.CodeLens[]> {
        const client = this.clientProvider();
        if (!client) {
            return [];
        }
        let elements: lsp_ext.DiagramElement[];
        try {
            elements = await client.sendRequest(
                lsp_ext.diagramElements,
                { uri: document.uri.toString() },
                token
            );
        } catch {
            return [];
        }

        return elements.map(element => {
            const range = client.protocol2CodeConverter.asRange(element.range);
            return new vscode.CodeLens(range, {
                title: `Open in Diagram: ${element.displayName}`,
                tooltip: `Visualize ${element.name}`,
                command: "fpp.displayDiagram",
                // Pass the defining document's URI so the panel opens against the
                // right file even if it is a `.fppi` include or not the active editor.
                arguments: [toDiagramType(element.kind), element.name, document.uri],
            });
        });
    }
}

/** Register all diagram-related commands, providers, and listeners. */
export function registerDiagramSupport(
    context: vscode.ExtensionContext,
    clientProvider: ClientProvider
) {
    const webviewPanelManager = new FppWebviewPanelManager(
        {
            extensionUri: context.extensionUri,
            defaultDiagramType: "fppDiagrams",
            // FPP elements can be defined in `.fppi` includes too.
            supportedFileExtensions: [".fpp", ".fppi"],
            singleton: true,
        },
        clientProvider
    );

    // Wires up fpp.diagram.open / fit / center / export.
    registerDefaultCommands(webviewPanelManager, context, { extensionPrefix: "fpp" });

    const codeLensProvider = new FppDiagramCodeLensProvider(clientProvider);
    // State machines render with Mermaid in their own panel; topology/component
    // continue to use sprotty.
    const mermaidPanel = new MermaidStateMachinePanel(context, clientProvider);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "fpp.displayDiagram",
            (diagramType: DiagramType, name: string, uri?: vscode.Uri) => {
                if (diagramType === DiagramType.stateMachine) {
                    return mermaidPanel.show(name);
                }
                return webviewPanelManager.displayDiagram(diagramType, name, uri);
            }
        ),
        vscode.commands.registerCommand("fpp.diagram.toggle-unused-ports", () => {
            webviewPanelManager.diagramConfig.hideUnusedPorts =
                !webviewPanelManager.diagramConfig.hideUnusedPorts;
            void webviewPanelManager.updateDiagram();
        }),
        vscode.commands.registerCommand("fpp.stateMachine.fit", () => mermaidPanel.fit()),
        vscode.commands.registerCommand("fpp.stateMachine.export", () => mermaidPanel.export()),
        vscode.commands.registerCommand("fpp.stateMachine.toggle-action-mode", () => mermaidPanel.toggleActionMode()),
        vscode.languages.registerCodeLensProvider({ language: "fpp" }, codeLensProvider),
        // Re-render the open diagram(s) (and refresh lenses) when an FPP file is saved.
        vscode.workspace.onDidSaveTextDocument(doc => {
            if (doc.languageId === "fpp") {
                codeLensProvider.refresh();
                void webviewPanelManager.updateDiagram();
                if (mermaidPanel.isOpen()) {
                    void mermaidPanel.refresh();
                }
            }
        }),
    );
}
