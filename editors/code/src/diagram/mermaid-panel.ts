/**
 * State-machine diagram panel, rendered with Mermaid.
 *
 * Unlike the sprotty topology/component diagrams, state machines are rendered as
 * Mermaid `stateDiagram-v2`. The language server produces the Mermaid source
 * (via `fpp/diagram` with `kind: "stateMachine"`, which returns a string); this
 * manager owns a single webview panel, posts the text to it, and re-renders on
 * request. The webview bundle (`dist/sm-webview.js`) does the actual Mermaid
 * rendering.
 */
import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import * as lsp_ext from "../lsp_ext";

/** A provider of the current language client (recreated on restart). */
export type ClientProvider = () => LanguageClient | undefined;

export class MermaidStateMachinePanel {
    private panel: vscode.WebviewPanel | undefined;
    /** The fully qualified name of the state machine currently shown. */
    private currentName: string | undefined;
    /** Whether the webview has signalled it is ready to receive diagrams. */
    private ready = false;
    /** Text awaiting a not-yet-ready webview. */
    private pending: string | undefined;
    /** How transition edge labels are rendered; toggled from the toolbar. */
    private actionMode: "uml" | "flattened" = "uml";

    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly clientProvider: ClientProvider
    ) {}

    /** Show (creating if needed) the state machine `name`, revealing the panel. */
    async show(name: string): Promise<void> {
        this.currentName = name;
        if (!this.panel) {
            this.createPanel();
        } else {
            this.panel.reveal(this.panel.viewColumn ?? vscode.ViewColumn.Beside, false);
        }
        await this.refresh();
    }

    /** Re-fetch and re-render the current state machine, if any. */
    async refresh(): Promise<void> {
        if (!this.panel || this.currentName === undefined) {
            return;
        }
        const client = this.clientProvider();
        if (!client) {
            vscode.window.showErrorMessage(
                "FPP language server is not running; cannot render diagram."
            );
            return;
        }
        let text: string;
        try {
            const result = await client.sendRequest(lsp_ext.diagram, {
                kind: "stateMachine",
                name: this.currentName,
                hideUnusedPorts: false,
                transitionActionMode: this.actionMode,
            });
            text = String(result);
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to generate diagram: ${e}`);
            return;
        }
        this.post(text);
    }

    /** Whether a panel is currently open. */
    isOpen(): boolean {
        return this.panel !== undefined;
    }

    /** Reset the diagram's pan/zoom to fit the viewport. */
    fit(): void {
        void this.panel?.webview.postMessage({ type: "fit" });
    }

    /** Ask the webview for the current SVG, then prompt to save it. */
    export(): void {
        void this.panel?.webview.postMessage({ type: "export" });
    }

    /**
     * Flip between UML and flattened transition action display modes, then
     * re-fetch the diagram so edge labels reflect the new mode.
     */
    toggleActionMode(): void {
        this.actionMode = this.actionMode === "uml" ? "flattened" : "uml";
        vscode.window.setStatusBarMessage(
            `Transition actions: ${this.actionMode === "uml" ? "UML" : "flattened"}`,
            4000
        );
        void this.refresh();
    }

    /** Write the exported SVG (from the webview) to a user-chosen file. */
    private async saveSvg(svg: string | null): Promise<void> {
        if (!svg) {
            vscode.window.showWarningMessage("No diagram to export.");
            return;
        }
        const defaultName = (this.currentName ?? "state-machine").replace(/[^\w.-]/g, "_");
        const target = await vscode.window.showSaveDialog({
            saveLabel: "Export Diagram",
            filters: { "SVG image": ["svg"] },
            defaultUri: vscode.Uri.file(`${defaultName}.svg`),
        });
        if (!target) {
            return;
        }
        try {
            await vscode.workspace.fs.writeFile(target, Buffer.from(svg, "utf8"));
            vscode.window.setStatusBarMessage(`Exported diagram to ${target.fsPath}`, 4000);
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to export diagram: ${e}`);
        }
    }

    private post(text: string): void {
        if (!this.panel) {
            return;
        }
        if (this.ready) {
            void this.panel.webview.postMessage({ type: "render", text });
        } else {
            // Buffer until the webview signals ready.
            this.pending = text;
        }
    }

    private createPanel(): void {
        this.ready = false;
        this.pending = undefined;
        const panel = vscode.window.createWebviewPanel(
            "fppStateMachineDiagram",
            "FPP State Machine",
            { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false },
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "dist")],
            }
        );
        panel.webview.html = this.html(panel.webview);

        // Drive a context key so the fit/export toolbar buttons show only while
        // this panel is the active one.
        const setFocus = (focused: boolean) =>
            void vscode.commands.executeCommand(
                "setContext",
                "fppStateMachineDiagram-focused",
                focused
            );
        setFocus(panel.active);
        panel.onDidChangeViewState(e => setFocus(e.webviewPanel.active));

        panel.webview.onDidReceiveMessage(msg => {
            if (msg?.type === "ready") {
                this.ready = true;
                if (this.pending !== undefined) {
                    void panel.webview.postMessage({ type: "render", text: this.pending });
                    this.pending = undefined;
                }
            } else if (msg?.type === "error") {
                console.error("Mermaid render error:", msg.message);
            } else if (msg?.type === "exportSvg") {
                void this.saveSvg(msg.svg);
            }
        });

        panel.onDidDispose(() => {
            this.panel = undefined;
            this.ready = false;
            this.pending = undefined;
            setFocus(false);
        });

        this.panel = panel;
    }

    private html(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.context.extensionUri, "dist", "sm-webview.js")
        );
        // CSP mirrors sprotty-vscode's: no `unsafe-eval` (the bundle is eval-free),
        // `unsafe-inline` styles for Mermaid's injected <style> and our CSS.
        const csp = [
            "default-src 'none'",
            `script-src ${webview.cspSource}`,
            `style-src 'unsafe-inline' ${webview.cspSource}`,
            `img-src ${webview.cspSource} data:`,
            `font-src ${webview.cspSource} data:`,
        ].join("; ");
        return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, height=device-height">
        <meta http-equiv="Content-Security-Policy" content="${csp}">
        <title>FPP State Machine</title>
    </head>
    <body>
        <div id="container"></div>
        <script src="${scriptUri}"></script>
    </body>
</html>`;
    }
}
