// Generated from src/grammar/Fpp.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgContext } from "./FppParser.js";
import { ProgTopologyContext } from "./FppParser.js";
import { ProgComponentContext } from "./FppParser.js";
import { AbstractTypeDeclContext } from "./FppParser.js";
import { AliasTypeDeclContext } from "./FppParser.js";
import { ArrayDeclContext } from "./FppParser.js";
import { ConstantDeclContext } from "./FppParser.js";
import { StructMemberContext } from "./FppParser.js";
import { StructMemberNContext } from "./FppParser.js";
import { StructMemberLContext } from "./FppParser.js";
import { StructDeclContext } from "./FppParser.js";
import { QueueFullBehaviorContext } from "./FppParser.js";
import { CommandKindContext } from "./FppParser.js";
import { CommandDeclContext } from "./FppParser.js";
import { ParamDeclContext } from "./FppParser.js";
import { GeneralPortKindContext } from "./FppParser.js";
import { SpecialPortKindContext } from "./FppParser.js";
import { GeneralPortInstanceTypeContext } from "./FppParser.js";
import { GeneralPortInstanceDeclContext } from "./FppParser.js";
import { SpecialPortInstanceDeclContext } from "./FppParser.js";
import { TelemetryLimitKindContext } from "./FppParser.js";
import { TelemetryLimitExprContext } from "./FppParser.js";
import { TelemetryLimitContext } from "./FppParser.js";
import { TelemetryUpdateContext } from "./FppParser.js";
import { TelemetryChannelDeclContext } from "./FppParser.js";
import { ActionDefContext } from "./FppParser.js";
import { ChoiceDefContext } from "./FppParser.js";
import { GuardDefContext } from "./FppParser.js";
import { SignalDefContext } from "./FppParser.js";
import { DoExprContext } from "./FppParser.js";
import { TransitionExprContext } from "./FppParser.js";
import { InitialTransitionContext } from "./FppParser.js";
import { TransitionOrDoExprContext } from "./FppParser.js";
import { StateTransitionContext } from "./FppParser.js";
import { StateEntryContext } from "./FppParser.js";
import { StateExitContext } from "./FppParser.js";
import { StateMemberContext } from "./FppParser.js";
import { StateDefContext } from "./FppParser.js";
import { StateMachineMemberTemplContext } from "./FppParser.js";
import { StateMachineMemberContext } from "./FppParser.js";
import { StateMachineDefContext } from "./FppParser.js";
import { StateMachineInstanceContext } from "./FppParser.js";
import { EnumMemberContext } from "./FppParser.js";
import { EnumMemberNContext } from "./FppParser.js";
import { EnumMemberLContext } from "./FppParser.js";
import { EnumDeclContext } from "./FppParser.js";
import { EventSeverityContext } from "./FppParser.js";
import { EventDeclContext } from "./FppParser.js";
import { IncludeStmtContext } from "./FppParser.js";
import { MatchStmtContext } from "./FppParser.js";
import { InternalPortDeclContext } from "./FppParser.js";
import { RecordSpecifierDeclContext } from "./FppParser.js";
import { ContainerSpecifierDeclContext } from "./FppParser.js";
import { InitSpecifierContext } from "./FppParser.js";
import { ComponentInstanceDeclContext } from "./FppParser.js";
import { ComponentKindContext } from "./FppParser.js";
import { ComponentMemberContext } from "./FppParser.js";
import { ComponentDeclContext } from "./FppParser.js";
import { PortDeclContext } from "./FppParser.js";
import { ComponentInstanceSpecContext } from "./FppParser.js";
import { ConnectionNodeContext } from "./FppParser.js";
import { ConnectionContext } from "./FppParser.js";
import { DirectGraphDeclContext } from "./FppParser.js";
import { PatternKindContext } from "./FppParser.js";
import { PatternGraphSourcesContext } from "./FppParser.js";
import { PatternGraphStmtContext } from "./FppParser.js";
import { TopologyImportStmtContext } from "./FppParser.js";
import { TopologyMemberContext } from "./FppParser.js";
import { TopologyDeclContext } from "./FppParser.js";
import { LocationKindContext } from "./FppParser.js";
import { LocationStmtContext } from "./FppParser.js";
import { ModuleMemberContext } from "./FppParser.js";
import { ModuleDeclContext } from "./FppParser.js";
import { FormalParameterContext } from "./FppParser.js";
import { FormalParameterNContext } from "./FppParser.js";
import { FormalParamaterLContext } from "./FppParser.js";
import { FormalParameterListContext } from "./FppParser.js";
import { QualIdentContext } from "./FppParser.js";
import { IntTypeContext } from "./FppParser.js";
import { PrimitiveTypeContext } from "./FppParser.js";
import { TypeNameContext } from "./FppParser.js";
import { CommaDelimContext } from "./FppParser.js";
import { SemiDelimContext } from "./FppParser.js";
import { ArrayExprContext } from "./FppParser.js";
import { StructAssignmentContext } from "./FppParser.js";
import { StructExprContext } from "./FppParser.js";
import { ExprContext } from "./FppParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FppParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class FppVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FppParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.progTopology`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgTopology?: (ctx: ProgTopologyContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.progComponent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgComponent?: (ctx: ProgComponentContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.abstractTypeDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbstractTypeDecl?: (ctx: AbstractTypeDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.aliasTypeDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAliasTypeDecl?: (ctx: AliasTypeDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.arrayDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayDecl?: (ctx: ArrayDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.constantDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstantDecl?: (ctx: ConstantDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructMember?: (ctx: StructMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structMemberN`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructMemberN?: (ctx: StructMemberNContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structMemberL`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructMemberL?: (ctx: StructMemberLContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructDecl?: (ctx: StructDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.queueFullBehavior`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueueFullBehavior?: (ctx: QueueFullBehaviorContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.commandKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommandKind?: (ctx: CommandKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.commandDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommandDecl?: (ctx: CommandDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.paramDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamDecl?: (ctx: ParamDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.generalPortKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneralPortKind?: (ctx: GeneralPortKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.specialPortKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecialPortKind?: (ctx: SpecialPortKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.generalPortInstanceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneralPortInstanceType?: (ctx: GeneralPortInstanceTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.generalPortInstanceDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneralPortInstanceDecl?: (ctx: GeneralPortInstanceDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.specialPortInstanceDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecialPortInstanceDecl?: (ctx: SpecialPortInstanceDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.telemetryLimitKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryLimitKind?: (ctx: TelemetryLimitKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.telemetryLimitExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryLimitExpr?: (ctx: TelemetryLimitExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.telemetryLimit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryLimit?: (ctx: TelemetryLimitContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.telemetryUpdate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryUpdate?: (ctx: TelemetryUpdateContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.telemetryChannelDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryChannelDecl?: (ctx: TelemetryChannelDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.actionDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActionDef?: (ctx: ActionDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.choiceDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChoiceDef?: (ctx: ChoiceDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.guardDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGuardDef?: (ctx: GuardDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.signalDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignalDef?: (ctx: SignalDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.doExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoExpr?: (ctx: DoExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.transitionExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransitionExpr?: (ctx: TransitionExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.initialTransition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitialTransition?: (ctx: InitialTransitionContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.transitionOrDoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransitionOrDoExpr?: (ctx: TransitionOrDoExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateTransition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateTransition?: (ctx: StateTransitionContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateEntry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateEntry?: (ctx: StateEntryContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateExit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateExit?: (ctx: StateExitContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMember?: (ctx: StateMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateDef?: (ctx: StateDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateMachineMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMachineMemberTempl?: (ctx: StateMachineMemberTemplContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateMachineMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMachineMember?: (ctx: StateMachineMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateMachineDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMachineDef?: (ctx: StateMachineDefContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.stateMachineInstance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMachineInstance?: (ctx: StateMachineInstanceContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.enumMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumMember?: (ctx: EnumMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.enumMemberN`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumMemberN?: (ctx: EnumMemberNContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.enumMemberL`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumMemberL?: (ctx: EnumMemberLContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.enumDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDecl?: (ctx: EnumDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.eventSeverity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEventSeverity?: (ctx: EventSeverityContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.eventDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEventDecl?: (ctx: EventDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.includeStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeStmt?: (ctx: IncludeStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.matchStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchStmt?: (ctx: MatchStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.internalPortDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInternalPortDecl?: (ctx: InternalPortDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.recordSpecifierDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecordSpecifierDecl?: (ctx: RecordSpecifierDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.containerSpecifierDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContainerSpecifierDecl?: (ctx: ContainerSpecifierDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.initSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitSpecifier?: (ctx: InitSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.componentInstanceDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentInstanceDecl?: (ctx: ComponentInstanceDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.componentKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentKind?: (ctx: ComponentKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.componentMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentMember?: (ctx: ComponentMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.componentDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentDecl?: (ctx: ComponentDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.portDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPortDecl?: (ctx: PortDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.componentInstanceSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentInstanceSpec?: (ctx: ComponentInstanceSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.connectionNode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConnectionNode?: (ctx: ConnectionNodeContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.connection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConnection?: (ctx: ConnectionContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.directGraphDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirectGraphDecl?: (ctx: DirectGraphDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.patternKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternKind?: (ctx: PatternKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.patternGraphSources`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternGraphSources?: (ctx: PatternGraphSourcesContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.patternGraphStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternGraphStmt?: (ctx: PatternGraphStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.topologyImportStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopologyImportStmt?: (ctx: TopologyImportStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.topologyMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopologyMember?: (ctx: TopologyMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.topologyDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopologyDecl?: (ctx: TopologyDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.locationKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocationKind?: (ctx: LocationKindContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.locationStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocationStmt?: (ctx: LocationStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.moduleMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModuleMember?: (ctx: ModuleMemberContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.moduleDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModuleDecl?: (ctx: ModuleDeclContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.formalParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameter?: (ctx: FormalParameterContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.formalParameterN`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameterN?: (ctx: FormalParameterNContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.formalParamaterL`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParamaterL?: (ctx: FormalParamaterLContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.formalParameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameterList?: (ctx: FormalParameterListContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.qualIdent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualIdent?: (ctx: QualIdentContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.intType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntType?: (ctx: IntTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.typeName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeName?: (ctx: TypeNameContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.commaDelim`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommaDelim?: (ctx: CommaDelimContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.semiDelim`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemiDelim?: (ctx: SemiDelimContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.arrayExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructAssignment?: (ctx: StructAssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.structExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructExpr?: (ctx: StructExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FppParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
}

