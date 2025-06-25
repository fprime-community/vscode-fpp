/**
 * These models store minimal FPP information pertinent to rendering components.
 */
import { SNode, SPort } from "sprotty-protocol";

export interface ComponentSNode extends SNode {
    kind: string
}

export interface PortSNode extends SPort {
    kind: string,
    isOutput: boolean, // Store output info here for ELK layout config. Input ports are positioned west, and output ports are positioned east.
}