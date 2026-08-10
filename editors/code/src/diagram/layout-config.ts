import { LayoutOptions } from "elkjs";
import { DefaultLayoutConfigurator } from "sprotty-elk";
import { SGraph, SEdge, SNode, SLabel } from 'sprotty-protocol';
import { SModelIndex } from "sprotty-protocol";
import { PortSNode } from "../../common/models";

/**
 * The kinds of diagram the extension can request from the language server.
 *
 * The string values match `fpp_diagram::DiagramKind` on the wire (the LSP
 * `fpp/diagram` request serializes the kind in camelCase).
 */
export enum DiagramType {
    component = "component",
    connectionGroup = "connectionGroup",
    topology = "topology",
    stateMachine = "stateMachine",
}

export class FppDiagramConfig extends DefaultLayoutConfigurator {

    // Stateful diagram options
    public hideUnusedPorts = true;                      // By default, hide unused ports.
    public currentDiagramType: DiagramType | undefined; // Current diagram type
    public fullyQualifiedName: string = "";             // Fully qualified name of the element currently displayed

    private get isStateMachine(): boolean {
        return this.currentDiagramType === DiagramType.stateMachine;
    }

    // ELK Layout options for the graph element
    protected override graphOptions(sgraph: SGraph, index: SModelIndex): LayoutOptions | undefined {
        if (this.isStateMachine) {
            // State machines read best top-to-bottom with generous spacing so the
            // multi-line transition labels don't collide. `NETWORK_SIMPLEX` +
            // orthogonal edge routing keeps transitions tidy between states.
            return {
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
                'elk.edgeRouting': 'ORTHOGONAL',
                'elk.layered.spacing.nodeNodeBetweenLayers': '55',
                'elk.spacing.nodeNode': '50',
                'elk.spacing.edgeNode': '25',
                'elk.spacing.edgeEdge': '18',
                'elk.edgeLabels.placement': 'CENTER',
                // Reserve room around edge labels so they don't overlap each
                // other or the edges/nodes.
                'elk.spacing.edgeLabel': '10',
                'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
                // Lay out composite (nested) states and route transitions that
                // cross containment boundaries.
                'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
                // Route self-transitions as compact loops beside the node instead
                // of long edges that sweep across the whole diagram.
                'elk.layered.feedbackEdges': 'true',
                'elk.layered.spacing.baseValue': '40',
                'elk.layered.selfLoopDistribution': 'EQUALLY',
            };
        }
        return {
            'elk.algorithm': 'layered',
            // Apply some spacing at the graph level to ensure the layered algorithm picks it up.
            'elk.spacing.labelPortHorizontal': '5',
            'elk.spacing.portPort': '10',
            // Edge labels (state machine transition labels) must be placed by ELK;
            // without this the layered algorithm can mishandle labelled edges.
            'elk.edgeLabels.placement': 'CENTER',
            'elk.spacing.edgeLabel': '5',
        };
    }

    // ELK Layout options for node elements
    protected override nodeOptions(snode: SNode, index: SModelIndex): LayoutOptions | undefined {
        if (this.isStateMachine) {
            // Choice nodes are drawn as diamonds; give them 50% more vertical
            // space than states (taller diamond, label fits between the narrowing
            // top/bottom corners) and 20% more horizontal padding.
            if (snode.type === 'node:choice') {
                return {
                    'elk.nodeLabels.placement': 'INSIDE, H_CENTER, V_CENTER',
                    'elk.nodeSize.constraints': 'NODE_LABELS, MINIMUM_SIZE',
                    'elk.nodeSize.minimum': '(48, 45)',
                    'elk.padding': '[top=12,left=12,bottom=12,right=12]',
                };
            }
            // A composite state (one with nested states/choices) puts its name at
            // the top and leaves room for the children laid out inside it.
            const isComposite = (snode.children ?? []).some(
                c => c.type === 'node:state' || c.type === 'node:choice'
            );
            if (isComposite) {
                return {
                    'elk.nodeLabels.placement': 'INSIDE, H_CENTER, V_TOP',
                    'elk.padding': '[top=28,left=14,bottom=14,right=14]',
                };
            }
            // Leaf state machine nodes have no ports; size them from their label
            // and center the label inside the box.
            return {
                'elk.nodeLabels.placement': 'INSIDE, H_CENTER, V_CENTER',
                'elk.nodeSize.constraints': 'NODE_LABELS, MINIMUM_SIZE',
                'elk.nodeSize.minimum': '(40, 30)',
                'elk.padding': '[top=8,left=10,bottom=8,right=10]',
            };
        }
        return {
            "elk.nodeLabels.placement": "INSIDE, H_CENTER, V_CENTER",
            "elk.portLabels.nextToPortIfPossible": 'true',
            'elk.portConstraints': 'FIXED_SIDE', // So that elk.port.side can take effect.
            "elk.nodeSize.constraints": "PORTS, PORT_LABELS, NODE_LABELS, MINIMUM_SIZE",
        };
    }

    // ELK Layout options for edge elements
    protected override edgeOptions(sedge: SEdge, index: SModelIndex): LayoutOptions | undefined {
        return {};
    }

    // ELK Layout options for label elements
    protected override labelOptions(slabel: SLabel, index: SModelIndex): LayoutOptions | undefined {
        return {};
    }

    // ELK Layout options for port elements
    protected override portOptions(sport: PortSNode, index: SModelIndex): LayoutOptions | undefined {
        return {
            'elk.port.side': sport.isOutput ? 'EAST' : 'WEST',
        };
    }
}
