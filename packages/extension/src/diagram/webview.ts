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
import { RequestModelAction, SGraph, SEdge, SNode, SetModelAction, SPort } from 'sprotty-protocol';
import * as vscode from "vscode";
import { FppProject } from "../project";
import { DeclCollector, SymbolType } from "../decl";
import { ComponentNode, PortNode } from "./models";
import { ComponentDecl, PortDecl, PortInstance, PortInstanceDecl } from "../parser/ast";
import { MemberTraverser } from "../traverser";
import { v4 as uuid } from 'uuid';

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
            const graph = SGraphGenerator.topology(this.fppProject.decl);
            const msg = SetModelAction.create(graph);
            await endpoint.sendAction(msg);
            console.log("Send back msg: ", msg);
        };
        endpoint.addActionHandler(RequestModelAction.KIND, handler);
    }

    /*************************************************************************/
    /* Handlers for sending messages to webview upon user's CodeLens actions */
    /*************************************************************************/

    public codeLensVisualizeConnectionGroup(elemName: string) {
        vscode.window.setStatusBarMessage(`Visualizing ${elemName}...`, 5000);
        console.log("this.fppProject = ", this.fppProject);
        // Generate an SGraph for the connection group.
        const graph = SGraphGenerator.connectionGroup(this.fppProject.decl, elemName);
        const msg = SetModelAction.create(graph);
        var activeEndpoint = undefined;
        if (this.endpoints.length > 0) {
            activeEndpoint = this.endpoints[0];
        }
        if (activeEndpoint) {
            activeEndpoint.sendAction(msg);
            console.log("Sending back msg: ", msg);
        } else {
            console.log("Active endpoint not found!");
        }
    }

    
}

export class SGraphGenerator {
    
    /**
     * Initialize an SGraph to be modified.
     * @returns an empty graph
     */
    static initGraph(): SGraph {
        return {
            type: 'graph',
            id: 'graph',
            children: []
        };
    }

    /**
     * Generate an SGraph that renders an entire topology.
     * @param decl The DeclCollector with all info about the FPP files
     * @returns An SGraph to be sent to webview
     */
    static topology(decl: DeclCollector): SGraph {
        const graph: SGraph = this.initGraph();
        Array.from(decl.componentInstances.entries()).forEach(([key, componentInstanceDecl], index) => {
            // For each instance, loop up the ComponentDecl.
            const resolved = decl.resolve(
                componentInstanceDecl.fppType.type,
                componentInstanceDecl.scope,
                SymbolType.component
            );
            if (!resolved) {
                throw new Error(`${componentInstanceDecl} is not resolved.`);
            }
            const componentName = MemberTraverser.flat(resolved);
            const componentDecl = decl.get(componentName, SymbolType.component) as ComponentDecl;

            // Instantiate a component SNode for the component type.
            const node = SGraphGenerator.modelComponent(componentDecl, key);
            
            // Push SNode into graph.
            graph.children.push(node);
        });
        return graph;
    }

    /**
     * Generate an SGraph that shows a specific connection group.
     * @param decl The DeclCollector with all info about the FPP files
     * @param connectionGroupName Name of the connection group to generate the graph for
     * @returns An SGraph to be sent to webview
     */
    static connectionGroup(decl: DeclCollector, connectionGroupName: string): SGraph {
        const graph: SGraph = this.initGraph();
        console.log(decl.graphGroups);
        
        // FIXME: Need a better way to look for the right key.
        // A faster way is to get the topology name and concatenate,
        // since keys follow the "topologyName.connectionGroupName" pattern.
        var graphGroupName = undefined;
        decl.graphGroups.forEach((val, key) => {
            if (key.includes(connectionGroupName)) {
                graphGroupName = key;
            }
        });
        if (!graphGroupName) {
            throw new Error(`Graph group key not found for: ${connectionGroupName}`);
        }

        console.log("graph group: ", graphGroupName);
        const graphGroup = decl.graphGroups.get(graphGroupName)!;
        if (!graphGroup) {
            throw new Error(`Graph group not found: ${graphGroupName}`);
        }

        // TODO: Generate a view for connection groups by reusing SGraph components.

        return graph;
    }

    /*************************************************/
    /* Private helper functions for generating SNode */
    /*************************************************/

    /**
     * A helper method for building an Sprotty model for an FPP component
     * @param comp ComponentDecl from decl collector
     * @param uid Component instance name, which is supposed to be unique.
     */
    static modelComponent(comp: ComponentDecl, uid: string): SNode {
        // Instantiate an SNode for the component.
        var node = <ComponentNode>{
            type: 'component',
            id: uid,
            position: { x: 0, y: 0 },
            layout: 'vbox',
            children: [],
            astNode: comp
        };

        // Add an SPort to children for each port of the component.
        comp.members.forEach((val, i) => {
            if (this.isPortInstanceDecl(val)) {
                console.log(`${val.name.value} is a port!`);
                // Currently, UUID ensures the uniqueness of the port instance ID.
                // FIXME: Is there a better way to get unique ID?
                // FIXME: Is there a better way to get a fully qualified name?
                const uid = val.scope.map(i => i.value).join('.') + val.name.value + '.' + uuid();
                node.children!.push(this.modelPort(val, uid));
            }
        });

        // Adjust node height based on the number of children.
        node.size = { width: 81, height: Math.max(50, node.children!.length * 20)};

        return node;
    }

    static modelPort(port: PortInstanceDecl, uid: string): PortNode {
        const portNode: PortNode = {
            type: 'port',
            id: uid,
            size: { width: 20, height: 20 },
            astNode: port
        };
        return portNode;
    }

    /**
     * A type guard function for checking whether an object can be
     * safely treated as a certain type.
     * Caution: This needs to update when `ast.ts` is changed.
     */
    static isPortInstanceDecl(obj: any): obj is PortInstanceDecl {
        console.log("isPortInstanceDecl: ", obj);
        return obj && (obj.type === 'GeneralPortInstanceDecl'
            || obj.type === 'SpecialPortInstanceDecl'
        );
    }
}