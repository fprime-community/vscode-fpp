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
 */
import { createFileUri, createWebviewPanel, SprottyDiagramIdentifier, WebviewEndpoint, WebviewPanelManager, WebviewPanelManagerOptions } from "sprotty-vscode";
import { RequestModelAction, ComputedBoundsAction, UpdateModelAction, FitToScreenAction, SGraph, RequestBoundsAction, applyBounds } from 'sprotty-protocol';
import * as vscode from "vscode";
import { FppProject } from "../project";
import { GraphGenerator } from "./generator";
import { ElkLayoutEngine } from "sprotty-elk/lib/elk-layout";
import ELK from 'elkjs/lib/elk-api.js';
import { FppLayoutEngine } from "./layout";
import { FppDiagramLayoutConfigurator } from "./layout-config";

export class FppWebviewPanelManager extends WebviewPanelManager {

    private sGraph: SGraph | undefined;
    private diagramConfig: FppDiagramLayoutConfigurator = new FppDiagramLayoutConfigurator();
    private elkEngine: ElkLayoutEngine = new FppLayoutEngine(
        () => new ELK({
            workerFactory: function(url) { // the value of 'url' is irrelevant here
                const { Worker } = require('elkjs/lib/elk-worker.min.js'); // Use elk-worker.js for debugging
                return new Worker(url);
            }
        }),
        undefined,
        this.diagramConfig);

    constructor(readonly options: WebviewPanelManagerOptions, readonly fppProject: FppProject) {
        super(options);
    }

    protected override createWebview(identifier: SprottyDiagramIdentifier): vscode.WebviewPanel {
        const extensionPath = this.options.extensionUri.fsPath;
        // Let the extension look for webview JS and CSS under root/packages/extension/pack/webview/
        const webviewResources = createFileUri(extensionPath, 'pack', 'webview');
        return createWebviewPanel(identifier, {
            localResourceRoots: [ webviewResources ],
            scriptUri: createFileUri(webviewResources.fsPath, 'webview.js'),
            cssUri: createFileUri(webviewResources.fsPath, 'webview.css'),
        });
    }

    /**
     * Create an endpoint to the webview and register handlers of incoming messages from the webview.
     */
    protected override createEndpoint(identifier: SprottyDiagramIdentifier): WebviewEndpoint {
        const activeWebview = super.createEndpoint(identifier);
        if (activeWebview) {
            console.log("Active webview");
        } else {
            console.log("Inactive webview!");
        }
        this.addRequestModelHandler(activeWebview);
        this.addComputedBoundsHandler(activeWebview);
        return activeWebview;
    }

    /****************************************************/
    /* Handlers for responding to messages from webview */
    /****************************************************/

    /**
     * This function registers a handler for RequestModelAction from the frontend webview.
     * Webview sends RequestModelAction at initialization.
     * This handler should construct an SGraph and send it to webview.
     * In the future, when parsing is done in the language server, this handler and SGraph
     * generation should be moved to the language server too.
     * The implementation of this function is modeled after addWorkspaceEditActionHandler().
     */
    protected addRequestModelHandler(endpoint: WebviewEndpoint) {
        const handler = async (action: RequestModelAction) => {
            // console.log("Received RequestModelAction: ", action);
            const graph = await GraphGenerator.topology(this.fppProject.decl);
            this.sGraph = graph;
            // console.log("Generated SGraph: ", this.sGraph);
            const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
            await endpoint.sendAction(msgRequestBounds);
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
            // console.log("Received ComputedBoundsAction: ", action);
            // Apply bounds to SGraph.
            if (!this.sGraph) {
                console.error("SGraph is not set but computed bounds received!");
                return;
            }
            applyBounds(this.sGraph, action);
            // console.log("Bounds applied on SGraph: ", this.sGraph);
            // Layout the SGraph (transforming to ElkGraph and calls ELK under the hood).
            this.sGraph = await this.elkEngine.layout(this.sGraph);
            // console.log("SGraph layout done: ", this.sGraph);
            this.sendUpdateAndFitActions(endpoint, this.sGraph);
            // console.log("Send back UpdateModelAction msg");
        };
        endpoint.addActionHandler(ComputedBoundsAction.KIND, handler);
    }

    /**************************************************************************/
    /* Handlers for sending messages to webview upon user's actions in editor */
    /**************************************************************************/

    public async handleCodeLensDisplayConnectionGroup(elemName: string) {
        vscode.window.setStatusBarMessage(`Displaying ${elemName}...`, 5000);
        const activeEndpoint = this.findOpenedWebview();
        if (!activeEndpoint) {
            console.error("Active webview endpoint not found!");
            return;
        }
        // Generate an SGraph for the connection group.
        this.sGraph = await GraphGenerator.connectionGroup(this.fppProject.decl, elemName);
        // console.log("Generated SGraph: ", this.sGraph);
        const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
        activeEndpoint.sendAction(msgRequestBounds);
    }

    public async handleOnSaveUpdateDiagram() {
        const activeEndpoint = this.findOpenedWebview();
        if (!activeEndpoint) {
            console.error("Active webview endpoint not found!");
            return;
        }
        this.sGraph = await GraphGenerator.topology(this.fppProject.decl);
        // console.log("Generated SGraph: ", this.sGraph);
        const msgRequestBounds = RequestBoundsAction.create(this.sGraph);
        activeEndpoint.sendAction(msgRequestBounds);
    }

    private findOpenedWebview(): WebviewEndpoint | undefined {
        var openedEndpoint = undefined;
        if (this.endpoints.length > 0) {
            openedEndpoint = this.endpoints[0];
        }
        return openedEndpoint;
    }

    private async sendUpdateAndFitActions(endpoint: WebviewEndpoint, graph: SGraph) {
        const msgUpdate = UpdateModelAction.create(graph);
        await endpoint.sendAction(msgUpdate);
        const msgFit = FitToScreenAction.create([]);
        await endpoint.sendAction(msgFit);
    }
}
