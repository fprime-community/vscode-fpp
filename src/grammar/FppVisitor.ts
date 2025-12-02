// Generated from src/grammar/Fpp.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgContext } from "./FppParser";
import { ProgTopologyContext } from "./FppParser";
import { ProgComponentContext } from "./FppParser";
import { AbstractTypeDeclContext } from "./FppParser";
import { AliasTypeDeclContext } from "./FppParser";
import { ArrayDeclContext } from "./FppParser";
import { ConstantDeclContext } from "./FppParser";
import { StructMemberContext } from "./FppParser";
import { StructMemberNContext } from "./FppParser";
import { StructMemberLContext } from "./FppParser";
import { StructDeclContext } from "./FppParser";
import { QueueFullBehaviorContext } from "./FppParser";
import { CommandKindContext } from "./FppParser";
import { CommandDeclContext } from "./FppParser";
import { ParamDeclContext } from "./FppParser";
import { GeneralPortKindContext } from "./FppParser";
import { SpecialPortKindContext } from "./FppParser";
import { GeneralPortInstanceTypeContext } from "./FppParser";
import { GeneralPortInstanceDeclContext } from "./FppParser";
import { SpecialPortInstanceDeclContext } from "./FppParser";
import { TelemetryLimitKindContext } from "./FppParser";
import { TelemetryLimitExprContext } from "./FppParser";
import { TelemetryLimitContext } from "./FppParser";
import { TelemetryUpdateContext } from "./FppParser";
import { TelemetryChannelDeclContext } from "./FppParser";
import { ActionDefContext } from "./FppParser";
import { ChoiceDefContext } from "./FppParser";
import { GuardDefContext } from "./FppParser";
import { SignalDefContext } from "./FppParser";
import { DoExprContext } from "./FppParser";
import { TransitionExprContext } from "./FppParser";
import { InitialTransitionContext } from "./FppParser";
import { TransitionOrDoExprContext } from "./FppParser";
import { StateTransitionContext } from "./FppParser";
import { StateEntryContext } from "./FppParser";
import { StateExitContext } from "./FppParser";
import { StateMemberTemplContext } from "./FppParser";
import { StateMemberContext } from "./FppParser";
import { StateDefContext } from "./FppParser";
import { StateMachineMemberTemplContext } from "./FppParser";
import { StateMachineMemberContext } from "./FppParser";
import { StateMachineDefContext } from "./FppParser";
import { StateMachineInstanceContext } from "./FppParser";
import { EnumMemberContext } from "./FppParser";
import { EnumMemberNContext } from "./FppParser";
import { EnumMemberLContext } from "./FppParser";
import { EnumDeclContext } from "./FppParser";
import { EventSeverityContext } from "./FppParser";
import { EventDeclContext } from "./FppParser";
import { IncludeStmtContext } from "./FppParser";
import { MatchStmtContext } from "./FppParser";
import { InternalPortDeclContext } from "./FppParser";
import { RecordSpecifierDeclContext } from "./FppParser";
import { ContainerSpecifierDeclContext } from "./FppParser";
import { InitSpecifierContext } from "./FppParser";
import { ComponentInstanceDeclContext } from "./FppParser";
import { ComponentKindContext } from "./FppParser";
import { ComponentMemberTemplContext } from "./FppParser";
import { ComponentMemberContext } from "./FppParser";
import { ComponentDeclContext } from "./FppParser";
import { PortDeclContext } from "./FppParser";
import { ComponentInstanceSpecContext } from "./FppParser";
import { ConnectionNodeContext } from "./FppParser";
import { ConnectionContext } from "./FppParser";
import { DirectGraphDeclContext } from "./FppParser";
import { PatternKindContext } from "./FppParser";
import { PatternGraphSourcesContext } from "./FppParser";
import { PatternGraphStmtContext } from "./FppParser";
import { ImportTopologyStmtContext } from "./FppParser";
import { ImportInterfaceStmtContext } from "./FppParser";
import { TelemetryChannelIdentifierContext } from "./FppParser";
import { TelemetryPacketSpecifierContext } from "./FppParser";
import { TelemetryPacketSetMemberTemplContext } from "./FppParser";
import { TelemetryPacketSetMemberContext } from "./FppParser";
import { TelemetryPacketSetDeclContext } from "./FppParser";
import { TopologyMemberTemplContext } from "./FppParser";
import { TopologyMemberContext } from "./FppParser";
import { TopologyDeclContext } from "./FppParser";
import { InterfaceMemberTemplContext } from "./FppParser";
import { InterfaceMemberContext } from "./FppParser";
import { InterfaceDeclContext } from "./FppParser";
import { LocationKindContext } from "./FppParser";
import { LocationStmtContext } from "./FppParser";
import { ModuleMemberTemplContext } from "./FppParser";
import { ModuleMemberContext } from "./FppParser";
import { ModuleDeclContext } from "./FppParser";
import { FormalParameterContext } from "./FppParser";
import { FormalParameterNContext } from "./FppParser";
import { FormalParamaterLContext } from "./FppParser";
import { FormalParameterListContext } from "./FppParser";
import { QualIdentContext } from "./FppParser";
import { IntTypeContext } from "./FppParser";
import { PrimitiveTypeContext } from "./FppParser";
import { StringTypeContext } from "./FppParser";
import { TypeNameContext } from "./FppParser";
import { CommaDelimContext } from "./FppParser";
import { SemiDelimContext } from "./FppParser";
import { ExprDotContext } from "./FppParser";
import { ExprSubscriptContext } from "./FppParser";
import { ExprUnaryContext } from "./FppParser";
import { ExprMulDivContext } from "./FppParser";
import { ExprAddSubContext } from "./FppParser";
import { ExprContext } from "./FppParser";
import { ExprPrimaryContext } from "./FppParser";
import { ArrayExprContext } from "./FppParser";
import { StructAssignmentContext } from "./FppParser";
import { StructExprContext } from "./FppParser";
import { PostAnnotationContext } from "./FppParser";
import { PostMultiAnnotationContext } from "./FppParser";
import { PreAnnotationContext } from "./FppParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FppParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface FppVisitor<Result> extends ParseTreeVisitor<Result> {
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
	 * Visit a parse tree produced by `FppParser.stateMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStateMemberTempl?: (ctx: StateMemberTemplContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.componentMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentMemberTempl?: (ctx: ComponentMemberTemplContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.importTopologyStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportTopologyStmt?: (ctx: ImportTopologyStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.importInterfaceStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportInterfaceStmt?: (ctx: ImportInterfaceStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.telemetryChannelIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryChannelIdentifier?: (ctx: TelemetryChannelIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.telemetryPacketSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryPacketSpecifier?: (ctx: TelemetryPacketSpecifierContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.telemetryPacketSetMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryPacketSetMemberTempl?: (ctx: TelemetryPacketSetMemberTemplContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.telemetryPacketSetMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryPacketSetMember?: (ctx: TelemetryPacketSetMemberContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.telemetryPacketSetDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTelemetryPacketSetDecl?: (ctx: TelemetryPacketSetDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.topologyMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopologyMemberTempl?: (ctx: TopologyMemberTemplContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.interfaceMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceMemberTempl?: (ctx: InterfaceMemberTemplContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.interfaceMember`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceMember?: (ctx: InterfaceMemberContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.interfaceDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceDecl?: (ctx: InterfaceDeclContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.moduleMemberTempl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModuleMemberTempl?: (ctx: ModuleMemberTemplContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.stringType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringType?: (ctx: StringTypeContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.exprDot`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprDot?: (ctx: ExprDotContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.exprSubscript`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprSubscript?: (ctx: ExprSubscriptContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.exprUnary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprUnary?: (ctx: ExprUnaryContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.exprMulDiv`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprMulDiv?: (ctx: ExprMulDivContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.exprAddSub`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprAddSub?: (ctx: ExprAddSubContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.exprPrimary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprPrimary?: (ctx: ExprPrimaryContext) => Result;

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
	 * Visit a parse tree produced by `FppParser.postAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostAnnotation?: (ctx: PostAnnotationContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.postMultiAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostMultiAnnotation?: (ctx: PostMultiAnnotationContext) => Result;

	/**
	 * Visit a parse tree produced by `FppParser.preAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreAnnotation?: (ctx: PreAnnotationContext) => Result;
}

