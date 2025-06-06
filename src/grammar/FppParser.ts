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
	public static readonly GROUP = 69;
	public static readonly GUARD = 70;
	public static readonly GUARDED = 71;
	public static readonly HEALTH = 72;
	public static readonly HIGH = 73;
	public static readonly HOOK = 74;
	public static readonly ID = 75;
	public static readonly IF = 76;
	public static readonly IMPORT = 77;
	public static readonly INCLUDE = 78;
	public static readonly INITIAL = 79;
	public static readonly INPUT = 80;
	public static readonly INSTANCE = 81;
	public static readonly INTERFACE = 82;
	public static readonly INTERNAL = 83;
	public static readonly LOCATE = 84;
	public static readonly LOW = 85;
	public static readonly MACHINE = 86;
	public static readonly MATCH = 87;
	public static readonly MODULE = 88;
	public static readonly OMIT = 89;
	public static readonly ON = 90;
	public static readonly OPCODE = 91;
	public static readonly ORANGE = 92;
	public static readonly OUTPUT = 93;
	public static readonly PACKET = 94;
	public static readonly PACKETS = 95;
	public static readonly PARAM = 96;
	public static readonly PASSIVE = 97;
	public static readonly PHASE = 98;
	public static readonly PORT = 99;
	public static readonly PRIORITY = 100;
	public static readonly PRIVATE = 101;
	public static readonly PRODUCT = 102;
	public static readonly QUEUE = 103;
	public static readonly QUEUED = 104;
	public static readonly RECORD = 105;
	public static readonly RECV = 106;
	public static readonly RED = 107;
	public static readonly REF = 108;
	public static readonly REG = 109;
	public static readonly REQUEST = 110;
	public static readonly RESP = 111;
	public static readonly SAVE = 112;
	public static readonly SEND = 113;
	public static readonly SERIAL = 114;
	public static readonly SET = 115;
	public static readonly SEVERITY = 116;
	public static readonly SIGNAL = 117;
	public static readonly SIZE = 118;
	public static readonly STACK = 119;
	public static readonly STATE = 120;
	public static readonly STRING = 121;
	public static readonly STRUCT = 122;
	public static readonly SYNC = 123;
	public static readonly TELEMETRY = 124;
	public static readonly TEXT = 125;
	public static readonly THROTTLE = 126;
	public static readonly TIME = 127;
	public static readonly TOPOLOGY = 128;
	public static readonly TRUE = 129;
	public static readonly TYPE = 130;
	public static readonly UNMATCHED = 131;
	public static readonly UPDATE = 132;
	public static readonly WARNING = 133;
	public static readonly WITH = 134;
	public static readonly YELLOW = 135;
	public static readonly IDENTIFIER = 136;
	public static readonly RULE_prog = 0;
	public static readonly RULE_progTopology = 1;
	public static readonly RULE_progComponent = 2;
	public static readonly RULE_abstractTypeDecl = 3;
	public static readonly RULE_aliasTypeDecl = 4;
	public static readonly RULE_arrayDefault = 5;
	public static readonly RULE_arrayDecl = 6;
	public static readonly RULE_constantDecl = 7;
	public static readonly RULE_structMember = 8;
	public static readonly RULE_structMemberN = 9;
	public static readonly RULE_structMemberL = 10;
	public static readonly RULE_structDecl = 11;
	public static readonly RULE_queueFullBehavior = 12;
	public static readonly RULE_commandKind = 13;
	public static readonly RULE_commandDecl = 14;
	public static readonly RULE_paramDecl = 15;
	public static readonly RULE_generalPortKind = 16;
	public static readonly RULE_specialPortKind = 17;
	public static readonly RULE_generalPortInstanceType = 18;
	public static readonly RULE_generalPortInstanceDecl = 19;
	public static readonly RULE_specialPortInstanceDecl = 20;
	public static readonly RULE_telemetryLimitKind = 21;
	public static readonly RULE_telemetryLimitExpr = 22;
	public static readonly RULE_telemetryLimit = 23;
	public static readonly RULE_telemetryUpdate = 24;
	public static readonly RULE_telemetryChannelDecl = 25;
	public static readonly RULE_actionDef = 26;
	public static readonly RULE_choiceDef = 27;
	public static readonly RULE_guardDef = 28;
	public static readonly RULE_signalDef = 29;
	public static readonly RULE_doExpr = 30;
	public static readonly RULE_transitionExpr = 31;
	public static readonly RULE_initialTransition = 32;
	public static readonly RULE_transitionOrDoExpr = 33;
	public static readonly RULE_stateTransition = 34;
	public static readonly RULE_stateEntry = 35;
	public static readonly RULE_stateExit = 36;
	public static readonly RULE_stateMemberTempl = 37;
	public static readonly RULE_stateMember = 38;
	public static readonly RULE_stateDef = 39;
	public static readonly RULE_stateMachineMemberTempl = 40;
	public static readonly RULE_stateMachineMember = 41;
	public static readonly RULE_stateMachineDef = 42;
	public static readonly RULE_stateMachineInstance = 43;
	public static readonly RULE_enumMember = 44;
	public static readonly RULE_enumMemberN = 45;
	public static readonly RULE_enumMemberL = 46;
	public static readonly RULE_enumDecl = 47;
	public static readonly RULE_eventSeverity = 48;
	public static readonly RULE_eventDecl = 49;
	public static readonly RULE_includeStmt = 50;
	public static readonly RULE_matchStmt = 51;
	public static readonly RULE_internalPortDecl = 52;
	public static readonly RULE_recordSpecifierDecl = 53;
	public static readonly RULE_containerSpecifierDecl = 54;
	public static readonly RULE_initSpecifier = 55;
	public static readonly RULE_componentInstanceDecl = 56;
	public static readonly RULE_componentKind = 57;
	public static readonly RULE_componentMemberTempl = 58;
	public static readonly RULE_componentMember = 59;
	public static readonly RULE_componentDecl = 60;
	public static readonly RULE_portDecl = 61;
	public static readonly RULE_componentInstanceSpec = 62;
	public static readonly RULE_connectionNode = 63;
	public static readonly RULE_connection = 64;
	public static readonly RULE_directGraphDecl = 65;
	public static readonly RULE_patternKind = 66;
	public static readonly RULE_patternGraphSources = 67;
	public static readonly RULE_patternGraphStmt = 68;
	public static readonly RULE_importTopologyStmt = 69;
	public static readonly RULE_importInterfaceStmt = 70;
	public static readonly RULE_telemetryChannelIdentifier = 71;
	public static readonly RULE_telemetryPacketSpecifier = 72;
	public static readonly RULE_telemetryPacketSetMemberTempl = 73;
	public static readonly RULE_telemetryPacketSetMember = 74;
	public static readonly RULE_telemetryPacketSetDecl = 75;
	public static readonly RULE_topologyMemberTempl = 76;
	public static readonly RULE_topologyMember = 77;
	public static readonly RULE_topologyDecl = 78;
	public static readonly RULE_interfaceMemberTempl = 79;
	public static readonly RULE_interfaceMember = 80;
	public static readonly RULE_interfaceDecl = 81;
	public static readonly RULE_locationKind = 82;
	public static readonly RULE_locationStmt = 83;
	public static readonly RULE_moduleMemberTempl = 84;
	public static readonly RULE_moduleMember = 85;
	public static readonly RULE_moduleDecl = 86;
	public static readonly RULE_formalParameter = 87;
	public static readonly RULE_formalParameterN = 88;
	public static readonly RULE_formalParamaterL = 89;
	public static readonly RULE_formalParameterList = 90;
	public static readonly RULE_qualIdent = 91;
	public static readonly RULE_intType = 92;
	public static readonly RULE_primitiveType = 93;
	public static readonly RULE_stringType = 94;
	public static readonly RULE_typeName = 95;
	public static readonly RULE_commaDelim = 96;
	public static readonly RULE_semiDelim = 97;
	public static readonly RULE_arrayExpr = 98;
	public static readonly RULE_structAssignment = 99;
	public static readonly RULE_structExpr = 100;
	public static readonly RULE_scalarExpr = 101;
	public static readonly RULE_expr = 102;
	public static readonly RULE_postAnnotation = 103;
	public static readonly RULE_postMultiAnnotation = 104;
	public static readonly RULE_preAnnotation = 105;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "progTopology", "progComponent", "abstractTypeDecl", "aliasTypeDecl", 
		"arrayDefault", "arrayDecl", "constantDecl", "structMember", "structMemberN", 
		"structMemberL", "structDecl", "queueFullBehavior", "commandKind", "commandDecl", 
		"paramDecl", "generalPortKind", "specialPortKind", "generalPortInstanceType", 
		"generalPortInstanceDecl", "specialPortInstanceDecl", "telemetryLimitKind", 
		"telemetryLimitExpr", "telemetryLimit", "telemetryUpdate", "telemetryChannelDecl", 
		"actionDef", "choiceDef", "guardDef", "signalDef", "doExpr", "transitionExpr", 
		"initialTransition", "transitionOrDoExpr", "stateTransition", "stateEntry", 
		"stateExit", "stateMemberTempl", "stateMember", "stateDef", "stateMachineMemberTempl", 
		"stateMachineMember", "stateMachineDef", "stateMachineInstance", "enumMember", 
		"enumMemberN", "enumMemberL", "enumDecl", "eventSeverity", "eventDecl", 
		"includeStmt", "matchStmt", "internalPortDecl", "recordSpecifierDecl", 
		"containerSpecifierDecl", "initSpecifier", "componentInstanceDecl", "componentKind", 
		"componentMemberTempl", "componentMember", "componentDecl", "portDecl", 
		"componentInstanceSpec", "connectionNode", "connection", "directGraphDecl", 
		"patternKind", "patternGraphSources", "patternGraphStmt", "importTopologyStmt", 
		"importInterfaceStmt", "telemetryChannelIdentifier", "telemetryPacketSpecifier", 
		"telemetryPacketSetMemberTempl", "telemetryPacketSetMember", "telemetryPacketSetDecl", 
		"topologyMemberTempl", "topologyMember", "topologyDecl", "interfaceMemberTempl", 
		"interfaceMember", "interfaceDecl", "locationKind", "locationStmt", "moduleMemberTempl", 
		"moduleMember", "moduleDecl", "formalParameter", "formalParameterN", "formalParamaterL", 
		"formalParameterList", "qualIdent", "intType", "primitiveType", "stringType", 
		"typeName", "commaDelim", "semiDelim", "arrayExpr", "structAssignment", 
		"structExpr", "scalarExpr", "expr", "postAnnotation", "postMultiAnnotation", 
		"preAnnotation",
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
		"'fatal'", "'format'", "'get'", "'group'", "'guard'", "'guarded'", "'health'", 
		"'high'", "'hook'", "'id'", "'if'", "'import'", "'include'", "'initial'", 
		"'input'", "'instance'", "'interface'", "'internal'", "'locate'", "'low'", 
		"'machine'", "'match'", "'module'", "'omit'", "'on'", "'opcode'", "'orange'", 
		"'output'", "'packet'", "'packets'", "'param'", "'passive'", "'phase'", 
		"'port'", "'priority'", "'private'", "'product'", "'queue'", "'queued'", 
		"'record'", "'recv'", "'red'", "'ref'", "'reg'", "'request'", "'resp'", 
		"'save'", "'send'", "'serial'", "'set'", "'severity'", "'signal'", "'size'", 
		"'stack'", "'state'", "'string'", "'struct'", "'sync'", "'telemetry'", 
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
		"ENUM", "EVENT", "EXIT", "FALSE", "FATAL", "FORMAT", "GET", "GROUP", "GUARD", 
		"GUARDED", "HEALTH", "HIGH", "HOOK", "ID", "IF", "IMPORT", "INCLUDE", 
		"INITIAL", "INPUT", "INSTANCE", "INTERFACE", "INTERNAL", "LOCATE", "LOW", 
		"MACHINE", "MATCH", "MODULE", "OMIT", "ON", "OPCODE", "ORANGE", "OUTPUT", 
		"PACKET", "PACKETS", "PARAM", "PASSIVE", "PHASE", "PORT", "PRIORITY", 
		"PRIVATE", "PRODUCT", "QUEUE", "QUEUED", "RECORD", "RECV", "RED", "REF", 
		"REG", "REQUEST", "RESP", "SAVE", "SEND", "SERIAL", "SET", "SEVERITY", 
		"SIGNAL", "SIZE", "STACK", "STATE", "STRING", "STRUCT", "SYNC", "TELEMETRY", 
		"TEXT", "THROTTLE", "TIME", "TOPOLOGY", "TRUE", "TYPE", "UNMATCHED", "UPDATE", 
		"WARNING", "WITH", "YELLOW", "IDENTIFIER",
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
			this.state = 215;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 212;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 217;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (FppParser.ACTIVE - 37)) | (1 << (FppParser.ARRAY - 37)) | (1 << (FppParser.CONSTANT - 37)) | (1 << (FppParser.ENUM - 37)))) !== 0) || ((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & ((1 << (FppParser.INCLUDE - 78)) | (1 << (FppParser.INSTANCE - 78)) | (1 << (FppParser.INTERFACE - 78)) | (1 << (FppParser.LOCATE - 78)) | (1 << (FppParser.MODULE - 78)) | (1 << (FppParser.PASSIVE - 78)) | (1 << (FppParser.PORT - 78)) | (1 << (FppParser.QUEUED - 78)))) !== 0) || ((((_la - 120)) & ~0x1F) === 0 && ((1 << (_la - 120)) & ((1 << (FppParser.STATE - 120)) | (1 << (FppParser.STRUCT - 120)) | (1 << (FppParser.TOPOLOGY - 120)) | (1 << (FppParser.TYPE - 120)))) !== 0)) {
				{
				{
				this.state = 218;
				this.moduleMember();
				this.state = 221;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 219;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 220;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 228;
				this.match(FppParser.NL);
				}
				}
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 234;
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
			this.state = 239;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 236;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 241;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONNECTIONS - 21)))) !== 0) || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (FppParser.EVENT - 63)) | (1 << (FppParser.HEALTH - 63)) | (1 << (FppParser.IMPORT - 63)) | (1 << (FppParser.INCLUDE - 63)) | (1 << (FppParser.INSTANCE - 63)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (FppParser.PARAM - 96)) | (1 << (FppParser.PRIVATE - 96)) | (1 << (FppParser.TELEMETRY - 96)) | (1 << (FppParser.TEXT - 96)) | (1 << (FppParser.TIME - 96)))) !== 0)) {
				{
				{
				this.state = 242;
				this.topologyMember();
				this.state = 245;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 243;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 244;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 255;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 252;
				this.match(FppParser.NL);
				}
				}
				this.state = 257;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 258;
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
			this.state = 263;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 260;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 265;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			}
			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (FppParser.ARRAY - 40)) | (1 << (FppParser.ASYNC - 40)) | (1 << (FppParser.COMMAND - 40)) | (1 << (FppParser.CONSTANT - 40)) | (1 << (FppParser.ENUM - 40)) | (1 << (FppParser.EVENT - 40)) | (1 << (FppParser.GUARDED - 40)))) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & ((1 << (FppParser.IMPORT - 77)) | (1 << (FppParser.INCLUDE - 77)) | (1 << (FppParser.INTERNAL - 77)) | (1 << (FppParser.MATCH - 77)) | (1 << (FppParser.OUTPUT - 77)) | (1 << (FppParser.PARAM - 77)) | (1 << (FppParser.PRODUCT - 77)))) !== 0) || ((((_la - 120)) & ~0x1F) === 0 && ((1 << (_la - 120)) & ((1 << (FppParser.STATE - 120)) | (1 << (FppParser.STRUCT - 120)) | (1 << (FppParser.SYNC - 120)) | (1 << (FppParser.TELEMETRY - 120)) | (1 << (FppParser.TEXT - 120)) | (1 << (FppParser.TIME - 120)) | (1 << (FppParser.TYPE - 120)))) !== 0)) {
				{
				{
				this.state = 266;
				this.componentMember();
				this.state = 269;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FppParser.T__11:
				case FppParser.NL:
					{
					this.state = 267;
					this.semiDelim();
					}
					break;
				case FppParser.EOF:
					{
					this.state = 268;
					this.match(FppParser.EOF);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 275;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 276;
				this.match(FppParser.NL);
				}
				}
				this.state = 281;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 282;
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
			this.state = 284;
			this.match(FppParser.TYPE);
			this.state = 285;
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
			this.state = 287;
			this.match(FppParser.TYPE);
			this.state = 288;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 289;
			this.match(FppParser.T__0);
			this.state = 290;
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
	public arrayDefault(): ArrayDefaultContext {
		let _localctx: ArrayDefaultContext = new ArrayDefaultContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, FppParser.RULE_arrayDefault);
		try {
			this.state = 294;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 292;
				this.arrayExpr();
				}
				break;
			case FppParser.T__8:
			case FppParser.T__12:
			case FppParser.LIT_BOOLEAN:
			case FppParser.LIT_STRING:
			case FppParser.LIT_FLOAT:
			case FppParser.LIT_INT:
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 293;
				this.scalarExpr(0);
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
	public arrayDecl(): ArrayDeclContext {
		let _localctx: ArrayDeclContext = new ArrayDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, FppParser.RULE_arrayDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 296;
			this.match(FppParser.ARRAY);
			this.state = 297;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 298;
			this.match(FppParser.T__0);
			this.state = 299;
			this.match(FppParser.T__1);
			this.state = 300;
			_localctx._size = this.expr();
			this.state = 301;
			this.match(FppParser.T__2);
			this.state = 302;
			_localctx._type = this.typeName();
			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 303;
				this.match(FppParser.DEFAULT);
				this.state = 304;
				_localctx._default_ = this.arrayDefault();
				}
			}

			this.state = 309;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 307;
				this.match(FppParser.FORMAT);
				this.state = 308;
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
		this.enterRule(_localctx, 14, FppParser.RULE_constantDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 311;
			this.match(FppParser.CONSTANT);
			this.state = 312;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 313;
			this.match(FppParser.T__0);
			this.state = 314;
			_localctx._value = this.expr();
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
		this.enterRule(_localctx, 16, FppParser.RULE_structMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 317;
			this.match(FppParser.T__3);
			this.state = 322;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 318;
				this.match(FppParser.T__1);
				this.state = 319;
				_localctx._size = this.expr();
				this.state = 320;
				this.match(FppParser.T__2);
				}
			}

			this.state = 324;
			_localctx._type = this.typeName();
			this.state = 327;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 325;
				this.match(FppParser.FORMAT);
				this.state = 326;
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
		this.enterRule(_localctx, 18, FppParser.RULE_structMemberN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 330;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 329;
				this.preAnnotation();
				}
			}

			this.state = 332;
			this.structMember();
			this.state = 338;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 334;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 333;
					this.match(FppParser.T__4);
					}
				}

				this.state = 336;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 337;
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
		this.enterRule(_localctx, 20, FppParser.RULE_structMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 341;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 340;
				this.preAnnotation();
				}
			}

			this.state = 343;
			this.structMember();
			this.state = 349;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 345;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 344;
					this.match(FppParser.T__4);
					}
				}

				this.state = 347;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 348;
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
		this.enterRule(_localctx, 22, FppParser.RULE_structDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 351;
			this.match(FppParser.STRUCT);
			this.state = 352;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 353;
			this.match(FppParser.T__5);
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 354;
				this.match(FppParser.NL);
				}
				}
				this.state = 359;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 367;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 363;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 360;
						this.structMemberN();
						}
						}
					}
					this.state = 365;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
				}
				this.state = 366;
				this.structMemberL();
				}
			}

			this.state = 369;
			this.match(FppParser.T__6);
			this.state = 372;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 370;
				this.match(FppParser.DEFAULT);
				this.state = 371;
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
		this.enterRule(_localctx, 24, FppParser.RULE_queueFullBehavior);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 374;
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
		this.enterRule(_localctx, 26, FppParser.RULE_commandKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 376;
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
		this.enterRule(_localctx, 28, FppParser.RULE_commandDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 378;
			_localctx._kind = this.commandKind();
			this.state = 379;
			this.match(FppParser.COMMAND);
			this.state = 380;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 382;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 381;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 386;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.OPCODE) {
				{
				this.state = 384;
				this.match(FppParser.OPCODE);
				this.state = 385;
				_localctx._opcode = this.expr();
				}
			}

			this.state = 390;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 388;
				this.match(FppParser.PRIORITY);
				this.state = 389;
				_localctx._priority = this.expr();
				}
			}

			this.state = 393;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 392;
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
		this.enterRule(_localctx, 30, FppParser.RULE_paramDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 395;
			this.match(FppParser.PARAM);
			this.state = 396;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 397;
			this.match(FppParser.T__3);
			this.state = 398;
			_localctx._type = this.typeName();
			this.state = 401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 399;
				this.match(FppParser.DEFAULT);
				this.state = 400;
				_localctx._default_ = this.expr();
				}
			}

			this.state = 405;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 403;
				this.match(FppParser.ID);
				this.state = 404;
				_localctx._id = this.expr();
				}
			}

			this.state = 410;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SET) {
				{
				this.state = 407;
				this.match(FppParser.SET);
				this.state = 408;
				this.match(FppParser.OPCODE);
				this.state = 409;
				_localctx._setOpcode = this.expr();
				}
			}

			this.state = 415;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SAVE) {
				{
				this.state = 412;
				this.match(FppParser.SAVE);
				this.state = 413;
				this.match(FppParser.OPCODE);
				this.state = 414;
				_localctx._saveOpcode = this.expr();
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
		this.enterRule(_localctx, 32, FppParser.RULE_generalPortKind);
		try {
			this.state = 424;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ASYNC:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 417;
				this.match(FppParser.ASYNC);
				this.state = 418;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.GUARDED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 419;
				this.match(FppParser.GUARDED);
				this.state = 420;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.SYNC:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 421;
				this.match(FppParser.SYNC);
				this.state = 422;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.OUTPUT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 423;
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
		this.enterRule(_localctx, 34, FppParser.RULE_specialPortKind);
		let _la: number;
		try {
			this.state = 453;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 426;
				this.match(FppParser.COMMAND);
				this.state = 427;
				this.match(FppParser.RECV);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 428;
				this.match(FppParser.COMMAND);
				this.state = 429;
				this.match(FppParser.REG);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 430;
				this.match(FppParser.COMMAND);
				this.state = 431;
				this.match(FppParser.RESP);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 432;
				this.match(FppParser.EVENT);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 433;
				this.match(FppParser.PARAM);
				this.state = 434;
				this.match(FppParser.GET);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 435;
				this.match(FppParser.PARAM);
				this.state = 436;
				this.match(FppParser.SET);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 437;
				this.match(FppParser.TELEMETRY);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 438;
				this.match(FppParser.TEXT);
				this.state = 439;
				this.match(FppParser.EVENT);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 440;
				this.match(FppParser.TIME);
				this.state = 441;
				this.match(FppParser.GET);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 442;
				this.match(FppParser.PRODUCT);
				this.state = 443;
				this.match(FppParser.GET);
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 444;
				this.match(FppParser.PRODUCT);
				this.state = 445;
				this.match(FppParser.REQUEST);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.ASYNC || _la === FppParser.GUARDED || _la === FppParser.SYNC) {
					{
					this.state = 446;
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

				this.state = 449;
				this.match(FppParser.PRODUCT);
				this.state = 450;
				this.match(FppParser.RECV);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 451;
				this.match(FppParser.PRODUCT);
				this.state = 452;
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
		this.enterRule(_localctx, 36, FppParser.RULE_generalPortInstanceType);
		try {
			this.state = 457;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.SERIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 455;
				this.match(FppParser.SERIAL);
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 456;
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
		this.enterRule(_localctx, 38, FppParser.RULE_generalPortInstanceDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 459;
			_localctx._kind = this.generalPortKind();
			this.state = 460;
			this.match(FppParser.PORT);
			this.state = 461;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 462;
			this.match(FppParser.T__3);
			this.state = 467;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 463;
				this.match(FppParser.T__1);
				this.state = 464;
				_localctx._n = this.expr();
				this.state = 465;
				this.match(FppParser.T__2);
				}
			}

			this.state = 469;
			_localctx._type = this.generalPortInstanceType();
			this.state = 472;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 470;
				this.match(FppParser.PRIORITY);
				this.state = 471;
				_localctx._priority = this.expr();
				}
			}

			this.state = 475;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 474;
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
		this.enterRule(_localctx, 40, FppParser.RULE_specialPortInstanceDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 477;
			this.specialPortKind();
			this.state = 478;
			this.match(FppParser.PORT);
			this.state = 479;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 482;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 480;
				this.match(FppParser.PRIORITY);
				this.state = 481;
				_localctx._priority = this.expr();
				}
			}

			this.state = 485;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 484;
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
	public telemetryLimitKind(): TelemetryLimitKindContext {
		let _localctx: TelemetryLimitKindContext = new TelemetryLimitKindContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, FppParser.RULE_telemetryLimitKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 487;
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
		this.enterRule(_localctx, 44, FppParser.RULE_telemetryLimitExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 489;
			_localctx._kind = this.telemetryLimitKind();
			this.state = 490;
			_localctx._limit = this.expr();
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
		this.enterRule(_localctx, 46, FppParser.RULE_telemetryLimit);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 492;
			this.match(FppParser.T__5);
			this.state = 496;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 493;
				this.match(FppParser.NL);
				}
				}
				this.state = 498;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 511;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ORANGE || _la === FppParser.RED || _la === FppParser.YELLOW) {
				{
				this.state = 499;
				this.telemetryLimitExpr();
				this.state = 505;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 500;
						this.commaDelim();
						this.state = 501;
						this.telemetryLimitExpr();
						}
						}
					}
					this.state = 507;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
				}
				this.state = 509;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 508;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 513;
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
		this.enterRule(_localctx, 48, FppParser.RULE_telemetryUpdate);
		try {
			this.state = 518;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ALWAYS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 515;
				this.match(FppParser.ALWAYS);
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 516;
				this.match(FppParser.ON);
				this.state = 517;
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
		this.enterRule(_localctx, 50, FppParser.RULE_telemetryChannelDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 520;
			this.match(FppParser.TELEMETRY);
			this.state = 521;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 522;
			this.match(FppParser.T__3);
			this.state = 523;
			_localctx._type = this.typeName();
			this.state = 526;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 524;
				this.match(FppParser.ID);
				this.state = 525;
				_localctx._id = this.expr();
				}
			}

			this.state = 530;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.UPDATE) {
				{
				this.state = 528;
				this.match(FppParser.UPDATE);
				this.state = 529;
				_localctx._update = this.telemetryUpdate();
				}
			}

			this.state = 534;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 532;
				this.match(FppParser.FORMAT);
				this.state = 533;
				_localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 538;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.LOW) {
				{
				this.state = 536;
				this.match(FppParser.LOW);
				this.state = 537;
				_localctx._low = this.telemetryLimit();
				}
			}

			this.state = 542;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.HIGH) {
				{
				this.state = 540;
				this.match(FppParser.HIGH);
				this.state = 541;
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
		this.enterRule(_localctx, 52, FppParser.RULE_actionDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 544;
			this.match(FppParser.ACTION);
			this.state = 545;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 548;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 546;
				this.match(FppParser.T__3);
				this.state = 547;
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
		this.enterRule(_localctx, 54, FppParser.RULE_choiceDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 550;
			this.match(FppParser.CHOICE);
			this.state = 551;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 552;
			this.match(FppParser.T__5);
			this.state = 556;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 553;
				this.match(FppParser.NL);
				}
				}
				this.state = 558;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 559;
			this.match(FppParser.IF);
			this.state = 560;
			_localctx._guard = this.match(FppParser.IDENTIFIER);
			this.state = 561;
			_localctx._then = this.transitionExpr();
			this.state = 562;
			this.match(FppParser.ELSE);
			this.state = 563;
			_localctx._else = this.transitionExpr();
			this.state = 567;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 564;
				this.match(FppParser.NL);
				}
				}
				this.state = 569;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 570;
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
		this.enterRule(_localctx, 56, FppParser.RULE_guardDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 572;
			this.match(FppParser.GUARD);
			this.state = 573;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 576;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 574;
				this.match(FppParser.T__3);
				this.state = 575;
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
		this.enterRule(_localctx, 58, FppParser.RULE_signalDef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 578;
			this.match(FppParser.SIGNAL);
			this.state = 579;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 582;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 580;
				this.match(FppParser.T__3);
				this.state = 581;
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
		this.enterRule(_localctx, 60, FppParser.RULE_doExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 584;
			this.match(FppParser.DO);
			this.state = 585;
			this.match(FppParser.T__5);
			this.state = 589;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 586;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 591;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
			}
			this.state = 601;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 592;
				this.match(FppParser.IDENTIFIER);
				this.state = 598;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 60, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 593;
						this.commaDelim();
						this.state = 594;
						this.match(FppParser.IDENTIFIER);
						}
						}
					}
					this.state = 600;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 60, this._ctx);
				}
				}
			}

			this.state = 604;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__4 || _la === FppParser.NL) {
				{
				this.state = 603;
				this.commaDelim();
				}
			}

			this.state = 606;
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
		this.enterRule(_localctx, 62, FppParser.RULE_transitionExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 609;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DO) {
				{
				this.state = 608;
				_localctx._do = this.doExpr();
				}
			}

			this.state = 611;
			this.match(FppParser.ENTER);
			this.state = 612;
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
		this.enterRule(_localctx, 64, FppParser.RULE_initialTransition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 614;
			this.match(FppParser.INITIAL);
			this.state = 615;
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
		this.enterRule(_localctx, 66, FppParser.RULE_transitionOrDoExpr);
		try {
			this.state = 619;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 617;
				this.transitionExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 618;
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
		this.enterRule(_localctx, 68, FppParser.RULE_stateTransition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 621;
			this.match(FppParser.ON);
			this.state = 622;
			_localctx._signal = this.match(FppParser.IDENTIFIER);
			this.state = 625;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IF) {
				{
				this.state = 623;
				this.match(FppParser.IF);
				this.state = 624;
				_localctx._guard = this.match(FppParser.IDENTIFIER);
				}
			}

			this.state = 627;
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
		this.enterRule(_localctx, 70, FppParser.RULE_stateEntry);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 629;
			this.match(FppParser.ENTRY);
			this.state = 630;
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
		this.enterRule(_localctx, 72, FppParser.RULE_stateExit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 632;
			this.match(FppParser.EXIT);
			this.state = 633;
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
		this.enterRule(_localctx, 74, FppParser.RULE_stateMemberTempl);
		try {
			this.state = 641;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 635;
				this.initialTransition();
				}
				break;
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 636;
				this.choiceDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 637;
				this.stateDef();
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 638;
				this.stateTransition();
				}
				break;
			case FppParser.ENTRY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 639;
				this.stateEntry();
				}
				break;
			case FppParser.EXIT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 640;
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
		this.enterRule(_localctx, 76, FppParser.RULE_stateMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 644;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 643;
				this.preAnnotation();
				}
			}

			this.state = 646;
			this.stateMemberTempl();
			this.state = 648;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				{
				this.state = 647;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 651;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 650;
				this.postAnnotation();
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
		this.enterRule(_localctx, 78, FppParser.RULE_stateDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 653;
			this.match(FppParser.STATE);
			this.state = 654;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 677;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 655;
				this.match(FppParser.T__5);
				this.state = 659;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 70, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 656;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 661;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 70, this._ctx);
				}
				this.state = 667;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || ((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (FppParser.CHOICE - 48)) | (1 << (FppParser.ENTRY - 48)) | (1 << (FppParser.EXIT - 48)) | (1 << (FppParser.INITIAL - 48)))) !== 0) || _la === FppParser.ON || _la === FppParser.STATE) {
					{
					{
					this.state = 662;
					this.stateMember();
					this.state = 663;
					this.semiDelim();
					}
					}
					this.state = 669;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 673;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 670;
					this.match(FppParser.NL);
					}
					}
					this.state = 675;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 676;
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
		this.enterRule(_localctx, 80, FppParser.RULE_stateMachineMemberTempl);
		try {
			this.state = 685;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 679;
				this.choiceDef();
				}
				break;
			case FppParser.GUARD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 680;
				this.guardDef();
				}
				break;
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 681;
				this.initialTransition();
				}
				break;
			case FppParser.SIGNAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 682;
				this.signalDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 683;
				this.stateDef();
				}
				break;
			case FppParser.ACTION:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 684;
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
		this.enterRule(_localctx, 82, FppParser.RULE_stateMachineMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 688;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 687;
				this.preAnnotation();
				}
			}

			this.state = 690;
			this.stateMachineMemberTempl();
			this.state = 692;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 76, this._ctx) ) {
			case 1:
				{
				this.state = 691;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 695;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 694;
				this.postAnnotation();
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
		this.enterRule(_localctx, 84, FppParser.RULE_stateMachineDef);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this.match(FppParser.STATE);
			this.state = 698;
			this.match(FppParser.MACHINE);
			this.state = 699;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 722;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 700;
				this.match(FppParser.T__5);
				this.state = 704;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 78, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 701;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 706;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 78, this._ctx);
				}
				this.state = 712;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ACTION - 21)) | (1 << (FppParser.CHOICE - 21)))) !== 0) || _la === FppParser.GUARD || _la === FppParser.INITIAL || _la === FppParser.SIGNAL || _la === FppParser.STATE) {
					{
					{
					this.state = 707;
					this.stateMachineMember();
					this.state = 708;
					this.semiDelim();
					}
					}
					this.state = 714;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 718;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 715;
					this.match(FppParser.NL);
					}
					}
					this.state = 720;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 721;
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
		this.enterRule(_localctx, 86, FppParser.RULE_stateMachineInstance);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 724;
			this.match(FppParser.STATE);
			this.state = 725;
			this.match(FppParser.MACHINE);
			this.state = 726;
			this.match(FppParser.INSTANCE);
			this.state = 727;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 728;
			this.match(FppParser.T__3);
			this.state = 729;
			_localctx._stateMachine = this.qualIdent();
			this.state = 732;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 730;
				this.match(FppParser.PRIORITY);
				this.state = 731;
				_localctx._priority = this.expr();
				}
			}

			this.state = 735;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 734;
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
		this.enterRule(_localctx, 88, FppParser.RULE_enumMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 737;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 740;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__0) {
				{
				this.state = 738;
				this.match(FppParser.T__0);
				this.state = 739;
				_localctx._value = this.expr();
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
		this.enterRule(_localctx, 90, FppParser.RULE_enumMemberN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 743;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 742;
				this.preAnnotation();
				}
			}

			this.state = 745;
			this.enumMember();
			this.state = 756;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				{
				this.state = 747;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 746;
					this.match(FppParser.T__4);
					}
				}

				this.state = 753;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 88, this._ctx) ) {
				case 1:
					{
					this.state = 750;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === FppParser.NL) {
						{
						this.state = 749;
						this.match(FppParser.NL);
						}
					}

					this.state = 752;
					this.postAnnotation();
					}
					break;
				}
				}
				break;

			case 2:
				{
				this.state = 755;
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
		this.enterRule(_localctx, 92, FppParser.RULE_enumMemberL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 758;
				this.preAnnotation();
				}
			}

			this.state = 761;
			this.enumMember();
			this.state = 772;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 94, this._ctx) ) {
			case 1:
				{
				this.state = 763;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 762;
					this.match(FppParser.T__4);
					}
				}

				this.state = 769;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 93, this._ctx) ) {
				case 1:
					{
					this.state = 766;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === FppParser.NL) {
						{
						this.state = 765;
						this.match(FppParser.NL);
						}
					}

					this.state = 768;
					this.postAnnotation();
					}
					break;
				}
				}
				break;

			case 2:
				{
				this.state = 771;
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
		this.enterRule(_localctx, 94, FppParser.RULE_enumDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 774;
			this.match(FppParser.ENUM);
			this.state = 775;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 778;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 776;
				this.match(FppParser.T__3);
				this.state = 777;
				_localctx._type = this.intType();
				}
			}

			this.state = 780;
			this.match(FppParser.T__5);
			this.state = 784;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 96, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 781;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 786;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 96, this._ctx);
			}
			this.state = 794;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 790;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 97, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 787;
						this.enumMemberN();
						}
						}
					}
					this.state = 792;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 97, this._ctx);
				}
				this.state = 793;
				this.enumMemberL();
				}
			}

			this.state = 799;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 796;
				this.match(FppParser.NL);
				}
				}
				this.state = 801;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 802;
			this.match(FppParser.T__6);
			this.state = 805;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 803;
				this.match(FppParser.DEFAULT);
				this.state = 804;
				_localctx._default_ = this.expr();
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
		this.enterRule(_localctx, 96, FppParser.RULE_eventSeverity);
		try {
			this.state = 818;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 101, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 807;
				this.match(FppParser.ACTIVITY);
				this.state = 808;
				this.match(FppParser.HIGH);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 809;
				this.match(FppParser.ACTIVITY);
				this.state = 810;
				this.match(FppParser.LOW);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 811;
				this.match(FppParser.COMMAND);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 812;
				this.match(FppParser.DIAGNOSTIC);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 813;
				this.match(FppParser.FATAL);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 814;
				this.match(FppParser.WARNING);
				this.state = 815;
				this.match(FppParser.HIGH);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 816;
				this.match(FppParser.WARNING);
				this.state = 817;
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
		this.enterRule(_localctx, 98, FppParser.RULE_eventDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 820;
			this.match(FppParser.EVENT);
			this.state = 821;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 823;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 822;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 825;
			this.match(FppParser.SEVERITY);
			this.state = 826;
			this.eventSeverity();
			this.state = 829;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 827;
				this.match(FppParser.ID);
				this.state = 828;
				_localctx._id = this.expr();
				}
			}

			this.state = 831;
			this.match(FppParser.FORMAT);
			this.state = 832;
			_localctx._format = this.match(FppParser.LIT_STRING);
			this.state = 835;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.THROTTLE) {
				{
				this.state = 833;
				this.match(FppParser.THROTTLE);
				this.state = 834;
				_localctx._throttle = this.expr();
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
		this.enterRule(_localctx, 100, FppParser.RULE_includeStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 837;
			this.match(FppParser.INCLUDE);
			this.state = 838;
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
		this.enterRule(_localctx, 102, FppParser.RULE_matchStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 840;
			this.match(FppParser.MATCH);
			this.state = 841;
			_localctx._match = this.match(FppParser.IDENTIFIER);
			this.state = 842;
			this.match(FppParser.WITH);
			this.state = 843;
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
		this.enterRule(_localctx, 104, FppParser.RULE_internalPortDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 845;
			this.match(FppParser.INTERNAL);
			this.state = 846;
			this.match(FppParser.PORT);
			this.state = 847;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 849;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 848;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 853;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 851;
				this.match(FppParser.PRIORITY);
				this.state = 852;
				_localctx._priority = this.expr();
				}
			}

			this.state = 856;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 855;
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
		this.enterRule(_localctx, 106, FppParser.RULE_recordSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 858;
			this.match(FppParser.PRODUCT);
			this.state = 859;
			this.match(FppParser.RECORD);
			this.state = 860;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 861;
			this.match(FppParser.T__3);
			this.state = 862;
			_localctx._fppType = this.typeName();
			this.state = 864;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ARRAY) {
				{
				this.state = 863;
				this.match(FppParser.ARRAY);
				}
			}

			this.state = 868;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 866;
				this.match(FppParser.ID);
				this.state = 867;
				_localctx._id = this.expr();
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
		this.enterRule(_localctx, 108, FppParser.RULE_containerSpecifierDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 870;
			this.match(FppParser.PRODUCT);
			this.state = 871;
			this.match(FppParser.CONTAINER);
			this.state = 872;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 875;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 873;
				this.match(FppParser.ID);
				this.state = 874;
				_localctx._id = this.expr();
				}
			}

			this.state = 880;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 877;
				this.match(FppParser.DEFAULT);
				this.state = 878;
				this.match(FppParser.PRIORITY);
				this.state = 879;
				_localctx._priority = this.expr();
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
		this.enterRule(_localctx, 110, FppParser.RULE_initSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 883;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 882;
				this.preAnnotation();
				}
			}

			this.state = 885;
			this.match(FppParser.PHASE);
			this.state = 886;
			_localctx._phaseExpr = this.expr();
			this.state = 887;
			_localctx._code = this.match(FppParser.LIT_STRING);
			this.state = 889;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 113, this._ctx) ) {
			case 1:
				{
				this.state = 888;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 892;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 891;
				this.postAnnotation();
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
	public componentInstanceDecl(): ComponentInstanceDeclContext {
		let _localctx: ComponentInstanceDeclContext = new ComponentInstanceDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, FppParser.RULE_componentInstanceDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 894;
			this.match(FppParser.INSTANCE);
			this.state = 895;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 896;
			this.match(FppParser.T__3);
			this.state = 897;
			_localctx._fppType = this.qualIdent();
			this.state = 898;
			this.match(FppParser.BASE);
			this.state = 899;
			this.match(FppParser.ID);
			this.state = 900;
			_localctx._base_id = this.expr();
			this.state = 903;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.TYPE) {
				{
				this.state = 901;
				this.match(FppParser.TYPE);
				this.state = 902;
				_localctx._cppType = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 907;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.AT) {
				{
				this.state = 905;
				this.match(FppParser.AT);
				this.state = 906;
				_localctx._at = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 912;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.QUEUE) {
				{
				this.state = 909;
				this.match(FppParser.QUEUE);
				this.state = 910;
				this.match(FppParser.SIZE);
				this.state = 911;
				_localctx._queueSize = this.expr();
				}
			}

			this.state = 917;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.STACK) {
				{
				this.state = 914;
				this.match(FppParser.STACK);
				this.state = 915;
				this.match(FppParser.SIZE);
				this.state = 916;
				_localctx._stackSize = this.expr();
				}
			}

			this.state = 921;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 919;
				this.match(FppParser.PRIORITY);
				this.state = 920;
				_localctx._priority = this.expr();
				}
			}

			this.state = 925;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.CPU) {
				{
				this.state = 923;
				this.match(FppParser.CPU);
				this.state = 924;
				_localctx._cpu = this.expr();
				}
			}

			this.state = 949;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 927;
				this.match(FppParser.T__5);
				this.state = 931;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 928;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 933;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
				}
				this.state = 939;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.PHASE) {
					{
					{
					this.state = 934;
					this.initSpecifier();
					this.state = 935;
					this.semiDelim();
					}
					}
					this.state = 941;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 945;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 942;
					this.match(FppParser.NL);
					}
					}
					this.state = 947;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 948;
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
		this.enterRule(_localctx, 114, FppParser.RULE_componentKind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 951;
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
		this.enterRule(_localctx, 116, FppParser.RULE_componentMemberTempl);
		try {
			this.state = 973;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 125, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 953;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 954;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 955;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 956;
				this.constantDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 957;
				this.structDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 958;
				this.commandDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 959;
				this.importInterfaceStmt();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 960;
				this.paramDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 961;
				this.generalPortInstanceDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 962;
				this.specialPortInstanceDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 963;
				this.telemetryChannelDecl();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 964;
				this.enumDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 965;
				this.eventDecl();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 966;
				this.includeStmt();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 967;
				this.internalPortDecl();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 968;
				this.matchStmt();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 969;
				this.recordSpecifierDecl();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 970;
				this.containerSpecifierDecl();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 971;
				this.stateMachineInstance();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 972;
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
		this.enterRule(_localctx, 118, FppParser.RULE_componentMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 976;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 975;
				this.preAnnotation();
				}
			}

			this.state = 978;
			this.componentMemberTempl();
			this.state = 980;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 127, this._ctx) ) {
			case 1:
				{
				this.state = 979;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 983;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 982;
				this.postAnnotation();
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
		this.enterRule(_localctx, 120, FppParser.RULE_componentDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 985;
			_localctx._kind = this.componentKind();
			this.state = 986;
			this.match(FppParser.COMPONENT);
			this.state = 987;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 988;
			this.match(FppParser.T__5);
			this.state = 992;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 129, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 989;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 994;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 129, this._ctx);
			}
			this.state = 1000;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (FppParser.ARRAY - 40)) | (1 << (FppParser.ASYNC - 40)) | (1 << (FppParser.COMMAND - 40)) | (1 << (FppParser.CONSTANT - 40)) | (1 << (FppParser.ENUM - 40)) | (1 << (FppParser.EVENT - 40)) | (1 << (FppParser.GUARDED - 40)))) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & ((1 << (FppParser.IMPORT - 77)) | (1 << (FppParser.INCLUDE - 77)) | (1 << (FppParser.INTERNAL - 77)) | (1 << (FppParser.MATCH - 77)) | (1 << (FppParser.OUTPUT - 77)) | (1 << (FppParser.PARAM - 77)) | (1 << (FppParser.PRODUCT - 77)))) !== 0) || ((((_la - 120)) & ~0x1F) === 0 && ((1 << (_la - 120)) & ((1 << (FppParser.STATE - 120)) | (1 << (FppParser.STRUCT - 120)) | (1 << (FppParser.SYNC - 120)) | (1 << (FppParser.TELEMETRY - 120)) | (1 << (FppParser.TEXT - 120)) | (1 << (FppParser.TIME - 120)) | (1 << (FppParser.TYPE - 120)))) !== 0)) {
				{
				{
				this.state = 995;
				this.componentMember();
				this.state = 996;
				this.semiDelim();
				}
				}
				this.state = 1002;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1006;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1003;
				this.match(FppParser.NL);
				}
				}
				this.state = 1008;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1009;
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
		this.enterRule(_localctx, 122, FppParser.RULE_portDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1011;
			this.match(FppParser.PORT);
			this.state = 1012;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1014;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 1013;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 1018;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__7) {
				{
				this.state = 1016;
				this.match(FppParser.T__7);
				this.state = 1017;
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
		this.enterRule(_localctx, 124, FppParser.RULE_componentInstanceSpec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1021;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIVATE) {
				{
				this.state = 1020;
				this.match(FppParser.PRIVATE);
				}
			}

			this.state = 1023;
			this.match(FppParser.INSTANCE);
			this.state = 1024;
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
		this.enterRule(_localctx, 126, FppParser.RULE_connectionNode);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1026;
			_localctx._node = this.qualIdent();
			this.state = 1031;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 1027;
				this.match(FppParser.T__1);
				this.state = 1028;
				_localctx._index = this.expr();
				this.state = 1029;
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
		this.enterRule(_localctx, 128, FppParser.RULE_connection);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1034;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.UNMATCHED) {
				{
				this.state = 1033;
				this.match(FppParser.UNMATCHED);
				}
			}

			this.state = 1036;
			_localctx._source = this.connectionNode();
			this.state = 1037;
			this.match(FppParser.T__7);
			this.state = 1038;
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
		this.enterRule(_localctx, 130, FppParser.RULE_directGraphDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1040;
			this.match(FppParser.CONNECTIONS);
			this.state = 1041;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1042;
			this.match(FppParser.T__5);
			this.state = 1046;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 137, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1043;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1048;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 137, this._ctx);
			}
			this.state = 1054;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.UNMATCHED || _la === FppParser.IDENTIFIER) {
				{
				{
				this.state = 1049;
				this.connection();
				this.state = 1050;
				this.commaDelim();
				}
				}
				this.state = 1056;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1060;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1057;
				this.match(FppParser.NL);
				}
				}
				this.state = 1062;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1063;
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
		this.enterRule(_localctx, 132, FppParser.RULE_patternKind);
		try {
			this.state = 1073;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.COMMAND:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1065;
				this.match(FppParser.COMMAND);
				}
				break;
			case FppParser.EVENT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1066;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.TEXT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1067;
				this.match(FppParser.TEXT);
				this.state = 1068;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.HEALTH:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1069;
				this.match(FppParser.HEALTH);
				}
				break;
			case FppParser.PARAM:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1070;
				this.match(FppParser.PARAM);
				}
				break;
			case FppParser.TELEMETRY:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1071;
				this.match(FppParser.TELEMETRY);
				}
				break;
			case FppParser.TIME:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1072;
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
		this.enterRule(_localctx, 134, FppParser.RULE_patternGraphSources);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 1075;
			this.qualIdent();
			this.state = 1081;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 141, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1076;
					this.commaDelim();
					this.state = 1077;
					this.qualIdent();
					}
					}
				}
				this.state = 1083;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 141, this._ctx);
			}
			this.state = 1085;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 142, this._ctx) ) {
			case 1:
				{
				this.state = 1084;
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
		this.enterRule(_localctx, 136, FppParser.RULE_patternGraphStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1087;
			_localctx._kind = this.patternKind();
			this.state = 1088;
			this.match(FppParser.CONNECTIONS);
			this.state = 1089;
			this.match(FppParser.INSTANCE);
			this.state = 1090;
			_localctx._target = this.qualIdent();
			this.state = 1107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 1091;
				this.match(FppParser.T__5);
				this.state = 1095;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1092;
					this.match(FppParser.NL);
					}
					}
					this.state = 1097;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1098;
				this.patternGraphSources();
				this.state = 1102;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1099;
					this.match(FppParser.NL);
					}
					}
					this.state = 1104;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1105;
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
	public importTopologyStmt(): ImportTopologyStmtContext {
		let _localctx: ImportTopologyStmtContext = new ImportTopologyStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, FppParser.RULE_importTopologyStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1109;
			this.match(FppParser.IMPORT);
			this.state = 1110;
			_localctx._symbol = this.qualIdent();
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
	public importInterfaceStmt(): ImportInterfaceStmtContext {
		let _localctx: ImportInterfaceStmtContext = new ImportInterfaceStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, FppParser.RULE_importInterfaceStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1112;
			this.match(FppParser.IMPORT);
			this.state = 1113;
			_localctx._symbol = this.qualIdent();
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
	public telemetryChannelIdentifier(): TelemetryChannelIdentifierContext {
		let _localctx: TelemetryChannelIdentifierContext = new TelemetryChannelIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, FppParser.RULE_telemetryChannelIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1115;
				this.preAnnotation();
				}
			}

			this.state = 1118;
			this.qualIdent();
			this.state = 1120;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 147, this._ctx) ) {
			case 1:
				{
				this.state = 1119;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1122;
				this.postAnnotation();
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
	public telemetryPacketSpecifier(): TelemetryPacketSpecifierContext {
		let _localctx: TelemetryPacketSpecifierContext = new TelemetryPacketSpecifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, FppParser.RULE_telemetryPacketSpecifier);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1125;
			this.match(FppParser.PACKET);
			this.state = 1126;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			{
			this.state = 1127;
			this.match(FppParser.ID);
			this.state = 1128;
			_localctx._id = this.expr();
			}
			this.state = 1130;
			this.match(FppParser.GROUP);
			this.state = 1131;
			_localctx._group = this.expr();
			this.state = 1132;
			this.match(FppParser.T__5);
			this.state = 1136;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 149, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1133;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1138;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 149, this._ctx);
			}
			this.state = 1144;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				{
				this.state = 1139;
				_localctx._packets = this.telemetryChannelIdentifier();
				this.state = 1140;
				this.commaDelim();
				}
				}
				this.state = 1146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1150;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1147;
				this.match(FppParser.NL);
				}
				}
				this.state = 1152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1153;
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
	public telemetryPacketSetMemberTempl(): TelemetryPacketSetMemberTemplContext {
		let _localctx: TelemetryPacketSetMemberTemplContext = new TelemetryPacketSetMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, FppParser.RULE_telemetryPacketSetMemberTempl);
		try {
			this.state = 1157;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INCLUDE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1155;
				this.includeStmt();
				}
				break;
			case FppParser.PACKET:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1156;
				this.telemetryPacketSpecifier();
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
	public telemetryPacketSetMember(): TelemetryPacketSetMemberContext {
		let _localctx: TelemetryPacketSetMemberContext = new TelemetryPacketSetMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, FppParser.RULE_telemetryPacketSetMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1159;
				this.preAnnotation();
				}
			}

			this.state = 1162;
			this.telemetryPacketSetMemberTempl();
			this.state = 1164;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 154, this._ctx) ) {
			case 1:
				{
				this.state = 1163;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1166;
				this.postAnnotation();
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
	public telemetryPacketSetDecl(): TelemetryPacketSetDeclContext {
		let _localctx: TelemetryPacketSetDeclContext = new TelemetryPacketSetDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, FppParser.RULE_telemetryPacketSetDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1169;
			this.match(FppParser.TELEMETRY);
			this.state = 1170;
			this.match(FppParser.PACKETS);
			this.state = 1171;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 1172;
				this.match(FppParser.T__5);
				this.state = 1176;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1173;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1178;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 156, this._ctx);
				}
				this.state = 1184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.INCLUDE || _la === FppParser.PACKET) {
					{
					{
					this.state = 1179;
					this.telemetryPacketSetMember();
					this.state = 1180;
					this.semiDelim();
					}
					}
					this.state = 1186;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1190;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1187;
					this.match(FppParser.NL);
					}
					}
					this.state = 1192;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1193;
				this.match(FppParser.T__6);
				}
			}

			this.state = 1219;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.OMIT) {
				{
				this.state = 1196;
				this.match(FppParser.OMIT);
				this.state = 1197;
				this.match(FppParser.T__5);
				this.state = 1201;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 160, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1198;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1203;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 160, this._ctx);
				}
				this.state = 1209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
					{
					{
					this.state = 1204;
					_localctx._omit = this.telemetryChannelIdentifier();
					this.state = 1205;
					this.commaDelim();
					}
					}
					this.state = 1211;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1212;
					this.match(FppParser.NL);
					}
					}
					this.state = 1217;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1218;
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
	public topologyMemberTempl(): TopologyMemberTemplContext {
		let _localctx: TopologyMemberTemplContext = new TopologyMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, FppParser.RULE_topologyMemberTempl);
		try {
			this.state = 1227;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 164, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1221;
				this.componentInstanceSpec();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1222;
				this.directGraphDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1223;
				this.patternGraphStmt();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1224;
				this.importTopologyStmt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1225;
				this.telemetryPacketSetDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1226;
				this.includeStmt();
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
	public topologyMember(): TopologyMemberContext {
		let _localctx: TopologyMemberContext = new TopologyMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, FppParser.RULE_topologyMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1229;
				this.preAnnotation();
				}
			}

			this.state = 1232;
			this.topologyMemberTempl();
			this.state = 1234;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 166, this._ctx) ) {
			case 1:
				{
				this.state = 1233;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1236;
				this.postAnnotation();
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
		this.enterRule(_localctx, 156, FppParser.RULE_topologyDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1239;
			this.match(FppParser.TOPOLOGY);
			this.state = 1240;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1241;
			this.match(FppParser.T__5);
			this.state = 1245;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 168, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1242;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1247;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 168, this._ctx);
			}
			this.state = 1253;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONNECTIONS - 21)))) !== 0) || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (FppParser.EVENT - 63)) | (1 << (FppParser.HEALTH - 63)) | (1 << (FppParser.IMPORT - 63)) | (1 << (FppParser.INCLUDE - 63)) | (1 << (FppParser.INSTANCE - 63)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (FppParser.PARAM - 96)) | (1 << (FppParser.PRIVATE - 96)) | (1 << (FppParser.TELEMETRY - 96)) | (1 << (FppParser.TEXT - 96)) | (1 << (FppParser.TIME - 96)))) !== 0)) {
				{
				{
				this.state = 1248;
				this.topologyMember();
				this.state = 1249;
				this.semiDelim();
				}
				}
				this.state = 1255;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
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
			this.state = 1262;
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
	public interfaceMemberTempl(): InterfaceMemberTemplContext {
		let _localctx: InterfaceMemberTemplContext = new InterfaceMemberTemplContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, FppParser.RULE_interfaceMemberTempl);
		try {
			this.state = 1267;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 171, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1264;
				this.generalPortInstanceDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1265;
				this.specialPortInstanceDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1266;
				this.importInterfaceStmt();
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
	public interfaceMember(): InterfaceMemberContext {
		let _localctx: InterfaceMemberContext = new InterfaceMemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, FppParser.RULE_interfaceMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1270;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1269;
				this.preAnnotation();
				}
			}

			this.state = 1272;
			this.interfaceMemberTempl();
			this.state = 1274;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 173, this._ctx) ) {
			case 1:
				{
				this.state = 1273;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1276;
				this.postAnnotation();
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
	public interfaceDecl(): InterfaceDeclContext {
		let _localctx: InterfaceDeclContext = new InterfaceDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, FppParser.RULE_interfaceDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1279;
			this.match(FppParser.INTERFACE);
			this.state = 1280;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1281;
			this.match(FppParser.T__5);
			this.state = 1285;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1282;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1287;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
			}
			this.state = 1293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ASYNC - 21)) | (1 << (FppParser.COMMAND - 21)))) !== 0) || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (FppParser.EVENT - 63)) | (1 << (FppParser.GUARDED - 63)) | (1 << (FppParser.IMPORT - 63)) | (1 << (FppParser.OUTPUT - 63)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (FppParser.PARAM - 96)) | (1 << (FppParser.PRODUCT - 96)) | (1 << (FppParser.SYNC - 96)) | (1 << (FppParser.TELEMETRY - 96)) | (1 << (FppParser.TEXT - 96)) | (1 << (FppParser.TIME - 96)))) !== 0)) {
				{
				{
				this.state = 1288;
				this.interfaceMember();
				this.state = 1289;
				this.semiDelim();
				}
				}
				this.state = 1295;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1296;
				this.match(FppParser.NL);
				}
				}
				this.state = 1301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1302;
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
		this.enterRule(_localctx, 164, FppParser.RULE_locationKind);
		try {
			this.state = 1313;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INSTANCE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1304;
				this.match(FppParser.INSTANCE);
				}
				break;
			case FppParser.COMPONENT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1305;
				this.match(FppParser.COMPONENT);
				}
				break;
			case FppParser.CONSTANT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1306;
				this.match(FppParser.CONSTANT);
				}
				break;
			case FppParser.PORT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1307;
				this.match(FppParser.PORT);
				}
				break;
			case FppParser.TOPOLOGY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1308;
				this.match(FppParser.TOPOLOGY);
				}
				break;
			case FppParser.TYPE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1309;
				this.match(FppParser.TYPE);
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1310;
				this.match(FppParser.STATE);
				this.state = 1311;
				this.match(FppParser.MACHINE);
				}
				break;
			case FppParser.INTERFACE:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1312;
				this.match(FppParser.INTERFACE);
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
		this.enterRule(_localctx, 166, FppParser.RULE_locationStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1315;
			this.match(FppParser.LOCATE);
			this.state = 1316;
			_localctx._kind = this.locationKind();
			this.state = 1317;
			_localctx._name = this.qualIdent();
			this.state = 1318;
			this.match(FppParser.AT);
			this.state = 1319;
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
		this.enterRule(_localctx, 168, FppParser.RULE_moduleMemberTempl);
		try {
			this.state = 1336;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 179, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1321;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1322;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1323;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1324;
				this.componentDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1325;
				this.componentInstanceDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1326;
				this.constantDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1327;
				this.interfaceDecl();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1328;
				this.moduleDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1329;
				this.portDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1330;
				this.structDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1331;
				this.locationStmt();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1332;
				this.enumDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1333;
				this.includeStmt();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 1334;
				this.topologyDecl();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 1335;
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
		this.enterRule(_localctx, 170, FppParser.RULE_moduleMember);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1339;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1338;
				this.preAnnotation();
				}
			}

			this.state = 1341;
			this.moduleMemberTempl();
			this.state = 1343;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 181, this._ctx) ) {
			case 1:
				{
				this.state = 1342;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1345;
				this.postAnnotation();
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
		this.enterRule(_localctx, 172, FppParser.RULE_moduleDecl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1348;
			this.match(FppParser.MODULE);
			this.state = 1349;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1350;
			this.match(FppParser.T__5);
			this.state = 1354;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 183, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1351;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1356;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 183, this._ctx);
			}
			this.state = 1362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (FppParser.ACTIVE - 37)) | (1 << (FppParser.ARRAY - 37)) | (1 << (FppParser.CONSTANT - 37)) | (1 << (FppParser.ENUM - 37)))) !== 0) || ((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & ((1 << (FppParser.INCLUDE - 78)) | (1 << (FppParser.INSTANCE - 78)) | (1 << (FppParser.INTERFACE - 78)) | (1 << (FppParser.LOCATE - 78)) | (1 << (FppParser.MODULE - 78)) | (1 << (FppParser.PASSIVE - 78)) | (1 << (FppParser.PORT - 78)) | (1 << (FppParser.QUEUED - 78)))) !== 0) || ((((_la - 120)) & ~0x1F) === 0 && ((1 << (_la - 120)) & ((1 << (FppParser.STATE - 120)) | (1 << (FppParser.STRUCT - 120)) | (1 << (FppParser.TOPOLOGY - 120)) | (1 << (FppParser.TYPE - 120)))) !== 0)) {
				{
				{
				this.state = 1357;
				this.moduleMember();
				this.state = 1358;
				this.semiDelim();
				}
				}
				this.state = 1364;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1368;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1365;
				this.match(FppParser.NL);
				}
				}
				this.state = 1370;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1371;
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
		this.enterRule(_localctx, 174, FppParser.RULE_formalParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1374;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.REF) {
				{
				this.state = 1373;
				this.match(FppParser.REF);
				}
			}

			this.state = 1376;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1377;
			this.match(FppParser.T__3);
			this.state = 1378;
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
		this.enterRule(_localctx, 176, FppParser.RULE_formalParameterN);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1381;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1380;
				this.preAnnotation();
				}
			}

			this.state = 1383;
			this.formalParameter();
			this.state = 1389;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 189, this._ctx) ) {
			case 1:
				{
				this.state = 1385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1384;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1387;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1388;
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
		this.enterRule(_localctx, 178, FppParser.RULE_formalParamaterL);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1392;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1391;
				this.preAnnotation();
				}
			}

			this.state = 1394;
			this.formalParameter();
			this.state = 1400;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 192, this._ctx) ) {
			case 1:
				{
				this.state = 1396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1395;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1398;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1399;
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
		this.enterRule(_localctx, 180, FppParser.RULE_formalParameterList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1402;
			this.match(FppParser.T__8);
			this.state = 1406;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1403;
				this.match(FppParser.NL);
				}
				}
				this.state = 1408;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1416;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.REF || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1412;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 194, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1409;
						this.formalParameterN();
						}
						}
					}
					this.state = 1414;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 194, this._ctx);
				}
				this.state = 1415;
				this.formalParamaterL();
				}
			}

			this.state = 1418;
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
		this.enterRule(_localctx, 182, FppParser.RULE_qualIdent);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1420;
			this.match(FppParser.IDENTIFIER);
			this.state = 1425;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 196, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1421;
					this.match(FppParser.T__10);
					this.state = 1422;
					this.match(FppParser.IDENTIFIER);
					}
					}
				}
				this.state = 1427;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 196, this._ctx);
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
		this.enterRule(_localctx, 184, FppParser.RULE_intType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1428;
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
		this.enterRule(_localctx, 186, FppParser.RULE_primitiveType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1430;
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
		this.enterRule(_localctx, 188, FppParser.RULE_stringType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1432;
			this.match(FppParser.STRING);
			this.state = 1435;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SIZE) {
				{
				this.state = 1433;
				this.match(FppParser.SIZE);
				this.state = 1434;
				_localctx._size = this.expr();
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
		this.enterRule(_localctx, 190, FppParser.RULE_typeName);
		try {
			this.state = 1440;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1437;
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
				this.state = 1438;
				this.primitiveType();
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1439;
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
		this.enterRule(_localctx, 192, FppParser.RULE_commaDelim);
		try {
			let _alt: number;
			this.state = 1454;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__4:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1442;
				this.match(FppParser.T__4);
				this.state = 1446;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 199, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1443;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1448;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 199, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1450;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1449;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1452;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 200, this._ctx);
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
		this.enterRule(_localctx, 194, FppParser.RULE_semiDelim);
		try {
			let _alt: number;
			this.state = 1468;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__11:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1456;
				this.match(FppParser.T__11);
				this.state = 1460;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 202, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1457;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1462;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 202, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1464;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1463;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1466;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 203, this._ctx);
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
		this.enterRule(_localctx, 196, FppParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1470;
			this.match(FppParser.T__1);
			this.state = 1474;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1471;
				this.match(FppParser.NL);
				}
				}
				this.state = 1476;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1486;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << FppParser.T__8) | (1 << FppParser.T__12) | (1 << FppParser.LIT_BOOLEAN) | (1 << FppParser.LIT_STRING) | (1 << FppParser.LIT_FLOAT) | (1 << FppParser.LIT_INT))) !== 0) || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1477;
				this.scalarExpr(0);
				this.state = 1483;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					{
					this.state = 1478;
					this.commaDelim();
					this.state = 1479;
					this.scalarExpr(0);
					}
					}
					this.state = 1485;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1488;
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
		this.enterRule(_localctx, 198, FppParser.RULE_structAssignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1490;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1491;
			this.match(FppParser.T__0);
			this.state = 1492;
			_localctx._value = this.expr();
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
		this.enterRule(_localctx, 200, FppParser.RULE_structExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1494;
			this.match(FppParser.T__5);
			this.state = 1498;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1495;
				this.match(FppParser.NL);
				}
				}
				this.state = 1500;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1513;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 1501;
				this.structAssignment();
				this.state = 1507;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 209, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1502;
						this.commaDelim();
						this.state = 1503;
						this.structAssignment();
						}
						}
					}
					this.state = 1509;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 209, this._ctx);
				}
				this.state = 1511;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 1510;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 1515;
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

	public scalarExpr(): ScalarExprContext;
	public scalarExpr(_p: number): ScalarExprContext;
	// @RuleVersion(0)
	public scalarExpr(_p?: number): ScalarExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ScalarExprContext = new ScalarExprContext(this._ctx, _parentState);
		let _prevctx: ScalarExprContext = _localctx;
		let _startState: number = 202;
		this.enterRecursionRule(_localctx, 202, FppParser.RULE_scalarExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1529;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__12:
				{
				this.state = 1518;
				this.match(FppParser.T__12);
				this.state = 1519;
				_localctx._unary = this.scalarExpr(9);
				}
				break;
			case FppParser.IDENTIFIER:
				{
				this.state = 1520;
				this.qualIdent();
				}
				break;
			case FppParser.LIT_BOOLEAN:
				{
				this.state = 1521;
				this.match(FppParser.LIT_BOOLEAN);
				}
				break;
			case FppParser.LIT_FLOAT:
				{
				this.state = 1522;
				this.match(FppParser.LIT_FLOAT);
				}
				break;
			case FppParser.LIT_INT:
				{
				this.state = 1523;
				this.match(FppParser.LIT_INT);
				}
				break;
			case FppParser.LIT_STRING:
				{
				this.state = 1524;
				this.match(FppParser.LIT_STRING);
				}
				break;
			case FppParser.T__8:
				{
				this.state = 1525;
				this.match(FppParser.T__8);
				this.state = 1526;
				_localctx._p = this.scalarExpr(0);
				this.state = 1527;
				this.match(FppParser.T__9);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1539;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 214, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1537;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 213, this._ctx) ) {
					case 1:
						{
						_localctx = new ScalarExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_scalarExpr);
						this.state = 1531;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 1532;
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
						this.state = 1533;
						_localctx._right = this.scalarExpr(9);
						}
						break;

					case 2:
						{
						_localctx = new ScalarExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_scalarExpr);
						this.state = 1534;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1535;
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
						this.state = 1536;
						_localctx._right = this.scalarExpr(8);
						}
						break;
					}
					}
				}
				this.state = 1541;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 214, this._ctx);
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
	public expr(): ExprContext {
		let _localctx: ExprContext = new ExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, FppParser.RULE_expr);
		try {
			this.state = 1545;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1542;
				this.arrayExpr();
				}
				break;
			case FppParser.T__5:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1543;
				this.structExpr();
				}
				break;
			case FppParser.T__8:
			case FppParser.T__12:
			case FppParser.LIT_BOOLEAN:
			case FppParser.LIT_STRING:
			case FppParser.LIT_FLOAT:
			case FppParser.LIT_INT:
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1544;
				this.scalarExpr(0);
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
	public postAnnotation(): PostAnnotationContext {
		let _localctx: PostAnnotationContext = new PostAnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, FppParser.RULE_postAnnotation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1547;
			this.match(FppParser.ANNOTATION);
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
		this.enterRule(_localctx, 208, FppParser.RULE_postMultiAnnotation);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1550;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.NL) {
				{
				this.state = 1549;
				this.match(FppParser.NL);
				}
			}

			this.state = 1554;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 1552;
					this.match(FppParser.ANNOTATION);
					this.state = 1553;
					this.match(FppParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1556;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 217, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 1561;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1558;
				this.match(FppParser.NL);
				}
				}
				this.state = 1563;
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
		this.enterRule(_localctx, 210, FppParser.RULE_preAnnotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1566;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1564;
				this.match(FppParser.ANNOTATION);
				this.state = 1565;
				this.match(FppParser.NL);
				}
				}
				this.state = 1568;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FppParser.ANNOTATION);
			this.state = 1573;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1570;
				this.match(FppParser.NL);
				}
				}
				this.state = 1575;
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
		case 101:
			return this.scalarExpr_sempred(_localctx as ScalarExprContext, predIndex);
		}
		return true;
	}
	private scalarExpr_sempred(_localctx: ScalarExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);

		case 1:
			return this.precpred(this._ctx, 7);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x8A\u062B\x04" +
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
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x03\x02\x07\x02\xD8\n\x02\f\x02\x0E\x02\xDB\v\x02" +
		"\x03\x02\x03\x02\x03\x02\x05\x02\xE0\n\x02\x07\x02\xE2\n\x02\f\x02\x0E" +
		"\x02\xE5\v\x02\x03\x02\x07\x02\xE8\n\x02\f\x02\x0E\x02\xEB\v\x02\x03\x02" +
		"\x03\x02\x03\x03\x07\x03\xF0\n\x03\f\x03\x0E\x03\xF3\v\x03\x03\x03\x03" +
		"\x03\x03\x03\x05\x03\xF8\n\x03\x07\x03\xFA\n\x03\f\x03\x0E\x03\xFD\v\x03" +
		"\x03\x03\x07\x03\u0100\n\x03\f\x03\x0E\x03\u0103\v\x03\x03\x03\x03\x03" +
		"\x03\x04\x07\x04\u0108\n\x04\f\x04\x0E\x04\u010B\v\x04\x03\x04\x03\x04" +
		"\x03\x04\x05\x04\u0110\n\x04\x07\x04\u0112\n\x04\f\x04\x0E\x04\u0115\v" +
		"\x04\x03\x04\x07\x04\u0118\n\x04\f\x04\x0E\x04\u011B\v\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x07\x03\x07\x05\x07\u0129\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x05\b\u0134\n\b\x03\b\x03\b\x05\b\u0138\n\b\x03\t\x03\t" +
		"\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\u0145\n\n" +
		"\x03\n\x03\n\x03\n\x05\n\u014A\n\n\x03\v\x05\v\u014D\n\v\x03\v\x03\v\x05" +
		"\v\u0151\n\v\x03\v\x03\v\x05\v\u0155\n\v\x03\f\x05\f\u0158\n\f\x03\f\x03" +
		"\f\x05\f\u015C\n\f\x03\f\x03\f\x05\f\u0160\n\f\x03\r\x03\r\x03\r\x03\r" +
		"\x07\r\u0166\n\r\f\r\x0E\r\u0169\v\r\x03\r\x07\r\u016C\n\r\f\r\x0E\r\u016F" +
		"\v\r\x03\r\x05\r\u0172\n\r\x03\r\x03\r\x03\r\x05\r\u0177\n\r\x03\x0E\x03" +
		"\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u0181\n\x10" +
		"\x03\x10\x03\x10\x05\x10\u0185\n\x10\x03\x10\x03\x10\x05\x10\u0189\n\x10" +
		"\x03\x10\x05\x10\u018C\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x05\x11\u0194\n\x11\x03\x11\x03\x11\x05\x11\u0198\n\x11\x03\x11\x03" +
		"\x11\x03\x11\x05\x11\u019D\n\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01A2" +
		"\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12" +
		"\u01AB\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u01C2\n\x13\x03\x13\x03\x13" +
		"\x03\x13\x03\x13\x05\x13\u01C8\n\x13\x03\x14\x03\x14\x05\x14\u01CC\n\x14" +
		"\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15" +
		"\u01D6\n\x15\x03\x15\x03\x15\x03\x15\x05\x15\u01DB\n\x15\x03\x15\x05\x15" +
		"\u01DE\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u01E5\n\x16" +
		"\x03\x16\x05\x16\u01E8\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03" +
		"\x19\x03\x19\x07\x19\u01F1\n\x19\f\x19\x0E\x19\u01F4\v\x19\x03\x19\x03" +
		"\x19\x03\x19\x03\x19\x07\x19\u01FA\n\x19\f\x19\x0E\x19\u01FD\v\x19\x03" +
		"\x19\x05\x19\u0200\n\x19\x05\x19\u0202\n\x19\x03\x19\x03\x19\x03\x1A\x03" +
		"\x1A\x03\x1A\x05\x1A\u0209\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x05\x1B\u0211\n\x1B\x03\x1B\x03\x1B\x05\x1B\u0215\n\x1B\x03\x1B" +
		"\x03\x1B\x05\x1B\u0219\n\x1B\x03\x1B\x03\x1B\x05\x1B\u021D\n\x1B\x03\x1B" +
		"\x03\x1B\x05\x1B\u0221\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u0227" +
		"\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u022D\n\x1D\f\x1D\x0E\x1D" +
		"\u0230\v\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0238" +
		"\n\x1D\f\x1D\x0E\x1D\u023B\v\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x05\x1E\u0243\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0249" +
		"\n\x1F\x03 \x03 \x03 \x07 \u024E\n \f \x0E \u0251\v \x03 \x03 \x03 \x03" +
		" \x07 \u0257\n \f \x0E \u025A\v \x05 \u025C\n \x03 \x05 \u025F\n \x03" +
		" \x03 \x03!\x05!\u0264\n!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x03#\x03#\x05" +
		"#\u026E\n#\x03$\x03$\x03$\x03$\x05$\u0274\n$\x03$\x03$\x03%\x03%\x03%" +
		"\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03\'\x03\'\x03\'\x05\'\u0284\n\'\x03" +
		"(\x05(\u0287\n(\x03(\x03(\x05(\u028B\n(\x03(\x05(\u028E\n(\x03)\x03)\x03" +
		")\x03)\x07)\u0294\n)\f)\x0E)\u0297\v)\x03)\x03)\x03)\x07)\u029C\n)\f)" +
		"\x0E)\u029F\v)\x03)\x07)\u02A2\n)\f)\x0E)\u02A5\v)\x03)\x05)\u02A8\n)" +
		"\x03*\x03*\x03*\x03*\x03*\x03*\x05*\u02B0\n*\x03+\x05+\u02B3\n+\x03+\x03" +
		"+\x05+\u02B7\n+\x03+\x05+\u02BA\n+\x03,\x03,\x03,\x03,\x03,\x07,\u02C1" +
		"\n,\f,\x0E,\u02C4\v,\x03,\x03,\x03,\x07,\u02C9\n,\f,\x0E,\u02CC\v,\x03" +
		",\x07,\u02CF\n,\f,\x0E,\u02D2\v,\x03,\x05,\u02D5\n,\x03-\x03-\x03-\x03" +
		"-\x03-\x03-\x03-\x03-\x05-\u02DF\n-\x03-\x05-\u02E2\n-\x03.\x03.\x03." +
		"\x05.\u02E7\n.\x03/\x05/\u02EA\n/\x03/\x03/\x05/\u02EE\n/\x03/\x05/\u02F1" +
		"\n/\x03/\x05/\u02F4\n/\x03/\x05/\u02F7\n/\x030\x050\u02FA\n0\x030\x03" +
		"0\x050\u02FE\n0\x030\x050\u0301\n0\x030\x050\u0304\n0\x030\x050\u0307" +
		"\n0\x031\x031\x031\x031\x051\u030D\n1\x031\x031\x071\u0311\n1\f1\x0E1" +
		"\u0314\v1\x031\x071\u0317\n1\f1\x0E1\u031A\v1\x031\x051\u031D\n1\x031" +
		"\x071\u0320\n1\f1\x0E1\u0323\v1\x031\x031\x031\x051\u0328\n1\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u0335\n2\x033\x03" +
		"3\x033\x053\u033A\n3\x033\x033\x033\x033\x053\u0340\n3\x033\x033\x033" +
		"\x033\x053\u0346\n3\x034\x034\x034\x035\x035\x035\x035\x035\x036\x036" +
		"\x036\x036\x056\u0354\n6\x036\x036\x056\u0358\n6\x036\x056\u035B\n6\x03" +
		"7\x037\x037\x037\x037\x037\x057\u0363\n7\x037\x037\x057\u0367\n7\x038" +
		"\x038\x038\x038\x038\x058\u036E\n8\x038\x038\x038\x058\u0373\n8\x039\x05" +
		"9\u0376\n9\x039\x039\x039\x039\x059\u037C\n9\x039\x059\u037F\n9\x03:\x03" +
		":\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x05:\u038A\n:\x03:\x03:\x05:\u038E" +
		"\n:\x03:\x03:\x03:\x05:\u0393\n:\x03:\x03:\x03:\x05:\u0398\n:\x03:\x03" +
		":\x05:\u039C\n:\x03:\x03:\x05:\u03A0\n:\x03:\x03:\x07:\u03A4\n:\f:\x0E" +
		":\u03A7\v:\x03:\x03:\x03:\x07:\u03AC\n:\f:\x0E:\u03AF\v:\x03:\x07:\u03B2" +
		"\n:\f:\x0E:\u03B5\v:\x03:\x05:\u03B8\n:\x03;\x03;\x03<\x03<\x03<\x03<" +
		"\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03" +
		"<\x03<\x03<\x05<\u03D0\n<\x03=\x05=\u03D3\n=\x03=\x03=\x05=\u03D7\n=\x03" +
		"=\x05=\u03DA\n=\x03>\x03>\x03>\x03>\x03>\x07>\u03E1\n>\f>\x0E>\u03E4\v" +
		">\x03>\x03>\x03>\x07>\u03E9\n>\f>\x0E>\u03EC\v>\x03>\x07>\u03EF\n>\f>" +
		"\x0E>\u03F2\v>\x03>\x03>\x03?\x03?\x03?\x05?\u03F9\n?\x03?\x03?\x05?\u03FD" +
		"\n?\x03@\x05@\u0400\n@\x03@\x03@\x03@\x03A\x03A\x03A\x03A\x03A\x05A\u040A" +
		"\nA\x03B\x05B\u040D\nB\x03B\x03B\x03B\x03B\x03C\x03C\x03C\x03C\x07C\u0417" +
		"\nC\fC\x0EC\u041A\vC\x03C\x03C\x03C\x07C\u041F\nC\fC\x0EC\u0422\vC\x03" +
		"C\x07C\u0425\nC\fC\x0EC\u0428\vC\x03C\x03C\x03D\x03D\x03D\x03D\x03D\x03" +
		"D\x03D\x03D\x05D\u0434\nD\x03E\x03E\x03E\x03E\x07E\u043A\nE\fE\x0EE\u043D" +
		"\vE\x03E\x05E\u0440\nE\x03F\x03F\x03F\x03F\x03F\x03F\x07F\u0448\nF\fF" +
		"\x0EF\u044B\vF\x03F\x03F\x07F\u044F\nF\fF\x0EF\u0452\vF\x03F\x03F\x05" +
		"F\u0456\nF\x03G\x03G\x03G\x03H\x03H\x03H\x03I\x05I\u045F\nI\x03I\x03I" +
		"\x05I\u0463\nI\x03I\x05I\u0466\nI\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03" +
		"J\x03J\x07J\u0471\nJ\fJ\x0EJ\u0474\vJ\x03J\x03J\x03J\x07J\u0479\nJ\fJ" +
		"\x0EJ\u047C\vJ\x03J\x07J\u047F\nJ\fJ\x0EJ\u0482\vJ\x03J\x03J\x03K\x03" +
		"K\x05K\u0488\nK\x03L\x05L\u048B\nL\x03L\x03L\x05L\u048F\nL\x03L\x05L\u0492" +
		"\nL\x03M\x03M\x03M\x03M\x03M\x07M\u0499\nM\fM\x0EM\u049C\vM\x03M\x03M" +
		"\x03M\x07M\u04A1\nM\fM\x0EM\u04A4\vM\x03M\x07M\u04A7\nM\fM\x0EM\u04AA" +
		"\vM\x03M\x05M\u04AD\nM\x03M\x03M\x03M\x07M\u04B2\nM\fM\x0EM\u04B5\vM\x03" +
		"M\x03M\x03M\x07M\u04BA\nM\fM\x0EM\u04BD\vM\x03M\x07M\u04C0\nM\fM\x0EM" +
		"\u04C3\vM\x03M\x05M\u04C6\nM\x03N\x03N\x03N\x03N\x03N\x03N\x05N\u04CE" +
		"\nN\x03O\x05O\u04D1\nO\x03O\x03O\x05O\u04D5\nO\x03O\x05O\u04D8\nO\x03" +
		"P\x03P\x03P\x03P\x07P\u04DE\nP\fP\x0EP\u04E1\vP\x03P\x03P\x03P\x07P\u04E6" +
		"\nP\fP\x0EP\u04E9\vP\x03P\x07P\u04EC\nP\fP\x0EP\u04EF\vP\x03P\x03P\x03" +
		"Q\x03Q\x03Q\x05Q\u04F6\nQ\x03R\x05R\u04F9\nR\x03R\x03R\x05R\u04FD\nR\x03" +
		"R\x05R\u0500\nR\x03S\x03S\x03S\x03S\x07S\u0506\nS\fS\x0ES\u0509\vS\x03" +
		"S\x03S\x03S\x07S\u050E\nS\fS\x0ES\u0511\vS\x03S\x07S\u0514\nS\fS\x0ES" +
		"\u0517\vS\x03S\x03S\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x05T" +
		"\u0524\nT\x03U\x03U\x03U\x03U\x03U\x03U\x03V\x03V\x03V\x03V\x03V\x03V" +
		"\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x05V\u053B\nV\x03W\x05W" +
		"\u053E\nW\x03W\x03W\x05W\u0542\nW\x03W\x05W\u0545\nW\x03X\x03X\x03X\x03" +
		"X\x07X\u054B\nX\fX\x0EX\u054E\vX\x03X\x03X\x03X\x07X\u0553\nX\fX\x0EX" +
		"\u0556\vX\x03X\x07X\u0559\nX\fX\x0EX\u055C\vX\x03X\x03X\x03Y\x05Y\u0561" +
		"\nY\x03Y\x03Y\x03Y\x03Y\x03Z\x05Z\u0568\nZ\x03Z\x03Z\x05Z\u056C\nZ\x03" +
		"Z\x03Z\x05Z\u0570\nZ\x03[\x05[\u0573\n[\x03[\x03[\x05[\u0577\n[\x03[\x03" +
		"[\x05[\u057B\n[\x03\\\x03\\\x07\\\u057F\n\\\f\\\x0E\\\u0582\v\\\x03\\" +
		"\x07\\\u0585\n\\\f\\\x0E\\\u0588\v\\\x03\\\x05\\\u058B\n\\\x03\\\x03\\" +
		"\x03]\x03]\x03]\x07]\u0592\n]\f]\x0E]\u0595\v]\x03^\x03^\x03_\x03_\x03" +
		"`\x03`\x03`\x05`\u059E\n`\x03a\x03a\x03a\x05a\u05A3\na\x03b\x03b\x07b" +
		"\u05A7\nb\fb\x0Eb\u05AA\vb\x03b\x06b\u05AD\nb\rb\x0Eb\u05AE\x05b\u05B1" +
		"\nb\x03c\x03c\x07c\u05B5\nc\fc\x0Ec\u05B8\vc\x03c\x06c\u05BB\nc\rc\x0E" +
		"c\u05BC\x05c\u05BF\nc\x03d\x03d\x07d\u05C3\nd\fd\x0Ed\u05C6\vd\x03d\x03" +
		"d\x03d\x03d\x07d\u05CC\nd\fd\x0Ed\u05CF\vd\x05d\u05D1\nd\x03d\x03d\x03" +
		"e\x03e\x03e\x03e\x03f\x03f\x07f\u05DB\nf\ff\x0Ef\u05DE\vf\x03f\x03f\x03" +
		"f\x03f\x07f\u05E4\nf\ff\x0Ef\u05E7\vf\x03f\x05f\u05EA\nf\x05f\u05EC\n" +
		"f\x03f\x03f\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03" +
		"g\x05g\u05FC\ng\x03g\x03g\x03g\x03g\x03g\x03g\x07g\u0604\ng\fg\x0Eg\u0607" +
		"\vg\x03h\x03h\x03h\x05h\u060C\nh\x03i\x03i\x03j\x05j\u0611\nj\x03j\x03" +
		"j\x06j\u0615\nj\rj\x0Ej\u0616\x03j\x07j\u061A\nj\fj\x0Ej\u061D\vj\x03" +
		"k\x03k\x06k\u0621\nk\rk\x0Ek\u0622\x03k\x07k\u0626\nk\fk\x0Ek\u0629\v" +
		"k\x03k\x02\x02\x03\xCCl\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 " +
		"\x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02" +
		"X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02" +
		"t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02" +
		"\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02" +
		"\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02" +
		"\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02" +
		"\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02" +
		"\xD2\x02\xD4\x02\x02\n\x06\x02++//<<LL\x05\x02,,II}}\x05\x02^^mm\x89\x89" +
		"\x05\x02\'\'ccjj\x03\x02\x1E%\x04\x02\x1C%00\x03\x02\x10\x11\x04\x02\x0F" +
		"\x0F\x12\x12\x02\u06EF\x02\xD9\x03\x02\x02\x02\x04\xF1\x03\x02\x02\x02" +
		"\x06\u0109\x03\x02\x02\x02\b\u011E\x03\x02\x02\x02\n\u0121\x03\x02\x02" +
		"\x02\f\u0128\x03\x02\x02\x02\x0E\u012A\x03\x02\x02\x02\x10\u0139\x03\x02" +
		"\x02\x02\x12\u013E\x03\x02\x02\x02\x14\u014C\x03\x02\x02\x02\x16\u0157" +
		"\x03\x02\x02\x02\x18\u0161\x03\x02\x02\x02\x1A\u0178\x03\x02\x02\x02\x1C" +
		"\u017A\x03\x02\x02\x02\x1E\u017C\x03\x02\x02\x02 \u018D\x03\x02\x02\x02" +
		"\"\u01AA\x03\x02\x02\x02$\u01C7\x03\x02\x02\x02&\u01CB\x03\x02\x02\x02" +
		"(\u01CD\x03\x02\x02\x02*\u01DF\x03\x02\x02\x02,\u01E9\x03\x02\x02\x02" +
		".\u01EB\x03\x02\x02\x020\u01EE\x03\x02\x02\x022\u0208\x03\x02\x02\x02" +
		"4\u020A\x03\x02\x02\x026\u0222\x03\x02\x02\x028\u0228\x03\x02\x02\x02" +
		":\u023E\x03\x02\x02\x02<\u0244\x03\x02\x02\x02>\u024A\x03\x02\x02\x02" +
		"@\u0263\x03\x02\x02\x02B\u0268\x03\x02\x02\x02D\u026D\x03\x02\x02\x02" +
		"F\u026F\x03\x02\x02\x02H\u0277\x03\x02\x02\x02J\u027A\x03\x02\x02\x02" +
		"L\u0283\x03\x02\x02\x02N\u0286\x03\x02\x02\x02P\u028F\x03\x02\x02\x02" +
		"R\u02AF\x03\x02\x02\x02T\u02B2\x03\x02\x02\x02V\u02BB\x03\x02\x02\x02" +
		"X\u02D6\x03\x02\x02\x02Z\u02E3\x03\x02\x02\x02\\\u02E9\x03\x02\x02\x02" +
		"^\u02F9\x03\x02\x02\x02`\u0308\x03\x02\x02\x02b\u0334\x03\x02\x02\x02" +
		"d\u0336\x03\x02\x02\x02f\u0347\x03\x02\x02\x02h\u034A\x03\x02\x02\x02" +
		"j\u034F\x03\x02\x02\x02l\u035C\x03\x02\x02\x02n\u0368\x03\x02\x02\x02" +
		"p\u0375\x03\x02\x02\x02r\u0380\x03\x02\x02\x02t\u03B9\x03\x02\x02\x02" +
		"v\u03CF\x03\x02\x02\x02x\u03D2\x03\x02\x02\x02z\u03DB\x03\x02\x02\x02" +
		"|\u03F5\x03\x02\x02\x02~\u03FF\x03\x02\x02\x02\x80\u0404\x03\x02\x02\x02" +
		"\x82\u040C\x03\x02\x02\x02\x84\u0412\x03\x02\x02\x02\x86\u0433\x03\x02" +
		"\x02\x02\x88\u0435\x03\x02\x02\x02\x8A\u0441\x03\x02\x02\x02\x8C\u0457" +
		"\x03\x02\x02\x02\x8E\u045A\x03\x02\x02\x02\x90\u045E\x03\x02\x02\x02\x92" +
		"\u0467\x03\x02\x02\x02\x94\u0487\x03\x02\x02\x02\x96\u048A\x03\x02\x02" +
		"\x02\x98\u0493\x03\x02\x02\x02\x9A\u04CD\x03\x02\x02\x02\x9C\u04D0\x03" +
		"\x02\x02\x02\x9E\u04D9\x03\x02\x02\x02\xA0\u04F5\x03\x02\x02\x02\xA2\u04F8" +
		"\x03\x02\x02\x02\xA4\u0501\x03\x02\x02\x02\xA6\u0523\x03\x02\x02\x02\xA8" +
		"\u0525\x03\x02\x02\x02\xAA\u053A\x03\x02\x02\x02\xAC\u053D\x03\x02\x02" +
		"\x02\xAE\u0546\x03\x02\x02\x02\xB0\u0560\x03\x02\x02\x02\xB2\u0567\x03" +
		"\x02\x02\x02\xB4\u0572\x03\x02\x02\x02\xB6\u057C\x03\x02\x02\x02\xB8\u058E" +
		"\x03\x02\x02\x02\xBA\u0596\x03\x02\x02\x02\xBC\u0598\x03\x02\x02\x02\xBE" +
		"\u059A\x03\x02\x02\x02\xC0\u05A2\x03\x02\x02\x02\xC2\u05B0\x03\x02\x02" +
		"\x02\xC4\u05BE\x03\x02\x02\x02\xC6\u05C0\x03\x02\x02\x02\xC8\u05D4\x03" +
		"\x02\x02\x02\xCA\u05D8\x03\x02\x02\x02\xCC\u05FB\x03\x02\x02\x02\xCE\u060B" +
		"\x03\x02\x02\x02\xD0\u060D\x03\x02\x02\x02\xD2\u0610\x03\x02\x02\x02\xD4" +
		"\u0620\x03\x02\x02\x02\xD6\xD8\x07\x13\x02\x02\xD7\xD6\x03\x02\x02\x02" +
		"\xD8\xDB\x03\x02\x02\x02\xD9\xD7\x03\x02\x02\x02\xD9\xDA\x03\x02\x02\x02" +
		"\xDA\xE3\x03\x02\x02\x02\xDB\xD9\x03\x02\x02\x02\xDC\xDF\x05\xACW\x02" +
		"\xDD\xE0\x05\xC4c\x02\xDE\xE0\x07\x02\x02\x03\xDF\xDD\x03\x02\x02\x02" +
		"\xDF\xDE\x03\x02\x02\x02\xE0\xE2\x03\x02\x02\x02\xE1\xDC\x03\x02\x02\x02" +
		"\xE2\xE5\x03\x02\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02" +
		"\xE4\xE9\x03\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xE8\x07\x13\x02\x02" +
		"\xE7\xE6\x03\x02\x02\x02\xE8\xEB\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02" +
		"\xE9\xEA\x03\x02\x02\x02\xEA\xEC\x03\x02\x02\x02\xEB\xE9\x03\x02\x02\x02" +
		"\xEC\xED\x07\x02\x02\x03\xED\x03\x03\x02\x02\x02\xEE\xF0\x07\x13\x02\x02" +
		"\xEF\xEE\x03\x02\x02\x02\xF0\xF3\x03\x02\x02\x02\xF1\xEF\x03\x02\x02\x02" +
		"\xF1\xF2\x03\x02\x02\x02\xF2\xFB\x03\x02\x02\x02\xF3\xF1\x03\x02\x02\x02" +
		"\xF4\xF7\x05\x9CO\x02\xF5\xF8\x05\xC4c\x02\xF6\xF8\x07\x02\x02\x03\xF7" +
		"\xF5\x03\x02\x02\x02\xF7\xF6\x03\x02\x02\x02\xF8\xFA\x03\x02\x02\x02\xF9" +
		"\xF4\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFB" +
		"\xFC\x03\x02\x02\x02\xFC\u0101\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02" +
		"\xFE\u0100\x07\x13\x02\x02\xFF\xFE\x03\x02\x02\x02\u0100\u0103\x03\x02" +
		"\x02\x02\u0101\xFF\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u0102\u0104" +
		"\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0104\u0105\x07\x02\x02\x03" +
		"\u0105\x05\x03\x02\x02\x02\u0106\u0108\x07\x13\x02\x02\u0107\u0106\x03" +
		"\x02\x02\x02\u0108\u010B\x03\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u0109" +
		"\u010A\x03\x02\x02\x02\u010A\u0113\x03\x02\x02\x02\u010B\u0109\x03\x02" +
		"\x02\x02\u010C\u010F\x05x=\x02\u010D\u0110\x05\xC4c\x02\u010E\u0110\x07" +
		"\x02\x02\x03\u010F\u010D\x03\x02\x02\x02\u010F\u010E\x03\x02\x02\x02\u0110" +
		"\u0112\x03\x02\x02\x02\u0111\u010C\x03\x02\x02\x02\u0112\u0115\x03\x02" +
		"\x02\x02\u0113\u0111\x03\x02\x02\x02\u0113\u0114\x03\x02\x02\x02\u0114" +
		"\u0119\x03\x02\x02\x02\u0115\u0113\x03\x02\x02\x02\u0116\u0118\x07\x13" +
		"\x02\x02\u0117\u0116\x03\x02\x02\x02\u0118\u011B\x03\x02\x02\x02\u0119" +
		"\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A\u011C\x03\x02" +
		"\x02\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011D\x07\x02\x02\x03\u011D" +
		"\x07\x03\x02\x02\x02\u011E\u011F\x07\x84\x02\x02\u011F\u0120\x07\x8A\x02" +
		"\x02\u0120\t\x03\x02\x02\x02\u0121\u0122\x07\x84\x02\x02\u0122\u0123\x07" +
		"\x8A\x02\x02\u0123\u0124\x07\x03\x02\x02\u0124\u0125\x05\xC0a\x02\u0125" +
		"\v\x03\x02\x02\x02\u0126\u0129\x05\xC6d\x02\u0127\u0129\x05\xCCg\x02\u0128" +
		"\u0126\x03\x02\x02\x02\u0128\u0127\x03\x02\x02\x02\u0129\r\x03\x02\x02" +
		"\x02\u012A\u012B\x07*\x02\x02\u012B\u012C\x07\x8A\x02\x02\u012C\u012D" +
		"\x07\x03\x02\x02\u012D\u012E\x07\x04\x02\x02\u012E\u012F\x05\xCEh\x02" +
		"\u012F\u0130\x07\x05\x02\x02\u0130\u0133\x05\xC0a\x02\u0131\u0132\x07" +
		"9\x02\x02\u0132";
	private static readonly _serializedATNSegment1: string =
		"\u0134\x05\f\x07\x02\u0133\u0131\x03\x02\x02\x02\u0133\u0134\x03\x02\x02" +
		"\x02\u0134\u0137\x03\x02\x02\x02\u0135\u0136\x07E\x02\x02\u0136\u0138" +
		"\x07\x19\x02\x02\u0137\u0135\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02" +
		"\u0138\x0F\x03\x02\x02\x02\u0139\u013A\x076\x02\x02\u013A\u013B\x07\x8A" +
		"\x02\x02\u013B\u013C\x07\x03\x02\x02\u013C\u013D\x05\xCEh\x02\u013D\x11" +
		"\x03\x02\x02\x02\u013E\u013F\x07\x8A\x02\x02\u013F\u0144\x07\x06\x02\x02" +
		"\u0140\u0141\x07\x04\x02\x02\u0141\u0142\x05\xCEh\x02\u0142\u0143\x07" +
		"\x05\x02\x02\u0143\u0145\x03\x02\x02\x02\u0144\u0140\x03\x02\x02\x02\u0144" +
		"\u0145\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u0146\u0149\x05\xC0" +
		"a\x02\u0147\u0148\x07E\x02\x02\u0148\u014A\x07\x19\x02\x02\u0149\u0147" +
		"\x03\x02\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\x13\x03\x02\x02\x02" +
		"\u014B\u014D\x05\xD4k\x02\u014C\u014B\x03\x02\x02\x02\u014C\u014D\x03" +
		"\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0154\x05\x12\n\x02\u014F" +
		"\u0151\x07\x07\x02\x02\u0150\u014F\x03\x02\x02\x02\u0150\u0151\x03\x02" +
		"\x02\x02\u0151\u0152\x03\x02\x02\x02\u0152\u0155\x05\xD2j\x02\u0153\u0155" +
		"\x05\xC2b\x02\u0154\u0150\x03\x02\x02\x02\u0154\u0153\x03\x02\x02\x02" +
		"\u0155\x15\x03\x02\x02\x02\u0156\u0158\x05\xD4k\x02\u0157\u0156\x03\x02" +
		"\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159" +
		"\u015F\x05\x12\n\x02\u015A\u015C\x07\x07\x02\x02\u015B\u015A\x03\x02\x02" +
		"\x02\u015B\u015C\x03\x02\x02\x02\u015C\u015D\x03\x02\x02\x02\u015D\u0160" +
		"\x05\xD2j\x02\u015E\u0160\x05\xC2b\x02\u015F\u015B\x03\x02\x02\x02\u015F" +
		"\u015E\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160\x17\x03\x02\x02" +
		"\x02\u0161\u0162\x07|\x02\x02\u0162\u0163\x07\x8A\x02\x02\u0163\u0167" +
		"\x07\b\x02\x02\u0164\u0166\x07\x13\x02\x02\u0165\u0164\x03\x02\x02\x02" +
		"\u0166\u0169\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0167\u0168\x03" +
		"\x02\x02\x02\u0168\u0171\x03\x02\x02\x02\u0169\u0167\x03\x02\x02\x02\u016A" +
		"\u016C\x05\x14\v\x02\u016B\u016A\x03\x02\x02\x02\u016C\u016F\x03\x02\x02" +
		"\x02\u016D\u016B\x03\x02\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E\u0170" +
		"\x03\x02\x02\x02\u016F\u016D\x03\x02\x02\x02\u0170\u0172\x05\x16\f\x02" +
		"\u0171\u016D\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172\u0173\x03" +
		"\x02\x02\x02\u0173\u0176\x07\t\x02\x02\u0174\u0175\x079\x02\x02\u0175" +
		"\u0177\x05\xCAf\x02\u0176\u0174\x03\x02\x02\x02\u0176\u0177\x03\x02\x02" +
		"\x02\u0177\x19\x03\x02\x02\x02\u0178\u0179\t\x02\x02\x02\u0179\x1B\x03" +
		"\x02\x02\x02\u017A\u017B\t\x03\x02\x02\u017B\x1D\x03\x02\x02\x02\u017C" +
		"\u017D\x05\x1C\x0F\x02\u017D\u017E\x073\x02\x02\u017E\u0180\x07\x8A\x02" +
		"\x02\u017F\u0181\x05\xB6\\\x02\u0180\u017F\x03\x02\x02\x02\u0180\u0181" +
		"\x03\x02\x02\x02\u0181\u0184\x03\x02\x02\x02\u0182\u0183\x07]\x02\x02" +
		"\u0183\u0185\x05\xCEh\x02\u0184\u0182\x03\x02\x02\x02\u0184\u0185\x03" +
		"\x02\x02\x02\u0185\u0188\x03\x02\x02\x02\u0186\u0187\x07f\x02\x02\u0187" +
		"\u0189\x05\xCEh\x02\u0188\u0186\x03\x02\x02\x02\u0188\u0189\x03\x02\x02" +
		"\x02\u0189\u018B\x03\x02\x02\x02\u018A\u018C\x05\x1A\x0E\x02\u018B\u018A" +
		"\x03\x02\x02\x02\u018B\u018C\x03\x02\x02\x02\u018C\x1F\x03\x02\x02\x02" +
		"\u018D\u018E\x07b\x02\x02\u018E\u018F\x07\x8A\x02\x02\u018F\u0190\x07" +
		"\x06\x02\x02\u0190\u0193\x05\xC0a\x02\u0191\u0192\x079\x02\x02\u0192\u0194" +
		"\x05\xCEh\x02\u0193\u0191\x03\x02\x02\x02\u0193\u0194\x03\x02\x02\x02" +
		"\u0194\u0197\x03\x02\x02\x02\u0195\u0196\x07M\x02\x02\u0196\u0198\x05" +
		"\xCEh\x02\u0197\u0195\x03\x02\x02\x02\u0197\u0198\x03\x02\x02\x02\u0198" +
		"\u019C\x03\x02\x02\x02\u0199\u019A\x07u\x02\x02\u019A\u019B\x07]\x02\x02" +
		"\u019B\u019D\x05\xCEh\x02\u019C\u0199\x03\x02\x02\x02\u019C\u019D\x03" +
		"\x02\x02\x02\u019D\u01A1\x03\x02\x02\x02\u019E\u019F\x07r\x02\x02\u019F" +
		"\u01A0\x07]\x02\x02\u01A0\u01A2\x05\xCEh\x02\u01A1\u019E\x03\x02\x02\x02" +
		"\u01A1\u01A2\x03\x02\x02\x02\u01A2!\x03\x02\x02\x02\u01A3\u01A4\x07,\x02" +
		"\x02\u01A4\u01AB\x07R\x02\x02\u01A5\u01A6\x07I\x02\x02\u01A6\u01AB\x07" +
		"R\x02\x02\u01A7\u01A8\x07}\x02\x02\u01A8\u01AB\x07R\x02\x02\u01A9\u01AB" +
		"\x07_\x02\x02\u01AA\u01A3\x03\x02\x02\x02\u01AA\u01A5\x03\x02\x02\x02" +
		"\u01AA\u01A7\x03\x02\x02\x02\u01AA\u01A9\x03\x02\x02\x02\u01AB#\x03\x02" +
		"\x02\x02\u01AC\u01AD\x073\x02\x02\u01AD\u01C8\x07l\x02\x02\u01AE\u01AF" +
		"\x073\x02\x02\u01AF\u01C8\x07o\x02\x02\u01B0\u01B1\x073\x02\x02\u01B1" +
		"\u01C8\x07q\x02\x02\u01B2\u01C8\x07A\x02\x02\u01B3\u01B4\x07b\x02\x02" +
		"\u01B4\u01C8\x07F\x02\x02\u01B5\u01B6\x07b\x02\x02\u01B6\u01C8\x07u\x02" +
		"\x02\u01B7\u01C8\x07~\x02\x02\u01B8\u01B9\x07\x7F\x02\x02\u01B9\u01C8" +
		"\x07A\x02\x02\u01BA\u01BB\x07\x81\x02\x02\u01BB\u01C8\x07F\x02\x02\u01BC" +
		"\u01BD\x07h\x02\x02\u01BD\u01C8\x07F\x02\x02\u01BE\u01BF\x07h\x02\x02" +
		"\u01BF\u01C8\x07p\x02\x02\u01C0\u01C2\t\x03\x02\x02\u01C1\u01C0\x03\x02" +
		"\x02\x02\u01C1\u01C2\x03\x02\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C3" +
		"\u01C4\x07h\x02\x02\u01C4\u01C8\x07l\x02\x02\u01C5\u01C6\x07h\x02\x02" +
		"\u01C6\u01C8\x07s\x02\x02\u01C7\u01AC\x03\x02\x02\x02\u01C7\u01AE\x03" +
		"\x02\x02\x02\u01C7\u01B0\x03\x02\x02\x02\u01C7\u01B2\x03\x02\x02\x02\u01C7" +
		"\u01B3\x03\x02\x02\x02\u01C7\u01B5\x03\x02\x02\x02\u01C7\u01B7\x03\x02" +
		"\x02\x02\u01C7\u01B8\x03\x02\x02\x02\u01C7\u01BA\x03\x02\x02\x02\u01C7" +
		"\u01BC\x03\x02\x02\x02\u01C7\u01BE\x03\x02\x02\x02\u01C7\u01C1\x03\x02" +
		"\x02\x02\u01C7\u01C5\x03\x02\x02\x02\u01C8%\x03\x02\x02\x02\u01C9\u01CC" +
		"\x07t\x02\x02\u01CA\u01CC\x05\xB8]\x02\u01CB\u01C9\x03\x02\x02\x02\u01CB" +
		"\u01CA\x03\x02\x02\x02\u01CC\'\x03\x02\x02\x02\u01CD\u01CE\x05\"\x12\x02" +
		"\u01CE\u01CF\x07e\x02\x02\u01CF\u01D0\x07\x8A\x02\x02\u01D0\u01D5\x07" +
		"\x06\x02\x02\u01D1\u01D2\x07\x04\x02\x02\u01D2\u01D3\x05\xCEh\x02\u01D3" +
		"\u01D4\x07\x05\x02\x02\u01D4\u01D6\x03\x02\x02\x02\u01D5\u01D1\x03\x02" +
		"\x02\x02\u01D5\u01D6\x03\x02\x02\x02\u01D6\u01D7\x03\x02\x02\x02\u01D7" +
		"\u01DA\x05&\x14\x02\u01D8\u01D9\x07f\x02\x02\u01D9\u01DB\x05\xCEh\x02" +
		"\u01DA\u01D8\x03\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB\u01DD\x03" +
		"\x02\x02\x02\u01DC\u01DE\x05\x1A\x0E\x02\u01DD\u01DC\x03\x02\x02\x02\u01DD" +
		"\u01DE\x03\x02\x02\x02\u01DE)\x03\x02\x02\x02\u01DF\u01E0\x05$\x13\x02" +
		"\u01E0\u01E1\x07e\x02\x02\u01E1\u01E4\x07\x8A\x02\x02\u01E2\u01E3\x07" +
		"f\x02\x02\u01E3\u01E5\x05\xCEh\x02\u01E4\u01E2\x03\x02\x02\x02\u01E4\u01E5" +
		"\x03\x02\x02\x02\u01E5\u01E7\x03\x02\x02\x02\u01E6\u01E8\x05\x1A\x0E\x02" +
		"\u01E7\u01E6\x03\x02\x02\x02\u01E7\u01E8\x03\x02\x02\x02\u01E8+\x03\x02" +
		"\x02\x02\u01E9\u01EA\t\x04\x02\x02\u01EA-\x03\x02\x02\x02\u01EB\u01EC" +
		"\x05,\x17\x02\u01EC\u01ED\x05\xCEh\x02\u01ED/\x03\x02\x02\x02\u01EE\u01F2" +
		"\x07\b\x02\x02\u01EF\u01F1\x07\x13\x02\x02\u01F0\u01EF\x03\x02\x02\x02" +
		"\u01F1\u01F4\x03\x02\x02\x02\u01F2\u01F0\x03\x02\x02\x02\u01F2\u01F3\x03" +
		"\x02\x02\x02\u01F3\u0201\x03\x02\x02\x02\u01F4\u01F2\x03\x02\x02\x02\u01F5" +
		"\u01FB\x05.\x18\x02\u01F6\u01F7\x05\xC2b\x02\u01F7\u01F8\x05.\x18\x02" +
		"\u01F8\u01FA\x03\x02\x02\x02\u01F9\u01F6\x03\x02\x02\x02\u01FA\u01FD\x03" +
		"\x02\x02\x02\u01FB\u01F9\x03\x02\x02\x02\u01FB\u01FC\x03\x02\x02\x02\u01FC" +
		"\u01FF\x03\x02\x02\x02\u01FD\u01FB\x03\x02\x02\x02\u01FE\u0200\x05\xC2" +
		"b\x02\u01FF\u01FE\x03\x02\x02\x02\u01FF\u0200\x03\x02\x02\x02\u0200\u0202" +
		"\x03\x02\x02\x02\u0201\u01F5\x03\x02\x02\x02\u0201\u0202\x03\x02\x02\x02" +
		"\u0202\u0203\x03\x02\x02\x02\u0203\u0204\x07\t\x02\x02\u02041\x03\x02" +
		"\x02\x02\u0205\u0209\x07)\x02\x02\u0206\u0207\x07\\\x02\x02\u0207\u0209" +
		"\x071\x02\x02\u0208\u0205\x03\x02\x02\x02\u0208\u0206\x03\x02\x02\x02" +
		"\u02093\x03\x02\x02\x02\u020A\u020B\x07~\x02\x02\u020B\u020C\x07\x8A\x02" +
		"\x02\u020C\u020D\x07\x06\x02\x02\u020D\u0210\x05\xC0a\x02\u020E\u020F" +
		"\x07M\x02\x02\u020F\u0211\x05\xCEh\x02\u0210\u020E\x03\x02\x02\x02\u0210" +
		"\u0211\x03\x02\x02\x02\u0211\u0214\x03\x02\x02\x02\u0212\u0213\x07\x86" +
		"\x02\x02\u0213\u0215\x052\x1A\x02\u0214\u0212\x03\x02\x02\x02\u0214\u0215" +
		"\x03\x02\x02\x02\u0215\u0218\x03\x02\x02\x02\u0216\u0217\x07E\x02\x02" +
		"\u0217\u0219\x07\x19\x02\x02\u0218\u0216\x03\x02\x02\x02\u0218\u0219\x03" +
		"\x02\x02\x02\u0219\u021C\x03\x02\x02\x02\u021A\u021B\x07W\x02\x02\u021B" +
		"\u021D\x050\x19\x02\u021C\u021A\x03\x02\x02\x02\u021C\u021D\x03\x02\x02" +
		"\x02\u021D\u0220\x03\x02\x02\x02\u021E\u021F\x07K\x02\x02\u021F\u0221" +
		"\x050\x19\x02\u0220\u021E\x03\x02\x02\x02\u0220\u0221\x03\x02\x02\x02" +
		"\u02215\x03\x02\x02\x02\u0222\u0223\x07&\x02\x02\u0223\u0226\x07\x8A\x02" +
		"\x02\u0224\u0225\x07\x06\x02\x02\u0225\u0227\x05\xC0a\x02\u0226\u0224" +
		"\x03\x02\x02\x02\u0226\u0227\x03\x02\x02\x02\u02277\x03\x02\x02\x02\u0228" +
		"\u0229\x072\x02\x02\u0229\u022A\x07\x8A\x02\x02\u022A\u022E\x07\b\x02" +
		"\x02\u022B\u022D\x07\x13\x02\x02\u022C\u022B\x03\x02\x02\x02\u022D\u0230" +
		"\x03\x02\x02\x02\u022E\u022C\x03\x02\x02\x02\u022E\u022F\x03\x02\x02\x02" +
		"\u022F\u0231\x03\x02\x02\x02\u0230\u022E\x03\x02\x02\x02\u0231\u0232\x07" +
		"N\x02\x02\u0232\u0233\x07\x8A\x02\x02\u0233\u0234\x05@!\x02\u0234\u0235" +
		"\x07=\x02\x02\u0235\u0239\x05@!\x02\u0236\u0238\x07\x13\x02\x02\u0237" +
		"\u0236\x03\x02\x02\x02\u0238\u023B\x03\x02\x02\x02\u0239\u0237\x03\x02" +
		"\x02\x02\u0239\u023A\x03\x02\x02\x02\u023A\u023C\x03\x02\x02\x02\u023B" +
		"\u0239\x03\x02\x02\x02\u023C\u023D\x07\t\x02\x02\u023D9\x03\x02\x02\x02" +
		"\u023E\u023F\x07H\x02\x02\u023F\u0242\x07\x8A\x02\x02\u0240\u0241\x07" +
		"\x06\x02\x02\u0241\u0243\x05\xC0a\x02\u0242\u0240\x03\x02\x02\x02\u0242" +
		"\u0243\x03\x02\x02\x02\u0243;\x03\x02\x02\x02\u0244\u0245\x07w\x02\x02" +
		"\u0245\u0248\x07\x8A\x02\x02\u0246\u0247\x07\x06\x02\x02\u0247\u0249\x05" +
		"\xC0a\x02\u0248\u0246\x03\x02\x02\x02\u0248\u0249\x03\x02\x02\x02\u0249" +
		"=\x03\x02\x02\x02\u024A\u024B\x07;\x02\x02\u024B\u024F\x07\b\x02\x02\u024C" +
		"\u024E\x07\x13\x02\x02\u024D\u024C\x03\x02\x02\x02\u024E\u0251\x03\x02" +
		"\x02\x02\u024F\u024D\x03\x02\x02\x02\u024F\u0250\x03\x02\x02\x02\u0250" +
		"\u025B\x03\x02\x02\x02\u0251\u024F\x03\x02\x02\x02\u0252\u0258\x07\x8A" +
		"\x02\x02\u0253\u0254\x05\xC2b\x02\u0254\u0255\x07\x8A\x02\x02\u0255\u0257" +
		"\x03\x02\x02\x02\u0256\u0253\x03\x02\x02\x02\u0257\u025A\x03\x02\x02\x02" +
		"\u0258\u0256\x03\x02\x02\x02\u0258\u0259\x03\x02\x02\x02\u0259\u025C\x03" +
		"\x02\x02\x02\u025A\u0258\x03\x02\x02\x02\u025B\u0252\x03\x02\x02\x02\u025B" +
		"\u025C\x03\x02\x02\x02\u025C\u025E\x03\x02\x02\x02\u025D\u025F\x05\xC2" +
		"b\x02\u025E\u025D\x03\x02\x02\x02\u025E\u025F\x03\x02\x02\x02\u025F\u0260" +
		"\x03\x02\x02\x02\u0260\u0261\x07\t\x02\x02\u0261?\x03\x02\x02\x02\u0262" +
		"\u0264\x05> \x02\u0263\u0262\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02" +
		"\u0264\u0265\x03\x02\x02\x02\u0265\u0266\x07>\x02\x02\u0266\u0267\x05" +
		"\xB8]\x02\u0267A\x03\x02\x02\x02\u0268\u0269\x07Q\x02\x02\u0269\u026A" +
		"\x05@!\x02\u026AC\x03\x02\x02\x02\u026B\u026E\x05@!\x02\u026C\u026E\x05" +
		"> \x02\u026D\u026B\x03\x02\x02\x02\u026D\u026C\x03\x02\x02\x02\u026EE" +
		"\x03\x02\x02\x02\u026F\u0270\x07\\\x02\x02\u0270\u0273\x07\x8A\x02\x02" +
		"\u0271\u0272\x07N\x02\x02\u0272\u0274\x07\x8A\x02\x02\u0273\u0271\x03" +
		"\x02\x02\x02\u0273\u0274\x03\x02\x02\x02\u0274\u0275\x03\x02\x02\x02\u0275" +
		"\u0276\x05D#\x02\u0276G\x03\x02\x02\x02\u0277\u0278\x07?\x02\x02\u0278" +
		"\u0279\x05> \x02\u0279I\x03\x02\x02\x02\u027A\u027B\x07B\x02\x02\u027B" +
		"\u027C\x05> \x02\u027CK\x03\x02\x02\x02\u027D\u0284\x05B\"\x02\u027E\u0284" +
		"\x058\x1D\x02\u027F\u0284\x05P)\x02\u0280\u0284\x05F$\x02\u0281\u0284" +
		"\x05H%\x02\u0282\u0284\x05J&\x02\u0283\u027D\x03\x02\x02\x02\u0283\u027E" +
		"\x03\x02\x02\x02\u0283\u027F\x03\x02\x02\x02\u0283\u0280\x03\x02\x02\x02" +
		"\u0283\u0281\x03\x02\x02\x02\u0283\u0282\x03\x02\x02\x02\u0284M\x03\x02" +
		"\x02\x02\u0285\u0287\x05\xD4k\x02\u0286\u0285\x03\x02\x02\x02\u0286\u0287" +
		"\x03\x02\x02\x02\u0287\u0288\x03\x02\x02\x02\u0288\u028A\x05L\'\x02\u0289" +
		"\u028B\x07\x13\x02\x02\u028A\u0289\x03\x02\x02\x02\u028A\u028B\x03\x02" +
		"\x02\x02\u028B\u028D\x03\x02\x02\x02\u028C\u028E\x05\xD0i\x02\u028D\u028C" +
		"\x03\x02\x02\x02\u028D\u028E\x03\x02\x02\x02\u028EO\x03\x02\x02\x02\u028F" +
		"\u0290\x07z\x02\x02\u0290\u02A7\x07\x8A\x02\x02\u0291\u0295\x07\b\x02" +
		"\x02\u0292\u0294\x07\x13\x02\x02\u0293\u0292\x03\x02\x02\x02\u0294\u0297" +
		"\x03\x02\x02\x02\u0295\u0293\x03\x02\x02\x02\u0295\u0296\x03\x02\x02\x02" +
		"\u0296\u029D\x03\x02\x02\x02\u0297\u0295\x03\x02\x02\x02\u0298\u0299\x05" +
		"N(\x02\u0299\u029A\x05\xC4c\x02\u029A\u029C\x03\x02\x02\x02\u029B\u0298" +
		"\x03\x02\x02\x02\u029C\u029F\x03\x02\x02\x02\u029D\u029B\x03\x02\x02\x02" +
		"\u029D\u029E\x03\x02\x02\x02\u029E\u02A3\x03\x02\x02\x02\u029F\u029D\x03" +
		"\x02\x02\x02\u02A0\u02A2\x07\x13\x02\x02\u02A1\u02A0\x03\x02\x02\x02\u02A2" +
		"\u02A5\x03\x02\x02\x02\u02A3\u02A1\x03\x02\x02\x02\u02A3\u02A4\x03\x02" +
		"\x02\x02\u02A4\u02A6\x03\x02\x02\x02\u02A5\u02A3\x03\x02\x02\x02\u02A6" +
		"\u02A8\x07\t\x02\x02\u02A7\u0291\x03\x02\x02\x02\u02A7\u02A8\x03\x02\x02" +
		"\x02\u02A8Q\x03\x02\x02\x02\u02A9\u02B0\x058\x1D\x02\u02AA\u02B0\x05:" +
		"\x1E\x02\u02AB\u02B0\x05B\"\x02\u02AC\u02B0\x05<\x1F\x02\u02AD\u02B0\x05" +
		"P)\x02\u02AE\u02B0\x056\x1C\x02\u02AF\u02A9\x03\x02\x02\x02\u02AF\u02AA" +
		"\x03\x02\x02\x02\u02AF\u02AB\x03\x02\x02\x02\u02AF\u02AC\x03\x02\x02\x02" +
		"\u02AF\u02AD\x03\x02\x02\x02\u02AF\u02AE\x03\x02\x02\x02\u02B0S\x03\x02" +
		"\x02\x02\u02B1\u02B3\x05\xD4k\x02\u02B2\u02B1\x03\x02\x02\x02\u02B2\u02B3" +
		"\x03\x02\x02\x02\u02B3\u02B4\x03\x02\x02\x02\u02B4\u02B6\x05R*\x02\u02B5" +
		"\u02B7\x07\x13\x02\x02\u02B6\u02B5\x03\x02\x02\x02\u02B6\u02B7\x03\x02" +
		"\x02\x02\u02B7\u02B9\x03\x02\x02\x02\u02B8\u02BA\x05\xD0i\x02\u02B9\u02B8" +
		"\x03\x02\x02\x02\u02B9\u02BA\x03\x02\x02\x02\u02BAU\x03\x02\x02\x02\u02BB" +
		"\u02BC\x07z\x02\x02\u02BC\u02BD\x07X\x02\x02\u02BD\u02D4\x07\x8A\x02\x02" +
		"\u02BE\u02C2\x07\b\x02\x02\u02BF\u02C1\x07\x13\x02\x02\u02C0\u02BF\x03" +
		"\x02\x02\x02\u02C1\u02C4\x03\x02\x02\x02\u02C2\u02C0\x03\x02\x02\x02\u02C2" +
		"\u02C3\x03\x02\x02\x02\u02C3\u02CA\x03\x02\x02\x02\u02C4\u02C2\x03\x02" +
		"\x02\x02\u02C5\u02C6\x05T+\x02\u02C6\u02C7\x05\xC4c\x02\u02C7\u02C9\x03" +
		"\x02\x02\x02\u02C8\u02C5\x03\x02\x02\x02\u02C9\u02CC\x03\x02\x02\x02\u02CA" +
		"\u02C8\x03\x02\x02\x02\u02CA\u02CB\x03\x02\x02\x02\u02CB\u02D0\x03\x02" +
		"\x02\x02\u02CC\u02CA\x03\x02\x02\x02\u02CD\u02CF\x07\x13\x02\x02\u02CE" +
		"\u02CD\x03\x02\x02\x02\u02CF\u02D2\x03\x02\x02\x02\u02D0\u02CE\x03\x02" +
		"\x02\x02\u02D0\u02D1\x03\x02\x02\x02\u02D1\u02D3\x03\x02\x02\x02\u02D2" +
		"\u02D0\x03\x02\x02\x02\u02D3\u02D5\x07\t\x02\x02\u02D4\u02BE\x03\x02\x02" +
		"\x02\u02D4\u02D5\x03\x02\x02\x02\u02D5W\x03\x02\x02\x02\u02D6\u02D7\x07" +
		"z\x02\x02\u02D7\u02D8\x07X\x02\x02\u02D8\u02D9\x07S\x02\x02\u02D9\u02DA" +
		"\x07\x8A\x02\x02\u02DA\u02DB\x07\x06\x02\x02\u02DB\u02DE\x05\xB8]\x02" +
		"\u02DC\u02DD\x07f\x02\x02\u02DD\u02DF\x05\xCEh\x02\u02DE\u02DC\x03\x02" +
		"\x02\x02\u02DE\u02DF\x03\x02\x02\x02\u02DF\u02E1\x03\x02\x02\x02\u02E0" +
		"\u02E2\x05\x1A\x0E\x02\u02E1\u02E0\x03\x02\x02\x02\u02E1\u02E2\x03\x02" +
		"\x02\x02\u02E2Y\x03\x02\x02\x02\u02E3\u02E6\x07\x8A\x02\x02\u02E4\u02E5" +
		"\x07\x03\x02\x02\u02E5\u02E7\x05\xCEh\x02\u02E6\u02E4\x03\x02\x02\x02" +
		"\u02E6\u02E7\x03\x02\x02\x02\u02E7[\x03\x02\x02\x02\u02E8\u02EA\x05\xD4" +
		"k\x02\u02E9\u02E8\x03\x02\x02\x02\u02E9\u02EA\x03\x02\x02\x02\u02EA\u02EB" +
		"\x03\x02\x02\x02\u02EB\u02F6\x05Z.\x02\u02EC\u02EE\x07\x07\x02\x02\u02ED" +
		"\u02EC\x03\x02\x02\x02\u02ED\u02EE\x03\x02\x02\x02\u02EE\u02F3\x03\x02" +
		"\x02\x02\u02EF\u02F1\x07\x13\x02\x02\u02F0\u02EF\x03\x02\x02\x02\u02F0" +
		"\u02F1\x03\x02\x02\x02\u02F1\u02F2\x03\x02\x02\x02\u02F2\u02F4\x05\xD0" +
		"i\x02\u02F3\u02F0\x03\x02\x02\x02\u02F3\u02F4\x03\x02\x02\x02\u02F4\u02F7" +
		"\x03\x02\x02\x02\u02F5\u02F7\x05\xC2b\x02\u02F6\u02ED\x03\x02\x02\x02" +
		"\u02F6\u02F5\x03\x02\x02\x02\u02F7]\x03\x02\x02\x02\u02F8\u02FA\x05\xD4" +
		"k\x02\u02F9\u02F8\x03\x02\x02\x02\u02F9\u02FA\x03\x02\x02\x02\u02FA\u02FB" +
		"\x03\x02\x02\x02\u02FB\u0306\x05Z.\x02\u02FC\u02FE\x07\x07\x02\x02\u02FD" +
		"\u02FC\x03\x02\x02\x02\u02FD\u02FE\x03\x02\x02\x02\u02FE\u0303\x03\x02" +
		"\x02\x02\u02FF\u0301\x07\x13\x02\x02\u0300\u02FF\x03\x02\x02\x02\u0300" +
		"\u0301\x03\x02\x02\x02\u0301\u0302\x03\x02\x02\x02\u0302\u0304\x05\xD0" +
		"i\x02\u0303\u0300\x03\x02\x02\x02\u0303\u0304\x03\x02\x02\x02\u0304\u0307" +
		"\x03\x02\x02\x02\u0305\u0307\x05\xC2b\x02\u0306\u02FD\x03\x02\x02\x02" +
		"\u0306\u0305\x03\x02\x02\x02\u0307_\x03\x02\x02\x02\u0308\u0309\x07@\x02" +
		"\x02\u0309\u030C\x07\x8A\x02\x02\u030A\u030B\x07\x06\x02\x02\u030B\u030D" +
		"\x05\xBA^\x02\u030C\u030A\x03\x02\x02\x02\u030C\u030D\x03\x02\x02\x02" +
		"\u030D\u030E\x03\x02\x02\x02\u030E\u0312\x07\b\x02\x02\u030F\u0311\x07" +
		"\x13\x02\x02\u0310\u030F\x03\x02\x02\x02\u0311\u0314\x03\x02\x02\x02\u0312" +
		"\u0310\x03\x02\x02\x02\u0312\u0313\x03\x02\x02\x02\u0313\u031C\x03\x02" +
		"\x02\x02\u0314\u0312\x03\x02\x02\x02\u0315\u0317\x05\\/\x02\u0316\u0315" +
		"\x03\x02\x02\x02\u0317\u031A\x03\x02\x02\x02\u0318\u0316\x03\x02\x02\x02" +
		"\u0318\u0319\x03\x02\x02\x02\u0319\u031B\x03\x02\x02\x02\u031A\u0318\x03" +
		"\x02\x02\x02\u031B\u031D\x05^0\x02\u031C\u0318\x03\x02\x02\x02\u031C\u031D" +
		"\x03\x02\x02\x02\u031D\u0321\x03\x02\x02\x02\u031E\u0320\x07\x13\x02\x02" +
		"\u031F\u031E\x03\x02\x02\x02\u0320\u0323\x03\x02\x02\x02\u0321\u031F\x03" +
		"\x02\x02\x02\u0321\u0322\x03\x02\x02\x02\u0322\u0324\x03\x02\x02\x02\u0323" +
		"\u0321\x03\x02\x02\x02\u0324\u0327\x07\t\x02\x02\u0325\u0326\x079\x02" +
		"\x02\u0326\u0328\x05\xCEh\x02\u0327\u0325\x03\x02\x02\x02\u0327\u0328" +
		"\x03\x02\x02\x02\u0328a\x03\x02\x02\x02\u0329\u032A\x07(\x02\x02\u032A" +
		"\u0335\x07K\x02\x02\u032B\u032C\x07(\x02\x02\u032C\u0335\x07W\x02\x02" +
		"\u032D\u0335\x073\x02\x02\u032E\u0335\x07:\x02\x02\u032F\u0335\x07D\x02" +
		"\x02\u0330\u0331\x07\x87\x02\x02\u0331\u0335\x07K\x02\x02\u0332\u0333" +
		"\x07\x87\x02\x02\u0333\u0335\x07W\x02\x02\u0334\u0329\x03\x02\x02\x02" +
		"\u0334\u032B\x03\x02\x02\x02\u0334\u032D\x03\x02\x02\x02\u0334\u032E\x03" +
		"\x02\x02\x02\u0334\u032F\x03\x02\x02\x02\u0334\u0330\x03\x02\x02\x02\u0334" +
		"\u0332\x03\x02\x02\x02\u0335c\x03\x02\x02\x02\u0336\u0337\x07A\x02\x02" +
		"\u0337\u0339\x07\x8A\x02\x02\u0338\u033A\x05\xB6\\\x02\u0339\u0338\x03" +
		"\x02\x02\x02\u0339\u033A\x03\x02\x02\x02\u033A\u033B\x03\x02\x02\x02\u033B" +
		"\u033C\x07v\x02\x02\u033C\u033F\x05b2\x02\u033D\u033E\x07M\x02\x02\u033E" +
		"\u0340\x05\xCEh\x02\u033F\u033D\x03\x02\x02\x02\u033F\u0340\x03\x02\x02" +
		"\x02\u0340\u0341\x03\x02\x02\x02\u0341\u0342\x07E\x02\x02\u0342\u0345" +
		"\x07\x19\x02\x02\u0343\u0344\x07\x80\x02\x02\u0344\u0346\x05\xCEh\x02" +
		"\u0345\u0343\x03\x02\x02\x02\u0345\u0346\x03\x02\x02\x02\u0346e\x03\x02" +
		"\x02\x02\u0347\u0348\x07P\x02\x02\u0348\u0349\x07\x19\x02\x02\u0349g\x03" +
		"\x02\x02\x02\u034A\u034B\x07Y\x02\x02\u034B\u034C\x07\x8A\x02\x02\u034C" +
		"\u034D\x07\x88\x02\x02\u034D\u034E\x07\x8A\x02\x02\u034Ei\x03\x02\x02" +
		"\x02\u034F\u0350\x07U\x02\x02\u0350\u0351\x07e\x02\x02\u0351\u0353\x07" +
		"\x8A\x02\x02\u0352\u0354\x05\xB6\\\x02\u0353\u0352\x03\x02\x02\x02\u0353" +
		"\u0354\x03\x02\x02\x02\u0354\u0357\x03\x02\x02\x02\u0355\u0356\x07f\x02" +
		"\x02\u0356\u0358\x05\xCEh\x02\u0357\u0355\x03\x02\x02\x02\u0357\u0358" +
		"\x03\x02\x02\x02\u0358\u035A\x03\x02\x02\x02\u0359\u035B\x05\x1A\x0E\x02" +
		"\u035A\u0359\x03\x02\x02\x02\u035A\u035B\x03\x02\x02\x02\u035Bk\x03\x02" +
		"\x02\x02\u035C\u035D\x07h\x02\x02\u035D\u035E\x07k\x02\x02\u035E\u035F" +
		"\x07\x8A\x02\x02\u035F\u0360\x07\x06\x02\x02\u0360\u0362\x05\xC0a\x02" +
		"\u0361\u0363\x07*\x02\x02\u0362\u0361\x03\x02\x02\x02\u0362\u0363\x03" +
		"\x02\x02\x02\u0363\u0366\x03\x02\x02\x02\u0364\u0365\x07M\x02\x02\u0365" +
		"\u0367\x05\xCEh\x02\u0366\u0364\x03\x02\x02\x02\u0366\u0367\x03\x02\x02" +
		"\x02\u0367m\x03\x02\x02\x02\u0368\u0369\x07h\x02\x02\u0369\u036A\x077" +
		"\x02\x02\u036A\u036D\x07\x8A\x02\x02\u036B\u036C\x07M\x02\x02\u036C\u036E" +
		"\x05\xCEh\x02\u036D\u036B\x03\x02\x02\x02\u036D\u036E\x03\x02\x02\x02" +
		"\u036E\u0372\x03\x02\x02\x02\u036F\u0370\x079\x02\x02\u0370\u0371\x07" +
		"f\x02\x02\u0371\u0373\x05\xCEh\x02\u0372\u036F\x03\x02\x02\x02\u0372\u0373" +
		"\x03\x02\x02\x02\u0373o\x03\x02\x02\x02\u0374\u0376\x05\xD4k\x02\u0375" +
		"\u0374\x03\x02\x02\x02\u0375\u0376\x03\x02\x02\x02\u0376\u0377\x03\x02" +
		"\x02\x02\u0377\u0378\x07d\x02\x02\u0378\u0379\x05\xCEh\x02\u0379\u037B" +
		"\x07\x19\x02\x02\u037A\u037C\x07\x13\x02\x02\u037B\u037A\x03\x02\x02\x02" +
		"\u037B\u037C\x03\x02\x02\x02\u037C\u037E\x03\x02\x02\x02\u037D\u037F\x05" +
		"\xD0i\x02\u037E\u037D\x03\x02\x02\x02\u037E\u037F\x03\x02\x02\x02\u037F" +
		"q\x03\x02\x02\x02\u0380\u0381\x07S\x02\x02\u0381\u0382\x07\x8A\x02\x02" +
		"\u0382\u0383\x07\x06\x02\x02\u0383\u0384\x05\xB8]\x02\u0384\u0385\x07" +
		".\x02\x02\u0385\u0386\x07M\x02\x02\u0386\u0389\x05\xCEh\x02\u0387\u0388" +
		"\x07\x84\x02\x02\u0388\u038A\x07\x19\x02\x02\u0389\u0387\x03\x02\x02\x02" +
		"\u0389\u038A\x03\x02\x02\x02\u038A\u038D\x03\x02\x02\x02\u038B\u038C\x07" +
		"-\x02\x02\u038C\u038E\x07\x19\x02\x02\u038D\u038B\x03\x02\x02\x02\u038D" +
		"\u038E\x03\x02\x02\x02\u038E\u0392\x03\x02\x02\x02\u038F\u0390\x07i\x02" +
		"\x02\u0390\u0391\x07x\x02\x02\u0391\u0393\x05\xCEh\x02\u0392\u038F\x03" +
		"\x02\x02\x02\u0392\u0393\x03\x02\x02\x02\u0393\u0397\x03\x02\x02\x02\u0394" +
		"\u0395\x07y\x02\x02\u0395\u0396\x07x\x02\x02\u0396\u0398\x05\xCEh\x02" +
		"\u0397\u0394\x03\x02\x02\x02\u0397\u0398\x03\x02\x02\x02\u0398\u039B\x03" +
		"\x02\x02\x02\u0399\u039A\x07f\x02\x02\u039A\u039C\x05\xCEh\x02\u039B\u0399" +
		"\x03\x02\x02\x02\u039B\u039C\x03\x02\x02\x02\u039C\u039F\x03\x02\x02\x02" +
		"\u039D\u039E\x078\x02\x02\u039E\u03A0\x05\xCEh\x02\u039F\u039D\x03\x02" +
		"\x02\x02\u039F\u03A0\x03\x02\x02\x02\u03A0\u03B7\x03\x02\x02\x02\u03A1" +
		"\u03A5\x07\b\x02\x02\u03A2\u03A4\x07\x13\x02\x02\u03A3\u03A2\x03\x02\x02" +
		"\x02\u03A4\u03A7\x03\x02\x02\x02\u03A5\u03A3\x03\x02\x02\x02\u03A5\u03A6" +
		"\x03\x02\x02\x02\u03A6\u03AD\x03\x02\x02\x02\u03A7\u03A5\x03\x02\x02\x02" +
		"\u03A8\u03A9\x05p9\x02\u03A9\u03AA\x05\xC4c\x02\u03AA\u03AC\x03\x02\x02" +
		"\x02\u03AB\u03A8\x03\x02\x02\x02\u03AC\u03AF\x03\x02\x02\x02\u03AD\u03AB" +
		"\x03\x02\x02\x02\u03AD\u03AE\x03\x02\x02\x02\u03AE\u03B3\x03\x02\x02\x02" +
		"\u03AF\u03AD\x03\x02\x02\x02\u03B0\u03B2\x07\x13\x02\x02\u03B1\u03B0\x03" +
		"\x02\x02\x02\u03B2\u03B5\x03\x02\x02\x02\u03B3\u03B1\x03\x02\x02\x02\u03B3" +
		"\u03B4\x03\x02\x02\x02\u03B4\u03B6\x03\x02\x02\x02\u03B5\u03B3\x03\x02" +
		"\x02\x02\u03B6\u03B8\x07\t\x02\x02\u03B7\u03A1\x03\x02\x02\x02\u03B7\u03B8" +
		"\x03\x02\x02\x02\u03B8s\x03\x02\x02\x02\u03B9\u03BA\t\x05\x02\x02\u03BA" +
		"u\x03\x02\x02\x02\u03BB\u03D0\x05\b\x05\x02\u03BC\u03D0\x05\n\x06\x02" +
		"\u03BD\u03D0\x05\x0E\b\x02\u03BE\u03D0\x05\x10\t\x02\u03BF\u03D0\x05\x18" +
		"\r\x02\u03C0\u03D0\x05\x1E\x10\x02\u03C1\u03D0\x05\x8EH\x02\u03C2\u03D0" +
		"\x05 \x11\x02\u03C3\u03D0\x05(\x15\x02\u03C4\u03D0\x05*\x16\x02\u03C5" +
		"\u03D0\x054\x1B\x02\u03C6\u03D0\x05`1\x02\u03C7\u03D0\x05d3\x02\u03C8" +
		"\u03D0\x05f4\x02\u03C9\u03D0\x05j6\x02\u03CA\u03D0\x05h5\x02\u03CB\u03D0" +
		"\x05l7\x02\u03CC\u03D0\x05n8\x02\u03CD\u03D0\x05X-\x02\u03CE\u03D0\x05" +
		"V,\x02\u03CF\u03BB\x03\x02\x02\x02\u03CF\u03BC\x03\x02\x02\x02\u03CF\u03BD" +
		"\x03\x02\x02\x02\u03CF\u03BE\x03\x02\x02\x02\u03CF\u03BF\x03\x02\x02\x02" +
		"\u03CF\u03C0\x03\x02\x02\x02\u03CF\u03C1\x03\x02\x02\x02\u03CF\u03C2\x03" +
		"\x02\x02\x02\u03CF\u03C3\x03\x02\x02\x02\u03CF\u03C4\x03\x02\x02\x02\u03CF" +
		"\u03C5\x03\x02\x02\x02\u03CF\u03C6\x03\x02\x02\x02\u03CF\u03C7\x03\x02" +
		"\x02\x02\u03CF\u03C8\x03\x02\x02\x02\u03CF\u03C9\x03\x02\x02\x02\u03CF" +
		"\u03CA\x03\x02\x02\x02\u03CF\u03CB\x03\x02\x02\x02\u03CF\u03CC\x03\x02" +
		"\x02\x02\u03CF\u03CD\x03\x02\x02\x02\u03CF\u03CE\x03\x02\x02\x02\u03D0" +
		"w\x03\x02\x02\x02\u03D1\u03D3\x05\xD4k\x02\u03D2\u03D1\x03\x02\x02\x02" +
		"\u03D2\u03D3\x03\x02\x02\x02\u03D3\u03D4\x03\x02\x02\x02\u03D4\u03D6\x05";
	private static readonly _serializedATNSegment2: string =
		"v<\x02\u03D5\u03D7\x07\x13\x02\x02\u03D6\u03D5\x03\x02\x02\x02\u03D6\u03D7" +
		"\x03\x02\x02\x02\u03D7\u03D9\x03\x02\x02\x02\u03D8\u03DA\x05\xD0i\x02" +
		"\u03D9\u03D8\x03\x02\x02\x02\u03D9\u03DA\x03\x02\x02\x02\u03DAy\x03\x02" +
		"\x02\x02\u03DB\u03DC\x05t;\x02\u03DC\u03DD\x074\x02\x02\u03DD\u03DE\x07" +
		"\x8A\x02\x02\u03DE\u03E2\x07\b\x02\x02\u03DF\u03E1\x07\x13\x02\x02\u03E0" +
		"\u03DF\x03\x02\x02\x02\u03E1\u03E4\x03\x02\x02\x02\u03E2\u03E0\x03\x02" +
		"\x02\x02\u03E2\u03E3\x03\x02\x02\x02\u03E3\u03EA\x03\x02\x02\x02\u03E4" +
		"\u03E2\x03\x02\x02\x02\u03E5\u03E6\x05x=\x02\u03E6\u03E7\x05\xC4c\x02" +
		"\u03E7\u03E9\x03\x02\x02\x02\u03E8\u03E5\x03\x02\x02\x02\u03E9\u03EC\x03" +
		"\x02\x02\x02\u03EA\u03E8\x03\x02\x02\x02\u03EA\u03EB\x03\x02\x02\x02\u03EB" +
		"\u03F0\x03\x02\x02\x02\u03EC\u03EA\x03\x02\x02\x02\u03ED\u03EF\x07\x13" +
		"\x02\x02\u03EE\u03ED\x03\x02\x02\x02\u03EF\u03F2\x03\x02\x02\x02\u03F0" +
		"\u03EE\x03\x02\x02\x02\u03F0\u03F1\x03\x02\x02\x02\u03F1\u03F3\x03\x02" +
		"\x02\x02\u03F2\u03F0\x03\x02\x02\x02\u03F3\u03F4\x07\t\x02\x02\u03F4{" +
		"\x03\x02\x02\x02\u03F5\u03F6\x07e\x02\x02\u03F6\u03F8\x07\x8A\x02\x02" +
		"\u03F7\u03F9\x05\xB6\\\x02\u03F8\u03F7\x03\x02\x02\x02\u03F8\u03F9\x03" +
		"\x02\x02\x02\u03F9\u03FC\x03\x02\x02\x02\u03FA\u03FB\x07\n\x02\x02\u03FB" +
		"\u03FD\x05\xC0a\x02\u03FC\u03FA\x03\x02\x02\x02\u03FC\u03FD\x03\x02\x02" +
		"\x02\u03FD}\x03\x02\x02\x02\u03FE\u0400\x07g\x02\x02\u03FF\u03FE\x03\x02" +
		"\x02\x02\u03FF\u0400\x03\x02\x02\x02\u0400\u0401\x03\x02\x02\x02\u0401" +
		"\u0402\x07S\x02\x02\u0402\u0403\x05\xB8]\x02\u0403\x7F\x03\x02\x02\x02" +
		"\u0404\u0409\x05\xB8]\x02\u0405\u0406\x07\x04\x02\x02\u0406\u0407\x05" +
		"\xCEh\x02\u0407\u0408\x07\x05\x02\x02\u0408\u040A\x03\x02\x02\x02\u0409" +
		"\u0405\x03\x02\x02\x02\u0409\u040A\x03\x02\x02\x02\u040A\x81\x03\x02\x02" +
		"\x02\u040B\u040D\x07\x85\x02\x02\u040C\u040B\x03\x02\x02\x02\u040C\u040D" +
		"\x03\x02\x02\x02\u040D\u040E\x03\x02\x02\x02\u040E\u040F\x05\x80A\x02" +
		"\u040F\u0410\x07\n\x02\x02\u0410\u0411\x05\x80A\x02\u0411\x83\x03\x02" +
		"\x02\x02\u0412\u0413\x075\x02\x02\u0413\u0414\x07\x8A\x02\x02\u0414\u0418" +
		"\x07\b\x02\x02\u0415\u0417\x07\x13\x02\x02\u0416\u0415\x03\x02\x02\x02" +
		"\u0417\u041A\x03\x02\x02\x02\u0418\u0416\x03\x02\x02\x02\u0418\u0419\x03" +
		"\x02\x02\x02\u0419\u0420\x03\x02\x02\x02\u041A\u0418\x03\x02\x02\x02\u041B" +
		"\u041C\x05\x82B\x02\u041C\u041D\x05\xC2b\x02\u041D\u041F\x03\x02\x02\x02" +
		"\u041E\u041B\x03\x02\x02\x02\u041F\u0422\x03\x02\x02\x02\u0420\u041E\x03" +
		"\x02\x02\x02\u0420\u0421\x03\x02\x02\x02\u0421\u0426\x03\x02\x02\x02\u0422" +
		"\u0420\x03\x02\x02\x02\u0423\u0425\x07\x13\x02\x02\u0424\u0423\x03\x02" +
		"\x02\x02\u0425\u0428\x03\x02\x02\x02\u0426\u0424\x03\x02\x02\x02\u0426" +
		"\u0427\x03\x02\x02\x02\u0427\u0429\x03\x02\x02\x02\u0428\u0426\x03\x02" +
		"\x02\x02\u0429\u042A\x07\t\x02\x02\u042A\x85\x03\x02\x02\x02\u042B\u0434" +
		"\x073\x02\x02\u042C\u0434\x07A\x02\x02\u042D\u042E\x07\x7F\x02\x02\u042E" +
		"\u0434\x07A\x02\x02\u042F\u0434\x07J\x02\x02\u0430\u0434\x07b\x02\x02" +
		"\u0431\u0434\x07~\x02\x02\u0432\u0434\x07\x81\x02\x02\u0433\u042B\x03" +
		"\x02\x02\x02\u0433\u042C\x03\x02\x02\x02\u0433\u042D\x03\x02\x02\x02\u0433" +
		"\u042F\x03\x02\x02\x02\u0433\u0430\x03\x02\x02\x02\u0433\u0431\x03\x02" +
		"\x02\x02\u0433\u0432\x03\x02\x02\x02\u0434\x87\x03\x02\x02\x02\u0435\u043B" +
		"\x05\xB8]\x02\u0436\u0437\x05\xC2b\x02\u0437\u0438\x05\xB8]\x02\u0438" +
		"\u043A\x03\x02\x02\x02\u0439\u0436\x03\x02\x02\x02\u043A\u043D\x03\x02" +
		"\x02\x02\u043B\u0439\x03\x02\x02\x02\u043B\u043C\x03\x02\x02\x02\u043C" +
		"\u043F\x03\x02\x02\x02\u043D\u043B\x03\x02\x02\x02\u043E\u0440\x05\xC2" +
		"b\x02\u043F\u043E\x03\x02\x02\x02\u043F\u0440\x03\x02\x02\x02\u0440\x89" +
		"\x03\x02\x02\x02\u0441\u0442\x05\x86D\x02\u0442\u0443\x075\x02\x02\u0443" +
		"\u0444\x07S\x02\x02\u0444\u0455\x05\xB8]\x02\u0445\u0449\x07\b\x02\x02" +
		"\u0446\u0448\x07\x13\x02\x02\u0447\u0446\x03\x02\x02\x02\u0448\u044B\x03" +
		"\x02\x02\x02\u0449\u0447\x03\x02\x02\x02\u0449\u044A\x03\x02\x02\x02\u044A" +
		"\u044C\x03\x02\x02\x02\u044B\u0449\x03\x02\x02\x02\u044C\u0450\x05\x88" +
		"E\x02\u044D\u044F\x07\x13\x02\x02\u044E\u044D\x03\x02\x02\x02\u044F\u0452" +
		"\x03\x02\x02\x02\u0450\u044E\x03\x02\x02\x02\u0450\u0451\x03\x02\x02\x02" +
		"\u0451\u0453\x03\x02\x02\x02\u0452\u0450\x03\x02\x02\x02\u0453\u0454\x07" +
		"\t\x02\x02\u0454\u0456\x03\x02\x02\x02\u0455\u0445\x03\x02\x02\x02\u0455" +
		"\u0456\x03\x02\x02\x02\u0456\x8B\x03\x02\x02\x02\u0457\u0458\x07O\x02" +
		"\x02\u0458\u0459\x05\xB8]\x02\u0459\x8D\x03\x02\x02\x02\u045A\u045B\x07" +
		"O\x02\x02\u045B\u045C\x05\xB8]\x02\u045C\x8F\x03\x02\x02\x02\u045D\u045F" +
		"\x05\xD4k\x02\u045E\u045D\x03\x02\x02\x02\u045E\u045F\x03\x02\x02\x02" +
		"\u045F\u0460\x03\x02\x02\x02\u0460\u0462\x05\xB8]\x02\u0461\u0463\x07" +
		"\x13\x02\x02\u0462\u0461\x03\x02\x02\x02\u0462\u0463\x03\x02\x02\x02\u0463" +
		"\u0465\x03\x02\x02\x02\u0464\u0466\x05\xD0i\x02\u0465\u0464\x03\x02\x02" +
		"\x02\u0465\u0466\x03\x02\x02\x02\u0466\x91\x03\x02\x02\x02\u0467\u0468" +
		"\x07`\x02\x02\u0468\u0469\x07\x8A\x02\x02\u0469\u046A\x07M\x02\x02\u046A" +
		"\u046B\x05\xCEh\x02\u046B\u046C\x03\x02\x02\x02\u046C\u046D\x07G\x02\x02" +
		"\u046D\u046E\x05\xCEh\x02\u046E\u0472\x07\b\x02\x02\u046F\u0471\x07\x13" +
		"\x02\x02\u0470\u046F\x03\x02\x02\x02\u0471\u0474\x03\x02\x02\x02\u0472" +
		"\u0470\x03\x02\x02\x02\u0472\u0473\x03\x02\x02\x02\u0473\u047A\x03\x02" +
		"\x02\x02\u0474\u0472\x03\x02\x02\x02\u0475\u0476\x05\x90I\x02\u0476\u0477" +
		"\x05\xC2b\x02\u0477\u0479\x03\x02\x02\x02\u0478\u0475\x03\x02\x02\x02" +
		"\u0479\u047C\x03\x02\x02\x02\u047A\u0478\x03\x02\x02\x02\u047A\u047B\x03" +
		"\x02\x02\x02\u047B\u0480\x03\x02\x02\x02\u047C\u047A\x03\x02\x02\x02\u047D" +
		"\u047F\x07\x13\x02\x02\u047E\u047D\x03\x02\x02\x02\u047F\u0482\x03\x02" +
		"\x02\x02\u0480\u047E\x03\x02\x02\x02\u0480\u0481\x03\x02\x02\x02\u0481" +
		"\u0483\x03\x02\x02\x02\u0482\u0480\x03\x02\x02\x02\u0483\u0484\x07\t\x02" +
		"\x02\u0484\x93\x03\x02\x02\x02\u0485\u0488\x05f4\x02\u0486\u0488\x05\x92" +
		"J\x02\u0487\u0485\x03\x02\x02\x02\u0487\u0486\x03\x02\x02\x02\u0488\x95" +
		"\x03\x02\x02\x02\u0489\u048B\x05\xD4k\x02\u048A\u0489\x03\x02\x02\x02" +
		"\u048A\u048B\x03\x02\x02\x02\u048B\u048C\x03\x02\x02\x02\u048C\u048E\x05" +
		"\x94K\x02\u048D\u048F\x07\x13\x02\x02\u048E\u048D\x03\x02\x02\x02\u048E" +
		"\u048F\x03\x02\x02\x02\u048F\u0491\x03\x02\x02\x02\u0490\u0492\x05\xD0" +
		"i\x02\u0491\u0490\x03\x02\x02\x02\u0491\u0492\x03\x02\x02\x02\u0492\x97" +
		"\x03\x02\x02\x02\u0493\u0494\x07~\x02\x02\u0494\u0495\x07a\x02\x02\u0495" +
		"\u04AC\x07\x8A\x02\x02\u0496\u049A\x07\b\x02\x02\u0497\u0499\x07\x13\x02" +
		"\x02\u0498\u0497\x03\x02\x02\x02\u0499\u049C\x03\x02\x02\x02\u049A\u0498" +
		"\x03\x02\x02\x02\u049A\u049B\x03\x02\x02\x02\u049B\u04A2\x03\x02\x02\x02" +
		"\u049C\u049A\x03\x02\x02\x02\u049D\u049E\x05\x96L\x02\u049E\u049F\x05" +
		"\xC4c\x02\u049F\u04A1\x03\x02\x02\x02\u04A0\u049D\x03\x02\x02\x02\u04A1" +
		"\u04A4\x03\x02\x02\x02\u04A2\u04A0\x03\x02\x02\x02\u04A2\u04A3\x03\x02" +
		"\x02\x02\u04A3\u04A8\x03\x02\x02\x02\u04A4\u04A2\x03\x02\x02\x02\u04A5" +
		"\u04A7\x07\x13\x02\x02\u04A6\u04A5\x03\x02\x02\x02\u04A7\u04AA\x03\x02" +
		"\x02\x02\u04A8\u04A6\x03\x02\x02\x02\u04A8\u04A9\x03\x02\x02\x02\u04A9" +
		"\u04AB\x03\x02\x02\x02\u04AA\u04A8\x03\x02\x02\x02\u04AB\u04AD\x07\t\x02" +
		"\x02\u04AC\u0496\x03\x02\x02\x02\u04AC\u04AD\x03\x02\x02\x02\u04AD\u04C5" +
		"\x03\x02\x02\x02\u04AE\u04AF\x07[\x02\x02\u04AF\u04B3\x07\b\x02\x02\u04B0" +
		"\u04B2\x07\x13\x02\x02\u04B1\u04B0\x03\x02\x02\x02\u04B2\u04B5\x03\x02" +
		"\x02\x02\u04B3\u04B1\x03\x02\x02\x02\u04B3\u04B4\x03\x02\x02\x02\u04B4" +
		"\u04BB\x03\x02\x02\x02\u04B5\u04B3\x03\x02\x02\x02\u04B6\u04B7\x05\x90" +
		"I\x02\u04B7\u04B8\x05\xC2b\x02\u04B8\u04BA\x03\x02\x02\x02\u04B9\u04B6" +
		"\x03\x02\x02\x02\u04BA\u04BD\x03\x02\x02\x02\u04BB\u04B9\x03\x02\x02\x02" +
		"\u04BB\u04BC\x03\x02\x02\x02\u04BC\u04C1\x03\x02\x02\x02\u04BD\u04BB\x03" +
		"\x02\x02\x02\u04BE\u04C0\x07\x13\x02\x02\u04BF\u04BE\x03\x02\x02\x02\u04C0" +
		"\u04C3\x03\x02\x02\x02\u04C1\u04BF\x03\x02\x02\x02\u04C1\u04C2\x03\x02" +
		"\x02\x02\u04C2\u04C4\x03\x02\x02\x02\u04C3\u04C1\x03\x02\x02\x02\u04C4" +
		"\u04C6\x07\t\x02\x02\u04C5\u04AE\x03\x02\x02\x02\u04C5\u04C6\x03\x02\x02" +
		"\x02\u04C6\x99\x03\x02\x02\x02\u04C7\u04CE\x05~@\x02\u04C8\u04CE\x05\x84" +
		"C\x02\u04C9\u04CE\x05\x8AF\x02\u04CA\u04CE\x05\x8CG\x02\u04CB\u04CE\x05" +
		"\x98M\x02\u04CC\u04CE\x05f4\x02\u04CD\u04C7\x03\x02\x02\x02\u04CD\u04C8" +
		"\x03\x02\x02\x02\u04CD\u04C9\x03\x02\x02\x02\u04CD\u04CA\x03\x02\x02\x02" +
		"\u04CD\u04CB\x03\x02\x02\x02\u04CD\u04CC\x03\x02\x02\x02\u04CE\x9B\x03" +
		"\x02\x02\x02\u04CF\u04D1\x05\xD4k\x02\u04D0\u04CF\x03\x02\x02\x02\u04D0" +
		"\u04D1\x03\x02\x02\x02\u04D1\u04D2\x03\x02\x02\x02\u04D2\u04D4\x05\x9A" +
		"N\x02\u04D3\u04D5\x07\x13\x02\x02\u04D4\u04D3\x03\x02\x02\x02\u04D4\u04D5" +
		"\x03\x02\x02\x02\u04D5\u04D7\x03\x02\x02\x02\u04D6\u04D8\x05\xD0i\x02" +
		"\u04D7\u04D6\x03\x02\x02\x02\u04D7\u04D8\x03\x02\x02\x02\u04D8\x9D\x03" +
		"\x02\x02\x02\u04D9\u04DA\x07\x82\x02\x02\u04DA\u04DB\x07\x8A\x02\x02\u04DB" +
		"\u04DF\x07\b\x02\x02\u04DC\u04DE\x07\x13\x02\x02\u04DD\u04DC\x03\x02\x02" +
		"\x02\u04DE\u04E1\x03\x02\x02\x02\u04DF\u04DD\x03\x02\x02\x02\u04DF\u04E0" +
		"\x03\x02\x02\x02\u04E0\u04E7\x03\x02\x02\x02\u04E1\u04DF\x03\x02\x02\x02" +
		"\u04E2\u04E3\x05\x9CO\x02\u04E3\u04E4\x05\xC4c\x02\u04E4\u04E6\x03\x02" +
		"\x02\x02\u04E5\u04E2\x03\x02\x02\x02\u04E6\u04E9\x03\x02\x02\x02\u04E7" +
		"\u04E5\x03\x02\x02\x02\u04E7\u04E8\x03\x02\x02\x02\u04E8\u04ED\x03\x02" +
		"\x02\x02\u04E9\u04E7\x03\x02\x02\x02\u04EA\u04EC\x07\x13\x02\x02\u04EB" +
		"\u04EA\x03\x02\x02\x02\u04EC\u04EF\x03\x02\x02\x02\u04ED\u04EB\x03\x02" +
		"\x02\x02\u04ED\u04EE\x03\x02\x02\x02\u04EE\u04F0\x03\x02\x02\x02\u04EF" +
		"\u04ED\x03\x02\x02\x02\u04F0\u04F1\x07\t\x02\x02\u04F1\x9F\x03\x02\x02" +
		"\x02\u04F2\u04F6\x05(\x15\x02\u04F3\u04F6\x05*\x16\x02\u04F4\u04F6\x05" +
		"\x8EH\x02\u04F5\u04F2\x03\x02\x02\x02\u04F5\u04F3\x03\x02\x02\x02\u04F5" +
		"\u04F4\x03\x02\x02\x02\u04F6\xA1\x03\x02\x02\x02\u04F7\u04F9\x05\xD4k" +
		"\x02\u04F8\u04F7\x03\x02\x02\x02\u04F8\u04F9\x03\x02\x02\x02\u04F9\u04FA" +
		"\x03\x02\x02\x02\u04FA\u04FC\x05\xA0Q\x02\u04FB\u04FD\x07\x13\x02\x02" +
		"\u04FC\u04FB\x03\x02\x02\x02\u04FC\u04FD\x03\x02\x02\x02\u04FD\u04FF\x03" +
		"\x02\x02\x02\u04FE\u0500\x05\xD0i\x02\u04FF\u04FE\x03\x02\x02\x02\u04FF" +
		"\u0500\x03\x02\x02\x02\u0500\xA3\x03\x02\x02\x02\u0501\u0502\x07T\x02" +
		"\x02\u0502\u0503\x07\x8A\x02\x02\u0503\u0507\x07\b\x02\x02\u0504\u0506" +
		"\x07\x13\x02\x02\u0505\u0504\x03\x02\x02\x02\u0506\u0509\x03\x02\x02\x02" +
		"\u0507\u0505\x03\x02\x02\x02\u0507\u0508\x03\x02\x02\x02\u0508\u050F\x03" +
		"\x02\x02\x02\u0509\u0507\x03\x02\x02\x02\u050A\u050B\x05\xA2R\x02\u050B" +
		"\u050C\x05\xC4c\x02\u050C\u050E\x03\x02\x02\x02\u050D\u050A\x03\x02\x02" +
		"\x02\u050E\u0511\x03\x02\x02\x02\u050F\u050D\x03\x02\x02\x02\u050F\u0510" +
		"\x03\x02\x02\x02\u0510\u0515\x03\x02\x02\x02\u0511\u050F\x03\x02\x02\x02" +
		"\u0512\u0514\x07\x13\x02\x02\u0513\u0512\x03\x02\x02\x02\u0514\u0517\x03" +
		"\x02\x02\x02\u0515\u0513\x03\x02\x02\x02\u0515\u0516\x03\x02\x02\x02\u0516" +
		"\u0518\x03\x02\x02\x02\u0517\u0515\x03\x02\x02\x02\u0518\u0519\x07\t\x02" +
		"\x02\u0519\xA5\x03\x02\x02\x02\u051A\u0524\x07S\x02\x02\u051B\u0524\x07" +
		"4\x02\x02\u051C\u0524\x076\x02\x02\u051D\u0524\x07e\x02\x02\u051E\u0524" +
		"\x07\x82\x02\x02\u051F\u0524\x07\x84\x02\x02\u0520\u0521\x07z\x02\x02" +
		"\u0521\u0524\x07X\x02\x02\u0522\u0524\x07T\x02\x02\u0523\u051A\x03\x02" +
		"\x02\x02\u0523\u051B\x03\x02\x02\x02\u0523\u051C\x03\x02\x02\x02\u0523" +
		"\u051D\x03\x02\x02\x02\u0523\u051E\x03\x02\x02\x02\u0523\u051F\x03\x02" +
		"\x02\x02\u0523\u0520\x03\x02\x02\x02\u0523\u0522\x03\x02\x02\x02\u0524" +
		"\xA7\x03\x02\x02\x02\u0525\u0526\x07V\x02\x02\u0526\u0527\x05\xA6T\x02" +
		"\u0527\u0528\x05\xB8]\x02\u0528\u0529\x07-\x02\x02\u0529\u052A\x07\x19" +
		"\x02\x02\u052A\xA9\x03\x02\x02\x02\u052B\u053B\x05\b\x05\x02\u052C\u053B" +
		"\x05\n\x06\x02\u052D\u053B\x05\x0E\b\x02\u052E\u053B\x05z>\x02\u052F\u053B" +
		"\x05r:\x02\u0530\u053B\x05\x10\t\x02\u0531\u053B\x05\xA4S\x02\u0532\u053B" +
		"\x05\xAEX\x02\u0533\u053B\x05|?\x02\u0534\u053B\x05\x18\r\x02\u0535\u053B" +
		"\x05\xA8U\x02\u0536\u053B\x05`1\x02\u0537\u053B\x05f4\x02\u0538\u053B" +
		"\x05\x9EP\x02\u0539\u053B\x05V,\x02\u053A\u052B\x03\x02\x02\x02\u053A" +
		"\u052C\x03\x02\x02\x02\u053A\u052D\x03\x02\x02\x02\u053A\u052E\x03\x02" +
		"\x02\x02\u053A\u052F\x03\x02\x02\x02\u053A\u0530\x03\x02\x02\x02\u053A" +
		"\u0531\x03\x02\x02\x02\u053A\u0532\x03\x02\x02\x02\u053A\u0533\x03\x02" +
		"\x02\x02\u053A\u0534\x03\x02\x02\x02\u053A\u0535\x03\x02\x02\x02\u053A" +
		"\u0536\x03\x02\x02\x02\u053A\u0537\x03\x02\x02\x02\u053A\u0538\x03\x02" +
		"\x02\x02\u053A\u0539\x03\x02\x02\x02\u053B\xAB\x03\x02\x02\x02\u053C\u053E" +
		"\x05\xD4k\x02\u053D\u053C\x03\x02\x02\x02\u053D\u053E\x03\x02\x02\x02" +
		"\u053E\u053F\x03\x02\x02\x02\u053F\u0541\x05\xAAV\x02\u0540\u0542\x07" +
		"\x13\x02\x02\u0541\u0540\x03\x02\x02\x02\u0541\u0542\x03\x02\x02\x02\u0542" +
		"\u0544\x03\x02\x02\x02\u0543\u0545\x05\xD0i\x02\u0544\u0543\x03\x02\x02" +
		"\x02\u0544\u0545\x03\x02\x02\x02\u0545\xAD\x03\x02\x02\x02\u0546\u0547" +
		"\x07Z\x02\x02\u0547\u0548\x07\x8A\x02\x02\u0548\u054C\x07\b\x02\x02\u0549" +
		"\u054B\x07\x13\x02\x02\u054A\u0549\x03\x02\x02\x02\u054B\u054E\x03\x02" +
		"\x02\x02\u054C\u054A\x03\x02\x02\x02\u054C\u054D\x03\x02\x02\x02\u054D" +
		"\u0554\x03\x02\x02\x02\u054E\u054C\x03\x02\x02\x02\u054F\u0550\x05\xAC" +
		"W\x02\u0550\u0551\x05\xC4c\x02\u0551\u0553\x03\x02\x02\x02\u0552\u054F" +
		"\x03\x02\x02\x02\u0553\u0556\x03\x02\x02\x02\u0554\u0552\x03\x02\x02\x02" +
		"\u0554\u0555\x03\x02\x02\x02\u0555\u055A\x03\x02\x02\x02\u0556\u0554\x03" +
		"\x02\x02\x02\u0557\u0559\x07\x13\x02\x02\u0558\u0557\x03\x02\x02\x02\u0559" +
		"\u055C\x03\x02\x02\x02\u055A\u0558\x03\x02\x02\x02\u055A\u055B\x03\x02" +
		"\x02\x02\u055B\u055D\x03\x02\x02\x02\u055C\u055A\x03\x02\x02\x02\u055D" +
		"\u055E\x07\t\x02\x02\u055E\xAF\x03\x02\x02\x02\u055F\u0561\x07n\x02\x02" +
		"\u0560\u055F\x03\x02\x02\x02\u0560\u0561\x03\x02\x02\x02\u0561\u0562\x03" +
		"\x02\x02\x02\u0562\u0563\x07\x8A\x02\x02\u0563\u0564\x07\x06\x02\x02\u0564" +
		"\u0565\x05\xC0a\x02\u0565\xB1\x03\x02\x02\x02\u0566\u0568\x05\xD4k\x02" +
		"\u0567\u0566\x03\x02\x02\x02\u0567\u0568\x03\x02\x02\x02\u0568\u0569\x03" +
		"\x02\x02\x02\u0569\u056F\x05\xB0Y\x02\u056A\u056C\x07\x07\x02\x02\u056B" +
		"\u056A\x03\x02\x02\x02\u056B\u056C\x03\x02\x02\x02\u056C\u056D\x03\x02" +
		"\x02\x02\u056D\u0570\x05\xD2j\x02\u056E\u0570\x05\xC2b\x02\u056F\u056B" +
		"\x03\x02\x02\x02\u056F\u056E\x03\x02\x02\x02\u0570\xB3\x03\x02\x02\x02" +
		"\u0571\u0573\x05\xD4k\x02\u0572\u0571\x03\x02\x02\x02\u0572\u0573\x03" +
		"\x02\x02\x02\u0573\u0574\x03\x02\x02\x02\u0574\u057A\x05\xB0Y\x02\u0575" +
		"\u0577\x07\x07\x02\x02\u0576\u0575\x03\x02\x02\x02\u0576\u0577\x03\x02" +
		"\x02\x02\u0577\u0578\x03\x02\x02\x02\u0578\u057B\x05\xD2j\x02\u0579\u057B" +
		"\x05\xC2b\x02\u057A\u0576\x03\x02\x02\x02\u057A\u0579\x03\x02\x02\x02" +
		"\u057A\u057B\x03\x02\x02\x02\u057B\xB5\x03\x02\x02\x02\u057C\u0580\x07" +
		"\v\x02\x02\u057D\u057F\x07\x13\x02\x02\u057E\u057D\x03\x02\x02\x02\u057F" +
		"\u0582\x03\x02\x02\x02\u0580\u057E\x03\x02\x02\x02\u0580\u0581\x03\x02" +
		"\x02\x02\u0581\u058A\x03\x02\x02\x02\u0582\u0580\x03\x02\x02\x02\u0583" +
		"\u0585\x05\xB2Z\x02\u0584\u0583\x03\x02\x02\x02\u0585\u0588\x03\x02\x02" +
		"\x02\u0586\u0584\x03\x02\x02\x02\u0586\u0587\x03\x02\x02\x02\u0587\u0589" +
		"\x03\x02\x02\x02\u0588\u0586\x03\x02\x02\x02\u0589\u058B\x05\xB4[\x02" +
		"\u058A\u0586\x03\x02\x02\x02\u058A\u058B\x03\x02\x02\x02\u058B\u058C\x03" +
		"\x02\x02\x02\u058C\u058D\x07\f\x02\x02\u058D\xB7\x03\x02\x02\x02\u058E" +
		"\u0593\x07\x8A\x02\x02\u058F\u0590\x07\r\x02\x02\u0590\u0592\x07\x8A\x02" +
		"\x02\u0591\u058F\x03\x02\x02\x02\u0592\u0595\x03\x02\x02\x02\u0593\u0591" +
		"\x03\x02\x02\x02\u0593\u0594\x03\x02\x02\x02\u0594\xB9\x03\x02\x02\x02" +
		"\u0595\u0593\x03\x02\x02\x02\u0596\u0597\t\x06\x02\x02\u0597\xBB\x03\x02" +
		"\x02\x02\u0598\u0599\t\x07\x02\x02\u0599\xBD\x03\x02\x02\x02\u059A\u059D" +
		"\x07{\x02\x02\u059B\u059C\x07x\x02\x02\u059C\u059E\x05\xCEh\x02\u059D" +
		"\u059B\x03\x02\x02\x02\u059D\u059E\x03\x02\x02\x02\u059E\xBF\x03\x02\x02" +
		"\x02\u059F\u05A3\x05\xBE`\x02\u05A0\u05A3\x05\xBC_\x02\u05A1\u05A3\x05" +
		"\xB8]\x02\u05A2\u059F\x03\x02\x02\x02\u05A2\u05A0\x03\x02\x02\x02\u05A2" +
		"\u05A1\x03\x02\x02\x02\u05A3\xC1\x03\x02\x02\x02\u05A4\u05A8\x07\x07\x02" +
		"\x02\u05A5\u05A7\x07\x13\x02\x02\u05A6\u05A5\x03\x02\x02\x02\u05A7\u05AA" +
		"\x03\x02\x02\x02\u05A8\u05A6\x03\x02\x02\x02\u05A8\u05A9\x03\x02\x02\x02" +
		"\u05A9\u05B1\x03\x02\x02\x02\u05AA\u05A8\x03\x02\x02\x02\u05AB\u05AD\x07" +
		"\x13\x02\x02\u05AC\u05AB\x03\x02\x02\x02\u05AD\u05AE\x03\x02\x02\x02\u05AE" +
		"\u05AC\x03\x02\x02\x02\u05AE\u05AF\x03\x02\x02\x02\u05AF\u05B1\x03\x02" +
		"\x02\x02\u05B0\u05A4\x03\x02\x02\x02\u05B0\u05AC\x03\x02\x02\x02\u05B1" +
		"\xC3\x03\x02\x02\x02\u05B2\u05B6\x07\x0E\x02\x02\u05B3\u05B5\x07\x13\x02" +
		"\x02\u05B4\u05B3\x03\x02\x02\x02\u05B5\u05B8\x03\x02\x02\x02\u05B6\u05B4" +
		"\x03\x02\x02\x02\u05B6\u05B7\x03\x02\x02\x02\u05B7\u05BF\x03\x02\x02\x02" +
		"\u05B8\u05B6\x03\x02\x02\x02\u05B9\u05BB\x07\x13\x02\x02\u05BA\u05B9\x03" +
		"\x02\x02\x02\u05BB\u05BC\x03\x02\x02\x02\u05BC\u05BA\x03\x02\x02\x02\u05BC" +
		"\u05BD\x03\x02\x02\x02\u05BD\u05BF\x03\x02\x02\x02\u05BE\u05B2\x03\x02" +
		"\x02\x02\u05BE\u05BA\x03\x02\x02\x02\u05BF\xC5\x03\x02\x02\x02\u05C0\u05C4" +
		"\x07\x04\x02\x02\u05C1\u05C3\x07\x13\x02\x02\u05C2\u05C1\x03\x02\x02\x02" +
		"\u05C3\u05C6\x03\x02\x02\x02\u05C4\u05C2\x03\x02\x02\x02\u05C4\u05C5\x03" +
		"\x02\x02\x02\u05C5\u05D0\x03\x02\x02\x02\u05C6\u05C4\x03\x02\x02\x02\u05C7" +
		"\u05CD\x05\xCCg\x02\u05C8\u05C9\x05\xC2b\x02\u05C9\u05CA\x05\xCCg\x02" +
		"\u05CA\u05CC\x03\x02\x02\x02\u05CB\u05C8\x03\x02\x02\x02\u05CC\u05CF\x03" +
		"\x02\x02\x02\u05CD\u05CB\x03\x02\x02\x02\u05CD\u05CE\x03\x02\x02\x02\u05CE" +
		"\u05D1\x03\x02\x02\x02\u05CF\u05CD\x03\x02\x02\x02\u05D0\u05C7\x03\x02" +
		"\x02\x02\u05D0\u05D1\x03\x02\x02\x02\u05D1\u05D2\x03\x02\x02\x02\u05D2" +
		"\u05D3\x07\x05\x02\x02\u05D3\xC7\x03\x02\x02\x02\u05D4\u05D5\x07\x8A\x02" +
		"\x02\u05D5\u05D6\x07\x03\x02\x02\u05D6\u05D7\x05\xCEh\x02\u05D7\xC9\x03" +
		"\x02\x02\x02\u05D8\u05DC\x07\b\x02\x02\u05D9\u05DB\x07\x13\x02\x02\u05DA" +
		"\u05D9\x03\x02\x02\x02\u05DB\u05DE\x03\x02\x02\x02\u05DC\u05DA\x03\x02" +
		"\x02\x02\u05DC\u05DD\x03\x02\x02\x02\u05DD\u05EB\x03\x02\x02\x02\u05DE" +
		"\u05DC\x03\x02\x02\x02\u05DF\u05E5\x05\xC8e\x02\u05E0\u05E1\x05\xC2b\x02" +
		"\u05E1\u05E2\x05\xC8e\x02\u05E2\u05E4\x03\x02\x02\x02\u05E3\u05E0\x03" +
		"\x02\x02\x02\u05E4\u05E7\x03\x02\x02\x02\u05E5\u05E3\x03\x02\x02\x02\u05E5" +
		"\u05E6\x03\x02\x02\x02\u05E6\u05E9\x03\x02\x02\x02\u05E7\u05E5\x03\x02" +
		"\x02\x02\u05E8\u05EA\x05\xC2b\x02\u05E9\u05E8\x03\x02\x02\x02\u05E9\u05EA" +
		"\x03\x02\x02\x02\u05EA\u05EC\x03\x02\x02\x02\u05EB\u05DF\x03\x02\x02\x02" +
		"\u05EB\u05EC\x03\x02\x02\x02\u05EC\u05ED\x03\x02\x02\x02\u05ED\u05EE\x07" +
		"\t\x02\x02\u05EE\xCB\x03\x02\x02\x02\u05EF\u05F0\bg\x01\x02\u05F0\u05F1" +
		"\x07\x0F\x02\x02\u05F1\u05FC\x05\xCCg\v\u05F2\u05FC\x05\xB8]\x02\u05F3" +
		"\u05FC\x07\x18\x02\x02\u05F4\u05FC\x07\x1A\x02\x02\u05F5\u05FC\x07\x1B" +
		"\x02\x02\u05F6\u05FC\x07\x19\x02\x02\u05F7\u05F8\x07\v\x02\x02\u05F8\u05F9" +
		"\x05\xCCg\x02\u05F9\u05FA\x07\f\x02\x02\u05FA\u05FC\x03\x02\x02\x02\u05FB" +
		"\u05EF\x03\x02\x02\x02\u05FB\u05F2\x03\x02\x02\x02\u05FB\u05F3\x03\x02" +
		"\x02\x02\u05FB\u05F4\x03\x02\x02\x02\u05FB\u05F5\x03\x02\x02\x02\u05FB" +
		"\u05F6\x03\x02\x02\x02\u05FB\u05F7\x03\x02\x02\x02\u05FC\u0605\x03\x02" +
		"\x02\x02\u05FD\u05FE\f\n\x02\x02\u05FE\u05FF\t\b\x02\x02\u05FF\u0604\x05" +
		"\xCCg\v\u0600\u0601\f\t\x02\x02\u0601\u0602\t\t\x02\x02\u0602\u0604\x05" +
		"\xCCg\n\u0603\u05FD\x03\x02\x02\x02\u0603\u0600\x03\x02\x02\x02\u0604" +
		"\u0607\x03\x02\x02\x02\u0605\u0603\x03\x02\x02\x02\u0605\u0606\x03\x02" +
		"\x02\x02\u0606\xCD\x03\x02\x02\x02\u0607\u0605\x03\x02\x02\x02\u0608\u060C" +
		"\x05\xC6d\x02\u0609\u060C\x05\xCAf\x02\u060A\u060C\x05\xCCg\x02\u060B" +
		"\u0608\x03\x02\x02\x02\u060B\u0609\x03\x02\x02\x02\u060B\u060A\x03\x02" +
		"\x02\x02\u060C\xCF\x03\x02\x02\x02\u060D\u060E\x07\x17\x02\x02\u060E\xD1" +
		"\x03\x02\x02\x02\u060F\u0611\x07\x13\x02\x02\u0610\u060F\x03\x02\x02\x02" +
		"\u0610\u0611\x03\x02\x02\x02\u0611\u0614\x03\x02\x02\x02\u0612\u0613\x07" +
		"\x17\x02\x02\u0613\u0615\x07\x13\x02\x02\u0614\u0612\x03\x02\x02\x02\u0615" +
		"\u0616\x03\x02\x02\x02\u0616\u0614\x03\x02\x02\x02\u0616\u0617\x03\x02" +
		"\x02\x02\u0617\u061B\x03\x02\x02\x02\u0618\u061A\x07\x13\x02\x02\u0619" +
		"\u0618\x03\x02\x02\x02\u061A\u061D\x03\x02\x02\x02\u061B\u0619\x03\x02" +
		"\x02\x02\u061B\u061C\x03\x02\x02\x02\u061C\xD3\x03\x02\x02\x02\u061D\u061B" +
		"\x03\x02\x02\x02\u061E\u061F\x07\x17\x02\x02\u061F\u0621\x07\x13\x02\x02" +
		"\u0620\u061E\x03\x02\x02\x02\u0621\u0622\x03\x02\x02\x02\u0622\u0620\x03" +
		"\x02\x02\x02\u0622\u0623\x03\x02\x02\x02\u0623\u0627\x03\x02\x02\x02\u0624" +
		"\u0626\x07\x13\x02\x02\u0625\u0624\x03\x02\x02\x02\u0626\u0629\x03\x02" +
		"\x02\x02\u0627\u0625\x03\x02\x02\x02\u0627\u0628\x03\x02\x02\x02\u0628" +
		"\xD5\x03\x02\x02\x02\u0629\u0627\x03\x02\x02\x02\xDF\xD9\xDF\xE3\xE9\xF1" +
		"\xF7\xFB\u0101\u0109\u010F\u0113\u0119\u0128\u0133\u0137\u0144\u0149\u014C" +
		"\u0150\u0154\u0157\u015B\u015F\u0167\u016D\u0171\u0176\u0180\u0184\u0188" +
		"\u018B\u0193\u0197\u019C\u01A1\u01AA\u01C1\u01C7\u01CB\u01D5\u01DA\u01DD" +
		"\u01E4\u01E7\u01F2\u01FB\u01FF\u0201\u0208\u0210\u0214\u0218\u021C\u0220" +
		"\u0226\u022E\u0239\u0242\u0248\u024F\u0258\u025B\u025E\u0263\u026D\u0273" +
		"\u0283\u0286\u028A\u028D\u0295\u029D\u02A3\u02A7\u02AF\u02B2\u02B6\u02B9" +
		"\u02C2\u02CA\u02D0\u02D4\u02DE\u02E1\u02E6\u02E9\u02ED\u02F0\u02F3\u02F6" +
		"\u02F9\u02FD\u0300\u0303\u0306\u030C\u0312\u0318\u031C\u0321\u0327\u0334" +
		"\u0339\u033F\u0345\u0353\u0357\u035A\u0362\u0366\u036D\u0372\u0375\u037B" +
		"\u037E\u0389\u038D\u0392\u0397\u039B\u039F\u03A5\u03AD\u03B3\u03B7\u03CF" +
		"\u03D2\u03D6\u03D9\u03E2\u03EA\u03F0\u03F8\u03FC\u03FF\u0409\u040C\u0418" +
		"\u0420\u0426\u0433\u043B\u043F\u0449\u0450\u0455\u045E\u0462\u0465\u0472" +
		"\u047A\u0480\u0487\u048A\u048E\u0491\u049A\u04A2\u04A8\u04AC\u04B3\u04BB" +
		"\u04C1\u04C5\u04CD\u04D0\u04D4\u04D7\u04DF\u04E7\u04ED\u04F5\u04F8\u04FC" +
		"\u04FF\u0507\u050F\u0515\u0523\u053A\u053D\u0541\u0544\u054C\u0554\u055A" +
		"\u0560\u0567\u056B\u056F\u0572\u0576\u057A\u0580\u0586\u058A\u0593\u059D" +
		"\u05A2\u05A8\u05AE\u05B0\u05B6\u05BC\u05BE\u05C4\u05CD\u05D0\u05DC\u05E5" +
		"\u05E9\u05EB\u05FB\u0603\u0605\u060B\u0610\u0616\u061B\u0622\u0627";
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


export class ArrayDefaultContext extends ParserRuleContext {
	public arrayExpr(): ArrayExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayExprContext);
	}
	public scalarExpr(): ScalarExprContext | undefined {
		return this.tryGetRuleContext(0, ScalarExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_arrayDefault; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterArrayDefault) {
			listener.enterArrayDefault(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitArrayDefault) {
			listener.exitArrayDefault(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitArrayDefault) {
			return visitor.visitArrayDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _size!: ExprContext;
	public _type!: TypeNameContext;
	public _default_!: ArrayDefaultContext;
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
	public arrayDefault(): ArrayDefaultContext | undefined {
		return this.tryGetRuleContext(0, ArrayDefaultContext);
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
	public GUARDED(): TerminalNode | undefined { return this.tryGetToken(FppParser.GUARDED, 0); }
	public SYNC(): TerminalNode | undefined { return this.tryGetToken(FppParser.SYNC, 0); }
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
	public _priority!: ExprContext;
	public _queueFull!: QueueFullBehaviorContext;
	public specialPortKind(): SpecialPortKindContext {
		return this.getRuleContext(0, SpecialPortKindContext);
	}
	public PORT(): TerminalNode { return this.getToken(FppParser.PORT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
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
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
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
	public commaDelim(): CommaDelimContext | undefined {
		return this.tryGetRuleContext(0, CommaDelimContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
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
	public importInterfaceStmt(): ImportInterfaceStmtContext | undefined {
		return this.tryGetRuleContext(0, ImportInterfaceStmtContext);
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
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
	public UNMATCHED(): TerminalNode | undefined { return this.tryGetToken(FppParser.UNMATCHED, 0); }
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


export class ImportTopologyStmtContext extends ParserRuleContext {
	public _symbol!: QualIdentContext;
	public IMPORT(): TerminalNode { return this.getToken(FppParser.IMPORT, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_importTopologyStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterImportTopologyStmt) {
			listener.enterImportTopologyStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitImportTopologyStmt) {
			listener.exitImportTopologyStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitImportTopologyStmt) {
			return visitor.visitImportTopologyStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportInterfaceStmtContext extends ParserRuleContext {
	public _symbol!: QualIdentContext;
	public IMPORT(): TerminalNode { return this.getToken(FppParser.IMPORT, 0); }
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_importInterfaceStmt; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterImportInterfaceStmt) {
			listener.enterImportInterfaceStmt(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitImportInterfaceStmt) {
			listener.exitImportInterfaceStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitImportInterfaceStmt) {
			return visitor.visitImportInterfaceStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryChannelIdentifierContext extends ParserRuleContext {
	public qualIdent(): QualIdentContext {
		return this.getRuleContext(0, QualIdentContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryChannelIdentifier; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryChannelIdentifier) {
			listener.enterTelemetryChannelIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryChannelIdentifier) {
			listener.exitTelemetryChannelIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryChannelIdentifier) {
			return visitor.visitTelemetryChannelIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryPacketSpecifierContext extends ParserRuleContext {
	public _name!: Token;
	public _id!: ExprContext;
	public _group!: ExprContext;
	public _packets!: TelemetryChannelIdentifierContext;
	public PACKET(): TerminalNode { return this.getToken(FppParser.PACKET, 0); }
	public GROUP(): TerminalNode { return this.getToken(FppParser.GROUP, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(FppParser.ID, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
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
	public telemetryChannelIdentifier(): TelemetryChannelIdentifierContext[];
	public telemetryChannelIdentifier(i: number): TelemetryChannelIdentifierContext;
	public telemetryChannelIdentifier(i?: number): TelemetryChannelIdentifierContext | TelemetryChannelIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TelemetryChannelIdentifierContext);
		} else {
			return this.getRuleContext(i, TelemetryChannelIdentifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryPacketSpecifier; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryPacketSpecifier) {
			listener.enterTelemetryPacketSpecifier(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryPacketSpecifier) {
			listener.exitTelemetryPacketSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryPacketSpecifier) {
			return visitor.visitTelemetryPacketSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryPacketSetMemberTemplContext extends ParserRuleContext {
	public includeStmt(): IncludeStmtContext | undefined {
		return this.tryGetRuleContext(0, IncludeStmtContext);
	}
	public telemetryPacketSpecifier(): TelemetryPacketSpecifierContext | undefined {
		return this.tryGetRuleContext(0, TelemetryPacketSpecifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryPacketSetMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryPacketSetMemberTempl) {
			listener.enterTelemetryPacketSetMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryPacketSetMemberTempl) {
			listener.exitTelemetryPacketSetMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryPacketSetMemberTempl) {
			return visitor.visitTelemetryPacketSetMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryPacketSetMemberContext extends ParserRuleContext {
	public telemetryPacketSetMemberTempl(): TelemetryPacketSetMemberTemplContext {
		return this.getRuleContext(0, TelemetryPacketSetMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryPacketSetMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryPacketSetMember) {
			listener.enterTelemetryPacketSetMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryPacketSetMember) {
			listener.exitTelemetryPacketSetMember(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryPacketSetMember) {
			return visitor.visitTelemetryPacketSetMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TelemetryPacketSetDeclContext extends ParserRuleContext {
	public _name!: Token;
	public _omit!: TelemetryChannelIdentifierContext;
	public TELEMETRY(): TerminalNode { return this.getToken(FppParser.TELEMETRY, 0); }
	public PACKETS(): TerminalNode { return this.getToken(FppParser.PACKETS, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public OMIT(): TerminalNode | undefined { return this.tryGetToken(FppParser.OMIT, 0); }
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public telemetryPacketSetMember(): TelemetryPacketSetMemberContext[];
	public telemetryPacketSetMember(i: number): TelemetryPacketSetMemberContext;
	public telemetryPacketSetMember(i?: number): TelemetryPacketSetMemberContext | TelemetryPacketSetMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TelemetryPacketSetMemberContext);
		} else {
			return this.getRuleContext(i, TelemetryPacketSetMemberContext);
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
	public commaDelim(): CommaDelimContext[];
	public commaDelim(i: number): CommaDelimContext;
	public commaDelim(i?: number): CommaDelimContext | CommaDelimContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommaDelimContext);
		} else {
			return this.getRuleContext(i, CommaDelimContext);
		}
	}
	public telemetryChannelIdentifier(): TelemetryChannelIdentifierContext[];
	public telemetryChannelIdentifier(i: number): TelemetryChannelIdentifierContext;
	public telemetryChannelIdentifier(i?: number): TelemetryChannelIdentifierContext | TelemetryChannelIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TelemetryChannelIdentifierContext);
		} else {
			return this.getRuleContext(i, TelemetryChannelIdentifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_telemetryPacketSetDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterTelemetryPacketSetDecl) {
			listener.enterTelemetryPacketSetDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitTelemetryPacketSetDecl) {
			listener.exitTelemetryPacketSetDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitTelemetryPacketSetDecl) {
			return visitor.visitTelemetryPacketSetDecl(this);
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
	public importTopologyStmt(): ImportTopologyStmtContext | undefined {
		return this.tryGetRuleContext(0, ImportTopologyStmtContext);
	}
	public telemetryPacketSetDecl(): TelemetryPacketSetDeclContext | undefined {
		return this.tryGetRuleContext(0, TelemetryPacketSetDeclContext);
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
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


export class InterfaceMemberTemplContext extends ParserRuleContext {
	public generalPortInstanceDecl(): GeneralPortInstanceDeclContext | undefined {
		return this.tryGetRuleContext(0, GeneralPortInstanceDeclContext);
	}
	public specialPortInstanceDecl(): SpecialPortInstanceDeclContext | undefined {
		return this.tryGetRuleContext(0, SpecialPortInstanceDeclContext);
	}
	public importInterfaceStmt(): ImportInterfaceStmtContext | undefined {
		return this.tryGetRuleContext(0, ImportInterfaceStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_interfaceMemberTempl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInterfaceMemberTempl) {
			listener.enterInterfaceMemberTempl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInterfaceMemberTempl) {
			listener.exitInterfaceMemberTempl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInterfaceMemberTempl) {
			return visitor.visitInterfaceMemberTempl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMemberContext extends ParserRuleContext {
	public interfaceMemberTempl(): InterfaceMemberTemplContext {
		return this.getRuleContext(0, InterfaceMemberTemplContext);
	}
	public preAnnotation(): PreAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PreAnnotationContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FppParser.RULE_interfaceMember; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInterfaceMember) {
			listener.enterInterfaceMember(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInterfaceMember) {
			listener.exitInterfaceMember(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInterfaceMember) {
			return visitor.visitInterfaceMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceDeclContext extends ParserRuleContext {
	public _name!: Token;
	public INTERFACE(): TerminalNode { return this.getToken(FppParser.INTERFACE, 0); }
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
	public interfaceMember(): InterfaceMemberContext[];
	public interfaceMember(i: number): InterfaceMemberContext;
	public interfaceMember(i?: number): InterfaceMemberContext | InterfaceMemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceMemberContext);
		} else {
			return this.getRuleContext(i, InterfaceMemberContext);
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
	public get ruleIndex(): number { return FppParser.RULE_interfaceDecl; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterInterfaceDecl) {
			listener.enterInterfaceDecl(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitInterfaceDecl) {
			listener.exitInterfaceDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitInterfaceDecl) {
			return visitor.visitInterfaceDecl(this);
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
	public INTERFACE(): TerminalNode | undefined { return this.tryGetToken(FppParser.INTERFACE, 0); }
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
	public interfaceDecl(): InterfaceDeclContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclContext);
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
	public NL(): TerminalNode | undefined { return this.tryGetToken(FppParser.NL, 0); }
	public postAnnotation(): PostAnnotationContext | undefined {
		return this.tryGetRuleContext(0, PostAnnotationContext);
	}
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
	public scalarExpr(): ScalarExprContext[];
	public scalarExpr(i: number): ScalarExprContext;
	public scalarExpr(i?: number): ScalarExprContext | ScalarExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ScalarExprContext);
		} else {
			return this.getRuleContext(i, ScalarExprContext);
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


export class ScalarExprContext extends ParserRuleContext {
	public _left!: ScalarExprContext;
	public _unary!: ScalarExprContext;
	public _p!: ScalarExprContext;
	public _op!: Token;
	public _right!: ScalarExprContext;
	public scalarExpr(): ScalarExprContext[];
	public scalarExpr(i: number): ScalarExprContext;
	public scalarExpr(i?: number): ScalarExprContext | ScalarExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ScalarExprContext);
		} else {
			return this.getRuleContext(i, ScalarExprContext);
		}
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
	public get ruleIndex(): number { return FppParser.RULE_scalarExpr; }
	// @Override
	public enterRule(listener: FppListener): void {
		if (listener.enterScalarExpr) {
			listener.enterScalarExpr(this);
		}
	}
	// @Override
	public exitRule(listener: FppListener): void {
		if (listener.exitScalarExpr) {
			listener.exitScalarExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FppVisitor<Result>): Result {
		if (visitor.visitScalarExpr) {
			return visitor.visitScalarExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public arrayExpr(): ArrayExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayExprContext);
	}
	public structExpr(): StructExprContext | undefined {
		return this.tryGetRuleContext(0, StructExprContext);
	}
	public scalarExpr(): ScalarExprContext | undefined {
		return this.tryGetRuleContext(0, ScalarExprContext);
	}
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
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.NL);
		} else {
			return this.getToken(FppParser.NL, i);
		}
	}
	public ANNOTATION(): TerminalNode[];
	public ANNOTATION(i: number): TerminalNode;
	public ANNOTATION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FppParser.ANNOTATION);
		} else {
			return this.getToken(FppParser.ANNOTATION, i);
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


