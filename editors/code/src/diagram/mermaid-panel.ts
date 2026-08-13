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

/**
 * ELK layout options for a state machine diagram. These live in the FPP source
 * as a `@ diagram-layout ...` annotation and are embedded by the language server
 * into the Mermaid frontmatter; the panel parses them from there (to drive the
 * gear popover) and writes changes back to the source. Values are the ELK option
 * strings Mermaid's ELK backend expects.
 */
interface LayoutOptions {
    /** The Mermaid layout backend: `elk` or `dagre`. */
    engine: string;
    /** Flow direction (both engines): `TB`, `BT`, `LR`, or `RL`. */
    direction: string;
    cycleBreaking: string;
    considerModelOrder: string;
    nodePlacement: string;
    /** Node spacing in px, as a string (dagre only). */
    nodeSpacing: string;
    /** Rank spacing in px, as a string (dagre only). */
    rankSpacing: string;
}

/** Defaults; must match `fpp_diagram`'s `SmLayout::default()`. */
const DEFAULT_LAYOUT: LayoutOptions = {
    engine: "elk",
    direction: "TB",
    cycleBreaking: "MODEL_ORDER",
    considerModelOrder: "NODES_AND_EDGES",
    nodePlacement: "BRANDES_KOEPF",
    nodeSpacing: "60",
    rankSpacing: "60",
};

/** The layout option keys, used to validate messages from the webview. */
const LAYOUT_KEYS: readonly (keyof LayoutOptions)[] = [
    "engine",
    "direction",
    "cycleBreaking",
    "considerModelOrder",
    "nodePlacement",
    "nodeSpacing",
    "rankSpacing",
];

/**
 * Read the layout options out of a Mermaid source: the engine and ELK/spacing
 * options from the YAML frontmatter, and the flow direction from the `direction`
 * statement in the diagram body.
 */
function parseLayoutFromMermaid(text: string): LayoutOptions {
    const grab = (re: RegExp) => text.match(re)?.[1];
    return {
        engine: grab(/^\s*layout:\s*(\S+)/m) ?? DEFAULT_LAYOUT.engine,
        direction: grab(/^\s*direction\s+(\S+)/m) ?? DEFAULT_LAYOUT.direction,
        nodePlacement: grab(/nodePlacementStrategy:\s*(\S+)/) ?? DEFAULT_LAYOUT.nodePlacement,
        cycleBreaking: grab(/cycleBreakingStrategy:\s*(\S+)/) ?? DEFAULT_LAYOUT.cycleBreaking,
        considerModelOrder:
            grab(/considerModelOrder:\s*(\S+)/) ?? DEFAULT_LAYOUT.considerModelOrder,
        nodeSpacing: grab(/nodeSpacing:\s*(\S+)/) ?? DEFAULT_LAYOUT.nodeSpacing,
        rankSpacing: grab(/rankSpacing:\s*(\S+)/) ?? DEFAULT_LAYOUT.rankSpacing,
    };
}

/**
 * Rewrite a Mermaid source to reflect `layout` (optimistic update).
 *
 * The webview drives the effective layout from the `layout` object passed in the
 * `render` message, not from this text, so this rewrite only needs to keep the
 * source in sync for "view source": the `layout:` engine line, the ELK/spacing
 * frontmatter values, and the body `direction` statement. Lines that are absent
 * for the current engine (e.g. the spacing block under ELK) are simply not
 * matched; the values are re-emitted from the source annotation on the next
 * language-server round-trip.
 */
function applyLayoutToMermaid(text: string, layout: LayoutOptions): string {
    let out = text
        .replace(/(^\s*layout:\s*)\S+/m, `$1${layout.engine}`)
        .replace(/(nodePlacementStrategy:\s*)\S+/, `$1${layout.nodePlacement}`)
        .replace(/(cycleBreakingStrategy:\s*)\S+/, `$1${layout.cycleBreaking}`)
        .replace(/(considerModelOrder:\s*)\S+/, `$1${layout.considerModelOrder}`)
        .replace(/(nodeSpacing:\s*)\S+/, `$1${layout.nodeSpacing}`)
        .replace(/(rankSpacing:\s*)\S+/, `$1${layout.rankSpacing}`);

    // Direction is applied by Mermaid from a `direction` statement in the diagram
    // *body* (not from config), so the rendered text must carry it. Replace an
    // existing statement, or insert one right after the `stateDiagram-v2` header
    // if absent — the latter keeps the live view correct even against a language
    // server that predates the `direction` annotation and so emits no such line.
    if (/^\s*direction\s+\S+/m.test(out)) {
        out = out.replace(/(^\s*direction\s+)\S+/m, `$1${layout.direction}`);
    } else {
        out = out.replace(
            /^(\s*)(stateDiagram-v2.*)$/m,
            `$1$2\n$1    direction ${layout.direction}`
        );
    }
    return out;
}

/** The `diagram-layout` annotation *body* (without the `@ ` marker) for `layout`. */
function layoutToAnnotation(layout: LayoutOptions): string {
    return (
        `diagram-layout engine=${layout.engine}` +
        ` direction=${layout.direction}` +
        ` cycleBreaking=${layout.cycleBreaking}` +
        ` considerModelOrder=${layout.considerModelOrder}` +
        ` nodePlacement=${layout.nodePlacement}` +
        ` nodeSpacing=${layout.nodeSpacing}` +
        ` rankSpacing=${layout.rankSpacing}`
    );
}

export class MermaidStateMachinePanel {
    private panel: vscode.WebviewPanel | undefined;
    /** The fully qualified name of the state machine currently shown. */
    private currentName: string | undefined;
    /** URI of the source `.fpp`/`.fppi` file defining the current state machine. */
    private sourceUri: vscode.Uri | undefined;
    /** The Mermaid source most recently rendered, for the "view source" action. */
    private currentText: string | undefined;
    /**
     * The authoritative current layout selection. Seeded from the server-generated
     * source on each refresh, then mutated in place as the user changes options.
     *
     * This is the source of truth for the live view — NOT re-parsed out of
     * `currentText` on each change. The server's Mermaid text only contains the
     * frontmatter blocks relevant to its chosen engine (e.g. no `state:` spacing
     * block under ELK), so parsing options back out of it would drop any option
     * whose block is currently absent (notably spacing right after switching to
     * dagre). Keeping the full selection here makes every option round-trip.
     */
    private currentLayout: LayoutOptions = { ...DEFAULT_LAYOUT };
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
    async show(name: string, sourceUri?: vscode.Uri): Promise<void> {
        this.currentName = name;
        this.sourceUri = sourceUri;
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
        this.currentText = text;
        // Seed the authoritative layout from the freshly generated source (which
        // reflects what's persisted in the FPP annotation). Options whose block is
        // absent for the current engine fall back to defaults here — that's fine,
        // because the source is the persisted truth after a full round-trip.
        this.currentLayout = parseLayoutFromMermaid(text);
        this.post(text);
    }

    /**
     * Open the current Mermaid source in an editor for inspection/copying. The
     * language server already embeds the layout options as YAML frontmatter, so
     * the source is self-contained: pasting it into any Mermaid 11+ renderer
     * reproduces this diagram.
     */
    async viewSource(): Promise<void> {
        if (this.currentText === undefined) {
            vscode.window.showWarningMessage("No diagram source to show.");
            return;
        }
        const doc = await vscode.workspace.openTextDocument({
            content: this.currentText,
            language: "markdown",
        });
        await vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: true,
        });
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
        // Default the save dialog next to the source .fpp/.fppi file, falling
        // back to the (first) workspace folder, then a bare filename.
        const baseFolder = this.sourceUri
            ? vscode.Uri.joinPath(this.sourceUri, "..")
            : vscode.workspace.workspaceFolders?.[0]?.uri;
        const defaultUri = baseFolder
            ? vscode.Uri.joinPath(baseFolder, `${defaultName}.svg`)
            : vscode.Uri.file(`${defaultName}.svg`);
        const target = await vscode.window.showSaveDialog({
            saveLabel: "Export Diagram",
            filters: { "SVG image": ["svg"] },
            defaultUri,
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
            void this.panel.webview.postMessage({
                type: "render",
                text,
                // The gear popover reflects the authoritative current selection
                // (not a re-parse of the text, which may omit engine-irrelevant
                // blocks like spacing under ELK).
                layout: this.currentLayout,
            });
        } else {
            // Buffer until the webview signals ready.
            this.pending = text;
        }
    }

    /**
     * Apply a layout choice made from the webview's gear popover. The single
     * source of truth is the FPP source, so this:
     *   1. Optimistically rewrites the current Mermaid frontmatter and re-renders
     *      (instant feedback, independent of language-server timing).
     *   2. Writes the choice back to the `.fpp`/`.fppi` source as a
     *      `@ diagram-layout ...` annotation (a workspace edit).
     */
    private async applyLayoutOption(key: unknown, value: unknown): Promise<void> {
        if (
            typeof key !== "string" ||
            !LAYOUT_KEYS.includes(key as keyof LayoutOptions) ||
            typeof value !== "string" ||
            this.currentText === undefined
        ) {
            return;
        }
        // Mutate the authoritative selection, not a re-parse of the text.
        this.currentLayout = { ...this.currentLayout, [key]: value };
        const layout = this.currentLayout;

        // 1. Optimistic re-render. `applyLayoutToMermaid` only rewrites blocks that
        //    are present in the current text; the webview applies the full layout
        //    (which we pass in `post`) via Mermaid site config regardless, so the
        //    render reflects the change even if the block isn't in the text yet.
        this.currentText = applyLayoutToMermaid(this.currentText, layout);
        this.post(this.currentText);

        // 2. Persist into the FPP source.
        await this.writeLayoutAnnotation(layout);
    }

    /**
     * Write `layout` into the state machine's `@ diagram-layout ...` pre-annotation
     * in the source file (replacing an existing one, or inserting a new line just
     * above the definition). Uses `fpp/diagramElements` to locate the definition.
     */
    private async writeLayoutAnnotation(layout: LayoutOptions): Promise<void> {
        if (!this.sourceUri || this.currentName === undefined) {
            return;
        }
        const client = this.clientProvider();
        if (!client) {
            return;
        }

        let elements: lsp_ext.DiagramElement[];
        try {
            elements = await client.sendRequest(lsp_ext.diagramElements, {
                uri: this.sourceUri.toString(),
            });
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to locate state machine: ${e}`);
            return;
        }
        const element = elements.find(
            e => e.kind === "stateMachine" && e.name === this.currentName
        );
        if (!element) {
            return;
        }

        const doc = await vscode.workspace.openTextDocument(this.sourceUri);
        const defLine = element.range.start.line;
        const indent = /^\s*/.exec(doc.lineAt(defLine).text)?.[0] ?? "";
        const annotationLine = `${indent}@ ${layoutToAnnotation(layout)}`;

        // Find an existing `@ diagram-layout` line among the contiguous annotation
        // lines directly above the definition.
        let existing = -1;
        for (let i = defLine - 1; i >= 0; i--) {
            const trimmed = doc.lineAt(i).text.trim();
            if (!trimmed.startsWith("@")) {
                break;
            }
            const body = trimmed.replace(/^@<?\s?/, "").trim();
            if (body.startsWith("diagram-layout")) {
                existing = i;
                break;
            }
        }

        const edit = new vscode.WorkspaceEdit();
        if (existing >= 0) {
            edit.replace(this.sourceUri, doc.lineAt(existing).range, annotationLine);
        } else {
            edit.insert(this.sourceUri, new vscode.Position(defLine, 0), `${annotationLine}\n`);
        }
        try {
            await vscode.workspace.applyEdit(edit);
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to write layout annotation: ${e}`);
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

        // The fit/export toolbar buttons are gated in package.json on the
        // built-in `activeWebviewPanelId == 'fppStateMachineDiagram'` context,
        // which VS Code scopes to this panel's own title bar — so no manual
        // focus context key is needed (a global one leaked the buttons onto
        // other visible editors).

        panel.webview.onDidReceiveMessage(msg => {
            if (msg?.type === "ready") {
                this.ready = true;
                if (this.pending !== undefined) {
                    void panel.webview.postMessage({
                        type: "render",
                        text: this.pending,
                        layout: this.currentLayout,
                    });
                    this.pending = undefined;
                }
            } else if (msg?.type === "error") {
                console.error("Mermaid render error:", msg.message);
            } else if (msg?.type === "exportSvg") {
                void this.saveSvg(msg.svg);
            } else if (msg?.type === "setLayoutOption") {
                void this.applyLayoutOption(msg.key, msg.value);
            }
        });

        panel.onDidDispose(() => {
            this.panel = undefined;
            this.ready = false;
            this.pending = undefined;
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
