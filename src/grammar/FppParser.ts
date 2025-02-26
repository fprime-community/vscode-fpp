// Generated from src/grammar/Fpp.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import FppVisitor from "./FppVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class FppParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly NL = 17;
	public static readonly WS = 18;
	public static readonly WS_NL = 19;
	public static readonly COMMENT = 20;
	public static readonly ANNOTATION = 21;
	public static readonly LIT_BOOLEAN = 22;
	public static readonly LIT_STRING = 23;
	public static readonly LIT_FLOAT = 24;
	public static readonly LIT_INT = 25;
	public static readonly F32 = 26;
	public static readonly F64 = 27;
	public static readonly I16 = 28;
	public static readonly I32 = 29;
	public static readonly I64 = 30;
	public static readonly I8 = 31;
	public static readonly U16 = 32;
	public static readonly U32 = 33;
	public static readonly U64 = 34;
	public static readonly U8 = 35;
	public static readonly ACTION = 36;
	public static readonly ACTIVE = 37;
	public static readonly ACTIVITY = 38;
	public static readonly ALWAYS = 39;
	public static readonly ARRAY = 40;
	public static readonly ASSERT = 41;
	public static readonly ASYNC = 42;
	public static readonly AT = 43;
	public static readonly BASE = 44;
	public static readonly BLOCK = 45;
	public static readonly BOOL = 46;
	public static readonly CHANGE = 47;
	public static readonly CHOICE = 48;
	public static readonly COMMAND = 49;
	public static readonly COMPONENT = 50;
	public static readonly CONNECTIONS = 51;
	public static readonly CONSTANT = 52;
	public static readonly CONTAINER = 53;
	public static readonly CPU = 54;
	public static readonly DEFAULT = 55;
	public static readonly DIAGNOSTIC = 56;
	public static readonly DO = 57;
	public static readonly DROP = 58;
	public static readonly ELSE = 59;
	public static readonly ENTER = 60;
	public static readonly ENTRY = 61;
	public static readonly ENUM = 62;
	public static readonly EVENT = 63;
	public static readonly EXIT = 64;
	public static readonly FALSE = 65;
	public static readonly FATAL = 66;
	public static readonly FORMAT = 67;
	public static readonly GET = 68;
	public static readonly GUARD = 69;
	public static readonly GUARDED = 70;
	public static readonly HEALTH = 71;
	public static readonly HIGH = 72;
	public static readonly HOOK = 73;
	public static readonly ID = 74;
	public static readonly IF = 75;
	public static readonly IMPORT = 76;
	public static readonly INCLUDE = 77;
	public static readonly INITIAL = 78;
	public static readonly INPUT = 79;
	public static readonly INSTANCE = 80;
	public static readonly INTERNAL = 81;
	public static readonly LOCATE = 82;
	public static readonly LOW = 83;
	public static readonly MACHINE = 84;
	public static readonly MATCH = 85;
	public static readonly MODULE = 86;
	public static readonly ON = 87;
	public static readonly OPCODE = 88;
	public static readonly ORANGE = 89;
	public static readonly OUTPUT = 90;
	public static readonly PARAM = 91;
	public static readonly PASSIVE = 92;
	public static readonly PHASE = 93;
	public static readonly PORT = 94;
	public static readonly PRIORITY = 95;
	public static readonly PRIVATE = 96;
	public static readonly PRODUCT = 97;
	public static readonly QUEUE = 98;
	public static readonly QUEUED = 99;
	public static readonly RECORD = 100;
	public static readonly RECV = 101;
	public static readonly RED = 102;
	public static readonly REF = 103;
	public static readonly REG = 104;
	public static readonly REQUEST = 105;
	public static readonly RESP = 106;
	public static readonly SAVE = 107;
	public static readonly SEND = 108;
	public static readonly SERIAL = 109;
	public static readonly SET = 110;
	public static readonly SEVERITY = 111;
	public static readonly SIGNAL = 112;
	public static readonly SIZE = 113;
	public static readonly STACK = 114;
	public static readonly STATE = 115;
	public static readonly STRING = 116;
	public static readonly STRUCT = 117;
	public static readonly SYNC = 118;
	public static readonly TELEMETRY = 119;
	public static readonly TEXT = 120;
	public static readonly THROTTLE = 121;
	public static readonly TIME = 122;
	public static readonly TOPOLOGY = 123;
	public static readonly TRUE = 124;
	public static readonly TYPE = 125;
	public static readonly UNMATCHED = 126;
	public static readonly UPDATE = 127;
	public static readonly WARNING = 128;
	public static readonly WITH = 129;
	public static readonly YELLOW = 130;
	public static readonly IDENTIFIER = 131;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_prog = 0;
	public static readonly RULE_progTopology = 1;
	public static readonly RULE_progComponent = 2;
	public static readonly RULE_abstractTypeDecl = 3;
	public static readonly RULE_aliasTypeDecl = 4;
	public static readonly RULE_arrayDecl = 5;
	public static readonly RULE_constantDecl = 6;
	public static readonly RULE_structMember = 7;
	public static readonly RULE_structMemberN = 8;
	public static readonly RULE_structMemberL = 9;
	public static readonly RULE_structDecl = 10;
	public static readonly RULE_queueFullBehavior = 11;
	public static readonly RULE_commandKind = 12;
	public static readonly RULE_commandDecl = 13;
	public static readonly RULE_paramDecl = 14;
	public static readonly RULE_generalPortKind = 15;
	public static readonly RULE_specialPortKind = 16;
	public static readonly RULE_generalPortInstanceType = 17;
	public static readonly RULE_generalPortInstanceDecl = 18;
	public static readonly RULE_specialPortInstanceDecl = 19;
	public static readonly RULE_telemetryLimitKind = 20;
	public static readonly RULE_telemetryLimitExpr = 21;
	public static readonly RULE_telemetryLimit = 22;
	public static readonly RULE_telemetryUpdate = 23;
	public static readonly RULE_telemetryChannelDecl = 24;
	public static readonly RULE_actionDef = 25;
	public static readonly RULE_choiceDef = 26;
	public static readonly RULE_guardDef = 27;
	public static readonly RULE_signalDef = 28;
	public static readonly RULE_doExpr = 29;
	public static readonly RULE_transitionExpr = 30;
	public static readonly RULE_initialTransition = 31;
	public static readonly RULE_transitionOrDoExpr = 32;
	public static readonly RULE_stateTransition = 33;
	public static readonly RULE_stateEntry = 34;
	public static readonly RULE_stateExit = 35;
	public static readonly RULE_stateMember = 36;
	public static readonly RULE_stateDef = 37;
	public static readonly RULE_stateMachineMemberTempl = 38;
	public static readonly RULE_stateMachineMember = 39;
	public static readonly RULE_stateMachineDef = 40;
	public static readonly RULE_stateMachineInstance = 41;
	public static readonly RULE_enumMember = 42;
	public static readonly RULE_enumMemberN = 43;
	public static readonly RULE_enumMemberL = 44;
	public static readonly RULE_enumDecl = 45;
	public static readonly RULE_eventSeverity = 46;
	public static readonly RULE_eventDecl = 47;
	public static readonly RULE_includeStmt = 48;
	public static readonly RULE_matchStmt = 49;
	public static readonly RULE_internalPortDecl = 50;
	public static readonly RULE_recordSpecifierDecl = 51;
	public static readonly RULE_containerSpecifierDecl = 52;
	public static readonly RULE_initSpecifier = 53;
	public static readonly RULE_componentInstanceDecl = 54;
	public static readonly RULE_componentKind = 55;
	public static readonly RULE_componentMember = 56;
	public static readonly RULE_componentDecl = 57;
	public static readonly RULE_portDecl = 58;
	public static readonly RULE_componentInstanceSpec = 59;
	public static readonly RULE_connectionNode = 60;
	public static readonly RULE_connection = 61;
	public static readonly RULE_directGraphDecl = 62;
	public static readonly RULE_patternKind = 63;
	public static readonly RULE_patternGraphSources = 64;
	public static readonly RULE_patternGraphStmt = 65;
	public static readonly RULE_topologyImportStmt = 66;
	public static readonly RULE_topologyMember = 67;
	public static readonly RULE_topologyDecl = 68;
	public static readonly RULE_locationKind = 69;
	public static readonly RULE_locationStmt = 70;
	public static readonly RULE_moduleMember = 71;
	public static readonly RULE_moduleDecl = 72;
	public static readonly RULE_formalParameter = 73;
	public static readonly RULE_formalParameterN = 74;
	public static readonly RULE_formalParamaterL = 75;
	public static readonly RULE_formalParameterList = 76;
	public static readonly RULE_qualIdent = 77;
	public static readonly RULE_intType = 78;
	public static readonly RULE_primitiveType = 79;
	public static readonly RULE_typeName = 80;
	public static readonly RULE_commaDelim = 81;
	public static readonly RULE_semiDelim = 82;
	public static readonly RULE_arrayExpr = 83;
	public static readonly RULE_structAssignment = 84;
	public static readonly RULE_structExpr = 85;
	public static readonly RULE_expr = 86;
	public static readonly literalNames: (string | null)[] = [ null, "'='", 
                                                            "'['", "']'", 
                                                            "':'", "','", 
                                                            "'{'", "'}'", 
                                                            "'->'", "'('", 
                                                            "')'", "'.'", 
                                                            "';'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "'+'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'F32'", "'F64'", 
                                                            "'I16'", "'I32'", 
                                                            "'I64'", "'I8'", 
                                                            "'U16'", "'U32'", 
                                                            "'U64'", "'U8'", 
                                                            "'action'", 
                                                            "'active'", 
                                                            "'activity'", 
                                                            "'always'", 
                                                            "'array'", "'assert'", 
                                                            "'async'", "'at'", 
                                                            "'base'", "'block'", 
                                                            "'bool'", "'change'", 
                                                            "'choice'", 
                                                            "'command'", 
                                                            "'component'", 
                                                            "'connections'", 
                                                            "'constant'", 
                                                            "'container'", 
                                                            "'cpu'", "'default'", 
                                                            "'diagnostic'", 
                                                            "'do'", "'drop'", 
                                                            "'else'", "'enter'", 
                                                            "'entry'", "'enum'", 
                                                            "'event'", "'exit'", 
                                                            "'false'", "'fatal'", 
                                                            "'format'", 
                                                            "'get'", "'guard'", 
                                                            "'guarded'", 
                                                            "'health'", 
                                                            "'high'", "'hook'", 
                                                            "'id'", "'if'", 
                                                            "'import'", 
                                                            "'include'", 
                                                            "'initial'", 
                                                            "'input'", "'instance'", 
                                                            "'internal'", 
                                                            "'locate'", 
                                                            "'low'", "'machine'", 
                                                            "'match'", "'module'", 
                                                            "'on'", "'opcode'", 
                                                            "'orange'", 
                                                            "'output'", 
                                                            "'param'", "'passive'", 
                                                            "'phase'", "'port'", 
                                                            "'priority'", 
                                                            "'private'", 
                                                            "'product'", 
                                                            "'queue'", "'queued'", 
                                                            "'record'", 
                                                            "'recv'", "'red'", 
                                                            "'ref'", "'reg'", 
                                                            "'request'", 
                                                            "'resp'", "'save'", 
                                                            "'send'", "'serial'", 
                                                            "'set'", "'severity'", 
                                                            "'signal'", 
                                                            "'size'", "'stack'", 
                                                            "'state'", "'string'", 
                                                            "'struct'", 
                                                            "'sync'", "'telemetry'", 
                                                            "'text'", "'throttle'", 
                                                            "'time'", "'topology'", 
                                                            "'true'", "'type'", 
                                                            "'unmatched'", 
                                                            "'update'", 
                                                            "'warning'", 
                                                            "'with'", "'yellow'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NL", 
                                                             "WS", "WS_NL", 
                                                             "COMMENT", 
                                                             "ANNOTATION", 
                                                             "LIT_BOOLEAN", 
                                                             "LIT_STRING", 
                                                             "LIT_FLOAT", 
                                                             "LIT_INT", 
                                                             "F32", "F64", 
                                                             "I16", "I32", 
                                                             "I64", "I8", 
                                                             "U16", "U32", 
                                                             "U64", "U8", 
                                                             "ACTION", "ACTIVE", 
                                                             "ACTIVITY", 
                                                             "ALWAYS", "ARRAY", 
                                                             "ASSERT", "ASYNC", 
                                                             "AT", "BASE", 
                                                             "BLOCK", "BOOL", 
                                                             "CHANGE", "CHOICE", 
                                                             "COMMAND", 
                                                             "COMPONENT", 
                                                             "CONNECTIONS", 
                                                             "CONSTANT", 
                                                             "CONTAINER", 
                                                             "CPU", "DEFAULT", 
                                                             "DIAGNOSTIC", 
                                                             "DO", "DROP", 
                                                             "ELSE", "ENTER", 
                                                             "ENTRY", "ENUM", 
                                                             "EVENT", "EXIT", 
                                                             "FALSE", "FATAL", 
                                                             "FORMAT", "GET", 
                                                             "GUARD", "GUARDED", 
                                                             "HEALTH", "HIGH", 
                                                             "HOOK", "ID", 
                                                             "IF", "IMPORT", 
                                                             "INCLUDE", 
                                                             "INITIAL", 
                                                             "INPUT", "INSTANCE", 
                                                             "INTERNAL", 
                                                             "LOCATE", "LOW", 
                                                             "MACHINE", 
                                                             "MATCH", "MODULE", 
                                                             "ON", "OPCODE", 
                                                             "ORANGE", "OUTPUT", 
                                                             "PARAM", "PASSIVE", 
                                                             "PHASE", "PORT", 
                                                             "PRIORITY", 
                                                             "PRIVATE", 
                                                             "PRODUCT", 
                                                             "QUEUE", "QUEUED", 
                                                             "RECORD", "RECV", 
                                                             "RED", "REF", 
                                                             "REG", "REQUEST", 
                                                             "RESP", "SAVE", 
                                                             "SEND", "SERIAL", 
                                                             "SET", "SEVERITY", 
                                                             "SIGNAL", "SIZE", 
                                                             "STACK", "STATE", 
                                                             "STRING", "STRUCT", 
                                                             "SYNC", "TELEMETRY", 
                                                             "TEXT", "THROTTLE", 
                                                             "TIME", "TOPOLOGY", 
                                                             "TRUE", "TYPE", 
                                                             "UNMATCHED", 
                                                             "UPDATE", "WARNING", 
                                                             "WITH", "YELLOW", 
                                                             "IDENTIFIER" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "progTopology", "progComponent", "abstractTypeDecl", "aliasTypeDecl", 
		"arrayDecl", "constantDecl", "structMember", "structMemberN", "structMemberL", 
		"structDecl", "queueFullBehavior", "commandKind", "commandDecl", "paramDecl", 
		"generalPortKind", "specialPortKind", "generalPortInstanceType", "generalPortInstanceDecl", 
		"specialPortInstanceDecl", "telemetryLimitKind", "telemetryLimitExpr", 
		"telemetryLimit", "telemetryUpdate", "telemetryChannelDecl", "actionDef", 
		"choiceDef", "guardDef", "signalDef", "doExpr", "transitionExpr", "initialTransition", 
		"transitionOrDoExpr", "stateTransition", "stateEntry", "stateExit", "stateMember", 
		"stateDef", "stateMachineMemberTempl", "stateMachineMember", "stateMachineDef", 
		"stateMachineInstance", "enumMember", "enumMemberN", "enumMemberL", "enumDecl", 
		"eventSeverity", "eventDecl", "includeStmt", "matchStmt", "internalPortDecl", 
		"recordSpecifierDecl", "containerSpecifierDecl", "initSpecifier", "componentInstanceDecl", 
		"componentKind", "componentMember", "componentDecl", "portDecl", "componentInstanceSpec", 
		"connectionNode", "connection", "directGraphDecl", "patternKind", "patternGraphSources", 
		"patternGraphStmt", "topologyImportStmt", "topologyMember", "topologyDecl", 
		"locationKind", "locationStmt", "moduleMember", "moduleDecl", "formalParameter", 
		"formalParameterN", "formalParamaterL", "formalParameterList", "qualIdent", 
		"intType", "primitiveType", "typeName", "commaDelim", "semiDelim", "arrayExpr", 
		"structAssignment", "structExpr", "expr",
	];
	public get grammarFileName(): string { return "Fpp.g4"; }
	public get literalNames(): (string | null)[] { return FppParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return FppParser.symbolicNames; }
	public get ruleNames(): string[] { return FppParser.ruleNames; }
	public get serializedATN(): number[] { return FppParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, FppParser._ATN, FppParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let localctx: ProgContext = new ProgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, FppParser.RULE_prog);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 177;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 174;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 179;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 187;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 33587209) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 4358697) !== 0) || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 1285) !== 0)) {
				{
				{
				this.state = 180;
				this.moduleMember();
				this.state = 183;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 12:
				case 17:
					{
					this.state = 181;
					this.semiDelim();
					}
					break;
				case -1:
					{
					this.state = 182;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 193;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 190;
				this.match(FppParser.NL);
				}
				}
				this.state = 195;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 196;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public progTopology(): ProgTopologyContext {
		let localctx: ProgTopologyContext = new ProgTopologyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, FppParser.RULE_progTopology);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 201;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 198;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 203;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 211;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 2554347525) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 2952790049) !== 0)) {
				{
				{
				this.state = 204;
				this.topologyMember();
				this.state = 207;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 12:
				case 17:
					{
					this.state = 205;
					this.semiDelim();
					}
					break;
				case -1:
					{
					this.state = 206;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 213;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 214;
				this.match(FppParser.NL);
				}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 220;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public progComponent(): ProgComponentContext {
		let localctx: ProgComponentContext = new ProgComponentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, FppParser.RULE_progComponent);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 225;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 222;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 227;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
			}
			this.state = 235;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 1086329349) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 1073425) !== 0) || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 1213) !== 0)) {
				{
				{
				this.state = 228;
				this.componentMember();
				this.state = 231;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 12:
				case 17:
					{
					this.state = 229;
					this.semiDelim();
					}
					break;
				case -1:
					{
					this.state = 230;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 237;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 238;
				this.match(FppParser.NL);
				}
				}
				this.state = 243;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 244;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public abstractTypeDecl(): AbstractTypeDeclContext {
		let localctx: AbstractTypeDeclContext = new AbstractTypeDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, FppParser.RULE_abstractTypeDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 246;
			this.match(FppParser.TYPE);
			this.state = 247;
			localctx._name = this.match(FppParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public aliasTypeDecl(): AliasTypeDeclContext {
		let localctx: AliasTypeDeclContext = new AliasTypeDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, FppParser.RULE_aliasTypeDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 249;
			this.match(FppParser.TYPE);
			this.state = 250;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 251;
			this.match(FppParser.T__0);
			this.state = 252;
			localctx._type_ = this.typeName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayDecl(): ArrayDeclContext {
		let localctx: ArrayDeclContext = new ArrayDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, FppParser.RULE_arrayDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 254;
			this.match(FppParser.ARRAY);
			this.state = 255;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 256;
			this.match(FppParser.T__0);
			this.state = 257;
			this.match(FppParser.T__1);
			this.state = 258;
			localctx._size = this.expr(0);
			this.state = 259;
			this.match(FppParser.T__2);
			this.state = 260;
			localctx._type_ = this.typeName();
			this.state = 263;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 261;
				this.match(FppParser.DEFAULT);
				this.state = 262;
				localctx._default_ = this.expr(0);
				}
			}

			this.state = 267;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===67) {
				{
				this.state = 265;
				this.match(FppParser.FORMAT);
				this.state = 266;
				localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constantDecl(): ConstantDeclContext {
		let localctx: ConstantDeclContext = new ConstantDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, FppParser.RULE_constantDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
			this.match(FppParser.CONSTANT);
			this.state = 270;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 271;
			this.match(FppParser.T__0);
			this.state = 272;
			localctx._value = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structMember(): StructMemberContext {
		let localctx: StructMemberContext = new StructMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, FppParser.RULE_structMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 274;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 275;
			this.match(FppParser.T__3);
			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 276;
				this.match(FppParser.T__1);
				this.state = 277;
				localctx._size = this.expr(0);
				this.state = 278;
				this.match(FppParser.T__2);
				}
			}

			this.state = 282;
			localctx._type_ = this.typeName();
			this.state = 285;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===67) {
				{
				this.state = 283;
				this.match(FppParser.FORMAT);
				this.state = 284;
				localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structMemberN(): StructMemberNContext {
		let localctx: StructMemberNContext = new StructMemberNContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, FppParser.RULE_structMemberN);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
			this.structMember();
			{
			this.state = 289;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				{
				this.state = 288;
				this.match(FppParser.T__4);
				}
				break;
			}
			this.state = 291;
			this.commaDelim();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structMemberL(): StructMemberLContext {
		let localctx: StructMemberLContext = new StructMemberLContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, FppParser.RULE_structMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 293;
			this.structMember();
			this.state = 298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5 || _la===17) {
				{
				this.state = 295;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
				case 1:
					{
					this.state = 294;
					this.match(FppParser.T__4);
					}
					break;
				}
				this.state = 297;
				this.commaDelim();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structDecl(): StructDeclContext {
		let localctx: StructDeclContext = new StructDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, FppParser.RULE_structDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 300;
			this.match(FppParser.STRUCT);
			this.state = 301;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 302;
			this.match(FppParser.T__5);
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 303;
				this.match(FppParser.NL);
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===131) {
				{
				this.state = 312;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 309;
						this.structMemberN();
						}
						}
					}
					this.state = 314;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
				}
				this.state = 315;
				this.structMemberL();
				}
			}

			this.state = 318;
			this.match(FppParser.T__6);
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 319;
				this.match(FppParser.DEFAULT);
				this.state = 320;
				localctx._default_ = this.structExpr();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public queueFullBehavior(): QueueFullBehaviorContext {
		let localctx: QueueFullBehaviorContext = new QueueFullBehaviorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, FppParser.RULE_queueFullBehavior);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 323;
			_la = this._input.LA(1);
			if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commandKind(): CommandKindContext {
		let localctx: CommandKindContext = new CommandKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, FppParser.RULE_commandKind);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
			_la = this._input.LA(1);
			if(!(_la===42 || _la===70 || _la===118)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commandDecl(): CommandDeclContext {
		let localctx: CommandDeclContext = new CommandDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, FppParser.RULE_commandDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 327;
			localctx._kind = this.commandKind();
			this.state = 328;
			this.match(FppParser.COMMAND);
			this.state = 329;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 330;
				localctx._params = this.formalParameterList();
				}
			}

			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===88) {
				{
				this.state = 333;
				this.match(FppParser.OPCODE);
				this.state = 334;
				localctx._opcode = this.expr(0);
				}
			}

			this.state = 339;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 337;
				this.match(FppParser.PRIORITY);
				this.state = 338;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0)) {
				{
				this.state = 341;
				localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public paramDecl(): ParamDeclContext {
		let localctx: ParamDeclContext = new ParamDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, FppParser.RULE_paramDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 344;
			this.match(FppParser.PARAM);
			this.state = 345;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 346;
			this.match(FppParser.T__3);
			this.state = 347;
			localctx._type_ = this.typeName();
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 348;
				this.match(FppParser.DEFAULT);
				this.state = 349;
				localctx._default_ = this.expr(0);
				}
			}

			this.state = 354;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 352;
				this.match(FppParser.ID);
				this.state = 353;
				localctx._id = this.expr(0);
				}
			}

			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===110) {
				{
				this.state = 356;
				this.match(FppParser.SET);
				this.state = 357;
				this.match(FppParser.OPCODE);
				this.state = 358;
				localctx._setOpcode = this.expr(0);
				}
			}

			this.state = 364;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===107) {
				{
				this.state = 361;
				this.match(FppParser.SAVE);
				this.state = 362;
				this.match(FppParser.OPCODE);
				this.state = 363;
				localctx._saveOpcode = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public generalPortKind(): GeneralPortKindContext {
		let localctx: GeneralPortKindContext = new GeneralPortKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, FppParser.RULE_generalPortKind);
		try {
			this.state = 373;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 42:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 366;
				this.match(FppParser.ASYNC);
				this.state = 367;
				this.match(FppParser.INPUT);
				}
				break;
			case 70:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 368;
				this.match(FppParser.GUARDED);
				this.state = 369;
				this.match(FppParser.INPUT);
				}
				break;
			case 118:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 370;
				this.match(FppParser.SYNC);
				this.state = 371;
				this.match(FppParser.INPUT);
				}
				break;
			case 90:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 372;
				this.match(FppParser.OUTPUT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public specialPortKind(): SpecialPortKindContext {
		let localctx: SpecialPortKindContext = new SpecialPortKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, FppParser.RULE_specialPortKind);
		let _la: number;
		try {
			this.state = 402;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 375;
				this.match(FppParser.COMMAND);
				this.state = 376;
				this.match(FppParser.RECV);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 377;
				this.match(FppParser.COMMAND);
				this.state = 378;
				this.match(FppParser.REG);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 379;
				this.match(FppParser.COMMAND);
				this.state = 380;
				this.match(FppParser.RESP);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 381;
				this.match(FppParser.EVENT);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 382;
				this.match(FppParser.PARAM);
				this.state = 383;
				this.match(FppParser.GET);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 384;
				this.match(FppParser.PARAM);
				this.state = 385;
				this.match(FppParser.SET);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 386;
				this.match(FppParser.TELEMETRY);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 387;
				this.match(FppParser.TEXT);
				this.state = 388;
				this.match(FppParser.EVENT);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 389;
				this.match(FppParser.TIME);
				this.state = 390;
				this.match(FppParser.GET);
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 391;
				this.match(FppParser.PRODUCT);
				this.state = 392;
				this.match(FppParser.GET);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 393;
				this.match(FppParser.PRODUCT);
				this.state = 394;
				this.match(FppParser.REQUEST);
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===42) {
					{
					this.state = 395;
					this.match(FppParser.ASYNC);
					}
				}

				this.state = 398;
				this.match(FppParser.PRODUCT);
				this.state = 399;
				this.match(FppParser.RECV);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 400;
				this.match(FppParser.PRODUCT);
				this.state = 401;
				this.match(FppParser.SEND);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public generalPortInstanceType(): GeneralPortInstanceTypeContext {
		let localctx: GeneralPortInstanceTypeContext = new GeneralPortInstanceTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, FppParser.RULE_generalPortInstanceType);
		try {
			this.state = 406;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 109:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 404;
				this.match(FppParser.SERIAL);
				}
				break;
			case 131:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 405;
				this.qualIdent();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public generalPortInstanceDecl(): GeneralPortInstanceDeclContext {
		let localctx: GeneralPortInstanceDeclContext = new GeneralPortInstanceDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, FppParser.RULE_generalPortInstanceDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 408;
			localctx._kind = this.generalPortKind();
			this.state = 409;
			this.match(FppParser.PORT);
			this.state = 410;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 411;
			this.match(FppParser.T__3);
			this.state = 416;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 412;
				this.match(FppParser.T__1);
				this.state = 413;
				localctx._n = this.expr(0);
				this.state = 414;
				this.match(FppParser.T__2);
				}
			}

			this.state = 418;
			localctx._type_ = this.generalPortInstanceType();
			this.state = 421;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 419;
				this.match(FppParser.PRIORITY);
				this.state = 420;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 424;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0)) {
				{
				this.state = 423;
				localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public specialPortInstanceDecl(): SpecialPortInstanceDeclContext {
		let localctx: SpecialPortInstanceDeclContext = new SpecialPortInstanceDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, FppParser.RULE_specialPortInstanceDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 426;
			this.specialPortKind();
			this.state = 427;
			this.match(FppParser.PORT);
			this.state = 428;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 431;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 429;
				this.match(FppParser.PRIORITY);
				this.state = 430;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 434;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0)) {
				{
				this.state = 433;
				localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public telemetryLimitKind(): TelemetryLimitKindContext {
		let localctx: TelemetryLimitKindContext = new TelemetryLimitKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, FppParser.RULE_telemetryLimitKind);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			_la = this._input.LA(1);
			if(!(_la===89 || _la===102 || _la===130)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public telemetryLimitExpr(): TelemetryLimitExprContext {
		let localctx: TelemetryLimitExprContext = new TelemetryLimitExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, FppParser.RULE_telemetryLimitExpr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 438;
			localctx._kind = this.telemetryLimitKind();
			this.state = 439;
			localctx._limit = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public telemetryLimit(): TelemetryLimitContext {
		let localctx: TelemetryLimitContext = new TelemetryLimitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, FppParser.RULE_telemetryLimit);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 441;
			this.match(FppParser.T__5);
			this.state = 445;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 442;
				this.match(FppParser.NL);
				}
				}
				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 460;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===89 || _la===102 || _la===130) {
				{
				this.state = 448;
				this.telemetryLimitExpr();
				this.state = 454;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 449;
						this.commaDelim();
						this.state = 450;
						this.telemetryLimitExpr();
						}
						}
					}
					this.state = 456;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
				}
				this.state = 458;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5 || _la===17) {
					{
					this.state = 457;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 462;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public telemetryUpdate(): TelemetryUpdateContext {
		let localctx: TelemetryUpdateContext = new TelemetryUpdateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, FppParser.RULE_telemetryUpdate);
		try {
			this.state = 467;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 39:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 464;
				this.match(FppParser.ALWAYS);
				}
				break;
			case 87:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 465;
				this.match(FppParser.ON);
				this.state = 466;
				this.match(FppParser.CHANGE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public telemetryChannelDecl(): TelemetryChannelDeclContext {
		let localctx: TelemetryChannelDeclContext = new TelemetryChannelDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, FppParser.RULE_telemetryChannelDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 469;
			this.match(FppParser.TELEMETRY);
			this.state = 470;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 471;
			this.match(FppParser.T__3);
			this.state = 472;
			localctx._type_ = this.typeName();
			this.state = 475;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 473;
				this.match(FppParser.ID);
				this.state = 474;
				localctx._id = this.expr(0);
				}
			}

			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===127) {
				{
				this.state = 477;
				this.match(FppParser.UPDATE);
				this.state = 478;
				localctx._update = this.telemetryUpdate();
				}
			}

			this.state = 483;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===67) {
				{
				this.state = 481;
				this.match(FppParser.FORMAT);
				this.state = 482;
				localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 487;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===83) {
				{
				this.state = 485;
				this.match(FppParser.LOW);
				this.state = 486;
				localctx._low = this.telemetryLimit();
				}
			}

			this.state = 491;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===72) {
				{
				this.state = 489;
				this.match(FppParser.HIGH);
				this.state = 490;
				localctx._high = this.telemetryLimit();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public actionDef(): ActionDefContext {
		let localctx: ActionDefContext = new ActionDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, FppParser.RULE_actionDef);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 493;
			this.match(FppParser.ACTION);
			this.state = 494;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 497;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 495;
				this.match(FppParser.T__3);
				this.state = 496;
				localctx._type_ = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public choiceDef(): ChoiceDefContext {
		let localctx: ChoiceDefContext = new ChoiceDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, FppParser.RULE_choiceDef);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 499;
			this.match(FppParser.CHOICE);
			this.state = 500;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 501;
			this.match(FppParser.T__5);
			this.state = 502;
			this.match(FppParser.IF);
			this.state = 503;
			localctx._guard = this.match(FppParser.IDENTIFIER);
			this.state = 504;
			localctx._then = this.transitionExpr();
			this.state = 505;
			this.match(FppParser.ELSE);
			this.state = 506;
			localctx._else_ = this.transitionExpr();
			this.state = 507;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public guardDef(): GuardDefContext {
		let localctx: GuardDefContext = new GuardDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, FppParser.RULE_guardDef);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 509;
			this.match(FppParser.GUARD);
			this.state = 510;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 513;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 511;
				this.match(FppParser.T__3);
				this.state = 512;
				localctx._type_ = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public signalDef(): SignalDefContext {
		let localctx: SignalDefContext = new SignalDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, FppParser.RULE_signalDef);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 515;
			this.match(FppParser.SIGNAL);
			this.state = 516;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 517;
				this.match(FppParser.T__3);
				this.state = 518;
				localctx._type_ = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public doExpr(): DoExprContext {
		let localctx: DoExprContext = new DoExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, FppParser.RULE_doExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 521;
			this.match(FppParser.DO);
			this.state = 522;
			this.match(FppParser.T__5);
			this.state = 526;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 523;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 528;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
			}
			this.state = 538;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===131) {
				{
				this.state = 529;
				this.match(FppParser.IDENTIFIER);
				this.state = 535;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 530;
						this.commaDelim();
						this.state = 531;
						this.match(FppParser.IDENTIFIER);
						}
						}
					}
					this.state = 537;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
				}
				}
			}

			this.state = 541;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5 || _la===17) {
				{
				this.state = 540;
				this.commaDelim();
				}
			}

			this.state = 543;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public transitionExpr(): TransitionExprContext {
		let localctx: TransitionExprContext = new TransitionExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, FppParser.RULE_transitionExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===57) {
				{
				this.state = 545;
				localctx._do_ = this.doExpr();
				}
			}

			this.state = 548;
			this.match(FppParser.ENTER);
			this.state = 549;
			localctx._state_ = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initialTransition(): InitialTransitionContext {
		let localctx: InitialTransitionContext = new InitialTransitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, FppParser.RULE_initialTransition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 551;
			this.match(FppParser.INITIAL);
			this.state = 552;
			localctx._transition = this.transitionExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public transitionOrDoExpr(): TransitionOrDoExprContext {
		let localctx: TransitionOrDoExprContext = new TransitionOrDoExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, FppParser.RULE_transitionOrDoExpr);
		try {
			this.state = 556;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 554;
				this.transitionExpr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 555;
				this.doExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateTransition(): StateTransitionContext {
		let localctx: StateTransitionContext = new StateTransitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, FppParser.RULE_stateTransition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 558;
			this.match(FppParser.ON);
			this.state = 559;
			localctx._signal = this.match(FppParser.IDENTIFIER);
			this.state = 562;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75) {
				{
				this.state = 560;
				this.match(FppParser.IF);
				this.state = 561;
				localctx._guard = this.match(FppParser.IDENTIFIER);
				}
			}

			this.state = 564;
			localctx._transition = this.transitionOrDoExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateEntry(): StateEntryContext {
		let localctx: StateEntryContext = new StateEntryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, FppParser.RULE_stateEntry);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 566;
			this.match(FppParser.ENTRY);
			this.state = 567;
			localctx._do_ = this.doExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateExit(): StateExitContext {
		let localctx: StateExitContext = new StateExitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, FppParser.RULE_stateExit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 569;
			this.match(FppParser.EXIT);
			this.state = 570;
			localctx._do_ = this.doExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateMember(): StateMemberContext {
		let localctx: StateMemberContext = new StateMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, FppParser.RULE_stateMember);
		try {
			this.state = 578;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 78:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 572;
				this.initialTransition();
				}
				break;
			case 48:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 573;
				this.choiceDef();
				}
				break;
			case 115:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 574;
				this.stateDef();
				}
				break;
			case 87:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 575;
				this.stateTransition();
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 576;
				this.stateEntry();
				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 577;
				this.stateExit();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateDef(): StateDefContext {
		let localctx: StateDefContext = new StateDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, FppParser.RULE_stateDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 580;
			this.match(FppParser.STATE);
			this.state = 581;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 604;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 582;
				this.match(FppParser.T__5);
				this.state = 586;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 583;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 588;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
				}
				this.state = 594;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 1073815553) !== 0) || _la===87 || _la===115) {
					{
					{
					this.state = 589;
					this.stateMember();
					this.state = 590;
					this.semiDelim();
					}
					}
					this.state = 596;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 600;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 597;
					this.match(FppParser.NL);
					}
					}
					this.state = 602;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 603;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateMachineMemberTempl(): StateMachineMemberTemplContext {
		let localctx: StateMachineMemberTemplContext = new StateMachineMemberTemplContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, FppParser.RULE_stateMachineMemberTempl);
		try {
			this.state = 612;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 606;
				this.choiceDef();
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 607;
				this.guardDef();
				}
				break;
			case 78:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 608;
				this.initialTransition();
				}
				break;
			case 112:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 609;
				this.signalDef();
				}
				break;
			case 115:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 610;
				this.stateDef();
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 611;
				this.actionDef();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateMachineMember(): StateMachineMemberContext {
		let localctx: StateMachineMemberContext = new StateMachineMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, FppParser.RULE_stateMachineMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 614;
			this.stateMachineMemberTempl();
			this.state = 616;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===21) {
				{
				this.state = 615;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateMachineDef(): StateMachineDefContext {
		let localctx: StateMachineDefContext = new StateMachineDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, FppParser.RULE_stateMachineDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 618;
			this.match(FppParser.STATE);
			this.state = 619;
			this.match(FppParser.MACHINE);
			this.state = 620;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 643;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 621;
				this.match(FppParser.T__5);
				this.state = 625;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 67, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 622;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 627;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 67, this._ctx);
				}
				this.state = 633;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===36 || _la===48 || _la===69 || _la===78 || _la===112 || _la===115) {
					{
					{
					this.state = 628;
					this.stateMachineMember();
					this.state = 629;
					this.semiDelim();
					}
					}
					this.state = 635;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 639;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 636;
					this.match(FppParser.NL);
					}
					}
					this.state = 641;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 642;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stateMachineInstance(): StateMachineInstanceContext {
		let localctx: StateMachineInstanceContext = new StateMachineInstanceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, FppParser.RULE_stateMachineInstance);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 645;
			this.match(FppParser.STATE);
			this.state = 646;
			this.match(FppParser.MACHINE);
			this.state = 647;
			this.match(FppParser.INSTANCE);
			this.state = 648;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 649;
			this.match(FppParser.T__3);
			this.state = 650;
			localctx._stateMachine = this.qualIdent();
			this.state = 653;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 651;
				this.match(FppParser.PRIORITY);
				this.state = 652;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 656;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0)) {
				{
				this.state = 655;
				localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumMember(): EnumMemberContext {
		let localctx: EnumMemberContext = new EnumMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, FppParser.RULE_enumMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 658;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 661;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 659;
				this.match(FppParser.T__0);
				this.state = 660;
				localctx._value = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumMemberN(): EnumMemberNContext {
		let localctx: EnumMemberNContext = new EnumMemberNContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, FppParser.RULE_enumMemberN);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 663;
			this.enumMember();
			{
			this.state = 665;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				{
				this.state = 664;
				this.match(FppParser.T__4);
				}
				break;
			}
			this.state = 667;
			this.commaDelim();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumMemberL(): EnumMemberLContext {
		let localctx: EnumMemberLContext = new EnumMemberLContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, FppParser.RULE_enumMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 669;
			this.enumMember();
			this.state = 674;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5 || _la===17) {
				{
				this.state = 671;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 75, this._ctx) ) {
				case 1:
					{
					this.state = 670;
					this.match(FppParser.T__4);
					}
					break;
				}
				this.state = 673;
				this.commaDelim();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumDecl(): EnumDeclContext {
		let localctx: EnumDeclContext = new EnumDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, FppParser.RULE_enumDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 676;
			this.match(FppParser.ENUM);
			this.state = 677;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 680;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 678;
				this.match(FppParser.T__3);
				this.state = 679;
				localctx._type_ = this.intType();
				}
			}

			this.state = 682;
			this.match(FppParser.T__5);
			this.state = 686;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 683;
				this.match(FppParser.NL);
				}
				}
				this.state = 688;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 696;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===131) {
				{
				this.state = 692;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 79, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 689;
						this.enumMemberN();
						}
						}
					}
					this.state = 694;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 79, this._ctx);
				}
				this.state = 695;
				this.enumMemberL();
				}
			}

			this.state = 698;
			this.match(FppParser.T__6);
			this.state = 701;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 699;
				this.match(FppParser.DEFAULT);
				this.state = 700;
				localctx._default_ = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eventSeverity(): EventSeverityContext {
		let localctx: EventSeverityContext = new EventSeverityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, FppParser.RULE_eventSeverity);
		try {
			this.state = 714;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 82, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 703;
				this.match(FppParser.ACTIVITY);
				this.state = 704;
				this.match(FppParser.HIGH);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 705;
				this.match(FppParser.ACTIVITY);
				this.state = 706;
				this.match(FppParser.LOW);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 707;
				this.match(FppParser.COMMAND);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 708;
				this.match(FppParser.DIAGNOSTIC);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 709;
				this.match(FppParser.FATAL);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 710;
				this.match(FppParser.WARNING);
				this.state = 711;
				this.match(FppParser.HIGH);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 712;
				this.match(FppParser.WARNING);
				this.state = 713;
				this.match(FppParser.LOW);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eventDecl(): EventDeclContext {
		let localctx: EventDeclContext = new EventDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, FppParser.RULE_eventDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 716;
			this.match(FppParser.EVENT);
			this.state = 717;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 719;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 718;
				localctx._params = this.formalParameterList();
				}
			}

			this.state = 721;
			this.match(FppParser.SEVERITY);
			this.state = 722;
			this.eventSeverity();
			this.state = 725;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 723;
				this.match(FppParser.ID);
				this.state = 724;
				localctx._id = this.expr(0);
				}
			}

			this.state = 727;
			this.match(FppParser.FORMAT);
			this.state = 728;
			localctx._format = this.match(FppParser.LIT_STRING);
			this.state = 731;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===121) {
				{
				this.state = 729;
				this.match(FppParser.THROTTLE);
				this.state = 730;
				localctx._throttle = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public includeStmt(): IncludeStmtContext {
		let localctx: IncludeStmtContext = new IncludeStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, FppParser.RULE_includeStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 733;
			this.match(FppParser.INCLUDE);
			this.state = 734;
			localctx._include = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public matchStmt(): MatchStmtContext {
		let localctx: MatchStmtContext = new MatchStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, FppParser.RULE_matchStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 736;
			this.match(FppParser.MATCH);
			this.state = 737;
			localctx._match = this.match(FppParser.IDENTIFIER);
			this.state = 738;
			this.match(FppParser.WITH);
			this.state = 739;
			localctx._with_ = this.match(FppParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public internalPortDecl(): InternalPortDeclContext {
		let localctx: InternalPortDeclContext = new InternalPortDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, FppParser.RULE_internalPortDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 741;
			this.match(FppParser.INTERNAL);
			this.state = 742;
			this.match(FppParser.PORT);
			this.state = 743;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 745;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 744;
				localctx._params = this.formalParameterList();
				}
			}

			this.state = 749;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 747;
				this.match(FppParser.PRIORITY);
				this.state = 748;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 752;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 131089) !== 0)) {
				{
				this.state = 751;
				localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public recordSpecifierDecl(): RecordSpecifierDeclContext {
		let localctx: RecordSpecifierDeclContext = new RecordSpecifierDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, FppParser.RULE_recordSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 754;
			this.match(FppParser.PRODUCT);
			this.state = 755;
			this.match(FppParser.RECORD);
			this.state = 756;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 757;
			this.match(FppParser.T__3);
			this.state = 758;
			localctx._fppType = this.typeName();
			this.state = 760;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 759;
				this.match(FppParser.ARRAY);
				}
			}

			this.state = 764;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 762;
				this.match(FppParser.ID);
				this.state = 763;
				localctx._id = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public containerSpecifierDecl(): ContainerSpecifierDeclContext {
		let localctx: ContainerSpecifierDeclContext = new ContainerSpecifierDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, FppParser.RULE_containerSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 766;
			this.match(FppParser.PRODUCT);
			this.state = 767;
			this.match(FppParser.CONTAINER);
			this.state = 768;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 771;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 769;
				this.match(FppParser.ID);
				this.state = 770;
				localctx._id = this.expr(0);
				}
			}

			this.state = 776;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 773;
				this.match(FppParser.DEFAULT);
				this.state = 774;
				this.match(FppParser.PRIORITY);
				this.state = 775;
				localctx._priority = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initSpecifier(): InitSpecifierContext {
		let localctx: InitSpecifierContext = new InitSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, FppParser.RULE_initSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 778;
			this.match(FppParser.PHASE);
			this.state = 779;
			localctx._phaseExpr = this.expr(0);
			this.state = 780;
			localctx._code = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public componentInstanceDecl(): ComponentInstanceDeclContext {
		let localctx: ComponentInstanceDeclContext = new ComponentInstanceDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, FppParser.RULE_componentInstanceDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 782;
			this.match(FppParser.INSTANCE);
			this.state = 783;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 784;
			this.match(FppParser.T__3);
			this.state = 785;
			localctx._fppType = this.qualIdent();
			this.state = 786;
			this.match(FppParser.BASE);
			this.state = 787;
			this.match(FppParser.ID);
			this.state = 788;
			localctx._base_id = this.expr(0);
			this.state = 791;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===125) {
				{
				this.state = 789;
				this.match(FppParser.TYPE);
				this.state = 790;
				localctx._cppType = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 795;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 793;
				this.match(FppParser.AT);
				this.state = 794;
				localctx._at = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 800;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===98) {
				{
				this.state = 797;
				this.match(FppParser.QUEUE);
				this.state = 798;
				this.match(FppParser.SIZE);
				this.state = 799;
				localctx._queueSize = this.expr(0);
				}
			}

			this.state = 805;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===114) {
				{
				this.state = 802;
				this.match(FppParser.STACK);
				this.state = 803;
				this.match(FppParser.SIZE);
				this.state = 804;
				localctx._stackSize = this.expr(0);
				}
			}

			this.state = 809;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===95) {
				{
				this.state = 807;
				this.match(FppParser.PRIORITY);
				this.state = 808;
				localctx._priority = this.expr(0);
				}
			}

			this.state = 813;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===54) {
				{
				this.state = 811;
				this.match(FppParser.CPU);
				this.state = 812;
				localctx._cpu = this.expr(0);
				}
			}

			this.state = 837;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 815;
				this.match(FppParser.T__5);
				this.state = 819;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 99, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 816;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 821;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 99, this._ctx);
				}
				this.state = 827;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===93) {
					{
					{
					this.state = 822;
					this.initSpecifier();
					this.state = 823;
					this.semiDelim();
					}
					}
					this.state = 829;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 833;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 830;
					this.match(FppParser.NL);
					}
					}
					this.state = 835;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 836;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public componentKind(): ComponentKindContext {
		let localctx: ComponentKindContext = new ComponentKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, FppParser.RULE_componentKind);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 839;
			_la = this._input.LA(1);
			if(!(_la===37 || _la===92 || _la===99)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public componentMember(): ComponentMemberContext {
		let localctx: ComponentMemberContext = new ComponentMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, FppParser.RULE_componentMember);
		try {
			this.state = 860;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 103, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 841;
				this.abstractTypeDecl();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 842;
				this.aliasTypeDecl();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 843;
				this.arrayDecl();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 844;
				this.constantDecl();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 845;
				this.structDecl();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 846;
				this.commandDecl();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 847;
				this.paramDecl();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 848;
				this.generalPortInstanceDecl();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 849;
				this.specialPortInstanceDecl();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 850;
				this.telemetryChannelDecl();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 851;
				this.enumDecl();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 852;
				this.eventDecl();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 853;
				this.includeStmt();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 854;
				this.internalPortDecl();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 855;
				this.matchStmt();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 856;
				this.recordSpecifierDecl();
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 857;
				this.containerSpecifierDecl();
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 858;
				this.stateMachineInstance();
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 19);
				{
				this.state = 859;
				this.stateMachineDef();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public componentDecl(): ComponentDeclContext {
		let localctx: ComponentDeclContext = new ComponentDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, FppParser.RULE_componentDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 862;
			localctx._kind = this.componentKind();
			this.state = 863;
			this.match(FppParser.COMPONENT);
			this.state = 864;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 865;
			this.match(FppParser.T__5);
			this.state = 869;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 104, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 866;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 871;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 104, this._ctx);
			}
			this.state = 877;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 1086329349) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 1073425) !== 0) || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 1213) !== 0)) {
				{
				{
				this.state = 872;
				this.componentMember();
				this.state = 873;
				this.semiDelim();
				}
				}
				this.state = 879;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 883;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 880;
				this.match(FppParser.NL);
				}
				}
				this.state = 885;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 886;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public portDecl(): PortDeclContext {
		let localctx: PortDeclContext = new PortDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, FppParser.RULE_portDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 888;
			this.match(FppParser.PORT);
			this.state = 889;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 891;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 890;
				localctx._params = this.formalParameterList();
				}
			}

			this.state = 895;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 893;
				this.match(FppParser.T__7);
				this.state = 894;
				localctx._returnType = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public componentInstanceSpec(): ComponentInstanceSpecContext {
		let localctx: ComponentInstanceSpecContext = new ComponentInstanceSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, FppParser.RULE_componentInstanceSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 898;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===96) {
				{
				this.state = 897;
				this.match(FppParser.PRIVATE);
				}
			}

			this.state = 900;
			this.match(FppParser.INSTANCE);
			this.state = 901;
			localctx._name = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public connectionNode(): ConnectionNodeContext {
		let localctx: ConnectionNodeContext = new ConnectionNodeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, FppParser.RULE_connectionNode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 903;
			localctx._node = this.qualIdent();
			this.state = 908;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 904;
				this.match(FppParser.T__1);
				this.state = 905;
				localctx._index = this.expr(0);
				this.state = 906;
				this.match(FppParser.T__2);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public connection(): ConnectionContext {
		let localctx: ConnectionContext = new ConnectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, FppParser.RULE_connection);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 911;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===126) {
				{
				this.state = 910;
				this.match(FppParser.UNMATCHED);
				}
			}

			this.state = 913;
			localctx._source = this.connectionNode();
			this.state = 914;
			this.match(FppParser.T__7);
			this.state = 915;
			localctx._destination = this.connectionNode();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public directGraphDecl(): DirectGraphDeclContext {
		let localctx: DirectGraphDeclContext = new DirectGraphDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, FppParser.RULE_directGraphDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 917;
			this.match(FppParser.CONNECTIONS);
			this.state = 918;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 919;
			this.match(FppParser.T__5);
			this.state = 923;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 112, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 920;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 925;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 112, this._ctx);
			}
			this.state = 931;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===126 || _la===131) {
				{
				{
				this.state = 926;
				this.connection();
				this.state = 927;
				this.commaDelim();
				}
				}
				this.state = 933;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 937;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 934;
				this.match(FppParser.NL);
				}
				}
				this.state = 939;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 940;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public patternKind(): PatternKindContext {
		let localctx: PatternKindContext = new PatternKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, FppParser.RULE_patternKind);
		try {
			this.state = 950;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 49:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 942;
				this.match(FppParser.COMMAND);
				}
				break;
			case 63:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 943;
				this.match(FppParser.EVENT);
				}
				break;
			case 120:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 944;
				this.match(FppParser.TEXT);
				this.state = 945;
				this.match(FppParser.EVENT);
				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 946;
				this.match(FppParser.HEALTH);
				}
				break;
			case 91:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 947;
				this.match(FppParser.PARAM);
				}
				break;
			case 119:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 948;
				this.match(FppParser.TELEMETRY);
				}
				break;
			case 122:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 949;
				this.match(FppParser.TIME);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public patternGraphSources(): PatternGraphSourcesContext {
		let localctx: PatternGraphSourcesContext = new PatternGraphSourcesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, FppParser.RULE_patternGraphSources);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 952;
			this.qualIdent();
			this.state = 958;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 116, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 953;
					this.commaDelim();
					this.state = 954;
					this.qualIdent();
					}
					}
				}
				this.state = 960;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 116, this._ctx);
			}
			this.state = 962;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 117, this._ctx) ) {
			case 1:
				{
				this.state = 961;
				this.commaDelim();
				}
				break;
			}
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public patternGraphStmt(): PatternGraphStmtContext {
		let localctx: PatternGraphStmtContext = new PatternGraphStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, FppParser.RULE_patternGraphStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 964;
			localctx._kind = this.patternKind();
			this.state = 965;
			this.match(FppParser.CONNECTIONS);
			this.state = 966;
			this.match(FppParser.INSTANCE);
			this.state = 967;
			localctx._target = this.qualIdent();
			this.state = 969;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===131) {
				{
				this.state = 968;
				this.patternGraphSources();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public topologyImportStmt(): TopologyImportStmtContext {
		let localctx: TopologyImportStmtContext = new TopologyImportStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, FppParser.RULE_topologyImportStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 971;
			this.match(FppParser.IMPORT);
			this.state = 972;
			localctx._topology = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public topologyMember(): TopologyMemberContext {
		let localctx: TopologyMemberContext = new TopologyMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, FppParser.RULE_topologyMember);
		try {
			this.state = 979;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 80:
			case 96:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 974;
				this.componentInstanceSpec();
				}
				break;
			case 51:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 975;
				this.directGraphDecl();
				}
				break;
			case 49:
			case 63:
			case 71:
			case 91:
			case 119:
			case 120:
			case 122:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 976;
				this.patternGraphStmt();
				}
				break;
			case 76:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 977;
				this.topologyImportStmt();
				}
				break;
			case 77:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 978;
				this.includeStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public topologyDecl(): TopologyDeclContext {
		let localctx: TopologyDeclContext = new TopologyDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, FppParser.RULE_topologyDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 981;
			this.match(FppParser.TOPOLOGY);
			this.state = 982;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 983;
			this.match(FppParser.T__5);
			this.state = 987;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 120, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 984;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 989;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 120, this._ctx);
			}
			this.state = 995;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 2554347525) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 2952790049) !== 0)) {
				{
				{
				this.state = 990;
				this.topologyMember();
				this.state = 991;
				this.semiDelim();
				}
				}
				this.state = 997;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1001;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 998;
				this.match(FppParser.NL);
				}
				}
				this.state = 1003;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1004;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public locationKind(): LocationKindContext {
		let localctx: LocationKindContext = new LocationKindContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, FppParser.RULE_locationKind);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1006;
			_la = this._input.LA(1);
			if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 1073741829) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 2684354561) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public locationStmt(): LocationStmtContext {
		let localctx: LocationStmtContext = new LocationStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, FppParser.RULE_locationStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1008;
			this.match(FppParser.LOCATE);
			this.state = 1009;
			localctx._kind = this.locationKind();
			this.state = 1010;
			localctx._name = this.qualIdent();
			this.state = 1011;
			this.match(FppParser.AT);
			this.state = 1012;
			localctx._path = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public moduleMember(): ModuleMemberContext {
		let localctx: ModuleMemberContext = new ModuleMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, FppParser.RULE_moduleMember);
		try {
			this.state = 1028;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 123, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1014;
				this.abstractTypeDecl();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1015;
				this.aliasTypeDecl();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1016;
				this.arrayDecl();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1017;
				this.componentDecl();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 1018;
				this.componentInstanceDecl();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 1019;
				this.constantDecl();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 1020;
				this.moduleDecl();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 1021;
				this.portDecl();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 1022;
				this.structDecl();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 1023;
				this.locationStmt();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 1024;
				this.enumDecl();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 1025;
				this.includeStmt();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 1026;
				this.topologyDecl();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 1027;
				this.stateMachineDef();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public moduleDecl(): ModuleDeclContext {
		let localctx: ModuleDeclContext = new ModuleDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, FppParser.RULE_moduleDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1030;
			this.match(FppParser.MODULE);
			this.state = 1031;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1032;
			this.match(FppParser.T__5);
			this.state = 1036;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 124, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1033;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1038;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 124, this._ctx);
			}
			this.state = 1044;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 33587209) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 4358697) !== 0) || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 1285) !== 0)) {
				{
				{
				this.state = 1039;
				this.moduleMember();
				this.state = 1040;
				this.semiDelim();
				}
				}
				this.state = 1046;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1050;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 1047;
				this.match(FppParser.NL);
				}
				}
				this.state = 1052;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1053;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public formalParameter(): FormalParameterContext {
		let localctx: FormalParameterContext = new FormalParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, FppParser.RULE_formalParameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1056;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===103) {
				{
				this.state = 1055;
				this.match(FppParser.REF);
				}
			}

			this.state = 1058;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1059;
			this.match(FppParser.T__3);
			this.state = 1060;
			localctx._type_ = this.typeName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public formalParameterN(): FormalParameterNContext {
		let localctx: FormalParameterNContext = new FormalParameterNContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, FppParser.RULE_formalParameterN);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1062;
			this.formalParameter();
			{
			this.state = 1064;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 128, this._ctx) ) {
			case 1:
				{
				this.state = 1063;
				this.match(FppParser.T__4);
				}
				break;
			}
			this.state = 1066;
			this.commaDelim();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public formalParamaterL(): FormalParamaterLContext {
		let localctx: FormalParamaterLContext = new FormalParamaterLContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, FppParser.RULE_formalParamaterL);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1068;
			this.formalParameter();
			this.state = 1073;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5 || _la===17) {
				{
				this.state = 1070;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 129, this._ctx) ) {
				case 1:
					{
					this.state = 1069;
					this.match(FppParser.T__4);
					}
					break;
				}
				this.state = 1072;
				this.commaDelim();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public formalParameterList(): FormalParameterListContext {
		let localctx: FormalParameterListContext = new FormalParameterListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 152, FppParser.RULE_formalParameterList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1075;
			this.match(FppParser.T__8);
			this.state = 1079;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 1076;
				this.match(FppParser.NL);
				}
				}
				this.state = 1081;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1089;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===103 || _la===131) {
				{
				this.state = 1085;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 132, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1082;
						this.formalParameterN();
						}
						}
					}
					this.state = 1087;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 132, this._ctx);
				}
				this.state = 1088;
				this.formalParamaterL();
				}
			}

			this.state = 1091;
			this.match(FppParser.T__9);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualIdent(): QualIdentContext {
		let localctx: QualIdentContext = new QualIdentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, FppParser.RULE_qualIdent);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1093;
			this.match(FppParser.IDENTIFIER);
			this.state = 1098;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 134, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1094;
					this.match(FppParser.T__10);
					this.state = 1095;
					this.match(FppParser.IDENTIFIER);
					}
					}
				}
				this.state = 1100;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 134, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public intType(): IntTypeContext {
		let localctx: IntTypeContext = new IntTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, FppParser.RULE_intType);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1101;
			_la = this._input.LA(1);
			if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 255) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public primitiveType(): PrimitiveTypeContext {
		let localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, FppParser.RULE_primitiveType);
		let _la: number;
		try {
			this.state = 1109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 46:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1103;
				localctx._type_ = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & 1049599) !== 0))) {
				    localctx._type_ = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 116:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1104;
				localctx._type_ = this.match(FppParser.STRING);
				this.state = 1107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===113) {
					{
					this.state = 1105;
					this.match(FppParser.SIZE);
					this.state = 1106;
					localctx._size = this.match(FppParser.LIT_INT);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, FppParser.RULE_typeName);
		try {
			this.state = 1113;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 46:
			case 116:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1111;
				this.primitiveType();
				}
				break;
			case 131:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1112;
				this.qualIdent();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commaDelim(): CommaDelimContext {
		let localctx: CommaDelimContext = new CommaDelimContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, FppParser.RULE_commaDelim);
		try {
			let _alt: number;
			this.state = 1127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 5:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1115;
				this.match(FppParser.T__4);
				this.state = 1119;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 138, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1116;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1121;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 138, this._ctx);
				}
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1123;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1122;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1125;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 139, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public semiDelim(): SemiDelimContext {
		let localctx: SemiDelimContext = new SemiDelimContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, FppParser.RULE_semiDelim);
		try {
			let _alt: number;
			this.state = 1141;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1129;
				this.match(FppParser.T__11);
				this.state = 1133;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 141, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1130;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1135;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 141, this._ctx);
				}
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1137;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1136;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1139;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 142, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayExpr(): ArrayExprContext {
		let localctx: ArrayExprContext = new ArrayExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, FppParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1143;
			this.match(FppParser.T__1);
			this.state = 1147;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 1144;
				this.match(FppParser.NL);
				}
				}
				this.state = 1149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 62923332) !== 0) || _la===131) {
				{
				this.state = 1150;
				this.expr(0);
				this.state = 1156;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===5 || _la===17) {
					{
					{
					this.state = 1151;
					this.commaDelim();
					this.state = 1152;
					this.expr(0);
					}
					}
					this.state = 1158;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1161;
			this.match(FppParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structAssignment(): StructAssignmentContext {
		let localctx: StructAssignmentContext = new StructAssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, FppParser.RULE_structAssignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1163;
			localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1164;
			this.match(FppParser.T__0);
			this.state = 1165;
			localctx._value = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structExpr(): StructExprContext {
		let localctx: StructExprContext = new StructExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, FppParser.RULE_structExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1167;
			this.match(FppParser.T__5);
			this.state = 1171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 1168;
				this.match(FppParser.NL);
				}
				}
				this.state = 1173;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===131) {
				{
				this.state = 1174;
				this.structAssignment();
				this.state = 1180;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 148, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1175;
						this.commaDelim();
						this.state = 1176;
						this.structAssignment();
						}
						}
					}
					this.state = 1182;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 148, this._ctx);
				}
				this.state = 1184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5 || _la===17) {
					{
					this.state = 1183;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 1188;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExprContext = new ExprContext(this, this._ctx, _parentState);
		let _prevctx: ExprContext = localctx;
		let _startState: number = 172;
		this.enterRecursionRule(localctx, 172, FppParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1204;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 1191;
				this.match(FppParser.T__12);
				this.state = 1192;
				localctx._unary = this.expr(11);
				}
				break;
			case 2:
				{
				this.state = 1193;
				this.arrayExpr();
				}
				break;
			case 6:
				{
				this.state = 1194;
				this.structExpr();
				}
				break;
			case 131:
				{
				this.state = 1195;
				this.qualIdent();
				}
				break;
			case 22:
				{
				this.state = 1196;
				this.match(FppParser.LIT_BOOLEAN);
				}
				break;
			case 24:
				{
				this.state = 1197;
				this.match(FppParser.LIT_FLOAT);
				}
				break;
			case 25:
				{
				this.state = 1198;
				this.match(FppParser.LIT_INT);
				}
				break;
			case 23:
				{
				this.state = 1199;
				this.match(FppParser.LIT_STRING);
				}
				break;
			case 9:
				{
				this.state = 1200;
				this.match(FppParser.T__8);
				this.state = 1201;
				localctx._p = this.expr(0);
				this.state = 1202;
				this.match(FppParser.T__9);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 1214;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 153, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 1212;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 152, this._ctx) ) {
					case 1:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						localctx._left = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, FppParser.RULE_expr);
						this.state = 1206;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 1207;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===14 || _la===15)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 1208;
						localctx._right = this.expr(11);
						}
						break;
					case 2:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						localctx._left = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, FppParser.RULE_expr);
						this.state = 1209;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 1210;
						localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===13 || _la===16)) {
						    localctx._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 1211;
						localctx._right = this.expr(10);
						}
						break;
					}
					}
				}
				this.state = 1216;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 153, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 86:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,131,1218,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,1,0,5,0,176,8,0,10,0,12,0,
	179,9,0,1,0,1,0,1,0,3,0,184,8,0,5,0,186,8,0,10,0,12,0,189,9,0,1,0,5,0,192,
	8,0,10,0,12,0,195,9,0,1,0,1,0,1,1,5,1,200,8,1,10,1,12,1,203,9,1,1,1,1,1,
	1,1,3,1,208,8,1,5,1,210,8,1,10,1,12,1,213,9,1,1,1,5,1,216,8,1,10,1,12,1,
	219,9,1,1,1,1,1,1,2,5,2,224,8,2,10,2,12,2,227,9,2,1,2,1,2,1,2,3,2,232,8,
	2,5,2,234,8,2,10,2,12,2,237,9,2,1,2,5,2,240,8,2,10,2,12,2,243,9,2,1,2,1,
	2,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,
	5,264,8,5,1,5,1,5,3,5,268,8,5,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,
	7,3,7,281,8,7,1,7,1,7,1,7,3,7,286,8,7,1,8,1,8,3,8,290,8,8,1,8,1,8,1,9,1,
	9,3,9,296,8,9,1,9,3,9,299,8,9,1,10,1,10,1,10,1,10,5,10,305,8,10,10,10,12,
	10,308,9,10,1,10,5,10,311,8,10,10,10,12,10,314,9,10,1,10,3,10,317,8,10,
	1,10,1,10,1,10,3,10,322,8,10,1,11,1,11,1,12,1,12,1,13,1,13,1,13,1,13,3,
	13,332,8,13,1,13,1,13,3,13,336,8,13,1,13,1,13,3,13,340,8,13,1,13,3,13,343,
	8,13,1,14,1,14,1,14,1,14,1,14,1,14,3,14,351,8,14,1,14,1,14,3,14,355,8,14,
	1,14,1,14,1,14,3,14,360,8,14,1,14,1,14,1,14,3,14,365,8,14,1,15,1,15,1,15,
	1,15,1,15,1,15,1,15,3,15,374,8,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
	16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,
	397,8,16,1,16,1,16,1,16,1,16,3,16,403,8,16,1,17,1,17,3,17,407,8,17,1,18,
	1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,417,8,18,1,18,1,18,1,18,3,18,422,
	8,18,1,18,3,18,425,8,18,1,19,1,19,1,19,1,19,1,19,3,19,432,8,19,1,19,3,19,
	435,8,19,1,20,1,20,1,21,1,21,1,21,1,22,1,22,5,22,444,8,22,10,22,12,22,447,
	9,22,1,22,1,22,1,22,1,22,5,22,453,8,22,10,22,12,22,456,9,22,1,22,3,22,459,
	8,22,3,22,461,8,22,1,22,1,22,1,23,1,23,1,23,3,23,468,8,23,1,24,1,24,1,24,
	1,24,1,24,1,24,3,24,476,8,24,1,24,1,24,3,24,480,8,24,1,24,1,24,3,24,484,
	8,24,1,24,1,24,3,24,488,8,24,1,24,1,24,3,24,492,8,24,1,25,1,25,1,25,1,25,
	3,25,498,8,25,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,27,1,
	27,1,27,1,27,3,27,514,8,27,1,28,1,28,1,28,1,28,3,28,520,8,28,1,29,1,29,
	1,29,5,29,525,8,29,10,29,12,29,528,9,29,1,29,1,29,1,29,1,29,5,29,534,8,
	29,10,29,12,29,537,9,29,3,29,539,8,29,1,29,3,29,542,8,29,1,29,1,29,1,30,
	3,30,547,8,30,1,30,1,30,1,30,1,31,1,31,1,31,1,32,1,32,3,32,557,8,32,1,33,
	1,33,1,33,1,33,3,33,563,8,33,1,33,1,33,1,34,1,34,1,34,1,35,1,35,1,35,1,
	36,1,36,1,36,1,36,1,36,1,36,3,36,579,8,36,1,37,1,37,1,37,1,37,5,37,585,
	8,37,10,37,12,37,588,9,37,1,37,1,37,1,37,5,37,593,8,37,10,37,12,37,596,
	9,37,1,37,5,37,599,8,37,10,37,12,37,602,9,37,1,37,3,37,605,8,37,1,38,1,
	38,1,38,1,38,1,38,1,38,3,38,613,8,38,1,39,1,39,3,39,617,8,39,1,40,1,40,
	1,40,1,40,1,40,5,40,624,8,40,10,40,12,40,627,9,40,1,40,1,40,1,40,5,40,632,
	8,40,10,40,12,40,635,9,40,1,40,5,40,638,8,40,10,40,12,40,641,9,40,1,40,
	3,40,644,8,40,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,3,41,654,8,41,1,41,
	3,41,657,8,41,1,42,1,42,1,42,3,42,662,8,42,1,43,1,43,3,43,666,8,43,1,43,
	1,43,1,44,1,44,3,44,672,8,44,1,44,3,44,675,8,44,1,45,1,45,1,45,1,45,3,45,
	681,8,45,1,45,1,45,5,45,685,8,45,10,45,12,45,688,9,45,1,45,5,45,691,8,45,
	10,45,12,45,694,9,45,1,45,3,45,697,8,45,1,45,1,45,1,45,3,45,702,8,45,1,
	46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,3,46,715,8,46,1,47,
	1,47,1,47,3,47,720,8,47,1,47,1,47,1,47,1,47,3,47,726,8,47,1,47,1,47,1,47,
	1,47,3,47,732,8,47,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,50,1,50,1,
	50,1,50,3,50,746,8,50,1,50,1,50,3,50,750,8,50,1,50,3,50,753,8,50,1,51,1,
	51,1,51,1,51,1,51,1,51,3,51,761,8,51,1,51,1,51,3,51,765,8,51,1,52,1,52,
	1,52,1,52,1,52,3,52,772,8,52,1,52,1,52,1,52,3,52,777,8,52,1,53,1,53,1,53,
	1,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,3,54,792,8,54,1,54,1,
	54,3,54,796,8,54,1,54,1,54,1,54,3,54,801,8,54,1,54,1,54,1,54,3,54,806,8,
	54,1,54,1,54,3,54,810,8,54,1,54,1,54,3,54,814,8,54,1,54,1,54,5,54,818,8,
	54,10,54,12,54,821,9,54,1,54,1,54,1,54,5,54,826,8,54,10,54,12,54,829,9,
	54,1,54,5,54,832,8,54,10,54,12,54,835,9,54,1,54,3,54,838,8,54,1,55,1,55,
	1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,
	56,1,56,1,56,1,56,1,56,3,56,861,8,56,1,57,1,57,1,57,1,57,1,57,5,57,868,
	8,57,10,57,12,57,871,9,57,1,57,1,57,1,57,5,57,876,8,57,10,57,12,57,879,
	9,57,1,57,5,57,882,8,57,10,57,12,57,885,9,57,1,57,1,57,1,58,1,58,1,58,3,
	58,892,8,58,1,58,1,58,3,58,896,8,58,1,59,3,59,899,8,59,1,59,1,59,1,59,1,
	60,1,60,1,60,1,60,1,60,3,60,909,8,60,1,61,3,61,912,8,61,1,61,1,61,1,61,
	1,61,1,62,1,62,1,62,1,62,5,62,922,8,62,10,62,12,62,925,9,62,1,62,1,62,1,
	62,5,62,930,8,62,10,62,12,62,933,9,62,1,62,5,62,936,8,62,10,62,12,62,939,
	9,62,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,951,8,63,1,
	64,1,64,1,64,1,64,5,64,957,8,64,10,64,12,64,960,9,64,1,64,3,64,963,8,64,
	1,65,1,65,1,65,1,65,1,65,3,65,970,8,65,1,66,1,66,1,66,1,67,1,67,1,67,1,
	67,1,67,3,67,980,8,67,1,68,1,68,1,68,1,68,5,68,986,8,68,10,68,12,68,989,
	9,68,1,68,1,68,1,68,5,68,994,8,68,10,68,12,68,997,9,68,1,68,5,68,1000,8,
	68,10,68,12,68,1003,9,68,1,68,1,68,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,
	70,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,
	3,71,1029,8,71,1,72,1,72,1,72,1,72,5,72,1035,8,72,10,72,12,72,1038,9,72,
	1,72,1,72,1,72,5,72,1043,8,72,10,72,12,72,1046,9,72,1,72,5,72,1049,8,72,
	10,72,12,72,1052,9,72,1,72,1,72,1,73,3,73,1057,8,73,1,73,1,73,1,73,1,73,
	1,74,1,74,3,74,1065,8,74,1,74,1,74,1,75,1,75,3,75,1071,8,75,1,75,3,75,1074,
	8,75,1,76,1,76,5,76,1078,8,76,10,76,12,76,1081,9,76,1,76,5,76,1084,8,76,
	10,76,12,76,1087,9,76,1,76,3,76,1090,8,76,1,76,1,76,1,77,1,77,1,77,5,77,
	1097,8,77,10,77,12,77,1100,9,77,1,78,1,78,1,79,1,79,1,79,1,79,3,79,1108,
	8,79,3,79,1110,8,79,1,80,1,80,3,80,1114,8,80,1,81,1,81,5,81,1118,8,81,10,
	81,12,81,1121,9,81,1,81,4,81,1124,8,81,11,81,12,81,1125,3,81,1128,8,81,
	1,82,1,82,5,82,1132,8,82,10,82,12,82,1135,9,82,1,82,4,82,1138,8,82,11,82,
	12,82,1139,3,82,1142,8,82,1,83,1,83,5,83,1146,8,83,10,83,12,83,1149,9,83,
	1,83,1,83,1,83,1,83,5,83,1155,8,83,10,83,12,83,1158,9,83,3,83,1160,8,83,
	1,83,1,83,1,84,1,84,1,84,1,84,1,85,1,85,5,85,1170,8,85,10,85,12,85,1173,
	9,85,1,85,1,85,1,85,1,85,5,85,1179,8,85,10,85,12,85,1182,9,85,1,85,3,85,
	1185,8,85,3,85,1187,8,85,1,85,1,85,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,
	86,1,86,1,86,1,86,1,86,1,86,1,86,3,86,1205,8,86,1,86,1,86,1,86,1,86,1,86,
	1,86,5,86,1213,8,86,10,86,12,86,1216,9,86,1,86,0,1,172,87,0,2,4,6,8,10,
	12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,
	60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,
	106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,
	142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,0,9,3,0,
	41,41,45,45,58,58,3,0,42,42,70,70,118,118,3,0,89,89,102,102,130,130,3,0,
	37,37,92,92,99,99,6,0,50,50,52,52,80,80,94,94,123,123,125,125,1,0,28,35,
	2,0,26,35,46,46,1,0,14,15,2,0,13,13,16,16,1354,0,177,1,0,0,0,2,201,1,0,
	0,0,4,225,1,0,0,0,6,246,1,0,0,0,8,249,1,0,0,0,10,254,1,0,0,0,12,269,1,0,
	0,0,14,274,1,0,0,0,16,287,1,0,0,0,18,293,1,0,0,0,20,300,1,0,0,0,22,323,
	1,0,0,0,24,325,1,0,0,0,26,327,1,0,0,0,28,344,1,0,0,0,30,373,1,0,0,0,32,
	402,1,0,0,0,34,406,1,0,0,0,36,408,1,0,0,0,38,426,1,0,0,0,40,436,1,0,0,0,
	42,438,1,0,0,0,44,441,1,0,0,0,46,467,1,0,0,0,48,469,1,0,0,0,50,493,1,0,
	0,0,52,499,1,0,0,0,54,509,1,0,0,0,56,515,1,0,0,0,58,521,1,0,0,0,60,546,
	1,0,0,0,62,551,1,0,0,0,64,556,1,0,0,0,66,558,1,0,0,0,68,566,1,0,0,0,70,
	569,1,0,0,0,72,578,1,0,0,0,74,580,1,0,0,0,76,612,1,0,0,0,78,614,1,0,0,0,
	80,618,1,0,0,0,82,645,1,0,0,0,84,658,1,0,0,0,86,663,1,0,0,0,88,669,1,0,
	0,0,90,676,1,0,0,0,92,714,1,0,0,0,94,716,1,0,0,0,96,733,1,0,0,0,98,736,
	1,0,0,0,100,741,1,0,0,0,102,754,1,0,0,0,104,766,1,0,0,0,106,778,1,0,0,0,
	108,782,1,0,0,0,110,839,1,0,0,0,112,860,1,0,0,0,114,862,1,0,0,0,116,888,
	1,0,0,0,118,898,1,0,0,0,120,903,1,0,0,0,122,911,1,0,0,0,124,917,1,0,0,0,
	126,950,1,0,0,0,128,952,1,0,0,0,130,964,1,0,0,0,132,971,1,0,0,0,134,979,
	1,0,0,0,136,981,1,0,0,0,138,1006,1,0,0,0,140,1008,1,0,0,0,142,1028,1,0,
	0,0,144,1030,1,0,0,0,146,1056,1,0,0,0,148,1062,1,0,0,0,150,1068,1,0,0,0,
	152,1075,1,0,0,0,154,1093,1,0,0,0,156,1101,1,0,0,0,158,1109,1,0,0,0,160,
	1113,1,0,0,0,162,1127,1,0,0,0,164,1141,1,0,0,0,166,1143,1,0,0,0,168,1163,
	1,0,0,0,170,1167,1,0,0,0,172,1204,1,0,0,0,174,176,5,17,0,0,175,174,1,0,
	0,0,176,179,1,0,0,0,177,175,1,0,0,0,177,178,1,0,0,0,178,187,1,0,0,0,179,
	177,1,0,0,0,180,183,3,142,71,0,181,184,3,164,82,0,182,184,5,0,0,1,183,181,
	1,0,0,0,183,182,1,0,0,0,184,186,1,0,0,0,185,180,1,0,0,0,186,189,1,0,0,0,
	187,185,1,0,0,0,187,188,1,0,0,0,188,193,1,0,0,0,189,187,1,0,0,0,190,192,
	5,17,0,0,191,190,1,0,0,0,192,195,1,0,0,0,193,191,1,0,0,0,193,194,1,0,0,
	0,194,196,1,0,0,0,195,193,1,0,0,0,196,197,5,0,0,1,197,1,1,0,0,0,198,200,
	5,17,0,0,199,198,1,0,0,0,200,203,1,0,0,0,201,199,1,0,0,0,201,202,1,0,0,
	0,202,211,1,0,0,0,203,201,1,0,0,0,204,207,3,134,67,0,205,208,3,164,82,0,
	206,208,5,0,0,1,207,205,1,0,0,0,207,206,1,0,0,0,208,210,1,0,0,0,209,204,
	1,0,0,0,210,213,1,0,0,0,211,209,1,0,0,0,211,212,1,0,0,0,212,217,1,0,0,0,
	213,211,1,0,0,0,214,216,5,17,0,0,215,214,1,0,0,0,216,219,1,0,0,0,217,215,
	1,0,0,0,217,218,1,0,0,0,218,220,1,0,0,0,219,217,1,0,0,0,220,221,5,0,0,1,
	221,3,1,0,0,0,222,224,5,17,0,0,223,222,1,0,0,0,224,227,1,0,0,0,225,223,
	1,0,0,0,225,226,1,0,0,0,226,235,1,0,0,0,227,225,1,0,0,0,228,231,3,112,56,
	0,229,232,3,164,82,0,230,232,5,0,0,1,231,229,1,0,0,0,231,230,1,0,0,0,232,
	234,1,0,0,0,233,228,1,0,0,0,234,237,1,0,0,0,235,233,1,0,0,0,235,236,1,0,
	0,0,236,241,1,0,0,0,237,235,1,0,0,0,238,240,5,17,0,0,239,238,1,0,0,0,240,
	243,1,0,0,0,241,239,1,0,0,0,241,242,1,0,0,0,242,244,1,0,0,0,243,241,1,0,
	0,0,244,245,5,0,0,1,245,5,1,0,0,0,246,247,5,125,0,0,247,248,5,131,0,0,248,
	7,1,0,0,0,249,250,5,125,0,0,250,251,5,131,0,0,251,252,5,1,0,0,252,253,3,
	160,80,0,253,9,1,0,0,0,254,255,5,40,0,0,255,256,5,131,0,0,256,257,5,1,0,
	0,257,258,5,2,0,0,258,259,3,172,86,0,259,260,5,3,0,0,260,263,3,160,80,0,
	261,262,5,55,0,0,262,264,3,172,86,0,263,261,1,0,0,0,263,264,1,0,0,0,264,
	267,1,0,0,0,265,266,5,67,0,0,266,268,5,23,0,0,267,265,1,0,0,0,267,268,1,
	0,0,0,268,11,1,0,0,0,269,270,5,52,0,0,270,271,5,131,0,0,271,272,5,1,0,0,
	272,273,3,172,86,0,273,13,1,0,0,0,274,275,5,131,0,0,275,280,5,4,0,0,276,
	277,5,2,0,0,277,278,3,172,86,0,278,279,5,3,0,0,279,281,1,0,0,0,280,276,
	1,0,0,0,280,281,1,0,0,0,281,282,1,0,0,0,282,285,3,160,80,0,283,284,5,67,
	0,0,284,286,5,23,0,0,285,283,1,0,0,0,285,286,1,0,0,0,286,15,1,0,0,0,287,
	289,3,14,7,0,288,290,5,5,0,0,289,288,1,0,0,0,289,290,1,0,0,0,290,291,1,
	0,0,0,291,292,3,162,81,0,292,17,1,0,0,0,293,298,3,14,7,0,294,296,5,5,0,
	0,295,294,1,0,0,0,295,296,1,0,0,0,296,297,1,0,0,0,297,299,3,162,81,0,298,
	295,1,0,0,0,298,299,1,0,0,0,299,19,1,0,0,0,300,301,5,117,0,0,301,302,5,
	131,0,0,302,306,5,6,0,0,303,305,5,17,0,0,304,303,1,0,0,0,305,308,1,0,0,
	0,306,304,1,0,0,0,306,307,1,0,0,0,307,316,1,0,0,0,308,306,1,0,0,0,309,311,
	3,16,8,0,310,309,1,0,0,0,311,314,1,0,0,0,312,310,1,0,0,0,312,313,1,0,0,
	0,313,315,1,0,0,0,314,312,1,0,0,0,315,317,3,18,9,0,316,312,1,0,0,0,316,
	317,1,0,0,0,317,318,1,0,0,0,318,321,5,7,0,0,319,320,5,55,0,0,320,322,3,
	170,85,0,321,319,1,0,0,0,321,322,1,0,0,0,322,21,1,0,0,0,323,324,7,0,0,0,
	324,23,1,0,0,0,325,326,7,1,0,0,326,25,1,0,0,0,327,328,3,24,12,0,328,329,
	5,49,0,0,329,331,5,131,0,0,330,332,3,152,76,0,331,330,1,0,0,0,331,332,1,
	0,0,0,332,335,1,0,0,0,333,334,5,88,0,0,334,336,3,172,86,0,335,333,1,0,0,
	0,335,336,1,0,0,0,336,339,1,0,0,0,337,338,5,95,0,0,338,340,3,172,86,0,339,
	337,1,0,0,0,339,340,1,0,0,0,340,342,1,0,0,0,341,343,3,22,11,0,342,341,1,
	0,0,0,342,343,1,0,0,0,343,27,1,0,0,0,344,345,5,91,0,0,345,346,5,131,0,0,
	346,347,5,4,0,0,347,350,3,160,80,0,348,349,5,55,0,0,349,351,3,172,86,0,
	350,348,1,0,0,0,350,351,1,0,0,0,351,354,1,0,0,0,352,353,5,74,0,0,353,355,
	3,172,86,0,354,352,1,0,0,0,354,355,1,0,0,0,355,359,1,0,0,0,356,357,5,110,
	0,0,357,358,5,88,0,0,358,360,3,172,86,0,359,356,1,0,0,0,359,360,1,0,0,0,
	360,364,1,0,0,0,361,362,5,107,0,0,362,363,5,88,0,0,363,365,3,172,86,0,364,
	361,1,0,0,0,364,365,1,0,0,0,365,29,1,0,0,0,366,367,5,42,0,0,367,374,5,79,
	0,0,368,369,5,70,0,0,369,374,5,79,0,0,370,371,5,118,0,0,371,374,5,79,0,
	0,372,374,5,90,0,0,373,366,1,0,0,0,373,368,1,0,0,0,373,370,1,0,0,0,373,
	372,1,0,0,0,374,31,1,0,0,0,375,376,5,49,0,0,376,403,5,101,0,0,377,378,5,
	49,0,0,378,403,5,104,0,0,379,380,5,49,0,0,380,403,5,106,0,0,381,403,5,63,
	0,0,382,383,5,91,0,0,383,403,5,68,0,0,384,385,5,91,0,0,385,403,5,110,0,
	0,386,403,5,119,0,0,387,388,5,120,0,0,388,403,5,63,0,0,389,390,5,122,0,
	0,390,403,5,68,0,0,391,392,5,97,0,0,392,403,5,68,0,0,393,394,5,97,0,0,394,
	403,5,105,0,0,395,397,5,42,0,0,396,395,1,0,0,0,396,397,1,0,0,0,397,398,
	1,0,0,0,398,399,5,97,0,0,399,403,5,101,0,0,400,401,5,97,0,0,401,403,5,108,
	0,0,402,375,1,0,0,0,402,377,1,0,0,0,402,379,1,0,0,0,402,381,1,0,0,0,402,
	382,1,0,0,0,402,384,1,0,0,0,402,386,1,0,0,0,402,387,1,0,0,0,402,389,1,0,
	0,0,402,391,1,0,0,0,402,393,1,0,0,0,402,396,1,0,0,0,402,400,1,0,0,0,403,
	33,1,0,0,0,404,407,5,109,0,0,405,407,3,154,77,0,406,404,1,0,0,0,406,405,
	1,0,0,0,407,35,1,0,0,0,408,409,3,30,15,0,409,410,5,94,0,0,410,411,5,131,
	0,0,411,416,5,4,0,0,412,413,5,2,0,0,413,414,3,172,86,0,414,415,5,3,0,0,
	415,417,1,0,0,0,416,412,1,0,0,0,416,417,1,0,0,0,417,418,1,0,0,0,418,421,
	3,34,17,0,419,420,5,95,0,0,420,422,3,172,86,0,421,419,1,0,0,0,421,422,1,
	0,0,0,422,424,1,0,0,0,423,425,3,22,11,0,424,423,1,0,0,0,424,425,1,0,0,0,
	425,37,1,0,0,0,426,427,3,32,16,0,427,428,5,94,0,0,428,431,5,131,0,0,429,
	430,5,95,0,0,430,432,3,172,86,0,431,429,1,0,0,0,431,432,1,0,0,0,432,434,
	1,0,0,0,433,435,3,22,11,0,434,433,1,0,0,0,434,435,1,0,0,0,435,39,1,0,0,
	0,436,437,7,2,0,0,437,41,1,0,0,0,438,439,3,40,20,0,439,440,3,172,86,0,440,
	43,1,0,0,0,441,445,5,6,0,0,442,444,5,17,0,0,443,442,1,0,0,0,444,447,1,0,
	0,0,445,443,1,0,0,0,445,446,1,0,0,0,446,460,1,0,0,0,447,445,1,0,0,0,448,
	454,3,42,21,0,449,450,3,162,81,0,450,451,3,42,21,0,451,453,1,0,0,0,452,
	449,1,0,0,0,453,456,1,0,0,0,454,452,1,0,0,0,454,455,1,0,0,0,455,458,1,0,
	0,0,456,454,1,0,0,0,457,459,3,162,81,0,458,457,1,0,0,0,458,459,1,0,0,0,
	459,461,1,0,0,0,460,448,1,0,0,0,460,461,1,0,0,0,461,462,1,0,0,0,462,463,
	5,7,0,0,463,45,1,0,0,0,464,468,5,39,0,0,465,466,5,87,0,0,466,468,5,47,0,
	0,467,464,1,0,0,0,467,465,1,0,0,0,468,47,1,0,0,0,469,470,5,119,0,0,470,
	471,5,131,0,0,471,472,5,4,0,0,472,475,3,160,80,0,473,474,5,74,0,0,474,476,
	3,172,86,0,475,473,1,0,0,0,475,476,1,0,0,0,476,479,1,0,0,0,477,478,5,127,
	0,0,478,480,3,46,23,0,479,477,1,0,0,0,479,480,1,0,0,0,480,483,1,0,0,0,481,
	482,5,67,0,0,482,484,5,23,0,0,483,481,1,0,0,0,483,484,1,0,0,0,484,487,1,
	0,0,0,485,486,5,83,0,0,486,488,3,44,22,0,487,485,1,0,0,0,487,488,1,0,0,
	0,488,491,1,0,0,0,489,490,5,72,0,0,490,492,3,44,22,0,491,489,1,0,0,0,491,
	492,1,0,0,0,492,49,1,0,0,0,493,494,5,36,0,0,494,497,5,131,0,0,495,496,5,
	4,0,0,496,498,3,160,80,0,497,495,1,0,0,0,497,498,1,0,0,0,498,51,1,0,0,0,
	499,500,5,48,0,0,500,501,5,131,0,0,501,502,5,6,0,0,502,503,5,75,0,0,503,
	504,5,131,0,0,504,505,3,60,30,0,505,506,5,59,0,0,506,507,3,60,30,0,507,
	508,5,7,0,0,508,53,1,0,0,0,509,510,5,69,0,0,510,513,5,131,0,0,511,512,5,
	4,0,0,512,514,3,160,80,0,513,511,1,0,0,0,513,514,1,0,0,0,514,55,1,0,0,0,
	515,516,5,112,0,0,516,519,5,131,0,0,517,518,5,4,0,0,518,520,3,160,80,0,
	519,517,1,0,0,0,519,520,1,0,0,0,520,57,1,0,0,0,521,522,5,57,0,0,522,526,
	5,6,0,0,523,525,5,17,0,0,524,523,1,0,0,0,525,528,1,0,0,0,526,524,1,0,0,
	0,526,527,1,0,0,0,527,538,1,0,0,0,528,526,1,0,0,0,529,535,5,131,0,0,530,
	531,3,162,81,0,531,532,5,131,0,0,532,534,1,0,0,0,533,530,1,0,0,0,534,537,
	1,0,0,0,535,533,1,0,0,0,535,536,1,0,0,0,536,539,1,0,0,0,537,535,1,0,0,0,
	538,529,1,0,0,0,538,539,1,0,0,0,539,541,1,0,0,0,540,542,3,162,81,0,541,
	540,1,0,0,0,541,542,1,0,0,0,542,543,1,0,0,0,543,544,5,7,0,0,544,59,1,0,
	0,0,545,547,3,58,29,0,546,545,1,0,0,0,546,547,1,0,0,0,547,548,1,0,0,0,548,
	549,5,60,0,0,549,550,3,154,77,0,550,61,1,0,0,0,551,552,5,78,0,0,552,553,
	3,60,30,0,553,63,1,0,0,0,554,557,3,60,30,0,555,557,3,58,29,0,556,554,1,
	0,0,0,556,555,1,0,0,0,557,65,1,0,0,0,558,559,5,87,0,0,559,562,5,131,0,0,
	560,561,5,75,0,0,561,563,5,131,0,0,562,560,1,0,0,0,562,563,1,0,0,0,563,
	564,1,0,0,0,564,565,3,64,32,0,565,67,1,0,0,0,566,567,5,61,0,0,567,568,3,
	58,29,0,568,69,1,0,0,0,569,570,5,64,0,0,570,571,3,58,29,0,571,71,1,0,0,
	0,572,579,3,62,31,0,573,579,3,52,26,0,574,579,3,74,37,0,575,579,3,66,33,
	0,576,579,3,68,34,0,577,579,3,70,35,0,578,572,1,0,0,0,578,573,1,0,0,0,578,
	574,1,0,0,0,578,575,1,0,0,0,578,576,1,0,0,0,578,577,1,0,0,0,579,73,1,0,
	0,0,580,581,5,115,0,0,581,604,5,131,0,0,582,586,5,6,0,0,583,585,5,17,0,
	0,584,583,1,0,0,0,585,588,1,0,0,0,586,584,1,0,0,0,586,587,1,0,0,0,587,594,
	1,0,0,0,588,586,1,0,0,0,589,590,3,72,36,0,590,591,3,164,82,0,591,593,1,
	0,0,0,592,589,1,0,0,0,593,596,1,0,0,0,594,592,1,0,0,0,594,595,1,0,0,0,595,
	600,1,0,0,0,596,594,1,0,0,0,597,599,5,17,0,0,598,597,1,0,0,0,599,602,1,
	0,0,0,600,598,1,0,0,0,600,601,1,0,0,0,601,603,1,0,0,0,602,600,1,0,0,0,603,
	605,5,7,0,0,604,582,1,0,0,0,604,605,1,0,0,0,605,75,1,0,0,0,606,613,3,52,
	26,0,607,613,3,54,27,0,608,613,3,62,31,0,609,613,3,56,28,0,610,613,3,74,
	37,0,611,613,3,50,25,0,612,606,1,0,0,0,612,607,1,0,0,0,612,608,1,0,0,0,
	612,609,1,0,0,0,612,610,1,0,0,0,612,611,1,0,0,0,613,77,1,0,0,0,614,616,
	3,76,38,0,615,617,5,21,0,0,616,615,1,0,0,0,616,617,1,0,0,0,617,79,1,0,0,
	0,618,619,5,115,0,0,619,620,5,84,0,0,620,643,5,131,0,0,621,625,5,6,0,0,
	622,624,5,17,0,0,623,622,1,0,0,0,624,627,1,0,0,0,625,623,1,0,0,0,625,626,
	1,0,0,0,626,633,1,0,0,0,627,625,1,0,0,0,628,629,3,78,39,0,629,630,3,164,
	82,0,630,632,1,0,0,0,631,628,1,0,0,0,632,635,1,0,0,0,633,631,1,0,0,0,633,
	634,1,0,0,0,634,639,1,0,0,0,635,633,1,0,0,0,636,638,5,17,0,0,637,636,1,
	0,0,0,638,641,1,0,0,0,639,637,1,0,0,0,639,640,1,0,0,0,640,642,1,0,0,0,641,
	639,1,0,0,0,642,644,5,7,0,0,643,621,1,0,0,0,643,644,1,0,0,0,644,81,1,0,
	0,0,645,646,5,115,0,0,646,647,5,84,0,0,647,648,5,80,0,0,648,649,5,131,0,
	0,649,650,5,4,0,0,650,653,3,154,77,0,651,652,5,95,0,0,652,654,3,172,86,
	0,653,651,1,0,0,0,653,654,1,0,0,0,654,656,1,0,0,0,655,657,3,22,11,0,656,
	655,1,0,0,0,656,657,1,0,0,0,657,83,1,0,0,0,658,661,5,131,0,0,659,660,5,
	1,0,0,660,662,3,172,86,0,661,659,1,0,0,0,661,662,1,0,0,0,662,85,1,0,0,0,
	663,665,3,84,42,0,664,666,5,5,0,0,665,664,1,0,0,0,665,666,1,0,0,0,666,667,
	1,0,0,0,667,668,3,162,81,0,668,87,1,0,0,0,669,674,3,84,42,0,670,672,5,5,
	0,0,671,670,1,0,0,0,671,672,1,0,0,0,672,673,1,0,0,0,673,675,3,162,81,0,
	674,671,1,0,0,0,674,675,1,0,0,0,675,89,1,0,0,0,676,677,5,62,0,0,677,680,
	5,131,0,0,678,679,5,4,0,0,679,681,3,156,78,0,680,678,1,0,0,0,680,681,1,
	0,0,0,681,682,1,0,0,0,682,686,5,6,0,0,683,685,5,17,0,0,684,683,1,0,0,0,
	685,688,1,0,0,0,686,684,1,0,0,0,686,687,1,0,0,0,687,696,1,0,0,0,688,686,
	1,0,0,0,689,691,3,86,43,0,690,689,1,0,0,0,691,694,1,0,0,0,692,690,1,0,0,
	0,692,693,1,0,0,0,693,695,1,0,0,0,694,692,1,0,0,0,695,697,3,88,44,0,696,
	692,1,0,0,0,696,697,1,0,0,0,697,698,1,0,0,0,698,701,5,7,0,0,699,700,5,55,
	0,0,700,702,3,172,86,0,701,699,1,0,0,0,701,702,1,0,0,0,702,91,1,0,0,0,703,
	704,5,38,0,0,704,715,5,72,0,0,705,706,5,38,0,0,706,715,5,83,0,0,707,715,
	5,49,0,0,708,715,5,56,0,0,709,715,5,66,0,0,710,711,5,128,0,0,711,715,5,
	72,0,0,712,713,5,128,0,0,713,715,5,83,0,0,714,703,1,0,0,0,714,705,1,0,0,
	0,714,707,1,0,0,0,714,708,1,0,0,0,714,709,1,0,0,0,714,710,1,0,0,0,714,712,
	1,0,0,0,715,93,1,0,0,0,716,717,5,63,0,0,717,719,5,131,0,0,718,720,3,152,
	76,0,719,718,1,0,0,0,719,720,1,0,0,0,720,721,1,0,0,0,721,722,5,111,0,0,
	722,725,3,92,46,0,723,724,5,74,0,0,724,726,3,172,86,0,725,723,1,0,0,0,725,
	726,1,0,0,0,726,727,1,0,0,0,727,728,5,67,0,0,728,731,5,23,0,0,729,730,5,
	121,0,0,730,732,3,172,86,0,731,729,1,0,0,0,731,732,1,0,0,0,732,95,1,0,0,
	0,733,734,5,77,0,0,734,735,5,23,0,0,735,97,1,0,0,0,736,737,5,85,0,0,737,
	738,5,131,0,0,738,739,5,129,0,0,739,740,5,131,0,0,740,99,1,0,0,0,741,742,
	5,81,0,0,742,743,5,94,0,0,743,745,5,131,0,0,744,746,3,152,76,0,745,744,
	1,0,0,0,745,746,1,0,0,0,746,749,1,0,0,0,747,748,5,95,0,0,748,750,3,172,
	86,0,749,747,1,0,0,0,749,750,1,0,0,0,750,752,1,0,0,0,751,753,3,22,11,0,
	752,751,1,0,0,0,752,753,1,0,0,0,753,101,1,0,0,0,754,755,5,97,0,0,755,756,
	5,100,0,0,756,757,5,131,0,0,757,758,5,4,0,0,758,760,3,160,80,0,759,761,
	5,40,0,0,760,759,1,0,0,0,760,761,1,0,0,0,761,764,1,0,0,0,762,763,5,74,0,
	0,763,765,3,172,86,0,764,762,1,0,0,0,764,765,1,0,0,0,765,103,1,0,0,0,766,
	767,5,97,0,0,767,768,5,53,0,0,768,771,5,131,0,0,769,770,5,74,0,0,770,772,
	3,172,86,0,771,769,1,0,0,0,771,772,1,0,0,0,772,776,1,0,0,0,773,774,5,55,
	0,0,774,775,5,95,0,0,775,777,3,172,86,0,776,773,1,0,0,0,776,777,1,0,0,0,
	777,105,1,0,0,0,778,779,5,93,0,0,779,780,3,172,86,0,780,781,5,23,0,0,781,
	107,1,0,0,0,782,783,5,80,0,0,783,784,5,131,0,0,784,785,5,4,0,0,785,786,
	3,154,77,0,786,787,5,44,0,0,787,788,5,74,0,0,788,791,3,172,86,0,789,790,
	5,125,0,0,790,792,5,23,0,0,791,789,1,0,0,0,791,792,1,0,0,0,792,795,1,0,
	0,0,793,794,5,43,0,0,794,796,5,23,0,0,795,793,1,0,0,0,795,796,1,0,0,0,796,
	800,1,0,0,0,797,798,5,98,0,0,798,799,5,113,0,0,799,801,3,172,86,0,800,797,
	1,0,0,0,800,801,1,0,0,0,801,805,1,0,0,0,802,803,5,114,0,0,803,804,5,113,
	0,0,804,806,3,172,86,0,805,802,1,0,0,0,805,806,1,0,0,0,806,809,1,0,0,0,
	807,808,5,95,0,0,808,810,3,172,86,0,809,807,1,0,0,0,809,810,1,0,0,0,810,
	813,1,0,0,0,811,812,5,54,0,0,812,814,3,172,86,0,813,811,1,0,0,0,813,814,
	1,0,0,0,814,837,1,0,0,0,815,819,5,6,0,0,816,818,5,17,0,0,817,816,1,0,0,
	0,818,821,1,0,0,0,819,817,1,0,0,0,819,820,1,0,0,0,820,827,1,0,0,0,821,819,
	1,0,0,0,822,823,3,106,53,0,823,824,3,164,82,0,824,826,1,0,0,0,825,822,1,
	0,0,0,826,829,1,0,0,0,827,825,1,0,0,0,827,828,1,0,0,0,828,833,1,0,0,0,829,
	827,1,0,0,0,830,832,5,17,0,0,831,830,1,0,0,0,832,835,1,0,0,0,833,831,1,
	0,0,0,833,834,1,0,0,0,834,836,1,0,0,0,835,833,1,0,0,0,836,838,5,7,0,0,837,
	815,1,0,0,0,837,838,1,0,0,0,838,109,1,0,0,0,839,840,7,3,0,0,840,111,1,0,
	0,0,841,861,3,6,3,0,842,861,3,8,4,0,843,861,3,10,5,0,844,861,3,12,6,0,845,
	861,3,20,10,0,846,861,3,26,13,0,847,861,3,28,14,0,848,861,3,36,18,0,849,
	861,3,38,19,0,850,861,3,48,24,0,851,861,3,90,45,0,852,861,3,94,47,0,853,
	861,3,96,48,0,854,861,3,100,50,0,855,861,3,98,49,0,856,861,3,102,51,0,857,
	861,3,104,52,0,858,861,3,82,41,0,859,861,3,80,40,0,860,841,1,0,0,0,860,
	842,1,0,0,0,860,843,1,0,0,0,860,844,1,0,0,0,860,845,1,0,0,0,860,846,1,0,
	0,0,860,847,1,0,0,0,860,848,1,0,0,0,860,849,1,0,0,0,860,850,1,0,0,0,860,
	851,1,0,0,0,860,852,1,0,0,0,860,853,1,0,0,0,860,854,1,0,0,0,860,855,1,0,
	0,0,860,856,1,0,0,0,860,857,1,0,0,0,860,858,1,0,0,0,860,859,1,0,0,0,861,
	113,1,0,0,0,862,863,3,110,55,0,863,864,5,50,0,0,864,865,5,131,0,0,865,869,
	5,6,0,0,866,868,5,17,0,0,867,866,1,0,0,0,868,871,1,0,0,0,869,867,1,0,0,
	0,869,870,1,0,0,0,870,877,1,0,0,0,871,869,1,0,0,0,872,873,3,112,56,0,873,
	874,3,164,82,0,874,876,1,0,0,0,875,872,1,0,0,0,876,879,1,0,0,0,877,875,
	1,0,0,0,877,878,1,0,0,0,878,883,1,0,0,0,879,877,1,0,0,0,880,882,5,17,0,
	0,881,880,1,0,0,0,882,885,1,0,0,0,883,881,1,0,0,0,883,884,1,0,0,0,884,886,
	1,0,0,0,885,883,1,0,0,0,886,887,5,7,0,0,887,115,1,0,0,0,888,889,5,94,0,
	0,889,891,5,131,0,0,890,892,3,152,76,0,891,890,1,0,0,0,891,892,1,0,0,0,
	892,895,1,0,0,0,893,894,5,8,0,0,894,896,3,160,80,0,895,893,1,0,0,0,895,
	896,1,0,0,0,896,117,1,0,0,0,897,899,5,96,0,0,898,897,1,0,0,0,898,899,1,
	0,0,0,899,900,1,0,0,0,900,901,5,80,0,0,901,902,3,154,77,0,902,119,1,0,0,
	0,903,908,3,154,77,0,904,905,5,2,0,0,905,906,3,172,86,0,906,907,5,3,0,0,
	907,909,1,0,0,0,908,904,1,0,0,0,908,909,1,0,0,0,909,121,1,0,0,0,910,912,
	5,126,0,0,911,910,1,0,0,0,911,912,1,0,0,0,912,913,1,0,0,0,913,914,3,120,
	60,0,914,915,5,8,0,0,915,916,3,120,60,0,916,123,1,0,0,0,917,918,5,51,0,
	0,918,919,5,131,0,0,919,923,5,6,0,0,920,922,5,17,0,0,921,920,1,0,0,0,922,
	925,1,0,0,0,923,921,1,0,0,0,923,924,1,0,0,0,924,931,1,0,0,0,925,923,1,0,
	0,0,926,927,3,122,61,0,927,928,3,162,81,0,928,930,1,0,0,0,929,926,1,0,0,
	0,930,933,1,0,0,0,931,929,1,0,0,0,931,932,1,0,0,0,932,937,1,0,0,0,933,931,
	1,0,0,0,934,936,5,17,0,0,935,934,1,0,0,0,936,939,1,0,0,0,937,935,1,0,0,
	0,937,938,1,0,0,0,938,940,1,0,0,0,939,937,1,0,0,0,940,941,5,7,0,0,941,125,
	1,0,0,0,942,951,5,49,0,0,943,951,5,63,0,0,944,945,5,120,0,0,945,951,5,63,
	0,0,946,951,5,71,0,0,947,951,5,91,0,0,948,951,5,119,0,0,949,951,5,122,0,
	0,950,942,1,0,0,0,950,943,1,0,0,0,950,944,1,0,0,0,950,946,1,0,0,0,950,947,
	1,0,0,0,950,948,1,0,0,0,950,949,1,0,0,0,951,127,1,0,0,0,952,958,3,154,77,
	0,953,954,3,162,81,0,954,955,3,154,77,0,955,957,1,0,0,0,956,953,1,0,0,0,
	957,960,1,0,0,0,958,956,1,0,0,0,958,959,1,0,0,0,959,962,1,0,0,0,960,958,
	1,0,0,0,961,963,3,162,81,0,962,961,1,0,0,0,962,963,1,0,0,0,963,129,1,0,
	0,0,964,965,3,126,63,0,965,966,5,51,0,0,966,967,5,80,0,0,967,969,3,154,
	77,0,968,970,3,128,64,0,969,968,1,0,0,0,969,970,1,0,0,0,970,131,1,0,0,0,
	971,972,5,76,0,0,972,973,3,154,77,0,973,133,1,0,0,0,974,980,3,118,59,0,
	975,980,3,124,62,0,976,980,3,130,65,0,977,980,3,132,66,0,978,980,3,96,48,
	0,979,974,1,0,0,0,979,975,1,0,0,0,979,976,1,0,0,0,979,977,1,0,0,0,979,978,
	1,0,0,0,980,135,1,0,0,0,981,982,5,123,0,0,982,983,5,131,0,0,983,987,5,6,
	0,0,984,986,5,17,0,0,985,984,1,0,0,0,986,989,1,0,0,0,987,985,1,0,0,0,987,
	988,1,0,0,0,988,995,1,0,0,0,989,987,1,0,0,0,990,991,3,134,67,0,991,992,
	3,164,82,0,992,994,1,0,0,0,993,990,1,0,0,0,994,997,1,0,0,0,995,993,1,0,
	0,0,995,996,1,0,0,0,996,1001,1,0,0,0,997,995,1,0,0,0,998,1000,5,17,0,0,
	999,998,1,0,0,0,1000,1003,1,0,0,0,1001,999,1,0,0,0,1001,1002,1,0,0,0,1002,
	1004,1,0,0,0,1003,1001,1,0,0,0,1004,1005,5,7,0,0,1005,137,1,0,0,0,1006,
	1007,7,4,0,0,1007,139,1,0,0,0,1008,1009,5,82,0,0,1009,1010,3,138,69,0,1010,
	1011,3,154,77,0,1011,1012,5,43,0,0,1012,1013,5,23,0,0,1013,141,1,0,0,0,
	1014,1029,3,6,3,0,1015,1029,3,8,4,0,1016,1029,3,10,5,0,1017,1029,3,114,
	57,0,1018,1029,3,108,54,0,1019,1029,3,12,6,0,1020,1029,3,144,72,0,1021,
	1029,3,116,58,0,1022,1029,3,20,10,0,1023,1029,3,140,70,0,1024,1029,3,90,
	45,0,1025,1029,3,96,48,0,1026,1029,3,136,68,0,1027,1029,3,80,40,0,1028,
	1014,1,0,0,0,1028,1015,1,0,0,0,1028,1016,1,0,0,0,1028,1017,1,0,0,0,1028,
	1018,1,0,0,0,1028,1019,1,0,0,0,1028,1020,1,0,0,0,1028,1021,1,0,0,0,1028,
	1022,1,0,0,0,1028,1023,1,0,0,0,1028,1024,1,0,0,0,1028,1025,1,0,0,0,1028,
	1026,1,0,0,0,1028,1027,1,0,0,0,1029,143,1,0,0,0,1030,1031,5,86,0,0,1031,
	1032,5,131,0,0,1032,1036,5,6,0,0,1033,1035,5,17,0,0,1034,1033,1,0,0,0,1035,
	1038,1,0,0,0,1036,1034,1,0,0,0,1036,1037,1,0,0,0,1037,1044,1,0,0,0,1038,
	1036,1,0,0,0,1039,1040,3,142,71,0,1040,1041,3,164,82,0,1041,1043,1,0,0,
	0,1042,1039,1,0,0,0,1043,1046,1,0,0,0,1044,1042,1,0,0,0,1044,1045,1,0,0,
	0,1045,1050,1,0,0,0,1046,1044,1,0,0,0,1047,1049,5,17,0,0,1048,1047,1,0,
	0,0,1049,1052,1,0,0,0,1050,1048,1,0,0,0,1050,1051,1,0,0,0,1051,1053,1,0,
	0,0,1052,1050,1,0,0,0,1053,1054,5,7,0,0,1054,145,1,0,0,0,1055,1057,5,103,
	0,0,1056,1055,1,0,0,0,1056,1057,1,0,0,0,1057,1058,1,0,0,0,1058,1059,5,131,
	0,0,1059,1060,5,4,0,0,1060,1061,3,160,80,0,1061,147,1,0,0,0,1062,1064,3,
	146,73,0,1063,1065,5,5,0,0,1064,1063,1,0,0,0,1064,1065,1,0,0,0,1065,1066,
	1,0,0,0,1066,1067,3,162,81,0,1067,149,1,0,0,0,1068,1073,3,146,73,0,1069,
	1071,5,5,0,0,1070,1069,1,0,0,0,1070,1071,1,0,0,0,1071,1072,1,0,0,0,1072,
	1074,3,162,81,0,1073,1070,1,0,0,0,1073,1074,1,0,0,0,1074,151,1,0,0,0,1075,
	1079,5,9,0,0,1076,1078,5,17,0,0,1077,1076,1,0,0,0,1078,1081,1,0,0,0,1079,
	1077,1,0,0,0,1079,1080,1,0,0,0,1080,1089,1,0,0,0,1081,1079,1,0,0,0,1082,
	1084,3,148,74,0,1083,1082,1,0,0,0,1084,1087,1,0,0,0,1085,1083,1,0,0,0,1085,
	1086,1,0,0,0,1086,1088,1,0,0,0,1087,1085,1,0,0,0,1088,1090,3,150,75,0,1089,
	1085,1,0,0,0,1089,1090,1,0,0,0,1090,1091,1,0,0,0,1091,1092,5,10,0,0,1092,
	153,1,0,0,0,1093,1098,5,131,0,0,1094,1095,5,11,0,0,1095,1097,5,131,0,0,
	1096,1094,1,0,0,0,1097,1100,1,0,0,0,1098,1096,1,0,0,0,1098,1099,1,0,0,0,
	1099,155,1,0,0,0,1100,1098,1,0,0,0,1101,1102,7,5,0,0,1102,157,1,0,0,0,1103,
	1110,7,6,0,0,1104,1107,5,116,0,0,1105,1106,5,113,0,0,1106,1108,5,25,0,0,
	1107,1105,1,0,0,0,1107,1108,1,0,0,0,1108,1110,1,0,0,0,1109,1103,1,0,0,0,
	1109,1104,1,0,0,0,1110,159,1,0,0,0,1111,1114,3,158,79,0,1112,1114,3,154,
	77,0,1113,1111,1,0,0,0,1113,1112,1,0,0,0,1114,161,1,0,0,0,1115,1119,5,5,
	0,0,1116,1118,5,17,0,0,1117,1116,1,0,0,0,1118,1121,1,0,0,0,1119,1117,1,
	0,0,0,1119,1120,1,0,0,0,1120,1128,1,0,0,0,1121,1119,1,0,0,0,1122,1124,5,
	17,0,0,1123,1122,1,0,0,0,1124,1125,1,0,0,0,1125,1123,1,0,0,0,1125,1126,
	1,0,0,0,1126,1128,1,0,0,0,1127,1115,1,0,0,0,1127,1123,1,0,0,0,1128,163,
	1,0,0,0,1129,1133,5,12,0,0,1130,1132,5,17,0,0,1131,1130,1,0,0,0,1132,1135,
	1,0,0,0,1133,1131,1,0,0,0,1133,1134,1,0,0,0,1134,1142,1,0,0,0,1135,1133,
	1,0,0,0,1136,1138,5,17,0,0,1137,1136,1,0,0,0,1138,1139,1,0,0,0,1139,1137,
	1,0,0,0,1139,1140,1,0,0,0,1140,1142,1,0,0,0,1141,1129,1,0,0,0,1141,1137,
	1,0,0,0,1142,165,1,0,0,0,1143,1147,5,2,0,0,1144,1146,5,17,0,0,1145,1144,
	1,0,0,0,1146,1149,1,0,0,0,1147,1145,1,0,0,0,1147,1148,1,0,0,0,1148,1159,
	1,0,0,0,1149,1147,1,0,0,0,1150,1156,3,172,86,0,1151,1152,3,162,81,0,1152,
	1153,3,172,86,0,1153,1155,1,0,0,0,1154,1151,1,0,0,0,1155,1158,1,0,0,0,1156,
	1154,1,0,0,0,1156,1157,1,0,0,0,1157,1160,1,0,0,0,1158,1156,1,0,0,0,1159,
	1150,1,0,0,0,1159,1160,1,0,0,0,1160,1161,1,0,0,0,1161,1162,5,3,0,0,1162,
	167,1,0,0,0,1163,1164,5,131,0,0,1164,1165,5,1,0,0,1165,1166,3,172,86,0,
	1166,169,1,0,0,0,1167,1171,5,6,0,0,1168,1170,5,17,0,0,1169,1168,1,0,0,0,
	1170,1173,1,0,0,0,1171,1169,1,0,0,0,1171,1172,1,0,0,0,1172,1186,1,0,0,0,
	1173,1171,1,0,0,0,1174,1180,3,168,84,0,1175,1176,3,162,81,0,1176,1177,3,
	168,84,0,1177,1179,1,0,0,0,1178,1175,1,0,0,0,1179,1182,1,0,0,0,1180,1178,
	1,0,0,0,1180,1181,1,0,0,0,1181,1184,1,0,0,0,1182,1180,1,0,0,0,1183,1185,
	3,162,81,0,1184,1183,1,0,0,0,1184,1185,1,0,0,0,1185,1187,1,0,0,0,1186,1174,
	1,0,0,0,1186,1187,1,0,0,0,1187,1188,1,0,0,0,1188,1189,5,7,0,0,1189,171,
	1,0,0,0,1190,1191,6,86,-1,0,1191,1192,5,13,0,0,1192,1205,3,172,86,11,1193,
	1205,3,166,83,0,1194,1205,3,170,85,0,1195,1205,3,154,77,0,1196,1205,5,22,
	0,0,1197,1205,5,24,0,0,1198,1205,5,25,0,0,1199,1205,5,23,0,0,1200,1201,
	5,9,0,0,1201,1202,3,172,86,0,1202,1203,5,10,0,0,1203,1205,1,0,0,0,1204,
	1190,1,0,0,0,1204,1193,1,0,0,0,1204,1194,1,0,0,0,1204,1195,1,0,0,0,1204,
	1196,1,0,0,0,1204,1197,1,0,0,0,1204,1198,1,0,0,0,1204,1199,1,0,0,0,1204,
	1200,1,0,0,0,1205,1214,1,0,0,0,1206,1207,10,10,0,0,1207,1208,7,7,0,0,1208,
	1213,3,172,86,11,1209,1210,10,9,0,0,1210,1211,7,8,0,0,1211,1213,3,172,86,
	10,1212,1206,1,0,0,0,1212,1209,1,0,0,0,1213,1216,1,0,0,0,1214,1212,1,0,
	0,0,1214,1215,1,0,0,0,1215,173,1,0,0,0,1216,1214,1,0,0,0,154,177,183,187,
	193,201,207,211,217,225,231,235,241,263,267,280,285,289,295,298,306,312,
	316,321,331,335,339,342,350,354,359,364,373,396,402,406,416,421,424,431,
	434,445,454,458,460,467,475,479,483,487,491,497,513,519,526,535,538,541,
	546,556,562,578,586,594,600,604,612,616,625,633,639,643,653,656,661,665,
	671,674,680,686,692,696,701,714,719,725,731,745,749,752,760,764,771,776,
	791,795,800,805,809,813,819,827,833,837,860,869,877,883,891,895,898,908,
	911,923,931,937,950,958,962,969,979,987,995,1001,1028,1036,1044,1050,1056,
	1064,1070,1073,1079,1085,1089,1098,1107,1109,1113,1119,1125,1127,1133,1139,
	1141,1147,1156,1159,1171,1180,1184,1186,1204,1212,1214];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FppParser.__ATN) {
			FppParser.__ATN = new ATNDeserializer().deserialize(FppParser._serializedATN);
		}

		return FppParser.__ATN;
	}


	static DecisionsToDFA = FppParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.EOF);
	}
	public EOF(i: number): TerminalNode {
		return this.getToken(FppParser.EOF, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public moduleMember_list(): ModuleMemberContext[] {
		return this.getTypedRuleContexts(ModuleMemberContext) as ModuleMemberContext[];
	}
	public moduleMember(i: number): ModuleMemberContext {
		return this.getTypedRuleContext(ModuleMemberContext, i) as ModuleMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_prog;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProgTopologyContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.EOF);
	}
	public EOF(i: number): TerminalNode {
		return this.getToken(FppParser.EOF, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public topologyMember_list(): TopologyMemberContext[] {
		return this.getTypedRuleContexts(TopologyMemberContext) as TopologyMemberContext[];
	}
	public topologyMember(i: number): TopologyMemberContext {
		return this.getTypedRuleContext(TopologyMemberContext, i) as TopologyMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_progTopology;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitProgTopology) {
			return visitor.visitProgTopology(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProgComponentContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.EOF);
	}
	public EOF(i: number): TerminalNode {
		return this.getToken(FppParser.EOF, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public componentMember_list(): ComponentMemberContext[] {
		return this.getTypedRuleContexts(ComponentMemberContext) as ComponentMemberContext[];
	}
	public componentMember(i: number): ComponentMemberContext {
		return this.getTypedRuleContext(ComponentMemberContext, i) as ComponentMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_progComponent;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitProgComponent) {
			return visitor.visitProgComponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AbstractTypeDeclContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TYPE(): TerminalNode {
		return this.getToken(FppParser.TYPE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_abstractTypeDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitAbstractTypeDecl) {
			return visitor.visitAbstractTypeDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasTypeDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TYPE(): TerminalNode {
		return this.getToken(FppParser.TYPE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_aliasTypeDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitAliasTypeDecl) {
			return visitor.visitAliasTypeDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _size!: ExprContext;
	public _type_!: TypeNameContext;
	public _default_!: ExprContext;
	public _format!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ARRAY(): TerminalNode {
		return this.getToken(FppParser.ARRAY, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(FppParser.DEFAULT, 0);
	}
	public FORMAT(): TerminalNode {
		return this.getToken(FppParser.FORMAT, 0);
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_arrayDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitArrayDecl) {
			return visitor.visitArrayDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _value!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONSTANT(): TerminalNode {
		return this.getToken(FppParser.CONSTANT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_constantDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitConstantDecl) {
			return visitor.visitConstantDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructMemberContext extends ParserRuleContext {
	public _name!: Token;
	public _size!: ExprContext;
	public _type_!: TypeNameContext;
	public _format!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public FORMAT(): TerminalNode {
		return this.getToken(FppParser.FORMAT, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructMember) {
			return visitor.visitStructMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructMemberNContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structMember(): StructMemberContext {
		return this.getTypedRuleContext(StructMemberContext, 0) as StructMemberContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structMemberN;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructMemberN) {
			return visitor.visitStructMemberN(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructMemberLContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structMember(): StructMemberContext {
		return this.getTypedRuleContext(StructMemberContext, 0) as StructMemberContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structMemberL;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructMemberL) {
			return visitor.visitStructMemberL(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _default_!: StructExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRUCT(): TerminalNode {
		return this.getToken(FppParser.STRUCT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public structMemberL(): StructMemberLContext {
		return this.getTypedRuleContext(StructMemberLContext, 0) as StructMemberLContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(FppParser.DEFAULT, 0);
	}
	public structExpr(): StructExprContext {
		return this.getTypedRuleContext(StructExprContext, 0) as StructExprContext;
	}
	public structMemberN_list(): StructMemberNContext[] {
		return this.getTypedRuleContexts(StructMemberNContext) as StructMemberNContext[];
	}
	public structMemberN(i: number): StructMemberNContext {
		return this.getTypedRuleContext(StructMemberNContext, i) as StructMemberNContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructDecl) {
			return visitor.visitStructDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueueFullBehaviorContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASSERT(): TerminalNode {
		return this.getToken(FppParser.ASSERT, 0);
	}
	public BLOCK(): TerminalNode {
		return this.getToken(FppParser.BLOCK, 0);
	}
	public DROP(): TerminalNode {
		return this.getToken(FppParser.DROP, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_queueFullBehavior;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitQueueFullBehavior) {
			return visitor.visitQueueFullBehavior(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommandKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASYNC(): TerminalNode {
		return this.getToken(FppParser.ASYNC, 0);
	}
	public GUARDED(): TerminalNode {
		return this.getToken(FppParser.GUARDED, 0);
	}
	public SYNC(): TerminalNode {
		return this.getToken(FppParser.SYNC, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_commandKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitCommandKind) {
			return visitor.visitCommandKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommandDeclContext extends ParserRuleContext {
	public _kind!: CommandKindContext;
	public _name!: Token;
	public _params!: FormalParameterListContext;
	public _opcode!: ExprContext;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COMMAND(): TerminalNode {
		return this.getToken(FppParser.COMMAND, 0);
	}
	public commandKind(): CommandKindContext {
		return this.getTypedRuleContext(CommandKindContext, 0) as CommandKindContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public OPCODE(): TerminalNode {
		return this.getToken(FppParser.OPCODE, 0);
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public formalParameterList(): FormalParameterListContext {
		return this.getTypedRuleContext(FormalParameterListContext, 0) as FormalParameterListContext;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public queueFullBehavior(): QueueFullBehaviorContext {
		return this.getTypedRuleContext(QueueFullBehaviorContext, 0) as QueueFullBehaviorContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_commandDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitCommandDecl) {
			return visitor.visitCommandDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	public _default_!: ExprContext;
	public _id!: ExprContext;
	public _setOpcode!: ExprContext;
	public _saveOpcode!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PARAM(): TerminalNode {
		return this.getToken(FppParser.PARAM, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(FppParser.DEFAULT, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public SET(): TerminalNode {
		return this.getToken(FppParser.SET, 0);
	}
	public OPCODE_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.OPCODE);
	}
	public OPCODE(i: number): TerminalNode {
		return this.getToken(FppParser.OPCODE, i);
	}
	public SAVE(): TerminalNode {
		return this.getToken(FppParser.SAVE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_paramDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitParamDecl) {
			return visitor.visitParamDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GeneralPortKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASYNC(): TerminalNode {
		return this.getToken(FppParser.ASYNC, 0);
	}
	public INPUT(): TerminalNode {
		return this.getToken(FppParser.INPUT, 0);
	}
	public GUARDED(): TerminalNode {
		return this.getToken(FppParser.GUARDED, 0);
	}
	public SYNC(): TerminalNode {
		return this.getToken(FppParser.SYNC, 0);
	}
	public OUTPUT(): TerminalNode {
		return this.getToken(FppParser.OUTPUT, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_generalPortKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitGeneralPortKind) {
			return visitor.visitGeneralPortKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecialPortKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COMMAND(): TerminalNode {
		return this.getToken(FppParser.COMMAND, 0);
	}
	public RECV(): TerminalNode {
		return this.getToken(FppParser.RECV, 0);
	}
	public REG(): TerminalNode {
		return this.getToken(FppParser.REG, 0);
	}
	public RESP(): TerminalNode {
		return this.getToken(FppParser.RESP, 0);
	}
	public EVENT(): TerminalNode {
		return this.getToken(FppParser.EVENT, 0);
	}
	public PARAM(): TerminalNode {
		return this.getToken(FppParser.PARAM, 0);
	}
	public GET(): TerminalNode {
		return this.getToken(FppParser.GET, 0);
	}
	public SET(): TerminalNode {
		return this.getToken(FppParser.SET, 0);
	}
	public TELEMETRY(): TerminalNode {
		return this.getToken(FppParser.TELEMETRY, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(FppParser.TEXT, 0);
	}
	public TIME(): TerminalNode {
		return this.getToken(FppParser.TIME, 0);
	}
	public PRODUCT(): TerminalNode {
		return this.getToken(FppParser.PRODUCT, 0);
	}
	public REQUEST(): TerminalNode {
		return this.getToken(FppParser.REQUEST, 0);
	}
	public ASYNC(): TerminalNode {
		return this.getToken(FppParser.ASYNC, 0);
	}
	public SEND(): TerminalNode {
		return this.getToken(FppParser.SEND, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_specialPortKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitSpecialPortKind) {
			return visitor.visitSpecialPortKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GeneralPortInstanceTypeContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SERIAL(): TerminalNode {
		return this.getToken(FppParser.SERIAL, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_generalPortInstanceType;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitGeneralPortInstanceType) {
			return visitor.visitGeneralPortInstanceType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GeneralPortInstanceDeclContext extends ParserRuleContext {
	public _kind!: GeneralPortKindContext;
	public _name!: Token;
	public _n!: ExprContext;
	public _type_!: GeneralPortInstanceTypeContext;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PORT(): TerminalNode {
		return this.getToken(FppParser.PORT, 0);
	}
	public generalPortKind(): GeneralPortKindContext {
		return this.getTypedRuleContext(GeneralPortKindContext, 0) as GeneralPortKindContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public generalPortInstanceType(): GeneralPortInstanceTypeContext {
		return this.getTypedRuleContext(GeneralPortInstanceTypeContext, 0) as GeneralPortInstanceTypeContext;
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public queueFullBehavior(): QueueFullBehaviorContext {
		return this.getTypedRuleContext(QueueFullBehaviorContext, 0) as QueueFullBehaviorContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_generalPortInstanceDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitGeneralPortInstanceDecl) {
			return visitor.visitGeneralPortInstanceDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecialPortInstanceDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public specialPortKind(): SpecialPortKindContext {
		return this.getTypedRuleContext(SpecialPortKindContext, 0) as SpecialPortKindContext;
	}
	public PORT(): TerminalNode {
		return this.getToken(FppParser.PORT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public queueFullBehavior(): QueueFullBehaviorContext {
		return this.getTypedRuleContext(QueueFullBehaviorContext, 0) as QueueFullBehaviorContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_specialPortInstanceDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitSpecialPortInstanceDecl) {
			return visitor.visitSpecialPortInstanceDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryLimitKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RED(): TerminalNode {
		return this.getToken(FppParser.RED, 0);
	}
	public ORANGE(): TerminalNode {
		return this.getToken(FppParser.ORANGE, 0);
	}
	public YELLOW(): TerminalNode {
		return this.getToken(FppParser.YELLOW, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_telemetryLimitKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryLimitKind) {
			return visitor.visitTelemetryLimitKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryLimitExprContext extends ParserRuleContext {
	public _kind!: TelemetryLimitKindContext;
	public _limit!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public telemetryLimitKind(): TelemetryLimitKindContext {
		return this.getTypedRuleContext(TelemetryLimitKindContext, 0) as TelemetryLimitKindContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_telemetryLimitExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryLimitExpr) {
			return visitor.visitTelemetryLimitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryLimitContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public telemetryLimitExpr_list(): TelemetryLimitExprContext[] {
		return this.getTypedRuleContexts(TelemetryLimitExprContext) as TelemetryLimitExprContext[];
	}
	public telemetryLimitExpr(i: number): TelemetryLimitExprContext {
		return this.getTypedRuleContext(TelemetryLimitExprContext, i) as TelemetryLimitExprContext;
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_telemetryLimit;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryLimit) {
			return visitor.visitTelemetryLimit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryUpdateContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ALWAYS(): TerminalNode {
		return this.getToken(FppParser.ALWAYS, 0);
	}
	public ON(): TerminalNode {
		return this.getToken(FppParser.ON, 0);
	}
	public CHANGE(): TerminalNode {
		return this.getToken(FppParser.CHANGE, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_telemetryUpdate;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryUpdate) {
			return visitor.visitTelemetryUpdate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryChannelDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	public _id!: ExprContext;
	public _update!: TelemetryUpdateContext;
	public _format!: Token;
	public _low!: TelemetryLimitContext;
	public _high!: TelemetryLimitContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TELEMETRY(): TerminalNode {
		return this.getToken(FppParser.TELEMETRY, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public UPDATE(): TerminalNode {
		return this.getToken(FppParser.UPDATE, 0);
	}
	public FORMAT(): TerminalNode {
		return this.getToken(FppParser.FORMAT, 0);
	}
	public LOW(): TerminalNode {
		return this.getToken(FppParser.LOW, 0);
	}
	public HIGH(): TerminalNode {
		return this.getToken(FppParser.HIGH, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public telemetryUpdate(): TelemetryUpdateContext {
		return this.getTypedRuleContext(TelemetryUpdateContext, 0) as TelemetryUpdateContext;
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
	public telemetryLimit_list(): TelemetryLimitContext[] {
		return this.getTypedRuleContexts(TelemetryLimitContext) as TelemetryLimitContext[];
	}
	public telemetryLimit(i: number): TelemetryLimitContext {
		return this.getTypedRuleContext(TelemetryLimitContext, i) as TelemetryLimitContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_telemetryChannelDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryChannelDecl) {
			return visitor.visitTelemetryChannelDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionDefContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTION(): TerminalNode {
		return this.getToken(FppParser.ACTION, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_actionDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitActionDef) {
			return visitor.visitActionDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChoiceDefContext extends ParserRuleContext {
	public _name!: Token;
	public _guard!: Token;
	public _then!: TransitionExprContext;
	public _else_!: TransitionExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CHOICE(): TerminalNode {
		return this.getToken(FppParser.CHOICE, 0);
	}
	public IF(): TerminalNode {
		return this.getToken(FppParser.IF, 0);
	}
	public ELSE(): TerminalNode {
		return this.getToken(FppParser.ELSE, 0);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, i);
	}
	public transitionExpr_list(): TransitionExprContext[] {
		return this.getTypedRuleContexts(TransitionExprContext) as TransitionExprContext[];
	}
	public transitionExpr(i: number): TransitionExprContext {
		return this.getTypedRuleContext(TransitionExprContext, i) as TransitionExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_choiceDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitChoiceDef) {
			return visitor.visitChoiceDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GuardDefContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GUARD(): TerminalNode {
		return this.getToken(FppParser.GUARD, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_guardDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitGuardDef) {
			return visitor.visitGuardDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SignalDefContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SIGNAL(): TerminalNode {
		return this.getToken(FppParser.SIGNAL, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_signalDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitSignalDef) {
			return visitor.visitSignalDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoExprContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DO(): TerminalNode {
		return this.getToken(FppParser.DO, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, i);
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_doExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitDoExpr) {
			return visitor.visitDoExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransitionExprContext extends ParserRuleContext {
	public _do_!: DoExprContext;
	public _state_!: QualIdentContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ENTER(): TerminalNode {
		return this.getToken(FppParser.ENTER, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public doExpr(): DoExprContext {
		return this.getTypedRuleContext(DoExprContext, 0) as DoExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_transitionExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTransitionExpr) {
			return visitor.visitTransitionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitialTransitionContext extends ParserRuleContext {
	public _transition!: TransitionExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INITIAL(): TerminalNode {
		return this.getToken(FppParser.INITIAL, 0);
	}
	public transitionExpr(): TransitionExprContext {
		return this.getTypedRuleContext(TransitionExprContext, 0) as TransitionExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_initialTransition;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInitialTransition) {
			return visitor.visitInitialTransition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransitionOrDoExprContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public transitionExpr(): TransitionExprContext {
		return this.getTypedRuleContext(TransitionExprContext, 0) as TransitionExprContext;
	}
	public doExpr(): DoExprContext {
		return this.getTypedRuleContext(DoExprContext, 0) as DoExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_transitionOrDoExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTransitionOrDoExpr) {
			return visitor.visitTransitionOrDoExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateTransitionContext extends ParserRuleContext {
	public _signal!: Token;
	public _guard!: Token;
	public _transition!: TransitionOrDoExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ON(): TerminalNode {
		return this.getToken(FppParser.ON, 0);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, i);
	}
	public transitionOrDoExpr(): TransitionOrDoExprContext {
		return this.getTypedRuleContext(TransitionOrDoExprContext, 0) as TransitionOrDoExprContext;
	}
	public IF(): TerminalNode {
		return this.getToken(FppParser.IF, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateTransition;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateTransition) {
			return visitor.visitStateTransition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateEntryContext extends ParserRuleContext {
	public _do_!: DoExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ENTRY(): TerminalNode {
		return this.getToken(FppParser.ENTRY, 0);
	}
	public doExpr(): DoExprContext {
		return this.getTypedRuleContext(DoExprContext, 0) as DoExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateEntry;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateEntry) {
			return visitor.visitStateEntry(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateExitContext extends ParserRuleContext {
	public _do_!: DoExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EXIT(): TerminalNode {
		return this.getToken(FppParser.EXIT, 0);
	}
	public doExpr(): DoExprContext {
		return this.getTypedRuleContext(DoExprContext, 0) as DoExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateExit;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateExit) {
			return visitor.visitStateExit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMemberContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public initialTransition(): InitialTransitionContext {
		return this.getTypedRuleContext(InitialTransitionContext, 0) as InitialTransitionContext;
	}
	public choiceDef(): ChoiceDefContext {
		return this.getTypedRuleContext(ChoiceDefContext, 0) as ChoiceDefContext;
	}
	public stateDef(): StateDefContext {
		return this.getTypedRuleContext(StateDefContext, 0) as StateDefContext;
	}
	public stateTransition(): StateTransitionContext {
		return this.getTypedRuleContext(StateTransitionContext, 0) as StateTransitionContext;
	}
	public stateEntry(): StateEntryContext {
		return this.getTypedRuleContext(StateEntryContext, 0) as StateEntryContext;
	}
	public stateExit(): StateExitContext {
		return this.getTypedRuleContext(StateExitContext, 0) as StateExitContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMember) {
			return visitor.visitStateMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateDefContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STATE(): TerminalNode {
		return this.getToken(FppParser.STATE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public stateMember_list(): StateMemberContext[] {
		return this.getTypedRuleContexts(StateMemberContext) as StateMemberContext[];
	}
	public stateMember(i: number): StateMemberContext {
		return this.getTypedRuleContext(StateMemberContext, i) as StateMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateDef) {
			return visitor.visitStateDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMachineMemberTemplContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public choiceDef(): ChoiceDefContext {
		return this.getTypedRuleContext(ChoiceDefContext, 0) as ChoiceDefContext;
	}
	public guardDef(): GuardDefContext {
		return this.getTypedRuleContext(GuardDefContext, 0) as GuardDefContext;
	}
	public initialTransition(): InitialTransitionContext {
		return this.getTypedRuleContext(InitialTransitionContext, 0) as InitialTransitionContext;
	}
	public signalDef(): SignalDefContext {
		return this.getTypedRuleContext(SignalDefContext, 0) as SignalDefContext;
	}
	public stateDef(): StateDefContext {
		return this.getTypedRuleContext(StateDefContext, 0) as StateDefContext;
	}
	public actionDef(): ActionDefContext {
		return this.getTypedRuleContext(ActionDefContext, 0) as ActionDefContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateMachineMemberTempl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMachineMemberTempl) {
			return visitor.visitStateMachineMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMachineMemberContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stateMachineMemberTempl(): StateMachineMemberTemplContext {
		return this.getTypedRuleContext(StateMachineMemberTemplContext, 0) as StateMachineMemberTemplContext;
	}
	public ANNOTATION(): TerminalNode {
		return this.getToken(FppParser.ANNOTATION, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateMachineMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMachineMember) {
			return visitor.visitStateMachineMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMachineDefContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STATE(): TerminalNode {
		return this.getToken(FppParser.STATE, 0);
	}
	public MACHINE(): TerminalNode {
		return this.getToken(FppParser.MACHINE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public stateMachineMember_list(): StateMachineMemberContext[] {
		return this.getTypedRuleContexts(StateMachineMemberContext) as StateMachineMemberContext[];
	}
	public stateMachineMember(i: number): StateMachineMemberContext {
		return this.getTypedRuleContext(StateMachineMemberContext, i) as StateMachineMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateMachineDef;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMachineDef) {
			return visitor.visitStateMachineDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMachineInstanceContext extends ParserRuleContext {
	public _name!: Token;
	public _stateMachine!: QualIdentContext;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STATE(): TerminalNode {
		return this.getToken(FppParser.STATE, 0);
	}
	public MACHINE(): TerminalNode {
		return this.getToken(FppParser.MACHINE, 0);
	}
	public INSTANCE(): TerminalNode {
		return this.getToken(FppParser.INSTANCE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public queueFullBehavior(): QueueFullBehaviorContext {
		return this.getTypedRuleContext(QueueFullBehaviorContext, 0) as QueueFullBehaviorContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_stateMachineInstance;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMachineInstance) {
			return visitor.visitStateMachineInstance(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumMemberContext extends ParserRuleContext {
	public _name!: Token;
	public _value!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_enumMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEnumMember) {
			return visitor.visitEnumMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumMemberNContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public enumMember(): EnumMemberContext {
		return this.getTypedRuleContext(EnumMemberContext, 0) as EnumMemberContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_enumMemberN;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEnumMemberN) {
			return visitor.visitEnumMemberN(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumMemberLContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public enumMember(): EnumMemberContext {
		return this.getTypedRuleContext(EnumMemberContext, 0) as EnumMemberContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_enumMemberL;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEnumMemberL) {
			return visitor.visitEnumMemberL(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: IntTypeContext;
	public _default_!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ENUM(): TerminalNode {
		return this.getToken(FppParser.ENUM, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public enumMemberL(): EnumMemberLContext {
		return this.getTypedRuleContext(EnumMemberLContext, 0) as EnumMemberLContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(FppParser.DEFAULT, 0);
	}
	public intType(): IntTypeContext {
		return this.getTypedRuleContext(IntTypeContext, 0) as IntTypeContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public enumMemberN_list(): EnumMemberNContext[] {
		return this.getTypedRuleContexts(EnumMemberNContext) as EnumMemberNContext[];
	}
	public enumMemberN(i: number): EnumMemberNContext {
		return this.getTypedRuleContext(EnumMemberNContext, i) as EnumMemberNContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_enumDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEnumDecl) {
			return visitor.visitEnumDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EventSeverityContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTIVITY(): TerminalNode {
		return this.getToken(FppParser.ACTIVITY, 0);
	}
	public HIGH(): TerminalNode {
		return this.getToken(FppParser.HIGH, 0);
	}
	public LOW(): TerminalNode {
		return this.getToken(FppParser.LOW, 0);
	}
	public COMMAND(): TerminalNode {
		return this.getToken(FppParser.COMMAND, 0);
	}
	public DIAGNOSTIC(): TerminalNode {
		return this.getToken(FppParser.DIAGNOSTIC, 0);
	}
	public FATAL(): TerminalNode {
		return this.getToken(FppParser.FATAL, 0);
	}
	public WARNING(): TerminalNode {
		return this.getToken(FppParser.WARNING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_eventSeverity;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEventSeverity) {
			return visitor.visitEventSeverity(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EventDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _params!: FormalParameterListContext;
	public _id!: ExprContext;
	public _format!: Token;
	public _throttle!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EVENT(): TerminalNode {
		return this.getToken(FppParser.EVENT, 0);
	}
	public SEVERITY(): TerminalNode {
		return this.getToken(FppParser.SEVERITY, 0);
	}
	public eventSeverity(): EventSeverityContext {
		return this.getTypedRuleContext(EventSeverityContext, 0) as EventSeverityContext;
	}
	public FORMAT(): TerminalNode {
		return this.getToken(FppParser.FORMAT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public THROTTLE(): TerminalNode {
		return this.getToken(FppParser.THROTTLE, 0);
	}
	public formalParameterList(): FormalParameterListContext {
		return this.getTypedRuleContext(FormalParameterListContext, 0) as FormalParameterListContext;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_eventDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitEventDecl) {
			return visitor.visitEventDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeStmtContext extends ParserRuleContext {
	public _include!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INCLUDE(): TerminalNode {
		return this.getToken(FppParser.INCLUDE, 0);
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_includeStmt;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitIncludeStmt) {
			return visitor.visitIncludeStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchStmtContext extends ParserRuleContext {
	public _match!: Token;
	public _with_!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MATCH(): TerminalNode {
		return this.getToken(FppParser.MATCH, 0);
	}
	public WITH(): TerminalNode {
		return this.getToken(FppParser.WITH, 0);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, i);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_matchStmt;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitMatchStmt) {
			return visitor.visitMatchStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InternalPortDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _params!: FormalParameterListContext;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTERNAL(): TerminalNode {
		return this.getToken(FppParser.INTERNAL, 0);
	}
	public PORT(): TerminalNode {
		return this.getToken(FppParser.PORT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public formalParameterList(): FormalParameterListContext {
		return this.getTypedRuleContext(FormalParameterListContext, 0) as FormalParameterListContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public queueFullBehavior(): QueueFullBehaviorContext {
		return this.getTypedRuleContext(QueueFullBehaviorContext, 0) as QueueFullBehaviorContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_internalPortDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInternalPortDecl) {
			return visitor.visitInternalPortDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecordSpecifierDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _fppType!: TypeNameContext;
	public _id!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PRODUCT(): TerminalNode {
		return this.getToken(FppParser.PRODUCT, 0);
	}
	public RECORD(): TerminalNode {
		return this.getToken(FppParser.RECORD, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public ARRAY(): TerminalNode {
		return this.getToken(FppParser.ARRAY, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_recordSpecifierDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitRecordSpecifierDecl) {
			return visitor.visitRecordSpecifierDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContainerSpecifierDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _id!: ExprContext;
	public _priority!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PRODUCT(): TerminalNode {
		return this.getToken(FppParser.PRODUCT, 0);
	}
	public CONTAINER(): TerminalNode {
		return this.getToken(FppParser.CONTAINER, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(FppParser.DEFAULT, 0);
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_containerSpecifierDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitContainerSpecifierDecl) {
			return visitor.visitContainerSpecifierDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitSpecifierContext extends ParserRuleContext {
	public _phaseExpr!: ExprContext;
	public _code!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PHASE(): TerminalNode {
		return this.getToken(FppParser.PHASE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_initSpecifier;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInitSpecifier) {
			return visitor.visitInitSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentInstanceDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _fppType!: QualIdentContext;
	public _base_id!: ExprContext;
	public _cppType!: Token;
	public _at!: Token;
	public _queueSize!: ExprContext;
	public _stackSize!: ExprContext;
	public _priority!: ExprContext;
	public _cpu!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INSTANCE(): TerminalNode {
		return this.getToken(FppParser.INSTANCE, 0);
	}
	public BASE(): TerminalNode {
		return this.getToken(FppParser.BASE, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(FppParser.ID, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public TYPE(): TerminalNode {
		return this.getToken(FppParser.TYPE, 0);
	}
	public AT(): TerminalNode {
		return this.getToken(FppParser.AT, 0);
	}
	public QUEUE(): TerminalNode {
		return this.getToken(FppParser.QUEUE, 0);
	}
	public SIZE_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.SIZE);
	}
	public SIZE(i: number): TerminalNode {
		return this.getToken(FppParser.SIZE, i);
	}
	public STACK(): TerminalNode {
		return this.getToken(FppParser.STACK, 0);
	}
	public PRIORITY(): TerminalNode {
		return this.getToken(FppParser.PRIORITY, 0);
	}
	public CPU(): TerminalNode {
		return this.getToken(FppParser.CPU, 0);
	}
	public LIT_STRING_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.LIT_STRING);
	}
	public LIT_STRING(i: number): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public initSpecifier_list(): InitSpecifierContext[] {
		return this.getTypedRuleContexts(InitSpecifierContext) as InitSpecifierContext[];
	}
	public initSpecifier(i: number): InitSpecifierContext {
		return this.getTypedRuleContext(InitSpecifierContext, i) as InitSpecifierContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_componentInstanceDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentInstanceDecl) {
			return visitor.visitComponentInstanceDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTIVE(): TerminalNode {
		return this.getToken(FppParser.ACTIVE, 0);
	}
	public PASSIVE(): TerminalNode {
		return this.getToken(FppParser.PASSIVE, 0);
	}
	public QUEUED(): TerminalNode {
		return this.getToken(FppParser.QUEUED, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_componentKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentKind) {
			return visitor.visitComponentKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentMemberContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public abstractTypeDecl(): AbstractTypeDeclContext {
		return this.getTypedRuleContext(AbstractTypeDeclContext, 0) as AbstractTypeDeclContext;
	}
	public aliasTypeDecl(): AliasTypeDeclContext {
		return this.getTypedRuleContext(AliasTypeDeclContext, 0) as AliasTypeDeclContext;
	}
	public arrayDecl(): ArrayDeclContext {
		return this.getTypedRuleContext(ArrayDeclContext, 0) as ArrayDeclContext;
	}
	public constantDecl(): ConstantDeclContext {
		return this.getTypedRuleContext(ConstantDeclContext, 0) as ConstantDeclContext;
	}
	public structDecl(): StructDeclContext {
		return this.getTypedRuleContext(StructDeclContext, 0) as StructDeclContext;
	}
	public commandDecl(): CommandDeclContext {
		return this.getTypedRuleContext(CommandDeclContext, 0) as CommandDeclContext;
	}
	public paramDecl(): ParamDeclContext {
		return this.getTypedRuleContext(ParamDeclContext, 0) as ParamDeclContext;
	}
	public generalPortInstanceDecl(): GeneralPortInstanceDeclContext {
		return this.getTypedRuleContext(GeneralPortInstanceDeclContext, 0) as GeneralPortInstanceDeclContext;
	}
	public specialPortInstanceDecl(): SpecialPortInstanceDeclContext {
		return this.getTypedRuleContext(SpecialPortInstanceDeclContext, 0) as SpecialPortInstanceDeclContext;
	}
	public telemetryChannelDecl(): TelemetryChannelDeclContext {
		return this.getTypedRuleContext(TelemetryChannelDeclContext, 0) as TelemetryChannelDeclContext;
	}
	public enumDecl(): EnumDeclContext {
		return this.getTypedRuleContext(EnumDeclContext, 0) as EnumDeclContext;
	}
	public eventDecl(): EventDeclContext {
		return this.getTypedRuleContext(EventDeclContext, 0) as EventDeclContext;
	}
	public includeStmt(): IncludeStmtContext {
		return this.getTypedRuleContext(IncludeStmtContext, 0) as IncludeStmtContext;
	}
	public internalPortDecl(): InternalPortDeclContext {
		return this.getTypedRuleContext(InternalPortDeclContext, 0) as InternalPortDeclContext;
	}
	public matchStmt(): MatchStmtContext {
		return this.getTypedRuleContext(MatchStmtContext, 0) as MatchStmtContext;
	}
	public recordSpecifierDecl(): RecordSpecifierDeclContext {
		return this.getTypedRuleContext(RecordSpecifierDeclContext, 0) as RecordSpecifierDeclContext;
	}
	public containerSpecifierDecl(): ContainerSpecifierDeclContext {
		return this.getTypedRuleContext(ContainerSpecifierDeclContext, 0) as ContainerSpecifierDeclContext;
	}
	public stateMachineInstance(): StateMachineInstanceContext {
		return this.getTypedRuleContext(StateMachineInstanceContext, 0) as StateMachineInstanceContext;
	}
	public stateMachineDef(): StateMachineDefContext {
		return this.getTypedRuleContext(StateMachineDefContext, 0) as StateMachineDefContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_componentMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentMember) {
			return visitor.visitComponentMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentDeclContext extends ParserRuleContext {
	public _kind!: ComponentKindContext;
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COMPONENT(): TerminalNode {
		return this.getToken(FppParser.COMPONENT, 0);
	}
	public componentKind(): ComponentKindContext {
		return this.getTypedRuleContext(ComponentKindContext, 0) as ComponentKindContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public componentMember_list(): ComponentMemberContext[] {
		return this.getTypedRuleContexts(ComponentMemberContext) as ComponentMemberContext[];
	}
	public componentMember(i: number): ComponentMemberContext {
		return this.getTypedRuleContext(ComponentMemberContext, i) as ComponentMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_componentDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentDecl) {
			return visitor.visitComponentDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PortDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _params!: FormalParameterListContext;
	public _returnType!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PORT(): TerminalNode {
		return this.getToken(FppParser.PORT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public formalParameterList(): FormalParameterListContext {
		return this.getTypedRuleContext(FormalParameterListContext, 0) as FormalParameterListContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_portDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPortDecl) {
			return visitor.visitPortDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentInstanceSpecContext extends ParserRuleContext {
	public _name!: QualIdentContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INSTANCE(): TerminalNode {
		return this.getToken(FppParser.INSTANCE, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public PRIVATE(): TerminalNode {
		return this.getToken(FppParser.PRIVATE, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_componentInstanceSpec;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentInstanceSpec) {
			return visitor.visitComponentInstanceSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConnectionNodeContext extends ParserRuleContext {
	public _node!: QualIdentContext;
	public _index!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_connectionNode;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitConnectionNode) {
			return visitor.visitConnectionNode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConnectionContext extends ParserRuleContext {
	public _source!: ConnectionNodeContext;
	public _destination!: ConnectionNodeContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public connectionNode_list(): ConnectionNodeContext[] {
		return this.getTypedRuleContexts(ConnectionNodeContext) as ConnectionNodeContext[];
	}
	public connectionNode(i: number): ConnectionNodeContext {
		return this.getTypedRuleContext(ConnectionNodeContext, i) as ConnectionNodeContext;
	}
	public UNMATCHED(): TerminalNode {
		return this.getToken(FppParser.UNMATCHED, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_connection;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitConnection) {
			return visitor.visitConnection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectGraphDeclContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONNECTIONS(): TerminalNode {
		return this.getToken(FppParser.CONNECTIONS, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public connection_list(): ConnectionContext[] {
		return this.getTypedRuleContexts(ConnectionContext) as ConnectionContext[];
	}
	public connection(i: number): ConnectionContext {
		return this.getTypedRuleContext(ConnectionContext, i) as ConnectionContext;
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_directGraphDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitDirectGraphDecl) {
			return visitor.visitDirectGraphDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COMMAND(): TerminalNode {
		return this.getToken(FppParser.COMMAND, 0);
	}
	public EVENT(): TerminalNode {
		return this.getToken(FppParser.EVENT, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(FppParser.TEXT, 0);
	}
	public HEALTH(): TerminalNode {
		return this.getToken(FppParser.HEALTH, 0);
	}
	public PARAM(): TerminalNode {
		return this.getToken(FppParser.PARAM, 0);
	}
	public TELEMETRY(): TerminalNode {
		return this.getToken(FppParser.TELEMETRY, 0);
	}
	public TIME(): TerminalNode {
		return this.getToken(FppParser.TIME, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_patternKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPatternKind) {
			return visitor.visitPatternKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternGraphSourcesContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualIdent_list(): QualIdentContext[] {
		return this.getTypedRuleContexts(QualIdentContext) as QualIdentContext[];
	}
	public qualIdent(i: number): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, i) as QualIdentContext;
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_patternGraphSources;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPatternGraphSources) {
			return visitor.visitPatternGraphSources(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternGraphStmtContext extends ParserRuleContext {
	public _kind!: PatternKindContext;
	public _target!: QualIdentContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONNECTIONS(): TerminalNode {
		return this.getToken(FppParser.CONNECTIONS, 0);
	}
	public INSTANCE(): TerminalNode {
		return this.getToken(FppParser.INSTANCE, 0);
	}
	public patternKind(): PatternKindContext {
		return this.getTypedRuleContext(PatternKindContext, 0) as PatternKindContext;
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public patternGraphSources(): PatternGraphSourcesContext {
		return this.getTypedRuleContext(PatternGraphSourcesContext, 0) as PatternGraphSourcesContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_patternGraphStmt;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPatternGraphStmt) {
			return visitor.visitPatternGraphStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopologyImportStmtContext extends ParserRuleContext {
	public _topology!: QualIdentContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IMPORT(): TerminalNode {
		return this.getToken(FppParser.IMPORT, 0);
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_topologyImportStmt;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTopologyImportStmt) {
			return visitor.visitTopologyImportStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopologyMemberContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public componentInstanceSpec(): ComponentInstanceSpecContext {
		return this.getTypedRuleContext(ComponentInstanceSpecContext, 0) as ComponentInstanceSpecContext;
	}
	public directGraphDecl(): DirectGraphDeclContext {
		return this.getTypedRuleContext(DirectGraphDeclContext, 0) as DirectGraphDeclContext;
	}
	public patternGraphStmt(): PatternGraphStmtContext {
		return this.getTypedRuleContext(PatternGraphStmtContext, 0) as PatternGraphStmtContext;
	}
	public topologyImportStmt(): TopologyImportStmtContext {
		return this.getTypedRuleContext(TopologyImportStmtContext, 0) as TopologyImportStmtContext;
	}
	public includeStmt(): IncludeStmtContext {
		return this.getTypedRuleContext(IncludeStmtContext, 0) as IncludeStmtContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_topologyMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTopologyMember) {
			return visitor.visitTopologyMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopologyDeclContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOPOLOGY(): TerminalNode {
		return this.getToken(FppParser.TOPOLOGY, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public topologyMember_list(): TopologyMemberContext[] {
		return this.getTypedRuleContexts(TopologyMemberContext) as TopologyMemberContext[];
	}
	public topologyMember(i: number): TopologyMemberContext {
		return this.getTypedRuleContext(TopologyMemberContext, i) as TopologyMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_topologyDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTopologyDecl) {
			return visitor.visitTopologyDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocationKindContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INSTANCE(): TerminalNode {
		return this.getToken(FppParser.INSTANCE, 0);
	}
	public COMPONENT(): TerminalNode {
		return this.getToken(FppParser.COMPONENT, 0);
	}
	public CONSTANT(): TerminalNode {
		return this.getToken(FppParser.CONSTANT, 0);
	}
	public PORT(): TerminalNode {
		return this.getToken(FppParser.PORT, 0);
	}
	public TOPOLOGY(): TerminalNode {
		return this.getToken(FppParser.TOPOLOGY, 0);
	}
	public TYPE(): TerminalNode {
		return this.getToken(FppParser.TYPE, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_locationKind;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitLocationKind) {
			return visitor.visitLocationKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocationStmtContext extends ParserRuleContext {
	public _kind!: LocationKindContext;
	public _name!: QualIdentContext;
	public _path!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LOCATE(): TerminalNode {
		return this.getToken(FppParser.LOCATE, 0);
	}
	public AT(): TerminalNode {
		return this.getToken(FppParser.AT, 0);
	}
	public locationKind(): LocationKindContext {
		return this.getTypedRuleContext(LocationKindContext, 0) as LocationKindContext;
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_locationStmt;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitLocationStmt) {
			return visitor.visitLocationStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleMemberContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public abstractTypeDecl(): AbstractTypeDeclContext {
		return this.getTypedRuleContext(AbstractTypeDeclContext, 0) as AbstractTypeDeclContext;
	}
	public aliasTypeDecl(): AliasTypeDeclContext {
		return this.getTypedRuleContext(AliasTypeDeclContext, 0) as AliasTypeDeclContext;
	}
	public arrayDecl(): ArrayDeclContext {
		return this.getTypedRuleContext(ArrayDeclContext, 0) as ArrayDeclContext;
	}
	public componentDecl(): ComponentDeclContext {
		return this.getTypedRuleContext(ComponentDeclContext, 0) as ComponentDeclContext;
	}
	public componentInstanceDecl(): ComponentInstanceDeclContext {
		return this.getTypedRuleContext(ComponentInstanceDeclContext, 0) as ComponentInstanceDeclContext;
	}
	public constantDecl(): ConstantDeclContext {
		return this.getTypedRuleContext(ConstantDeclContext, 0) as ConstantDeclContext;
	}
	public moduleDecl(): ModuleDeclContext {
		return this.getTypedRuleContext(ModuleDeclContext, 0) as ModuleDeclContext;
	}
	public portDecl(): PortDeclContext {
		return this.getTypedRuleContext(PortDeclContext, 0) as PortDeclContext;
	}
	public structDecl(): StructDeclContext {
		return this.getTypedRuleContext(StructDeclContext, 0) as StructDeclContext;
	}
	public locationStmt(): LocationStmtContext {
		return this.getTypedRuleContext(LocationStmtContext, 0) as LocationStmtContext;
	}
	public enumDecl(): EnumDeclContext {
		return this.getTypedRuleContext(EnumDeclContext, 0) as EnumDeclContext;
	}
	public includeStmt(): IncludeStmtContext {
		return this.getTypedRuleContext(IncludeStmtContext, 0) as IncludeStmtContext;
	}
	public topologyDecl(): TopologyDeclContext {
		return this.getTypedRuleContext(TopologyDeclContext, 0) as TopologyDeclContext;
	}
	public stateMachineDef(): StateMachineDefContext {
		return this.getTypedRuleContext(StateMachineDefContext, 0) as StateMachineDefContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_moduleMember;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitModuleMember) {
			return visitor.visitModuleMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleDeclContext extends ParserRuleContext {
	public _name!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MODULE(): TerminalNode {
		return this.getToken(FppParser.MODULE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public moduleMember_list(): ModuleMemberContext[] {
		return this.getTypedRuleContexts(ModuleMemberContext) as ModuleMemberContext[];
	}
	public moduleMember(i: number): ModuleMemberContext {
		return this.getTypedRuleContext(ModuleMemberContext, i) as ModuleMemberContext;
	}
	public semiDelim_list(): SemiDelimContext[] {
		return this.getTypedRuleContexts(SemiDelimContext) as SemiDelimContext[];
	}
	public semiDelim(i: number): SemiDelimContext {
		return this.getTypedRuleContext(SemiDelimContext, i) as SemiDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_moduleDecl;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitModuleDecl) {
			return visitor.visitModuleDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterContext extends ParserRuleContext {
	public _name!: Token;
	public _type_!: TypeNameContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public REF(): TerminalNode {
		return this.getToken(FppParser.REF, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_formalParameter;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitFormalParameter) {
			return visitor.visitFormalParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterNContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public formalParameter(): FormalParameterContext {
		return this.getTypedRuleContext(FormalParameterContext, 0) as FormalParameterContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_formalParameterN;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitFormalParameterN) {
			return visitor.visitFormalParameterN(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParamaterLContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public formalParameter(): FormalParameterContext {
		return this.getTypedRuleContext(FormalParameterContext, 0) as FormalParameterContext;
	}
	public commaDelim(): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, 0) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_formalParamaterL;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitFormalParamaterL) {
			return visitor.visitFormalParamaterL(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterListContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public formalParamaterL(): FormalParamaterLContext {
		return this.getTypedRuleContext(FormalParamaterLContext, 0) as FormalParamaterLContext;
	}
	public formalParameterN_list(): FormalParameterNContext[] {
		return this.getTypedRuleContexts(FormalParameterNContext) as FormalParameterNContext[];
	}
	public formalParameterN(i: number): FormalParameterNContext {
		return this.getTypedRuleContext(FormalParameterNContext, i) as FormalParameterNContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_formalParameterList;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitFormalParameterList) {
			return visitor.visitFormalParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualIdentContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, i);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_qualIdent;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitQualIdent) {
			return visitor.visitQualIdent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntTypeContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public U8(): TerminalNode {
		return this.getToken(FppParser.U8, 0);
	}
	public I8(): TerminalNode {
		return this.getToken(FppParser.I8, 0);
	}
	public U16(): TerminalNode {
		return this.getToken(FppParser.U16, 0);
	}
	public I16(): TerminalNode {
		return this.getToken(FppParser.I16, 0);
	}
	public U32(): TerminalNode {
		return this.getToken(FppParser.U32, 0);
	}
	public I32(): TerminalNode {
		return this.getToken(FppParser.I32, 0);
	}
	public U64(): TerminalNode {
		return this.getToken(FppParser.U64, 0);
	}
	public I64(): TerminalNode {
		return this.getToken(FppParser.I64, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_intType;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitIntType) {
			return visitor.visitIntType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimitiveTypeContext extends ParserRuleContext {
	public _type_!: Token;
	public _size!: Token;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public U8(): TerminalNode {
		return this.getToken(FppParser.U8, 0);
	}
	public I8(): TerminalNode {
		return this.getToken(FppParser.I8, 0);
	}
	public U16(): TerminalNode {
		return this.getToken(FppParser.U16, 0);
	}
	public I16(): TerminalNode {
		return this.getToken(FppParser.I16, 0);
	}
	public U32(): TerminalNode {
		return this.getToken(FppParser.U32, 0);
	}
	public I32(): TerminalNode {
		return this.getToken(FppParser.I32, 0);
	}
	public U64(): TerminalNode {
		return this.getToken(FppParser.U64, 0);
	}
	public I64(): TerminalNode {
		return this.getToken(FppParser.I64, 0);
	}
	public F32(): TerminalNode {
		return this.getToken(FppParser.F32, 0);
	}
	public F64(): TerminalNode {
		return this.getToken(FppParser.F64, 0);
	}
	public BOOL(): TerminalNode {
		return this.getToken(FppParser.BOOL, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(FppParser.STRING, 0);
	}
	public SIZE(): TerminalNode {
		return this.getToken(FppParser.SIZE, 0);
	}
	public LIT_INT(): TerminalNode {
		return this.getToken(FppParser.LIT_INT, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_primitiveType;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPrimitiveType) {
			return visitor.visitPrimitiveType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitiveType(): PrimitiveTypeContext {
		return this.getTypedRuleContext(PrimitiveTypeContext, 0) as PrimitiveTypeContext;
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_typeName;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTypeName) {
			return visitor.visitTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommaDelimContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_commaDelim;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitCommaDelim) {
			return visitor.visitCommaDelim(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SemiDelimContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_semiDelim;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitSemiDelim) {
			return visitor.visitSemiDelim(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayExprContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_arrayExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitArrayExpr) {
			return visitor.visitArrayExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructAssignmentContext extends ParserRuleContext {
	public _name!: Token;
	public _value!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FppParser.IDENTIFIER, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structAssignment;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructAssignment) {
			return visitor.visitStructAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructExprContext extends ParserRuleContext {
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(FppParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(FppParser.NL, i);
	}
	public structAssignment_list(): StructAssignmentContext[] {
		return this.getTypedRuleContexts(StructAssignmentContext) as StructAssignmentContext[];
	}
	public structAssignment(i: number): StructAssignmentContext {
		return this.getTypedRuleContext(StructAssignmentContext, i) as StructAssignmentContext;
	}
	public commaDelim_list(): CommaDelimContext[] {
		return this.getTypedRuleContexts(CommaDelimContext) as CommaDelimContext[];
	}
	public commaDelim(i: number): CommaDelimContext {
		return this.getTypedRuleContext(CommaDelimContext, i) as CommaDelimContext;
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_structExpr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStructExpr) {
			return visitor.visitStructExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public _left!: ExprContext;
	public _unary!: ExprContext;
	public _p!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	constructor(parser?: FppParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public arrayExpr(): ArrayExprContext {
		return this.getTypedRuleContext(ArrayExprContext, 0) as ArrayExprContext;
	}
	public structExpr(): StructExprContext {
		return this.getTypedRuleContext(StructExprContext, 0) as StructExprContext;
	}
	public qualIdent(): QualIdentContext {
		return this.getTypedRuleContext(QualIdentContext, 0) as QualIdentContext;
	}
	public LIT_BOOLEAN(): TerminalNode {
		return this.getToken(FppParser.LIT_BOOLEAN, 0);
	}
	public LIT_FLOAT(): TerminalNode {
		return this.getToken(FppParser.LIT_FLOAT, 0);
	}
	public LIT_INT(): TerminalNode {
		return this.getToken(FppParser.LIT_INT, 0);
	}
	public LIT_STRING(): TerminalNode {
		return this.getToken(FppParser.LIT_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FppParser.RULE_expr;
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
