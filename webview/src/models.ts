/**
 * These models store minimal FPP information pertinent to rendering components.
 */
import { SNode, SPort } from "sprotty-protocol";

export interface ComponentSNode extends SNode {
    kind: string
}

export interface PortSNode extends SPort {
    kind: string
}