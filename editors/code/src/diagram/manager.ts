/**
 * This file manages all interactions with the live Sprotty diagram in the webview.
 *
 * The interactions include:
 *
 * 1. the extension responding to messages coming from the webview
 * (i.e., handlers registered to WebviewEndpoint under FppWebviewPanelManager);
 *
 * 2. the extension actively sending messages to the webview, upon user request
 * from the CodeLens buttons (buttons floating above definitions).
 *
 * Unlike the legacy extension, the diagram model (`SGraph`) is not computed
 * locally: it is fetched from the FPP language server via the `fpp/diagram`
 * request. Everything downstream (ELK layout, the bounds round-trip, and webview
 * rendering) is unchanged.
 */
import { createWebviewPanel, SprottyDiagramIdentifier, WebviewEndpoint, WebviewPanelManager, WebviewPanelManagerOptions } from "sprotty-vscode";
import { RequestModelAction, ComputedBoundsAction, UpdateModelAction, FitToScreenAction, SGraph, RequestBoundsAction, applyBounds, SelectAllAction } from 'sprotty-protocol';
import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import { ElkLayoutEngine } from "sprotty-elk/lib/elk-layout";
import ELK from 'elkjs/lib/elk-api.js';
import { FppLayoutEngine } from "./layout";
import { FppDiagramConfig, DiagramType } from "./layout-config";
import * as lsp_ext from "../lsp_ext";

/** A provider of the current language client, since the client is recreated on restart. */
export type ClientProvider = () => LanguageClient | undefined;

export class FppWebviewPanelManager extends WebviewPanelManager {
    public diagramConfig: FppDiagramConfig = new FppDiagramConfig();
    private sGraph: SGraph | undefined;
    private elkEngine: ElkLayoutEngine = new FppLayoutEngine(
        () => new ELK({
            workerFactory: function (url) { // the value of 'url' is irrelevant here
                const { Worker: WORKER } = require('elkjs/lib/elk-worker.min.js'); // Use elk-worker.js for debugging
                return new WORKER(url);
            }
        }),
        undefined,
        this.diagramConfig);

    constructor(
        readonly options: WebviewPanelManagerOptions,
        private readonly clientProvider: ClientProvider
    ) {
        super(options);
    }

    protected override createWebview(identifier: SprottyDiagramIdentifier): vscode.WebviewPanel {
        const extensionPath = this.options.extensionUri;
        // Let the extension look for webview JS and CSS under root/dist/
        const webviewResources = vscode.Uri.joinPath(extensionPath, 'dist');
        return createWebviewPanel(identifier, {
            localResourceRoots: [webviewResources],
            scriptUri: vscode.Uri.joinPath(webviewResources, 'webview.js')
        });
    }

    /**
     * Fetch the diagram `SGraph` for the current diagram type/name from the
     * language server. Returns `undefined` (and surfaces an error) on failure.
     */
    private async fetchModel(): Promise<SGraph | undefined> {
        const kind = this.diagramConfig.currentDiagramType;
        if (kind === undefined) {
            return undefined;
        }
        const client = this.clientProvider();
        if (!client) {
            vscode.window.showErrorMessage("FPP language server is not running; cannot render diagram.");
            return undefined;
        }
        try {
            const model = await client.sendRequest(lsp_ext.diagram, {
                kind: kind as unknown as lsp_ext.DiagramKind,
                name: this.diagramConfig.fullyQualifiedName,
                hideUnusedPorts: this.diagramConfig.hideUnusedPorts,
            });
            return model as SGraph;
        } catch (e) {
            vscode.window.showErrorMessage(`Failed to generate diagram: ${e}`);
            return undefined;
        }
    }

    /**
     * Create an endpoint to the webview and register handlers of incoming messages from the webview.
     */
    protected override createEndpoint(identifier: SprottyDiagramIdentifier): WebviewEndpoint {
        const activeWebview = super.createEndpoint(identifier);
        this.addRequestModelHandler(activeWebview);
        this.addComputedBoundsHandler(activeWebview);
        return activeWebview;
    }

    /****************************************************/
    /* Handlers for responding to messages from webview */
    /****************************************************/

    /**
     * This function registers a handler for RequestModelAction from the frontend webview.
     * When the user clicks any code lens button, the webview should pop up.
     * When the webview initializes, it sends RequestModelAction to the extension.
     * Based on which code lens the user clicked, this handler fetches a corresponding
     * SGraph from the language server and sends it back to the webview.
     */
    protected addRequestModelHandler(endpoint: WebviewEndpoint) {
        const handler = async (action: RequestModelAction) => {
            try {
                this.sGraph = await this.fetchModel();
                if (!this.sGraph) {
                    return;
                }
                const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
                await endpoint.sendAction(msgRequestBounds);
            } catch (e) {
                vscode.window.showErrorMessage(`Failed to render diagram: ${e}`);
                console.error("RequestModel handler failed", e);
            }
        };
        endpoint.addActionHandler(RequestModelAction.KIND, handler);
    }

    /**
     * This handler is invoked when the front-end returns a ComputedBoundsAction.
     * The handler applies the measured bounds of DOM elements
     * (component boxes, text labels, etc.) to the unbounded SGraph,
     * then sends the SGraph to the ELK layout engine. The SGraph after layout
     * is then returned to the webview for display.
     *
     * Note that since all graphs go through the two-step client-server layout process
     * (more info here https://sprotty.org/docs/recipes/actions-and-protocols/#3-client-and-server-layout)
     * this handler gets invoked for every render.
     *
     * @param endpoint An active endpoint connecting to the webview
     */
    protected addComputedBoundsHandler(endpoint: WebviewEndpoint) {
        const handler = async (action: ComputedBoundsAction) => {
            try {
                // Apply bounds to SGraph.
                if (!this.sGraph) {
                    console.error("SGraph is not set but computed bounds received!");
                    return;
                }
                applyBounds(this.sGraph, action);
                // Layout the SGraph (transforming to ElkGraph and calls ELK under the hood).
                this.sGraph = await this.elkEngine.layout(this.sGraph);
                await this.sendUpdateAndFitActions(endpoint, this.sGraph);
            } catch (e) {
                vscode.window.showErrorMessage(`Failed to lay out diagram: ${e}`);
                console.error("ComputedBounds handler failed", e);
            }
        };
        endpoint.addActionHandler(ComputedBoundsAction.KIND, handler);
    }

    /**************************************************************************/
    /* Handlers for sending messages to webview upon user's actions in editor */
    /**************************************************************************/

    /**
     * Display a diagram by fetching an SGraph and sending a RequestBoundsAction to the webview.
     * This function is invoked when codelens buttons are clicked.
     *
     * @param diagramType The type of diagram to be rendered: component, connection group, or topology.
     * @param fullyQualifiedName The full name of an entity to be rendered.
     */
    public async displayDiagram(
        diagramType: DiagramType,
        fullyQualifiedName: string,
        uri?: vscode.Uri
    ) {
        // Store diagram type and fully qualified name for potential re-render on save.
        this.diagramConfig.currentDiagramType = diagramType;
        this.diagramConfig.fullyQualifiedName = fullyQualifiedName;
        // Check if webview is active.
        let activeEndpoint = this.findOpenedWebview();
        if (!activeEndpoint) {
            // First open: create the panel. The webview boots and sends a
            // `RequestModelAction`, which `addRequestModelHandler` answers with
            // the current diagram (already stored in `diagramConfig` above).
            await this.openDiagramForElement(uri);
            return;
        }
        // Bring the (possibly hidden) diagram panel to the foreground and focus
        // it, so requesting a diagram while viewing another file does not
        // silently update an unseen panel.
        this.revealEndpoint(activeEndpoint);
        // Clear selection before switching views.
        const deselectAll = SelectAllAction.create({ select: false });
        await activeEndpoint.sendAction(deselectAll);
        // Fetch a corresponding SGraph.
        this.sGraph = await this.fetchModel();
        if (!this.sGraph) { return; }
        vscode.window.setStatusBarMessage(`Displaying ${fullyQualifiedName}`, 5000);
        const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
        activeEndpoint.sendAction(msgRequestBounds);
    }

    /**
     * Bring an endpoint's webview to the foreground and focus it. Handles both
     * webview panels (`.reveal`) and webview views (`.show`).
     */
    private revealEndpoint(endpoint: WebviewEndpoint) {
        const container: any = endpoint.webviewContainer;
        if (typeof container?.reveal === "function") {
            // WebviewPanel: reveal in its column and take focus (preserveFocus = false).
            container.reveal(container.viewColumn, false);
        } else if (typeof container?.show === "function") {
            // WebviewView: show and take focus (preserveFocus = false).
            container.show(false);
        }
    }

    /**
     * Update an existing diagram by fetching an SGraph and sending a RequestBoundsAction to the webview.
     * This function is invoked when the user saves an FPP file.
     */
    public async updateDiagram() {
        const activeEndpoint = this.findOpenedWebview();
        if (!activeEndpoint) {
            return;
        }

        this.sGraph = await this.fetchModel();
        if (!this.sGraph) { return; }
        const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
        activeEndpoint.sendAction(msgRequestBounds);
    }

    private findOpenedWebview(): WebviewEndpoint | undefined {
        if (this.endpoints.length > 0) {
            return this.endpoints[0];
        }
        return undefined;
    }

    private async sendUpdateAndFitActions(endpoint: WebviewEndpoint, graph: SGraph) {
        // Clear selection before updating the model.
        const deselectAll = SelectAllAction.create({ select: false });
        await endpoint.sendAction(deselectAll);

        const msgUpdate = UpdateModelAction.create(graph);
        await endpoint.sendAction(msgUpdate);
        const msgFit = FitToScreenAction.create([]);
        await endpoint.sendAction(msgFit);
    }

    /**
     * Open the diagram panel for an element. Prefers the explicit `uri` (the
     * document that defined the element, passed by the CodeLens), falling back to
     * the active editor. An explicit `diagramType` is passed so panel creation
     * does not depend on the file extension (topologies/components/state machines
     * are often defined in `.fppi` includes, which the extension filter rejects).
     */
    private async openDiagramForElement(uri?: vscode.Uri): Promise<WebviewEndpoint | undefined> {
        const target = uri ?? vscode.window.activeTextEditor?.document.uri;
        if (!target) {
            vscode.window.showErrorMessage("Cannot open diagram: no source document.");
            return;
        }
        return this.openDiagram(target, {
            reveal: true,
            diagramType: this.options.defaultDiagramType,
        });
    }
}
