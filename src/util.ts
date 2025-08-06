import { ComponentDecl, InterfaceImportStmt } from "./parser/ast";
import { MemberTraverser } from "./passes/traverser";

/**
 * Get the interface decl from combining the def scope and the interface name.
 * If member.symbol has more than one identifier (e.g., `import Drv.Tick`), that means
 * the interface is defined outside the current scope. In this case, do not prepend
 * the component def's scope. But if member.symbol has only one identifier (e.g., `import Framer`),
 * that means the interface is defined under the same scope as the component def.
 * In this case, prepend the component def's scope (e.g., Svc). Note that only
 * the first identifier is prepended.
 * @param importStmt The interface import statement
 * @param componentDef The parent component definition of the interface import statement
 * @returns The full name of the interface decl for lookup on the decl map. Undefined if the import statement is invalid.
 */
export function getInterfaceFullnameFromImport(importStmt: InterfaceImportStmt, componentDef: ComponentDecl): string | undefined {
    let interfaceFullName = undefined;
    if (importStmt.symbol.length > 1) {
        interfaceFullName = MemberTraverser.flat(importStmt.symbol);
    } else if (importStmt.symbol.length === 1) {
        interfaceFullName = `${componentDef.scope[0].value}.${MemberTraverser.flat(importStmt.symbol)}`;
    }
    return interfaceFullName;
}