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
import { RequestModelAction, SGraph, SEdge, SNode, SetModelAction, SPort, SLabel, RequestBoundsAction, ComputedBoundsAction, UpdateModelAction } from 'sprotty-protocol';
import * as vscode from "vscode";
import { FppProject } from "../project";
import { DeclCollector, SymbolType } from "../decl";
import { ComponentNode, PortNode } from "../../../webview/src/models";
import { ComponentDecl, PortDecl, PortInstance, PortInstanceDecl } from "../parser/ast";
import { GraphGenerator } from "./generator";
import { ElkNode } from "elkjs/lib/elk-api";

export class FppWebviewPanelManager extends WebviewPanelManager {

    constructor(readonly options: WebviewPanelManagerOptions, readonly fppProject: FppProject) {
        super(options);
    }

    protected override createWebview(identifier: SprottyDiagramIdentifier): vscode.WebviewPanel {
        const extensionPath = this.options.extensionUri.fsPath;
        // Let the extension look for webview JS and CSS at the top-level pack/webview directory.
        const webviewResources = createFileUri(extensionPath, '..', '..', 'pack', 'webview');
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
            console.log("Received RequestModelAction: ", action);
            console.log("Generate SGraph...");
            const graph = await GraphGenerator.topology(this.fppProject.decl);
            const msg = UpdateModelAction.create(graph);
            await endpoint.sendAction(msg);
            console.log("Send back RequestBoundsAction msg: ", msg);
        };
        endpoint.addActionHandler(RequestModelAction.KIND, handler);
    }

    protected addComputedBoundsHandler(endpoint: WebviewEndpoint) {
        const handler = async (action: ComputedBoundsAction) => {
            console.log("Received ComputedBoundsAction: ", action);
            console.log("Generate SGraph...");
            const graph = await GraphGenerator.topology(this.fppProject.decl);
            
            const msg = UpdateModelAction.create(graph);
            await endpoint.sendAction(msg);
            console.log("Send back UpdateModelAction msg: ", msg);
        };
        endpoint.addActionHandler(ComputedBoundsAction.KIND, handler);
    }

    /**************************************************************************/
    /* Handlers for sending messages to webview upon user's actions in editor */
    /**************************************************************************/

    public async handleCodeLensDisplayConnectionGroup(elemName: string) {
        vscode.window.setStatusBarMessage(`Displaying ${elemName}...`, 5000);
        console.log("this.fppProject = ", this.fppProject);
        // Generate an SGraph for the connection group.
        const graph = await GraphGenerator.connectionGroup(this.fppProject.decl, elemName);
        const msg = UpdateModelAction.create(graph);
        const activeEndpoint = this.findOpenedWebview();
        if (activeEndpoint) {
            activeEndpoint.sendAction(msg);
            console.log("Sending back msg: ", msg);
        } else {
            console.log("Active endpoint not found!");
        }
    }

    public async handleOnSaveUpdateDiagram() {
        const graph = await GraphGenerator.topology(this.fppProject.decl);
        const msg = UpdateModelAction.create(graph);
        const activeEndpoint = this.findOpenedWebview();
        if (!activeEndpoint) {
            console.error("No active webview!");
        }
        activeEndpoint?.sendAction(msg);
        console.info("Sending back updated diagram.")
    }

    private findOpenedWebview(): WebviewEndpoint | undefined {
        var openedEndpoint = undefined;
        if (this.endpoints.length > 0) {
            openedEndpoint = this.endpoints[0];
        }
        return openedEndpoint;
    }
}
