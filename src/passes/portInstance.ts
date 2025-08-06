import { DeclCollector, SymbolType } from "./decl";
import { MemberTraverser } from "./traverser";
import * as Fpp from '../parser/ast';
import { DiangosicManager } from "../diagnostics";

export class PortInstancePass extends MemberTraverser {
    constructor(readonly decl: DeclCollector) {
        super();
    }

    private update(ast: Fpp.ComponentInstanceDecl, componentDef: Fpp.ComponentDecl, member: Fpp.ComponentMember, componentScope: Fpp.QualifiedIdentifier) {
        switch (member.type) {
            case 'GeneralPortInstanceDecl': {
                const portName = MemberTraverser.flat(componentScope, member.name);
                if (member.kind.isOutput) {
                    this.decl.outputPortInstances.set(portName, member);
                    this.decl.translationUnitDeclarations.get(ast.location.source)!.add(
                        DiangosicManager.asRange(ast.name.location),
                        [SymbolType.outputPortInstance, portName]
                    );
                } else {
                    this.decl.inputPortInstances.set(portName, member);
                    this.decl.translationUnitDeclarations.get(ast.location.source)!.add(
                        DiangosicManager.asRange(ast.name.location),
                        [SymbolType.inputPortInstance, portName]
                    );
                }
                break;
            }
            case 'SpecialPortInstanceDecl': {
                const portName = MemberTraverser.flat(componentScope, member.name);
                switch (member.kind.kind.value) {
                    case 'commandRecv':
                    case 'commandReg':
                    case 'commandResp':
                    case 'event':
                    case 'paramGet':
                    case 'paramSet':
                    case 'telemetry':
                    case 'textEvent':
                    case 'timeGet':
                        // Auto-ports
                        break;
                    case 'productGet':
                    case 'productRequest':
                    case 'productSend':
                        this.decl.outputPortInstances.set(portName, member);
                        this.decl.translationUnitDeclarations.get(ast.location.source)!.add(
                            DiangosicManager.asRange(ast.name.location),
                            [SymbolType.outputPortInstance, portName]
                        );
                        break;
                    case 'productRecv':
                        this.decl.inputPortInstances.set(portName, member);
                        this.decl.translationUnitDeclarations.get(ast.location.source)!.add(
                            DiangosicManager.asRange(ast.name.location),
                            [SymbolType.inputPortInstance, portName]
                        );
                }
                break;
            }
            case 'IncludeStmt':
                if (member.resolved) {
                    for (const m of member.resolved.members) {
                        this.update(ast, componentDef, m, componentScope);
                    }
                }
                break;
            // If this component imports port interfaces,
            // add the imported ports to the port instance map.
            case 'InterfaceImportStmt':
                // Get the interface decl from combining the def scope and the interface name.
                // If member.symbol has more than one identifier (e.g., `import Drv.Tick`), that means
                // the interface is defined outside the current scope. In this case, do not prepend
                // the component def's scope. But if member.symbol has only one identifier (e.g., `import Framer`),
                // that means the interface is defined under the same scope as the component def.
                // In this case, prepend the component def's scope (e.g., Svc). Note that only
                // the first identifier is prepended.
                let interfaceFullName = undefined;
                if (member.symbol.length > 1) {
                    interfaceFullName = MemberTraverser.flat(member.symbol);
                } else if (member.symbol.length === 1) {
                    interfaceFullName = `${componentDef.scope[0].value}.${MemberTraverser.flat(member.symbol)}`;
                } else {
                    console.error("Interface full name undefined.");
                    return;
                }

                // Get the interface decl.
                const interfaceDecl = this.decl.interfaces.get(interfaceFullName);
                if (!interfaceDecl) {
                    console.error(`interfaceDecl for ${interfaceFullName} not found`);
                    return;
                }

                // Update all ports from the interface decl.
                interfaceDecl.members.map(m => {
                    this.update(ast, componentDef, m, componentScope);
                });
                break;
        }
    }

    protected componentInstanceDecl(ast: Fpp.ComponentInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        const resolved = this.decl.resolve(ast.fppType.type, scope, SymbolType.component);
        if (!resolved) {
            // This error will be annotated later
            return;
        }

        const componentScope = [...scope, ast.name];

        const componentAst = this.decl.components.get(MemberTraverser.flat(resolved));
        if (componentAst) {
            for (const member of componentAst.members) {
                this.update(ast, componentAst, member, componentScope);
            }
        }
    }
};