import * as vscode from 'vscode';

import * as Fpp from '../parser/ast';
import { DiangosicManager } from '../diagnostics';

export abstract class MemberTraverser extends DiangosicManager {
    private passSemaphore: number = 0;

    pass(ast: Fpp.TranslationUnit<Fpp.Member>, scope: Fpp.QualifiedIdentifier = []) {
        this.passSemaphore++;

        for (const member of ast.members) {
            this.traverse(member, scope);
        }

        this.passSemaphore--;

        // Only flush diags on the outer most recursion
        if (this.passSemaphore === 0) {
            this.flush(ast.location.source);
            for (const dep of ast.dependencies) {
                this.flush(dep);
            }
        }
    }

    protected traverse(ast: Fpp.Member, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier = []) {
        if (ast.isError) {
            return;
        } else if ('name' in ast && !ast.name) {
            return;
        }

        try {
            switch (ast.type) {
                case 'AbstractTypeDecl':
                    this.abstractTypeDecl(ast, scope);
                    break;
                case 'AliasTypeDecl':
                    this.aliasTypeDecl(ast, scope);
                    break;
                case 'ArrayDecl':
                    this.arrayDecl(ast, scope);
                    break;
                case 'ConstantDecl':
                    this.constantDecl(ast, scope);
                    break;
                case 'StructDecl':
                    this.structDecl(ast, scope);
                    break;
                case 'CommandDecl':
                    this.commandDecl(ast, scope);
                    break;
                case 'ParamDecl':
                    this.paramDecl(ast, scope);
                    break;
                case 'GeneralPortInstanceDecl':
                    this.generalPortInstanceDecl(ast, scope);
                    break;
                case 'SpecialPortInstanceDecl':
                    this.specialPortInstanceDecl(ast, scope);
                    break;
                case 'TelemetryChannelDecl':
                    this.telemetryChannelDecl(ast, scope);
                    break;
                case 'EnumDecl':
                    this.enumDecl(ast, scope);
                    break;
                case 'EventDecl':
                    this.eventDecl(ast, scope);
                    break;
                case 'IncludeStmt':
                    this.includeStmt(ast, scope);
                    break;
                case 'InternalPortDecl':
                    this.internalPortDecl(ast, scope);
                    break;
                case 'MatchStmt':
                    this.matchStmt(ast, scope);
                    break;
                case 'ComponentDecl':
                    this.componentDecl(ast, scope);
                    break;
                case 'ComponentInstanceDecl':
                    this.componentInstanceDecl(ast, scope);
                    break;
                case 'InterfaceDecl':
                    this.interfaceDecl(ast, scope);
                    break;
                case 'ModuleDecl':
                    this.moduleDecl(ast, scope);
                    break;
                case 'PortDecl':
                    this.portDecl(ast, scope);
                    break;
                case 'TopologyDecl':
                    this.topologyDecl(ast, scope);
                    break;
                case 'LocationStmt':
                    this.locationStmt(ast, scope);
                    break;
                case 'ComponentInstanceSpec':
                    this.componentInstanceSpec(ast, scope);
                    break;
                case 'DirectGraphDecl':
                    this.directGraphDecl(ast, scope);
                    break;
                case 'PatternGraphStmt':
                    this.patternGraphStmt(ast, scope);
                    break;
                case 'InterfaceImportStmt':
                    this.interfaceImportStmt(ast, scope);
                    break;
                case 'TopologyImportStmt':
                    this.topologyImportStmt(ast, scope);
                    break;
                case 'ProductContainerDecl':
                    this.productContainerDecl(ast, scope);
                    break;
                case 'ProductRecordDecl':
                    this.productRecordDecl(ast, scope);
                    break;
                case 'StateMachineDecl':
                    this.stateMachineDecl(ast, scope);
                    break;
                case 'InitialTransition':
                    this.initialTransistion(ast, scope, []);
                    break;
                case 'StateMachineInstance':
                    this.stateMachineInstance(ast, scope);
                    break;
                case 'ChoiceDef':
                    this.choiceDef(ast, scope, stateScope);
                    break;
                case 'GuardDef':
                    this.guardDef(ast, scope);
                    break;
                case 'SignalDef':
                    this.signalDef(ast, scope);
                    break;
                case 'StateDef':
                    this.stateDef(ast, scope, []);
                    break;
                case 'ActionDef':
                    this.actionDef(ast, scope);
                    break;
                default:
                    throw new Error(`Unhandled declaration type ${(ast as any).type}: ${ast}`);
            }
        } catch (e) {
            // console.error(e);
        }
    }

    protected abstractTypeDecl(ast: Fpp.AbstractTypeDecl, scope: Fpp.QualifiedIdentifier) { }
    protected aliasTypeDecl(ast: Fpp.AliasTypeDecl, scope: Fpp.QualifiedIdentifier) { }
    protected arrayDecl(ast: Fpp.ArrayDecl, scope: Fpp.QualifiedIdentifier) { }
    protected constantDecl(ast: Fpp.ConstantDecl, scope: Fpp.QualifiedIdentifier) { }
    protected structDecl(ast: Fpp.StructDecl, scope: Fpp.QualifiedIdentifier) { }
    protected commandDecl(ast: Fpp.CommandDecl, scope: Fpp.QualifiedIdentifier) { }
    protected paramDecl(ast: Fpp.ParamDecl, scope: Fpp.QualifiedIdentifier) { }
    protected generalPortInstanceDecl(ast: Fpp.GeneralPortInstanceDecl, scope: Fpp.QualifiedIdentifier) { }
    protected specialPortInstanceDecl(ast: Fpp.SpecialPortInstanceDecl, scope: Fpp.QualifiedIdentifier) { }
    protected telemetryChannelDecl(ast: Fpp.TelemetryChannelDecl, scope: Fpp.QualifiedIdentifier) { }
    protected productContainerDecl(ast: Fpp.ProductContainerDecl, scope: Fpp.QualifiedIdentifier) { }
    protected productRecordDecl(ast: Fpp.ProductRecordDecl, scope: Fpp.QualifiedIdentifier) { }
    protected enumDecl(ast: Fpp.EnumDecl, scope: Fpp.QualifiedIdentifier) { }
    protected eventDecl(ast: Fpp.EventDecl, scope: Fpp.QualifiedIdentifier) { }
    protected matchStmt(ast: Fpp.MatchStmt, scope: Fpp.QualifiedIdentifier) { }
    protected internalPortDecl(ast: Fpp.InternalPortDecl, scope: Fpp.QualifiedIdentifier) { }
    protected componentInstanceDecl(ast: Fpp.ComponentInstanceDecl, scope: Fpp.QualifiedIdentifier) { }
    protected portDecl(ast: Fpp.PortDecl, scope: Fpp.QualifiedIdentifier) { }
    protected locationStmt(ast: Fpp.LocationStmt, scope: Fpp.QualifiedIdentifier) { }
    protected componentInstanceSpec(ast: Fpp.ComponentInstanceSpec, scope: Fpp.QualifiedIdentifier) { }
    protected directGraphDecl(ast: Fpp.DirectGraphDecl, scope: Fpp.QualifiedIdentifier) { }
    protected patternGraphStmt(ast: Fpp.PatternGraphStmt, scope: Fpp.QualifiedIdentifier) { }
    protected interfaceImportStmt(ast: Fpp.InterfaceImportStmt, scope: Fpp.QualifiedIdentifier) { }
    protected topologyImportStmt(ast: Fpp.TopologyImportStmt, scope: Fpp.QualifiedIdentifier) { }
    protected stateMachineInstance(ast: Fpp.StateMachineInstance, scope: Fpp.QualifiedIdentifier) { }
    protected guardDef(ast: Fpp.GuardDef, scope: Fpp.QualifiedIdentifier) { }
    protected initialTransistion(ast: Fpp.InitialTransition, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) { }
    protected signalDef(ast: Fpp.SignalDef, scope: Fpp.QualifiedIdentifier) { }
    protected actionDef(ast: Fpp.ActionDef, scope: Fpp.QualifiedIdentifier) { }

    protected choiceDef(ast: Fpp.ChoiceDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) { }
    protected stateTransition(ast: Fpp.StateTransition, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) { }
    protected stateEntry(ast: Fpp.StateEntry, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) { }
    protected stateExit(ast: Fpp.StateExit, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) { }

    protected includeStmt(ast: Fpp.IncludeStmt<Fpp.Member>, scope: Fpp.QualifiedIdentifier) {
        if (ast.resolved) {
            try {
                for (const member of ast.resolved.members) {
                    this.traverse(member, scope);
                }
            } catch (e) { }
        } else {
            this.emit(
                vscode.Uri.file(ast.location.source),
                new vscode.Diagnostic(DiangosicManager.asRange(ast.include.location),
                    `File '${ast.include.value}' does not exist`)
            );
        }
    }

    protected componentDecl(ast: Fpp.ComponentDecl, scope: Fpp.QualifiedIdentifier) {
        for (const member of ast.members) {
            this.traverse(member, [...scope, ast.name]);
        }
    }

    protected interfaceDecl(ast: Fpp.InterfaceDecl, scope: Fpp.QualifiedIdentifier) {
        for (const member of ast.members) {
            this.traverse(member, [...scope, ast.name]);
        }
    }

    protected moduleDecl(ast: Fpp.ModuleDecl, scope: Fpp.QualifiedIdentifier) {
        for (const member of ast.members) {
            this.traverse(member, [...scope, ast.name]);
        }
    }

    protected topologyDecl(ast: Fpp.TopologyDecl, scope: Fpp.QualifiedIdentifier) {
        for (const member of ast.members) {
            // this.traverse(member, [...scope, ast.name]);
            this.traverse(member, scope);
        }
    }

    protected stateMachineDecl(ast: Fpp.StateMachineDecl, scope: Fpp.QualifiedIdentifier) {
        for (const member of ast.members) {
            this.traverse(member, [...scope, ast.name]);
        }
    }

    protected stateDef(ast: Fpp.StateDef, scope: Fpp.QualifiedIdentifier, stateScope: Fpp.QualifiedIdentifier) {
        const newStateScope = [...stateScope, ast.name];

        for (const member of ast.members) {
            switch (member.type) {
                case 'StateDef':
                    this.stateDef(member, scope, newStateScope);
                    break;
                case 'InitialTransition':
                    this.initialTransistion(member, scope, newStateScope);
                    break;
                case 'ChoiceDef':
                    this.choiceDef(member, scope, newStateScope);
                    break;
                case 'StateTransition':
                    this.stateTransition(member, scope, newStateScope);
                    break;
                case 'StateEntry':
                    this.stateEntry(member, scope, newStateScope);
                    break;
                case 'StateExit':
                    this.stateExit(member, scope, newStateScope);
                    break;
            }
        }
    }
}
