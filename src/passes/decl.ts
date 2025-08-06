import * as vscode from 'vscode';
import * as Fpp from '../parser/ast';

import { MemberTraverser } from './traverser';
import { ReferenceTracker } from '../referenceTracker';
import { RangeAssociator } from '../associator';
import { DiangosicManager } from '../diagnostics';

export enum SymbolType {
    module,
    topology,
    component,
    interface,
    componentInstance,
    constant,
    graphGroup,
    port,
    type,
    modifier,
    inputPortInstance,
    outputPortInstance,
    inputPortDecl,
    outputPortDecl,
    specialPort,
    formalParameter,

    stateMachine,
    stateMachineInstance,

    action,
    guard,
    signal,
    state,

    // Dictoinary entries
    command,
    event,
    parameter,
    telemetry,
    record,
    container,
}

type TokenMetadata = [name: string, legendType: string];

const tokenMetadataR: Record<SymbolType, TokenMetadata> = {
    [SymbolType.module]: ["Module", "namespace"],
    [SymbolType.topology]: ["Topology", "macro"],
    [SymbolType.component]: ["Component", "class"],
    [SymbolType.componentInstance]: ["Component Instance", "variable"],
    [SymbolType.interface]: ["Interface", "interface"],
    [SymbolType.constant]: ["Constant", "enumMember"],
    [SymbolType.graphGroup]: ["Graph Group", "namespace"],
    [SymbolType.port]: ["Port", "interface"],
    [SymbolType.type]: ["Type", "type"],
    [SymbolType.modifier]: ["Modifier", "keyword"],
    [SymbolType.inputPortInstance]: ["Input Port Instance", "function"],
    [SymbolType.outputPortInstance]: ["Output Port Instance", "function"],
    [SymbolType.inputPortDecl]: ["Input Port", "function"],
    [SymbolType.outputPortDecl]: ["Output Port", "function"],
    [SymbolType.specialPort]: ["Special/Internal Port", "function"],
    [SymbolType.formalParameter]: ["Parameter", "parameter"],
    [SymbolType.stateMachine]: ["State Machine", "class"],
    [SymbolType.stateMachineInstance]: ["State Machine Instance", "variable"],
    [SymbolType.command]: ["Command", "function"],
    [SymbolType.event]: ["Event", "function"],
    [SymbolType.parameter]: ["Parameter", "function"],
    [SymbolType.telemetry]: ["Telemetry", "function"],
    [SymbolType.record]: ["Data Product Record", "function"],
    [SymbolType.container]: ["Data Product Container", "function"],
    [SymbolType.action]: ["Action", "function"],
    [SymbolType.guard]: ["Guard", "variable"],
    [SymbolType.signal]: ["Signal", "event"],
    [SymbolType.state]: ["State", "enumMember"]
};

const tokenMetadata = Object.entries(tokenMetadataR).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(key => (tokenMetadataR as any)[key[0]] as TokenMetadata);

export const tokenTypeNames: string[] = tokenMetadata.map(v => v[0]);

export const fppLegend = new vscode.SemanticTokensLegend(
    tokenMetadata.map(v => v[1]),
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
    actions = new Map<string, Fpp.ActionDef>();
    commands = new Map<string, Fpp.CommandDecl>();
    components = new Map<string, Fpp.ComponentDecl>();
    componentInstances = new Map<string, Fpp.ComponentInstanceDecl>();
    constants = new Map<string, Fpp.ConstantDefinition>();
    containers = new Map<string, Fpp.ProductContainerDecl>();
    dictionary = new Map<string, ComponentDictionary>();
    events = new Map<string, Fpp.EventDecl>();
    generalInputPortDecl = new Map<string, Fpp.GeneralPortInstanceDecl>();
    generalOutputPortDecl = new Map<string, Fpp.GeneralPortInstanceDecl>();
    graphGroups = new Map<string, Fpp.DirectGraphDecl>();
    guards = new Map<string, Fpp.GuardDef>();
    inputPortInstances = new Map<string, Fpp.PortInstanceDecl>();
    interfaces = new Map<string, Fpp.InterfaceDecl>();
    outputPortInstances = new Map<string, Fpp.PortInstanceDecl>();
    parameters = new Map<string, Fpp.ParamDecl>();
    ports = new Map<string, Fpp.PortDecl>();
    records = new Map<string, Fpp.ProductRecordDecl>();
    references = new ReferenceTracker<vscode.Range>();
    signals = new Map<string, Fpp.SignalDef>();
    // States have a special key encoding:
    // normal.qualified.ident.for.statemachine|state.qual.ident
    states = new Map<string, Fpp.StateDef | Fpp.ChoiceDef>();
    stateMachines = new Map<string, Fpp.StateMachineDecl>();
    stateMachineInstances = new Map<string, Fpp.StateMachineInstance>();
    telemetry = new Map<string, Fpp.TelemetryChannelDecl>();
    topologies = new Map<string, Fpp.TopologyDecl>();
    types = new Map<string, Fpp.TypeDecl>();

    // Keep track of which files define what
    // This way we can clean and refresh a single file's declarations
    translationUnitDeclarations = new Map<string, RangeAssociator<[SymbolType, string]>>();

    clearAll() {
        this.actions.clear();
        this.commands.clear();
        this.components.clear();
        this.componentInstances.clear();
        this.constants.clear();
        this.containers.clear();
        this.dictionary.clear();
        this.events.clear();
        this.generalInputPortDecl.clear();
        this.generalOutputPortDecl.clear();
        this.graphGroups.clear();
        this.guards.clear();
        this.inputPortInstances.clear();
        this.interfaces.clear();
        this.outputPortInstances.clear();
        this.parameters.clear();
        this.ports.clear();
        this.records.clear();
        this.references = new ReferenceTracker<vscode.Range>();
        this.signals.clear();
        this.states.clear();
        this.stateMachines.clear();
        this.stateMachineInstances.clear();
        this.telemetry.clear();
        this.topologies.clear();
        this.types.clear();
    }

    clearDecls(grammarSource: string) {
        const alreadyDeclared = this.translationUnitDeclarations.get(grammarSource);
        if (alreadyDeclared) {
            for (const [_, declTup] of alreadyDeclared) {
                const [type, decl] = declTup;
                switch (type) {
                    case SymbolType.component:
                        this.components.delete(decl);
                        this.dictionary.delete(decl);
                        break;
                    case SymbolType.componentInstance:
                        this.componentInstances.delete(decl);
                        break;
                    case SymbolType.inputPortInstance:
                        this.inputPortInstances.delete(decl);
                        break;
                    case SymbolType.outputPortInstance:
                        this.outputPortInstances.delete(decl);
                        break;
                    case SymbolType.specialPort:
                        this.inputPortInstances.delete(decl);
                        this.outputPortInstances.delete(decl);
                        break;
                    case SymbolType.inputPortDecl:
                        this.generalInputPortDecl.delete(decl);
                        break;
                    case SymbolType.outputPortDecl:
                        this.generalOutputPortDecl.delete(decl);
                        break;
                    case SymbolType.constant:
                        this.constants.delete(decl);
                        break;
                    case SymbolType.graphGroup:
                        this.graphGroups.delete(decl);
                        break;
                    case SymbolType.port:
                        this.ports.delete(decl);
                        break;
                    case SymbolType.topology:
                        this.topologies.delete(decl);
                        break;
                    case SymbolType.type:
                        this.types.delete(decl);
                        break;
                    case SymbolType.command:
                        this.commands.delete(decl);
                        break;
                    case SymbolType.event:
                        this.events.delete(decl);
                        break;
                    case SymbolType.parameter:
                        this.parameters.delete(decl);
                        break;
                    case SymbolType.telemetry:
                        this.telemetry.delete(decl);
                        break;
                    case SymbolType.container:
                        this.containers.delete(decl);
                        break;
                    case SymbolType.record:
                        this.records.delete(decl);
                        break;
                    case SymbolType.stateMachine:
                        this.stateMachines.delete(decl);
                        break;
                    case SymbolType.stateMachineInstance:
                        this.stateMachineInstances.delete(decl);
                        break;
                    case SymbolType.action:
                        this.actions.delete(decl);
                        break;
                    case SymbolType.guard:
                        this.guards.delete(decl);
                        break;
                    case SymbolType.signal:
                        this.signals.delete(decl);
                        break;
                    case SymbolType.state:
                        this.states.delete(decl);
                        break;

                    case SymbolType.modifier:
                    case SymbolType.formalParameter:
                    case SymbolType.module:
                        // These cannot be referenced directly
                        break;
                }
            }
        }

        this.translationUnitDeclarations.set(grammarSource, new RangeAssociator<[SymbolType, string]>());
        this.references.dispose(grammarSource);
    }

    pass(ast: Fpp.TranslationUnit, scope: Fpp.QualifiedIdentifier = []): void {
        this.clearDecls(ast.location.source);
        for (const _ of ast.dependencies) {
            this.clearDecls(ast.location.source);
        }

        super.pass(ast, scope);
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
        if (this.check(name, SymbolType.type, decl.name)) {
            return;
        }

        this.types.set(name, decl);

        this.translationUnitDeclarations.get(decl.location.source)!.add(
            DiangosicManager.asRange(decl.name.location),
            [SymbolType.type, name]
        );
    }

    private constantCollect(decl: Fpp.ConstantDecl | Fpp.EnumMember, scope: Fpp.QualifiedIdentifier) {
        const name = MemberTraverser.flat(scope, decl.name);
        if (this.check(name, SymbolType.constant, decl.name)) {
            return;
        }

        decl.scope = scope;

        this.constants.set(name, decl);
        this.translationUnitDeclarations.get(decl.location.source)!.add(
            DiangosicManager.asRange(decl.name.location),
            [SymbolType.constant, name]
        );
    }

    protected moduleDecl(ast: Fpp.ModuleDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = DeclCollector.flat(scope, ast.name);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.module, name]
        );

        super.moduleDecl(ast, scope);
    }

    abstractTypeDecl(ast: Fpp.AbstractTypeDecl, scope: Fpp.QualifiedIdentifier): void {
        this.typeCollect(ast, scope);
    }

    aliasTypeDecl(ast: Fpp.AliasTypeDecl, scope: Fpp.QualifiedIdentifier): void {
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
        if (this.check(name, SymbolType.componentInstance, ast.name)) {
            return;
        }

        this.componentInstances.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.componentInstance, name]
        );
    }

    interfaceDecl(ast: Fpp.InterfaceDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.componentInstance, ast.name)) {
            return;
        }

        this.interfaces.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.interface, name]
        );
    }

    portDecl(ast: Fpp.PortDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.port, ast.name)) {
            return;
        }

        [ast.annotatedValue, ast.annotatedMembers] = DeclCollector.annotateParameters(ast.params);
        if (ast.returnType) {
            ast.annotatedValue += `: ${DeclCollector.typeName(ast.returnType)}`;
        }

        this.ports.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.port, name]
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
            [SymbolType.graphGroup, name]
        );
    }

    protected productRecordDecl(ast: Fpp.ProductRecordDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);

        if (this.check(name, SymbolType.record, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.records.set(ast.name.value, ast);
        }

        this.records.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.record, name]
        );

        super.productRecordDecl(ast, scope);
    }

    protected productContainerDecl(ast: Fpp.ProductContainerDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);

        if (this.check(name, SymbolType.container, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.containers.set(ast.name.value, ast);
        }

        this.containers.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.container, name]
        );

        super.productContainerDecl(ast, scope);
    }

    componentDecl(ast: Fpp.ComponentDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (!this.check(name, SymbolType.component, ast.name)) {
            this.components.set(name, ast);
            this.dictionary.set(name, new ComponentDictionary(ast));
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [SymbolType.component, name]
            );
        }

        super.componentDecl(ast, scope);
    }

    topologyDecl(ast: Fpp.TopologyDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (!this.check(name, SymbolType.topology, ast.name)) {
            this.topologies.set(name, ast);
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [SymbolType.topology, name]
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
                [SymbolType.outputPortDecl, portName]
            );
        } else {
            this.generalInputPortDecl.set(portName, ast);
            this.translationUnitDeclarations.get(ast.location.source)!.add(
                DiangosicManager.asRange(ast.name.location),
                [SymbolType.inputPortDecl, portName]
            );
        }
    }

    protected commandDecl(ast: Fpp.CommandDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.command, ast.name)) {
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
            [SymbolType.command, name]
        );
    }

    protected eventDecl(ast: Fpp.EventDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.event, ast.name)) {
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
            [SymbolType.event, name]
        );
    }

    protected paramDecl(ast: Fpp.ParamDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.parameter, ast.name)) {
            return;
        }

        const dict = this.dictionary.get(MemberTraverser.flat(scope));
        if (dict) {
            dict.parameters.set(ast.name.value, ast);
        }

        this.parameters.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.parameter, name]
        );
    }

    protected telemetryChannelDecl(ast: Fpp.TelemetryChannelDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.telemetry, ast.name)) {
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
            [SymbolType.telemetry, name]
        );
    }

    protected actionDef(ast: Fpp.ActionDef, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.action, ast.name)) {
            return;
        }

        this.actions.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.action, name]
        );
    }

    protected choiceDef(ast: Fpp.ChoiceDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat([...scope, ...stateScope], ast.name);
        if (this.check(name, SymbolType.state, ast.name)) {
            return;
        }

        this.states.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.state, name]
        );
    }

    protected guardDef(ast: Fpp.GuardDef, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.guard, ast.name)) {
            return;
        }

        this.guards.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.guard, name]
        );
    }

    protected signalDef(ast: Fpp.SignalDef, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.signal, ast.name)) {
            return;
        }

        this.signals.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.signal, name]
        );
    }

    protected stateDef(ast: Fpp.StateDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat([...scope, ...stateScope], ast.name);
        if (this.check(name, SymbolType.state, ast.name)) {
            return;
        }

        this.states.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.state, name]
        );

        super.stateDef(ast, scope, stateScope);
    }

    protected stateMachineDecl(ast: Fpp.StateMachineDecl, scope: Fpp.QualifiedIdentifier): void {
        const name = MemberTraverser.flat(scope, ast.name);
        if (this.check(name, SymbolType.stateMachine, ast.name)) {
            return;
        }

        this.stateMachines.set(name, ast);
        this.translationUnitDeclarations.get(ast.location.source)!.add(
            DiangosicManager.asRange(ast.name.location),
            [SymbolType.stateMachine, name]
        );

        super.stateMachineDecl(ast, scope);
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

    get(name: string, type: SymbolType): Fpp.Decl | undefined {
        switch (type) {
            case SymbolType.module:
            case SymbolType.modifier:
            case SymbolType.formalParameter:
            default:
                break;

            case SymbolType.topology:
                return this.topologies.get(name);
            case SymbolType.component:
                return this.components.get(name);
            case SymbolType.componentInstance:
                return this.componentInstances.get(name);
            case SymbolType.constant:
                return this.constants.get(name);
            case SymbolType.interface:
                return this.interfaces.get(name);
            case SymbolType.graphGroup:
                return this.graphGroups.get(name);
            case SymbolType.port:
                return this.ports.get(name);
            case SymbolType.type:
                return this.types.get(name);
            case SymbolType.specialPort:
                this.inputPortInstances.get(name) ?? this.outputPortInstances.get(name);
                break;
            case SymbolType.inputPortInstance:
                return this.inputPortInstances.get(name);
            case SymbolType.outputPortInstance:
                return this.outputPortInstances.get(name);
            case SymbolType.inputPortDecl:
                return this.generalInputPortDecl.get(name);
            case SymbolType.outputPortDecl:
                return this.generalOutputPortDecl.get(name);
            case SymbolType.command:
                return this.commands.get(name);
            case SymbolType.event:
                return this.events.get(name);
            case SymbolType.parameter:
                return this.parameters.get(name);
            case SymbolType.telemetry:
                return this.telemetry.get(name);
            case SymbolType.record:
                return this.records.get(name);
            case SymbolType.container:
                return this.containers.get(name);
            case SymbolType.stateMachine:
                return this.stateMachines.get(name);
            case SymbolType.stateMachineInstance:
                return this.stateMachineInstances.get(name);
            case SymbolType.action:
                return this.actions.get(name);
            case SymbolType.guard:
                return this.guards.get(name);
            case SymbolType.signal:
                return this.signals.get(name);
            case SymbolType.state:
                return this.states.get(name);
        }
    }

    /**
     * Check if a definition already exists
     * If it does, add an error on the duplicate symbol and return false
     * @param name Fully qualified name of definition
     * @param type Definition type
     * @param token Ast identifier associated with the definition
     * @returns true if this definition conflicts
     */
    private check(name: string, type: SymbolType, token: Fpp.Identifier): boolean {
        const t = this.get(name, type);
        if (t) {
            this.conflict(name, t.name, token);
            return true;
        }

        return false;
    }

    resolve(
        ident: Fpp.QualifiedIdentifier,
        scope: Fpp.QualifiedIdentifier,
        type: SymbolType,
        lookFrom: Fpp.QualifiedIdentifier = [],
    ): Fpp.QualifiedIdentifier | undefined {
        // Identifiers can optionally include their own scopes
        // To resolve an identifier we need to try all implicit combinations
        // of the current scope

        let tryScope: Fpp.QualifiedIdentifier = [...lookFrom];
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
