import { LayoutOptions } from "elkjs";
import { DefaultLayoutConfigurator } from "sprotty-elk";
import { SGraph, SEdge, SNode, SLabel } from 'sprotty-protocol';
import { SModelIndex } from "sprotty-protocol";
import { PortSNode } from "../../common/models";

export enum DiagramType {
    component,
    connectionGroup,
    topology
}

export class FppDiagramConfig extends DefaultLayoutConfigurator {

    // Stateful diagram options
    public hideUnusedPorts = true;                      // By default, hide unused ports.
    public currentDiagramType: DiagramType | undefined; // Current diagram type
    public fullyQualifiedName: string = "";             // Fully qualified name of the element currently displayed

    // ELK Layout options for the graph element
    protected override graphOptions(sgraph: SGraph, index: SModelIndex): LayoutOptions | undefined {
        return {
            'elk.algorithm': 'layered',
            // Apply some spacing at the graph level to ensure the layered algorithm picks it up.
            'elk.spacing.labelPortHorizontal': '5',
            'elk.spacing.portPort': '10',
        };
    }

    // ELK Layout options for node elements
    protected override nodeOptions(snode: SNode, index: SModelIndex): LayoutOptions | undefined {
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