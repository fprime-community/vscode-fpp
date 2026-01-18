import { SGraph, SEdge, SNode, SPort, Point, SLabel, Dimension } from 'sprotty-protocol';
import { ElkExtendedEdge, ElkGraphElement, ElkLabel, ElkNode, ElkPort } from 'elkjs/lib/elk.bundled.js';
import { DeclCollector, SymbolType } from "../passes/decl";
import { ComponentDecl, ComponentInstanceDecl, Connection, DirectGraphDecl, GeneralInputPortInstance, GeneralPortKind, IncludeStmt, InterfaceImportStmt, IntExprValue, PortInstanceDecl, PrimExprType, QualifiedIdentifier, SpecialOutputPortInstance, SpecialPortKind, TopologyDecl } from "../parser/ast";
import { MemberTraverser } from "../passes/traverser";
import type { ComponentSNode, PortSNode } from '../../common/models';
import { getInterfaceFullnameFromImport } from '../util';
import { FppAnnotator } from '../passes/annotator';
import { ExprTraverser } from '../evaluator';
import { DiagramType, FppDiagramConfig } from './layout-config';

/** 
 * The additional FPP information attached to ELK nodes
 * when creating ELK nodes from decl collector
 */
interface FppData {
    // SGraph data
    SNodeType: string,

    // Component data
    componentKind?: string, // active, queued, passive

    // Port data
    portKind?: string, // Storing the `kind` field of GeneralInputPortInstance and GeneralInputPortInstance
    isOutput?: boolean,
}

/** An FPP ELK node is a regular ElkNode with an extra data field containing FPP info. */
interface FppElkNode extends ElkNode {
    data?: FppData
}

interface FppElkPort extends ElkPort {
    data?: FppData
}

interface FppElkEdge extends ElkExtendedEdge {
    data?: FppData
}

export class GraphGenerator {

    /**
     * Initialize an SGraph to be modified.
     * @returns an empty graph
     */
    static initElkGraph(): FppElkNode {
        return {
            // type: 'graph',
            id: 'root',
            children: [],
            edges: [],
        };
    }

    /**
     * Generate an SGraph that renders a component definition (not a component instance).
     * @param decl The DeclCollector with all info about the FPP files
     * @param fullyQualifiedComponentName The name of the component definition to be rendered
     * @returns An SGraph to be sent to webview
     */
    static async component(decl: DeclCollector, diagramConfig: FppDiagramConfig, fullyQualifiedComponentName: string): Promise<SGraph | undefined> {
        const elkGraph: FppElkNode = this.initElkGraph();
        const compDecl = decl.components.get(fullyQualifiedComponentName)!;
        if (!compDecl) {
            console.error(`Component decl not found: ${fullyQualifiedComponentName}`);
            return;
        }

        elkGraph.children?.push(this.createElkNodeComponent(decl, diagramConfig, undefined, compDecl, undefined));

        // Convert to SGraph
        const sGraph: SGraph = this.convertElkGraphToSGraph(elkGraph);

        return sGraph;
    }

    /**
     * Generate an SGraph that renders an entire topology.
     * @param decl The DeclCollector with all info about the FPP files
     * @returns An SGraph to be sent to webview
     */
    static async topology(decl: DeclCollector, diagramConfig: FppDiagramConfig, fullyQualifiedTopologyName: string, elkGraph: FppElkNode | undefined = undefined): Promise<SGraph | undefined> {
        if (!elkGraph) {
            elkGraph = this.initElkGraph();
        }

        // Get the parent topology.
        const topologyDecl = decl.topologies.get(fullyQualifiedTopologyName);

        // Recursively build elkGraph for each subtopology.
        topologyDecl?.members.map(member => {
            if (member.type === 'TopologyImportStmt') {
                const subtopologyName = MemberTraverser.flat(member.symbol);
                this.topology(decl, diagramConfig, subtopologyName, elkGraph);
            }
        });

        // Find a list of component instances used in the topology.
        const usedComponentInstances: ComponentInstanceDecl[] = [];
        topologyDecl?.members.map(member => {
            if (member.type === 'ComponentInstanceSpec') {
                const instanceName = `${MemberTraverser.flat(topologyDecl.scope)}.${MemberTraverser.flat(member.name)}`;
                const instanceDecl = decl.componentInstances.get(instanceName);
                if (instanceDecl) {
                    usedComponentInstances.push(instanceDecl);
                }
            }
        });

        // Iterate over all connection groups in the current topology and draw an ELK edge for each.
        const topologyConnGroups = topologyDecl?.members.filter(m => m.type === 'DirectGraphDecl') ?? [];
        topologyConnGroups.forEach(connGroup => {
            connGroup.connections.forEach((conn, idx) => {
                const edge: FppElkEdge = this.createElkEdge(decl, connGroup, conn, idx);
                elkGraph.edges?.push(edge);
            });
        });

        // Create an ELK node for each component instance.
        usedComponentInstances.forEach(instance => {
            const elkNode = this.createElkNodeFromComponentInstance(decl, diagramConfig, instance, elkGraph.edges);
            if (elkNode) {
                elkGraph.children?.push(elkNode);
            }
        });

        // Convert to SGraph
        // console.log("ElkGraph constructed: ", elkGraph);
        const sGraph: SGraph = this.convertElkGraphToSGraph(elkGraph);

        return sGraph;
    }

    /**
     * Generate an SGraph that shows a specific connection group.
     * @param decl The DeclCollector with all info about the FPP files
     * @param fullyQualifiedGraphGroupName Fully qualified name of the connection group to generate the graph for
     * @returns An SGraph to be sent to webview
     */
    static async connectionGroup(decl: DeclCollector, diagramConfig: FppDiagramConfig, fullyQualifiedGraphGroupName: string): Promise<SGraph | undefined> {
        const elkGraph: FppElkNode = this.initElkGraph();
        const graphGroup = decl.graphGroups.get(fullyQualifiedGraphGroupName)!;
        if (!graphGroup) {
            console.error(`Graph group not found: ${fullyQualifiedGraphGroupName}`);
            return;
        }

        // Collect a unique set of instance IDs from connections.
        const compSet = new Set<string | undefined>();
        graphGroup.connections.forEach(conn => {
            // Remove the trailing port name.
            const source = MemberTraverser.flat(conn.source.node.slice(0, -1));
            const destination = MemberTraverser.flat(conn.destination.node.slice(0, -1));
            compSet.add(source);
            compSet.add(destination);
        });

        // Convert component IDs into component instances.
        const scope = graphGroup.scope.map(e => e.value).join('.');
        const compInstances: ComponentInstanceDecl[] = [];
        compSet.forEach(e => {
            // See if this component is defined under the current scope.
            let instance = decl.componentInstances.get(`${scope}.${e}`);
            if (instance) {
                compInstances.push(instance);
                return;
            }
            // If not, see if this component is imported.
            instance = decl.componentInstances.get(`${e}`);
            if (instance) {
                compInstances.push(instance);
            }
        });

        // Draw all connections in this connection group.
        graphGroup.connections.forEach((conn, idx) => {
            const edge: FppElkEdge = this.createElkEdge(decl, graphGroup, conn, idx);
            elkGraph.edges?.push(edge);
        });

        // Generate a component ELK node for each component instance.
        compInstances.forEach(instance => {
            const elkNode = this.createElkNodeFromComponentInstance(decl, diagramConfig, instance, elkGraph.edges);
            if (elkNode) {
                elkGraph.children?.push(elkNode);
            }
        });

        // Convert to SGraph
        const sGraph: SGraph = this.convertElkGraphToSGraph(elkGraph);

        return sGraph;
    }

    /************************************************************/
    /* Helper functions for generating ELK / Sprotty components */
    /************************************************************/

    /**
     * A helper method for building an ELK model for an FPP component instance
     * @param decl The decl collector
     * @param diagramConfig Configurations for what to render and ELK layout options
     * @param componentInstanceDecl A component instance to be rendered
     * @param connections A list of connections in the diagram containing the component. This field is only used when hiding unused ports (i.e., diagramConfig.hideUnusedPorts === true).
     */
    static createElkNodeFromComponentInstance(decl: DeclCollector, diagramConfig: FppDiagramConfig, componentInstanceDecl: ComponentInstanceDecl, connections: ElkExtendedEdge[] | undefined): FppElkNode | undefined {
        // For each instance, look up the ComponentDecl.
        const resolved = decl.resolve(
            componentInstanceDecl.fppType.type,
            componentInstanceDecl.scope,
            SymbolType.component
        );
        if (!resolved) {
            console.error(`${componentInstanceDecl} is not resolved.`);
            return;
        }
        const componentName = MemberTraverser.flat(resolved);
        const componentDecl = decl.get(componentName, SymbolType.component) as ComponentDecl;

        // Instantiate a component FppElkNode for the component type.
        const node = this.createElkNodeComponent(decl, diagramConfig, componentInstanceDecl, componentDecl, connections);
        return node;
    }

    /**
     * A helper method for building an ELK model for an FPP component
     * @param decl The decl collector
     * @param diagramConfig Configurations for what to render and ELK layout options
     * @param instance A component instance to be rendered (by displaying the instance name).
     * If this is undefined, only the component definition is rendered (without displaying instance names).
     * @param comp A component definition to be rendered
     * @param connections A list of connections in the diagram containing the component.
     * If this component is inside a larger diagram, the `connections` field is used to compute
     * a list of ports used by this component. If `diagramConfig.hideUnusedPorts` is true,
     * unused ports are hidden to simplify the diagram.
     */
    static createElkNodeComponent(decl: DeclCollector, diagramConfig: FppDiagramConfig, instance: ComponentInstanceDecl | undefined, comp: ComponentDecl, connections: ElkExtendedEdge[] | undefined): FppElkNode {
        // Instantiate an SNode for the component.
        const compId = instance ? `${instance.scope.map(e => e.value).join('.')}.${instance.name.value}` : `uninstantiatedComponent`; // DeploymentName.componentInstanceName
        const compClassName = comp.name.value;
        const compInstanceName = instance ? instance.name.value : "";
        var node: FppElkNode = {
            id: compId,
            // IMPORTANT: x, y must be set, otherwise mysterious runtime errors could occur during ELK layout.
            // Set x, y both to 0, since layout will set them later.
            // But we do need to explicitly set them for the Sprotty front-end
            // to correctly perform measurement.
            x: 0, y: 0,
            children: [],
            ports: [],
            labels: [
                <ElkLabel>{
                    text: compInstanceName,
                    width: 100,
                    height: 15,
                },
                <ElkLabel>{
                    text: compClassName,
                    width: 100,
                    height: 15,
                },
            ],
            data: {
                SNodeType: 'node:component',
                componentKind: comp.kind.value,
            }
        };

        // Add an Elk port to the ports array for each port of the component.
        comp.members.forEach((m, i) => {
            if (GraphGenerator.isPortInstanceDecl(m)) {
                const portId = `${compId}.${m.name.value}`;
                node.ports!.push(...GraphGenerator.createElkNodePort(decl, m, portId));
            }
            // Handle ports imported from include statememts.
            else if (GraphGenerator.isIncludeStmt(m)) {
                m.resolved?.members.forEach(member => {
                    if (GraphGenerator.isPortInstanceDecl(member)) {
                        const portId = `${compId}.${member.name.value}`;
                        node.ports!.push(...GraphGenerator.createElkNodePort(decl, member, portId));
                    }
                });
            }
            // Handle ports imported from interface imports.
            else if (GraphGenerator.isInterfaceImportStmt(m)) {
                const interfaceName = getInterfaceFullnameFromImport(m, comp);
                if (!interfaceName) {
                    console.error("Interface full name is undefined. Check if the interface import statement is valid.");
                    return;
                }
                const interfaceDecl = decl.interfaces.get(interfaceName);
                interfaceDecl?.members.forEach(member => {
                    if (GraphGenerator.isPortInstanceDecl(member)) {
                        const portId = `${compId}.${member.name.value}`;
                        node.ports!.push(...GraphGenerator.createElkNodePort(decl, member, portId));
                    }
                });
            }
        });

        // Check if hideUnusedPorts is true. If so, only keep the ports used by checking against outer connections.
        if (diagramConfig.hideUnusedPorts && diagramConfig.currentDiagramType !== DiagramType.component) {
            let portsUsed = connections?.flatMap(conn => conn.sources.concat(conn.targets));
            node.ports = node.ports!.filter(port => portsUsed?.includes(port.id));
        }

        return node;
    }

    /**
     * A helper method for building an ELK model for an FPP port
     * @param decl The decl collector
     * @param port A port instance to be rendered
     * @param portIdPrefix A prefix string for making the port's ELK id unique
     */
    static createElkNodePort(decl: DeclCollector, port: PortInstanceDecl, portIdPrefix: string): FppElkPort[] {
        // Extract the name and the kind of the port.
        // If portKind is empty, then special colors will not be applied.
        const portName = port.name.value;
        let portKind = "";
        if (port.kind.isSpecial && port.kind.isOutput) {
            portKind = (port.kind as SpecialOutputPortInstance).kind.value;
        }
        else if (!port.kind.isSpecial && !port.kind.isOutput) {
            portKind = (port.kind as GeneralInputPortInstance).kind.value;
        }

        // Extract the width of the port. If the port width is an expression (e.g., a constant),
        // use an annotator to evaluate the expression
        const annotator = new FppAnnotator(decl);
        const widthExpr = port.type === 'GeneralPortInstanceDecl' ? port.n : undefined;
        let width: number = 1;
        if (widthExpr) {
            const exprValue = annotator.exprTrav.traverse(widthExpr, port.scope, ExprTraverser.intValidator);
            width = (exprValue as IntExprValue).value;
        }

        const portNodes: FppElkPort[] = [];
        for (let i = 0; i < width; i++) {
            portNodes.push(<FppElkPort>{
                id: `${portIdPrefix}.${i}`,
                // IMPORTANT: x, y must be set, otherwise mysterious runtime errors could occur during ELK layout.
                // Set x, y both to 0, since layout will set them later.
                // But we do need to explicitly set them for the Sprotty front-end
                // to correctly perform measurement.
                x: 0, y: 0,
                height: 10,
                width: 10,
                labels: [
                    // For now, each port label has fix width and height.
                    // If size is not set, ELK sets it to 0, 0, not ideal.
                    <ElkLabel>{
                        text: width > 1 ? `${portName} [${i}]` : portName,
                        width: 50,
                        height: 10,
                    }
                ],
                data: {
                    SNodeType: 'port',
                    portKind: portKind,
                    isOutput: port.kind.isOutput,
                }
            });
        }

        return portNodes;
    }

    /**
     * A helper method for building an ELK model for an FPP connection
     * @param decl The decl collector
     * @param directGraphDecl A connection group this connection belongs to
     * @param conn The connection to be rendered
     * @param idx The connection index for creating a unique ELK id
     */
    static createElkEdge(decl: DeclCollector, directGraphDecl: DirectGraphDecl, conn: Connection, idx: number): FppElkEdge {
        const annotator = new FppAnnotator(decl);
        const scope = directGraphDecl.scope;
        // Check if the scope contains the first identifier included in the port QualifiedIdentifier.
        // If so, the component (also the port) is defined under the scope.
        // Otherwise, the component (also the port) is external (e.g., imported by subtopologies).
        // In that case, do not prepend the scope.
        const sourceId = conn.source.node;
        const sourceFirstId: QualifiedIdentifier = [sourceId[0]];
        const sourceResolve = decl.resolve(sourceFirstId, scope, SymbolType.componentInstance);
        let sourceFullyQualifiedName = sourceResolve
            ? `${MemberTraverser.flat(scope)}.${MemberTraverser.flat(sourceId)}`
            : MemberTraverser.flat(sourceId);
        // Resolve an integer source port index from expression.
        let sourceIndex = 0;
        if (conn.source.index) {
            const sourceIndexExpr = annotator.exprTrav.traverse(conn.source.index, scope, ExprTraverser.intValidator);
            sourceIndex = (sourceIndexExpr as IntExprValue).value;
        }

        const destId = conn.destination.node;
        const destFirstId: QualifiedIdentifier = [destId[0]];
        const destResolve = decl.resolve(destFirstId, scope, SymbolType.componentInstance);
        let destFullyQualifiedName = destResolve
            ? `${MemberTraverser.flat(scope)}.${MemberTraverser.flat(destId)}`
            : MemberTraverser.flat(destId);
        // Resolve an integer destination port index from expression.
        let destIndex = 0;
        if (conn.destination.index) {
            const destIndexExpr = annotator.exprTrav.traverse(conn.destination.index, scope, ExprTraverser.intValidator);
            destIndex = (destIndexExpr as IntExprValue).value;
        }

        const connId = `${MemberTraverser.flat(scope)}.${directGraphDecl.name.value}.connection.${idx}`;
        const edge: FppElkEdge = {
            id: connId,
            sources: [
                `${sourceFullyQualifiedName}.${sourceIndex}`
            ],
            targets: [
                `${destFullyQualifiedName}.${destIndex}`
            ],
            data: {
                SNodeType: 'edge',
            }
        };
        return edge;
    }

    /**
     * A type guard function for checking whether an object can be
     * safely treated as a certain type.
     * Caution: This needs to update when `ast.ts` is changed.
     */
    static isPortInstanceDecl(obj: any): obj is PortInstanceDecl {
        return obj && (obj.type === 'GeneralPortInstanceDecl'
            || obj.type === 'SpecialPortInstanceDecl'
        );
    }

    /**
     * A type guard function for checking whether an object can be
     * safely treated as an IncludeStmt type.
     * Caution: This needs to update when `ast.ts` is changed.
     */
    static isIncludeStmt(obj: any): obj is IncludeStmt<undefined> {
        return obj && (obj.type === 'IncludeStmt');
    }

    /**
     * A type guard function for checking whether an object can be
     * safely treated as an InterfaceImportStmt type.
     * Caution: This needs to update when `ast.ts` is changed.
     */
    static isInterfaceImportStmt(obj: any): obj is InterfaceImportStmt {
        return obj && (obj.type === 'InterfaceImportStmt');
    }

    /**
     * Convert an ELK graph into a Sprotty SGraph.
     * @param elkGraph 
     */
    static convertElkGraphToSGraph(elkGraph: FppElkNode): SGraph {
        const sGraph: SGraph = {
            type: 'graph',
            id: 'root',
            children: [],
        };

        this.convertElkGraphToSGraphRecursive(sGraph, elkGraph);

        return sGraph;
    }

    /**
     * 
     * @param sRoot 
     * @param eRoot 
     */
    static convertElkGraphToSGraphRecursive(sNode: SNode, eNode: FppElkNode): void {
        // At the current layer of the tree, instantiate a component SNode for each elk child.
        eNode.children?.forEach(eChild => {
            const elkComp = eChild as FppElkNode;
            const sChild = <ComponentSNode>{
                // Regular SNode fields
                type: elkComp.data!.SNodeType,
                id: elkComp.id,
                size: {
                    width: elkComp.width,
                    height: elkComp.height
                },
                position: {
                    x: elkComp.x,
                    y: elkComp.y
                },
                children: [],
                // Fields defined in webview/models
                // Here we grab data from the extended ELK nodes
                // and put them in the generated SNode.
                kind: elkComp.data?.componentKind,
            };

            // Convert all node labels into SLabel.
            const labels = this.convertElkElementLabelsToSGraphLabels(elkComp, 'node:component');
            sChild.children?.push(...labels);

            // Recursive on this child.
            this.convertElkGraphToSGraphRecursive(sChild, elkComp);

            // Push the built child into the children array.
            sNode.children?.push(sChild);
        });

        // Convert each ELK port into an SNode
        eNode.ports?.forEach(ePort => {
            const elkPort = ePort as FppElkPort;
            const sPort = <PortSNode>{
                // Regular SNode fields
                type: elkPort.data!.SNodeType,
                id: elkPort.id,
                size: {
                    width: elkPort.width,
                    height: elkPort.height
                },
                position: {
                    x: elkPort.x,
                    y: elkPort.y
                },
                children: [],
                // Fields defined in webview/models
                // Here we grab data from the extended ELK nodes
                // and put them in the generated SNode.
                kind: elkPort.data?.portKind,
                isOutput: elkPort.data?.isOutput,
            };

            // Convert all port labels into SLabel.
            const labels = this.convertElkElementLabelsToSGraphLabels(ePort, 'port');
            sPort.children?.push(...labels);

            // Push the built child into the children array.
            sNode.children?.push(sPort);
        });

        // Convert each ELK edge into an SNode
        eNode.edges?.forEach(eEdge => {
            const sEdge = <SEdge>{
                // Fields defined in webview/models
                type: (eEdge as FppElkEdge).data!.SNodeType,

                // Regular SEdge fields
                id: eEdge.id,
                sourceId: eEdge.sources[0],
                targetId: eEdge.targets[0],
            };

            // Referenced from sprotty-elk/src/elk-layout.ts.
            const points: Point[] = [];
            if (eEdge.sections && eEdge.sections.length > 0) {
                const section = eEdge.sections[0];
                if (section.startPoint) {
                    points.push(section.startPoint);
                }
                if (section.bendPoints) {
                    points.push(...section.bendPoints);
                }
                if (section.endPoint) {
                    points.push(section.endPoint);
                }
            }

            sEdge.routingPoints = points;

            // Convert all edge labels into SLabel.
            const labels = this.convertElkElementLabelsToSGraphLabels(eEdge, 'edge');
            sEdge.children?.push(...labels);

            // Push the built child into the children array.
            sNode.children?.push(sEdge);
        });
    }

    static convertElkElementLabelsToSGraphLabels(elkElement: ElkGraphElement, typePrefix: string) {
        const labels: SLabel[] = [];
        elkElement.labels?.forEach((e, i) => {
            const label = <SLabel>{
                id: `${elkElement.id}.label.${i}`,
                type: `label:${typePrefix}`,
                text: e.text,
                position: <Point>{
                    x: e.x || 0,
                    y: e.y || 0,
                },
                size: <Dimension>{
                    width: e.width || 0,
                    height: e.height || 0,
                },
            };
            labels.push(label);
        });
        return labels;
    }
}