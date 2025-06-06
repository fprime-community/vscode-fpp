/**
 * Since the information needed to render nodes is fully contained in the AST nodes,
 * the SGraph interfaces embed the AST interfaces to retrieve the info.
 */
import { SNode } from "sprotty-protocol";
import { ComponentDecl, PortInstanceDecl } from "../parser/ast";

export interface ComponentNode extends SNode {
    astNode: ComponentDecl
}

export interface PortNode extends SNode {
    astNode: PortInstanceDecl
}