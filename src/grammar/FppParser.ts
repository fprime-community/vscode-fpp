// Generated from src/grammar/Fpp.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { FppListener } from "./FppListener";
import { FppVisitor } from "./FppVisitor";


export class FppParser extends Parser {
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
	public static readonly RULE_stateMemberTempl = 36;
	public static readonly RULE_stateMember = 37;
	public static readonly RULE_stateDef = 38;
	public static readonly RULE_stateMachineMemberTempl = 39;
	public static readonly RULE_stateMachineMember = 40;
	public static readonly RULE_stateMachineDef = 41;
	public static readonly RULE_stateMachineInstance = 42;
	public static readonly RULE_enumMember = 43;
	public static readonly RULE_enumMemberN = 44;
	public static readonly RULE_enumMemberL = 45;
	public static readonly RULE_enumDecl = 46;
	public static readonly RULE_eventSeverity = 47;
	public static readonly RULE_eventDecl = 48;
	public static readonly RULE_includeStmt = 49;
	public static readonly RULE_matchStmt = 50;
	public static readonly RULE_internalPortDecl = 51;
	public static readonly RULE_recordSpecifierDecl = 52;
	public static readonly RULE_containerSpecifierDecl = 53;
	public static readonly RULE_initSpecifier = 54;
	public static readonly RULE_componentInstanceDecl = 55;
	public static readonly RULE_componentKind = 56;
	public static readonly RULE_componentMemberTempl = 57;
	public static readonly RULE_componentMember = 58;
	public static readonly RULE_componentDecl = 59;
	public static readonly RULE_portDecl = 60;
	public static readonly RULE_componentInstanceSpec = 61;
	public static readonly RULE_connectionNode = 62;
	public static readonly RULE_connection = 63;
	public static readonly RULE_directGraphDecl = 64;
	public static readonly RULE_patternKind = 65;
	public static readonly RULE_patternGraphSources = 66;
	public static readonly RULE_patternGraphStmt = 67;
	public static readonly RULE_topologyImportStmt = 68;
	public static readonly RULE_topologyMemberTempl = 69;
	public static readonly RULE_topologyMember = 70;
	public static readonly RULE_topologyDecl = 71;
	public static readonly RULE_locationKind = 72;
	public static readonly RULE_locationStmt = 73;
	public static readonly RULE_moduleMemberTempl = 74;
	public static readonly RULE_moduleMember = 75;
	public static readonly RULE_moduleDecl = 76;
	public static readonly RULE_formalParameter = 77;
	public static readonly RULE_formalParameterN = 78;
	public static readonly RULE_formalParamaterL = 79;
	public static readonly RULE_formalParameterList = 80;
	public static readonly RULE_qualIdent = 81;
	public static readonly RULE_intType = 82;
	public static readonly RULE_primitiveType = 83;
	public static readonly RULE_stringType = 84;
	public static readonly RULE_typeName = 85;
	public static readonly RULE_commaDelim = 86;
	public static readonly RULE_semiDelim = 87;
	public static readonly RULE_arrayExpr = 88;
	public static readonly RULE_structAssignment = 89;
	public static readonly RULE_structExpr = 90;
	public static readonly RULE_expr = 91;
	public static readonly RULE_postAnnotation = 92;
	public static readonly RULE_postMultiAnnotation = 93;
	public static readonly RULE_preAnnotation = 94;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "progTopology", "progComponent", "abstractTypeDecl", "aliasTypeDecl", 
		"arrayDecl", "constantDecl", "structMember", "structMemberN", "structMemberL", 
		"structDecl", "queueFullBehavior", "commandKind", "commandDecl", "paramDecl", 
		"generalPortKind", "specialPortKind", "generalPortInstanceType", "generalPortInstanceDecl", 
		"specialPortInstanceDecl", "telemetryLimitKind", "telemetryLimitExpr", 
		"telemetryLimit", "telemetryUpdate", "telemetryChannelDecl", "actionDef", 
		"choiceDef", "guardDef", "signalDef", "doExpr", "transitionExpr", "initialTransition", 
		"transitionOrDoExpr", "stateTransition", "stateEntry", "stateExit", "stateMemberTempl", 
		"stateMember", "stateDef", "stateMachineMemberTempl", "stateMachineMember", 
		"stateMachineDef", "stateMachineInstance", "enumMember", "enumMemberN", 
		"enumMemberL", "enumDecl", "eventSeverity", "eventDecl", "includeStmt", 
		"matchStmt", "internalPortDecl", "recordSpecifierDecl", "containerSpecifierDecl", 
		"initSpecifier", "componentInstanceDecl", "componentKind", "componentMemberTempl", 
		"componentMember", "componentDecl", "portDecl", "componentInstanceSpec", 
		"connectionNode", "connection", "directGraphDecl", "patternKind", "patternGraphSources", 
		"patternGraphStmt", "topologyImportStmt", "topologyMemberTempl", "topologyMember", 
		"topologyDecl", "locationKind", "locationStmt", "moduleMemberTempl", "moduleMember", 
		"moduleDecl", "formalParameter", "formalParameterN", "formalParamaterL", 
		"formalParameterList", "qualIdent", "intType", "primitiveType", "stringType", 
		"typeName", "commaDelim", "semiDelim", "arrayExpr", "structAssignment", 
		"structExpr", "expr", "postAnnotation", "postMultiAnnotation", "preAnnotation",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'='", "'['", "']'", "':'", "','", "'{'", "'}'", "'->'", "'('", 
		"')'", "'.'", "';'", "'-'", "'*'", "'/'", "'+'", undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'F32'", "'F64'", "'I16'", "'I32'", "'I64'", "'I8'", "'U16'", "'U32'", 
		"'U64'", "'U8'", "'action'", "'active'", "'activity'", "'always'", "'array'", 
		"'assert'", "'async'", "'at'", "'base'", "'block'", "'bool'", "'change'", 
		"'choice'", "'command'", "'component'", "'connections'", "'constant'", 
		"'container'", "'cpu'", "'default'", "'diagnostic'", "'do'", "'drop'", 
		"'else'", "'enter'", "'entry'", "'enum'", "'event'", "'exit'", "'false'", 
		"'fatal'", "'format'", "'get'", "'guard'", "'guarded'", "'health'", "'high'", 
		"'hook'", "'id'", "'if'", "'import'", "'include'", "'initial'", "'input'", 
		"'instance'", "'internal'", "'locate'", "'low'", "'machine'", "'match'", 
		"'module'", "'on'", "'opcode'", "'orange'", "'output'", "'param'", "'passive'", 
		"'phase'", "'port'", "'priority'", "'private'", "'product'", "'queue'", 
		"'queued'", "'record'", "'recv'", "'red'", "'ref'", "'reg'", "'request'", 
		"'resp'", "'save'", "'send'", "'serial'", "'set'", "'severity'", "'signal'", 
		"'size'", "'stack'", "'state'", "'string'", "'struct'", "'sync'", "'telemetry'", 
		"'text'", "'throttle'", "'time'", "'topology'", "'true'", "'type'", "'unmatched'", 
		"'update'", "'warning'", "'with'", "'yellow'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "NL", "WS", "WS_NL", "COMMENT", "ANNOTATION", 
		"LIT_BOOLEAN", "LIT_STRING", "LIT_FLOAT", "LIT_INT", "F32", "F64", "I16", 
		"I32", "I64", "I8", "U16", "U32", "U64", "U8", "ACTION", "ACTIVE", "ACTIVITY", 
		"ALWAYS", "ARRAY", "ASSERT", "ASYNC", "AT", "BASE", "BLOCK", "BOOL", "CHANGE", 
		"CHOICE", "COMMAND", "COMPONENT", "CONNECTIONS", "CONSTANT", "CONTAINER", 
		"CPU", "DEFAULT", "DIAGNOSTIC", "DO", "DROP", "ELSE", "ENTER", "ENTRY", 
		"ENUM", "EVENT", "EXIT", "FALSE", "FATAL", "FORMAT", "GET", "GUARD", "GUARDED", 
		"HEALTH", "HIGH", "HOOK", "ID", "IF", "IMPORT", "INCLUDE", "INITIAL", 
		"INPUT", "INSTANCE", "INTERNAL", "LOCATE", "LOW", "MACHINE", "MATCH", 
		"MODULE", "ON", "OPCODE", "ORANGE", "OUTPUT", "PARAM", "PASSIVE", "PHASE", 
		"PORT", "PRIORITY", "PRIVATE", "PRODUCT", "QUEUE", "QUEUED", "RECORD", 
		"RECV", "RED", "REF", "REG", "REQUEST", "RESP", "SAVE", "SEND", "SERIAL", 
		"SET", "SEVERITY", "SIGNAL", "SIZE", "STACK", "STATE", "STRING", "STRUCT", 
		"SYNC", "TELEMETRY", "TEXT", "THROTTLE", "TIME", "TOPOLOGY", "TRUE", "TYPE", 
		"UNMATCHED", "UPDATE", "WARNING", "WITH", "YELLOW", "IDENTIFIER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(FppParser._LITERAL_NAMES, FppParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return FppParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Fpp.g4"; }

	// @Override
	public get ruleNames(): string[] { return FppParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return FppParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(FppParser._ATN, this);
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, FppParser.RULE_prog);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 193;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 190;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 195;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ACTIVE - 21)) | (1 << (FppParser.ARRAY - 21)) | (1 << (FppParser.CONSTANT - 21)))) !== 0) || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & ((1 << (FppParser.ENUM - 62)) | (1 << (FppParser.INCLUDE - 62)) | (1 << (FppParser.INSTANCE - 62)) | (1 << (FppParser.LOCATE - 62)) | (1 << (FppParser.MODULE - 62)) | (1 << (FppParser.PASSIVE - 62)))) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & ((1 << (FppParser.PORT - 94)) | (1 << (FppParser.QUEUED - 94)) | (1 << (FppParser.STATE - 94)) | (1 << (FppParser.STRUCT - 94)) | (1 << (FppParser.TOPOLOGY - 94)) | (1 << (FppParser.TYPE - 94)))) !== 0)) {
				{
				{
				this.state = 196;
				this.moduleMember();
				this.state = 199;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 197;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 198;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 206;
				this.match(FppParser.NL);
				}
				}
				this.state = 211;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 212;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public progTopology(): ProgTopologyContext {
		let _localctx: ProgTopologyContext = new ProgTopologyContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, FppParser.RULE_progTopology);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 217;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 214;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 227;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (FppParser.COMMAND - 49)) | (1 << (FppParser.CONNECTIONS - 49)) | (1 << (FppParser.EVENT - 49)) | (1 << (FppParser.HEALTH - 49)) | (1 << (FppParser.IMPORT - 49)) | (1 << (FppParser.INCLUDE - 49)) | (1 << (FppParser.INSTANCE - 49)))) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & ((1 << (FppParser.PARAM - 91)) | (1 << (FppParser.PRIVATE - 91)) | (1 << (FppParser.TELEMETRY - 91)) | (1 << (FppParser.TEXT - 91)) | (1 << (FppParser.TIME - 91)))) !== 0)) {
				{
				{
				this.state = 220;
				this.topologyMember();
				this.state = 223;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 221;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 222;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 229;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 230;
				this.match(FppParser.NL);
				}
				}
				this.state = 235;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 236;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public progComponent(): ProgComponentContext {
		let _localctx: ProgComponentContext = new ProgComponentContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, FppParser.RULE_progComponent);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 241;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 238;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 243;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			}
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ARRAY - 21)) | (1 << (FppParser.ASYNC - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONSTANT - 21)))) !== 0) || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & ((1 << (FppParser.ENUM - 62)) | (1 << (FppParser.EVENT - 62)) | (1 << (FppParser.GUARDED - 62)) | (1 << (FppParser.INCLUDE - 62)) | (1 << (FppParser.INTERNAL - 62)) | (1 << (FppParser.MATCH - 62)) | (1 << (FppParser.OUTPUT - 62)) | (1 << (FppParser.PARAM - 62)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (FppParser.PRODUCT - 97)) | (1 << (FppParser.STATE - 97)) | (1 << (FppParser.STRUCT - 97)) | (1 << (FppParser.SYNC - 97)) | (1 << (FppParser.TELEMETRY - 97)) | (1 << (FppParser.TEXT - 97)) | (1 << (FppParser.TIME - 97)) | (1 << (FppParser.TYPE - 97)))) !== 0)) {
				{
				{
				this.state = 244;
				this.componentMember();
				this.state = 247;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 245;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 246;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 254;
				this.match(FppParser.NL);
				}
				}
				this.state = 259;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 260;
			this.match(FppParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public abstractTypeDecl(): AbstractTypeDeclContext {
		let _localctx: AbstractTypeDeclContext = new AbstractTypeDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, FppParser.RULE_abstractTypeDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 262;
			this.match(FppParser.TYPE);
			this.state = 263;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aliasTypeDecl(): AliasTypeDeclContext {
		let _localctx: AliasTypeDeclContext = new AliasTypeDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, FppParser.RULE_aliasTypeDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this.match(FppParser.TYPE);
			this.state = 266;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 267;
			this.match(FppParser.T__0);
			this.state = 268;
			_localctx._type = this.typeName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayDecl(): ArrayDeclContext {
		let _localctx: ArrayDeclContext = new ArrayDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, FppParser.RULE_arrayDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 270;
			this.match(FppParser.ARRAY);
			this.state = 271;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 272;
			this.match(FppParser.T__0);
			this.state = 273;
			this.match(FppParser.T__1);
			this.state = 274;
			_localctx._size = this.expr(0);
			this.state = 275;
			this.match(FppParser.T__2);
			this.state = 276;
			_localctx._type = this.typeName();
			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 277;
				this.match(FppParser.DEFAULT);
				this.state = 278;
				_localctx._default_ = this.arrayExpr();
				}
			}

			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 281;
				this.match(FppParser.FORMAT);
				this.state = 282;
				_localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constantDecl(): ConstantDeclContext {
		let _localctx: ConstantDeclContext = new ConstantDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, FppParser.RULE_constantDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 285;
			this.match(FppParser.CONSTANT);
			this.state = 286;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 287;
			this.match(FppParser.T__0);
			this.state = 288;
			_localctx._value = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structMember(): StructMemberContext {
		let _localctx: StructMemberContext = new StructMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, FppParser.RULE_structMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 290;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 291;
			this.match(FppParser.T__3);
			this.state = 296;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 292;
				this.match(FppParser.T__1);
				this.state = 293;
				_localctx._size = this.expr(0);
				this.state = 294;
				this.match(FppParser.T__2);
				}
			}

			this.state = 298;
			_localctx._type = this.typeName();
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 299;
				this.match(FppParser.FORMAT);
				this.state = 300;
				_localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structMemberN(): StructMemberNContext {
		let _localctx: StructMemberNContext = new StructMemberNContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, FppParser.RULE_structMemberN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 303;
				this.preAnnotation();
				}
			}

			this.state = 306;
			this.structMember();
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 307;
					this.match(FppParser.T__4);
					}
				}

				this.state = 310;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 311;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structMemberL(): StructMemberLContext {
		let _localctx: StructMemberLContext = new StructMemberLContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, FppParser.RULE_structMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 315;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 314;
				this.preAnnotation();
				}
			}

			this.state = 317;
			this.structMember();
			this.state = 323;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 318;
					this.match(FppParser.T__4);
					}
				}

				this.state = 321;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 322;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structDecl(): StructDeclContext {
		let _localctx: StructDeclContext = new StructDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, FppParser.RULE_structDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this.match(FppParser.STRUCT);
			this.state = 326;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 327;
			this.match(FppParser.T__5);
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 328;
				this.match(FppParser.NL);
				}
				}
				this.state = 333;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 341;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 337;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 334;
						this.structMemberN();
						}
						}
					}
					this.state = 339;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
				}
				this.state = 340;
				this.structMemberL();
				}
			}

			this.state = 343;
			this.match(FppParser.T__6);
			this.state = 346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 344;
				this.match(FppParser.DEFAULT);
				this.state = 345;
				_localctx._default_ = this.structExpr();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queueFullBehavior(): QueueFullBehaviorContext {
		let _localctx: QueueFullBehaviorContext = new QueueFullBehaviorContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, FppParser.RULE_queueFullBehavior);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 348;
			_la = this._input.LA(1);
			if (!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commandKind(): CommandKindContext {
		let _localctx: CommandKindContext = new CommandKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, FppParser.RULE_commandKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 350;
			_la = this._input.LA(1);
			if (!(_la === FppParser.ASYNC || _la === FppParser.GUARDED || _la === FppParser.SYNC)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commandDecl(): CommandDeclContext {
		let _localctx: CommandDeclContext = new CommandDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, FppParser.RULE_commandDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 352;
			_localctx._kind = this.commandKind();
			this.state = 353;
			this.match(FppParser.COMMAND);
			this.state = 354;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 355;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 360;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.OPCODE) {
				{
				this.state = 358;
				this.match(FppParser.OPCODE);
				this.state = 359;
				_localctx._opcode = this.expr(0);
				}
			}

			this.state = 364;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 362;
				this.match(FppParser.PRIORITY);
				this.state = 363;
				_localctx._priority = this.expr(0);
				}
			}

			this.state = 367;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 366;
				_localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramDecl(): ParamDeclContext {
		let _localctx: ParamDeclContext = new ParamDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, FppParser.RULE_paramDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 369;
			this.match(FppParser.PARAM);
			this.state = 370;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 371;
			this.match(FppParser.T__3);
			this.state = 372;
			_localctx._type = this.typeName();
			this.state = 375;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 373;
				this.match(FppParser.DEFAULT);
				this.state = 374;
				_localctx._default_ = this.expr(0);
				}
			}

			this.state = 379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 377;
				this.match(FppParser.ID);
				this.state = 378;
				_localctx._id = this.expr(0);
				}
			}

			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SET) {
				{
				this.state = 381;
				this.match(FppParser.SET);
				this.state = 382;
				this.match(FppParser.OPCODE);
				this.state = 383;
				_localctx._setOpcode = this.expr(0);
				}
			}

			this.state = 389;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SAVE) {
				{
				this.state = 386;
				this.match(FppParser.SAVE);
				this.state = 387;
				this.match(FppParser.OPCODE);
				this.state = 388;
				_localctx._saveOpcode = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generalPortKind(): GeneralPortKindContext {
		let _localctx: GeneralPortKindContext = new GeneralPortKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, FppParser.RULE_generalPortKind);
		try {
			this.state = 398;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ASYNC:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 391;
				this.match(FppParser.ASYNC);
				this.state = 392;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.GUARDED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 393;
				this.match(FppParser.GUARDED);
				this.state = 394;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.SYNC:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 395;
				this.match(FppParser.SYNC);
				this.state = 396;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.OUTPUT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 397;
				this.match(FppParser.OUTPUT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public specialPortKind(): SpecialPortKindContext {
		let _localctx: SpecialPortKindContext = new SpecialPortKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, FppParser.RULE_specialPortKind);
		let _la: number;
		try {
			this.state = 427;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 400;
				this.match(FppParser.COMMAND);
				this.state = 401;
				this.match(FppParser.RECV);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 402;
				this.match(FppParser.COMMAND);
				this.state = 403;
				this.match(FppParser.REG);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 404;
				this.match(FppParser.COMMAND);
				this.state = 405;
				this.match(FppParser.RESP);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 406;
				this.match(FppParser.EVENT);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 407;
				this.match(FppParser.PARAM);
				this.state = 408;
				this.match(FppParser.GET);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 409;
				this.match(FppParser.PARAM);
				this.state = 410;
				this.match(FppParser.SET);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 411;
				this.match(FppParser.TELEMETRY);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 412;
				this.match(FppParser.TEXT);
				this.state = 413;
				this.match(FppParser.EVENT);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 414;
				this.match(FppParser.TIME);
				this.state = 415;
				this.match(FppParser.GET);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 416;
				this.match(FppParser.PRODUCT);
				this.state = 417;
				this.match(FppParser.GET);
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 418;
				this.match(FppParser.PRODUCT);
				this.state = 419;
				this.match(FppParser.REQUEST);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 421;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.ASYNC) {
					{
					this.state = 420;
					this.match(FppParser.ASYNC);
					}
				}

				this.state = 423;
				this.match(FppParser.PRODUCT);
				this.state = 424;
				this.match(FppParser.RECV);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 425;
				this.match(FppParser.PRODUCT);
				this.state = 426;
				this.match(FppParser.SEND);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generalPortInstanceType(): GeneralPortInstanceTypeContext {
		let _localctx: GeneralPortInstanceTypeContext = new GeneralPortInstanceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, FppParser.RULE_generalPortInstanceType);
		try {
			this.state = 431;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.SERIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 429;
				this.match(FppParser.SERIAL);
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 430;
				this.qualIdent();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generalPortInstanceDecl(): GeneralPortInstanceDeclContext {
		let _localctx: GeneralPortInstanceDeclContext = new GeneralPortInstanceDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, FppParser.RULE_generalPortInstanceDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 433;
			_localctx._kind = this.generalPortKind();
			this.state = 434;
			this.match(FppParser.PORT);
			this.state = 435;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 436;
			this.match(FppParser.T__3);
			this.state = 441;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 437;
				this.match(FppParser.T__1);
				this.state = 438;
				_localctx._n = this.expr(0);
				this.state = 439;
				this.match(FppParser.T__2);
				}
			}

			this.state = 443;
			_localctx._type = this.generalPortInstanceType();
			this.state = 446;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 444;
				this.match(FppParser.PRIORITY);
				this.state = 445;
				_localctx._priority = this.expr(0);
				}
			}

			this.state = 449;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 448;
				_localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public specialPortInstanceDecl(): SpecialPortInstanceDeclContext {
		let _localctx: SpecialPortInstanceDeclContext = new SpecialPortInstanceDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, FppParser.RULE_specialPortInstanceDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 451;
			this.specialPortKind();
			this.state = 452;
			this.match(FppParser.PORT);
			this.state = 453;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public telemetryLimitKind(): TelemetryLimitKindContext {
		let _localctx: TelemetryLimitKindContext = new TelemetryLimitKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, FppParser.RULE_telemetryLimitKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 455;
			_la = this._input.LA(1);
			if (!(_la === FppParser.ORANGE || _la === FppParser.RED || _la === FppParser.YELLOW)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public telemetryLimitExpr(): TelemetryLimitExprContext {
		let _localctx: TelemetryLimitExprContext = new TelemetryLimitExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, FppParser.RULE_telemetryLimitExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 457;
			_localctx._kind = this.telemetryLimitKind();
			this.state = 458;
			_localctx._limit = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public telemetryLimit(): TelemetryLimitContext {
		let _localctx: TelemetryLimitContext = new TelemetryLimitContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, FppParser.RULE_telemetryLimit);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 460;
			this.match(FppParser.T__5);
			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 461;
				this.match(FppParser.NL);
				}
				}
				this.state = 466;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ORANGE || _la === FppParser.RED || _la === FppParser.YELLOW) {
				{
				this.state = 467;
				this.telemetryLimitExpr();
				this.state = 473;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 468;
						this.commaDelim();
						this.state = 469;
						this.telemetryLimitExpr();
						}
						}
					}
					this.state = 475;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				}
				this.state = 477;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 476;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 481;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public telemetryUpdate(): TelemetryUpdateContext {
		let _localctx: TelemetryUpdateContext = new TelemetryUpdateContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, FppParser.RULE_telemetryUpdate);
		try {
			this.state = 486;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ALWAYS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 483;
				this.match(FppParser.ALWAYS);
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 484;
				this.match(FppParser.ON);
				this.state = 485;
				this.match(FppParser.CHANGE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public telemetryChannelDecl(): TelemetryChannelDeclContext {
		let _localctx: TelemetryChannelDeclContext = new TelemetryChannelDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, FppParser.RULE_telemetryChannelDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 488;
			this.match(FppParser.TELEMETRY);
			this.state = 489;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 490;
			this.match(FppParser.T__3);
			this.state = 491;
			_localctx._type = this.typeName();
			this.state = 494;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 492;
				this.match(FppParser.ID);
				this.state = 493;
				_localctx._id = this.expr(0);
				}
			}

			this.state = 498;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.UPDATE) {
				{
				this.state = 496;
				this.match(FppParser.UPDATE);
				this.state = 497;
				_localctx._update = this.telemetryUpdate();
				}
			}

			this.state = 502;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 500;
				this.match(FppParser.FORMAT);
				this.state = 501;
				_localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 506;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.LOW) {
				{
				this.state = 504;
				this.match(FppParser.LOW);
				this.state = 505;
				_localctx._low = this.telemetryLimit();
				}
			}

			this.state = 510;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.HIGH) {
				{
				this.state = 508;
				this.match(FppParser.HIGH);
				this.state = 509;
				_localctx._high = this.telemetryLimit();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actionDef(): ActionDefContext {
		let _localctx: ActionDefContext = new ActionDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, FppParser.RULE_actionDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			this.match(FppParser.ACTION);
			this.state = 513;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 516;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 514;
				this.match(FppParser.T__3);
				this.state = 515;
				_localctx._type = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public choiceDef(): ChoiceDefContext {
		let _localctx: ChoiceDefContext = new ChoiceDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, FppParser.RULE_choiceDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 518;
			this.match(FppParser.CHOICE);
			this.state = 519;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 520;
			this.match(FppParser.T__5);
			this.state = 524;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 521;
				this.match(FppParser.NL);
				}
				}
				this.state = 526;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 527;
			this.match(FppParser.IF);
			this.state = 528;
			_localctx._guard = this.match(FppParser.IDENTIFIER);
			this.state = 529;
			_localctx._then = this.transitionExpr();
			this.state = 530;
			this.match(FppParser.ELSE);
			this.state = 531;
			_localctx._else = this.transitionExpr();
			this.state = 535;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 532;
				this.match(FppParser.NL);
				}
				}
				this.state = 537;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 538;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public guardDef(): GuardDefContext {
		let _localctx: GuardDefContext = new GuardDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, FppParser.RULE_guardDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 540;
			this.match(FppParser.GUARD);
			this.state = 541;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 544;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 542;
				this.match(FppParser.T__3);
				this.state = 543;
				_localctx._type = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signalDef(): SignalDefContext {
		let _localctx: SignalDefContext = new SignalDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, FppParser.RULE_signalDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 546;
			this.match(FppParser.SIGNAL);
			this.state = 547;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 550;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 548;
				this.match(FppParser.T__3);
				this.state = 549;
				_localctx._type = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public doExpr(): DoExprContext {
		let _localctx: DoExprContext = new DoExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, FppParser.RULE_doExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 552;
			this.match(FppParser.DO);
			this.state = 553;
			this.match(FppParser.T__5);
			this.state = 557;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 554;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 559;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
			}
			this.state = 569;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 560;
				this.match(FppParser.IDENTIFIER);
				this.state = 566;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 561;
						this.commaDelim();
						this.state = 562;
						this.match(FppParser.IDENTIFIER);
						}
						}
					}
					this.state = 568;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
				}
				}
			}

			this.state = 572;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__4 || _la === FppParser.NL) {
				{
				this.state = 571;
				this.commaDelim();
				}
			}

			this.state = 574;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public transitionExpr(): TransitionExprContext {
		let _localctx: TransitionExprContext = new TransitionExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, FppParser.RULE_transitionExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 577;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DO) {
				{
				this.state = 576;
				_localctx._do = this.doExpr();
				}
			}

			this.state = 579;
			this.match(FppParser.ENTER);
			this.state = 580;
			_localctx._state = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public initialTransition(): InitialTransitionContext {
		let _localctx: InitialTransitionContext = new InitialTransitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, FppParser.RULE_initialTransition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 582;
			this.match(FppParser.INITIAL);
			this.state = 583;
			_localctx._transition = this.transitionExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public transitionOrDoExpr(): TransitionOrDoExprContext {
		let _localctx: TransitionOrDoExprContext = new TransitionOrDoExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, FppParser.RULE_transitionOrDoExpr);
		try {
			this.state = 587;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 585;
				this.transitionExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 586;
				this.doExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateTransition(): StateTransitionContext {
		let _localctx: StateTransitionContext = new StateTransitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, FppParser.RULE_stateTransition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 589;
			this.match(FppParser.ON);
			this.state = 590;
			_localctx._signal = this.match(FppParser.IDENTIFIER);
			this.state = 593;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IF) {
				{
				this.state = 591;
				this.match(FppParser.IF);
				this.state = 592;
				_localctx._guard = this.match(FppParser.IDENTIFIER);
				}
			}

			this.state = 595;
			_localctx._transition = this.transitionOrDoExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateEntry(): StateEntryContext {
		let _localctx: StateEntryContext = new StateEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, FppParser.RULE_stateEntry);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 597;
			this.match(FppParser.ENTRY);
			this.state = 598;
			_localctx._do = this.doExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateExit(): StateExitContext {
		let _localctx: StateExitContext = new StateExitContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, FppParser.RULE_stateExit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 600;
			this.match(FppParser.EXIT);
			this.state = 601;
			_localctx._do = this.doExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMemberTempl(): StateMemberTemplContext {
		let _localctx: StateMemberTemplContext = new StateMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, FppParser.RULE_stateMemberTempl);
		try {
			this.state = 609;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 603;
				this.initialTransition();
				}
				break;
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 604;
				this.choiceDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 605;
				this.stateDef();
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 606;
				this.stateTransition();
				}
				break;
			case FppParser.ENTRY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 607;
				this.stateEntry();
				}
				break;
			case FppParser.EXIT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 608;
				this.stateExit();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMember(): StateMemberContext {
		let _localctx: StateMemberContext = new StateMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, FppParser.RULE_stateMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 612;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 611;
				this.preAnnotation();
				}
			}

			this.state = 614;
			this.stateMemberTempl();
			this.state = 616;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 615;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateDef(): StateDefContext {
		let _localctx: StateDefContext = new StateDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, FppParser.RULE_stateDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 618;
			this.match(FppParser.STATE);
			this.state = 619;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 642;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 620;
				this.match(FppParser.T__5);
				this.state = 624;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 621;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 626;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				}
				this.state = 632;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || ((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (FppParser.CHOICE - 48)) | (1 << (FppParser.ENTRY - 48)) | (1 << (FppParser.EXIT - 48)) | (1 << (FppParser.INITIAL - 48)))) !== 0) || _la === FppParser.ON || _la === FppParser.STATE) {
					{
					{
					this.state = 627;
					this.stateMember();
					this.state = 628;
					this.semiDelim();
					}
					}
					this.state = 634;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 638;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 635;
					this.match(FppParser.NL);
					}
					}
					this.state = 640;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 641;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMachineMemberTempl(): StateMachineMemberTemplContext {
		let _localctx: StateMachineMemberTemplContext = new StateMachineMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, FppParser.RULE_stateMachineMemberTempl);
		try {
			this.state = 650;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 644;
				this.choiceDef();
				}
				break;
			case FppParser.GUARD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 645;
				this.guardDef();
				}
				break;
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 646;
				this.initialTransition();
				}
				break;
			case FppParser.SIGNAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 647;
				this.signalDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 648;
				this.stateDef();
				}
				break;
			case FppParser.ACTION:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 649;
				this.actionDef();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMachineMember(): StateMachineMemberContext {
		let _localctx: StateMachineMemberContext = new StateMachineMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, FppParser.RULE_stateMachineMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 653;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 652;
				this.preAnnotation();
				}
			}

			this.state = 655;
			this.stateMachineMemberTempl();
			this.state = 657;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 656;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMachineDef(): StateMachineDefContext {
		let _localctx: StateMachineDefContext = new StateMachineDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, FppParser.RULE_stateMachineDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 659;
			this.match(FppParser.STATE);
			this.state = 660;
			this.match(FppParser.MACHINE);
			this.state = 661;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 684;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 662;
				this.match(FppParser.T__5);
				this.state = 666;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 73, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 663;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 668;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 73, this._ctx);
				}
				this.state = 674;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ACTION - 21)) | (1 << (FppParser.CHOICE - 21)))) !== 0) || _la === FppParser.GUARD || _la === FppParser.INITIAL || _la === FppParser.SIGNAL || _la === FppParser.STATE) {
					{
					{
					this.state = 669;
					this.stateMachineMember();
					this.state = 670;
					this.semiDelim();
					}
					}
					this.state = 676;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 680;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 677;
					this.match(FppParser.NL);
					}
					}
					this.state = 682;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 683;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stateMachineInstance(): StateMachineInstanceContext {
		let _localctx: StateMachineInstanceContext = new StateMachineInstanceContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, FppParser.RULE_stateMachineInstance);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 686;
			this.match(FppParser.STATE);
			this.state = 687;
			this.match(FppParser.MACHINE);
			this.state = 688;
			this.match(FppParser.INSTANCE);
			this.state = 689;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 690;
			this.match(FppParser.T__3);
			this.state = 691;
			_localctx._stateMachine = this.qualIdent();
			this.state = 694;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 692;
				this.match(FppParser.PRIORITY);
				this.state = 693;
				_localctx._priority = this.expr(0);
				}
			}

			this.state = 697;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 696;
				_localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumMember(): EnumMemberContext {
		let _localctx: EnumMemberContext = new EnumMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, FppParser.RULE_enumMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 699;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 702;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__0) {
				{
				this.state = 700;
				this.match(FppParser.T__0);
				this.state = 701;
				_localctx._value = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumMemberN(): EnumMemberNContext {
		let _localctx: EnumMemberNContext = new EnumMemberNContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, FppParser.RULE_enumMemberN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 705;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 704;
				this.preAnnotation();
				}
			}

			this.state = 707;
			this.enumMember();
			this.state = 713;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
			case 1:
				{
				this.state = 709;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 708;
					this.match(FppParser.T__4);
					}
				}

				this.state = 711;
				this.postAnnotation();
				}
				break;

			case 2:
				{
				this.state = 712;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumMemberL(): EnumMemberLContext {
		let _localctx: EnumMemberLContext = new EnumMemberLContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, FppParser.RULE_enumMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 716;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 715;
				this.preAnnotation();
				}
			}

			this.state = 718;
			this.enumMember();
			this.state = 724;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
			case 1:
				{
				this.state = 720;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 719;
					this.match(FppParser.T__4);
					}
				}

				this.state = 722;
				this.postAnnotation();
				}
				break;

			case 2:
				{
				this.state = 723;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumDecl(): EnumDeclContext {
		let _localctx: EnumDeclContext = new EnumDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, FppParser.RULE_enumDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 726;
			this.match(FppParser.ENUM);
			this.state = 727;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 730;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 728;
				this.match(FppParser.T__3);
				this.state = 729;
				_localctx._type = this.intType();
				}
			}

			this.state = 732;
			this.match(FppParser.T__5);
			this.state = 736;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 733;
				this.match(FppParser.NL);
				}
				}
				this.state = 738;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 746;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 742;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 88, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 739;
						this.enumMemberN();
						}
						}
					}
					this.state = 744;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 88, this._ctx);
				}
				this.state = 745;
				this.enumMemberL();
				}
			}

			this.state = 748;
			this.match(FppParser.T__6);
			this.state = 751;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 749;
				this.match(FppParser.DEFAULT);
				this.state = 750;
				_localctx._default_ = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventSeverity(): EventSeverityContext {
		let _localctx: EventSeverityContext = new EventSeverityContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, FppParser.RULE_eventSeverity);
		try {
			this.state = 764;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 91, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 753;
				this.match(FppParser.ACTIVITY);
				this.state = 754;
				this.match(FppParser.HIGH);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 755;
				this.match(FppParser.ACTIVITY);
				this.state = 756;
				this.match(FppParser.LOW);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 757;
				this.match(FppParser.COMMAND);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 758;
				this.match(FppParser.DIAGNOSTIC);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 759;
				this.match(FppParser.FATAL);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 760;
				this.match(FppParser.WARNING);
				this.state = 761;
				this.match(FppParser.HIGH);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 762;
				this.match(FppParser.WARNING);
				this.state = 763;
				this.match(FppParser.LOW);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventDecl(): EventDeclContext {
		let _localctx: EventDeclContext = new EventDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, FppParser.RULE_eventDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 766;
			this.match(FppParser.EVENT);
			this.state = 767;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 769;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 768;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 771;
			this.match(FppParser.SEVERITY);
			this.state = 772;
			this.eventSeverity();
			this.state = 775;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 773;
				this.match(FppParser.ID);
				this.state = 774;
				_localctx._id = this.expr(0);
				}
			}

			this.state = 777;
			this.match(FppParser.FORMAT);
			this.state = 778;
			_localctx._format = this.match(FppParser.LIT_STRING);
			this.state = 781;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.THROTTLE) {
				{
				this.state = 779;
				this.match(FppParser.THROTTLE);
				this.state = 780;
				_localctx._throttle = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public includeStmt(): IncludeStmtContext {
		let _localctx: IncludeStmtContext = new IncludeStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, FppParser.RULE_includeStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 783;
			this.match(FppParser.INCLUDE);
			this.state = 784;
			_localctx._include = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchStmt(): MatchStmtContext {
		let _localctx: MatchStmtContext = new MatchStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, FppParser.RULE_matchStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 786;
			this.match(FppParser.MATCH);
			this.state = 787;
			_localctx._match = this.match(FppParser.IDENTIFIER);
			this.state = 788;
			this.match(FppParser.WITH);
			this.state = 789;
			_localctx._with_ = this.match(FppParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public internalPortDecl(): InternalPortDeclContext {
		let _localctx: InternalPortDeclContext = new InternalPortDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, FppParser.RULE_internalPortDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 791;
			this.match(FppParser.INTERNAL);
			this.state = 792;
			this.match(FppParser.PORT);
			this.state = 793;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 795;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 794;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 799;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 797;
				this.match(FppParser.PRIORITY);
				this.state = 798;
				_localctx._priority = this.expr(0);
				}
			}

			this.state = 802;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 801;
				_localctx._queueFull = this.queueFullBehavior();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recordSpecifierDecl(): RecordSpecifierDeclContext {
		let _localctx: RecordSpecifierDeclContext = new RecordSpecifierDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, FppParser.RULE_recordSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 804;
			this.match(FppParser.PRODUCT);
			this.state = 805;
			this.match(FppParser.RECORD);
			this.state = 806;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 807;
			this.match(FppParser.T__3);
			this.state = 808;
			_localctx._fppType = this.typeName();
			this.state = 810;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ARRAY) {
				{
				this.state = 809;
				this.match(FppParser.ARRAY);
				}
			}

			this.state = 814;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 812;
				this.match(FppParser.ID);
				this.state = 813;
				_localctx._id = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public containerSpecifierDecl(): ContainerSpecifierDeclContext {
		let _localctx: ContainerSpecifierDeclContext = new ContainerSpecifierDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, FppParser.RULE_containerSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 816;
			this.match(FppParser.PRODUCT);
			this.state = 817;
			this.match(FppParser.CONTAINER);
			this.state = 818;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 821;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 819;
				this.match(FppParser.ID);
				this.state = 820;
				_localctx._id = this.expr(0);
				}
			}

			this.state = 826;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 823;
				this.match(FppParser.DEFAULT);
				this.state = 824;
				this.match(FppParser.PRIORITY);
				this.state = 825;
				_localctx._priority = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public initSpecifier(): InitSpecifierContext {
		let _localctx: InitSpecifierContext = new InitSpecifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, FppParser.RULE_initSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 829;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 828;
				this.preAnnotation();
				}
			}

			this.state = 831;
			this.match(FppParser.PHASE);
			this.state = 832;
			_localctx._phaseExpr = this.expr(0);
			this.state = 833;
			_localctx._code = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentInstanceDecl(): ComponentInstanceDeclContext {
		let _localctx: ComponentInstanceDeclContext = new ComponentInstanceDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, FppParser.RULE_componentInstanceDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 835;
			this.match(FppParser.INSTANCE);
			this.state = 836;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 837;
			this.match(FppParser.T__3);
			this.state = 838;
			_localctx._fppType = this.qualIdent();
			this.state = 839;
			this.match(FppParser.BASE);
			this.state = 840;
			this.match(FppParser.ID);
			this.state = 841;
			_localctx._base_id = this.expr(0);
			this.state = 844;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.TYPE) {
				{
				this.state = 842;
				this.match(FppParser.TYPE);
				this.state = 843;
				_localctx._cppType = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 848;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.AT) {
				{
				this.state = 846;
				this.match(FppParser.AT);
				this.state = 847;
				_localctx._at = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 853;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.QUEUE) {
				{
				this.state = 850;
				this.match(FppParser.QUEUE);
				this.state = 851;
				this.match(FppParser.SIZE);
				this.state = 852;
				_localctx._queueSize = this.expr(0);
				}
			}

			this.state = 858;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.STACK) {
				{
				this.state = 855;
				this.match(FppParser.STACK);
				this.state = 856;
				this.match(FppParser.SIZE);
				this.state = 857;
				_localctx._stackSize = this.expr(0);
				}
			}

			this.state = 862;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 860;
				this.match(FppParser.PRIORITY);
				this.state = 861;
				_localctx._priority = this.expr(0);
				}
			}

			this.state = 866;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.CPU) {
				{
				this.state = 864;
				this.match(FppParser.CPU);
				this.state = 865;
				_localctx._cpu = this.expr(0);
				}
			}

			this.state = 890;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 868;
				this.match(FppParser.T__5);
				this.state = 872;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 109, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 869;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 874;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 109, this._ctx);
				}
				this.state = 880;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.PHASE) {
					{
					{
					this.state = 875;
					this.initSpecifier();
					this.state = 876;
					this.semiDelim();
					}
					}
					this.state = 882;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 886;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 883;
					this.match(FppParser.NL);
					}
					}
					this.state = 888;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 889;
				this.match(FppParser.T__6);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentKind(): ComponentKindContext {
		let _localctx: ComponentKindContext = new ComponentKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, FppParser.RULE_componentKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 892;
			_la = this._input.LA(1);
			if (!(_la === FppParser.ACTIVE || _la === FppParser.PASSIVE || _la === FppParser.QUEUED)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentMemberTempl(): ComponentMemberTemplContext {
		let _localctx: ComponentMemberTemplContext = new ComponentMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, FppParser.RULE_componentMemberTempl);
		try {
			this.state = 913;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 113, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 894;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 895;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 896;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 897;
				this.constantDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 898;
				this.structDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 899;
				this.commandDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 900;
				this.paramDecl();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 901;
				this.generalPortInstanceDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 902;
				this.specialPortInstanceDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 903;
				this.telemetryChannelDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 904;
				this.enumDecl();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 905;
				this.eventDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 906;
				this.includeStmt();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 907;
				this.internalPortDecl();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 908;
				this.matchStmt();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 909;
				this.recordSpecifierDecl();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 910;
				this.containerSpecifierDecl();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 911;
				this.stateMachineInstance();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 912;
				this.stateMachineDef();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentMember(): ComponentMemberContext {
		let _localctx: ComponentMemberContext = new ComponentMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, FppParser.RULE_componentMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 916;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 915;
				this.preAnnotation();
				}
			}

			this.state = 918;
			this.componentMemberTempl();
			this.state = 920;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 919;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentDecl(): ComponentDeclContext {
		let _localctx: ComponentDeclContext = new ComponentDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, FppParser.RULE_componentDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 922;
			_localctx._kind = this.componentKind();
			this.state = 923;
			this.match(FppParser.COMPONENT);
			this.state = 924;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 925;
			this.match(FppParser.T__5);
			this.state = 929;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 926;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 931;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
			}
			this.state = 937;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ARRAY - 21)) | (1 << (FppParser.ASYNC - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONSTANT - 21)))) !== 0) || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & ((1 << (FppParser.ENUM - 62)) | (1 << (FppParser.EVENT - 62)) | (1 << (FppParser.GUARDED - 62)) | (1 << (FppParser.INCLUDE - 62)) | (1 << (FppParser.INTERNAL - 62)) | (1 << (FppParser.MATCH - 62)) | (1 << (FppParser.OUTPUT - 62)) | (1 << (FppParser.PARAM - 62)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (FppParser.PRODUCT - 97)) | (1 << (FppParser.STATE - 97)) | (1 << (FppParser.STRUCT - 97)) | (1 << (FppParser.SYNC - 97)) | (1 << (FppParser.TELEMETRY - 97)) | (1 << (FppParser.TEXT - 97)) | (1 << (FppParser.TIME - 97)) | (1 << (FppParser.TYPE - 97)))) !== 0)) {
				{
				{
				this.state = 932;
				this.componentMember();
				this.state = 933;
				this.semiDelim();
				}
				}
				this.state = 939;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 943;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 940;
				this.match(FppParser.NL);
				}
				}
				this.state = 945;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 946;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public portDecl(): PortDeclContext {
		let _localctx: PortDeclContext = new PortDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, FppParser.RULE_portDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 948;
			this.match(FppParser.PORT);
			this.state = 949;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 951;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 950;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 955;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__7) {
				{
				this.state = 953;
				this.match(FppParser.T__7);
				this.state = 954;
				_localctx._returnType = this.typeName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public componentInstanceSpec(): ComponentInstanceSpecContext {
		let _localctx: ComponentInstanceSpecContext = new ComponentInstanceSpecContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, FppParser.RULE_componentInstanceSpec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 958;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIVATE) {
				{
				this.state = 957;
				this.match(FppParser.PRIVATE);
				}
			}

			this.state = 960;
			this.match(FppParser.INSTANCE);
			this.state = 961;
			_localctx._name = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public connectionNode(): ConnectionNodeContext {
		let _localctx: ConnectionNodeContext = new ConnectionNodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, FppParser.RULE_connectionNode);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 963;
			_localctx._node = this.qualIdent();
			this.state = 968;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 964;
				this.match(FppParser.T__1);
				this.state = 965;
				_localctx._index = this.expr(0);
				this.state = 966;
				this.match(FppParser.T__2);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public connection(): ConnectionContext {
		let _localctx: ConnectionContext = new ConnectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, FppParser.RULE_connection);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			_localctx._source = this.connectionNode();
			this.state = 971;
			this.match(FppParser.T__7);
			this.state = 972;
			_localctx._destination = this.connectionNode();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directGraphDecl(): DirectGraphDeclContext {
		let _localctx: DirectGraphDeclContext = new DirectGraphDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, FppParser.RULE_directGraphDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 974;
			this.match(FppParser.CONNECTIONS);
			this.state = 975;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 976;
			this.match(FppParser.T__5);
			this.state = 980;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 123, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 977;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 982;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 123, this._ctx);
			}
			this.state = 988;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.IDENTIFIER) {
				{
				{
				this.state = 983;
				this.connection();
				this.state = 984;
				this.commaDelim();
				}
				}
				this.state = 990;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 994;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 991;
				this.match(FppParser.NL);
				}
				}
				this.state = 996;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 997;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternKind(): PatternKindContext {
		let _localctx: PatternKindContext = new PatternKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, FppParser.RULE_patternKind);
		try {
			this.state = 1007;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.COMMAND:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 999;
				this.match(FppParser.COMMAND);
				}
				break;
			case FppParser.EVENT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1000;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.TEXT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1001;
				this.match(FppParser.TEXT);
				this.state = 1002;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.HEALTH:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1003;
				this.match(FppParser.HEALTH);
				}
				break;
			case FppParser.PARAM:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1004;
				this.match(FppParser.PARAM);
				}
				break;
			case FppParser.TELEMETRY:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1005;
				this.match(FppParser.TELEMETRY);
				}
				break;
			case FppParser.TIME:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1006;
				this.match(FppParser.TIME);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternGraphSources(): PatternGraphSourcesContext {
		let _localctx: PatternGraphSourcesContext = new PatternGraphSourcesContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, FppParser.RULE_patternGraphSources);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 1009;
			this.qualIdent();
			this.state = 1015;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 127, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1010;
					this.commaDelim();
					this.state = 1011;
					this.qualIdent();
					}
					}
				}
				this.state = 1017;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 127, this._ctx);
			}
			this.state = 1019;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 128, this._ctx) ) {
			case 1:
				{
				this.state = 1018;
				this.commaDelim();
				}
				break;
			}
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternGraphStmt(): PatternGraphStmtContext {
		let _localctx: PatternGraphStmtContext = new PatternGraphStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, FppParser.RULE_patternGraphStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1021;
			_localctx._kind = this.patternKind();
			this.state = 1022;
			this.match(FppParser.CONNECTIONS);
			this.state = 1023;
			this.match(FppParser.INSTANCE);
			this.state = 1024;
			_localctx._target = this.qualIdent();
			this.state = 1026;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 1025;
				this.patternGraphSources();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topologyImportStmt(): TopologyImportStmtContext {
		let _localctx: TopologyImportStmtContext = new TopologyImportStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, FppParser.RULE_topologyImportStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1028;
			this.match(FppParser.IMPORT);
			this.state = 1029;
			_localctx._topology = this.qualIdent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topologyMemberTempl(): TopologyMemberTemplContext {
		let _localctx: TopologyMemberTemplContext = new TopologyMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, FppParser.RULE_topologyMemberTempl);
		try {
			this.state = 1036;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INSTANCE:
			case FppParser.PRIVATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1031;
				this.componentInstanceSpec();
				}
				break;
			case FppParser.CONNECTIONS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1032;
				this.directGraphDecl();
				}
				break;
			case FppParser.COMMAND:
			case FppParser.EVENT:
			case FppParser.HEALTH:
			case FppParser.PARAM:
			case FppParser.TELEMETRY:
			case FppParser.TEXT:
			case FppParser.TIME:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1033;
				this.patternGraphStmt();
				}
				break;
			case FppParser.IMPORT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1034;
				this.topologyImportStmt();
				}
				break;
			case FppParser.INCLUDE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1035;
				this.includeStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topologyMember(): TopologyMemberContext {
		let _localctx: TopologyMemberContext = new TopologyMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, FppParser.RULE_topologyMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1039;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1038;
				this.preAnnotation();
				}
			}

			this.state = 1041;
			this.topologyMemberTempl();
			this.state = 1043;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1042;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topologyDecl(): TopologyDeclContext {
		let _localctx: TopologyDeclContext = new TopologyDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, FppParser.RULE_topologyDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1045;
			this.match(FppParser.TOPOLOGY);
			this.state = 1046;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1047;
			this.match(FppParser.T__5);
			this.state = 1051;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 133, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1048;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1053;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 133, this._ctx);
			}
			this.state = 1059;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (FppParser.COMMAND - 49)) | (1 << (FppParser.CONNECTIONS - 49)) | (1 << (FppParser.EVENT - 49)) | (1 << (FppParser.HEALTH - 49)) | (1 << (FppParser.IMPORT - 49)) | (1 << (FppParser.INCLUDE - 49)) | (1 << (FppParser.INSTANCE - 49)))) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & ((1 << (FppParser.PARAM - 91)) | (1 << (FppParser.PRIVATE - 91)) | (1 << (FppParser.TELEMETRY - 91)) | (1 << (FppParser.TEXT - 91)) | (1 << (FppParser.TIME - 91)))) !== 0)) {
				{
				{
				this.state = 1054;
				this.topologyMember();
				this.state = 1055;
				this.semiDelim();
				}
				}
				this.state = 1061;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1065;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1062;
				this.match(FppParser.NL);
				}
				}
				this.state = 1067;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1068;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public locationKind(): LocationKindContext {
		let _localctx: LocationKindContext = new LocationKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, FppParser.RULE_locationKind);
		try {
			this.state = 1078;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INSTANCE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1070;
				this.match(FppParser.INSTANCE);
				}
				break;
			case FppParser.COMPONENT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1071;
				this.match(FppParser.COMPONENT);
				}
				break;
			case FppParser.CONSTANT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1072;
				this.match(FppParser.CONSTANT);
				}
				break;
			case FppParser.PORT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1073;
				this.match(FppParser.PORT);
				}
				break;
			case FppParser.TOPOLOGY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1074;
				this.match(FppParser.TOPOLOGY);
				}
				break;
			case FppParser.TYPE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1075;
				this.match(FppParser.TYPE);
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1076;
				this.match(FppParser.STATE);
				this.state = 1077;
				this.match(FppParser.MACHINE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public locationStmt(): LocationStmtContext {
		let _localctx: LocationStmtContext = new LocationStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, FppParser.RULE_locationStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1080;
			this.match(FppParser.LOCATE);
			this.state = 1081;
			_localctx._kind = this.locationKind();
			this.state = 1082;
			_localctx._name = this.qualIdent();
			this.state = 1083;
			this.match(FppParser.AT);
			this.state = 1084;
			_localctx._path = this.match(FppParser.LIT_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moduleMemberTempl(): ModuleMemberTemplContext {
		let _localctx: ModuleMemberTemplContext = new ModuleMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, FppParser.RULE_moduleMemberTempl);
		try {
			this.state = 1100;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 137, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1086;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1087;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1088;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1089;
				this.componentDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1090;
				this.componentInstanceDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1091;
				this.constantDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1092;
				this.moduleDecl();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1093;
				this.portDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1094;
				this.structDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1095;
				this.locationStmt();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1096;
				this.enumDecl();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1097;
				this.includeStmt();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1098;
				this.topologyDecl();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 1099;
				this.stateMachineDef();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moduleMember(): ModuleMemberContext {
		let _localctx: ModuleMemberContext = new ModuleMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, FppParser.RULE_moduleMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1103;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1102;
				this.preAnnotation();
				}
			}

			this.state = 1105;
			this.moduleMemberTempl();
			this.state = 1107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1106;
				this.match(FppParser.ANNOTATION);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moduleDecl(): ModuleDeclContext {
		let _localctx: ModuleDeclContext = new ModuleDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, FppParser.RULE_moduleDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1109;
			this.match(FppParser.MODULE);
			this.state = 1110;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1111;
			this.match(FppParser.T__5);
			this.state = 1115;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 140, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1112;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1117;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 140, this._ctx);
			}
			this.state = 1123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ACTIVE - 21)) | (1 << (FppParser.ARRAY - 21)) | (1 << (FppParser.CONSTANT - 21)))) !== 0) || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & ((1 << (FppParser.ENUM - 62)) | (1 << (FppParser.INCLUDE - 62)) | (1 << (FppParser.INSTANCE - 62)) | (1 << (FppParser.LOCATE - 62)) | (1 << (FppParser.MODULE - 62)) | (1 << (FppParser.PASSIVE - 62)))) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & ((1 << (FppParser.PORT - 94)) | (1 << (FppParser.QUEUED - 94)) | (1 << (FppParser.STATE - 94)) | (1 << (FppParser.STRUCT - 94)) | (1 << (FppParser.TOPOLOGY - 94)) | (1 << (FppParser.TYPE - 94)))) !== 0)) {
				{
				{
				this.state = 1118;
				this.moduleMember();
				this.state = 1119;
				this.semiDelim();
				}
				}
				this.state = 1125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1129;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1126;
				this.match(FppParser.NL);
				}
				}
				this.state = 1131;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1132;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameter(): FormalParameterContext {
		let _localctx: FormalParameterContext = new FormalParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, FppParser.RULE_formalParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.REF) {
				{
				this.state = 1134;
				this.match(FppParser.REF);
				}
			}

			this.state = 1137;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1138;
			this.match(FppParser.T__3);
			this.state = 1139;
			_localctx._type = this.typeName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameterN(): FormalParameterNContext {
		let _localctx: FormalParameterNContext = new FormalParameterNContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, FppParser.RULE_formalParameterN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1141;
				this.preAnnotation();
				}
			}

			this.state = 1144;
			this.formalParameter();
			this.state = 1150;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 146, this._ctx) ) {
			case 1:
				{
				this.state = 1146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1145;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1148;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1149;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParamaterL(): FormalParamaterLContext {
		let _localctx: FormalParamaterLContext = new FormalParamaterLContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, FppParser.RULE_formalParamaterL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1152;
				this.preAnnotation();
				}
			}

			this.state = 1155;
			this.formalParameter();
			this.state = 1161;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 149, this._ctx) ) {
			case 1:
				{
				this.state = 1157;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1156;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1159;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1160;
				this.commaDelim();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameterList(): FormalParameterListContext {
		let _localctx: FormalParameterListContext = new FormalParameterListContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, FppParser.RULE_formalParameterList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1163;
			this.match(FppParser.T__8);
			this.state = 1167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1164;
				this.match(FppParser.NL);
				}
				}
				this.state = 1169;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.REF || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1173;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 151, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1170;
						this.formalParameterN();
						}
						}
					}
					this.state = 1175;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 151, this._ctx);
				}
				this.state = 1176;
				this.formalParamaterL();
				}
			}

			this.state = 1179;
			this.match(FppParser.T__9);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualIdent(): QualIdentContext {
		let _localctx: QualIdentContext = new QualIdentContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, FppParser.RULE_qualIdent);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1181;
			this.match(FppParser.IDENTIFIER);
			this.state = 1186;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 153, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1182;
					this.match(FppParser.T__10);
					this.state = 1183;
					this.match(FppParser.IDENTIFIER);
					}
					}
				}
				this.state = 1188;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 153, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intType(): IntTypeContext {
		let _localctx: IntTypeContext = new IntTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, FppParser.RULE_intType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1189;
			_la = this._input.LA(1);
			if (!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & ((1 << (FppParser.I16 - 28)) | (1 << (FppParser.I32 - 28)) | (1 << (FppParser.I64 - 28)) | (1 << (FppParser.I8 - 28)) | (1 << (FppParser.U16 - 28)) | (1 << (FppParser.U32 - 28)) | (1 << (FppParser.U64 - 28)) | (1 << (FppParser.U8 - 28)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primitiveType(): PrimitiveTypeContext {
		let _localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, FppParser.RULE_primitiveType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1191;
			_la = this._input.LA(1);
			if (!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & ((1 << (FppParser.F32 - 26)) | (1 << (FppParser.F64 - 26)) | (1 << (FppParser.I16 - 26)) | (1 << (FppParser.I32 - 26)) | (1 << (FppParser.I64 - 26)) | (1 << (FppParser.I8 - 26)) | (1 << (FppParser.U16 - 26)) | (1 << (FppParser.U32 - 26)) | (1 << (FppParser.U64 - 26)) | (1 << (FppParser.U8 - 26)) | (1 << (FppParser.BOOL - 26)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringType(): StringTypeContext {
		let _localctx: StringTypeContext = new StringTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, FppParser.RULE_stringType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1193;
			this.match(FppParser.STRING);
			this.state = 1196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SIZE) {
				{
				this.state = 1194;
				this.match(FppParser.SIZE);
				this.state = 1195;
				_localctx._size = this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let _localctx: TypeNameContext = new TypeNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, FppParser.RULE_typeName);
		try {
			this.state = 1201;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1198;
				this.stringType();
				}
				break;
			case FppParser.F32:
			case FppParser.F64:
			case FppParser.I16:
			case FppParser.I32:
			case FppParser.I64:
			case FppParser.I8:
			case FppParser.U16:
			case FppParser.U32:
			case FppParser.U64:
			case FppParser.U8:
			case FppParser.BOOL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1199;
				this.primitiveType();
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1200;
				this.qualIdent();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commaDelim(): CommaDelimContext {
		let _localctx: CommaDelimContext = new CommaDelimContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, FppParser.RULE_commaDelim);
		try {
			let _alt: number;
			this.state = 1215;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__4:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1203;
				this.match(FppParser.T__4);
				this.state = 1207;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1204;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1209;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1211;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1210;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1213;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 157, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public semiDelim(): SemiDelimContext {
		let _localctx: SemiDelimContext = new SemiDelimContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, FppParser.RULE_semiDelim);
		try {
			let _alt: number;
			this.state = 1229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__11:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1217;
				this.match(FppParser.T__11);
				this.state = 1221;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 159, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1218;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1223;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 159, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1225;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1224;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1227;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 160, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayExpr(): ArrayExprContext {
		let _localctx: ArrayExprContext = new ArrayExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, FppParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1231;
			this.match(FppParser.T__1);
			this.state = 1235;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1232;
				this.match(FppParser.NL);
				}
				}
				this.state = 1237;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1247;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << FppParser.T__1) | (1 << FppParser.T__5) | (1 << FppParser.T__8) | (1 << FppParser.T__12) | (1 << FppParser.LIT_BOOLEAN) | (1 << FppParser.LIT_STRING) | (1 << FppParser.LIT_FLOAT) | (1 << FppParser.LIT_INT))) !== 0) || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1238;
				this.expr(0);
				this.state = 1244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					{
					this.state = 1239;
					this.commaDelim();
					this.state = 1240;
					this.expr(0);
					}
					}
					this.state = 1246;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1249;
			this.match(FppParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structAssignment(): StructAssignmentContext {
		let _localctx: StructAssignmentContext = new StructAssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, FppParser.RULE_structAssignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1251;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1252;
			this.match(FppParser.T__0);
			this.state = 1253;
			_localctx._value = this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structExpr(): StructExprContext {
		let _localctx: StructExprContext = new StructExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, FppParser.RULE_structExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1255;
			this.match(FppParser.T__5);
			this.state = 1259;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1256;
				this.match(FppParser.NL);
				}
				}
				this.state = 1261;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 1262;
				this.structAssignment();
				this.state = 1268;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 166, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1263;
						this.commaDelim();
						this.state = 1264;
						this.structAssignment();
						}
						}
					}
					this.state = 1270;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 166, this._ctx);
				}
				this.state = 1272;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 1271;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 1276;
			this.match(FppParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
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
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 182;
		this.enterRecursionRule(_localctx, 182, FppParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1292;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__12:
				{
				this.state = 1279;
				this.match(FppParser.T__12);
				this.state = 1280;
				_localctx._unary = this.expr(11);
				}
				break;
			case FppParser.T__1:
				{
				this.state = 1281;
				this.arrayExpr();
				}
				break;
			case FppParser.T__5:
				{
				this.state = 1282;
				this.structExpr();
				}
				break;
			case FppParser.IDENTIFIER:
				{
				this.state = 1283;
				this.qualIdent();
				}
				break;
			case FppParser.LIT_BOOLEAN:
				{
				this.state = 1284;
				this.match(FppParser.LIT_BOOLEAN);
				}
				break;
			case FppParser.LIT_FLOAT:
				{
				this.state = 1285;
				this.match(FppParser.LIT_FLOAT);
				}
				break;
			case FppParser.LIT_INT:
				{
				this.state = 1286;
				this.match(FppParser.LIT_INT);
				}
				break;
			case FppParser.LIT_STRING:
				{
				this.state = 1287;
				this.match(FppParser.LIT_STRING);
				}
				break;
			case FppParser.T__8:
				{
				this.state = 1288;
				this.match(FppParser.T__8);
				this.state = 1289;
				_localctx._p = this.expr(0);
				this.state = 1290;
				this.match(FppParser.T__9);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1302;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 171, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1300;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 170, this._ctx) ) {
					case 1:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_expr);
						this.state = 1294;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 1295;
						_localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === FppParser.T__13 || _la === FppParser.T__14)) {
							_localctx._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1296;
						_localctx._right = this.expr(11);
						}
						break;

					case 2:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_expr);
						this.state = 1297;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 1298;
						_localctx._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === FppParser.T__12 || _la === FppParser.T__15)) {
							_localctx._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1299;
						_localctx._right = this.expr(10);
						}
						break;
					}
					}
				}
				this.state = 1304;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 171, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public postAnnotation(): PostAnnotationContext {
		let _localctx: PostAnnotationContext = new PostAnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, FppParser.RULE_postAnnotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1305;
			this.match(FppParser.ANNOTATION);
			this.state = 1309;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1306;
				this.match(FppParser.NL);
				}
				}
				this.state = 1311;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public postMultiAnnotation(): PostMultiAnnotationContext {
		let _localctx: PostMultiAnnotationContext = new PostMultiAnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, FppParser.RULE_postMultiAnnotation);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1313;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 1312;
					this.match(FppParser.ANNOTATION);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1315;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 173, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 1320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1317;
				this.match(FppParser.NL);
				}
				}
				this.state = 1322;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public preAnnotation(): PreAnnotationContext {
		let _localctx: PreAnnotationContext = new PreAnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, FppParser.RULE_preAnnotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1323;
				this.match(FppParser.ANNOTATION);
				}
				}
				this.state = 1326;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FppParser.ANNOTATION);
			this.state = 1331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1328;
				this.match(FppParser.NL);
				}
				}
				this.state = 1333;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 91:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);

		case 1:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x85\u0539\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x03\x02\x07\x02\xC2\n\x02\f\x02\x0E\x02\xC5\v\x02\x03\x02\x03\x02\x03" +
		"\x02\x05\x02\xCA\n\x02\x07\x02\xCC\n\x02\f\x02\x0E\x02\xCF\v\x02\x03\x02" +
		"\x07\x02\xD2\n\x02\f\x02\x0E\x02\xD5\v\x02\x03\x02\x03\x02\x03\x03\x07" +
		"\x03\xDA\n\x03\f\x03\x0E\x03\xDD\v\x03\x03\x03\x03\x03\x03\x03\x05\x03" +
		"\xE2\n\x03\x07\x03\xE4\n\x03\f\x03\x0E\x03\xE7\v\x03\x03\x03\x07\x03\xEA" +
		"\n\x03\f\x03\x0E\x03\xED\v\x03\x03\x03\x03\x03\x03\x04\x07\x04\xF2\n\x04" +
		"\f\x04\x0E\x04\xF5\v\x04\x03\x04\x03\x04\x03\x04\x05\x04\xFA\n\x04\x07" +
		"\x04\xFC\n\x04\f\x04\x0E\x04\xFF\v\x04\x03\x04\x07\x04\u0102\n\x04\f\x04" +
		"\x0E\x04\u0105\v\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x05\x07\u011A\n\x07\x03\x07\x03\x07\x05\x07" +
		"\u011E\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x05\t\u012B\n\t\x03\t\x03\t\x03\t\x05\t\u0130\n\t\x03\n\x05\n" +
		"\u0133\n\n\x03\n\x03\n\x05\n\u0137\n\n\x03\n\x03\n\x05\n\u013B\n\n\x03" +
		"\v\x05\v\u013E\n\v\x03\v\x03\v\x05\v\u0142\n\v\x03\v\x03\v\x05\v\u0146" +
		"\n\v\x03\f\x03\f\x03\f\x03\f\x07\f\u014C\n\f\f\f\x0E\f\u014F\v\f\x03\f" +
		"\x07\f\u0152\n\f\f\f\x0E\f\u0155\v\f\x03\f\x05\f\u0158\n\f\x03\f\x03\f" +
		"\x03\f\x05\f\u015D\n\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\u0167\n\x0F\x03\x0F\x03\x0F\x05\x0F\u016B\n\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\u016F\n\x0F\x03\x0F\x05\x0F\u0172\n\x0F\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u017A\n\x10\x03\x10\x03\x10" +
		"\x05\x10\u017E\n\x10\x03\x10\x03\x10\x03\x10\x05\x10\u0183\n\x10\x03\x10" +
		"\x03\x10\x03\x10\x05\x10\u0188\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x05\x11\u0191\n\x11\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12" +
		"\u01A8\n\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u01AE\n\x12\x03\x13" +
		"\x03\x13\x05\x13\u01B2\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x05\x14\u01BC\n\x14\x03\x14\x03\x14\x03\x14\x05\x14" +
		"\u01C1\n\x14\x03\x14\x05\x14\u01C4\n\x14\x03\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x07\x18\u01D1" +
		"\n\x18\f\x18\x0E\x18\u01D4\v\x18\x03\x18\x03\x18\x03\x18\x03\x18\x07\x18" +
		"\u01DA\n\x18\f\x18\x0E\x18\u01DD\v\x18\x03\x18\x05\x18\u01E0\n\x18\x05" +
		"\x18\u01E2\n\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x05\x19\u01E9" +
		"\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u01F1\n" +
		"\x1A\x03\x1A\x03\x1A\x05\x1A\u01F5\n\x1A\x03\x1A\x03\x1A\x05\x1A\u01F9" +
		"\n\x1A\x03\x1A\x03\x1A\x05\x1A\u01FD\n\x1A\x03\x1A\x03\x1A\x05\x1A\u0201" +
		"\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u0207\n\x1B\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x07\x1C\u020D\n\x1C\f\x1C\x0E\x1C\u0210\v\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u0218\n\x1C\f\x1C" +
		"\x0E\x1C\u021B\v\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05" +
		"\x1D\u0223\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0229\n\x1E\x03" +
		"\x1F\x03\x1F\x03\x1F\x07\x1F\u022E\n\x1F\f\x1F\x0E\x1F\u0231\v\x1F\x03" +
		"\x1F\x03\x1F\x03\x1F\x03\x1F\x07\x1F\u0237\n\x1F\f\x1F\x0E\x1F\u023A\v" +
		"\x1F\x05\x1F\u023C\n\x1F\x03\x1F\x05\x1F\u023F\n\x1F\x03\x1F\x03\x1F\x03" +
		" \x05 \u0244\n \x03 \x03 \x03 \x03!\x03!\x03!\x03\"\x03\"\x05\"\u024E" +
		"\n\"\x03#\x03#\x03#\x03#\x05#\u0254\n#\x03#\x03#\x03$\x03$\x03$\x03%\x03" +
		"%\x03%\x03&\x03&\x03&\x03&\x03&\x03&\x05&\u0264\n&\x03\'\x05\'\u0267\n" +
		"\'\x03\'\x03\'\x05\'\u026B\n\'\x03(\x03(\x03(\x03(\x07(\u0271\n(\f(\x0E" +
		"(\u0274\v(\x03(\x03(\x03(\x07(\u0279\n(\f(\x0E(\u027C\v(\x03(\x07(\u027F" +
		"\n(\f(\x0E(\u0282\v(\x03(\x05(\u0285\n(\x03)\x03)\x03)\x03)\x03)\x03)" +
		"\x05)\u028D\n)\x03*\x05*\u0290\n*\x03*\x03*\x05*\u0294\n*\x03+\x03+\x03" +
		"+\x03+\x03+\x07+\u029B\n+\f+\x0E+\u029E\v+\x03+\x03+\x03+\x07+\u02A3\n" +
		"+\f+\x0E+\u02A6\v+\x03+\x07+\u02A9\n+\f+\x0E+\u02AC\v+\x03+\x05+\u02AF" +
		"\n+\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x05,\u02B9\n,\x03,\x05,\u02BC" +
		"\n,\x03-\x03-\x03-\x05-\u02C1\n-\x03.\x05.\u02C4\n.\x03.\x03.\x05.\u02C8" +
		"\n.\x03.\x03.\x05.\u02CC\n.\x03/\x05/\u02CF\n/\x03/\x03/\x05/\u02D3\n" +
		"/\x03/\x03/\x05/\u02D7\n/\x030\x030\x030\x030\x050\u02DD\n0\x030\x030" +
		"\x070\u02E1\n0\f0\x0E0\u02E4\v0\x030\x070\u02E7\n0\f0\x0E0\u02EA\v0\x03" +
		"0\x050\u02ED\n0\x030\x030\x030\x050\u02F2\n0\x031\x031\x031\x031\x031" +
		"\x031\x031\x031\x031\x031\x031\x051\u02FF\n1\x032\x032\x032\x052\u0304" +
		"\n2\x032\x032\x032\x032\x052\u030A\n2\x032\x032\x032\x032\x052\u0310\n" +
		"2\x033\x033\x033\x034\x034\x034\x034\x034\x035\x035\x035\x035\x055\u031E" +
		"\n5\x035\x035\x055\u0322\n5\x035\x055\u0325\n5\x036\x036\x036\x036\x03" +
		"6\x036\x056\u032D\n6\x036\x036\x056\u0331\n6\x037\x037\x037\x037\x037" +
		"\x057\u0338\n7\x037\x037\x037\x057\u033D\n7\x038\x058\u0340\n8\x038\x03" +
		"8\x038\x038\x039\x039\x039\x039\x039\x039\x039\x039\x039\x059\u034F\n" +
		"9\x039\x039\x059\u0353\n9\x039\x039\x039\x059\u0358\n9\x039\x039\x039" +
		"\x059\u035D\n9\x039\x039\x059\u0361\n9\x039\x039\x059\u0365\n9\x039\x03" +
		"9\x079\u0369\n9\f9\x0E9\u036C\v9\x039\x039\x039\x079\u0371\n9\f9\x0E9" +
		"\u0374\v9\x039\x079\u0377\n9\f9\x0E9\u037A\v9\x039\x059\u037D\n9\x03:" +
		"\x03:\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03" +
		";\x03;\x03;\x03;\x03;\x03;\x03;\x05;\u0394\n;\x03<\x05<\u0397\n<\x03<" +
		"\x03<\x05<\u039B\n<\x03=\x03=\x03=\x03=\x03=\x07=\u03A2\n=\f=\x0E=\u03A5" +
		"\v=\x03=\x03=\x03=\x07=\u03AA\n=\f=\x0E=\u03AD\v=\x03=\x07=\u03B0\n=\f" +
		"=\x0E=\u03B3\v=\x03=\x03=\x03>\x03>\x03>\x05>\u03BA\n>\x03>\x03>\x05>" +
		"\u03BE\n>\x03?\x05?\u03C1\n?\x03?\x03?\x03?\x03@\x03@\x03@\x03@\x03@\x05" +
		"@\u03CB\n@\x03A\x03A\x03A\x03A\x03B\x03B\x03B\x03B\x07B\u03D5\nB\fB\x0E" +
		"B\u03D8\vB\x03B\x03B\x03B\x07B\u03DD\nB\fB\x0EB\u03E0\vB\x03B\x07B\u03E3" +
		"\nB\fB\x0EB\u03E6\vB\x03B\x03B\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03" +
		"C\x05C\u03F2\nC\x03D\x03D\x03D\x03D\x07D\u03F8\nD\fD\x0ED\u03FB\vD\x03" +
		"D\x05D\u03FE\nD\x03E\x03E\x03E\x03E\x03E\x05E\u0405\nE\x03F\x03F\x03F" +
		"\x03G\x03G\x03G\x03G\x03G\x05G\u040F\nG\x03H\x05H\u0412\nH\x03H\x03H\x05" +
		"H\u0416\nH\x03I\x03I\x03I\x03I\x07I\u041C\nI\fI\x0EI\u041F\vI\x03I\x03" +
		"I\x03I\x07I\u0424\nI\fI\x0EI\u0427\vI\x03I\x07I\u042A\nI\fI\x0EI\u042D" +
		"\vI\x03I\x03I\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x05J\u0439\nJ\x03" +
		"K\x03K\x03K\x03K\x03K\x03K\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03" +
		"L\x03L\x03L\x03L\x03L\x03L\x05L\u044F\nL\x03M\x05M\u0452\nM\x03M\x03M" +
		"\x05M\u0456\nM\x03N\x03N\x03N\x03N\x07N\u045C\nN\fN\x0EN\u045F\vN\x03" +
		"N\x03N\x03N\x07N\u0464\nN\fN\x0EN\u0467\vN\x03N\x07N\u046A\nN\fN\x0EN" +
		"\u046D\vN\x03N\x03N\x03O\x05O\u0472\nO\x03O\x03O\x03O\x03O\x03P\x05P\u0479" +
		"\nP\x03P\x03P\x05P\u047D\nP\x03P\x03P\x05P\u0481\nP\x03Q\x05Q\u0484\n" +
		"Q\x03Q\x03Q\x05Q\u0488\nQ\x03Q\x03Q\x05Q\u048C\nQ\x03R\x03R\x07R\u0490" +
		"\nR\fR\x0ER\u0493\vR\x03R\x07R\u0496\nR\fR\x0ER\u0499\vR\x03R\x05R\u049C" +
		"\nR\x03R\x03R\x03S\x03S\x03S\x07S\u04A3\nS\fS\x0ES\u04A6\vS\x03T\x03T" +
		"\x03U\x03U\x03V\x03V\x03V\x05V\u04AF\nV\x03W\x03W\x03W\x05W\u04B4\nW\x03" +
		"X\x03X\x07X\u04B8\nX\fX\x0EX\u04BB\vX\x03X\x06X\u04BE\nX\rX\x0EX\u04BF" +
		"\x05X\u04C2\nX\x03Y\x03Y\x07Y\u04C6\nY\fY\x0EY\u04C9\vY\x03Y\x06Y\u04CC" +
		"\nY\rY\x0EY\u04CD\x05Y\u04D0\nY\x03Z\x03Z\x07Z\u04D4\nZ\fZ\x0EZ\u04D7" +
		"\vZ\x03Z\x03Z\x03Z\x03Z\x07Z\u04DD\nZ\fZ\x0EZ\u04E0\vZ\x05Z\u04E2\nZ\x03" +
		"Z\x03Z\x03[\x03[\x03[\x03[\x03\\\x03\\\x07\\\u04EC\n\\\f\\\x0E\\\u04EF" +
		"\v\\\x03\\\x03\\\x03\\\x03\\\x07\\\u04F5\n\\\f\\\x0E\\\u04F8\v\\\x03\\" +
		"\x05\\\u04FB\n\\\x05\\\u04FD\n\\\x03\\\x03\\\x03]\x03]\x03]\x03]\x03]" +
		"\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x05]\u050F\n]\x03]\x03]" +
		"\x03]\x03]\x03]\x03]\x07]\u0517\n]\f]\x0E]\u051A\v]\x03^\x03^\x07^\u051E" +
		"\n^\f^\x0E^\u0521\v^\x03_\x06_\u0524\n_\r_\x0E_\u0525\x03_\x07_\u0529" +
		"\n_\f_\x0E_\u052C\v_\x03`\x06`\u052F\n`\r`\x0E`\u0530\x03`\x07`\u0534" +
		"\n`\f`\x0E`\u0537\v`\x03`\x02\x02\x03\xB8a\x02\x02\x04\x02\x06\x02\b\x02" +
		"\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C" +
		"\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026" +
		"\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02" +
		"R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02" +
		"n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02" +
		"\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02" +
		"\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02" +
		"\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA\x02" +
		"\xBC\x02\xBE\x02\x02\n\x06\x02++//<<KK\x05\x02,,HHxx\x05\x02[[hh\x84\x84" +
		"\x05\x02\'\'^^ee\x03\x02\x1E%\x04\x02\x1C%00\x03\x02\x10\x11\x04\x02\x0F" +
		"\x0F\x12\x12\x02\u05D9\x02\xC3\x03\x02\x02\x02\x04\xDB\x03\x02\x02\x02" +
		"\x06\xF3\x03\x02\x02\x02\b\u0108\x03\x02\x02\x02\n\u010B\x03\x02\x02\x02" +
		"\f\u0110\x03\x02\x02\x02\x0E\u011F\x03\x02\x02\x02\x10\u0124\x03\x02\x02" +
		"\x02\x12\u0132\x03\x02\x02\x02\x14\u013D\x03\x02\x02\x02\x16\u0147\x03" +
		"\x02\x02\x02\x18\u015E\x03\x02\x02\x02\x1A\u0160\x03\x02\x02\x02\x1C\u0162" +
		"\x03\x02\x02\x02\x1E\u0173\x03\x02\x02\x02 \u0190\x03\x02\x02\x02\"\u01AD" +
		"\x03\x02\x02\x02$\u01B1\x03\x02\x02\x02&\u01B3\x03\x02\x02\x02(\u01C5" +
		"\x03\x02\x02\x02*\u01C9\x03\x02\x02\x02,\u01CB\x03\x02\x02\x02.\u01CE" +
		"\x03\x02\x02\x020\u01E8\x03\x02\x02\x022\u01EA\x03\x02\x02\x024\u0202" +
		"\x03\x02\x02\x026\u0208\x03\x02\x02\x028\u021E\x03\x02\x02\x02:\u0224" +
		"\x03\x02\x02\x02<\u022A\x03\x02\x02\x02>\u0243\x03\x02\x02\x02@\u0248" +
		"\x03\x02\x02\x02B\u024D\x03\x02\x02\x02D\u024F\x03\x02\x02\x02F\u0257" +
		"\x03\x02\x02\x02H\u025A\x03\x02\x02\x02J\u0263\x03\x02\x02\x02L\u0266" +
		"\x03\x02\x02\x02N\u026C\x03\x02\x02\x02P\u028C\x03\x02\x02\x02R\u028F" +
		"\x03\x02\x02\x02T\u0295\x03\x02\x02\x02V\u02B0\x03\x02\x02\x02X\u02BD" +
		"\x03\x02\x02\x02Z\u02C3\x03\x02\x02\x02\\\u02CE\x03\x02\x02\x02^\u02D8" +
		"\x03\x02\x02\x02`\u02FE\x03\x02\x02\x02b\u0300\x03\x02\x02\x02d\u0311" +
		"\x03\x02\x02\x02f\u0314\x03\x02\x02\x02h\u0319\x03\x02\x02\x02j\u0326" +
		"\x03\x02\x02\x02l\u0332\x03\x02\x02\x02n\u033F\x03\x02\x02\x02p\u0345" +
		"\x03\x02\x02\x02r\u037E\x03\x02\x02\x02t\u0393\x03\x02\x02\x02v\u0396" +
		"\x03\x02\x02\x02x\u039C\x03\x02\x02\x02z\u03B6\x03\x02\x02\x02|\u03C0" +
		"\x03\x02\x02\x02~\u03C5\x03\x02\x02\x02\x80\u03CC\x03\x02\x02\x02\x82" +
		"\u03D0\x03\x02\x02\x02\x84\u03F1\x03\x02\x02\x02\x86\u03F3\x03\x02\x02" +
		"\x02\x88\u03FF\x03\x02\x02\x02\x8A\u0406\x03\x02\x02\x02\x8C\u040E\x03" +
		"\x02\x02\x02\x8E\u0411\x03\x02\x02\x02\x90\u0417\x03\x02\x02\x02\x92\u0438" +
		"\x03\x02\x02\x02\x94\u043A\x03\x02\x02\x02\x96\u044E\x03\x02\x02\x02\x98" +
		"\u0451\x03\x02\x02\x02\x9A\u0457\x03\x02\x02\x02\x9C\u0471\x03\x02\x02" +
		"\x02\x9E\u0478\x03\x02\x02\x02\xA0\u0483\x03\x02\x02\x02\xA2\u048D\x03" +
		"\x02\x02\x02\xA4\u049F\x03\x02\x02\x02\xA6\u04A7\x03\x02\x02\x02\xA8\u04A9" +
		"\x03\x02\x02\x02\xAA\u04AB\x03\x02\x02\x02\xAC\u04B3\x03\x02\x02\x02\xAE" +
		"\u04C1\x03\x02\x02\x02\xB0\u04CF\x03\x02\x02\x02\xB2\u04D1\x03\x02\x02" +
		"\x02\xB4\u04E5\x03\x02\x02\x02\xB6\u04E9\x03\x02\x02\x02\xB8\u050E\x03" +
		"\x02\x02\x02\xBA\u051B\x03\x02\x02\x02\xBC\u0523\x03\x02\x02\x02\xBE\u052E" +
		"\x03\x02\x02\x02\xC0\xC2\x07\x13\x02\x02\xC1\xC0\x03\x02\x02\x02\xC2\xC5" +
		"\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xCD" +
		"\x03\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC6\xC9\x05\x98M\x02\xC7\xCA" +
		"\x05\xB0Y\x02\xC8\xCA\x07\x02\x02\x03\xC9\xC7\x03\x02\x02\x02\xC9\xC8" +
		"\x03\x02\x02\x02\xCA\xCC\x03\x02\x02\x02\xCB\xC6\x03\x02\x02\x02\xCC\xCF" +
		"\x03\x02\x02\x02\xCD\xCB\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE\xD3" +
		"\x03\x02\x02\x02\xCF\xCD\x03\x02\x02\x02\xD0\xD2\x07\x13\x02\x02\xD1\xD0" +
		"\x03\x02\x02\x02\xD2\xD5\x03\x02\x02\x02\xD3\xD1\x03\x02\x02\x02\xD3\xD4" +
		"\x03\x02\x02\x02\xD4\xD6\x03\x02\x02\x02\xD5\xD3\x03\x02\x02\x02\xD6\xD7" +
		"\x07\x02\x02\x03\xD7\x03\x03\x02\x02\x02\xD8\xDA\x07\x13\x02\x02\xD9\xD8" +
		"\x03\x02\x02\x02\xDA\xDD\x03\x02\x02\x02\xDB\xD9\x03\x02\x02\x02\xDB\xDC" +
		"\x03\x02\x02\x02\xDC\xE5\x03\x02\x02\x02\xDD\xDB\x03\x02\x02\x02\xDE\xE1" +
		"\x05\x8EH\x02\xDF\xE2\x05\xB0Y\x02\xE0\xE2\x07\x02\x02\x03\xE1\xDF\x03" +
		"\x02\x02\x02\xE1\xE0\x03\x02\x02\x02\xE2\xE4\x03\x02\x02\x02\xE3\xDE\x03" +
		"\x02\x02\x02\xE4\xE7\x03\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE5\xE6\x03" +
		"\x02\x02\x02\xE6\xEB\x03\x02\x02\x02\xE7\xE5\x03\x02\x02\x02\xE8\xEA\x07" +
		"\x13\x02\x02\xE9\xE8\x03\x02\x02\x02\xEA\xED\x03\x02\x02\x02\xEB\xE9\x03" +
		"\x02\x02\x02\xEB\xEC\x03\x02\x02\x02\xEC\xEE\x03\x02\x02\x02\xED\xEB\x03" +
		"\x02\x02\x02\xEE\xEF\x07\x02\x02\x03\xEF\x05\x03\x02\x02\x02\xF0\xF2\x07" +
		"\x13\x02\x02\xF1\xF0\x03\x02\x02\x02\xF2\xF5\x03\x02\x02\x02\xF3\xF1\x03" +
		"\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xFD\x03\x02\x02\x02\xF5\xF3\x03" +
		"\x02\x02\x02\xF6\xF9\x05v<\x02\xF7\xFA\x05\xB0Y\x02\xF8\xFA\x07\x02\x02" +
		"\x03\xF9\xF7\x03\x02\x02\x02\xF9\xF8\x03\x02\x02\x02\xFA\xFC\x03\x02\x02" +
		"\x02\xFB\xF6\x03\x02\x02\x02\xFC\xFF\x03\x02\x02\x02\xFD\xFB\x03\x02\x02" +
		"\x02\xFD\xFE\x03\x02\x02\x02\xFE\u0103\x03\x02\x02\x02\xFF\xFD\x03\x02" +
		"\x02\x02\u0100\u0102\x07\x13\x02\x02\u0101\u0100\x03\x02\x02\x02\u0102" +
		"\u0105\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02" +
		"\x02\x02\u0104\u0106\x03\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0106" +
		"\u0107\x07\x02\x02\x03\u0107\x07\x03\x02\x02\x02\u0108\u0109\x07\x7F\x02" +
		"\x02\u0109\u010A\x07\x85\x02\x02\u010A\t\x03\x02\x02\x02\u010B\u010C\x07" +
		"\x7F\x02\x02\u010C\u010D\x07\x85\x02\x02\u010D\u010E\x07\x03\x02\x02\u010E" +
		"\u010F\x05\xACW\x02\u010F\v\x03\x02\x02\x02\u0110\u0111\x07*\x02\x02\u0111" +
		"\u0112\x07\x85\x02\x02\u0112\u0113\x07\x03\x02\x02\u0113\u0114\x07\x04" +
		"\x02\x02\u0114\u0115\x05\xB8]\x02\u0115\u0116\x07\x05\x02\x02\u0116\u0119" +
		"\x05\xACW\x02\u0117\u0118\x079\x02\x02\u0118\u011A\x05\xB2Z\x02\u0119" +
		"\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A\u011D\x03\x02" +
		"\x02\x02\u011B\u011C\x07E\x02\x02\u011C\u011E\x07\x19\x02\x02\u011D\u011B" +
		"\x03\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E\r\x03\x02\x02\x02\u011F" +
		"\u0120\x076\x02\x02\u0120\u0121\x07\x85\x02\x02\u0121\u0122\x07\x03\x02" +
		"\x02\u0122\u0123\x05\xB8]\x02\u0123\x0F\x03\x02\x02\x02\u0124\u0125\x07" +
		"\x85\x02\x02\u0125\u012A\x07\x06\x02\x02\u0126\u0127\x07\x04\x02\x02\u0127" +
		"\u0128\x05\xB8]\x02\u0128\u0129\x07\x05\x02\x02\u0129\u012B\x03\x02\x02" +
		"\x02\u012A\u0126\x03\x02\x02\x02\u012A\u012B\x03\x02\x02\x02\u012B\u012C" +
		"\x03\x02\x02\x02\u012C\u012F\x05\xACW\x02\u012D\u012E\x07E\x02\x02\u012E" +
		"\u0130\x07\x19\x02\x02\u012F\u012D\x03\x02\x02\x02\u012F\u0130\x03\x02" +
		"\x02\x02\u0130\x11\x03\x02\x02\x02\u0131\u0133\x05\xBE`\x02\u0132\u0131" +
		"\x03\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133\u0134\x03\x02\x02\x02" +
		"\u0134\u013A\x05\x10\t\x02\u0135\u0137\x07\x07\x02\x02\u0136\u0135\x03" +
		"\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02\u0138" +
		"\u013B\x05\xBC_\x02\u0139\u013B\x05\xAEX\x02\u013A\u0136\x03\x02\x02\x02" +
		"\u013A\u0139\x03\x02\x02\x02\u013B\x13\x03\x02\x02\x02\u013C\u013E\x05" +
		"\xBE`\x02\u013D\u013C\x03\x02\x02\x02\u013D\u013E\x03\x02\x02\x02\u013E" +
		"\u013F\x03\x02\x02\x02\u013F\u0145\x05\x10\t\x02\u0140\u0142\x07\x07\x02" +
		"\x02\u0141\u0140\x03\x02\x02\x02\u0141\u0142\x03\x02\x02\x02\u0142\u0143" +
		"\x03\x02\x02\x02\u0143\u0146\x05\xBC_\x02\u0144\u0146\x05\xAEX\x02\u0145" +
		"\u0141\x03\x02\x02\x02\u0145\u0144\x03\x02\x02\x02\u0145\u0146\x03\x02" +
		"\x02\x02\u0146\x15\x03\x02\x02\x02\u0147\u0148\x07w\x02\x02\u0148\u0149" +
		"\x07\x85\x02\x02\u0149\u014D\x07\b\x02\x02\u014A\u014C\x07\x13\x02\x02" +
		"\u014B\u014A\x03\x02\x02\x02\u014C\u014F\x03\x02\x02\x02\u014D\u014B\x03" +
		"\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0157\x03\x02\x02\x02\u014F" +
		"\u014D\x03\x02\x02\x02\u0150\u0152\x05\x12\n\x02\u0151\u0150\x03\x02\x02" +
		"\x02\u0152\u0155\x03\x02\x02\x02\u0153\u0151\x03\x02\x02\x02\u0153\u0154" +
		"\x03\x02\x02\x02\u0154\u0156\x03\x02\x02\x02\u0155\u0153\x03\x02\x02\x02" +
		"\u0156\u0158\x05\x14\v\x02\u0157\u0153\x03\x02\x02\x02\u0157\u0158\x03" +
		"\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159\u015C\x07\t\x02\x02\u015A" +
		"\u015B\x079\x02\x02\u015B\u015D\x05\xB6\\\x02\u015C\u015A\x03\x02\x02" +
		"\x02\u015C\u015D\x03\x02\x02\x02\u015D\x17\x03\x02\x02\x02\u015E\u015F" +
		"\t\x02\x02\x02\u015F\x19\x03\x02\x02\x02\u0160\u0161\t\x03\x02\x02\u0161" +
		"\x1B\x03\x02\x02\x02\u0162\u0163\x05\x1A\x0E\x02\u0163\u0164\x073\x02" +
		"\x02\u0164\u0166\x07\x85\x02\x02\u0165\u0167\x05\xA2R\x02\u0166\u0165" +
		"\x03\x02\x02\x02\u0166\u0167\x03\x02\x02\x02\u0167\u016A\x03\x02\x02\x02" +
		"\u0168\u0169\x07Z\x02\x02\u0169\u016B\x05\xB8]\x02\u016A\u0168\x03\x02" +
		"\x02\x02\u016A\u016B\x03\x02\x02\x02\u016B\u016E\x03\x02\x02\x02\u016C" +
		"\u016D\x07a\x02\x02\u016D\u016F\x05\xB8]\x02\u016E\u016C\x03\x02\x02\x02" +
		"\u016E\u016F\x03\x02\x02\x02\u016F\u0171\x03\x02\x02\x02\u0170\u0172\x05" +
		"\x18\r\x02\u0171\u0170\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172" +
		"\x1D\x03\x02\x02\x02\u0173";
	private static readonly _serializedATNSegment1: string =
		"\u0174\x07]\x02\x02\u0174\u0175\x07\x85\x02\x02\u0175\u0176\x07\x06\x02" +
		"\x02\u0176\u0179\x05\xACW\x02\u0177\u0178\x079\x02\x02\u0178\u017A\x05" +
		"\xB8]\x02\u0179\u0177\x03\x02\x02\x02\u0179\u017A\x03\x02\x02\x02\u017A" +
		"\u017D\x03\x02\x02\x02\u017B\u017C\x07L\x02\x02\u017C\u017E\x05\xB8]\x02" +
		"\u017D\u017B\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u0182\x03" +
		"\x02\x02\x02\u017F\u0180\x07p\x02\x02\u0180\u0181\x07Z\x02\x02\u0181\u0183" +
		"\x05\xB8]\x02\u0182\u017F\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02" +
		"\u0183\u0187\x03\x02\x02\x02\u0184\u0185\x07m\x02\x02\u0185\u0186\x07" +
		"Z\x02\x02\u0186\u0188\x05\xB8]\x02\u0187\u0184\x03\x02\x02\x02\u0187\u0188" +
		"\x03\x02\x02\x02\u0188\x1F\x03\x02\x02\x02\u0189\u018A\x07,\x02\x02\u018A" +
		"\u0191\x07Q\x02\x02\u018B\u018C\x07H\x02\x02\u018C\u0191\x07Q\x02\x02" +
		"\u018D\u018E\x07x\x02\x02\u018E\u0191\x07Q\x02\x02\u018F\u0191\x07\\\x02" +
		"\x02\u0190\u0189\x03\x02\x02\x02\u0190\u018B\x03\x02\x02\x02\u0190\u018D" +
		"\x03\x02\x02\x02\u0190\u018F\x03\x02\x02\x02\u0191!\x03\x02\x02\x02\u0192" +
		"\u0193\x073\x02\x02\u0193\u01AE\x07g\x02\x02\u0194\u0195\x073\x02\x02" +
		"\u0195\u01AE\x07j\x02\x02\u0196\u0197\x073\x02\x02\u0197\u01AE\x07l\x02" +
		"\x02\u0198\u01AE\x07A\x02\x02\u0199\u019A\x07]\x02\x02\u019A\u01AE\x07" +
		"F\x02\x02\u019B\u019C\x07]\x02\x02\u019C\u01AE\x07p\x02\x02\u019D\u01AE" +
		"\x07y\x02\x02\u019E\u019F\x07z\x02\x02\u019F\u01AE\x07A\x02\x02\u01A0" +
		"\u01A1\x07|\x02\x02\u01A1\u01AE\x07F\x02\x02\u01A2\u01A3\x07c\x02\x02" +
		"\u01A3\u01AE\x07F\x02\x02\u01A4\u01A5\x07c\x02\x02\u01A5\u01AE\x07k\x02" +
		"\x02\u01A6\u01A8\x07,\x02\x02\u01A7\u01A6\x03\x02\x02\x02\u01A7\u01A8" +
		"\x03\x02\x02\x02\u01A8\u01A9\x03\x02\x02\x02\u01A9\u01AA\x07c\x02\x02" +
		"\u01AA\u01AE\x07g\x02\x02\u01AB\u01AC\x07c\x02\x02\u01AC\u01AE\x07n\x02" +
		"\x02\u01AD\u0192\x03\x02\x02\x02\u01AD\u0194\x03\x02\x02\x02\u01AD\u0196" +
		"\x03\x02\x02\x02\u01AD\u0198\x03\x02\x02\x02\u01AD\u0199\x03\x02\x02\x02" +
		"\u01AD\u019B\x03\x02\x02\x02\u01AD\u019D\x03\x02\x02\x02\u01AD\u019E\x03" +
		"\x02\x02\x02\u01AD\u01A0\x03\x02\x02\x02\u01AD\u01A2\x03\x02\x02\x02\u01AD" +
		"\u01A4\x03\x02\x02\x02\u01AD\u01A7\x03\x02\x02\x02\u01AD\u01AB\x03\x02" +
		"\x02\x02\u01AE#\x03\x02\x02\x02\u01AF\u01B2\x07o\x02\x02\u01B0\u01B2\x05" +
		"\xA4S\x02\u01B1\u01AF\x03\x02\x02\x02\u01B1\u01B0\x03\x02\x02\x02\u01B2" +
		"%\x03\x02\x02\x02\u01B3\u01B4\x05 \x11\x02\u01B4\u01B5\x07`\x02\x02\u01B5" +
		"\u01B6\x07\x85\x02\x02\u01B6\u01BB\x07\x06\x02\x02\u01B7\u01B8\x07\x04" +
		"\x02\x02\u01B8\u01B9\x05\xB8]\x02\u01B9\u01BA\x07\x05\x02\x02\u01BA\u01BC" +
		"\x03\x02\x02\x02\u01BB\u01B7\x03\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02" +
		"\u01BC\u01BD\x03\x02\x02\x02\u01BD\u01C0\x05$\x13\x02\u01BE\u01BF\x07" +
		"a\x02\x02\u01BF\u01C1\x05\xB8]\x02\u01C0\u01BE\x03\x02\x02\x02\u01C0\u01C1" +
		"\x03\x02\x02\x02\u01C1\u01C3\x03\x02\x02\x02\u01C2\u01C4\x05\x18\r\x02" +
		"\u01C3\u01C2\x03\x02\x02\x02\u01C3\u01C4\x03\x02\x02\x02\u01C4\'\x03\x02" +
		"\x02\x02\u01C5\u01C6\x05\"\x12\x02\u01C6\u01C7\x07`\x02\x02\u01C7\u01C8" +
		"\x07\x85\x02\x02\u01C8)\x03\x02\x02\x02\u01C9\u01CA\t\x04\x02\x02\u01CA" +
		"+\x03\x02\x02\x02\u01CB\u01CC\x05*\x16\x02\u01CC\u01CD\x05\xB8]\x02\u01CD" +
		"-\x03\x02\x02\x02\u01CE\u01D2\x07\b\x02\x02\u01CF\u01D1\x07\x13\x02\x02" +
		"\u01D0\u01CF\x03\x02\x02\x02\u01D1\u01D4\x03\x02\x02\x02\u01D2\u01D0\x03" +
		"\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3\u01E1\x03\x02\x02\x02\u01D4" +
		"\u01D2\x03\x02\x02\x02\u01D5\u01DB\x05,\x17\x02\u01D6\u01D7\x05\xAEX\x02" +
		"\u01D7\u01D8\x05,\x17\x02\u01D8\u01DA\x03\x02\x02\x02\u01D9\u01D6\x03" +
		"\x02\x02\x02\u01DA\u01DD\x03\x02\x02\x02\u01DB\u01D9\x03\x02\x02\x02\u01DB" +
		"\u01DC\x03\x02\x02\x02\u01DC\u01DF\x03\x02\x02\x02\u01DD\u01DB\x03\x02" +
		"\x02\x02\u01DE\u01E0\x05\xAEX\x02\u01DF\u01DE\x03\x02\x02\x02\u01DF\u01E0" +
		"\x03\x02\x02\x02\u01E0\u01E2\x03\x02\x02\x02\u01E1\u01D5\x03\x02\x02\x02" +
		"\u01E1\u01E2\x03\x02\x02\x02\u01E2\u01E3\x03\x02\x02\x02\u01E3\u01E4\x07" +
		"\t\x02\x02\u01E4/\x03\x02\x02\x02\u01E5\u01E9\x07)\x02\x02\u01E6\u01E7" +
		"\x07Y\x02\x02\u01E7\u01E9\x071\x02\x02\u01E8\u01E5\x03\x02\x02\x02\u01E8" +
		"\u01E6\x03\x02\x02\x02\u01E91\x03\x02\x02\x02\u01EA\u01EB\x07y\x02\x02" +
		"\u01EB\u01EC\x07\x85\x02\x02\u01EC\u01ED\x07\x06\x02\x02\u01ED\u01F0\x05" +
		"\xACW\x02\u01EE\u01EF\x07L\x02\x02\u01EF\u01F1\x05\xB8]\x02\u01F0\u01EE" +
		"\x03\x02\x02\x02\u01F0\u01F1\x03\x02\x02\x02\u01F1\u01F4\x03\x02\x02\x02" +
		"\u01F2\u01F3\x07\x81\x02\x02\u01F3\u01F5\x050\x19\x02\u01F4\u01F2\x03" +
		"\x02\x02\x02\u01F4\u01F5\x03\x02\x02\x02\u01F5\u01F8\x03\x02\x02\x02\u01F6" +
		"\u01F7\x07E\x02\x02\u01F7\u01F9\x07\x19\x02\x02\u01F8\u01F6\x03\x02\x02" +
		"\x02\u01F8\u01F9\x03\x02\x02\x02\u01F9\u01FC\x03\x02\x02\x02\u01FA\u01FB" +
		"\x07U\x02\x02\u01FB\u01FD\x05.\x18\x02\u01FC\u01FA\x03\x02\x02\x02\u01FC" +
		"\u01FD\x03\x02\x02\x02\u01FD\u0200\x03\x02\x02\x02\u01FE\u01FF\x07J\x02" +
		"\x02\u01FF\u0201\x05.\x18\x02\u0200\u01FE\x03\x02\x02\x02\u0200\u0201" +
		"\x03\x02\x02\x02\u02013\x03\x02\x02\x02\u0202\u0203\x07&\x02\x02\u0203" +
		"\u0206\x07\x85\x02\x02\u0204\u0205\x07\x06\x02\x02\u0205\u0207\x05\xAC" +
		"W\x02\u0206\u0204\x03\x02\x02\x02\u0206\u0207\x03\x02\x02\x02\u02075\x03" +
		"\x02\x02\x02\u0208\u0209\x072\x02\x02\u0209\u020A\x07\x85\x02\x02\u020A" +
		"\u020E\x07\b\x02\x02\u020B\u020D\x07\x13\x02\x02\u020C\u020B\x03\x02\x02" +
		"\x02\u020D\u0210\x03\x02\x02\x02\u020E\u020C\x03\x02\x02\x02\u020E\u020F" +
		"\x03\x02\x02\x02\u020F\u0211\x03\x02\x02\x02\u0210\u020E\x03\x02\x02\x02" +
		"\u0211\u0212\x07M\x02\x02\u0212\u0213\x07\x85\x02\x02\u0213\u0214\x05" +
		"> \x02\u0214\u0215\x07=\x02\x02\u0215\u0219\x05> \x02\u0216\u0218\x07" +
		"\x13\x02\x02\u0217\u0216\x03\x02\x02\x02\u0218\u021B\x03\x02\x02\x02\u0219" +
		"\u0217\x03\x02\x02\x02\u0219\u021A\x03\x02\x02\x02\u021A\u021C\x03\x02" +
		"\x02\x02\u021B\u0219\x03\x02\x02\x02\u021C\u021D\x07\t\x02\x02\u021D7" +
		"\x03\x02\x02\x02\u021E\u021F\x07G\x02\x02\u021F\u0222\x07\x85\x02\x02" +
		"\u0220\u0221\x07\x06\x02\x02\u0221\u0223\x05\xACW\x02\u0222\u0220\x03" +
		"\x02\x02\x02\u0222\u0223\x03\x02\x02\x02\u02239\x03\x02\x02\x02\u0224" +
		"\u0225\x07r\x02\x02\u0225\u0228\x07\x85\x02\x02\u0226\u0227\x07\x06\x02" +
		"\x02\u0227\u0229\x05\xACW\x02\u0228\u0226\x03\x02\x02\x02\u0228\u0229" +
		"\x03\x02\x02\x02\u0229;\x03\x02\x02\x02\u022A\u022B\x07;\x02\x02\u022B" +
		"\u022F\x07\b\x02\x02\u022C\u022E\x07\x13\x02\x02\u022D\u022C\x03\x02\x02" +
		"\x02\u022E\u0231\x03\x02\x02\x02\u022F\u022D\x03\x02\x02\x02\u022F\u0230" +
		"\x03\x02\x02\x02\u0230\u023B\x03\x02\x02\x02\u0231\u022F\x03\x02\x02\x02" +
		"\u0232\u0238\x07\x85\x02\x02\u0233\u0234\x05\xAEX\x02\u0234\u0235\x07" +
		"\x85\x02\x02\u0235\u0237\x03\x02\x02\x02\u0236\u0233\x03\x02\x02\x02\u0237" +
		"\u023A\x03\x02\x02\x02\u0238\u0236\x03\x02\x02\x02\u0238\u0239\x03\x02" +
		"\x02\x02\u0239\u023C\x03\x02\x02\x02\u023A\u0238\x03\x02\x02\x02\u023B" +
		"\u0232\x03\x02\x02\x02\u023B\u023C\x03\x02\x02\x02\u023C\u023E\x03\x02" +
		"\x02\x02\u023D\u023F\x05\xAEX\x02\u023E\u023D\x03\x02\x02\x02\u023E\u023F" +
		"\x03\x02\x02\x02\u023F\u0240\x03\x02\x02\x02\u0240\u0241\x07\t\x02\x02" +
		"\u0241=\x03\x02\x02\x02\u0242\u0244\x05<\x1F\x02\u0243\u0242\x03\x02\x02" +
		"\x02\u0243\u0244\x03\x02\x02\x02\u0244\u0245\x03\x02\x02\x02\u0245\u0246" +
		"\x07>\x02\x02\u0246\u0247\x05\xA4S\x02\u0247?\x03\x02\x02\x02\u0248\u0249" +
		"\x07P\x02\x02\u0249\u024A\x05> \x02\u024AA\x03\x02\x02\x02\u024B\u024E" +
		"\x05> \x02\u024C\u024E\x05<\x1F\x02\u024D\u024B\x03\x02\x02\x02\u024D" +
		"\u024C\x03\x02\x02\x02\u024EC\x03\x02\x02\x02\u024F\u0250\x07Y\x02\x02" +
		"\u0250\u0253\x07\x85\x02\x02\u0251\u0252\x07M\x02\x02\u0252\u0254\x07" +
		"\x85\x02\x02\u0253\u0251\x03\x02\x02\x02\u0253\u0254\x03\x02\x02\x02\u0254" +
		"\u0255\x03\x02\x02\x02\u0255\u0256\x05B\"\x02\u0256E\x03\x02\x02\x02\u0257" +
		"\u0258\x07?\x02\x02\u0258\u0259\x05<\x1F\x02\u0259G\x03\x02\x02\x02\u025A" +
		"\u025B\x07B\x02\x02\u025B\u025C\x05<\x1F\x02\u025CI\x03\x02\x02\x02\u025D" +
		"\u0264\x05@!\x02\u025E\u0264\x056\x1C\x02\u025F\u0264\x05N(\x02\u0260" +
		"\u0264\x05D#\x02\u0261\u0264\x05F$\x02\u0262\u0264\x05H%\x02\u0263\u025D" +
		"\x03\x02\x02\x02\u0263\u025E\x03\x02\x02\x02\u0263\u025F\x03\x02\x02\x02" +
		"\u0263\u0260\x03\x02\x02\x02\u0263\u0261\x03\x02\x02\x02\u0263\u0262\x03" +
		"\x02\x02\x02\u0264K\x03\x02\x02\x02\u0265\u0267\x05\xBE`\x02\u0266\u0265" +
		"\x03\x02\x02\x02\u0266\u0267\x03\x02\x02\x02\u0267\u0268\x03\x02\x02\x02" +
		"\u0268\u026A\x05J&\x02\u0269\u026B\x07\x17\x02\x02\u026A\u0269\x03\x02" +
		"\x02\x02\u026A\u026B\x03\x02\x02\x02\u026BM\x03\x02\x02\x02\u026C\u026D" +
		"\x07u\x02\x02\u026D\u0284\x07\x85\x02\x02\u026E\u0272\x07\b\x02\x02\u026F" +
		"\u0271\x07\x13\x02\x02\u0270\u026F\x03\x02\x02\x02\u0271\u0274\x03\x02" +
		"\x02\x02\u0272\u0270\x03\x02\x02\x02\u0272\u0273\x03\x02\x02\x02\u0273" +
		"\u027A\x03\x02\x02\x02\u0274\u0272\x03\x02\x02\x02\u0275\u0276\x05L\'" +
		"\x02\u0276\u0277\x05\xB0Y\x02\u0277\u0279\x03\x02\x02\x02\u0278\u0275" +
		"\x03\x02\x02\x02\u0279\u027C\x03\x02\x02\x02\u027A\u0278\x03\x02\x02\x02" +
		"\u027A\u027B\x03\x02\x02\x02\u027B\u0280\x03\x02\x02\x02\u027C\u027A\x03" +
		"\x02\x02\x02\u027D\u027F\x07\x13\x02\x02\u027E\u027D\x03\x02\x02\x02\u027F" +
		"\u0282\x03\x02\x02\x02\u0280\u027E\x03\x02\x02\x02\u0280\u0281\x03\x02" +
		"\x02\x02\u0281\u0283\x03\x02\x02\x02\u0282\u0280\x03\x02\x02\x02\u0283" +
		"\u0285\x07\t\x02\x02\u0284\u026E\x03\x02\x02\x02\u0284\u0285\x03\x02\x02" +
		"\x02\u0285O\x03\x02\x02\x02\u0286\u028D\x056\x1C\x02\u0287\u028D\x058" +
		"\x1D\x02\u0288\u028D\x05@!\x02\u0289\u028D\x05:\x1E\x02\u028A\u028D\x05" +
		"N(\x02\u028B\u028D\x054\x1B\x02\u028C\u0286\x03\x02\x02\x02\u028C\u0287" +
		"\x03\x02\x02\x02\u028C\u0288\x03\x02\x02\x02\u028C\u0289\x03\x02\x02\x02" +
		"\u028C\u028A\x03\x02\x02\x02\u028C\u028B\x03\x02\x02\x02\u028DQ\x03\x02" +
		"\x02\x02\u028E\u0290\x05\xBE`\x02\u028F\u028E\x03\x02\x02\x02\u028F\u0290" +
		"\x03\x02\x02\x02\u0290\u0291\x03\x02\x02\x02\u0291\u0293\x05P)\x02\u0292" +
		"\u0294\x07\x17\x02\x02\u0293\u0292\x03\x02\x02\x02\u0293\u0294\x03\x02" +
		"\x02\x02\u0294S\x03\x02\x02\x02\u0295\u0296\x07u\x02\x02\u0296\u0297\x07" +
		"V\x02\x02\u0297\u02AE\x07\x85\x02\x02\u0298\u029C\x07\b\x02\x02\u0299" +
		"\u029B\x07\x13\x02\x02\u029A\u0299\x03\x02\x02\x02\u029B\u029E\x03\x02" +
		"\x02\x02\u029C\u029A\x03\x02\x02\x02\u029C\u029D\x03\x02\x02\x02\u029D" +
		"\u02A4\x03\x02\x02\x02\u029E\u029C\x03\x02\x02\x02\u029F\u02A0\x05R*\x02" +
		"\u02A0\u02A1\x05\xB0Y\x02\u02A1\u02A3\x03\x02\x02\x02\u02A2\u029F\x03" +
		"\x02\x02\x02\u02A3\u02A6\x03\x02\x02\x02\u02A4\u02A2\x03\x02\x02\x02\u02A4" +
		"\u02A5\x03\x02\x02\x02\u02A5\u02AA\x03\x02\x02\x02\u02A6\u02A4\x03\x02" +
		"\x02\x02\u02A7\u02A9\x07\x13\x02\x02\u02A8\u02A7\x03\x02\x02\x02\u02A9" +
		"\u02AC\x03\x02\x02\x02\u02AA\u02A8\x03\x02\x02\x02\u02AA\u02AB\x03\x02" +
		"\x02\x02\u02AB\u02AD\x03\x02\x02\x02\u02AC\u02AA\x03\x02\x02\x02\u02AD" +
		"\u02AF\x07\t\x02\x02\u02AE\u0298\x03\x02\x02\x02\u02AE\u02AF\x03\x02\x02" +
		"\x02\u02AFU\x03\x02\x02\x02\u02B0\u02B1\x07u\x02\x02\u02B1\u02B2\x07V" +
		"\x02\x02\u02B2\u02B3\x07R\x02\x02\u02B3\u02B4\x07\x85\x02\x02\u02B4\u02B5" +
		"\x07\x06\x02\x02\u02B5\u02B8\x05\xA4S\x02\u02B6\u02B7\x07a\x02\x02\u02B7" +
		"\u02B9\x05\xB8]\x02\u02B8\u02B6\x03\x02\x02\x02\u02B8\u02B9\x03\x02\x02" +
		"\x02\u02B9\u02BB\x03\x02\x02\x02\u02BA\u02BC\x05\x18\r\x02\u02BB\u02BA" +
		"\x03\x02\x02\x02\u02BB\u02BC\x03\x02\x02\x02\u02BCW\x03\x02\x02\x02\u02BD" +
		"\u02C0\x07\x85\x02\x02\u02BE\u02BF\x07\x03\x02\x02\u02BF\u02C1\x05\xB8" +
		"]\x02\u02C0\u02BE\x03\x02\x02\x02\u02C0\u02C1\x03\x02\x02\x02\u02C1Y\x03" +
		"\x02\x02\x02\u02C2\u02C4\x05\xBE`\x02\u02C3\u02C2\x03\x02\x02\x02\u02C3" +
		"\u02C4\x03\x02\x02\x02\u02C4\u02C5\x03\x02\x02\x02\u02C5\u02CB\x05X-\x02" +
		"\u02C6\u02C8\x07\x07\x02\x02\u02C7\u02C6\x03\x02\x02\x02\u02C7\u02C8\x03" +
		"\x02\x02\x02\u02C8\u02C9\x03\x02\x02\x02\u02C9\u02CC\x05\xBA^\x02\u02CA" +
		"\u02CC\x05\xAEX\x02\u02CB\u02C7\x03\x02\x02\x02\u02CB\u02CA\x03\x02\x02" +
		"\x02\u02CC[\x03\x02\x02\x02\u02CD\u02CF\x05\xBE`\x02\u02CE\u02CD\x03\x02" +
		"\x02\x02\u02CE\u02CF\x03\x02\x02\x02\u02CF\u02D0\x03\x02\x02\x02\u02D0" +
		"\u02D6\x05X-\x02\u02D1\u02D3\x07\x07\x02\x02\u02D2\u02D1\x03\x02\x02\x02" +
		"\u02D2\u02D3\x03\x02\x02\x02\u02D3\u02D4\x03\x02\x02\x02\u02D4\u02D7\x05" +
		"\xBA^\x02\u02D5\u02D7\x05\xAEX\x02\u02D6\u02D2\x03\x02\x02\x02\u02D6\u02D5" +
		"\x03\x02\x02\x02\u02D6\u02D7\x03\x02\x02\x02\u02D7]\x03\x02\x02\x02\u02D8" +
		"\u02D9\x07@\x02\x02\u02D9\u02DC\x07\x85\x02\x02\u02DA\u02DB\x07\x06\x02" +
		"\x02\u02DB\u02DD\x05\xA6T\x02\u02DC\u02DA\x03\x02\x02\x02\u02DC\u02DD" +
		"\x03\x02\x02\x02\u02DD\u02DE\x03\x02\x02\x02\u02DE\u02E2\x07\b\x02\x02" +
		"\u02DF\u02E1\x07\x13\x02\x02\u02E0\u02DF\x03\x02\x02\x02\u02E1\u02E4\x03" +
		"\x02\x02\x02\u02E2\u02E0\x03\x02\x02\x02\u02E2\u02E3\x03\x02\x02\x02\u02E3" +
		"\u02EC\x03\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02\u02E5\u02E7\x05Z.\x02" +
		"\u02E6\u02E5\x03\x02\x02\x02\u02E7\u02EA\x03\x02\x02\x02\u02E8\u02E6\x03" +
		"\x02\x02\x02\u02E8\u02E9\x03\x02\x02\x02\u02E9\u02EB\x03\x02\x02\x02\u02EA" +
		"\u02E8\x03\x02\x02\x02\u02EB\u02ED\x05\\/\x02\u02EC\u02E8\x03\x02\x02" +
		"\x02\u02EC\u02ED\x03\x02\x02\x02\u02ED\u02EE\x03\x02\x02\x02\u02EE\u02F1" +
		"\x07\t\x02\x02\u02EF\u02F0\x079\x02\x02\u02F0\u02F2\x05\xB8]\x02\u02F1" +
		"\u02EF\x03\x02\x02\x02\u02F1\u02F2\x03\x02\x02\x02\u02F2_\x03\x02\x02" +
		"\x02\u02F3\u02F4\x07(\x02\x02\u02F4\u02FF\x07J\x02\x02\u02F5\u02F6\x07" +
		"(\x02\x02\u02F6\u02FF\x07U\x02\x02\u02F7\u02FF\x073\x02\x02\u02F8\u02FF" +
		"\x07:\x02\x02\u02F9\u02FF\x07D\x02\x02\u02FA\u02FB\x07\x82\x02\x02\u02FB" +
		"\u02FF\x07J\x02\x02\u02FC\u02FD\x07\x82\x02\x02\u02FD\u02FF\x07U\x02\x02" +
		"\u02FE\u02F3\x03\x02\x02\x02\u02FE\u02F5\x03\x02\x02\x02\u02FE\u02F7\x03" +
		"\x02\x02\x02\u02FE\u02F8\x03\x02\x02\x02\u02FE\u02F9\x03\x02\x02\x02\u02FE" +
		"\u02FA\x03\x02\x02\x02\u02FE\u02FC\x03\x02\x02\x02\u02FFa\x03\x02\x02" +
		"\x02\u0300\u0301\x07A\x02\x02\u0301\u0303\x07\x85\x02\x02\u0302\u0304" +
		"\x05\xA2R\x02\u0303\u0302\x03\x02\x02\x02\u0303\u0304\x03\x02\x02\x02" +
		"\u0304\u0305\x03\x02\x02\x02\u0305\u0306\x07q\x02\x02\u0306\u0309\x05" +
		"`1\x02\u0307\u0308\x07L\x02\x02\u0308\u030A\x05\xB8]\x02\u0309\u0307\x03" +
		"\x02\x02\x02\u0309\u030A\x03\x02\x02\x02\u030A\u030B\x03\x02\x02\x02\u030B" +
		"\u030C\x07E\x02\x02\u030C\u030F\x07\x19\x02\x02\u030D\u030E\x07{\x02\x02" +
		"\u030E\u0310\x05\xB8]\x02\u030F\u030D\x03\x02\x02\x02\u030F\u0310\x03" +
		"\x02\x02\x02\u0310c\x03\x02\x02\x02\u0311\u0312\x07O\x02\x02\u0312\u0313" +
		"\x07\x19\x02\x02\u0313e\x03\x02\x02\x02\u0314\u0315\x07W\x02\x02\u0315" +
		"\u0316\x07\x85\x02\x02\u0316\u0317\x07\x83\x02\x02\u0317\u0318\x07\x85" +
		"\x02\x02\u0318g\x03\x02\x02\x02\u0319\u031A\x07S\x02\x02\u031A\u031B\x07" +
		"`\x02\x02\u031B\u031D\x07\x85\x02\x02\u031C\u031E\x05\xA2R\x02\u031D\u031C" +
		"\x03\x02\x02\x02\u031D\u031E\x03\x02\x02\x02\u031E\u0321\x03\x02\x02\x02" +
		"\u031F\u0320\x07a\x02\x02\u0320\u0322\x05\xB8]\x02\u0321\u031F\x03\x02" +
		"\x02\x02\u0321\u0322\x03\x02\x02\x02\u0322\u0324\x03\x02\x02\x02\u0323" +
		"\u0325\x05\x18\r\x02\u0324\u0323\x03\x02\x02\x02\u0324\u0325\x03\x02\x02" +
		"\x02\u0325i\x03\x02\x02\x02\u0326\u0327\x07c\x02\x02\u0327\u0328\x07f" +
		"\x02\x02\u0328\u0329\x07\x85\x02\x02\u0329\u032A\x07\x06\x02\x02\u032A" +
		"\u032C\x05\xACW\x02\u032B\u032D\x07*\x02\x02\u032C\u032B\x03\x02\x02\x02" +
		"\u032C\u032D\x03\x02\x02\x02\u032D\u0330\x03\x02\x02\x02\u032E\u032F\x07" +
		"L\x02\x02\u032F\u0331\x05\xB8]\x02\u0330\u032E\x03\x02\x02\x02\u0330\u0331" +
		"\x03\x02\x02\x02\u0331k\x03\x02\x02\x02\u0332\u0333\x07c\x02\x02\u0333" +
		"\u0334\x077\x02\x02\u0334\u0337\x07\x85\x02\x02\u0335\u0336\x07L\x02\x02" +
		"\u0336\u0338\x05\xB8]\x02\u0337\u0335\x03\x02\x02\x02\u0337\u0338\x03" +
		"\x02\x02\x02\u0338\u033C\x03\x02\x02\x02\u0339\u033A\x079\x02\x02\u033A" +
		"\u033B\x07a\x02\x02\u033B\u033D\x05\xB8]\x02\u033C\u0339\x03\x02\x02\x02" +
		"\u033C\u033D\x03\x02\x02\x02\u033Dm\x03\x02\x02\x02\u033E\u0340\x05\xBE" +
		"`\x02\u033F\u033E\x03\x02\x02\x02\u033F\u0340\x03\x02\x02\x02\u0340\u0341" +
		"\x03\x02\x02\x02\u0341\u0342\x07_\x02\x02\u0342\u0343\x05\xB8]\x02\u0343" +
		"\u0344\x07\x19\x02\x02\u0344o\x03\x02\x02\x02\u0345\u0346\x07R\x02\x02" +
		"\u0346\u0347\x07\x85\x02\x02\u0347\u0348\x07\x06\x02\x02\u0348\u0349\x05" +
		"\xA4S\x02\u0349\u034A\x07.\x02\x02\u034A\u034B\x07L\x02\x02\u034B\u034E" +
		"\x05\xB8]\x02\u034C\u034D\x07\x7F\x02\x02\u034D\u034F\x07\x19\x02\x02" +
		"\u034E\u034C\x03\x02\x02\x02\u034E\u034F\x03\x02\x02\x02\u034F\u0352\x03" +
		"\x02\x02\x02\u0350\u0351\x07-\x02\x02\u0351\u0353\x07\x19\x02\x02\u0352" +
		"\u0350\x03\x02\x02\x02\u0352\u0353\x03\x02\x02\x02\u0353\u0357\x03\x02" +
		"\x02\x02\u0354\u0355\x07d\x02\x02\u0355\u0356\x07s\x02\x02\u0356\u0358" +
		"\x05\xB8]\x02\u0357\u0354\x03\x02\x02\x02\u0357\u0358\x03\x02\x02\x02" +
		"\u0358\u035C\x03\x02\x02\x02\u0359\u035A\x07t\x02\x02\u035A\u035B\x07" +
		"s\x02\x02\u035B\u035D\x05\xB8]\x02\u035C\u0359\x03\x02\x02\x02\u035C\u035D" +
		"\x03\x02\x02\x02\u035D\u0360\x03\x02\x02\x02\u035E\u035F\x07a\x02\x02" +
		"\u035F\u0361\x05\xB8]\x02\u0360\u035E\x03\x02\x02\x02\u0360\u0361\x03" +
		"\x02\x02\x02\u0361\u0364\x03\x02\x02\x02\u0362\u0363\x078\x02\x02\u0363" +
		"\u0365\x05\xB8]\x02\u0364\u0362\x03\x02\x02\x02\u0364\u0365\x03\x02\x02" +
		"\x02\u0365\u037C\x03\x02\x02\x02\u0366\u036A\x07\b\x02\x02\u0367\u0369" +
		"\x07\x13\x02\x02\u0368\u0367\x03\x02\x02\x02\u0369\u036C\x03\x02\x02\x02" +
		"\u036A\u0368\x03\x02\x02\x02\u036A\u036B\x03\x02\x02\x02\u036B\u0372\x03" +
		"\x02\x02\x02\u036C\u036A\x03\x02\x02\x02\u036D\u036E\x05n8\x02\u036E\u036F" +
		"\x05\xB0Y\x02\u036F\u0371\x03\x02\x02\x02\u0370\u036D\x03\x02\x02\x02" +
		"\u0371\u0374\x03\x02\x02\x02\u0372\u0370\x03\x02\x02\x02\u0372\u0373\x03" +
		"\x02\x02\x02\u0373\u0378\x03\x02\x02\x02\u0374\u0372\x03\x02\x02\x02\u0375" +
		"\u0377\x07\x13\x02\x02\u0376\u0375\x03\x02\x02\x02\u0377\u037A\x03\x02" +
		"\x02\x02\u0378\u0376\x03\x02\x02\x02\u0378\u0379\x03\x02\x02\x02\u0379" +
		"\u037B\x03\x02\x02\x02\u037A\u0378\x03\x02\x02\x02\u037B\u037D\x07\t\x02" +
		"\x02\u037C\u0366\x03\x02\x02\x02\u037C\u037D\x03\x02\x02\x02\u037Dq\x03" +
		"\x02\x02\x02\u037E\u037F\t\x05\x02\x02\u037Fs\x03\x02\x02\x02\u0380\u0394" +
		"\x05\b\x05\x02\u0381\u0394\x05\n\x06\x02\u0382\u0394\x05\f\x07\x02\u0383" +
		"\u0394\x05\x0E\b\x02\u0384\u0394\x05\x16\f\x02\u0385\u0394\x05\x1C\x0F" +
		"\x02\u0386\u0394\x05\x1E\x10\x02\u0387\u0394\x05&\x14\x02\u0388\u0394" +
		"\x05(\x15\x02\u0389\u0394\x052\x1A\x02\u038A\u0394\x05^0\x02\u038B\u0394" +
		"\x05b2\x02\u038C\u0394\x05d3\x02\u038D\u0394\x05h5\x02\u038E\u0394\x05" +
		"f4\x02\u038F\u0394\x05j6\x02\u0390\u0394\x05l7\x02\u0391\u0394\x05V,\x02" +
		"\u0392\u0394\x05T+\x02\u0393\u0380\x03\x02\x02\x02\u0393\u0381\x03\x02" +
		"\x02\x02\u0393\u0382\x03\x02\x02\x02\u0393\u0383\x03\x02\x02\x02\u0393" +
		"\u0384\x03\x02\x02\x02\u0393\u0385\x03\x02\x02\x02\u0393\u0386\x03\x02" +
		"\x02\x02\u0393\u0387\x03\x02\x02\x02\u0393\u0388\x03\x02\x02\x02\u0393" +
		"\u0389\x03\x02\x02\x02\u0393\u038A\x03\x02\x02\x02\u0393\u038B\x03\x02" +
		"\x02\x02\u0393\u038C\x03\x02\x02\x02\u0393\u038D\x03\x02\x02\x02\u0393" +
		"\u038E\x03\x02\x02\x02\u0393\u038F\x03\x02\x02\x02\u0393\u0390\x03\x02" +
		"\x02\x02\u0393\u0391\x03\x02\x02\x02\u0393\u0392\x03\x02\x02\x02\u0394" +
		"u\x03\x02\x02\x02\u0395\u0397\x05\xBE`\x02\u0396\u0395\x03\x02\x02\x02" +
		"\u0396\u0397\x03\x02\x02\x02\u0397\u0398\x03\x02\x02\x02\u0398\u039A\x05" +
		"t;\x02\u0399\u039B\x07\x17\x02\x02\u039A\u0399\x03\x02\x02\x02\u039A\u039B" +
		"\x03\x02\x02\x02\u039Bw\x03\x02\x02\x02\u039C\u039D\x05r:\x02\u039D\u039E" +
		"\x074\x02\x02\u039E\u039F\x07\x85\x02\x02\u039F\u03A3\x07\b\x02\x02\u03A0" +
		"\u03A2\x07\x13\x02\x02\u03A1\u03A0\x03\x02\x02\x02\u03A2\u03A5\x03\x02" +
		"\x02\x02\u03A3\u03A1\x03\x02\x02\x02\u03A3\u03A4\x03\x02\x02\x02\u03A4" +
		"\u03AB\x03\x02\x02\x02\u03A5\u03A3\x03\x02\x02\x02\u03A6\u03A7\x05v<\x02" +
		"\u03A7\u03A8\x05\xB0Y\x02\u03A8\u03AA\x03\x02\x02\x02\u03A9\u03A6\x03" +
		"\x02\x02\x02\u03AA\u03AD\x03\x02\x02\x02\u03AB\u03A9\x03\x02\x02\x02\u03AB" +
		"\u03AC\x03\x02\x02\x02\u03AC\u03B1\x03\x02\x02\x02\u03AD\u03AB\x03\x02" +
		"\x02\x02\u03AE\u03B0\x07\x13\x02\x02\u03AF\u03AE\x03\x02\x02\x02\u03B0" +
		"\u03B3\x03\x02\x02\x02\u03B1\u03AF\x03\x02\x02\x02\u03B1\u03B2\x03\x02" +
		"\x02\x02\u03B2\u03B4\x03\x02\x02\x02\u03B3\u03B1\x03\x02\x02\x02\u03B4" +
		"\u03B5\x07\t\x02\x02\u03B5y\x03\x02\x02\x02\u03B6\u03B7\x07`\x02\x02\u03B7" +
		"\u03B9\x07\x85\x02\x02\u03B8\u03BA\x05\xA2R\x02\u03B9\u03B8\x03\x02\x02" +
		"\x02\u03B9\u03BA\x03\x02\x02\x02\u03BA\u03BD\x03\x02\x02\x02\u03BB\u03BC" +
		"\x07\n\x02\x02\u03BC\u03BE\x05\xACW\x02\u03BD\u03BB\x03\x02\x02\x02\u03BD" +
		"\u03BE\x03\x02\x02\x02\u03BE{\x03\x02\x02\x02\u03BF\u03C1\x07b\x02\x02" +
		"\u03C0\u03BF\x03\x02\x02\x02\u03C0\u03C1\x03\x02\x02\x02\u03C1\u03C2\x03" +
		"\x02\x02\x02\u03C2\u03C3\x07R\x02\x02\u03C3\u03C4\x05\xA4S\x02\u03C4}" +
		"\x03\x02\x02\x02\u03C5\u03CA\x05\xA4S\x02\u03C6\u03C7\x07\x04\x02\x02" +
		"\u03C7\u03C8\x05\xB8]\x02\u03C8\u03C9\x07\x05\x02\x02\u03C9\u03CB\x03" +
		"\x02\x02\x02\u03CA\u03C6\x03\x02\x02\x02\u03CA\u03CB\x03\x02\x02\x02\u03CB" +
		"\x7F\x03\x02\x02\x02\u03CC\u03CD\x05~@\x02\u03CD\u03CE\x07\n\x02\x02\u03CE" +
		"\u03CF\x05~@\x02\u03CF\x81\x03\x02\x02\x02\u03D0\u03D1\x075\x02\x02\u03D1" +
		"\u03D2\x07\x85\x02\x02\u03D2\u03D6\x07\b\x02\x02\u03D3\u03D5\x07\x13\x02" +
		"\x02\u03D4\u03D3\x03\x02\x02\x02\u03D5\u03D8\x03\x02\x02\x02\u03D6\u03D4" +
		"\x03\x02\x02\x02\u03D6\u03D7\x03\x02\x02\x02\u03D7\u03DE\x03\x02\x02\x02" +
		"\u03D8\u03D6\x03\x02\x02\x02\u03D9\u03DA\x05\x80A\x02\u03DA\u03DB\x05" +
		"\xAEX\x02\u03DB\u03DD\x03\x02\x02\x02\u03DC\u03D9\x03\x02\x02\x02\u03DD" +
		"\u03E0\x03\x02\x02\x02\u03DE\u03DC\x03\x02\x02\x02\u03DE\u03DF\x03\x02" +
		"\x02\x02\u03DF\u03E4\x03\x02\x02\x02\u03E0\u03DE\x03\x02\x02\x02\u03E1" +
		"\u03E3\x07\x13\x02\x02\u03E2\u03E1\x03\x02\x02\x02\u03E3\u03E6\x03\x02" +
		"\x02\x02\u03E4\u03E2\x03\x02\x02\x02\u03E4\u03E5\x03\x02\x02\x02\u03E5" +
		"\u03E7\x03\x02\x02\x02\u03E6\u03E4\x03\x02\x02\x02\u03E7\u03E8\x07\t\x02" +
		"\x02\u03E8\x83\x03\x02\x02\x02\u03E9\u03F2\x073\x02\x02\u03EA\u03F2\x07" +
		"A\x02\x02\u03EB\u03EC\x07z\x02\x02\u03EC\u03F2\x07A\x02\x02\u03ED\u03F2" +
		"\x07I\x02\x02\u03EE\u03F2\x07]\x02\x02\u03EF\u03F2\x07y\x02\x02\u03F0" +
		"\u03F2\x07|\x02\x02\u03F1\u03E9\x03\x02\x02\x02\u03F1\u03EA\x03\x02\x02" +
		"\x02\u03F1\u03EB\x03\x02\x02\x02\u03F1\u03ED\x03\x02\x02\x02\u03F1\u03EE" +
		"\x03\x02\x02\x02\u03F1\u03EF\x03\x02\x02\x02\u03F1\u03F0\x03\x02\x02\x02" +
		"\u03F2\x85\x03\x02\x02\x02\u03F3\u03F9\x05\xA4S\x02\u03F4\u03F5\x05\xAE" +
		"X\x02\u03F5\u03F6\x05\xA4S\x02\u03F6\u03F8\x03\x02\x02\x02\u03F7\u03F4" +
		"\x03\x02\x02\x02\u03F8\u03FB\x03\x02\x02\x02\u03F9\u03F7\x03\x02\x02\x02" +
		"\u03F9\u03FA\x03\x02\x02\x02\u03FA\u03FD\x03\x02\x02\x02\u03FB\u03F9\x03" +
		"\x02\x02\x02\u03FC\u03FE\x05\xAEX\x02\u03FD\u03FC\x03\x02\x02\x02\u03FD" +
		"\u03FE\x03\x02\x02\x02\u03FE\x87\x03\x02\x02\x02\u03FF\u0400\x05\x84C" +
		"\x02\u0400\u0401\x075\x02\x02\u0401\u0402\x07R\x02\x02\u0402\u0404\x05" +
		"\xA4S\x02\u0403\u0405\x05\x86D\x02\u0404\u0403\x03\x02\x02\x02\u0404\u0405" +
		"\x03\x02\x02\x02\u0405\x89\x03\x02\x02\x02\u0406\u0407\x07N\x02\x02\u0407" +
		"\u0408\x05\xA4S\x02\u0408\x8B\x03\x02\x02\x02\u0409\u040F\x05|?\x02\u040A" +
		"\u040F\x05\x82B\x02\u040B\u040F\x05\x88E\x02\u040C\u040F\x05\x8AF\x02" +
		"\u040D\u040F\x05d3\x02\u040E\u0409\x03\x02\x02\x02\u040E\u040A\x03\x02" +
		"\x02\x02\u040E\u040B\x03\x02\x02\x02\u040E\u040C\x03\x02\x02\x02\u040E" +
		"\u040D\x03\x02\x02\x02\u040F\x8D\x03\x02\x02\x02\u0410\u0412\x05\xBE`" +
		"\x02\u0411\u0410\x03\x02\x02\x02\u0411\u0412\x03\x02\x02\x02\u0412\u0413" +
		"\x03\x02\x02\x02\u0413\u0415\x05\x8CG\x02\u0414\u0416\x07\x17\x02\x02" +
		"\u0415\u0414\x03\x02\x02\x02\u0415\u0416\x03\x02\x02\x02\u0416\x8F\x03" +
		"\x02\x02\x02\u0417\u0418\x07}\x02\x02\u0418\u0419\x07\x85\x02\x02\u0419" +
		"\u041D\x07";
	private static readonly _serializedATNSegment2: string =
		"\b\x02\x02\u041A\u041C\x07\x13\x02\x02\u041B\u041A\x03\x02\x02\x02\u041C" +
		"\u041F\x03\x02\x02\x02\u041D\u041B\x03\x02\x02\x02\u041D\u041E\x03\x02" +
		"\x02\x02\u041E\u0425\x03\x02\x02\x02\u041F\u041D\x03\x02\x02\x02\u0420" +
		"\u0421\x05\x8EH\x02\u0421\u0422\x05\xB0Y\x02\u0422\u0424\x03\x02\x02\x02" +
		"\u0423\u0420\x03\x02\x02\x02\u0424\u0427\x03\x02\x02\x02\u0425\u0423\x03" +
		"\x02\x02\x02\u0425\u0426\x03\x02\x02\x02\u0426\u042B\x03\x02\x02\x02\u0427" +
		"\u0425\x03\x02\x02\x02\u0428\u042A\x07\x13\x02\x02\u0429\u0428\x03\x02" +
		"\x02\x02\u042A\u042D\x03\x02\x02\x02\u042B\u0429\x03\x02\x02\x02\u042B" +
		"\u042C\x03\x02\x02\x02\u042C\u042E\x03\x02\x02\x02\u042D\u042B\x03\x02" +
		"\x02\x02\u042E\u042F\x07\t\x02\x02\u042F\x91\x03\x02\x02\x02\u0430\u0439" +
		"\x07R\x02\x02\u0431\u0439\x074\x02\x02\u0432\u0439\x076\x02\x02\u0433" +
		"\u0439\x07`\x02\x02\u0434\u0439\x07}\x02\x02\u0435\u0439\x07\x7F\x02\x02" +
		"\u0436\u0437\x07u\x02\x02\u0437\u0439\x07V\x02\x02\u0438\u0430\x03\x02" +
		"\x02\x02\u0438\u0431\x03\x02\x02\x02\u0438\u0432\x03\x02\x02\x02\u0438" +
		"\u0433\x03\x02\x02\x02\u0438\u0434\x03\x02\x02\x02\u0438\u0435\x03\x02" +
		"\x02\x02\u0438\u0436\x03\x02\x02\x02\u0439\x93\x03\x02\x02\x02\u043A\u043B" +
		"\x07T\x02\x02\u043B\u043C\x05\x92J\x02\u043C\u043D\x05\xA4S\x02\u043D" +
		"\u043E\x07-\x02\x02\u043E\u043F\x07\x19\x02\x02\u043F\x95\x03\x02\x02" +
		"\x02\u0440\u044F\x05\b\x05\x02\u0441\u044F\x05\n\x06\x02\u0442\u044F\x05" +
		"\f\x07\x02\u0443\u044F\x05x=\x02\u0444\u044F\x05p9\x02\u0445\u044F\x05" +
		"\x0E\b\x02\u0446\u044F\x05\x9AN\x02\u0447\u044F\x05z>\x02\u0448\u044F" +
		"\x05\x16\f\x02\u0449\u044F\x05\x94K\x02\u044A\u044F\x05^0\x02\u044B\u044F" +
		"\x05d3\x02\u044C\u044F\x05\x90I\x02\u044D\u044F\x05T+\x02\u044E\u0440" +
		"\x03\x02\x02\x02\u044E\u0441\x03\x02\x02\x02\u044E\u0442\x03\x02\x02\x02" +
		"\u044E\u0443\x03\x02\x02\x02\u044E\u0444\x03\x02\x02\x02\u044E\u0445\x03" +
		"\x02\x02\x02\u044E\u0446\x03\x02\x02\x02\u044E\u0447\x03\x02\x02\x02\u044E" +
		"\u0448\x03\x02\x02\x02\u044E\u0449\x03\x02\x02\x02\u044E\u044A\x03\x02" +
		"\x02\x02\u044E\u044B\x03\x02\x02\x02\u044E\u044C\x03\x02\x02\x02\u044E" +
		"\u044D\x03\x02\x02\x02\u044F\x97\x03\x02\x02\x02\u0450\u0452\x05\xBE`" +
		"\x02\u0451\u0450\x03\x02\x02\x02\u0451\u0452\x03\x02\x02\x02\u0452\u0453" +
		"\x03\x02\x02\x02\u0453\u0455\x05\x96L\x02\u0454\u0456\x07\x17\x02\x02" +
		"\u0455\u0454\x03\x02\x02\x02\u0455\u0456\x03\x02\x02\x02\u0456\x99\x03" +
		"\x02\x02\x02\u0457\u0458\x07X\x02\x02\u0458\u0459\x07\x85\x02\x02\u0459" +
		"\u045D\x07\b\x02\x02\u045A\u045C\x07\x13\x02\x02\u045B\u045A\x03\x02\x02" +
		"\x02\u045C\u045F\x03\x02\x02\x02\u045D\u045B\x03\x02\x02\x02\u045D\u045E" +
		"\x03\x02\x02\x02\u045E\u0465\x03\x02\x02\x02\u045F\u045D\x03\x02\x02\x02" +
		"\u0460\u0461\x05\x98M\x02\u0461\u0462\x05\xB0Y\x02\u0462\u0464\x03\x02" +
		"\x02\x02\u0463\u0460\x03\x02\x02\x02\u0464\u0467\x03\x02\x02\x02\u0465" +
		"\u0463\x03\x02\x02\x02\u0465\u0466\x03\x02\x02\x02\u0466\u046B\x03\x02" +
		"\x02\x02\u0467\u0465\x03\x02\x02\x02\u0468\u046A\x07\x13\x02\x02\u0469" +
		"\u0468\x03\x02\x02\x02\u046A\u046D\x03\x02\x02\x02\u046B\u0469\x03\x02" +
		"\x02\x02\u046B\u046C\x03\x02\x02\x02\u046C\u046E\x03\x02\x02\x02\u046D" +
		"\u046B\x03\x02\x02\x02\u046E\u046F\x07\t\x02\x02\u046F\x9B\x03\x02\x02" +
		"\x02\u0470\u0472\x07i\x02\x02\u0471\u0470\x03\x02\x02\x02\u0471\u0472" +
		"\x03\x02\x02\x02\u0472\u0473\x03\x02\x02\x02\u0473\u0474\x07\x85\x02\x02" +
		"\u0474\u0475\x07\x06\x02\x02\u0475\u0476\x05\xACW\x02\u0476\x9D\x03\x02" +
		"\x02\x02\u0477\u0479\x05\xBE`\x02\u0478\u0477\x03\x02\x02\x02\u0478\u0479" +
		"\x03\x02\x02\x02\u0479\u047A\x03\x02\x02\x02\u047A\u0480\x05\x9CO\x02" +
		"\u047B\u047D\x07\x07\x02\x02\u047C\u047B\x03\x02\x02\x02\u047C\u047D\x03" +
		"\x02\x02\x02\u047D\u047E\x03\x02\x02\x02\u047E\u0481\x05\xBC_\x02\u047F" +
		"\u0481\x05\xAEX\x02\u0480\u047C\x03\x02\x02\x02\u0480\u047F\x03\x02\x02" +
		"\x02\u0481\x9F\x03\x02\x02\x02\u0482\u0484\x05\xBE`\x02\u0483\u0482\x03" +
		"\x02\x02\x02\u0483\u0484\x03\x02\x02\x02\u0484\u0485\x03\x02\x02\x02\u0485" +
		"\u048B\x05\x9CO\x02\u0486\u0488\x07\x07\x02\x02\u0487\u0486\x03\x02\x02" +
		"\x02\u0487\u0488\x03\x02\x02\x02\u0488\u0489\x03\x02\x02\x02\u0489\u048C" +
		"\x05\xBC_\x02\u048A\u048C\x05\xAEX\x02\u048B\u0487\x03\x02\x02\x02\u048B" +
		"\u048A\x03\x02\x02\x02\u048B\u048C\x03\x02\x02\x02\u048C\xA1\x03\x02\x02" +
		"\x02\u048D\u0491\x07\v\x02\x02\u048E\u0490\x07\x13\x02\x02\u048F\u048E" +
		"\x03\x02\x02\x02\u0490\u0493\x03\x02\x02\x02\u0491\u048F\x03\x02\x02\x02" +
		"\u0491\u0492\x03\x02\x02\x02\u0492\u049B\x03\x02\x02\x02\u0493\u0491\x03" +
		"\x02\x02\x02\u0494\u0496\x05\x9EP\x02\u0495\u0494\x03\x02\x02\x02\u0496" +
		"\u0499\x03\x02\x02\x02\u0497\u0495\x03\x02\x02\x02\u0497\u0498\x03\x02" +
		"\x02\x02\u0498\u049A\x03\x02\x02\x02\u0499\u0497\x03\x02\x02\x02\u049A" +
		"\u049C\x05\xA0Q\x02\u049B\u0497\x03\x02\x02\x02\u049B\u049C\x03\x02\x02" +
		"\x02\u049C\u049D\x03\x02\x02\x02\u049D\u049E\x07\f\x02\x02\u049E\xA3\x03" +
		"\x02\x02\x02\u049F\u04A4\x07\x85\x02\x02\u04A0\u04A1\x07\r\x02\x02\u04A1" +
		"\u04A3\x07\x85\x02\x02\u04A2\u04A0\x03\x02\x02\x02\u04A3\u04A6\x03\x02" +
		"\x02\x02\u04A4\u04A2\x03\x02\x02\x02\u04A4\u04A5\x03\x02\x02\x02\u04A5" +
		"\xA5\x03\x02\x02\x02\u04A6\u04A4\x03\x02\x02\x02\u04A7\u04A8\t\x06\x02" +
		"\x02\u04A8\xA7\x03\x02\x02\x02\u04A9\u04AA\t\x07\x02\x02\u04AA\xA9\x03" +
		"\x02\x02\x02\u04AB\u04AE\x07v\x02\x02\u04AC\u04AD\x07s\x02\x02\u04AD\u04AF" +
		"\x05\xB8]\x02\u04AE\u04AC\x03\x02\x02\x02\u04AE\u04AF\x03\x02\x02\x02" +
		"\u04AF\xAB\x03\x02\x02\x02\u04B0\u04B4\x05\xAAV\x02\u04B1\u04B4\x05\xA8" +
		"U\x02\u04B2\u04B4\x05\xA4S\x02\u04B3\u04B0\x03\x02\x02\x02\u04B3\u04B1" +
		"\x03\x02\x02\x02\u04B3\u04B2\x03\x02\x02\x02\u04B4\xAD\x03\x02\x02\x02" +
		"\u04B5\u04B9\x07\x07\x02\x02\u04B6\u04B8\x07\x13\x02\x02\u04B7\u04B6\x03" +
		"\x02\x02\x02\u04B8\u04BB\x03\x02\x02\x02\u04B9\u04B7\x03\x02\x02\x02\u04B9" +
		"\u04BA\x03\x02\x02\x02\u04BA\u04C2\x03\x02\x02\x02\u04BB\u04B9\x03\x02" +
		"\x02\x02\u04BC\u04BE\x07\x13\x02\x02\u04BD\u04BC\x03\x02\x02\x02\u04BE" +
		"\u04BF\x03\x02\x02\x02\u04BF\u04BD\x03\x02\x02\x02\u04BF\u04C0\x03\x02" +
		"\x02\x02\u04C0\u04C2\x03\x02\x02\x02\u04C1\u04B5\x03\x02\x02\x02\u04C1" +
		"\u04BD\x03\x02\x02\x02\u04C2\xAF\x03\x02\x02\x02\u04C3\u04C7\x07\x0E\x02" +
		"\x02\u04C4\u04C6\x07\x13\x02\x02\u04C5\u04C4\x03\x02\x02\x02\u04C6\u04C9" +
		"\x03\x02\x02\x02\u04C7\u04C5\x03\x02\x02\x02\u04C7\u04C8\x03\x02\x02\x02" +
		"\u04C8\u04D0\x03\x02\x02\x02\u04C9\u04C7\x03\x02\x02\x02\u04CA\u04CC\x07" +
		"\x13\x02\x02\u04CB\u04CA\x03\x02\x02\x02\u04CC\u04CD\x03\x02\x02\x02\u04CD" +
		"\u04CB\x03\x02\x02\x02\u04CD\u04CE\x03\x02\x02\x02\u04CE\u04D0\x03\x02" +
		"\x02\x02\u04CF\u04C3\x03\x02\x02\x02\u04CF\u04CB\x03\x02\x02\x02\u04D0" +
		"\xB1\x03\x02\x02\x02\u04D1\u04D5\x07\x04\x02\x02\u04D2\u04D4\x07\x13\x02" +
		"\x02\u04D3\u04D2\x03\x02\x02\x02\u04D4\u04D7\x03\x02\x02\x02\u04D5\u04D3" +
		"\x03\x02\x02\x02\u04D5\u04D6\x03\x02\x02\x02\u04D6\u04E1\x03\x02\x02\x02" +
		"\u04D7\u04D5\x03\x02\x02\x02\u04D8\u04DE\x05\xB8]\x02\u04D9\u04DA\x05" +
		"\xAEX\x02\u04DA\u04DB\x05\xB8]\x02\u04DB\u04DD\x03\x02\x02\x02\u04DC\u04D9" +
		"\x03\x02\x02\x02\u04DD\u04E0\x03\x02\x02\x02\u04DE\u04DC\x03\x02\x02\x02" +
		"\u04DE\u04DF\x03\x02\x02\x02\u04DF\u04E2\x03\x02\x02\x02\u04E0\u04DE\x03" +
		"\x02\x02\x02\u04E1\u04D8\x03\x02\x02\x02\u04E1\u04E2\x03\x02\x02\x02\u04E2" +
		"\u04E3\x03\x02\x02\x02\u04E3\u04E4\x07\x05\x02\x02\u04E4\xB3\x03\x02\x02" +
		"\x02\u04E5\u04E6\x07\x85\x02\x02\u04E6\u04E7\x07\x03\x02\x02\u04E7\u04E8" +
		"\x05\xB8]\x02\u04E8\xB5\x03\x02\x02\x02\u04E9\u04ED\x07\b\x02\x02\u04EA" +
		"\u04EC\x07\x13\x02\x02\u04EB\u04EA\x03\x02\x02\x02\u04EC\u04EF\x03\x02" +
		"\x02\x02\u04ED\u04EB\x03\x02\x02\x02\u04ED\u04EE\x03\x02\x02\x02\u04EE" +
		"\u04FC\x03\x02\x02\x02\u04EF\u04ED\x03\x02\x02\x02\u04F0\u04F6\x05\xB4" +
		"[\x02\u04F1\u04F2\x05\xAEX\x02\u04F2\u04F3\x05\xB4[\x02\u04F3\u04F5\x03" +
		"\x02\x02\x02\u04F4\u04F1\x03\x02\x02\x02\u04F5\u04F8\x03\x02\x02\x02\u04F6" +
		"\u04F4\x03\x02\x02\x02\u04F6\u04F7\x03\x02\x02\x02\u04F7\u04FA\x03\x02" +
		"\x02\x02\u04F8\u04F6\x03\x02\x02\x02\u04F9\u04FB\x05\xAEX\x02\u04FA\u04F9" +
		"\x03\x02\x02\x02\u04FA\u04FB\x03\x02\x02\x02\u04FB\u04FD\x03\x02\x02\x02" +
		"\u04FC\u04F0\x03\x02\x02\x02\u04FC\u04FD\x03\x02\x02\x02\u04FD\u04FE\x03" +
		"\x02\x02\x02\u04FE\u04FF\x07\t\x02\x02\u04FF\xB7\x03\x02\x02\x02\u0500" +
		"\u0501\b]\x01\x02\u0501\u0502\x07\x0F\x02\x02\u0502\u050F\x05\xB8]\r\u0503" +
		"\u050F\x05\xB2Z\x02\u0504\u050F\x05\xB6\\\x02\u0505\u050F\x05\xA4S\x02" +
		"\u0506\u050F\x07\x18\x02\x02\u0507\u050F\x07\x1A\x02\x02\u0508\u050F\x07" +
		"\x1B\x02\x02\u0509\u050F\x07\x19\x02\x02\u050A\u050B\x07\v\x02\x02\u050B" +
		"\u050C\x05\xB8]\x02\u050C\u050D\x07\f\x02\x02\u050D\u050F\x03\x02\x02" +
		"\x02\u050E\u0500\x03\x02\x02\x02\u050E\u0503\x03\x02\x02\x02\u050E\u0504" +
		"\x03\x02\x02\x02\u050E\u0505\x03\x02\x02\x02\u050E\u0506\x03\x02\x02\x02" +
		"\u050E\u0507\x03\x02\x02\x02\u050E\u0508\x03\x02\x02\x02\u050E\u0509\x03" +
		"\x02\x02\x02\u050E\u050A\x03\x02\x02\x02\u050F\u0518\x03\x02\x02\x02\u0510" +
		"\u0511\f\f\x02\x02\u0511\u0512\t\b\x02\x02\u0512\u0517\x05\xB8]\r\u0513" +
		"\u0514\f\v\x02\x02\u0514\u0515\t\t\x02\x02\u0515\u0517\x05\xB8]\f\u0516" +
		"\u0510\x03\x02\x02\x02\u0516\u0513\x03\x02\x02\x02\u0517\u051A\x03\x02" +
		"\x02\x02\u0518\u0516\x03\x02\x02\x02\u0518\u0519\x03\x02\x02\x02\u0519" +
		"\xB9\x03\x02\x02\x02\u051A\u0518\x03\x02\x02\x02\u051B\u051F\x07\x17\x02" +
		"\x02\u051C\u051E\x07\x13\x02\x02\u051D\u051C\x03\x02\x02\x02\u051E\u0521" +
		"\x03\x02\x02\x02\u051F\u051D\x03\x02\x02\x02\u051F\u0520\x03\x02\x02\x02" +
		"\u0520\xBB\x03\x02\x02\x02\u0521\u051F\x03\x02\x02\x02\u0522\u0524\x07" +
		"\x17\x02\x02\u0523\u0522\x03\x02\x02\x02\u0524\u0525\x03\x02\x02\x02\u0525" +
		"\u0523\x03\x02\x02\x02\u0525\u0526\x03\x02\x02\x02\u0526\u052A\x03\x02" +
		"\x02\x02\u0527\u0529\x07\x13\x02\x02\u0528\u0527\x03\x02\x02\x02\u0529" +
		"\u052C\x03\x02\x02\x02\u052A\u0528\x03\x02\x02\x02\u052A\u052B\x03\x02" +
		"\x02\x02\u052B\xBD\x03\x02\x02\x02\u052C\u052A\x03\x02\x02\x02\u052D\u052F" +
		"\x07\x17\x02\x02\u052E\u052D\x03\x02\x02\x02\u052F\u0530\x03\x02\x02\x02" +
		"\u0530\u052E\x03\x02\x02\x02\u0530\u0531\x03\x02\x02\x02\u0531\u0535\x03" +
		"\x02\x02\x02\u0532\u0534\x07\x13\x02\x02\u0533\u0532\x03\x02\x02\x02\u0534" +
		"\u0537\x03\x02\x02\x02\u0535\u0533\x03\x02\x02\x02\u0535\u0536\x03\x02" +
		"\x02\x02\u0536\xBF\x03\x02\x02\x02\u0537\u0535\x03\x02\x02\x02\xB3\xC3" +
		"\xC9\xCD\xD3\xDB\xE1\xE5\xEB\xF3\xF9\xFD\u0103\u0119\u011D\u012A\u012F" +
		"\u0132\u0136\u013A\u013D\u0141\u0145\u014D\u0153\u0157\u015C\u0166\u016A" +
		"\u016E\u0171\u0179\u017D\u0182\u0187\u0190\u01A7\u01AD\u01B1\u01BB\u01C0" +
		"\u01C3\u01D2\u01DB\u01DF\u01E1\u01E8\u01F0\u01F4\u01F8\u01FC\u0200\u0206" +
		"\u020E\u0219\u0222\u0228\u022F\u0238\u023B\u023E\u0243\u024D\u0253\u0263" +
		"\u0266\u026A\u0272\u027A\u0280\u0284\u028C\u028F\u0293\u029C\u02A4\u02AA" +
		"\u02AE\u02B8\u02BB\u02C0\u02C3\u02C7\u02CB\u02CE\u02D2\u02D6\u02DC\u02E2" +
		"\u02E8\u02EC\u02F1\u02FE\u0303\u0309\u030F\u031D\u0321\u0324\u032C\u0330" +
		"\u0337\u033C\u033F\u034E\u0352\u0357\u035C\u0360\u0364\u036A\u0372\u0378" +
		"\u037C\u0393\u0396\u039A\u03A3\u03AB\u03B1\u03B9\u03BD\u03C0\u03CA\u03D6" +
		"\u03DE\u03E4\u03F1\u03F9\u03FD\u0404\u040E\u0411\u0415\u041D\u0425\u042B" +
		"\u0438\u044E\u0451\u0455\u045D\u0465\u046B\u0471\u0478\u047C\u0480\u0483" +
		"\u0487\u048B\u0491\u0497\u049B\u04A4\u04AE\u04B3\u04B9\u04BF\u04C1\u04C7" +
		"\u04CD\u04CF\u04D5\u04DE\u04E1\u04ED\u04F6\u04FA\u04FC\u050E\u0516\u0518" +
		"\u051F\u0525\u052A\u0530\u0535";
	public static readonly _serializedATN: string = Utils.join(
		[
			FppParser._serializedATNSegment0,
			FppParser._serializedATNSegment1,
			FppParser._serializedATNSegment2,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FppParser.__ATN) {
			FppParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(FppParser._serializedATN));
		}

		return FppParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public EOF(): TerminalNode[];
	public EOF(i: number): TerminalNode;
	public EOF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.EOF);
		} else {
			return this.getToken(FppParser.EOF, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public moduleMember(): ModuleMemberContext[];
	public moduleMember(i: number): ModuleMemberContext;
	public moduleMember(i?: number): ModuleMemberContext | ModuleMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModuleMemberContext);
		} else {
			return this.getRuleContext(i, ModuleMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_prog; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterProg) {
			listener.enterProg(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitProg) {
			listener.exitProg(this);
		}
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
	public EOF(): TerminalNode[];
	public EOF(i: number): TerminalNode;
	public EOF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.EOF);
		} else {
			return this.getToken(FppParser.EOF, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public topologyMember(): TopologyMemberContext[];
	public topologyMember(i: number): TopologyMemberContext;
	public topologyMember(i?: number): TopologyMemberContext | TopologyMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TopologyMemberContext);
		} else {
			return this.getRuleContext(i, TopologyMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_progTopology; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterProgTopology) {
			listener.enterProgTopology(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitProgTopology) {
			listener.exitProgTopology(this);
		}
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
	public EOF(): TerminalNode[];
	public EOF(i: number): TerminalNode;
	public EOF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.EOF);
		} else {
			return this.getToken(FppParser.EOF, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public componentMember(): ComponentMemberContext[];
	public componentMember(i: number): ComponentMemberContext;
	public componentMember(i?: number): ComponentMemberContext | ComponentMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ComponentMemberContext);
		} else {
			return this.getRuleContext(i, ComponentMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_progComponent; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterProgComponent) {
			listener.enterProgComponent(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitProgComponent) {
			listener.exitProgComponent(this);
		}
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
	public TYPE(): TerminalNode { return this.getToken(FppParser.TYPE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_abstractTypeDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterAbstractTypeDecl) {
			listener.enterAbstractTypeDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitAbstractTypeDecl) {
			listener.exitAbstractTypeDecl(this);
		}
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
	public _type!: TypeNameContext;
	public TYPE(): TerminalNode { return this.getToken(FppParser.TYPE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_aliasTypeDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterAliasTypeDecl) {
			listener.enterAliasTypeDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitAliasTypeDecl) {
			listener.exitAliasTypeDecl(this);
		}
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
	public _type!: TypeNameContext;
	public _default_!: ArrayExprContext;
	public _format!: Token;
	public ARRAY(): TerminalNode { return this.getToken(FppParser.ARRAY, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(FppParser.DEFAULT, 0); }
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(FppParser.FORMAT, 0); }
	public arrayExpr(): ArrayExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayExprContext);
	}
	public LIT_STRING(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_arrayDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterArrayDecl) {
			listener.enterArrayDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitArrayDecl) {
			listener.exitArrayDecl(this);
		}
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
	public CONSTANT(): TerminalNode { return this.getToken(FppParser.CONSTANT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_constantDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterConstantDecl) {
			listener.enterConstantDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitConstantDecl) {
			listener.exitConstantDecl(this);
		}
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
	public _type!: TypeNameContext;
	public _format!: Token;
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(FppParser.FORMAT, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public LIT_STRING(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructMember) {
			listener.enterStructMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructMember) {
			listener.exitStructMember(this);
		}
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
	public structMember(): StructMemberContext {
		return this.getRuleContext(0, StructMemberContext);
	}
	public postMultiAnnotation(): PostMultiAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostMultiAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structMemberN; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructMemberN) {
			listener.enterStructMemberN(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructMemberN) {
			listener.exitStructMemberN(this);
		}
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
	public structMember(): StructMemberContext {
		return this.getRuleContext(0, StructMemberContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public postMultiAnnotation(): PostMultiAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostMultiAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structMemberL; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructMemberL) {
			listener.enterStructMemberL(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructMemberL) {
			listener.exitStructMemberL(this);
		}
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
	public STRUCT(): TerminalNode { return this.getToken(FppParser.STRUCT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public structMemberL(): StructMemberLContext | undefined {
		return this.tryGetRuleContext(0, StructMemberLContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(FppParser.DEFAULT, 0); }
	public structExpr(): StructExprContext | undefined {
		return this.tryGetRuleContext(0, StructExprContext);
	}
	public structMemberN(): StructMemberNContext[];
	public structMemberN(i: number): StructMemberNContext;
	public structMemberN(i?: number): StructMemberNContext | StructMemberNContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StructMemberNContext);
		} else {
			return this.getRuleContext(i, StructMemberNContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructDecl) {
			listener.enterStructDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructDecl) {
			listener.exitStructDecl(this);
		}
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
	public ASSERT(): TerminalNode | undefined { return this.tryGetToken(FppParser.ASSERT, 0); }
	public BLOCK(): TerminalNode | undefined { return this.tryGetToken(FppParser.BLOCK, 0); }
	public DROP(): TerminalNode | undefined { return this.tryGetToken(FppParser.DROP, 0); }
	public HOOK(): TerminalNode | undefined { return this.tryGetToken(FppParser.HOOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_queueFullBehavior; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterQueueFullBehavior) {
			listener.enterQueueFullBehavior(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitQueueFullBehavior) {
			listener.exitQueueFullBehavior(this);
		}
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
	public ASYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.ASYNC, 0); }
	public GUARDED(): TerminalNode | undefined { return this.tryGetToken(FppParser.GUARDED, 0); }
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.SYNC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_commandKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterCommandKind) {
			listener.enterCommandKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitCommandKind) {
			listener.exitCommandKind(this);
		}
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
	public COMMAND(): TerminalNode { return this.getToken(FppParser.COMMAND, 0); }
	public commandKind(): CommandKindContext {
		return this.getRuleContext(0, CommandKindContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public OPCODE(): TerminalNode | undefined { return this.tryGetToken(FppParser.OPCODE, 0); }
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public queueFullBehavior(): QueueFullBehaviorContext | undefined {
		return this.tryGetRuleContext(0, QueueFullBehaviorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_commandDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterCommandDecl) {
			listener.enterCommandDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitCommandDecl) {
			listener.exitCommandDecl(this);
		}
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
	public _type!: TypeNameContext;
	public _default_!: ExprContext;
	public _id!: ExprContext;
	public _setOpcode!: ExprContext;
	public _saveOpcode!: ExprContext;
	public PARAM(): TerminalNode { return this.getToken(FppParser.PARAM, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(FppParser.DEFAULT, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public SET(): TerminalNode | undefined { return this.tryGetToken(FppParser.SET, 0); }
	public OPCODE(): TerminalNode[];
	public OPCODE(i: number): TerminalNode;
	public OPCODE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.OPCODE);
		} else {
			return this.getToken(FppParser.OPCODE, i);
		}
	}
	public SAVE(): TerminalNode | undefined { return this.tryGetToken(FppParser.SAVE, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_paramDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterParamDecl) {
			listener.enterParamDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitParamDecl) {
			listener.exitParamDecl(this);
		}
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
	public ASYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.ASYNC, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(FppParser.INPUT, 0); }
	public GUARDED(): TerminalNode | undefined { return this.tryGetToken(FppParser.GUARDED, 0); }
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.SYNC, 0); }
	public OUTPUT(): TerminalNode | undefined { return this.tryGetToken(FppParser.OUTPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_generalPortKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterGeneralPortKind) {
			listener.enterGeneralPortKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitGeneralPortKind) {
			listener.exitGeneralPortKind(this);
		}
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
	public COMMAND(): TerminalNode | undefined { return this.tryGetToken(FppParser.COMMAND, 0); }
	public RECV(): TerminalNode | undefined { return this.tryGetToken(FppParser.RECV, 0); }
	public REG(): TerminalNode | undefined { return this.tryGetToken(FppParser.REG, 0); }
	public RESP(): TerminalNode | undefined { return this.tryGetToken(FppParser.RESP, 0); }
	public EVENT(): TerminalNode | undefined { return this.tryGetToken(FppParser.EVENT, 0); }
	public PARAM(): TerminalNode | undefined { return this.tryGetToken(FppParser.PARAM, 0); }
	public GET(): TerminalNode | undefined { return this.tryGetToken(FppParser.GET, 0); }
	public SET(): TerminalNode | undefined { return this.tryGetToken(FppParser.SET, 0); }
	public TELEMETRY(): TerminalNode | undefined { return this.tryGetToken(FppParser.TELEMETRY, 0); }
	public TEXT(): TerminalNode | undefined { return this.tryGetToken(FppParser.TEXT, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(FppParser.TIME, 0); }
	public PRODUCT(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRODUCT, 0); }
	public REQUEST(): TerminalNode | undefined { return this.tryGetToken(FppParser.REQUEST, 0); }
	public ASYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.ASYNC, 0); }
	public SEND(): TerminalNode | undefined { return this.tryGetToken(FppParser.SEND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_specialPortKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterSpecialPortKind) {
			listener.enterSpecialPortKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitSpecialPortKind) {
			listener.exitSpecialPortKind(this);
		}
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
	public SERIAL(): TerminalNode | undefined { return this.tryGetToken(FppParser.SERIAL, 0); }
	public qualIdent(): QualIdentContext | undefined {
		return this.tryGetRuleContext(0, QualIdentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_generalPortInstanceType; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterGeneralPortInstanceType) {
			listener.enterGeneralPortInstanceType(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitGeneralPortInstanceType) {
			listener.exitGeneralPortInstanceType(this);
		}
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
	public _type!: GeneralPortInstanceTypeContext;
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	public PORT(): TerminalNode { return this.getToken(FppParser.PORT, 0); }
	public generalPortKind(): GeneralPortKindContext {
		return this.getRuleContext(0, GeneralPortKindContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public generalPortInstanceType(): GeneralPortInstanceTypeContext {
		return this.getRuleContext(0, GeneralPortInstanceTypeContext);
	}
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public queueFullBehavior(): QueueFullBehaviorContext | undefined {
		return this.tryGetRuleContext(0, QueueFullBehaviorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_generalPortInstanceDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterGeneralPortInstanceDecl) {
			listener.enterGeneralPortInstanceDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitGeneralPortInstanceDecl) {
			listener.exitGeneralPortInstanceDecl(this);
		}
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
	public specialPortKind(): SpecialPortKindContext {
		return this.getRuleContext(0, SpecialPortKindContext);
	}
	public PORT(): TerminalNode { return this.getToken(FppParser.PORT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_specialPortInstanceDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterSpecialPortInstanceDecl) {
			listener.enterSpecialPortInstanceDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitSpecialPortInstanceDecl) {
			listener.exitSpecialPortInstanceDecl(this);
		}
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
	public RED(): TerminalNode | undefined { return this.tryGetToken(FppParser.RED, 0); }
	public ORANGE(): TerminalNode | undefined { return this.tryGetToken(FppParser.ORANGE, 0); }
	public YELLOW(): TerminalNode | undefined { return this.tryGetToken(FppParser.YELLOW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryLimitKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryLimitKind) {
			listener.enterTelemetryLimitKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryLimitKind) {
			listener.exitTelemetryLimitKind(this);
		}
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
	public telemetryLimitKind(): TelemetryLimitKindContext {
		return this.getRuleContext(0, TelemetryLimitKindContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryLimitExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryLimitExpr) {
			listener.enterTelemetryLimitExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryLimitExpr) {
			listener.exitTelemetryLimitExpr(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public telemetryLimitExpr(): TelemetryLimitExprContext[];
	public telemetryLimitExpr(i: number): TelemetryLimitExprContext;
	public telemetryLimitExpr(i?: number): TelemetryLimitExprContext | TelemetryLimitExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TelemetryLimitExprContext);
		} else {
			return this.getRuleContext(i, TelemetryLimitExprContext);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryLimit; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryLimit) {
			listener.enterTelemetryLimit(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryLimit) {
			listener.exitTelemetryLimit(this);
		}
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
	public ALWAYS(): TerminalNode | undefined { return this.tryGetToken(FppParser.ALWAYS, 0); }
	public ON(): TerminalNode | undefined { return this.tryGetToken(FppParser.ON, 0); }
	public CHANGE(): TerminalNode | undefined { return this.tryGetToken(FppParser.CHANGE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryUpdate; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryUpdate) {
			listener.enterTelemetryUpdate(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryUpdate) {
			listener.exitTelemetryUpdate(this);
		}
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
	public _type!: TypeNameContext;
	public _id!: ExprContext;
	public _update!: TelemetryUpdateContext;
	public _format!: Token;
	public _low!: TelemetryLimitContext;
	public _high!: TelemetryLimitContext;
	public TELEMETRY(): TerminalNode { return this.getToken(FppParser.TELEMETRY, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public UPDATE(): TerminalNode | undefined { return this.tryGetToken(FppParser.UPDATE, 0); }
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(FppParser.FORMAT, 0); }
	public LOW(): TerminalNode | undefined { return this.tryGetToken(FppParser.LOW, 0); }
	public HIGH(): TerminalNode | undefined { return this.tryGetToken(FppParser.HIGH, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public telemetryUpdate(): TelemetryUpdateContext | undefined {
		return this.tryGetRuleContext(0, TelemetryUpdateContext);
	}
	public LIT_STRING(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_STRING, 0); }
	public telemetryLimit(): TelemetryLimitContext[];
	public telemetryLimit(i: number): TelemetryLimitContext;
	public telemetryLimit(i?: number): TelemetryLimitContext | TelemetryLimitContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TelemetryLimitContext);
		} else {
			return this.getRuleContext(i, TelemetryLimitContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryChannelDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryChannelDecl) {
			listener.enterTelemetryChannelDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryChannelDecl) {
			listener.exitTelemetryChannelDecl(this);
		}
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
	public _type!: TypeNameContext;
	public ACTION(): TerminalNode { return this.getToken(FppParser.ACTION, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_actionDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterActionDef) {
			listener.enterActionDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitActionDef) {
			listener.exitActionDef(this);
		}
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
	public _else!: TransitionExprContext;
	public CHOICE(): TerminalNode { return this.getToken(FppParser.CHOICE, 0); }
	public IF(): TerminalNode { return this.getToken(FppParser.IF, 0); }
	public ELSE(): TerminalNode { return this.getToken(FppParser.ELSE, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.IDENTIFIER);
		} else {
			return this.getToken(FppParser.IDENTIFIER, i);
		}
	}
	public transitionExpr(): TransitionExprContext[];
	public transitionExpr(i: number): TransitionExprContext;
	public transitionExpr(i?: number): TransitionExprContext | TransitionExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TransitionExprContext);
		} else {
			return this.getRuleContext(i, TransitionExprContext);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_choiceDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterChoiceDef) {
			listener.enterChoiceDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitChoiceDef) {
			listener.exitChoiceDef(this);
		}
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
	public _type!: TypeNameContext;
	public GUARD(): TerminalNode { return this.getToken(FppParser.GUARD, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_guardDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterGuardDef) {
			listener.enterGuardDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitGuardDef) {
			listener.exitGuardDef(this);
		}
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
	public _type!: TypeNameContext;
	public SIGNAL(): TerminalNode { return this.getToken(FppParser.SIGNAL, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_signalDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterSignalDef) {
			listener.enterSignalDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitSignalDef) {
			listener.exitSignalDef(this);
		}
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
	public DO(): TerminalNode { return this.getToken(FppParser.DO, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.IDENTIFIER);
		} else {
			return this.getToken(FppParser.IDENTIFIER, i);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_doExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterDoExpr) {
			listener.enterDoExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitDoExpr) {
			listener.exitDoExpr(this);
		}
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
	public _do!: DoExprContext;
	public _state!: QualIdentContext;
	public ENTER(): TerminalNode { return this.getToken(FppParser.ENTER, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public doExpr(): DoExprContext | undefined {
		return this.tryGetRuleContext(0, DoExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_transitionExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTransitionExpr) {
			listener.enterTransitionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTransitionExpr) {
			listener.exitTransitionExpr(this);
		}
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
	public INITIAL(): TerminalNode { return this.getToken(FppParser.INITIAL, 0); }
	public transitionExpr(): TransitionExprContext {
		return this.getRuleContext(0, TransitionExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_initialTransition; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInitialTransition) {
			listener.enterInitialTransition(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInitialTransition) {
			listener.exitInitialTransition(this);
		}
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
	public transitionExpr(): TransitionExprContext | undefined {
		return this.tryGetRuleContext(0, TransitionExprContext);
	}
	public doExpr(): DoExprContext | undefined {
		return this.tryGetRuleContext(0, DoExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_transitionOrDoExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTransitionOrDoExpr) {
			listener.enterTransitionOrDoExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTransitionOrDoExpr) {
			listener.exitTransitionOrDoExpr(this);
		}
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
	public ON(): TerminalNode { return this.getToken(FppParser.ON, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.IDENTIFIER);
		} else {
			return this.getToken(FppParser.IDENTIFIER, i);
		}
	}
	public transitionOrDoExpr(): TransitionOrDoExprContext {
		return this.getRuleContext(0, TransitionOrDoExprContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(FppParser.IF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateTransition; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateTransition) {
			listener.enterStateTransition(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateTransition) {
			listener.exitStateTransition(this);
		}
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
	public _do!: DoExprContext;
	public ENTRY(): TerminalNode { return this.getToken(FppParser.ENTRY, 0); }
	public doExpr(): DoExprContext {
		return this.getRuleContext(0, DoExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateEntry; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateEntry) {
			listener.enterStateEntry(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateEntry) {
			listener.exitStateEntry(this);
		}
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
	public _do!: DoExprContext;
	public EXIT(): TerminalNode { return this.getToken(FppParser.EXIT, 0); }
	public doExpr(): DoExprContext {
		return this.getRuleContext(0, DoExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateExit; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateExit) {
			listener.enterStateExit(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateExit) {
			listener.exitStateExit(this);
		}
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


export class StateMemberTemplContext extends ParserRuleContext {
	public initialTransition(): InitialTransitionContext | undefined {
		return this.tryGetRuleContext(0, InitialTransitionContext);
	}
	public choiceDef(): ChoiceDefContext | undefined {
		return this.tryGetRuleContext(0, ChoiceDefContext);
	}
	public stateDef(): StateDefContext | undefined {
		return this.tryGetRuleContext(0, StateDefContext);
	}
	public stateTransition(): StateTransitionContext | undefined {
		return this.tryGetRuleContext(0, StateTransitionContext);
	}
	public stateEntry(): StateEntryContext | undefined {
		return this.tryGetRuleContext(0, StateEntryContext);
	}
	public stateExit(): StateExitContext | undefined {
		return this.tryGetRuleContext(0, StateExitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMemberTempl) {
			listener.enterStateMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMemberTempl) {
			listener.exitStateMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStateMemberTempl) {
			return visitor.visitStateMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StateMemberContext extends ParserRuleContext {
	public stateMemberTempl(): StateMemberTemplContext {
		return this.getRuleContext(0, StateMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public ANNOTATION(): TerminalNode | undefined { return this.tryGetToken(FppParser.ANNOTATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMember) {
			listener.enterStateMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMember) {
			listener.exitStateMember(this);
		}
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
	public STATE(): TerminalNode { return this.getToken(FppParser.STATE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public stateMember(): StateMemberContext[];
	public stateMember(i: number): StateMemberContext;
	public stateMember(i?: number): StateMemberContext | StateMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StateMemberContext);
		} else {
			return this.getRuleContext(i, StateMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateDef) {
			listener.enterStateDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateDef) {
			listener.exitStateDef(this);
		}
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
	public choiceDef(): ChoiceDefContext | undefined {
		return this.tryGetRuleContext(0, ChoiceDefContext);
	}
	public guardDef(): GuardDefContext | undefined {
		return this.tryGetRuleContext(0, GuardDefContext);
	}
	public initialTransition(): InitialTransitionContext | undefined {
		return this.tryGetRuleContext(0, InitialTransitionContext);
	}
	public signalDef(): SignalDefContext | undefined {
		return this.tryGetRuleContext(0, SignalDefContext);
	}
	public stateDef(): StateDefContext | undefined {
		return this.tryGetRuleContext(0, StateDefContext);
	}
	public actionDef(): ActionDefContext | undefined {
		return this.tryGetRuleContext(0, ActionDefContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMachineMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMachineMemberTempl) {
			listener.enterStateMachineMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMachineMemberTempl) {
			listener.exitStateMachineMemberTempl(this);
		}
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
	public stateMachineMemberTempl(): StateMachineMemberTemplContext {
		return this.getRuleContext(0, StateMachineMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public ANNOTATION(): TerminalNode | undefined { return this.tryGetToken(FppParser.ANNOTATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMachineMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMachineMember) {
			listener.enterStateMachineMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMachineMember) {
			listener.exitStateMachineMember(this);
		}
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
	public STATE(): TerminalNode { return this.getToken(FppParser.STATE, 0); }
	public MACHINE(): TerminalNode { return this.getToken(FppParser.MACHINE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public stateMachineMember(): StateMachineMemberContext[];
	public stateMachineMember(i: number): StateMachineMemberContext;
	public stateMachineMember(i?: number): StateMachineMemberContext | StateMachineMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StateMachineMemberContext);
		} else {
			return this.getRuleContext(i, StateMachineMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMachineDef; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMachineDef) {
			listener.enterStateMachineDef(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMachineDef) {
			listener.exitStateMachineDef(this);
		}
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
	public STATE(): TerminalNode { return this.getToken(FppParser.STATE, 0); }
	public MACHINE(): TerminalNode { return this.getToken(FppParser.MACHINE, 0); }
	public INSTANCE(): TerminalNode { return this.getToken(FppParser.INSTANCE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public queueFullBehavior(): QueueFullBehaviorContext | undefined {
		return this.tryGetRuleContext(0, QueueFullBehaviorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stateMachineInstance; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStateMachineInstance) {
			listener.enterStateMachineInstance(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStateMachineInstance) {
			listener.exitStateMachineInstance(this);
		}
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
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_enumMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEnumMember) {
			listener.enterEnumMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEnumMember) {
			listener.exitEnumMember(this);
		}
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
	public enumMember(): EnumMemberContext {
		return this.getRuleContext(0, EnumMemberContext);
	}
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_enumMemberN; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEnumMemberN) {
			listener.enterEnumMemberN(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEnumMemberN) {
			listener.exitEnumMemberN(this);
		}
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
	public enumMember(): EnumMemberContext {
		return this.getRuleContext(0, EnumMemberContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_enumMemberL; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEnumMemberL) {
			listener.enterEnumMemberL(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEnumMemberL) {
			listener.exitEnumMemberL(this);
		}
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
	public _type!: IntTypeContext;
	public _default_!: ExprContext;
	public ENUM(): TerminalNode { return this.getToken(FppParser.ENUM, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public enumMemberL(): EnumMemberLContext | undefined {
		return this.tryGetRuleContext(0, EnumMemberLContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(FppParser.DEFAULT, 0); }
	public intType(): IntTypeContext | undefined {
		return this.tryGetRuleContext(0, IntTypeContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public enumMemberN(): EnumMemberNContext[];
	public enumMemberN(i: number): EnumMemberNContext;
	public enumMemberN(i?: number): EnumMemberNContext | EnumMemberNContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumMemberNContext);
		} else {
			return this.getRuleContext(i, EnumMemberNContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_enumDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEnumDecl) {
			listener.enterEnumDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEnumDecl) {
			listener.exitEnumDecl(this);
		}
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
	public ACTIVITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.ACTIVITY, 0); }
	public HIGH(): TerminalNode | undefined { return this.tryGetToken(FppParser.HIGH, 0); }
	public LOW(): TerminalNode | undefined { return this.tryGetToken(FppParser.LOW, 0); }
	public COMMAND(): TerminalNode | undefined { return this.tryGetToken(FppParser.COMMAND, 0); }
	public DIAGNOSTIC(): TerminalNode | undefined { return this.tryGetToken(FppParser.DIAGNOSTIC, 0); }
	public FATAL(): TerminalNode | undefined { return this.tryGetToken(FppParser.FATAL, 0); }
	public WARNING(): TerminalNode | undefined { return this.tryGetToken(FppParser.WARNING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_eventSeverity; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEventSeverity) {
			listener.enterEventSeverity(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEventSeverity) {
			listener.exitEventSeverity(this);
		}
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
	public EVENT(): TerminalNode { return this.getToken(FppParser.EVENT, 0); }
	public SEVERITY(): TerminalNode { return this.getToken(FppParser.SEVERITY, 0); }
	public eventSeverity(): EventSeverityContext {
		return this.getRuleContext(0, EventSeverityContext);
	}
	public FORMAT(): TerminalNode { return this.getToken(FppParser.FORMAT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public LIT_STRING(): TerminalNode { return this.getToken(FppParser.LIT_STRING, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public THROTTLE(): TerminalNode | undefined { return this.tryGetToken(FppParser.THROTTLE, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_eventDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterEventDecl) {
			listener.enterEventDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitEventDecl) {
			listener.exitEventDecl(this);
		}
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
	public INCLUDE(): TerminalNode { return this.getToken(FppParser.INCLUDE, 0); }
	public LIT_STRING(): TerminalNode { return this.getToken(FppParser.LIT_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_includeStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterIncludeStmt) {
			listener.enterIncludeStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitIncludeStmt) {
			listener.exitIncludeStmt(this);
		}
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
	public MATCH(): TerminalNode { return this.getToken(FppParser.MATCH, 0); }
	public WITH(): TerminalNode { return this.getToken(FppParser.WITH, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.IDENTIFIER);
		} else {
			return this.getToken(FppParser.IDENTIFIER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_matchStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterMatchStmt) {
			listener.enterMatchStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitMatchStmt) {
			listener.exitMatchStmt(this);
		}
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
	public INTERNAL(): TerminalNode { return this.getToken(FppParser.INTERNAL, 0); }
	public PORT(): TerminalNode { return this.getToken(FppParser.PORT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public queueFullBehavior(): QueueFullBehaviorContext | undefined {
		return this.tryGetRuleContext(0, QueueFullBehaviorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_internalPortDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInternalPortDecl) {
			listener.enterInternalPortDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInternalPortDecl) {
			listener.exitInternalPortDecl(this);
		}
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
	public PRODUCT(): TerminalNode { return this.getToken(FppParser.PRODUCT, 0); }
	public RECORD(): TerminalNode { return this.getToken(FppParser.RECORD, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public ARRAY(): TerminalNode | undefined { return this.tryGetToken(FppParser.ARRAY, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_recordSpecifierDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterRecordSpecifierDecl) {
			listener.enterRecordSpecifierDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitRecordSpecifierDecl) {
			listener.exitRecordSpecifierDecl(this);
		}
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
	public PRODUCT(): TerminalNode { return this.getToken(FppParser.PRODUCT, 0); }
	public CONTAINER(): TerminalNode { return this.getToken(FppParser.CONTAINER, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(FppParser.DEFAULT, 0); }
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_containerSpecifierDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterContainerSpecifierDecl) {
			listener.enterContainerSpecifierDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitContainerSpecifierDecl) {
			listener.exitContainerSpecifierDecl(this);
		}
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
	public PHASE(): TerminalNode { return this.getToken(FppParser.PHASE, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public LIT_STRING(): TerminalNode { return this.getToken(FppParser.LIT_STRING, 0); }
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_initSpecifier; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInitSpecifier) {
			listener.enterInitSpecifier(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInitSpecifier) {
			listener.exitInitSpecifier(this);
		}
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
	public INSTANCE(): TerminalNode { return this.getToken(FppParser.INSTANCE, 0); }
	public BASE(): TerminalNode { return this.getToken(FppParser.BASE, 0); }
	public ID(): TerminalNode { return this.getToken(FppParser.ID, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(FppParser.TYPE, 0); }
	public AT(): TerminalNode | undefined { return this.tryGetToken(FppParser.AT, 0); }
	public QUEUE(): TerminalNode | undefined { return this.tryGetToken(FppParser.QUEUE, 0); }
	public SIZE(): TerminalNode[];
	public SIZE(i: number): TerminalNode;
	public SIZE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.SIZE);
		} else {
			return this.getToken(FppParser.SIZE, i);
		}
	}
	public STACK(): TerminalNode | undefined { return this.tryGetToken(FppParser.STACK, 0); }
	public PRIORITY(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIORITY, 0); }
	public CPU(): TerminalNode | undefined { return this.tryGetToken(FppParser.CPU, 0); }
	public LIT_STRING(): TerminalNode[];
	public LIT_STRING(i: number): TerminalNode;
	public LIT_STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.LIT_STRING);
		} else {
			return this.getToken(FppParser.LIT_STRING, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public initSpecifier(): InitSpecifierContext[];
	public initSpecifier(i: number): InitSpecifierContext;
	public initSpecifier(i?: number): InitSpecifierContext | InitSpecifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InitSpecifierContext);
		} else {
			return this.getRuleContext(i, InitSpecifierContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentInstanceDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentInstanceDecl) {
			listener.enterComponentInstanceDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentInstanceDecl) {
			listener.exitComponentInstanceDecl(this);
		}
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
	public ACTIVE(): TerminalNode | undefined { return this.tryGetToken(FppParser.ACTIVE, 0); }
	public PASSIVE(): TerminalNode | undefined { return this.tryGetToken(FppParser.PASSIVE, 0); }
	public QUEUED(): TerminalNode | undefined { return this.tryGetToken(FppParser.QUEUED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentKind) {
			listener.enterComponentKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentKind) {
			listener.exitComponentKind(this);
		}
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


export class ComponentMemberTemplContext extends ParserRuleContext {
	public abstractTypeDecl(): AbstractTypeDeclContext | undefined {
		return this.tryGetRuleContext(0, AbstractTypeDeclContext);
	}
	public aliasTypeDecl(): AliasTypeDeclContext | undefined {
		return this.tryGetRuleContext(0, AliasTypeDeclContext);
	}
	public arrayDecl(): ArrayDeclContext | undefined {
		return this.tryGetRuleContext(0, ArrayDeclContext);
	}
	public constantDecl(): ConstantDeclContext | undefined {
		return this.tryGetRuleContext(0, ConstantDeclContext);
	}
	public structDecl(): StructDeclContext | undefined {
		return this.tryGetRuleContext(0, StructDeclContext);
	}
	public commandDecl(): CommandDeclContext | undefined {
		return this.tryGetRuleContext(0, CommandDeclContext);
	}
	public paramDecl(): ParamDeclContext | undefined {
		return this.tryGetRuleContext(0, ParamDeclContext);
	}
	public generalPortInstanceDecl(): GeneralPortInstanceDeclContext | undefined {
		return this.tryGetRuleContext(0, GeneralPortInstanceDeclContext);
	}
	public specialPortInstanceDecl(): SpecialPortInstanceDeclContext | undefined {
		return this.tryGetRuleContext(0, SpecialPortInstanceDeclContext);
	}
	public telemetryChannelDecl(): TelemetryChannelDeclContext | undefined {
		return this.tryGetRuleContext(0, TelemetryChannelDeclContext);
	}
	public enumDecl(): EnumDeclContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclContext);
	}
	public eventDecl(): EventDeclContext | undefined {
		return this.tryGetRuleContext(0, EventDeclContext);
	}
	public includeStmt(): IncludeStmtContext | undefined {
		return this.tryGetRuleContext(0, IncludeStmtContext);
	}
	public internalPortDecl(): InternalPortDeclContext | undefined {
		return this.tryGetRuleContext(0, InternalPortDeclContext);
	}
	public matchStmt(): MatchStmtContext | undefined {
		return this.tryGetRuleContext(0, MatchStmtContext);
	}
	public recordSpecifierDecl(): RecordSpecifierDeclContext | undefined {
		return this.tryGetRuleContext(0, RecordSpecifierDeclContext);
	}
	public containerSpecifierDecl(): ContainerSpecifierDeclContext | undefined {
		return this.tryGetRuleContext(0, ContainerSpecifierDeclContext);
	}
	public stateMachineInstance(): StateMachineInstanceContext | undefined {
		return this.tryGetRuleContext(0, StateMachineInstanceContext);
	}
	public stateMachineDef(): StateMachineDefContext | undefined {
		return this.tryGetRuleContext(0, StateMachineDefContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentMemberTempl) {
			listener.enterComponentMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentMemberTempl) {
			listener.exitComponentMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitComponentMemberTempl) {
			return visitor.visitComponentMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentMemberContext extends ParserRuleContext {
	public componentMemberTempl(): ComponentMemberTemplContext {
		return this.getRuleContext(0, ComponentMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public ANNOTATION(): TerminalNode | undefined { return this.tryGetToken(FppParser.ANNOTATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentMember) {
			listener.enterComponentMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentMember) {
			listener.exitComponentMember(this);
		}
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
	public COMPONENT(): TerminalNode { return this.getToken(FppParser.COMPONENT, 0); }
	public componentKind(): ComponentKindContext {
		return this.getRuleContext(0, ComponentKindContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public componentMember(): ComponentMemberContext[];
	public componentMember(i: number): ComponentMemberContext;
	public componentMember(i?: number): ComponentMemberContext | ComponentMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ComponentMemberContext);
		} else {
			return this.getRuleContext(i, ComponentMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentDecl) {
			listener.enterComponentDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentDecl) {
			listener.exitComponentDecl(this);
		}
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
	public PORT(): TerminalNode { return this.getToken(FppParser.PORT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_portDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPortDecl) {
			listener.enterPortDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPortDecl) {
			listener.exitPortDecl(this);
		}
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
	public INSTANCE(): TerminalNode { return this.getToken(FppParser.INSTANCE, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public PRIVATE(): TerminalNode | undefined { return this.tryGetToken(FppParser.PRIVATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_componentInstanceSpec; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterComponentInstanceSpec) {
			listener.enterComponentInstanceSpec(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitComponentInstanceSpec) {
			listener.exitComponentInstanceSpec(this);
		}
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
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_connectionNode; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterConnectionNode) {
			listener.enterConnectionNode(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitConnectionNode) {
			listener.exitConnectionNode(this);
		}
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
	public connectionNode(): ConnectionNodeContext[];
	public connectionNode(i: number): ConnectionNodeContext;
	public connectionNode(i?: number): ConnectionNodeContext | ConnectionNodeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConnectionNodeContext);
		} else {
			return this.getRuleContext(i, ConnectionNodeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_connection; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterConnection) {
			listener.enterConnection(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitConnection) {
			listener.exitConnection(this);
		}
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
	public CONNECTIONS(): TerminalNode { return this.getToken(FppParser.CONNECTIONS, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public connection(): ConnectionContext[];
	public connection(i: number): ConnectionContext;
	public connection(i?: number): ConnectionContext | ConnectionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConnectionContext);
		} else {
			return this.getRuleContext(i, ConnectionContext);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_directGraphDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterDirectGraphDecl) {
			listener.enterDirectGraphDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitDirectGraphDecl) {
			listener.exitDirectGraphDecl(this);
		}
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
	public COMMAND(): TerminalNode | undefined { return this.tryGetToken(FppParser.COMMAND, 0); }
	public EVENT(): TerminalNode | undefined { return this.tryGetToken(FppParser.EVENT, 0); }
	public TEXT(): TerminalNode | undefined { return this.tryGetToken(FppParser.TEXT, 0); }
	public HEALTH(): TerminalNode | undefined { return this.tryGetToken(FppParser.HEALTH, 0); }
	public PARAM(): TerminalNode | undefined { return this.tryGetToken(FppParser.PARAM, 0); }
	public TELEMETRY(): TerminalNode | undefined { return this.tryGetToken(FppParser.TELEMETRY, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(FppParser.TIME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_patternKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPatternKind) {
			listener.enterPatternKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPatternKind) {
			listener.exitPatternKind(this);
		}
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
	public qualIdent(): QualIdentContext[];
	public qualIdent(i: number): QualIdentContext;
	public qualIdent(i?: number): QualIdentContext | QualIdentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualIdentContext);
		} else {
			return this.getRuleContext(i, QualIdentContext);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_patternGraphSources; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPatternGraphSources) {
			listener.enterPatternGraphSources(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPatternGraphSources) {
			listener.exitPatternGraphSources(this);
		}
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
	public CONNECTIONS(): TerminalNode { return this.getToken(FppParser.CONNECTIONS, 0); }
	public INSTANCE(): TerminalNode { return this.getToken(FppParser.INSTANCE, 0); }
	public patternKind(): PatternKindContext {
		return this.getRuleContext(0, PatternKindContext);
	}
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public patternGraphSources(): PatternGraphSourcesContext | undefined {
		return this.tryGetRuleContext(0, PatternGraphSourcesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_patternGraphStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPatternGraphStmt) {
			listener.enterPatternGraphStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPatternGraphStmt) {
			listener.exitPatternGraphStmt(this);
		}
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
	public IMPORT(): TerminalNode { return this.getToken(FppParser.IMPORT, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_topologyImportStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTopologyImportStmt) {
			listener.enterTopologyImportStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTopologyImportStmt) {
			listener.exitTopologyImportStmt(this);
		}
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


export class TopologyMemberTemplContext extends ParserRuleContext {
	public componentInstanceSpec(): ComponentInstanceSpecContext | undefined {
		return this.tryGetRuleContext(0, ComponentInstanceSpecContext);
	}
	public directGraphDecl(): DirectGraphDeclContext | undefined {
		return this.tryGetRuleContext(0, DirectGraphDeclContext);
	}
	public patternGraphStmt(): PatternGraphStmtContext | undefined {
		return this.tryGetRuleContext(0, PatternGraphStmtContext);
	}
	public topologyImportStmt(): TopologyImportStmtContext | undefined {
		return this.tryGetRuleContext(0, TopologyImportStmtContext);
	}
	public includeStmt(): IncludeStmtContext | undefined {
		return this.tryGetRuleContext(0, IncludeStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_topologyMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTopologyMemberTempl) {
			listener.enterTopologyMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTopologyMemberTempl) {
			listener.exitTopologyMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTopologyMemberTempl) {
			return visitor.visitTopologyMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopologyMemberContext extends ParserRuleContext {
	public topologyMemberTempl(): TopologyMemberTemplContext {
		return this.getRuleContext(0, TopologyMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public ANNOTATION(): TerminalNode | undefined { return this.tryGetToken(FppParser.ANNOTATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_topologyMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTopologyMember) {
			listener.enterTopologyMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTopologyMember) {
			listener.exitTopologyMember(this);
		}
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
	public TOPOLOGY(): TerminalNode { return this.getToken(FppParser.TOPOLOGY, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public topologyMember(): TopologyMemberContext[];
	public topologyMember(i: number): TopologyMemberContext;
	public topologyMember(i?: number): TopologyMemberContext | TopologyMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TopologyMemberContext);
		} else {
			return this.getRuleContext(i, TopologyMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_topologyDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTopologyDecl) {
			listener.enterTopologyDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTopologyDecl) {
			listener.exitTopologyDecl(this);
		}
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
	public INSTANCE(): TerminalNode | undefined { return this.tryGetToken(FppParser.INSTANCE, 0); }
	public COMPONENT(): TerminalNode | undefined { return this.tryGetToken(FppParser.COMPONENT, 0); }
	public CONSTANT(): TerminalNode | undefined { return this.tryGetToken(FppParser.CONSTANT, 0); }
	public PORT(): TerminalNode | undefined { return this.tryGetToken(FppParser.PORT, 0); }
	public TOPOLOGY(): TerminalNode | undefined { return this.tryGetToken(FppParser.TOPOLOGY, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(FppParser.TYPE, 0); }
	public STATE(): TerminalNode | undefined { return this.tryGetToken(FppParser.STATE, 0); }
	public MACHINE(): TerminalNode | undefined { return this.tryGetToken(FppParser.MACHINE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_locationKind; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterLocationKind) {
			listener.enterLocationKind(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitLocationKind) {
			listener.exitLocationKind(this);
		}
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
	public LOCATE(): TerminalNode { return this.getToken(FppParser.LOCATE, 0); }
	public AT(): TerminalNode { return this.getToken(FppParser.AT, 0); }
	public locationKind(): LocationKindContext {
		return this.getRuleContext(0, LocationKindContext);
	}
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public LIT_STRING(): TerminalNode { return this.getToken(FppParser.LIT_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_locationStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterLocationStmt) {
			listener.enterLocationStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitLocationStmt) {
			listener.exitLocationStmt(this);
		}
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


export class ModuleMemberTemplContext extends ParserRuleContext {
	public abstractTypeDecl(): AbstractTypeDeclContext | undefined {
		return this.tryGetRuleContext(0, AbstractTypeDeclContext);
	}
	public aliasTypeDecl(): AliasTypeDeclContext | undefined {
		return this.tryGetRuleContext(0, AliasTypeDeclContext);
	}
	public arrayDecl(): ArrayDeclContext | undefined {
		return this.tryGetRuleContext(0, ArrayDeclContext);
	}
	public componentDecl(): ComponentDeclContext | undefined {
		return this.tryGetRuleContext(0, ComponentDeclContext);
	}
	public componentInstanceDecl(): ComponentInstanceDeclContext | undefined {
		return this.tryGetRuleContext(0, ComponentInstanceDeclContext);
	}
	public constantDecl(): ConstantDeclContext | undefined {
		return this.tryGetRuleContext(0, ConstantDeclContext);
	}
	public moduleDecl(): ModuleDeclContext | undefined {
		return this.tryGetRuleContext(0, ModuleDeclContext);
	}
	public portDecl(): PortDeclContext | undefined {
		return this.tryGetRuleContext(0, PortDeclContext);
	}
	public structDecl(): StructDeclContext | undefined {
		return this.tryGetRuleContext(0, StructDeclContext);
	}
	public locationStmt(): LocationStmtContext | undefined {
		return this.tryGetRuleContext(0, LocationStmtContext);
	}
	public enumDecl(): EnumDeclContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclContext);
	}
	public includeStmt(): IncludeStmtContext | undefined {
		return this.tryGetRuleContext(0, IncludeStmtContext);
	}
	public topologyDecl(): TopologyDeclContext | undefined {
		return this.tryGetRuleContext(0, TopologyDeclContext);
	}
	public stateMachineDef(): StateMachineDefContext | undefined {
		return this.tryGetRuleContext(0, StateMachineDefContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_moduleMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterModuleMemberTempl) {
			listener.enterModuleMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitModuleMemberTempl) {
			listener.exitModuleMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitModuleMemberTempl) {
			return visitor.visitModuleMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleMemberContext extends ParserRuleContext {
	public moduleMemberTempl(): ModuleMemberTemplContext {
		return this.getRuleContext(0, ModuleMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public ANNOTATION(): TerminalNode | undefined { return this.tryGetToken(FppParser.ANNOTATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_moduleMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterModuleMember) {
			listener.enterModuleMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitModuleMember) {
			listener.exitModuleMember(this);
		}
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
	public MODULE(): TerminalNode { return this.getToken(FppParser.MODULE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public moduleMember(): ModuleMemberContext[];
	public moduleMember(i: number): ModuleMemberContext;
	public moduleMember(i?: number): ModuleMemberContext | ModuleMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModuleMemberContext);
		} else {
			return this.getRuleContext(i, ModuleMemberContext);
		}
	}
	public semiDelim(): SemiDelimContext[];
	public semiDelim(i: number): SemiDelimContext;
	public semiDelim(i?: number): SemiDelimContext | SemiDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SemiDelimContext);
		} else {
			return this.getRuleContext(i, SemiDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_moduleDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterModuleDecl) {
			listener.enterModuleDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitModuleDecl) {
			listener.exitModuleDecl(this);
		}
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
	public _type!: TypeNameContext;
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public REF(): TerminalNode | undefined { return this.tryGetToken(FppParser.REF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_formalParameter; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterFormalParameter) {
			listener.enterFormalParameter(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitFormalParameter) {
			listener.exitFormalParameter(this);
		}
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
	public formalParameter(): FormalParameterContext {
		return this.getRuleContext(0, FormalParameterContext);
	}
	public postMultiAnnotation(): PostMultiAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostMultiAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_formalParameterN; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterFormalParameterN) {
			listener.enterFormalParameterN(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitFormalParameterN) {
			listener.exitFormalParameterN(this);
		}
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
	public formalParameter(): FormalParameterContext {
		return this.getRuleContext(0, FormalParameterContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public postMultiAnnotation(): PostMultiAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostMultiAnnotationContext);
	}
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_formalParamaterL; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterFormalParamaterL) {
			listener.enterFormalParamaterL(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitFormalParamaterL) {
			listener.exitFormalParamaterL(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public formalParamaterL(): FormalParamaterLContext | undefined {
		return this.tryGetRuleContext(0, FormalParamaterLContext);
	}
	public formalParameterN(): FormalParameterNContext[];
	public formalParameterN(i: number): FormalParameterNContext;
	public formalParameterN(i?: number): FormalParameterNContext | FormalParameterNContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FormalParameterNContext);
		} else {
			return this.getRuleContext(i, FormalParameterNContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_formalParameterList; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterFormalParameterList) {
			listener.enterFormalParameterList(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitFormalParameterList) {
			listener.exitFormalParameterList(this);
		}
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
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.IDENTIFIER);
		} else {
			return this.getToken(FppParser.IDENTIFIER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_qualIdent; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterQualIdent) {
			listener.enterQualIdent(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitQualIdent) {
			listener.exitQualIdent(this);
		}
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
	public U8(): TerminalNode | undefined { return this.tryGetToken(FppParser.U8, 0); }
	public I8(): TerminalNode | undefined { return this.tryGetToken(FppParser.I8, 0); }
	public U16(): TerminalNode | undefined { return this.tryGetToken(FppParser.U16, 0); }
	public I16(): TerminalNode | undefined { return this.tryGetToken(FppParser.I16, 0); }
	public U32(): TerminalNode | undefined { return this.tryGetToken(FppParser.U32, 0); }
	public I32(): TerminalNode | undefined { return this.tryGetToken(FppParser.I32, 0); }
	public U64(): TerminalNode | undefined { return this.tryGetToken(FppParser.U64, 0); }
	public I64(): TerminalNode | undefined { return this.tryGetToken(FppParser.I64, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_intType; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterIntType) {
			listener.enterIntType(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitIntType) {
			listener.exitIntType(this);
		}
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
	public U8(): TerminalNode | undefined { return this.tryGetToken(FppParser.U8, 0); }
	public I8(): TerminalNode | undefined { return this.tryGetToken(FppParser.I8, 0); }
	public U16(): TerminalNode | undefined { return this.tryGetToken(FppParser.U16, 0); }
	public I16(): TerminalNode | undefined { return this.tryGetToken(FppParser.I16, 0); }
	public U32(): TerminalNode | undefined { return this.tryGetToken(FppParser.U32, 0); }
	public I32(): TerminalNode | undefined { return this.tryGetToken(FppParser.I32, 0); }
	public U64(): TerminalNode | undefined { return this.tryGetToken(FppParser.U64, 0); }
	public I64(): TerminalNode | undefined { return this.tryGetToken(FppParser.I64, 0); }
	public F32(): TerminalNode | undefined { return this.tryGetToken(FppParser.F32, 0); }
	public F64(): TerminalNode | undefined { return this.tryGetToken(FppParser.F64, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(FppParser.BOOL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_primitiveType; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPrimitiveType) {
			listener.enterPrimitiveType(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPrimitiveType) {
			listener.exitPrimitiveType(this);
		}
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


export class StringTypeContext extends ParserRuleContext {
	public _size!: ExprContext;
	public STRING(): TerminalNode { return this.getToken(FppParser.STRING, 0); }
	public SIZE(): TerminalNode | undefined { return this.tryGetToken(FppParser.SIZE, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_stringType; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStringType) {
			listener.enterStringType(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStringType) {
			listener.exitStringType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitStringType) {
			return visitor.visitStringType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	public stringType(): StringTypeContext | undefined {
		return this.tryGetRuleContext(0, StringTypeContext);
	}
	public primitiveType(): PrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, PrimitiveTypeContext);
	}
	public qualIdent(): QualIdentContext | undefined {
		return this.tryGetRuleContext(0, QualIdentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_typeName; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTypeName) {
			listener.enterTypeName(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTypeName) {
			listener.exitTypeName(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_commaDelim; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterCommaDelim) {
			listener.enterCommaDelim(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitCommaDelim) {
			listener.exitCommaDelim(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_semiDelim; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterSemiDelim) {
			listener.enterSemiDelim(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitSemiDelim) {
			listener.exitSemiDelim(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_arrayExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterArrayExpr) {
			listener.enterArrayExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitArrayExpr) {
			listener.exitArrayExpr(this);
		}
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
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structAssignment; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructAssignment) {
			listener.enterStructAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructAssignment) {
			listener.exitStructAssignment(this);
		}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public structAssignment(): StructAssignmentContext[];
	public structAssignment(i: number): StructAssignmentContext;
	public structAssignment(i?: number): StructAssignmentContext | StructAssignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StructAssignmentContext);
		} else {
			return this.getRuleContext(i, StructAssignmentContext);
		}
	}
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_structExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterStructExpr) {
			listener.enterStructExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitStructExpr) {
			listener.exitStructExpr(this);
		}
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
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public arrayExpr(): ArrayExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayExprContext);
	}
	public structExpr(): StructExprContext | undefined {
		return this.tryGetRuleContext(0, StructExprContext);
	}
	public qualIdent(): QualIdentContext | undefined {
		return this.tryGetRuleContext(0, QualIdentContext);
	}
	public LIT_BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_BOOLEAN, 0); }
	public LIT_FLOAT(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_FLOAT, 0); }
	public LIT_INT(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_INT, 0); }
	public LIT_STRING(): TerminalNode | undefined { return this.tryGetToken(FppParser.LIT_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_expr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterExpr) {
			listener.enterExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitExpr) {
			listener.exitExpr(this);
		}
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


export class PostAnnotationContext extends ParserRuleContext {
	public ANNOTATION(): TerminalNode { return this.getToken(FppParser.ANNOTATION, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_postAnnotation; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPostAnnotation) {
			listener.enterPostAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPostAnnotation) {
			listener.exitPostAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPostAnnotation) {
			return visitor.visitPostAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostMultiAnnotationContext extends ParserRuleContext {
	public ANNOTATION(): TerminalNode[];
	public ANNOTATION(i: number): TerminalNode;
	public ANNOTATION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.ANNOTATION);
		} else {
			return this.getToken(FppParser.ANNOTATION, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_postMultiAnnotation; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPostMultiAnnotation) {
			listener.enterPostMultiAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPostMultiAnnotation) {
			listener.exitPostMultiAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPostMultiAnnotation) {
			return visitor.visitPostMultiAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PreAnnotationContext extends ParserRuleContext {
	public ANNOTATION(): TerminalNode[];
	public ANNOTATION(i: number): TerminalNode;
	public ANNOTATION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.ANNOTATION);
		} else {
			return this.getToken(FppParser.ANNOTATION, i);
		}
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_preAnnotation; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterPreAnnotation) {
			listener.enterPreAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitPreAnnotation) {
			listener.exitPreAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitPreAnnotation) {
			return visitor.visitPreAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


