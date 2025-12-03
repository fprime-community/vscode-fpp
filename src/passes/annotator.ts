import * as vscode from 'vscode';
import * as path from 'path';

import * as fs from 'fs';

import * as Fpp from '../parser/ast';
import { RangeAssociator } from '../associator';
import { DeclCollector, SymbolType, fppLegend, tokenTypeNames } from './decl';
import { MemberTraverser } from './traverser';
import { DiangosicManager } from '../diagnostics';
import { ExprTraverser, TypeNameValidator, TypeValidator } from '../evaluator';


export let symLinkCache = new Map<string, string>();

class SymlinkedMap<V> extends Map<string, V> {
    private real(key: string): string {
        const cached = symLinkCache.get(key);
        if (cached) {
            return cached;
        }

        let realpath = fs.realpathSync(key, { encoding: 'utf-8' });
        symLinkCache.set(key, realpath);
        return realpath;
    }

    get(key: string): V | undefined {
        return super.get(this.real(key));
    }

    delete(key: string): boolean {
        return super.delete(this.real(key));
    }

    set(key: string, value: V) {
        return super.set(this.real(key), value);
    }
}

// Denotes how declarations can be referenced in other areas
// The resolver uses this to provide the correct semantic coloring
export const tokenParents = new Map<SymbolType, SymbolType[]>([
    [SymbolType.module, [SymbolType.module]],
    [SymbolType.topology, [SymbolType.module]],
    [SymbolType.component, [SymbolType.module]],
    [SymbolType.componentInstance, [SymbolType.module]],
    [SymbolType.constant, [SymbolType.module, SymbolType.type, SymbolType.component]],
    [SymbolType.graphGroup, [SymbolType.module, SymbolType.topology]],
    [SymbolType.port, [SymbolType.module]],
    [SymbolType.type, [SymbolType.module, SymbolType.component]],
    [SymbolType.inputPortInstance, [SymbolType.module, SymbolType.componentInstance]],
    [SymbolType.outputPortInstance, [SymbolType.module, SymbolType.componentInstance]],
    [SymbolType.inputPortDecl, [SymbolType.module, SymbolType.component]],
    [SymbolType.outputPortDecl, [SymbolType.module, SymbolType.component]],
    [SymbolType.specialPort, [SymbolType.module, SymbolType.component]],
    [SymbolType.command, [SymbolType.module, SymbolType.component]],
    [SymbolType.event, [SymbolType.module, SymbolType.component]],
    [SymbolType.parameter, [SymbolType.module, SymbolType.component]],
    [SymbolType.telemetry, [SymbolType.module, SymbolType.component]],
    [SymbolType.telemetry, [SymbolType.module, SymbolType.component]],
    // [SymbolType.action, [SymbolType.stateMachine, SymbolType.state]],
    [SymbolType.action, [SymbolType.stateMachine]],
    [SymbolType.guard, [SymbolType.stateMachine]],
    [SymbolType.signal, [SymbolType.stateMachine]],
    // [SymbolType.choice, [SymbolType.stateMachine, SymbolType.state]],
    [SymbolType.state, [SymbolType.stateMachine, SymbolType.state]],
    [SymbolType.stateMachine, [SymbolType.module, SymbolType.component]],
    [SymbolType.stateMachineInstance, [SymbolType.component]],
]);

/**
 * Annotates the following on a single AST:
 *   - token highlighting semantics
 *   - diagnostic messages
 *   - document links
 */
export class FppAnnotator extends MemberTraverser {
    tokens = new SymlinkedMap<vscode.SemanticTokensBuilder>();
    definitions = new SymlinkedMap<RangeAssociator<Fpp.Decl>>();
    links = new SymlinkedMap<vscode.DocumentLink[]>();

    exprTrav = new class extends ExprTraverser {
        parent!: FppAnnotator;

        constantUse(node: Fpp.BasicExpr, use: Fpp.QualifiedIdentifier, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
            const constant = this.parent.identifier(use, scope, SymbolType.constant) as Fpp.ConstantDefinition | undefined;

            if (!constant) {
                this.emit(vscode.Uri.file(node.location.source), new vscode.Diagnostic(
                    MemberTraverser.asRange(node.location),
                    'Unresolved reference'
                ));

                return Fpp.errorValue;
            }

            const value = this.traverse(constant.value!, constant.scope, validator);
            constant.value!.evaluated = value;
            if (constant.type === "EnumMember") {
                return {
                    type: Fpp.PrimExprType.integer,
                    value: (value as Fpp.IntExprValue).value,
                    enumMember: constant,
                };
            }

            return value;
        }

        identifierExpr(ast: Fpp.IdentifierExpr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
            ast.evaluated = this.constantUse(ast, [ast.name], scope, validator);
            return ast.evaluated;
        }

        dotExpr(ast: Fpp.DotExpr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
            // There are two cases since FPP is syntactically ambigious here:
            //   1. This dot expression is actually a qualified identifier use of a constant
            //   2. This dot expression is an actual expression that selects a member of a struct

            // If this expression is a qualified identfier, the left side may be a constant or the entire expression could be a constant
            function asQualIdent(e: Fpp.Expr): Fpp.QualifiedIdentifier | null {
                switch (e.type) {
                    case 'Dot':
                        const left = asQualIdent(e.e);
                        if (left) {
                            return [...left, e.id];
                        } else {
                            return null;
                        }
                    case 'Identifier':
                        return [e.name];
                    default:
                        return null;
                }
            }

            const memberSelection = (leftValue: Fpp.ExprValue, member: Fpp.Identifier): Fpp.ExprValue => {
                if (leftValue.type === Fpp.PrimExprType.error) {
                    return Fpp.errorValue;
                }

                if (leftValue.type !== Fpp.PrimExprType.struct) {
                    this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                        MemberTraverser.asRange(member.location),
                        `Expected an struct value, got '${leftValue.type}'`
                    ));

                    return Fpp.errorValue;
                }

                if (leftValue.value[member.value] === undefined) {
                    this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                        MemberTraverser.asRange(member.location),
                        `Struct value has no member '${member.value}'`
                    ));

                    return Fpp.errorValue;
                }

                this.parent.semantic(member, SymbolType.constant);
                return leftValue.value[member.value];
            };

            const qid = asQualIdent(ast);
            if (qid) {
                // The expression is member selection or a use

                // Try to look up the symbol
                const constantSymbol = this.parent.decl.resolve(qid, scope, SymbolType.constant);
                if (constantSymbol) {
                    return this.constantUse(ast, qid, scope, validator);
                } else {
                    // The left side could be a value selection
                    // Keep trying until we find the constant definition
                    let constantQid = [...qid];
                    const memberSelections = [];
                    while (constantQid.length >= 2) {
                        // Remove the last identifier
                        memberSelections.push(constantQid.pop()!);

                        // Look up the symbol
                        const constant = this.parent.decl.resolve(constantQid, scope, SymbolType.constant);
                        if (constant) {
                            const constantValue = this.constantUse({
                                type: "",
                                location: {
                                    source: constantQid[0].location.source,
                                    start: constantQid[0].location.start,
                                    end: constantQid[constantQid.length - 1].location.end,
                                }
                            }, qid, scope, {});

                            // Apply all the member selections to the value
                            return memberSelections.reverse().reduce(memberSelection, constantValue);
                        }
                    }

                    // We reached the end of the line, this must be an invalid symbol selection
                    this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                        MemberTraverser.asRange(ast.location),
                        'Unresolved reference'
                    ));

                    return Fpp.errorValue;
                }
            } else {
                // Member selection of a literal
                const leftValue = this.traverse(ast.e, scope, {});
                return memberSelection(leftValue, ast.id);
            }
        }

        subscriptExpr(ast: Fpp.SubscriptExpr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
            const arrValue = this.traverse(ast.e1, scope, validator);
            const idxValue = this.traverse(
                ast.e2,
                scope,
                new TypeNameValidator({
                    complex: false,
                    type: "I32",
                    location: Fpp.implicitLocation,
                }, scope)
            );

            if (arrValue.type === Fpp.PrimExprType.error || idxValue.type === Fpp.PrimExprType.error) {
                return Fpp.errorValue;
            }

            if (arrValue.type !== Fpp.PrimExprType.array) {
                this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                    MemberTraverser.asRange(ast.e1.location),
                    `Expected an array value, got '${arrValue.type}'`
                ));

                return Fpp.errorValue;
            }

            if (idxValue.type === Fpp.PrimExprType.integer) {
                if (idxValue.value < 0) {
                    this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                        MemberTraverser.asRange(ast.e2.location),
                        'Index cannot be negative'
                    ));

                    return Fpp.errorValue;
                }

                if (idxValue.value >= arrValue.value.length) {
                    this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                        MemberTraverser.asRange(ast.e2.location),
                        `Index (${idxValue.value}) out of range [0, ${arrValue.value.length})`
                    ));

                    return Fpp.errorValue;
                } else {
                    return arrValue.value[idxValue.value];
                }
            } else {
                return Fpp.errorValue;
            }
        }

        resolveType(typeName: Fpp.TypeName, scope: Fpp.QualifiedIdentifier): Fpp.TypeDecl | undefined {
            if (typeName.complex) {
                const resolvedName = this.parent.decl.resolve(typeName.type, scope, SymbolType.type);
                return resolvedName ? this.parent.decl.get(MemberTraverser.flat(resolvedName), SymbolType.type)! as Fpp.TypeDecl : undefined;
            }

            return undefined;
        }

        emit(uri: vscode.Uri, diagnostic: vscode.Diagnostic): void {
            this.parent.emit(uri, diagnostic);
        }
    }();

    constructor(readonly decl: DeclCollector) {
        super();
        this.exprTrav.parent = this;
    }

    clear(source: string) {
        super.clear(source);
        this.tokens.delete(source);
        this.definitions.delete(source);
        this.links.delete(source);
    }

    clearAll() {
        this.tokens.clear();
        this.definitions.clear();
        this.links.clear();
    }

    pass(ast: Fpp.TranslationUnit, scope: Fpp.QualifiedIdentifier = []): void {
        this.clear(ast.location.source);
        super.pass(ast, scope);
    }

    semantic(tok: Fpp.Identifier, type: SymbolType) {
        // Skip error or implicit semantics
        if (tok.location.start.line < 0) {
            return;
        }

        let builder = this.tokens.get(tok.location.source);
        if (!builder) {
            builder = new vscode.SemanticTokensBuilder(fppLegend);
            this.tokens.set(tok.location.source, builder);
        }

        builder.push(FppAnnotator.asRange(tok.location), fppLegend.tokenTypes[type]);
    }

    addDefinition(source: string, range: vscode.Range, value: Fpp.Decl) {
        let associator = this.definitions.get(source);
        if (!associator) {
            associator = new RangeAssociator<Fpp.Decl>();
            this.definitions.set(source, associator);
        }

        const fullQualified = [...value.scope, value.name];
        this.decl.references.add(DiangosicManager.flat(fullQualified), source, range);
        associator.add(range, value);
    }

    addLink(source: string, link: vscode.DocumentLink) {
        let links = this.links.get(source);
        if (!links) {
            this.links.set(source, [link]);
        } else {
            links.push(link);
        }
    }

    identifier(
        ident: Fpp.QualifiedIdentifier,
        scope: Fpp.QualifiedIdentifier,
        type: SymbolType,
        lookFrom: Fpp.QualifiedIdentifier = [],
    ): Fpp.Decl | undefined {
        if (!ident) {
            return;
        }

        // Marks all parts of the qual-ident
        const resolved = this.decl.resolve(ident, scope, type, lookFrom);
        if (!resolved) {
            if (!ident[0]) {
                return;
            }

            // Make some assumptions about semantic annotations to keep things pretty
            for (let i = 0; i < ident.length; i++) {
                if (i + 1 === ident.length) {
                    this.semantic(ident[i], type);

                    if (ident.length === 1) {
                        this.emit(
                            vscode.Uri.file(ident[i].location.source),
                            new vscode.Diagnostic(
                                MemberTraverser.asRange(ident[i].location),
                                `No ${tokenTypeNames[type].toLowerCase()} '${ident[i].value}' found`
                            )
                        );
                    } else {
                        this.emit(
                            vscode.Uri.file(ident[i].location.source),
                            new vscode.Diagnostic(
                                MemberTraverser.asRange(ident[i].location),
                                `No ${tokenTypeNames[type].toLowerCase()} '${ident[i].value}' found in ${MemberTraverser.flat(ident.slice(0, 1))}`
                            )
                        );
                    }
                } else {
                    this.semantic(ident[i], SymbolType.module);
                }
            }

            return;
        }

        const finalTok = resolved[resolved.length - 1];
        this.semantic(finalTok, type);
        const resolveDecl = this.decl.get(MemberTraverser.flat(resolved), type)!;

        // Attach the definition to this token
        this.addDefinition(finalTok.location.source, FppAnnotator.asRange(resolved[resolved.length - 1].location), resolveDecl);

        const fullyResolvedQualifier = [...resolveDecl.scope, resolveDecl.name];

        if (resolved.length === 1) {
            return resolveDecl;
        }

        // Mark all resolved tokens with their semantics
        // Skip any inferred tokens
        let i = 1;
        let possibleTypes: SymbolType[] | undefined = tokenParents.get(type);
        if (!possibleTypes) {
            throw new Error(`No token parent registered for symbol type ${SymbolType[type]}`);
        }

        for (; i < resolved.length; i++) {
            const buildI = resolved.slice(0, resolved.length - i);
            const build = MemberTraverser.flat(buildI);

            const tok = resolved[resolved.length - i - 1];
            if (tok.location.start.line < 0) {
                return resolveDecl;
            }

            let decl: Fpp.Decl | undefined;
            let foundT: SymbolType = SymbolType.module;
            for (const tryT of possibleTypes) {
                decl = this.decl.get(build, tryT);
                if (decl) {
                    foundT = tryT;
                    possibleTypes = tokenParents.get(tryT);
                    if (!possibleTypes) {
                        throw new Error(`No token parent registered for symbol type ${SymbolType[type]}`);
                    }
                    break;
                }
            }

            if (decl) {
                this.semantic(tok, foundT);

                // Attach the definition to this token
                this.addDefinition(tok.location.source, FppAnnotator.asRange(tok.location), decl);
            } else {
                // If the declaration doesn't explicitly exist,
                // it must be module. Module declarations are not
                // unique and just provide namespacing to declarations
                // They do not have a single declaration

                this.addDefinition(tok.location.source, FppAnnotator.asRange(tok.location), {
                    location: fullyResolvedQualifier[resolved.length - i - 1].location,
                    scope: resolved.slice(0, resolved.length - i - 1),
                    type: "ModuleDecl",
                    name: fullyResolvedQualifier[resolved.length - i - 1]
                });
                this.semantic(tok, SymbolType.module);
                break;
            }
        }

        for (let j = 0; j < resolved.length - i; j++) {
            const tok = resolved[j];
            if (tok.location.start.line < 0) {
                continue;
            }

            this.addDefinition(tok.location.source, FppAnnotator.asRange(tok.location), {
                location: fullyResolvedQualifier[j].location,
                scope: resolved.slice(0, j),
                type: "ModuleDecl",
                name: fullyResolvedQualifier[j]
            });
            this.semantic(tok, SymbolType.module);
        }

        return resolveDecl;
    }

    private expr(expr: Fpp.Expr | undefined, scope: Fpp.QualifiedIdentifier, expectedReturn: Fpp.TypeName) {
        if (expr) {
            return this.exprTrav.traverse(expr, scope, new TypeNameValidator(expectedReturn, scope));
        }
    }

    private type(typename: Fpp.TypeName, scope: Fpp.QualifiedIdentifier) {
        if (typename.complex) {
            this.identifier(typename.type, scope, SymbolType.type);
        } else if (typename.type === "string") {
            if (typename.size) {
                this.expr(typename.size, scope, {
                    complex: false,
                    type: "U32",
                    location: Fpp.implicitLocation
                });
            }
        }
    }

    abstractTypeDecl(ast: Fpp.AbstractTypeDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.type);
    }

    aliasTypeDecl(ast: Fpp.AliasTypeDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.type);
        this.type(ast.fppType, scope);
    }

    arrayDecl(ast: Fpp.ArrayDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.type);
        this.type(ast.fppType, scope);
        this.expr(ast.default_, scope, { complex: true, type: [ast.name], location: Fpp.implicitLocation });
        const sizeValue = this.expr(ast.size, scope, { complex: false, type: "U32", location: Fpp.implicitLocation })!;

        ast.annotatedValue = `[${sizeValue.value}]`;
    }

    constantDecl(ast: Fpp.ConstantDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.constant);

        const value = this.exprTrav.traverse(ast.value, scope, {
            validate: (value) => {
                switch (value.type) {
                    case Fpp.PrimExprType.integer:
                    case Fpp.PrimExprType.floating:
                    case Fpp.PrimExprType.boolean:
                    case Fpp.PrimExprType.string:
                    case Fpp.PrimExprType.array:
                    case Fpp.PrimExprType.struct:
                        return undefined;
                }
            }
        });

        ast.annotatedValue = `= ${value.value}`;
    }

    structDecl(ast: Fpp.StructDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.type);
        for (const member of ast.members) {
            this.semantic(member.name, SymbolType.formalParameter);
            this.expr(member.size, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
            this.type(member.fppType, scope);
        }

        const structType = new Map<string, Fpp.StructMember>();

        if (ast.members.length > 0) {
            const record: [string, string][] = [];
            const memberString = ast.members.map(member =>
                `${member.name.value}: ${DeclCollector.typeName(member.fppType) + (member.size ? `[${member.size.evaluated?.value ?? 1}]` : '')}`
            ).join(', ');

            for (const member of ast.members) {
                record.push([member.name.value, member.annotation ?? '']);
                structType.set(member.name.value, member);
            }

            ast.annotatedMemberName = "member";
            ast.annotatedValue = `{${memberString}}`;
            ast.annotatedMembers = record;
        }

        if (ast.default_) {
            for (const member of ast.default_.value) {
                const memberDef = structType.get(member.name.value);
                if (!memberDef) {
                    this.emit(
                        vscode.Uri.file(member.location.source),
                        new vscode.Diagnostic(
                            MemberTraverser.asRange(member.name.location),
                            `No member '${member.name.value}'`
                        )
                    );
                } else {
                    this.semantic(member.name, SymbolType.formalParameter);
                    this.addDefinition(
                        member.location.source,
                        FppAnnotator.asRange(member.name.location),
                        memberDef
                    );

                    this.expr(member.value, scope, memberDef.fppType);
                }
            }
        }
    }

    enumDecl(ast: Fpp.EnumDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.type);
        for (const member of ast.members) {
            this.semantic(member.name, SymbolType.constant);

            const value = this.exprTrav.traverse(
                member.value!, scope,
                new TypeNameValidator(
                    ast.fppType ?? { complex: false, type: "I32", location: Fpp.implicitLocation },
                    scope
                )
            );

            member.annotatedValue = `= ${value.value}`;
        }

        if (ast.fppType) {
            this.type(ast.fppType, scope);
        }

        if (ast.default_) {
            this.expr(ast.default_, [...scope, ast.name], ast.fppType ?? {
                complex: false,
                type: "I32",
                location: Fpp.implicitLocation
            });
        }
    }

    commandDecl(ast: Fpp.CommandDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.command);
        for (const member of ast.params) {
            this.semantic(member.name, SymbolType.formalParameter);
            this.type(member.type, scope);
        }
    }

    paramDecl(ast: Fpp.ParamDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.parameter);
        this.type(ast.fppType, scope);
        this.expr(ast.default_, scope, ast.fppType);
    }

    generalPortInstanceDecl(ast: Fpp.GeneralPortInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, (ast.kind.direction.value === "input") ? SymbolType.inputPortInstance : SymbolType.outputPortInstance);
        if (ast.fppType) {
            this.identifier(ast.fppType.type, scope, SymbolType.port);
        }

        this.expr(ast.n, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
    }

    specialPortInstanceDecl(ast: Fpp.SpecialPortInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic({ value: "", location: ast.kind.location }, SymbolType.modifier);

        // Not a port instance because we shouldn't be allowed to
        // manually connect general ports to special ports
        this.semantic(ast.name, SymbolType.specialPort);
    }

    telemetryChannelDecl(ast: Fpp.TelemetryChannelDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.telemetry);
        this.type(ast.fppType, scope);
    }

    eventDecl(ast: Fpp.EventDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.event);
        for (const param of ast.params) {
            this.semantic(param.name, SymbolType.formalParameter);
            this.type(param.type, scope);
        }
    }

    matchStmt(ast: Fpp.MatchStmt, scope: Fpp.QualifiedIdentifier): void {
        this.identifier([...scope, ast.match], scope, SymbolType.outputPortDecl);
        this.identifier([...scope, ast.with], scope, SymbolType.inputPortDecl);
    }

    internalPortDecl(ast: Fpp.InternalPortDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.specialPort);
        for (const param of ast.params) {
            this.semantic(param.name, SymbolType.formalParameter);
            this.type(param.type, scope);
        }
    }

    interfaceDecl(ast: Fpp.InterfaceDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.interface);
        super.interfaceDecl(ast, scope);
    }

    componentInstanceDecl(ast: Fpp.ComponentInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.componentInstance);

        let fppTypeDecl: Fpp.Decl | undefined;
        if (ast.fppType) {
            fppTypeDecl = this.identifier(ast.fppType.type, scope, SymbolType.component);
        }

        if (ast.at) {
            if (!ast.fppType) {
                this.emit(
                    vscode.Uri.file(ast.location.source),
                    new vscode.Diagnostic(FppAnnotator.asRange(ast.at.location),
                        "Component instance with an 'at' specifier must also include a FPrime component reference")
                );
            } else {
                // The 'at' path is a header file relative to the component definition
                if (fppTypeDecl) {
                    const resolvedPath = path.resolve(path.dirname(fppTypeDecl.name.location.source), ast.at.value);

                    if (fs.existsSync(resolvedPath)) {
                        this.addLink(
                            ast.location.source,
                            new vscode.DocumentLink(
                                MemberTraverser.asRange(ast.at.location),
                                vscode.Uri.file(resolvedPath)
                            )
                        );
                    } else {
                        this.emit(
                            vscode.Uri.file(ast.location.source),
                            new vscode.Diagnostic(FppAnnotator.asRange(ast.at.location),
                                `File '${resolvedPath}' does not exist`)
                        );
                    }
                }
            }
        }

        this.expr(ast.baseId, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        this.expr(ast.queueSize, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        this.expr(ast.stackSize, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        this.expr(ast.priority, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        this.expr(ast.cpu, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });

        for (const init of ast.init) {
            this.expr(init.phase, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        }
    }

    portDecl(ast: Fpp.PortDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.port);
        if (ast.returnType) {
            this.type(ast.returnType, scope);
        }

        for (const param of ast.params) {
            this.semantic(param.name, SymbolType.formalParameter);
            this.type(param.type, scope);
        }
    }

    locationStmt(ast: Fpp.LocationStmt, scope: Fpp.QualifiedIdentifier): void {
        switch (ast.kind.value) {
            case 'instance':
                this.identifier(ast.name, scope, SymbolType.componentInstance);
                break;
            case 'component':
                this.identifier(ast.name, scope, SymbolType.component);
                break;
            case 'constant':
                this.identifier(ast.name, scope, SymbolType.constant);
                break;
            case 'port':
                this.identifier(ast.name, scope, SymbolType.port);
                break;
            case 'topology':
                this.identifier(ast.name, scope, SymbolType.topology);
                break;
            case 'type':
                this.identifier(ast.name, scope, SymbolType.type);
                break;
        }

        this.addLink(
            ast.location.source,
            new vscode.DocumentLink(
                MemberTraverser.asRange(ast.path.location),
                vscode.Uri.file(ast.path.value)
            )
        );
    }

    protected includeStmt(ast: Fpp.IncludeStmt<Fpp.Member>, scope: Fpp.QualifiedIdentifier): void {
        this.addLink(
            ast.location.source,
            new vscode.DocumentLink(
                MemberTraverser.asRange(ast.include.location),
                vscode.Uri.file(ast.include.value)
            )
        );

        this.clear(vscode.Uri.file(ast.include.value).path);
        super.includeStmt(ast, scope);
    }

    componentInstanceSpec(ast: Fpp.ComponentInstanceSpec, scope: Fpp.QualifiedIdentifier): void {
        this.identifier(ast.name, scope, SymbolType.componentInstance);
    }

    private checkPortIdx(portDecl: Fpp.GeneralPortInstanceDecl, idx: Fpp.ExprValue, idxLoc: Fpp.Location) {
        let n: Fpp.ExprValue = { type: Fpp.PrimExprType.integer, value: 1 };
        if (portDecl.n) {
            n = this.exprTrav.traverse(portDecl.n, portDecl.scope, {});
        }

        if (idx.type === Fpp.PrimExprType.integer && n.type === Fpp.PrimExprType.integer) {
            if (idx.value >= n.value) {
                this.emit(
                    vscode.Uri.file(idxLoc.source),
                    new vscode.Diagnostic(FppAnnotator.asRange(idxLoc),
                        `Port index out of range ${idx.value} >= ${n.value}`)
                );
            }
        }
    }

    directGraphDecl(ast: Fpp.DirectGraphDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.graphGroup);
        for (const conn of ast.connections) {
            const outputPort = this.identifier(conn.source.node, scope, SymbolType.outputPortInstance);
            const outputPortIdx = this.expr(conn.source.index, scope, { complex: false, type: "I32", location: Fpp.implicitLocation });
            const inputPort = this.identifier(conn.destination.node, scope, SymbolType.inputPortInstance);
            const inputPortIdx = this.expr(conn.destination.index, scope, { complex: false, type: "I32", location: Fpp.implicitLocation });

            // Check if the port index is out of range
            if (outputPort && outputPortIdx) {
                this.checkPortIdx(outputPort as Fpp.GeneralPortInstanceDecl, outputPortIdx, conn.source.index!.location);
            }

            if (inputPort && inputPortIdx) {
                this.checkPortIdx(inputPort as Fpp.GeneralPortInstanceDecl, inputPortIdx, conn.destination.index!.location);
            }
        }
    }

    protected productRecordDecl(ast: Fpp.ProductRecordDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.record);
        this.type(ast.fppType, scope);

        if (ast.id) {
            this.expr(ast.id, scope, { complex: false, type: "I32", location: Fpp.implicitLocation });
        }
    }

    protected productContainerDecl(ast: Fpp.ProductContainerDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.container);

        if (ast.id) {
            this.expr(ast.id, scope, { complex: false, type: "I32", location: Fpp.implicitLocation });
        }

        if (ast.defaultPriority) {
            this.expr(ast.id, scope, { complex: false, type: "I32", location: Fpp.implicitLocation });
        }
    }

    patternGraphStmt(ast: Fpp.PatternGraphStmt, scope: Fpp.QualifiedIdentifier): void {
        this.identifier(ast.target, scope, SymbolType.componentInstance);
        for (const sources of ast.sources) {
            this.identifier(sources, scope, SymbolType.componentInstance);
        }
    }

    interfaceImportStmt(ast: Fpp.InterfaceImportStmt, scope: Fpp.QualifiedIdentifier): void {
        this.identifier(ast.symbol, scope, SymbolType.interface);
    }

    topologyImportStmt(ast: Fpp.TopologyImportStmt, scope: Fpp.QualifiedIdentifier): void {
        this.identifier(ast.symbol, scope, SymbolType.topology);
    }

    doExpr(ast: Fpp.DoExpr, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        for (const action of ast.actions) {
            this.identifier([...scope, action], scope, SymbolType.action);
        }
    }

    transitionExpr(ast: Fpp.TransitionExpr, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.identifier(ast.state, stateScope, SymbolType.state, scope);
        if (ast.do) {
            this.doExpr(ast.do, scope, stateScope);
        }
    }

    actionDef(ast: Fpp.ActionDef, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.action);
        if (ast.fppType) {
            this.type(ast.fppType, scope);
        }
    }

    choiceDef(ast: Fpp.ChoiceDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.action);
        this.identifier([...scope, ast.guard], scope, SymbolType.guard);
        this.transitionExpr(ast.then, scope, stateScope);
        this.transitionExpr(ast.else, scope, stateScope);
    }

    guardDef(ast: Fpp.GuardDef, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.guard);
        if (ast.fppType) {
            this.type(ast.fppType, scope);
        }
    }

    signalDef(ast: Fpp.SignalDef, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.signal);
        if (ast.fppType) {
            this.type(ast.fppType, scope);
        }
    }

    initialTransistion(ast: Fpp.InitialTransition, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.transitionExpr(ast.transition, scope, stateScope);
    }

    stateTransition(ast: Fpp.StateTransition, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.identifier([...scope, ast.signal], scope, SymbolType.signal);
        if (ast.guard) {
            this.identifier([...scope, ast.guard], scope, SymbolType.guard);
        }

        switch (ast.transition.type) {
            case 'TransitionExpr':
                this.transitionExpr(ast.transition, scope, stateScope);
                break;
            case 'DoExpr':
                this.doExpr(ast.transition, scope, stateScope);
                break;
        }
    }

    stateEntry(ast: Fpp.StateEntry, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.doExpr(ast.do, scope, stateScope);
    }

    stateExit(ast: Fpp.StateExit, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.doExpr(ast.do, scope, stateScope);
    }

    stateDef(ast: Fpp.StateDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.state);
        super.stateDef(ast, scope, stateScope);
    }

    stateMachineDecl(ast: Fpp.StateMachineDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.stateMachine);
        super.stateMachineDecl(ast, scope);
    }

    stateMachineInstance(ast: Fpp.StateMachineInstance, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.stateMachineInstance);
        this.identifier(ast.stateMachine, scope, SymbolType.stateMachine);

        if (ast.priority) {
            this.expr(ast.priority, scope, { complex: false, type: "U32", location: Fpp.implicitLocation });
        }
    }

    componentDecl(ast: Fpp.ComponentDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.component);
        super.componentDecl(ast, scope);
    }

    moduleDecl(ast: Fpp.ModuleDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.module);
        super.moduleDecl(ast, scope);
    }

    topologyDecl(ast: Fpp.TopologyDecl, scope: Fpp.QualifiedIdentifier): void {
        this.semantic(ast.name, SymbolType.topology);
        super.topologyDecl(ast, scope);
    }
}
