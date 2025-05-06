// Generated from src/grammar/Fpp.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
import { TopologyImportStmtContext } from "./FppParser";
import { TopologyMemberTemplContext } from "./FppParser";
import { TopologyMemberContext } from "./FppParser";
import { TopologyDeclContext } from "./FppParser";
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
import { ArrayExprContext } from "./FppParser";
import { StructAssignmentContext } from "./FppParser";
import { StructExprContext } from "./FppParser";
import { ExprContext } from "./FppParser";
import { PostAnnotationContext } from "./FppParser";
import { PostMultiAnnotationContext } from "./FppParser";
import { PreAnnotationContext } from "./FppParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `FppParser`.
 */
export interface FppListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FppParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.progTopology`.
	 * @param ctx the parse tree
	 */
	enterProgTopology?: (ctx: ProgTopologyContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.progTopology`.
	 * @param ctx the parse tree
	 */
	exitProgTopology?: (ctx: ProgTopologyContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.progComponent`.
	 * @param ctx the parse tree
	 */
	enterProgComponent?: (ctx: ProgComponentContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.progComponent`.
	 * @param ctx the parse tree
	 */
	exitProgComponent?: (ctx: ProgComponentContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.abstractTypeDecl`.
	 * @param ctx the parse tree
	 */
	enterAbstractTypeDecl?: (ctx: AbstractTypeDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.abstractTypeDecl`.
	 * @param ctx the parse tree
	 */
	exitAbstractTypeDecl?: (ctx: AbstractTypeDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.aliasTypeDecl`.
	 * @param ctx the parse tree
	 */
	enterAliasTypeDecl?: (ctx: AliasTypeDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.aliasTypeDecl`.
	 * @param ctx the parse tree
	 */
	exitAliasTypeDecl?: (ctx: AliasTypeDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.arrayDecl`.
	 * @param ctx the parse tree
	 */
	enterArrayDecl?: (ctx: ArrayDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.arrayDecl`.
	 * @param ctx the parse tree
	 */
	exitArrayDecl?: (ctx: ArrayDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.constantDecl`.
	 * @param ctx the parse tree
	 */
	enterConstantDecl?: (ctx: ConstantDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.constantDecl`.
	 * @param ctx the parse tree
	 */
	exitConstantDecl?: (ctx: ConstantDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structMember`.
	 * @param ctx the parse tree
	 */
	enterStructMember?: (ctx: StructMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structMember`.
	 * @param ctx the parse tree
	 */
	exitStructMember?: (ctx: StructMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structMemberN`.
	 * @param ctx the parse tree
	 */
	enterStructMemberN?: (ctx: StructMemberNContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structMemberN`.
	 * @param ctx the parse tree
	 */
	exitStructMemberN?: (ctx: StructMemberNContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structMemberL`.
	 * @param ctx the parse tree
	 */
	enterStructMemberL?: (ctx: StructMemberLContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structMemberL`.
	 * @param ctx the parse tree
	 */
	exitStructMemberL?: (ctx: StructMemberLContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structDecl`.
	 * @param ctx the parse tree
	 */
	enterStructDecl?: (ctx: StructDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structDecl`.
	 * @param ctx the parse tree
	 */
	exitStructDecl?: (ctx: StructDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.queueFullBehavior`.
	 * @param ctx the parse tree
	 */
	enterQueueFullBehavior?: (ctx: QueueFullBehaviorContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.queueFullBehavior`.
	 * @param ctx the parse tree
	 */
	exitQueueFullBehavior?: (ctx: QueueFullBehaviorContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.commandKind`.
	 * @param ctx the parse tree
	 */
	enterCommandKind?: (ctx: CommandKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.commandKind`.
	 * @param ctx the parse tree
	 */
	exitCommandKind?: (ctx: CommandKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.commandDecl`.
	 * @param ctx the parse tree
	 */
	enterCommandDecl?: (ctx: CommandDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.commandDecl`.
	 * @param ctx the parse tree
	 */
	exitCommandDecl?: (ctx: CommandDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.paramDecl`.
	 * @param ctx the parse tree
	 */
	enterParamDecl?: (ctx: ParamDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.paramDecl`.
	 * @param ctx the parse tree
	 */
	exitParamDecl?: (ctx: ParamDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.generalPortKind`.
	 * @param ctx the parse tree
	 */
	enterGeneralPortKind?: (ctx: GeneralPortKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.generalPortKind`.
	 * @param ctx the parse tree
	 */
	exitGeneralPortKind?: (ctx: GeneralPortKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.specialPortKind`.
	 * @param ctx the parse tree
	 */
	enterSpecialPortKind?: (ctx: SpecialPortKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.specialPortKind`.
	 * @param ctx the parse tree
	 */
	exitSpecialPortKind?: (ctx: SpecialPortKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.generalPortInstanceType`.
	 * @param ctx the parse tree
	 */
	enterGeneralPortInstanceType?: (ctx: GeneralPortInstanceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.generalPortInstanceType`.
	 * @param ctx the parse tree
	 */
	exitGeneralPortInstanceType?: (ctx: GeneralPortInstanceTypeContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.generalPortInstanceDecl`.
	 * @param ctx the parse tree
	 */
	enterGeneralPortInstanceDecl?: (ctx: GeneralPortInstanceDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.generalPortInstanceDecl`.
	 * @param ctx the parse tree
	 */
	exitGeneralPortInstanceDecl?: (ctx: GeneralPortInstanceDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.specialPortInstanceDecl`.
	 * @param ctx the parse tree
	 */
	enterSpecialPortInstanceDecl?: (ctx: SpecialPortInstanceDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.specialPortInstanceDecl`.
	 * @param ctx the parse tree
	 */
	exitSpecialPortInstanceDecl?: (ctx: SpecialPortInstanceDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.telemetryLimitKind`.
	 * @param ctx the parse tree
	 */
	enterTelemetryLimitKind?: (ctx: TelemetryLimitKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.telemetryLimitKind`.
	 * @param ctx the parse tree
	 */
	exitTelemetryLimitKind?: (ctx: TelemetryLimitKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.telemetryLimitExpr`.
	 * @param ctx the parse tree
	 */
	enterTelemetryLimitExpr?: (ctx: TelemetryLimitExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.telemetryLimitExpr`.
	 * @param ctx the parse tree
	 */
	exitTelemetryLimitExpr?: (ctx: TelemetryLimitExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.telemetryLimit`.
	 * @param ctx the parse tree
	 */
	enterTelemetryLimit?: (ctx: TelemetryLimitContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.telemetryLimit`.
	 * @param ctx the parse tree
	 */
	exitTelemetryLimit?: (ctx: TelemetryLimitContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.telemetryUpdate`.
	 * @param ctx the parse tree
	 */
	enterTelemetryUpdate?: (ctx: TelemetryUpdateContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.telemetryUpdate`.
	 * @param ctx the parse tree
	 */
	exitTelemetryUpdate?: (ctx: TelemetryUpdateContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.telemetryChannelDecl`.
	 * @param ctx the parse tree
	 */
	enterTelemetryChannelDecl?: (ctx: TelemetryChannelDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.telemetryChannelDecl`.
	 * @param ctx the parse tree
	 */
	exitTelemetryChannelDecl?: (ctx: TelemetryChannelDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.actionDef`.
	 * @param ctx the parse tree
	 */
	enterActionDef?: (ctx: ActionDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.actionDef`.
	 * @param ctx the parse tree
	 */
	exitActionDef?: (ctx: ActionDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.choiceDef`.
	 * @param ctx the parse tree
	 */
	enterChoiceDef?: (ctx: ChoiceDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.choiceDef`.
	 * @param ctx the parse tree
	 */
	exitChoiceDef?: (ctx: ChoiceDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.guardDef`.
	 * @param ctx the parse tree
	 */
	enterGuardDef?: (ctx: GuardDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.guardDef`.
	 * @param ctx the parse tree
	 */
	exitGuardDef?: (ctx: GuardDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.signalDef`.
	 * @param ctx the parse tree
	 */
	enterSignalDef?: (ctx: SignalDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.signalDef`.
	 * @param ctx the parse tree
	 */
	exitSignalDef?: (ctx: SignalDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.doExpr`.
	 * @param ctx the parse tree
	 */
	enterDoExpr?: (ctx: DoExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.doExpr`.
	 * @param ctx the parse tree
	 */
	exitDoExpr?: (ctx: DoExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.transitionExpr`.
	 * @param ctx the parse tree
	 */
	enterTransitionExpr?: (ctx: TransitionExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.transitionExpr`.
	 * @param ctx the parse tree
	 */
	exitTransitionExpr?: (ctx: TransitionExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.initialTransition`.
	 * @param ctx the parse tree
	 */
	enterInitialTransition?: (ctx: InitialTransitionContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.initialTransition`.
	 * @param ctx the parse tree
	 */
	exitInitialTransition?: (ctx: InitialTransitionContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.transitionOrDoExpr`.
	 * @param ctx the parse tree
	 */
	enterTransitionOrDoExpr?: (ctx: TransitionOrDoExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.transitionOrDoExpr`.
	 * @param ctx the parse tree
	 */
	exitTransitionOrDoExpr?: (ctx: TransitionOrDoExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateTransition`.
	 * @param ctx the parse tree
	 */
	enterStateTransition?: (ctx: StateTransitionContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateTransition`.
	 * @param ctx the parse tree
	 */
	exitStateTransition?: (ctx: StateTransitionContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateEntry`.
	 * @param ctx the parse tree
	 */
	enterStateEntry?: (ctx: StateEntryContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateEntry`.
	 * @param ctx the parse tree
	 */
	exitStateEntry?: (ctx: StateEntryContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateExit`.
	 * @param ctx the parse tree
	 */
	enterStateExit?: (ctx: StateExitContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateExit`.
	 * @param ctx the parse tree
	 */
	exitStateExit?: (ctx: StateExitContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMemberTempl`.
	 * @param ctx the parse tree
	 */
	enterStateMemberTempl?: (ctx: StateMemberTemplContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMemberTempl`.
	 * @param ctx the parse tree
	 */
	exitStateMemberTempl?: (ctx: StateMemberTemplContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMember`.
	 * @param ctx the parse tree
	 */
	enterStateMember?: (ctx: StateMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMember`.
	 * @param ctx the parse tree
	 */
	exitStateMember?: (ctx: StateMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateDef`.
	 * @param ctx the parse tree
	 */
	enterStateDef?: (ctx: StateDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateDef`.
	 * @param ctx the parse tree
	 */
	exitStateDef?: (ctx: StateDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMachineMemberTempl`.
	 * @param ctx the parse tree
	 */
	enterStateMachineMemberTempl?: (ctx: StateMachineMemberTemplContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMachineMemberTempl`.
	 * @param ctx the parse tree
	 */
	exitStateMachineMemberTempl?: (ctx: StateMachineMemberTemplContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMachineMember`.
	 * @param ctx the parse tree
	 */
	enterStateMachineMember?: (ctx: StateMachineMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMachineMember`.
	 * @param ctx the parse tree
	 */
	exitStateMachineMember?: (ctx: StateMachineMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMachineDef`.
	 * @param ctx the parse tree
	 */
	enterStateMachineDef?: (ctx: StateMachineDefContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMachineDef`.
	 * @param ctx the parse tree
	 */
	exitStateMachineDef?: (ctx: StateMachineDefContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stateMachineInstance`.
	 * @param ctx the parse tree
	 */
	enterStateMachineInstance?: (ctx: StateMachineInstanceContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stateMachineInstance`.
	 * @param ctx the parse tree
	 */
	exitStateMachineInstance?: (ctx: StateMachineInstanceContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.enumMember`.
	 * @param ctx the parse tree
	 */
	enterEnumMember?: (ctx: EnumMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.enumMember`.
	 * @param ctx the parse tree
	 */
	exitEnumMember?: (ctx: EnumMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.enumMemberN`.
	 * @param ctx the parse tree
	 */
	enterEnumMemberN?: (ctx: EnumMemberNContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.enumMemberN`.
	 * @param ctx the parse tree
	 */
	exitEnumMemberN?: (ctx: EnumMemberNContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.enumMemberL`.
	 * @param ctx the parse tree
	 */
	enterEnumMemberL?: (ctx: EnumMemberLContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.enumMemberL`.
	 * @param ctx the parse tree
	 */
	exitEnumMemberL?: (ctx: EnumMemberLContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.enumDecl`.
	 * @param ctx the parse tree
	 */
	enterEnumDecl?: (ctx: EnumDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.enumDecl`.
	 * @param ctx the parse tree
	 */
	exitEnumDecl?: (ctx: EnumDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.eventSeverity`.
	 * @param ctx the parse tree
	 */
	enterEventSeverity?: (ctx: EventSeverityContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.eventSeverity`.
	 * @param ctx the parse tree
	 */
	exitEventSeverity?: (ctx: EventSeverityContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.eventDecl`.
	 * @param ctx the parse tree
	 */
	enterEventDecl?: (ctx: EventDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.eventDecl`.
	 * @param ctx the parse tree
	 */
	exitEventDecl?: (ctx: EventDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.includeStmt`.
	 * @param ctx the parse tree
	 */
	enterIncludeStmt?: (ctx: IncludeStmtContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.includeStmt`.
	 * @param ctx the parse tree
	 */
	exitIncludeStmt?: (ctx: IncludeStmtContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.matchStmt`.
	 * @param ctx the parse tree
	 */
	enterMatchStmt?: (ctx: MatchStmtContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.matchStmt`.
	 * @param ctx the parse tree
	 */
	exitMatchStmt?: (ctx: MatchStmtContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.internalPortDecl`.
	 * @param ctx the parse tree
	 */
	enterInternalPortDecl?: (ctx: InternalPortDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.internalPortDecl`.
	 * @param ctx the parse tree
	 */
	exitInternalPortDecl?: (ctx: InternalPortDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.recordSpecifierDecl`.
	 * @param ctx the parse tree
	 */
	enterRecordSpecifierDecl?: (ctx: RecordSpecifierDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.recordSpecifierDecl`.
	 * @param ctx the parse tree
	 */
	exitRecordSpecifierDecl?: (ctx: RecordSpecifierDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.containerSpecifierDecl`.
	 * @param ctx the parse tree
	 */
	enterContainerSpecifierDecl?: (ctx: ContainerSpecifierDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.containerSpecifierDecl`.
	 * @param ctx the parse tree
	 */
	exitContainerSpecifierDecl?: (ctx: ContainerSpecifierDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.initSpecifier`.
	 * @param ctx the parse tree
	 */
	enterInitSpecifier?: (ctx: InitSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.initSpecifier`.
	 * @param ctx the parse tree
	 */
	exitInitSpecifier?: (ctx: InitSpecifierContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentInstanceDecl`.
	 * @param ctx the parse tree
	 */
	enterComponentInstanceDecl?: (ctx: ComponentInstanceDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentInstanceDecl`.
	 * @param ctx the parse tree
	 */
	exitComponentInstanceDecl?: (ctx: ComponentInstanceDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentKind`.
	 * @param ctx the parse tree
	 */
	enterComponentKind?: (ctx: ComponentKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentKind`.
	 * @param ctx the parse tree
	 */
	exitComponentKind?: (ctx: ComponentKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentMemberTempl`.
	 * @param ctx the parse tree
	 */
	enterComponentMemberTempl?: (ctx: ComponentMemberTemplContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentMemberTempl`.
	 * @param ctx the parse tree
	 */
	exitComponentMemberTempl?: (ctx: ComponentMemberTemplContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentMember`.
	 * @param ctx the parse tree
	 */
	enterComponentMember?: (ctx: ComponentMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentMember`.
	 * @param ctx the parse tree
	 */
	exitComponentMember?: (ctx: ComponentMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentDecl`.
	 * @param ctx the parse tree
	 */
	enterComponentDecl?: (ctx: ComponentDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentDecl`.
	 * @param ctx the parse tree
	 */
	exitComponentDecl?: (ctx: ComponentDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.portDecl`.
	 * @param ctx the parse tree
	 */
	enterPortDecl?: (ctx: PortDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.portDecl`.
	 * @param ctx the parse tree
	 */
	exitPortDecl?: (ctx: PortDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.componentInstanceSpec`.
	 * @param ctx the parse tree
	 */
	enterComponentInstanceSpec?: (ctx: ComponentInstanceSpecContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.componentInstanceSpec`.
	 * @param ctx the parse tree
	 */
	exitComponentInstanceSpec?: (ctx: ComponentInstanceSpecContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.connectionNode`.
	 * @param ctx the parse tree
	 */
	enterConnectionNode?: (ctx: ConnectionNodeContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.connectionNode`.
	 * @param ctx the parse tree
	 */
	exitConnectionNode?: (ctx: ConnectionNodeContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.connection`.
	 * @param ctx the parse tree
	 */
	enterConnection?: (ctx: ConnectionContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.connection`.
	 * @param ctx the parse tree
	 */
	exitConnection?: (ctx: ConnectionContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.directGraphDecl`.
	 * @param ctx the parse tree
	 */
	enterDirectGraphDecl?: (ctx: DirectGraphDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.directGraphDecl`.
	 * @param ctx the parse tree
	 */
	exitDirectGraphDecl?: (ctx: DirectGraphDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.patternKind`.
	 * @param ctx the parse tree
	 */
	enterPatternKind?: (ctx: PatternKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.patternKind`.
	 * @param ctx the parse tree
	 */
	exitPatternKind?: (ctx: PatternKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.patternGraphSources`.
	 * @param ctx the parse tree
	 */
	enterPatternGraphSources?: (ctx: PatternGraphSourcesContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.patternGraphSources`.
	 * @param ctx the parse tree
	 */
	exitPatternGraphSources?: (ctx: PatternGraphSourcesContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.patternGraphStmt`.
	 * @param ctx the parse tree
	 */
	enterPatternGraphStmt?: (ctx: PatternGraphStmtContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.patternGraphStmt`.
	 * @param ctx the parse tree
	 */
	exitPatternGraphStmt?: (ctx: PatternGraphStmtContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.topologyImportStmt`.
	 * @param ctx the parse tree
	 */
	enterTopologyImportStmt?: (ctx: TopologyImportStmtContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.topologyImportStmt`.
	 * @param ctx the parse tree
	 */
	exitTopologyImportStmt?: (ctx: TopologyImportStmtContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.topologyMemberTempl`.
	 * @param ctx the parse tree
	 */
	enterTopologyMemberTempl?: (ctx: TopologyMemberTemplContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.topologyMemberTempl`.
	 * @param ctx the parse tree
	 */
	exitTopologyMemberTempl?: (ctx: TopologyMemberTemplContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.topologyMember`.
	 * @param ctx the parse tree
	 */
	enterTopologyMember?: (ctx: TopologyMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.topologyMember`.
	 * @param ctx the parse tree
	 */
	exitTopologyMember?: (ctx: TopologyMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.topologyDecl`.
	 * @param ctx the parse tree
	 */
	enterTopologyDecl?: (ctx: TopologyDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.topologyDecl`.
	 * @param ctx the parse tree
	 */
	exitTopologyDecl?: (ctx: TopologyDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.locationKind`.
	 * @param ctx the parse tree
	 */
	enterLocationKind?: (ctx: LocationKindContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.locationKind`.
	 * @param ctx the parse tree
	 */
	exitLocationKind?: (ctx: LocationKindContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.locationStmt`.
	 * @param ctx the parse tree
	 */
	enterLocationStmt?: (ctx: LocationStmtContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.locationStmt`.
	 * @param ctx the parse tree
	 */
	exitLocationStmt?: (ctx: LocationStmtContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.moduleMemberTempl`.
	 * @param ctx the parse tree
	 */
	enterModuleMemberTempl?: (ctx: ModuleMemberTemplContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.moduleMemberTempl`.
	 * @param ctx the parse tree
	 */
	exitModuleMemberTempl?: (ctx: ModuleMemberTemplContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.moduleMember`.
	 * @param ctx the parse tree
	 */
	enterModuleMember?: (ctx: ModuleMemberContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.moduleMember`.
	 * @param ctx the parse tree
	 */
	exitModuleMember?: (ctx: ModuleMemberContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.moduleDecl`.
	 * @param ctx the parse tree
	 */
	enterModuleDecl?: (ctx: ModuleDeclContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.moduleDecl`.
	 * @param ctx the parse tree
	 */
	exitModuleDecl?: (ctx: ModuleDeclContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.formalParameter`.
	 * @param ctx the parse tree
	 */
	enterFormalParameter?: (ctx: FormalParameterContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.formalParameter`.
	 * @param ctx the parse tree
	 */
	exitFormalParameter?: (ctx: FormalParameterContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.formalParameterN`.
	 * @param ctx the parse tree
	 */
	enterFormalParameterN?: (ctx: FormalParameterNContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.formalParameterN`.
	 * @param ctx the parse tree
	 */
	exitFormalParameterN?: (ctx: FormalParameterNContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.formalParamaterL`.
	 * @param ctx the parse tree
	 */
	enterFormalParamaterL?: (ctx: FormalParamaterLContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.formalParamaterL`.
	 * @param ctx the parse tree
	 */
	exitFormalParamaterL?: (ctx: FormalParamaterLContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.formalParameterList`.
	 * @param ctx the parse tree
	 */
	enterFormalParameterList?: (ctx: FormalParameterListContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.formalParameterList`.
	 * @param ctx the parse tree
	 */
	exitFormalParameterList?: (ctx: FormalParameterListContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.qualIdent`.
	 * @param ctx the parse tree
	 */
	enterQualIdent?: (ctx: QualIdentContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.qualIdent`.
	 * @param ctx the parse tree
	 */
	exitQualIdent?: (ctx: QualIdentContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.intType`.
	 * @param ctx the parse tree
	 */
	enterIntType?: (ctx: IntTypeContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.intType`.
	 * @param ctx the parse tree
	 */
	exitIntType?: (ctx: IntTypeContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.stringType`.
	 * @param ctx the parse tree
	 */
	enterStringType?: (ctx: StringTypeContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.stringType`.
	 * @param ctx the parse tree
	 */
	exitStringType?: (ctx: StringTypeContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.commaDelim`.
	 * @param ctx the parse tree
	 */
	enterCommaDelim?: (ctx: CommaDelimContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.commaDelim`.
	 * @param ctx the parse tree
	 */
	exitCommaDelim?: (ctx: CommaDelimContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.semiDelim`.
	 * @param ctx the parse tree
	 */
	enterSemiDelim?: (ctx: SemiDelimContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.semiDelim`.
	 * @param ctx the parse tree
	 */
	exitSemiDelim?: (ctx: SemiDelimContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.arrayExpr`.
	 * @param ctx the parse tree
	 */
	enterArrayExpr?: (ctx: ArrayExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.arrayExpr`.
	 * @param ctx the parse tree
	 */
	exitArrayExpr?: (ctx: ArrayExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structAssignment`.
	 * @param ctx the parse tree
	 */
	enterStructAssignment?: (ctx: StructAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structAssignment`.
	 * @param ctx the parse tree
	 */
	exitStructAssignment?: (ctx: StructAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.structExpr`.
	 * @param ctx the parse tree
	 */
	enterStructExpr?: (ctx: StructExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.structExpr`.
	 * @param ctx the parse tree
	 */
	exitStructExpr?: (ctx: StructExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.postAnnotation`.
	 * @param ctx the parse tree
	 */
	enterPostAnnotation?: (ctx: PostAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.postAnnotation`.
	 * @param ctx the parse tree
	 */
	exitPostAnnotation?: (ctx: PostAnnotationContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.postMultiAnnotation`.
	 * @param ctx the parse tree
	 */
	enterPostMultiAnnotation?: (ctx: PostMultiAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.postMultiAnnotation`.
	 * @param ctx the parse tree
	 */
	exitPostMultiAnnotation?: (ctx: PostMultiAnnotationContext) => void;

	/**
	 * Enter a parse tree produced by `FppParser.preAnnotation`.
	 * @param ctx the parse tree
	 */
	enterPreAnnotation?: (ctx: PreAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `FppParser.preAnnotation`.
	 * @param ctx the parse tree
	 */
	exitPreAnnotation?: (ctx: PreAnnotationContext) => void;
}

