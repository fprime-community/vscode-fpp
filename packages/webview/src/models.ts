/**
 * These models store minimal FPP information pertinent to rendering components.
 */
import { SLabel, SNode, SPort } from "sprotty-protocol";

export interface ComponentNode extends SNode {
    name: string
}

export interface PortNode extends SPort {
    name: string
}