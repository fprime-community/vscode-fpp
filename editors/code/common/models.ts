/**
 * These models store minimal FPP information pertinent to rendering components.
 *
 * They match the extra fields emitted by the Rust `fpp_diagram` sprotty lowering
 * (`kind` on component nodes, `kind`/`isOutput` on ports) and are shared between
 * the extension host and the webview.
 */
import type { SNode, SPort } from "sprotty-protocol";

export interface ComponentSNode extends SNode {
    kind: string
}

export interface PortSNode extends SPort {
    kind: string,
    isOutput: boolean, // Store output info here for ELK layout config. Input ports are positioned west, and output ports are positioned east.
}
