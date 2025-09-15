import { LayoutOptions } from "elkjs";
import { DefaultLayoutConfigurator } from "sprotty-elk";
import { SGraph, SEdge, SNode, SLabel } from 'sprotty-protocol';
import { SModelIndex } from "sprotty-protocol";
import { PortSNode } from "../../common/models";
import { DiagramType } from "./manager";

export class FppDiagramConfig extends DefaultLayoutConfigurator {

    // Stateful diagram options
    public hideUnusedPorts = true;                      // By default, hide unused ports.
    public currentDiagramType: DiagramType | undefined; // Current diagram type
    public fullyQualifiedName: string = "";             // Fully qualified name of the element currently displayed

    // ELK Layout options for the graph element
    protected override graphOptions(sgraph: SGraph, index: SModelIndex): LayoutOptions | undefined {
        return {
            'elk.algorithm': 'layered',
        };
    }

    // ELK Layout options for node elements
    protected override nodeOptions(snode: SNode, index: SModelIndex): LayoutOptions | undefined {
        return {
            "elk.nodeLabels.placement": "INSIDE, H_CENTER, V_CENTER",
            "elk.portLabels.placement": "NEXT_TO_PORT_OF_POSSIBLE",
            "elk.portLabels.nextToPortIfPossible": 'true',
            'elk.portConstraints': 'FIXED_SIDE', // So that elk.port.side can take effect.
            "elk.nodeSize.constraints": "PORTS, NODE_LABELS, MINIMUM_SIZE",
            "elk.spacing.labelPortHorizontal": "5", // Does not seem to take effect.
            "elk.spacing.portPort": "15", // Does not seem to take effect.
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