import * as vscode from 'vscode';
import * as Fpp from './parser/ast';

import { MemberTraverser } from './traverser';
import { ReferenceTracker } from './referenceTracker';
import { RangeAssociator } from './associator';
import { DiangosicManager } from './diagnostics';

export enum FppTokenType {
    module, // namespace
    topology, // macro
    component, // class
    componentInstance, // variable
    constant, // enumMember
    graphGroup, // namespace
    port, // interface
    type, // type
    modifier, // keyword
    inputPortInstance, // function
    outputPortInstance, // function
    inputPortDecl, // function
    outputPortDecl, // function
    specialPort, // internal or special ports, function
    formalParameter,  // parameter

    // Dictoinary entries
    command,
    event,
    parameter,
    telemetry,
    record,
    container
}

export const tokenTypeNames: string[] = [
    "Module",
    "Topology",
    "Component",
    "Component Instance",
    "Constant",
    "Graph Group",
    "Port",
    "Type",
    "Modifier",
    "Input Port Instance",
    "Output Port Instance",
    "Input Port",
    "Output Port",
    "Special/Internal Port",
    "Parameter",

    "Command",
    "Event",
    "Parameter",
    "Telemetry",
    "Data Product Record",
    "Data Product Container"
];

export const fppLegend = new vscode.SemanticTokensLegend(
    [
        'namespace',
        'macro',
        'class',
        'variable',
        'enumMember',
        'namespace',
        'interface',
        'type',
        'keyword',
        'function',
        'function',
        'function',
        'function',
        'function',
        'parameter',
        'function',
        'function',
        'function',
        'function',
        'function',
        'function',
    ],
    []
);

export class ComponentDictionary {
    readonly commands = new Map<string, Fpp.CommandDecl>();
    readonly events = new Map<string, Fpp.EventDecl>();
    readonly parameters = new Map<string, Fpp.ParamDecl>();
    readonly telemetry = new Map<string, Fpp.TelemetryChannelDecl>();
    readonly records = new Map<string, Fpp.ProductRecordDecl>();
    readonly containers = new Map<string, Fpp.ProductContainerDecl>();

    constructor(readonly component: Fpp.ComponentDecl) { }
}

export class DeclCollector extends MemberTraverser {
    // Declarations map with their fully qualified id
    components = new Map<string, Fpp.ComponentDecl>();
    componentInstances = new Map<string, Fpp.ComponentInstanceDecl>();
    constants = new Map<string, Fpp.ConstantDefinition>();
    generalInputPortInstances = new Map<string, Fpp.GeneralPortInstanceDecl>();
    generalOutputPortInstances = new Map<string, Fpp.GeneralPortInstanceDecl>();
    generalInputPortDecl = new Map<string, Fpp.GeneralPortInstanceDecl>();
    generalOutputPortDecl = new Map<string, Fpp.GeneralPortInstanceDecl>();
    graphGroups = new Map<string, Fpp.DirectGraphDecl>();
    ports = new Map<string, Fpp.PortDecl>();
    topologies = new Map<string, Fpp.TopologyDecl>();
    types = new Map<string, Fpp.TypeDecl>();
    commands = new Map<string, Fpp.CommandDecl>();
    events = new Map<string, Fpp.EventDecl>();
    parameters = new Map<string, Fpp.ParamDecl>();
    telemetry = new Map<string, Fpp.TelemetryChannelDecl>();
    records = new Map<string, Fpp.ProductRecordDecl>();
    containers = new Map<string, Fpp.ProductContainerDecl>();

    dictionary = new Map<string, ComponentDictionary>();
    references = new ReferenceTracker<vscode.Range>();

    // Keep track of which files define what
    // This way we can clean and refresh a single file's declarations
    translationUnitDeclarations = new Map<string, RangeAssociator<[FppTokenType, string]>>();

    // If a translation unit includes component instances,
    // there is a second stage of reference depth that should
    // force re-annotation on doc refresh. Normally document
    // annotation refresh happens only on open text documents
    // since its not required, in this case it shouldn't matter
    // if the doc is open or not
    hasComponentInstances: boolean = false;

    topologyPortsTrav = new class extends MemberTraverser {
        parent!: DeclCollector;

        private update(ast: Fpp.ComponentInstanceDecl, member: Fpp.ComponentMember, componentScope: Fpp.QualifiedIdentifier) {
            switch (member.type) {
                case 'GeneralPortInstanceDecl':
                    const portName = MemberTraverser.flat(componentScope, member.name);
                    if (member.kind.isOutput) {
                        this.parent.generalOutputPortInstances.set(portName, member);
                        this.parent.translationUnitDeclarations.get(ast.location.source)!.add(
                            DiangosicManager.asRange(ast.name.location),
                            [FppTokenType.outputPortInstance, portName]
                        );
                    } else {
                        this.parent.generalInputPortInstances.set(portName, member);
                        this.parent.translationUnitDeclarations.get(ast.location.source)!.add(
                            DiangosicManager.asRange(ast.name.location),
                            [FppTokenType.inputPortInstance, portName]
                        );
                    }
                    break;
                case 'IncludeStmt':
                    if (member.resolved) {
                        for (const m of member.resolved.members) {
                            this.update(ast, m, componentScope);
                        }
                    }
                    break;
            }
        }

        protected componentInstanceDecl(ast: Fpp.ComponentInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
            const resolved = this.parent.resolve(ast.fppType.type, scope, FppTokenType.component);
            if (!resolved) {
                // This error will be annotated later
                return;
            }

            this.parent.hasComponentInstances = true;

            const componentScope = [...scope, ast.name];

            const componentAst = this.parent.components.get(MemberTraverser.flat(resolved));
            if (componentAst) {
                for (const member of componentAst.members) {
                    this.update(ast, member, componentScope);
                }
            }
        }
    };

    constructor() {
        super();
        this.topologyPortsTrav.parent = this;
    }

    clearDecls(grammarSource: string) {
        const alreadyDeclared = this.translationUnitDeclarations.get(grammarSource);
        if (alreadyDeclared) {
            for (const [_, declTup] of alreadyDeclared) {
                const [type, decl] = declTup;
                switch (type) {
                    case FppTokenType.component:
                        this.components.delete(decl);
                        this.dictionary.delete(decl);
                        break;
                    case FppTokenType.componentInstance:
                        this.componentInstances.delete(decl);
                        break;
                    case FppTokenType.inputPortInstance:
                        this.generalInputPortInstances.delete(decl);
                        break;
                    case FppTokenType.outputPortInstance:
                        this.generalOutputPortInstances.delete(decl);
                        break;
                    case FppTokenType.inputPortDecl:
                        this.generalInputPortDecl.delete(decl);
                        break;
                    case FppTokenType.outputPortDecl:
                        this.generalOutputPortDecl.delete(decl);
                        break;
                    case FppTokenType.constant:
                        this.constants.delete(decl);
                        break;
                    case FppTokenType.graphGroup:
                        this.graphGroups.delete(decl);
                        break;
                    case FppTokenType.port:
                        this.ports.delete(decl);
                        break;
                    case FppTokenType.topology:
                        this.topologies.delete(decl);
                        break;
                    case FppTokenType.type:
                        this.types.delete(decl);
                        break;
                    case FppTokenType.command:
                        this.commands.delete(decl);
                        break;
                    case FppTokenType.event:
                        this.events.delete(decl);
                        break;
                    case FppTokenType.parameter:
                        this.parameters.delete(decl);
                        break;
                    case FppTokenType.telemetry:
                        this.telemetry.delete(decl);
                        break;
                    case FppTokenType.container:
                        this.containers.delete(decl);
                        break;
                    case FppTokenType.record:
                        this.records.delete(decl);
                        break;
                    case FppTokenType.modifier:
                    case FppTokenType.specialPort:
                    case FppTokenType.formalParameter:
                    case FppTokenType.module:
                        // These cannot be referenced directly
                        break;
                }
            }
        }

        this.translationUnitDeclarations.set(grammarSource, new RangeAssociator<[FppTokenType, string]>());
        this.references.dispose(grammarSource);
    }

    pass(ast: Fpp.TranslationUnit, scope: Fpp.QualifiedIdentifier = []): void {
        this.hasComponentInstances = false;
        this.clearDecls(ast.location.source);
        for (const _ of ast.dependencies) {
            this.clearDecls(ast.location.source);
        }

        super.pass(ast, scope);
        this.topologyPortsTrav.pass(ast, scope);
    }

    static typeName(type: Fpp.TypeName): string {
        return type.complex ? DiangosicManager.flat(type.type) : type.type;
    }

    private static annotateParameters(prms: Fpp.FormalParameter[]): [string, [string, string][] | undefined] {
        if (prms.length === 0) {
            return ['()', undefined];
        }

        const record: [string, string][] = [];
        const parameterString = prms.map(prm => {
            record.push([prm.name.value, prm.annotation ?? '']);
            return `${prm.name.value}: ${DeclCollector.typeName(prm.type) + (prm.ref ? '&' : '')}`;
        }).join(', ');

        return [`(${parameterString})`, record];
    }

    private typeCollect(decl: Fpp.TypeDecl, scope: Fpp.QualifiedIdentifier) {
        const name = MemberTraverser.flat(scope, decl.name);
        if (this.check(name, FppTokenType.type, decl.name)) {
            return;
        }

        this.types.set(name, decl);

        this.translationUnitDeclarations.get(decl.location.source)!.add(
            DiangosicManager.asRange(decl.name.location),
            [FppTokenType.type, name]
        );
    }

    private constantCollect(decl: Fpp.ConstantDecl | Fpp.EnumMember, scope: Fpp.QualifiedIdentifier) {
        const name = MemberTraverser.flat(scope, decl.name);
        if (this.check(name, FppTokenType.constant, decl.name)) {
            return;
        }

        decl.scope = scope;

        this.constants.set(name, decl);
        this.translationUnitDeclarations.get(decl.location.source)!.add(
            DiangosicManager.asRange(decl.name.location),
            [FppTokenType.constant, name]
        );
    }

    protected moduleDecl(ast: Fpp.ModuleDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = DeclCollector.flat(scope, ast.name);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.module, name]
        );

        super.moduleDecl(ast, scope);
    }

    abstractTypeDecl(ast: Fpp.AbstractTypeDecl, scope: Fpp.QualifiedIdentifier): void {
        this.typeCollect(ast, scope);
    }

    structDecl(ast: Fpp.StructDecl, scope: Fpp.QualifiedIdentifier): void {
        this.typeCollect(ast, scope);
    }

    arrayDecl(ast: Fpp.ArrayDecl, scope: Fpp.QualifiedIdentifier): void {
        this.typeCollect(ast, scope);
    }

    enumDecl(ast: Fpp.EnumDecl, scope: Fpp.QualifiedIdentifier): void {
        this.typeCollect(ast, scope);

        const enumScope = [...scope, ast.name];
        const one: Fpp.Expr = { type: "IntLiteral", value: 1, location: Fpp.implicitLocation };

        let lastExpression: Fpp.Expr = { type: "IntLiteral", value: -1, location: Fpp.implicitLocation };
        for (const member of ast.members) {
            let currDefault: Fpp.Expr = {
                type: "BinaryExpr",
                operator: { value: "+", location: Fpp.implicitLocation },
                left: lastExpression, right: one, location: Fpp.implicitLocation
            };

            if (!member.value) {
                member.value = currDefault;
            }

            this.constantCollect(member, enumScope);
            lastExpression = member.value ?? currDefault;
        }
    }

    constantDecl(ast: Fpp.ConstantDecl, scope: Fpp.QualifiedIdentifier): void {
        this.constantCollect(ast, scope);
    }

    componentInstanceDecl(ast: Fpp.ComponentInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.componentInstance, ast.name)) {
            return;
        }

        this.componentInstances.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.componentInstance, name]
        );
    }

    portDecl(ast: Fpp.PortDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.port, ast.name)) {
            return;
        }

        [ast.annotatedValue, ast.annotatedMembers] = DeclCollector.annotateParameters(ast.params);
        if (ast.returnType) {
            ast.annotatedValue += `: ${DeclCollector.typeName(ast.returnType)}`;
        }

        this.ports.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.port, name]
        );
    }

    directGraphDecl(ast: Fpp.DirectGraphDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.graphGroups.has(name)) {
            this.conflict(name, this.graphGroups.get(name)!.name, ast.name);
            return;
        }

        this.graphGroups.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.graphGroup, name]
        );
    }

    protected productRecordDecl(ast: Fpp.ProductRecordDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);

        if (this.check(name, FppTokenType.record, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.records.set(ast.name.value, ast);
        }

        this.records.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.record, name]
        );

        super.productRecordDecl(ast, scope);
    }

    protected productContainerDecl(ast: Fpp.ProductContainerDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);

        if (this.check(name, FppTokenType.container, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.containers.set(ast.name.value, ast);
        }

        this.containers.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.container, name]
        );

        super.productContainerDecl(ast, scope);
    }

    componentDecl(ast: Fpp.ComponentDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (!this.check(name, FppTokenType.component, ast.name)) {
            this.components.set(name, ast);
            this.dictionary.set(name, new ComponentDictionary(ast));
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [FppTokenType.component, name]
            );
        }

        super.componentDecl(ast, scope);
    }

    topologyDecl(ast: Fpp.TopologyDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (!this.check(name, FppTokenType.topology, ast.name)) {
            this.topologies.set(name, ast);
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [FppTokenType.topology, name]
            );
        }

        super.topologyDecl(ast, scope);
    }

    generalPortInstanceDecl(ast: Fpp.GeneralPortInstanceDecl, scope: Fpp.QualifiedIdentifier): void {
        const portName = MemberTraverser.flat(scope, ast.name);

        if (ast.kind.isOutput) {
            this.generalOutputPortDecl.set(portName, ast);
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [FppTokenType.outputPortDecl, portName]
            );
        } else {
            this.generalInputPortDecl.set(portName, ast);
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [FppTokenType.inputPortDecl, portName]
            );
        }
    }

    protected commandDecl(ast: Fpp.CommandDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.command, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.commands.set(ast.name.value, ast);
        }

        [ast.annotatedValue, ast.annotatedMembers] = DeclCollector.annotateParameters(ast.params);
        ast.annotatedValue = `${ast.annotatedValue} @${ast.kind.value}`;

        this.commands.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.command, name]
        );
    }

    protected eventDecl(ast: Fpp.EventDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.event, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.events.set(ast.name.value, ast);
        }

        [ast.annotatedValue, ast.annotatedMembers] = DeclCollector.annotateParameters(ast.params);
        ast.annotatedValue = `${ast.annotatedValue} ${ast.severity.value}`;

        this.events.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.event, name]
        );
    }

    protected paramDecl(ast: Fpp.ParamDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.parameter, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.parameters.set(ast.name.value, ast);
        }

        this.parameters.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.parameter, name]
        );
    }

    protected telemetryChannelDecl(ast: Fpp.TelemetryChannelDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, FppTokenType.telemetry, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.telemetry.set(ast.name.value, ast);
        }

        ast.annotatedValue = ast.format?.value ? `"${ast.format?.value}"` : undefined;

        this.telemetry.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [FppTokenType.telemetry, name]
        );
    }

    private conflict(name: string, original: Fpp.Identifier, conflict: Fpp.Identifier) {
        const diag = new vscode.Diagnostic(
            MemberTraverser.asRange(conflict.location),
            `${name} already exists`,
            vscode.DiagnosticSeverity.Error
        );

        diag.relatedInformation = [new vscode.DiagnosticRelatedInformation(
            MemberTraverser.asLocation(original.location),
            `${name} declared here`
        )];

        this.emit(vscode.Uri.file(conflict.location.source), diag);
    }

    get(name: string, type: FppTokenType): Fpp.Decl | undefined {
        switch (type) {
            case FppTokenType.module:
            case FppTokenType.modifier:
            case FppTokenType.specialPort:
            case FppTokenType.formalParameter:
            default:
                break;

            case FppTokenType.topology:
                return this.topologies.get(name);
            case FppTokenType.component:
                return this.components.get(name);
            case FppTokenType.componentInstance:
                return this.componentInstances.get(name);
            case FppTokenType.constant:
                return this.constants.get(name);
            case FppTokenType.graphGroup:
                return this.graphGroups.get(name);
            case FppTokenType.port:
                return this.ports.get(name);
            case FppTokenType.type:
                return this.types.get(name);
            case FppTokenType.inputPortInstance:
                return this.generalInputPortInstances.get(name);
            case FppTokenType.outputPortInstance:
                return this.generalOutputPortInstances.get(name);
            case FppTokenType.inputPortDecl:
                return this.generalInputPortDecl.get(name);
            case FppTokenType.outputPortDecl:
                return this.generalOutputPortDecl.get(name);
            case FppTokenType.command:
                return this.commands.get(name);
            case FppTokenType.event:
                return this.events.get(name);
            case FppTokenType.parameter:
                return this.parameters.get(name);
            case FppTokenType.telemetry:
                return this.telemetry.get(name);
            case FppTokenType.record:
                return this.records.get(name);
            case FppTokenType.container:
                return this.containers.get(name);
        }
    }

    private check(name: string, type: FppTokenType, token: Fpp.Identifier): boolean {
        const t = this.get(name, type);
        if (t) {
            this.conflict(name, t.name, token);
            return true;
        }

        return false;
    }

    resolve(ident: Fpp.QualifiedIdentifier, scope: Fpp.QualifiedIdentifier, type: FppTokenType): Fpp.QualifiedIdentifier | undefined {
        // Identifiers can optionally include their own scopes
        // To resolve an identifier we need to try all implicit combinations
        // of the current scope

        let tryScope: Fpp.QualifiedIdentifier = [];
        for (const subScope of scope) {
            const full = tryScope.concat(ident);
            const name = MemberTraverser.flat(full);

            const decl = this.get(name, type);
            if (decl) {
                return full;
            }

            // The scope is infered and therefore has no location
            tryScope = [...tryScope, {
                value: subScope.value,
                location: Fpp.implicitLocation
            }];
        }

        const full = tryScope.concat(ident);
        const name = MemberTraverser.flat(full);
        const decl = this.get(name, type);
        if (decl) {
            return full;
        }
    }
}
