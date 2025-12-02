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
	public static readonly DICTIONARY = 57;
	public static readonly DO = 58;
	public static readonly DROP = 59;
	public static readonly ELSE = 60;
	public static readonly ENTER = 61;
	public static readonly ENTRY = 62;
	public static readonly ENUM = 63;
	public static readonly EVENT = 64;
	public static readonly EXIT = 65;
	public static readonly FALSE = 66;
	public static readonly FATAL = 67;
	public static readonly FORMAT = 68;
	public static readonly GET = 69;
	public static readonly GROUP = 70;
	public static readonly GUARD = 71;
	public static readonly GUARDED = 72;
	public static readonly HEALTH = 73;
	public static readonly HIGH = 74;
	public static readonly HOOK = 75;
	public static readonly ID = 76;
	public static readonly IF = 77;
	public static readonly IMPORT = 78;
	public static readonly INCLUDE = 79;
	public static readonly INITIAL = 80;
	public static readonly INPUT = 81;
	public static readonly INSTANCE = 82;
	public static readonly INTERFACE = 83;
	public static readonly INTERNAL = 84;
	public static readonly LOCATE = 85;
	public static readonly LOW = 86;
	public static readonly MACHINE = 87;
	public static readonly MATCH = 88;
	public static readonly MODULE = 89;
	public static readonly OMIT = 90;
	public static readonly ON = 91;
	public static readonly OPCODE = 92;
	public static readonly ORANGE = 93;
	public static readonly OUTPUT = 94;
	public static readonly PACKET = 95;
	public static readonly PACKETS = 96;
	public static readonly PARAM = 97;
	public static readonly PASSIVE = 98;
	public static readonly PHASE = 99;
	public static readonly PORT = 100;
	public static readonly PRIORITY = 101;
	public static readonly PRIVATE = 102;
	public static readonly PRODUCT = 103;
	public static readonly QUEUE = 104;
	public static readonly QUEUED = 105;
	public static readonly RECORD = 106;
	public static readonly RECV = 107;
	public static readonly RED = 108;
	public static readonly REF = 109;
	public static readonly REG = 110;
	public static readonly REQUEST = 111;
	public static readonly RESP = 112;
	public static readonly SAVE = 113;
	public static readonly SEND = 114;
	public static readonly SERIAL = 115;
	public static readonly SET = 116;
	public static readonly SEVERITY = 117;
	public static readonly SIGNAL = 118;
	public static readonly SIZE = 119;
	public static readonly STACK = 120;
	public static readonly STATE = 121;
	public static readonly STRING = 122;
	public static readonly STRUCT = 123;
	public static readonly SYNC = 124;
	public static readonly TELEMETRY = 125;
	public static readonly TEXT = 126;
	public static readonly THROTTLE = 127;
	public static readonly TIME = 128;
	public static readonly TOPOLOGY = 129;
	public static readonly TRUE = 130;
	public static readonly TYPE = 131;
	public static readonly UNMATCHED = 132;
	public static readonly UPDATE = 133;
	public static readonly WARNING = 134;
	public static readonly WITH = 135;
	public static readonly YELLOW = 136;
	public static readonly IDENTIFIER = 137;
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
		"'container'", "'cpu'", "'default'", "'diagnostic'", "'dictionary'", "'do'", 
		"'drop'", "'else'", "'enter'", "'entry'", "'enum'", "'event'", "'exit'", 
		"'false'", "'fatal'", "'format'", "'get'", "'group'", "'guard'", "'guarded'", 
		"'health'", "'high'", "'hook'", "'id'", "'if'", "'import'", "'include'", 
		"'initial'", "'input'", "'instance'", "'interface'", "'internal'", "'locate'", 
		"'low'", "'machine'", "'match'", "'module'", "'omit'", "'on'", "'opcode'", 
		"'orange'", "'output'", "'packet'", "'packets'", "'param'", "'passive'", 
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
		"CPU", "DEFAULT", "DIAGNOSTIC", "DICTIONARY", "DO", "DROP", "ELSE", "ENTER", 
		"ENTRY", "ENUM", "EVENT", "EXIT", "FALSE", "FATAL", "FORMAT", "GET", "GROUP", 
		"GUARD", "GUARDED", "HEALTH", "HIGH", "HOOK", "ID", "IF", "IMPORT", "INCLUDE", 
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
			while (_la === FppParser.ANNOTATION || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (FppParser.ACTIVE - 37)) | (1 << (FppParser.ARRAY - 37)) | (1 << (FppParser.CONSTANT - 37)) | (1 << (FppParser.DICTIONARY - 37)) | (1 << (FppParser.ENUM - 37)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (FppParser.INCLUDE - 79)) | (1 << (FppParser.INSTANCE - 79)) | (1 << (FppParser.INTERFACE - 79)) | (1 << (FppParser.LOCATE - 79)) | (1 << (FppParser.MODULE - 79)) | (1 << (FppParser.PASSIVE - 79)) | (1 << (FppParser.PORT - 79)) | (1 << (FppParser.QUEUED - 79)))) !== 0) || ((((_la - 121)) & ~0x1F) === 0 && ((1 << (_la - 121)) & ((1 << (FppParser.STATE - 121)) | (1 << (FppParser.STRUCT - 121)) | (1 << (FppParser.TOPOLOGY - 121)) | (1 << (FppParser.TYPE - 121)))) !== 0)) {
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
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONNECTIONS - 21)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (FppParser.EVENT - 64)) | (1 << (FppParser.HEALTH - 64)) | (1 << (FppParser.IMPORT - 64)) | (1 << (FppParser.INCLUDE - 64)) | (1 << (FppParser.INSTANCE - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (FppParser.PARAM - 97)) | (1 << (FppParser.PRIVATE - 97)) | (1 << (FppParser.TELEMETRY - 97)) | (1 << (FppParser.TEXT - 97)) | (1 << (FppParser.TIME - 97)))) !== 0)) {
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
			while (_la === FppParser.ANNOTATION || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (FppParser.ARRAY - 40)) | (1 << (FppParser.ASYNC - 40)) | (1 << (FppParser.COMMAND - 40)) | (1 << (FppParser.CONSTANT - 40)) | (1 << (FppParser.DICTIONARY - 40)) | (1 << (FppParser.ENUM - 40)) | (1 << (FppParser.EVENT - 40)))) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (FppParser.GUARDED - 72)) | (1 << (FppParser.IMPORT - 72)) | (1 << (FppParser.INCLUDE - 72)) | (1 << (FppParser.INTERNAL - 72)) | (1 << (FppParser.MATCH - 72)) | (1 << (FppParser.OUTPUT - 72)) | (1 << (FppParser.PARAM - 72)) | (1 << (FppParser.PRODUCT - 72)))) !== 0) || ((((_la - 121)) & ~0x1F) === 0 && ((1 << (_la - 121)) & ((1 << (FppParser.STATE - 121)) | (1 << (FppParser.STRUCT - 121)) | (1 << (FppParser.SYNC - 121)) | (1 << (FppParser.TELEMETRY - 121)) | (1 << (FppParser.TEXT - 121)) | (1 << (FppParser.TIME - 121)) | (1 << (FppParser.TYPE - 121)))) !== 0)) {
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
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 288;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DICTIONARY) {
				{
				this.state = 287;
				this.match(FppParser.DICTIONARY);
				}
			}

			this.state = 290;
			this.match(FppParser.TYPE);
			this.state = 291;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 292;
			this.match(FppParser.T__0);
			this.state = 293;
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
			this.state = 297;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 295;
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
				this.state = 296;
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
			this.state = 300;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DICTIONARY) {
				{
				this.state = 299;
				this.match(FppParser.DICTIONARY);
				}
			}

			this.state = 302;
			this.match(FppParser.ARRAY);
			this.state = 303;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 304;
			this.match(FppParser.T__0);
			this.state = 305;
			this.match(FppParser.T__1);
			this.state = 306;
			_localctx._size = this.expr();
			this.state = 307;
			this.match(FppParser.T__2);
			this.state = 308;
			_localctx._type = this.typeName();
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 309;
				this.match(FppParser.DEFAULT);
				this.state = 310;
				_localctx._default_ = this.arrayDefault();
				}
			}

			this.state = 315;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 313;
				this.match(FppParser.FORMAT);
				this.state = 314;
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
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DICTIONARY) {
				{
				this.state = 317;
				this.match(FppParser.DICTIONARY);
				}
			}

			this.state = 320;
			this.match(FppParser.CONSTANT);
			this.state = 321;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 322;
			this.match(FppParser.T__0);
			this.state = 323;
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
			this.state = 325;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 326;
			this.match(FppParser.T__3);
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 327;
				this.match(FppParser.T__1);
				this.state = 328;
				_localctx._size = this.expr();
				this.state = 329;
				this.match(FppParser.T__2);
				}
			}

			this.state = 333;
			_localctx._type = this.typeName();
			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 334;
				this.match(FppParser.FORMAT);
				this.state = 335;
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
			this.state = 339;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 338;
				this.preAnnotation();
				}
			}

			this.state = 341;
			this.structMember();
			this.state = 347;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 343;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 342;
					this.match(FppParser.T__4);
					}
				}

				this.state = 345;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 346;
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
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 349;
				this.preAnnotation();
				}
			}

			this.state = 352;
			this.structMember();
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 354;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 353;
					this.match(FppParser.T__4);
					}
				}

				this.state = 356;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 357;
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
			this.state = 361;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DICTIONARY) {
				{
				this.state = 360;
				this.match(FppParser.DICTIONARY);
				}
			}

			this.state = 363;
			this.match(FppParser.STRUCT);
			this.state = 364;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 365;
			this.match(FppParser.T__5);
			this.state = 369;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 366;
				this.match(FppParser.NL);
				}
				}
				this.state = 371;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 375;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 372;
						this.structMemberN();
						}
						}
					}
					this.state = 377;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
				}
				this.state = 378;
				this.structMemberL();
				}
			}

			this.state = 381;
			this.match(FppParser.T__6);
			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 382;
				this.match(FppParser.DEFAULT);
				this.state = 383;
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
			this.state = 386;
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
			this.state = 388;
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
			this.state = 390;
			_localctx._kind = this.commandKind();
			this.state = 391;
			this.match(FppParser.COMMAND);
			this.state = 392;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 394;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 393;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 398;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.OPCODE) {
				{
				this.state = 396;
				this.match(FppParser.OPCODE);
				this.state = 397;
				_localctx._opcode = this.expr();
				}
			}

			this.state = 402;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 400;
				this.match(FppParser.PRIORITY);
				this.state = 401;
				_localctx._priority = this.expr();
				}
			}

			this.state = 405;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 404;
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
			this.state = 407;
			this.match(FppParser.PARAM);
			this.state = 408;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 409;
			this.match(FppParser.T__3);
			this.state = 410;
			_localctx._type = this.typeName();
			this.state = 413;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 411;
				this.match(FppParser.DEFAULT);
				this.state = 412;
				_localctx._default_ = this.expr();
				}
			}

			this.state = 417;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 415;
				this.match(FppParser.ID);
				this.state = 416;
				_localctx._id = this.expr();
				}
			}

			this.state = 422;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SET) {
				{
				this.state = 419;
				this.match(FppParser.SET);
				this.state = 420;
				this.match(FppParser.OPCODE);
				this.state = 421;
				_localctx._setOpcode = this.expr();
				}
			}

			this.state = 427;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SAVE) {
				{
				this.state = 424;
				this.match(FppParser.SAVE);
				this.state = 425;
				this.match(FppParser.OPCODE);
				this.state = 426;
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
			this.state = 436;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ASYNC:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 429;
				this.match(FppParser.ASYNC);
				this.state = 430;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.GUARDED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 431;
				this.match(FppParser.GUARDED);
				this.state = 432;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.SYNC:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 433;
				this.match(FppParser.SYNC);
				this.state = 434;
				this.match(FppParser.INPUT);
				}
				break;
			case FppParser.OUTPUT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 435;
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
			this.state = 465;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 438;
				this.match(FppParser.COMMAND);
				this.state = 439;
				this.match(FppParser.RECV);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 440;
				this.match(FppParser.COMMAND);
				this.state = 441;
				this.match(FppParser.REG);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 442;
				this.match(FppParser.COMMAND);
				this.state = 443;
				this.match(FppParser.RESP);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 444;
				this.match(FppParser.EVENT);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 445;
				this.match(FppParser.PARAM);
				this.state = 446;
				this.match(FppParser.GET);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 447;
				this.match(FppParser.PARAM);
				this.state = 448;
				this.match(FppParser.SET);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 449;
				this.match(FppParser.TELEMETRY);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 450;
				this.match(FppParser.TEXT);
				this.state = 451;
				this.match(FppParser.EVENT);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 452;
				this.match(FppParser.TIME);
				this.state = 453;
				this.match(FppParser.GET);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 454;
				this.match(FppParser.PRODUCT);
				this.state = 455;
				this.match(FppParser.GET);
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 456;
				this.match(FppParser.PRODUCT);
				this.state = 457;
				this.match(FppParser.REQUEST);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 459;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.ASYNC || _la === FppParser.GUARDED || _la === FppParser.SYNC) {
					{
					this.state = 458;
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

				this.state = 461;
				this.match(FppParser.PRODUCT);
				this.state = 462;
				this.match(FppParser.RECV);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 463;
				this.match(FppParser.PRODUCT);
				this.state = 464;
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
			this.state = 469;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.SERIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 467;
				this.match(FppParser.SERIAL);
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 468;
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
			this.state = 471;
			_localctx._kind = this.generalPortKind();
			this.state = 472;
			this.match(FppParser.PORT);
			this.state = 473;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 474;
			this.match(FppParser.T__3);
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 475;
				this.match(FppParser.T__1);
				this.state = 476;
				_localctx._n = this.expr();
				this.state = 477;
				this.match(FppParser.T__2);
				}
			}

			this.state = 481;
			_localctx._type = this.generalPortInstanceType();
			this.state = 484;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 482;
				this.match(FppParser.PRIORITY);
				this.state = 483;
				_localctx._priority = this.expr();
				}
			}

			this.state = 487;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 486;
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
			this.state = 489;
			this.specialPortKind();
			this.state = 490;
			this.match(FppParser.PORT);
			this.state = 491;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 494;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 492;
				this.match(FppParser.PRIORITY);
				this.state = 493;
				_localctx._priority = this.expr();
				}
			}

			this.state = 497;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 496;
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
			this.state = 499;
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
			this.state = 501;
			_localctx._kind = this.telemetryLimitKind();
			this.state = 502;
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
			this.state = 504;
			this.match(FppParser.T__5);
			this.state = 508;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 505;
				this.match(FppParser.NL);
				}
				}
				this.state = 510;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 523;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ORANGE || _la === FppParser.RED || _la === FppParser.YELLOW) {
				{
				this.state = 511;
				this.telemetryLimitExpr();
				this.state = 517;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 512;
						this.commaDelim();
						this.state = 513;
						this.telemetryLimitExpr();
						}
						}
					}
					this.state = 519;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 520;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 525;
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
			this.state = 530;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.ALWAYS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 527;
				this.match(FppParser.ALWAYS);
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 528;
				this.match(FppParser.ON);
				this.state = 529;
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
			this.state = 532;
			this.match(FppParser.TELEMETRY);
			this.state = 533;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 534;
			this.match(FppParser.T__3);
			this.state = 535;
			_localctx._type = this.typeName();
			this.state = 538;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 536;
				this.match(FppParser.ID);
				this.state = 537;
				_localctx._id = this.expr();
				}
			}

			this.state = 542;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.UPDATE) {
				{
				this.state = 540;
				this.match(FppParser.UPDATE);
				this.state = 541;
				_localctx._update = this.telemetryUpdate();
				}
			}

			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.FORMAT) {
				{
				this.state = 544;
				this.match(FppParser.FORMAT);
				this.state = 545;
				_localctx._format = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 550;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.LOW) {
				{
				this.state = 548;
				this.match(FppParser.LOW);
				this.state = 549;
				_localctx._low = this.telemetryLimit();
				}
			}

			this.state = 554;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.HIGH) {
				{
				this.state = 552;
				this.match(FppParser.HIGH);
				this.state = 553;
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
			this.state = 556;
			this.match(FppParser.ACTION);
			this.state = 557;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 560;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 558;
				this.match(FppParser.T__3);
				this.state = 559;
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
			this.state = 562;
			this.match(FppParser.CHOICE);
			this.state = 563;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 564;
			this.match(FppParser.T__5);
			this.state = 568;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 565;
				this.match(FppParser.NL);
				}
				}
				this.state = 570;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 571;
			this.match(FppParser.IF);
			this.state = 572;
			_localctx._guard = this.match(FppParser.IDENTIFIER);
			this.state = 573;
			_localctx._then = this.transitionExpr();
			this.state = 574;
			this.match(FppParser.ELSE);
			this.state = 575;
			_localctx._else = this.transitionExpr();
			this.state = 579;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 576;
				this.match(FppParser.NL);
				}
				}
				this.state = 581;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 582;
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
			this.state = 584;
			this.match(FppParser.GUARD);
			this.state = 585;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 588;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 586;
				this.match(FppParser.T__3);
				this.state = 587;
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
			this.state = 590;
			this.match(FppParser.SIGNAL);
			this.state = 591;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 594;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 592;
				this.match(FppParser.T__3);
				this.state = 593;
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
			this.state = 596;
			this.match(FppParser.DO);
			this.state = 597;
			this.match(FppParser.T__5);
			this.state = 601;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 63, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 598;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 603;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 63, this._ctx);
			}
			this.state = 613;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 604;
				this.match(FppParser.IDENTIFIER);
				this.state = 610;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 605;
						this.commaDelim();
						this.state = 606;
						this.match(FppParser.IDENTIFIER);
						}
						}
					}
					this.state = 612;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
				}
				}
			}

			this.state = 616;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__4 || _la === FppParser.NL) {
				{
				this.state = 615;
				this.commaDelim();
				}
			}

			this.state = 618;
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
			this.state = 621;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DO) {
				{
				this.state = 620;
				_localctx._do = this.doExpr();
				}
			}

			this.state = 623;
			this.match(FppParser.ENTER);
			this.state = 624;
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
			this.state = 626;
			this.match(FppParser.INITIAL);
			this.state = 627;
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
			this.state = 631;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 629;
				this.transitionExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 630;
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
			this.state = 633;
			this.match(FppParser.ON);
			this.state = 634;
			_localctx._signal = this.match(FppParser.IDENTIFIER);
			this.state = 637;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IF) {
				{
				this.state = 635;
				this.match(FppParser.IF);
				this.state = 636;
				_localctx._guard = this.match(FppParser.IDENTIFIER);
				}
			}

			this.state = 639;
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
			this.state = 641;
			this.match(FppParser.ENTRY);
			this.state = 642;
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
			this.state = 644;
			this.match(FppParser.EXIT);
			this.state = 645;
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
			this.state = 653;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 647;
				this.initialTransition();
				}
				break;
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 648;
				this.choiceDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 649;
				this.stateDef();
				}
				break;
			case FppParser.ON:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 650;
				this.stateTransition();
				}
				break;
			case FppParser.ENTRY:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 651;
				this.stateEntry();
				}
				break;
			case FppParser.EXIT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 652;
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
			this.state = 656;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 655;
				this.preAnnotation();
				}
			}

			this.state = 658;
			this.stateMemberTempl();
			this.state = 660;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				{
				this.state = 659;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 663;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 662;
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
			this.state = 665;
			this.match(FppParser.STATE);
			this.state = 666;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 689;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 667;
				this.match(FppParser.T__5);
				this.state = 671;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 74, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 668;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 673;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 74, this._ctx);
				}
				this.state = 679;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.CHOICE || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & ((1 << (FppParser.ENTRY - 62)) | (1 << (FppParser.EXIT - 62)) | (1 << (FppParser.INITIAL - 62)) | (1 << (FppParser.ON - 62)))) !== 0) || _la === FppParser.STATE) {
					{
					{
					this.state = 674;
					this.stateMember();
					this.state = 675;
					this.semiDelim();
					}
					}
					this.state = 681;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 685;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 682;
					this.match(FppParser.NL);
					}
					}
					this.state = 687;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 688;
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
			this.state = 697;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.CHOICE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 691;
				this.choiceDef();
				}
				break;
			case FppParser.GUARD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 692;
				this.guardDef();
				}
				break;
			case FppParser.INITIAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 693;
				this.initialTransition();
				}
				break;
			case FppParser.SIGNAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 694;
				this.signalDef();
				}
				break;
			case FppParser.STATE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 695;
				this.stateDef();
				}
				break;
			case FppParser.ACTION:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 696;
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
			this.state = 700;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 699;
				this.preAnnotation();
				}
			}

			this.state = 702;
			this.stateMachineMemberTempl();
			this.state = 704;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 80, this._ctx) ) {
			case 1:
				{
				this.state = 703;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 707;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 706;
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
			this.state = 709;
			this.match(FppParser.STATE);
			this.state = 710;
			this.match(FppParser.MACHINE);
			this.state = 711;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 734;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 712;
				this.match(FppParser.T__5);
				this.state = 716;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 713;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 718;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
				}
				this.state = 724;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ACTION - 21)) | (1 << (FppParser.CHOICE - 21)))) !== 0) || _la === FppParser.GUARD || _la === FppParser.INITIAL || _la === FppParser.SIGNAL || _la === FppParser.STATE) {
					{
					{
					this.state = 719;
					this.stateMachineMember();
					this.state = 720;
					this.semiDelim();
					}
					}
					this.state = 726;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 730;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 727;
					this.match(FppParser.NL);
					}
					}
					this.state = 732;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 733;
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
			this.state = 736;
			this.match(FppParser.STATE);
			this.state = 737;
			this.match(FppParser.MACHINE);
			this.state = 738;
			this.match(FppParser.INSTANCE);
			this.state = 739;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 740;
			this.match(FppParser.T__3);
			this.state = 741;
			_localctx._stateMachine = this.qualIdent();
			this.state = 744;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 742;
				this.match(FppParser.PRIORITY);
				this.state = 743;
				_localctx._priority = this.expr();
				}
			}

			this.state = 747;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 746;
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
			this.state = 749;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 752;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__0) {
				{
				this.state = 750;
				this.match(FppParser.T__0);
				this.state = 751;
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
			this.state = 755;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 754;
				this.preAnnotation();
				}
			}

			this.state = 757;
			this.enumMember();
			this.state = 768;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 93, this._ctx) ) {
			case 1:
				{
				this.state = 759;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 758;
					this.match(FppParser.T__4);
					}
				}

				this.state = 765;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 92, this._ctx) ) {
				case 1:
					{
					this.state = 762;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === FppParser.NL) {
						{
						this.state = 761;
						this.match(FppParser.NL);
						}
					}

					this.state = 764;
					this.postAnnotation();
					}
					break;
				}
				}
				break;

			case 2:
				{
				this.state = 767;
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
			this.state = 771;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 770;
				this.preAnnotation();
				}
			}

			this.state = 773;
			this.enumMember();
			this.state = 784;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 98, this._ctx) ) {
			case 1:
				{
				this.state = 775;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 774;
					this.match(FppParser.T__4);
					}
				}

				this.state = 781;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 97, this._ctx) ) {
				case 1:
					{
					this.state = 778;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === FppParser.NL) {
						{
						this.state = 777;
						this.match(FppParser.NL);
						}
					}

					this.state = 780;
					this.postAnnotation();
					}
					break;
				}
				}
				break;

			case 2:
				{
				this.state = 783;
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
			this.state = 787;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DICTIONARY) {
				{
				this.state = 786;
				this.match(FppParser.DICTIONARY);
				}
			}

			this.state = 789;
			this.match(FppParser.ENUM);
			this.state = 790;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 793;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__3) {
				{
				this.state = 791;
				this.match(FppParser.T__3);
				this.state = 792;
				_localctx._type = this.typeName();
				}
			}

			this.state = 795;
			this.match(FppParser.T__5);
			this.state = 799;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 101, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 796;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 801;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 101, this._ctx);
			}
			this.state = 809;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				this.state = 805;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 102, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 802;
						this.enumMemberN();
						}
						}
					}
					this.state = 807;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 102, this._ctx);
				}
				this.state = 808;
				this.enumMemberL();
				}
			}

			this.state = 814;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 811;
				this.match(FppParser.NL);
				}
				}
				this.state = 816;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 817;
			this.match(FppParser.T__6);
			this.state = 820;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 818;
				this.match(FppParser.DEFAULT);
				this.state = 819;
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
			this.state = 833;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 106, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 822;
				this.match(FppParser.ACTIVITY);
				this.state = 823;
				this.match(FppParser.HIGH);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 824;
				this.match(FppParser.ACTIVITY);
				this.state = 825;
				this.match(FppParser.LOW);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 826;
				this.match(FppParser.COMMAND);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 827;
				this.match(FppParser.DIAGNOSTIC);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 828;
				this.match(FppParser.FATAL);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 829;
				this.match(FppParser.WARNING);
				this.state = 830;
				this.match(FppParser.HIGH);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 831;
				this.match(FppParser.WARNING);
				this.state = 832;
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
			this.state = 835;
			this.match(FppParser.EVENT);
			this.state = 836;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 838;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 837;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 840;
			this.match(FppParser.SEVERITY);
			this.state = 841;
			this.eventSeverity();
			this.state = 844;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 842;
				this.match(FppParser.ID);
				this.state = 843;
				_localctx._id = this.expr();
				}
			}

			this.state = 846;
			this.match(FppParser.FORMAT);
			this.state = 847;
			_localctx._format = this.match(FppParser.LIT_STRING);
			this.state = 850;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.THROTTLE) {
				{
				this.state = 848;
				this.match(FppParser.THROTTLE);
				this.state = 849;
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
			this.state = 852;
			this.match(FppParser.INCLUDE);
			this.state = 853;
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
			this.state = 855;
			this.match(FppParser.MATCH);
			this.state = 856;
			_localctx._match = this.match(FppParser.IDENTIFIER);
			this.state = 857;
			this.match(FppParser.WITH);
			this.state = 858;
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
			this.state = 860;
			this.match(FppParser.INTERNAL);
			this.state = 861;
			this.match(FppParser.PORT);
			this.state = 862;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 864;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 863;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 868;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 866;
				this.match(FppParser.PRIORITY);
				this.state = 867;
				_localctx._priority = this.expr();
				}
			}

			this.state = 871;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (FppParser.ASSERT - 41)) | (1 << (FppParser.BLOCK - 41)) | (1 << (FppParser.DROP - 41)))) !== 0) || _la === FppParser.HOOK) {
				{
				this.state = 870;
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
			this.state = 873;
			this.match(FppParser.PRODUCT);
			this.state = 874;
			this.match(FppParser.RECORD);
			this.state = 875;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 876;
			this.match(FppParser.T__3);
			this.state = 877;
			_localctx._fppType = this.typeName();
			this.state = 879;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ARRAY) {
				{
				this.state = 878;
				this.match(FppParser.ARRAY);
				}
			}

			this.state = 883;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 881;
				this.match(FppParser.ID);
				this.state = 882;
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
			this.state = 885;
			this.match(FppParser.PRODUCT);
			this.state = 886;
			this.match(FppParser.CONTAINER);
			this.state = 887;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 890;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ID) {
				{
				this.state = 888;
				this.match(FppParser.ID);
				this.state = 889;
				_localctx._id = this.expr();
				}
			}

			this.state = 895;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.DEFAULT) {
				{
				this.state = 892;
				this.match(FppParser.DEFAULT);
				this.state = 893;
				this.match(FppParser.PRIORITY);
				this.state = 894;
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
			this.state = 898;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 897;
				this.preAnnotation();
				}
			}

			this.state = 900;
			this.match(FppParser.PHASE);
			this.state = 901;
			_localctx._phaseExpr = this.expr();
			this.state = 902;
			_localctx._code = this.match(FppParser.LIT_STRING);
			this.state = 904;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 118, this._ctx) ) {
			case 1:
				{
				this.state = 903;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 907;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 906;
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
			this.state = 909;
			this.match(FppParser.INSTANCE);
			this.state = 910;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 911;
			this.match(FppParser.T__3);
			this.state = 912;
			_localctx._fppType = this.qualIdent();
			this.state = 913;
			this.match(FppParser.BASE);
			this.state = 914;
			this.match(FppParser.ID);
			this.state = 915;
			_localctx._base_id = this.expr();
			this.state = 918;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.TYPE) {
				{
				this.state = 916;
				this.match(FppParser.TYPE);
				this.state = 917;
				_localctx._cppType = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 922;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.AT) {
				{
				this.state = 920;
				this.match(FppParser.AT);
				this.state = 921;
				_localctx._at = this.match(FppParser.LIT_STRING);
				}
			}

			this.state = 927;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.QUEUE) {
				{
				this.state = 924;
				this.match(FppParser.QUEUE);
				this.state = 925;
				this.match(FppParser.SIZE);
				this.state = 926;
				_localctx._queueSize = this.expr();
				}
			}

			this.state = 932;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.STACK) {
				{
				this.state = 929;
				this.match(FppParser.STACK);
				this.state = 930;
				this.match(FppParser.SIZE);
				this.state = 931;
				_localctx._stackSize = this.expr();
				}
			}

			this.state = 936;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIORITY) {
				{
				this.state = 934;
				this.match(FppParser.PRIORITY);
				this.state = 935;
				_localctx._priority = this.expr();
				}
			}

			this.state = 940;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.CPU) {
				{
				this.state = 938;
				this.match(FppParser.CPU);
				this.state = 939;
				_localctx._cpu = this.expr();
				}
			}

			this.state = 964;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 942;
				this.match(FppParser.T__5);
				this.state = 946;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 126, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 943;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 948;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 126, this._ctx);
				}
				this.state = 954;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.PHASE) {
					{
					{
					this.state = 949;
					this.initSpecifier();
					this.state = 950;
					this.semiDelim();
					}
					}
					this.state = 956;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 960;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 957;
					this.match(FppParser.NL);
					}
					}
					this.state = 962;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 963;
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
			this.state = 966;
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
			this.state = 988;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 130, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 968;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 969;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 970;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 971;
				this.constantDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 972;
				this.structDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 973;
				this.commandDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 974;
				this.importInterfaceStmt();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 975;
				this.paramDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 976;
				this.generalPortInstanceDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 977;
				this.specialPortInstanceDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 978;
				this.telemetryChannelDecl();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 979;
				this.enumDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 980;
				this.eventDecl();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 981;
				this.includeStmt();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 982;
				this.internalPortDecl();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 983;
				this.matchStmt();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 984;
				this.recordSpecifierDecl();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 985;
				this.containerSpecifierDecl();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 986;
				this.stateMachineInstance();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 987;
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
			this.state = 991;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 990;
				this.preAnnotation();
				}
			}

			this.state = 993;
			this.componentMemberTempl();
			this.state = 995;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 132, this._ctx) ) {
			case 1:
				{
				this.state = 994;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 998;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 997;
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
			this.state = 1000;
			_localctx._kind = this.componentKind();
			this.state = 1001;
			this.match(FppParser.COMPONENT);
			this.state = 1002;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1003;
			this.match(FppParser.T__5);
			this.state = 1007;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 134, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1004;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1009;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 134, this._ctx);
			}
			this.state = 1015;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (FppParser.ARRAY - 40)) | (1 << (FppParser.ASYNC - 40)) | (1 << (FppParser.COMMAND - 40)) | (1 << (FppParser.CONSTANT - 40)) | (1 << (FppParser.DICTIONARY - 40)) | (1 << (FppParser.ENUM - 40)) | (1 << (FppParser.EVENT - 40)))) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & ((1 << (FppParser.GUARDED - 72)) | (1 << (FppParser.IMPORT - 72)) | (1 << (FppParser.INCLUDE - 72)) | (1 << (FppParser.INTERNAL - 72)) | (1 << (FppParser.MATCH - 72)) | (1 << (FppParser.OUTPUT - 72)) | (1 << (FppParser.PARAM - 72)) | (1 << (FppParser.PRODUCT - 72)))) !== 0) || ((((_la - 121)) & ~0x1F) === 0 && ((1 << (_la - 121)) & ((1 << (FppParser.STATE - 121)) | (1 << (FppParser.STRUCT - 121)) | (1 << (FppParser.SYNC - 121)) | (1 << (FppParser.TELEMETRY - 121)) | (1 << (FppParser.TEXT - 121)) | (1 << (FppParser.TIME - 121)) | (1 << (FppParser.TYPE - 121)))) !== 0)) {
				{
				{
				this.state = 1010;
				this.componentMember();
				this.state = 1011;
				this.semiDelim();
				}
				}
				this.state = 1017;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1021;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1018;
				this.match(FppParser.NL);
				}
				}
				this.state = 1023;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1024;
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
			this.state = 1026;
			this.match(FppParser.PORT);
			this.state = 1027;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1029;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__8) {
				{
				this.state = 1028;
				_localctx._params = this.formalParameterList();
				}
			}

			this.state = 1033;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__7) {
				{
				this.state = 1031;
				this.match(FppParser.T__7);
				this.state = 1032;
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
			this.state = 1036;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.PRIVATE) {
				{
				this.state = 1035;
				this.match(FppParser.PRIVATE);
				}
			}

			this.state = 1038;
			this.match(FppParser.INSTANCE);
			this.state = 1039;
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
			this.state = 1041;
			_localctx._node = this.qualIdent();
			this.state = 1046;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__1) {
				{
				this.state = 1042;
				this.match(FppParser.T__1);
				this.state = 1043;
				_localctx._index = this.expr();
				this.state = 1044;
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
			this.state = 1049;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.UNMATCHED) {
				{
				this.state = 1048;
				this.match(FppParser.UNMATCHED);
				}
			}

			this.state = 1051;
			_localctx._source = this.connectionNode();
			this.state = 1052;
			this.match(FppParser.T__7);
			this.state = 1053;
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
			this.state = 1055;
			this.match(FppParser.CONNECTIONS);
			this.state = 1056;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1057;
			this.match(FppParser.T__5);
			this.state = 1061;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 142, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1058;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1063;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 142, this._ctx);
			}
			this.state = 1069;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.UNMATCHED || _la === FppParser.IDENTIFIER) {
				{
				{
				this.state = 1064;
				this.connection();
				this.state = 1065;
				this.commaDelim();
				}
				}
				this.state = 1071;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1075;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1072;
				this.match(FppParser.NL);
				}
				}
				this.state = 1077;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1078;
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
			this.state = 1088;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.COMMAND:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1080;
				this.match(FppParser.COMMAND);
				}
				break;
			case FppParser.EVENT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1081;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.TEXT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1082;
				this.match(FppParser.TEXT);
				this.state = 1083;
				this.match(FppParser.EVENT);
				}
				break;
			case FppParser.HEALTH:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1084;
				this.match(FppParser.HEALTH);
				}
				break;
			case FppParser.PARAM:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1085;
				this.match(FppParser.PARAM);
				}
				break;
			case FppParser.TELEMETRY:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1086;
				this.match(FppParser.TELEMETRY);
				}
				break;
			case FppParser.TIME:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1087;
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
			this.state = 1090;
			this.qualIdent();
			this.state = 1096;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 146, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1091;
					this.commaDelim();
					this.state = 1092;
					this.qualIdent();
					}
					}
				}
				this.state = 1098;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 146, this._ctx);
			}
			this.state = 1100;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 147, this._ctx) ) {
			case 1:
				{
				this.state = 1099;
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
			this.state = 1102;
			_localctx._kind = this.patternKind();
			this.state = 1103;
			this.match(FppParser.CONNECTIONS);
			this.state = 1104;
			this.match(FppParser.INSTANCE);
			this.state = 1105;
			_localctx._target = this.qualIdent();
			this.state = 1122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 1106;
				this.match(FppParser.T__5);
				this.state = 1110;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1107;
					this.match(FppParser.NL);
					}
					}
					this.state = 1112;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1113;
				this.patternGraphSources();
				this.state = 1117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1114;
					this.match(FppParser.NL);
					}
					}
					this.state = 1119;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1120;
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
			this.state = 1124;
			this.match(FppParser.IMPORT);
			this.state = 1125;
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
			this.state = 1127;
			this.match(FppParser.IMPORT);
			this.state = 1128;
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
			this.state = 1131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1130;
				this.preAnnotation();
				}
			}

			this.state = 1133;
			this.qualIdent();
			this.state = 1135;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 152, this._ctx) ) {
			case 1:
				{
				this.state = 1134;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1138;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1137;
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
			this.state = 1140;
			this.match(FppParser.PACKET);
			this.state = 1141;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			{
			this.state = 1142;
			this.match(FppParser.ID);
			this.state = 1143;
			_localctx._id = this.expr();
			}
			this.state = 1145;
			this.match(FppParser.GROUP);
			this.state = 1146;
			_localctx._group = this.expr();
			this.state = 1147;
			this.match(FppParser.T__5);
			this.state = 1151;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 154, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1148;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1153;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 154, this._ctx);
			}
			this.state = 1159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
				{
				{
				this.state = 1154;
				_localctx._packets = this.telemetryChannelIdentifier();
				this.state = 1155;
				this.commaDelim();
				}
				}
				this.state = 1161;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1162;
				this.match(FppParser.NL);
				}
				}
				this.state = 1167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1168;
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
			this.state = 1172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.INCLUDE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1170;
				this.includeStmt();
				}
				break;
			case FppParser.PACKET:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1171;
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
			this.state = 1175;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1174;
				this.preAnnotation();
				}
			}

			this.state = 1177;
			this.telemetryPacketSetMemberTempl();
			this.state = 1179;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 159, this._ctx) ) {
			case 1:
				{
				this.state = 1178;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1182;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1181;
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
			this.state = 1184;
			this.match(FppParser.TELEMETRY);
			this.state = 1185;
			this.match(FppParser.PACKETS);
			this.state = 1186;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.T__5) {
				{
				this.state = 1187;
				this.match(FppParser.T__5);
				this.state = 1191;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 161, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1188;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1193;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 161, this._ctx);
				}
				this.state = 1199;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.INCLUDE || _la === FppParser.PACKET) {
					{
					{
					this.state = 1194;
					this.telemetryPacketSetMember();
					this.state = 1195;
					this.semiDelim();
					}
					}
					this.state = 1201;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1202;
					this.match(FppParser.NL);
					}
					}
					this.state = 1207;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1208;
				this.match(FppParser.T__6);
				}
			}

			this.state = 1234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.OMIT) {
				{
				this.state = 1211;
				this.match(FppParser.OMIT);
				this.state = 1212;
				this.match(FppParser.T__5);
				this.state = 1216;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 165, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1213;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1218;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 165, this._ctx);
				}
				this.state = 1224;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.ANNOTATION || _la === FppParser.IDENTIFIER) {
					{
					{
					this.state = 1219;
					_localctx._omit = this.telemetryChannelIdentifier();
					this.state = 1220;
					this.commaDelim();
					}
					}
					this.state = 1226;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1230;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.NL) {
					{
					{
					this.state = 1227;
					this.match(FppParser.NL);
					}
					}
					this.state = 1232;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1233;
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
			this.state = 1242;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 169, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1236;
				this.componentInstanceSpec();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1237;
				this.directGraphDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1238;
				this.patternGraphStmt();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1239;
				this.importTopologyStmt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1240;
				this.telemetryPacketSetDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1241;
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
			this.state = 1245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1244;
				this.preAnnotation();
				}
			}

			this.state = 1247;
			this.topologyMemberTempl();
			this.state = 1249;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 171, this._ctx) ) {
			case 1:
				{
				this.state = 1248;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1252;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1251;
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
			this.state = 1254;
			this.match(FppParser.TOPOLOGY);
			this.state = 1255;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1256;
			this.match(FppParser.T__5);
			this.state = 1260;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 173, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1257;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1262;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 173, this._ctx);
			}
			this.state = 1268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.COMMAND - 21)) | (1 << (FppParser.CONNECTIONS - 21)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (FppParser.EVENT - 64)) | (1 << (FppParser.HEALTH - 64)) | (1 << (FppParser.IMPORT - 64)) | (1 << (FppParser.INCLUDE - 64)) | (1 << (FppParser.INSTANCE - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (FppParser.PARAM - 97)) | (1 << (FppParser.PRIVATE - 97)) | (1 << (FppParser.TELEMETRY - 97)) | (1 << (FppParser.TEXT - 97)) | (1 << (FppParser.TIME - 97)))) !== 0)) {
				{
				{
				this.state = 1263;
				this.topologyMember();
				this.state = 1264;
				this.semiDelim();
				}
				}
				this.state = 1270;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1271;
				this.match(FppParser.NL);
				}
				}
				this.state = 1276;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1277;
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
			this.state = 1282;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 176, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1279;
				this.generalPortInstanceDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1280;
				this.specialPortInstanceDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1281;
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
			this.state = 1285;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1284;
				this.preAnnotation();
				}
			}

			this.state = 1287;
			this.interfaceMemberTempl();
			this.state = 1289;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 178, this._ctx) ) {
			case 1:
				{
				this.state = 1288;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1292;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1291;
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
			this.state = 1294;
			this.match(FppParser.INTERFACE);
			this.state = 1295;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1296;
			this.match(FppParser.T__5);
			this.state = 1300;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 180, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1297;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1302;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 180, this._ctx);
			}
			this.state = 1308;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (FppParser.ANNOTATION - 21)) | (1 << (FppParser.ASYNC - 21)) | (1 << (FppParser.COMMAND - 21)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (FppParser.EVENT - 64)) | (1 << (FppParser.GUARDED - 64)) | (1 << (FppParser.IMPORT - 64)) | (1 << (FppParser.OUTPUT - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (FppParser.PARAM - 97)) | (1 << (FppParser.PRODUCT - 97)) | (1 << (FppParser.SYNC - 97)) | (1 << (FppParser.TELEMETRY - 97)) | (1 << (FppParser.TEXT - 97)) | (1 << (FppParser.TIME - 97)))) !== 0)) {
				{
				{
				this.state = 1303;
				this.interfaceMember();
				this.state = 1304;
				this.semiDelim();
				}
				}
				this.state = 1310;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1314;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1311;
				this.match(FppParser.NL);
				}
				}
				this.state = 1316;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1317;
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
		let _la: number;
		try {
			this.state = 1334;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 185, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1319;
				this.match(FppParser.INSTANCE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1320;
				this.match(FppParser.COMPONENT);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1322;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.DICTIONARY) {
					{
					this.state = 1321;
					this.match(FppParser.DICTIONARY);
					}
				}

				this.state = 1324;
				this.match(FppParser.CONSTANT);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1325;
				this.match(FppParser.PORT);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1326;
				this.match(FppParser.TOPOLOGY);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1328;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.DICTIONARY) {
					{
					this.state = 1327;
					this.match(FppParser.DICTIONARY);
					}
				}

				this.state = 1330;
				this.match(FppParser.TYPE);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1331;
				this.match(FppParser.STATE);
				this.state = 1332;
				this.match(FppParser.MACHINE);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1333;
				this.match(FppParser.INTERFACE);
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
	public locationStmt(): LocationStmtContext {
		let _localctx: LocationStmtContext = new LocationStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, FppParser.RULE_locationStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1336;
			this.match(FppParser.LOCATE);
			this.state = 1337;
			_localctx._kind = this.locationKind();
			this.state = 1338;
			_localctx._name = this.qualIdent();
			this.state = 1339;
			this.match(FppParser.AT);
			this.state = 1340;
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
			this.state = 1357;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 186, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1342;
				this.abstractTypeDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1343;
				this.aliasTypeDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1344;
				this.arrayDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1345;
				this.componentDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1346;
				this.componentInstanceDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1347;
				this.constantDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1348;
				this.interfaceDecl();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1349;
				this.moduleDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1350;
				this.portDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1351;
				this.structDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1352;
				this.locationStmt();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1353;
				this.enumDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1354;
				this.includeStmt();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 1355;
				this.topologyDecl();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 1356;
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
			this.state = 1360;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1359;
				this.preAnnotation();
				}
			}

			this.state = 1362;
			this.moduleMemberTempl();
			this.state = 1364;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 188, this._ctx) ) {
			case 1:
				{
				this.state = 1363;
				this.match(FppParser.NL);
				}
				break;
			}
			this.state = 1367;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1366;
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
			this.state = 1369;
			this.match(FppParser.MODULE);
			this.state = 1370;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1371;
			this.match(FppParser.T__5);
			this.state = 1375;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 190, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1372;
					this.match(FppParser.NL);
					}
					}
				}
				this.state = 1377;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 190, this._ctx);
			}
			this.state = 1383;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.ANNOTATION || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (FppParser.ACTIVE - 37)) | (1 << (FppParser.ARRAY - 37)) | (1 << (FppParser.CONSTANT - 37)) | (1 << (FppParser.DICTIONARY - 37)) | (1 << (FppParser.ENUM - 37)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (FppParser.INCLUDE - 79)) | (1 << (FppParser.INSTANCE - 79)) | (1 << (FppParser.INTERFACE - 79)) | (1 << (FppParser.LOCATE - 79)) | (1 << (FppParser.MODULE - 79)) | (1 << (FppParser.PASSIVE - 79)) | (1 << (FppParser.PORT - 79)) | (1 << (FppParser.QUEUED - 79)))) !== 0) || ((((_la - 121)) & ~0x1F) === 0 && ((1 << (_la - 121)) & ((1 << (FppParser.STATE - 121)) | (1 << (FppParser.STRUCT - 121)) | (1 << (FppParser.TOPOLOGY - 121)) | (1 << (FppParser.TYPE - 121)))) !== 0)) {
				{
				{
				this.state = 1378;
				this.moduleMember();
				this.state = 1379;
				this.semiDelim();
				}
				}
				this.state = 1385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1389;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1386;
				this.match(FppParser.NL);
				}
				}
				this.state = 1391;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1392;
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
			this.state = 1395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.REF) {
				{
				this.state = 1394;
				this.match(FppParser.REF);
				}
			}

			this.state = 1397;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1398;
			this.match(FppParser.T__3);
			this.state = 1399;
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
			this.state = 1402;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1401;
				this.preAnnotation();
				}
			}

			this.state = 1404;
			this.formalParameter();
			this.state = 1410;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 196, this._ctx) ) {
			case 1:
				{
				this.state = 1406;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1405;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1408;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1409;
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
			this.state = 1413;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION) {
				{
				this.state = 1412;
				this.preAnnotation();
				}
			}

			this.state = 1415;
			this.formalParameter();
			this.state = 1421;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 199, this._ctx) ) {
			case 1:
				{
				this.state = 1417;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4) {
					{
					this.state = 1416;
					this.match(FppParser.T__4);
					}
				}

				this.state = 1419;
				this.postMultiAnnotation();
				}
				break;

			case 2:
				{
				this.state = 1420;
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
			this.state = 1423;
			this.match(FppParser.T__8);
			this.state = 1427;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1424;
				this.match(FppParser.NL);
				}
				}
				this.state = 1429;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1437;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.ANNOTATION || _la === FppParser.REF || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1433;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 201, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1430;
						this.formalParameterN();
						}
						}
					}
					this.state = 1435;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 201, this._ctx);
				}
				this.state = 1436;
				this.formalParamaterL();
				}
			}

			this.state = 1439;
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
			this.state = 1441;
			this.match(FppParser.IDENTIFIER);
			this.state = 1446;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 203, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1442;
					this.match(FppParser.T__10);
					this.state = 1443;
					this.match(FppParser.IDENTIFIER);
					}
					}
				}
				this.state = 1448;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 203, this._ctx);
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
			this.state = 1449;
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
			this.state = 1451;
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
			this.state = 1453;
			this.match(FppParser.STRING);
			this.state = 1456;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.SIZE) {
				{
				this.state = 1454;
				this.match(FppParser.SIZE);
				this.state = 1455;
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
			this.state = 1461;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1458;
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
				this.state = 1459;
				this.primitiveType();
				}
				break;
			case FppParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1460;
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
			this.state = 1475;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__4:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1463;
				this.match(FppParser.T__4);
				this.state = 1467;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 206, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1464;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1469;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 206, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1471;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1470;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1473;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 207, this._ctx);
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
			this.state = 1489;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__11:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1477;
				this.match(FppParser.T__11);
				this.state = 1481;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 209, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1478;
						this.match(FppParser.NL);
						}
						}
					}
					this.state = 1483;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 209, this._ctx);
				}
				}
				break;
			case FppParser.NL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1485;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 1484;
						this.match(FppParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 1487;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 210, this._ctx);
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
			this.state = 1491;
			this.match(FppParser.T__1);
			this.state = 1495;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1492;
				this.match(FppParser.NL);
				}
				}
				this.state = 1497;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1507;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << FppParser.T__8) | (1 << FppParser.T__12) | (1 << FppParser.LIT_BOOLEAN) | (1 << FppParser.LIT_STRING) | (1 << FppParser.LIT_FLOAT) | (1 << FppParser.LIT_INT))) !== 0) || _la === FppParser.IDENTIFIER) {
				{
				this.state = 1498;
				this.scalarExpr(0);
				this.state = 1504;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					{
					this.state = 1499;
					this.commaDelim();
					this.state = 1500;
					this.scalarExpr(0);
					}
					}
					this.state = 1506;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1509;
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
			this.state = 1511;
			_localctx._name = this.match(FppParser.IDENTIFIER);
			this.state = 1512;
			this.match(FppParser.T__0);
			this.state = 1513;
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
			this.state = 1515;
			this.match(FppParser.T__5);
			this.state = 1519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1516;
				this.match(FppParser.NL);
				}
				}
				this.state = 1521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1534;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.IDENTIFIER) {
				{
				this.state = 1522;
				this.structAssignment();
				this.state = 1528;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 216, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1523;
						this.commaDelim();
						this.state = 1524;
						this.structAssignment();
						}
						}
					}
					this.state = 1530;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 216, this._ctx);
				}
				this.state = 1532;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FppParser.T__4 || _la === FppParser.NL) {
					{
					this.state = 1531;
					this.commaDelim();
					}
				}

				}
			}

			this.state = 1536;
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
			this.state = 1550;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__12:
				{
				this.state = 1539;
				this.match(FppParser.T__12);
				this.state = 1540;
				_localctx._unary = this.scalarExpr(9);
				}
				break;
			case FppParser.IDENTIFIER:
				{
				this.state = 1541;
				this.qualIdent();
				}
				break;
			case FppParser.LIT_BOOLEAN:
				{
				this.state = 1542;
				this.match(FppParser.LIT_BOOLEAN);
				}
				break;
			case FppParser.LIT_FLOAT:
				{
				this.state = 1543;
				this.match(FppParser.LIT_FLOAT);
				}
				break;
			case FppParser.LIT_INT:
				{
				this.state = 1544;
				this.match(FppParser.LIT_INT);
				}
				break;
			case FppParser.LIT_STRING:
				{
				this.state = 1545;
				this.match(FppParser.LIT_STRING);
				}
				break;
			case FppParser.T__8:
				{
				this.state = 1546;
				this.match(FppParser.T__8);
				this.state = 1547;
				_localctx._p = this.scalarExpr(0);
				this.state = 1548;
				this.match(FppParser.T__9);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1560;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 221, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1558;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 220, this._ctx) ) {
					case 1:
						{
						_localctx = new ScalarExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_scalarExpr);
						this.state = 1552;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 1553;
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
						this.state = 1554;
						_localctx._right = this.scalarExpr(9);
						}
						break;

					case 2:
						{
						_localctx = new ScalarExprContext(_parentctx, _parentState);
						_localctx._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, FppParser.RULE_scalarExpr);
						this.state = 1555;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1556;
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
						this.state = 1557;
						_localctx._right = this.scalarExpr(8);
						}
						break;
					}
					}
				}
				this.state = 1562;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 221, this._ctx);
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
			this.state = 1566;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FppParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1563;
				this.arrayExpr();
				}
				break;
			case FppParser.T__5:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1564;
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
				this.state = 1565;
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
			this.state = 1568;
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
			this.state = 1571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === FppParser.NL) {
				{
				this.state = 1570;
				this.match(FppParser.NL);
				}
			}

			this.state = 1575;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 1573;
					this.match(FppParser.ANNOTATION);
					this.state = 1574;
					this.match(FppParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1577;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 224, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 1582;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1579;
				this.match(FppParser.NL);
				}
				}
				this.state = 1584;
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
			this.state = 1587;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1585;
				this.match(FppParser.ANNOTATION);
				this.state = 1586;
				this.match(FppParser.NL);
				}
				}
				this.state = 1589;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FppParser.ANNOTATION);
			this.state = 1594;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FppParser.NL) {
				{
				{
				this.state = 1591;
				this.match(FppParser.NL);
				}
				}
				this.state = 1596;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x8B\u0640\x04" +
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
		"\x04\x03\x05\x03\x05\x03\x05\x03\x06\x05\x06\u0123\n\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x05\x07\u012C\n\x07\x03\b\x05" +
		"\b\u012F\n\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05" +
		"\b\u013A\n\b\x03\b\x03\b\x05\b\u013E\n\b\x03\t\x05\t\u0141\n\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\u014E\n" +
		"\n\x03\n\x03\n\x03\n\x05\n\u0153\n\n\x03\v\x05\v\u0156\n\v\x03\v\x03\v" +
		"\x05\v\u015A\n\v\x03\v\x03\v\x05\v\u015E\n\v\x03\f\x05\f\u0161\n\f\x03" +
		"\f\x03\f\x05\f\u0165\n\f\x03\f\x03\f\x05\f\u0169\n\f\x03\r\x05\r\u016C" +
		"\n\r\x03\r\x03\r\x03\r\x03\r\x07\r\u0172\n\r\f\r\x0E\r\u0175\v\r\x03\r" +
		"\x07\r\u0178\n\r\f\r\x0E\r\u017B\v\r\x03\r\x05\r\u017E\n\r\x03\r\x03\r" +
		"\x03\r\x05\r\u0183\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10" +
		"\x03\x10\x03\x10\x05\x10\u018D\n\x10\x03\x10\x03\x10\x05\x10\u0191\n\x10" +
		"\x03\x10\x03\x10\x05\x10\u0195\n\x10\x03\x10\x05\x10\u0198\n\x10\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01A0\n\x11\x03\x11\x03" +
		"\x11\x05\x11\u01A4\n\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01A9\n\x11\x03" +
		"\x11\x03\x11\x03\x11\x05\x11\u01AE\n\x11\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x05\x12\u01B7\n\x12\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05" +
		"\x13\u01CE\n\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u01D4\n\x13\x03" +
		"\x14\x03\x14\x05\x14\u01D8\n\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x05\x15\u01E2\n\x15\x03\x15\x03\x15\x03\x15\x05" +
		"\x15\u01E7\n\x15\x03\x15\x05\x15\u01EA\n\x15\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x05\x16\u01F1\n\x16\x03\x16\x05\x16\u01F4\n\x16\x03\x17\x03" +
		"\x17\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x07\x19\u01FD\n\x19\f\x19" +
		"\x0E\x19\u0200\v\x19\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u0206\n\x19" +
		"\f\x19\x0E\x19\u0209\v\x19\x03\x19\x05\x19\u020C\n\x19\x05\x19\u020E\n" +
		"\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u0215\n\x1A\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u021D\n\x1B\x03\x1B\x03" +
		"\x1B\x05\x1B\u0221\n\x1B\x03\x1B\x03\x1B\x05\x1B\u0225\n\x1B\x03\x1B\x03" +
		"\x1B\x05\x1B\u0229\n\x1B\x03\x1B\x03\x1B\x05\x1B\u022D\n\x1B\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x05\x1C\u0233\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x07\x1D\u0239\n\x1D\f\x1D\x0E\x1D\u023C\v\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0244\n\x1D\f\x1D\x0E\x1D\u0247\v\x1D" +
		"\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u024F\n\x1E\x03" +
		"\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0255\n\x1F\x03 \x03 \x03 \x07 \u025A" +
		"\n \f \x0E \u025D\v \x03 \x03 \x03 \x03 \x07 \u0263\n \f \x0E \u0266\v" +
		" \x05 \u0268\n \x03 \x05 \u026B\n \x03 \x03 \x03!\x05!\u0270\n!\x03!\x03" +
		"!\x03!\x03\"\x03\"\x03\"\x03#\x03#\x05#\u027A\n#\x03$\x03$\x03$\x03$\x05" +
		"$\u0280\n$\x03$\x03$\x03%\x03%\x03%\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03" +
		"\'\x03\'\x03\'\x05\'\u0290\n\'\x03(\x05(\u0293\n(\x03(\x03(\x05(\u0297" +
		"\n(\x03(\x05(\u029A\n(\x03)\x03)\x03)\x03)\x07)\u02A0\n)\f)\x0E)\u02A3" +
		"\v)\x03)\x03)\x03)\x07)\u02A8\n)\f)\x0E)\u02AB\v)\x03)\x07)\u02AE\n)\f" +
		")\x0E)\u02B1\v)\x03)\x05)\u02B4\n)\x03*\x03*\x03*\x03*\x03*\x03*\x05*" +
		"\u02BC\n*\x03+\x05+\u02BF\n+\x03+\x03+\x05+\u02C3\n+\x03+\x05+\u02C6\n" +
		"+\x03,\x03,\x03,\x03,\x03,\x07,\u02CD\n,\f,\x0E,\u02D0\v,\x03,\x03,\x03" +
		",\x07,\u02D5\n,\f,\x0E,\u02D8\v,\x03,\x07,\u02DB\n,\f,\x0E,\u02DE\v,\x03" +
		",\x05,\u02E1\n,\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x05-\u02EB\n-" +
		"\x03-\x05-\u02EE\n-\x03.\x03.\x03.\x05.\u02F3\n.\x03/\x05/\u02F6\n/\x03" +
		"/\x03/\x05/\u02FA\n/\x03/\x05/\u02FD\n/\x03/\x05/\u0300\n/\x03/\x05/\u0303" +
		"\n/\x030\x050\u0306\n0\x030\x030\x050\u030A\n0\x030\x050\u030D\n0\x03" +
		"0\x050\u0310\n0\x030\x050\u0313\n0\x031\x051\u0316\n1\x031\x031\x031\x03" +
		"1\x051\u031C\n1\x031\x031\x071\u0320\n1\f1\x0E1\u0323\v1\x031\x071\u0326" +
		"\n1\f1\x0E1\u0329\v1\x031\x051\u032C\n1\x031\x071\u032F\n1\f1\x0E1\u0332" +
		"\v1\x031\x031\x031\x051\u0337\n1\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x052\u0344\n2\x033\x033\x033\x053\u0349\n3\x033\x033" +
		"\x033\x033\x053\u034F\n3\x033\x033\x033\x033\x053\u0355\n3\x034\x034\x03" +
		"4\x035\x035\x035\x035\x035\x036\x036\x036\x036\x056\u0363\n6\x036\x03" +
		"6\x056\u0367\n6\x036\x056\u036A\n6\x037\x037\x037\x037\x037\x037\x057" +
		"\u0372\n7\x037\x037\x057\u0376\n7\x038\x038\x038\x038\x038\x058\u037D" +
		"\n8\x038\x038\x038\x058\u0382\n8\x039\x059\u0385\n9\x039\x039\x039\x03" +
		"9\x059\u038B\n9\x039\x059\u038E\n9\x03:\x03:\x03:\x03:\x03:\x03:\x03:" +
		"\x03:\x03:\x05:\u0399\n:\x03:\x03:\x05:\u039D\n:\x03:\x03:\x03:\x05:\u03A2" +
		"\n:\x03:\x03:\x03:\x05:\u03A7\n:\x03:\x03:\x05:\u03AB\n:\x03:\x03:\x05" +
		":\u03AF\n:\x03:\x03:\x07:\u03B3\n:\f:\x0E:\u03B6\v:\x03:\x03:\x03:\x07" +
		":\u03BB\n:\f:\x0E:\u03BE\v:\x03:\x07:\u03C1\n:\f:\x0E:\u03C4\v:\x03:\x05" +
		":\u03C7\n:\x03;\x03;\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03" +
		"<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x05<\u03DF\n<\x03" +
		"=\x05=\u03E2\n=\x03=\x03=\x05=\u03E6\n=\x03=\x05=\u03E9\n=\x03>\x03>\x03" +
		">\x03>\x03>\x07>\u03F0\n>\f>\x0E>\u03F3\v>\x03>\x03>\x03>\x07>\u03F8\n" +
		">\f>\x0E>\u03FB\v>\x03>\x07>\u03FE\n>\f>\x0E>\u0401\v>\x03>\x03>\x03?" +
		"\x03?\x03?\x05?\u0408\n?\x03?\x03?\x05?\u040C\n?\x03@\x05@\u040F\n@\x03" +
		"@\x03@\x03@\x03A\x03A\x03A\x03A\x03A\x05A\u0419\nA\x03B\x05B\u041C\nB" +
		"\x03B\x03B\x03B\x03B\x03C\x03C\x03C\x03C\x07C\u0426\nC\fC\x0EC\u0429\v" +
		"C\x03C\x03C\x03C\x07C\u042E\nC\fC\x0EC\u0431\vC\x03C\x07C\u0434\nC\fC" +
		"\x0EC\u0437\vC\x03C\x03C\x03D\x03D\x03D\x03D\x03D\x03D\x03D\x03D\x05D" +
		"\u0443\nD\x03E\x03E\x03E\x03E\x07E\u0449\nE\fE\x0EE\u044C\vE\x03E\x05" +
		"E\u044F\nE\x03F\x03F\x03F\x03F\x03F\x03F\x07F\u0457\nF\fF\x0EF\u045A\v" +
		"F\x03F\x03F\x07F\u045E\nF\fF\x0EF\u0461\vF\x03F\x03F\x05F\u0465\nF\x03" +
		"G\x03G\x03G\x03H\x03H\x03H\x03I\x05I\u046E\nI\x03I\x03I\x05I\u0472\nI" +
		"\x03I\x05I\u0475\nI\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x07J" +
		"\u0480\nJ\fJ\x0EJ\u0483\vJ\x03J\x03J\x03J\x07J\u0488\nJ\fJ\x0EJ\u048B" +
		"\vJ\x03J\x07J\u048E\nJ\fJ\x0EJ\u0491\vJ\x03J\x03J\x03K\x03K\x05K\u0497" +
		"\nK\x03L\x05L\u049A\nL\x03L\x03L\x05L\u049E\nL\x03L\x05L\u04A1\nL\x03" +
		"M\x03M\x03M\x03M\x03M\x07M\u04A8\nM\fM\x0EM\u04AB\vM\x03M\x03M\x03M\x07" +
		"M\u04B0\nM\fM\x0EM\u04B3\vM\x03M\x07M\u04B6\nM\fM\x0EM\u04B9\vM\x03M\x05" +
		"M\u04BC\nM\x03M\x03M\x03M\x07M\u04C1\nM\fM\x0EM\u04C4\vM\x03M\x03M\x03" +
		"M\x07M\u04C9\nM\fM\x0EM\u04CC\vM\x03M\x07M\u04CF\nM\fM\x0EM\u04D2\vM\x03" +
		"M\x05M\u04D5\nM\x03N\x03N\x03N\x03N\x03N\x03N\x05N\u04DD\nN\x03O\x05O" +
		"\u04E0\nO\x03O\x03O\x05O\u04E4\nO\x03O\x05O\u04E7\nO\x03P\x03P\x03P\x03" +
		"P\x07P\u04ED\nP\fP\x0EP\u04F0\vP\x03P\x03P\x03P\x07P\u04F5\nP\fP\x0EP" +
		"\u04F8\vP\x03P\x07P\u04FB\nP\fP\x0EP\u04FE\vP\x03P\x03P\x03Q\x03Q\x03" +
		"Q\x05Q\u0505\nQ\x03R\x05R\u0508\nR\x03R\x03R\x05R\u050C\nR\x03R\x05R\u050F" +
		"\nR\x03S\x03S\x03S\x03S\x07S\u0515\nS\fS\x0ES\u0518\vS\x03S\x03S\x03S" +
		"\x07S\u051D\nS\fS\x0ES\u0520\vS\x03S\x07S\u0523\nS\fS\x0ES\u0526\vS\x03" +
		"S\x03S\x03T\x03T\x03T\x05T\u052D\nT\x03T\x03T\x03T\x03T\x05T\u0533\nT" +
		"\x03T\x03T\x03T\x03T\x05T\u0539\nT\x03U\x03U\x03U\x03U\x03U\x03U\x03V" +
		"\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x05V\u0550\nV\x03W\x05W\u0553\nW\x03W\x03W\x05W\u0557\nW\x03W\x05W\u055A" +
		"\nW\x03X\x03X\x03X\x03X\x07X\u0560\nX\fX\x0EX\u0563\vX\x03X\x03X\x03X" +
		"\x07X\u0568\nX\fX\x0EX\u056B\vX\x03X\x07X\u056E\nX\fX\x0EX\u0571\vX\x03" +
		"X\x03X\x03Y\x05Y\u0576\nY\x03Y\x03Y\x03Y\x03Y\x03Z\x05Z\u057D\nZ\x03Z" +
		"\x03Z\x05Z\u0581\nZ\x03Z\x03Z\x05Z\u0585\nZ\x03[\x05[\u0588\n[\x03[\x03" +
		"[\x05[\u058C\n[\x03[\x03[\x05[\u0590\n[\x03\\\x03\\\x07\\\u0594\n\\\f" +
		"\\\x0E\\\u0597\v\\\x03\\\x07\\\u059A\n\\\f\\\x0E\\\u059D\v\\\x03\\\x05" +
		"\\\u05A0\n\\\x03\\\x03\\\x03]\x03]\x03]\x07]\u05A7\n]\f]\x0E]\u05AA\v" +
		"]\x03^\x03^\x03_\x03_\x03`\x03`\x03`\x05`\u05B3\n`\x03a\x03a\x03a\x05" +
		"a\u05B8\na\x03b\x03b\x07b\u05BC\nb\fb\x0Eb\u05BF\vb\x03b\x06b\u05C2\n" +
		"b\rb\x0Eb\u05C3\x05b\u05C6\nb\x03c\x03c\x07c\u05CA\nc\fc\x0Ec\u05CD\v" +
		"c\x03c\x06c\u05D0\nc\rc\x0Ec\u05D1\x05c\u05D4\nc\x03d\x03d\x07d\u05D8" +
		"\nd\fd\x0Ed\u05DB\vd\x03d\x03d\x03d\x03d\x07d\u05E1\nd\fd\x0Ed\u05E4\v" +
		"d\x05d\u05E6\nd\x03d\x03d\x03e\x03e\x03e\x03e\x03f\x03f\x07f\u05F0\nf" +
		"\ff\x0Ef\u05F3\vf\x03f\x03f\x03f\x03f\x07f\u05F9\nf\ff\x0Ef\u05FC\vf\x03" +
		"f\x05f\u05FF\nf\x05f\u0601\nf\x03f\x03f\x03g\x03g\x03g\x03g\x03g\x03g" +
		"\x03g\x03g\x03g\x03g\x03g\x03g\x05g\u0611\ng\x03g\x03g\x03g\x03g\x03g" +
		"\x03g\x07g\u0619\ng\fg\x0Eg\u061C\vg\x03h\x03h\x03h\x05h\u0621\nh\x03" +
		"i\x03i\x03j\x05j\u0626\nj\x03j\x03j\x06j\u062A\nj\rj\x0Ej\u062B\x03j\x07" +
		"j\u062F\nj\fj\x0Ej\u0632\vj\x03k\x03k\x06k\u0636\nk\rk\x0Ek\u0637\x03" +
		"k\x07k\u063B\nk\fk\x0Ek\u063E\vk\x03k\x02\x02\x03\xCCl\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18" +
		"\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x02" +
		"0\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02" +
		"L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02" +
		"h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82" +
		"\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94" +
		"\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6" +
		"\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8" +
		"\x02\xBA\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA" +
		"\x02\xCC\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\x02\n\x06\x02++//==MM\x05" +
		"\x02,,JJ~~\x05\x02__nn\x8A\x8A\x05\x02\'\'ddkk\x03\x02\x1E%\x04\x02\x1C" +
		"%00\x03\x02\x10\x11\x04\x02\x0F\x0F\x12\x12\x02\u070B\x02\xD9\x03\x02" +
		"\x02\x02\x04\xF1\x03\x02\x02\x02\x06\u0109\x03\x02\x02\x02\b\u011E\x03" +
		"\x02\x02\x02\n\u0122\x03\x02\x02\x02\f\u012B\x03\x02\x02\x02\x0E\u012E" +
		"\x03\x02\x02\x02\x10\u0140\x03\x02\x02\x02\x12\u0147\x03\x02\x02\x02\x14" +
		"\u0155\x03\x02\x02\x02\x16\u0160\x03\x02\x02\x02\x18\u016B\x03\x02\x02" +
		"\x02\x1A\u0184\x03\x02\x02\x02\x1C\u0186\x03\x02\x02\x02\x1E\u0188\x03" +
		"\x02\x02\x02 \u0199\x03\x02\x02\x02\"\u01B6\x03\x02\x02\x02$\u01D3\x03" +
		"\x02\x02\x02&\u01D7\x03\x02\x02\x02(\u01D9\x03\x02\x02\x02*\u01EB\x03" +
		"\x02\x02\x02,\u01F5\x03\x02\x02\x02.\u01F7\x03\x02\x02\x020\u01FA\x03" +
		"\x02\x02\x022\u0214\x03\x02\x02\x024\u0216\x03\x02\x02\x026\u022E\x03" +
		"\x02\x02\x028\u0234\x03\x02\x02\x02:\u024A\x03\x02\x02\x02<\u0250\x03" +
		"\x02\x02\x02>\u0256\x03\x02\x02\x02@\u026F\x03\x02\x02\x02B\u0274\x03" +
		"\x02\x02\x02D\u0279\x03\x02\x02\x02F\u027B\x03\x02\x02\x02H\u0283\x03" +
		"\x02\x02\x02J\u0286\x03\x02\x02\x02L\u028F\x03\x02\x02\x02N\u0292\x03" +
		"\x02\x02\x02P\u029B\x03\x02\x02\x02R\u02BB\x03\x02\x02\x02T\u02BE\x03" +
		"\x02\x02\x02V\u02C7\x03\x02\x02\x02X\u02E2\x03\x02\x02\x02Z\u02EF\x03" +
		"\x02\x02\x02\\\u02F5\x03\x02\x02\x02^\u0305\x03\x02\x02\x02`\u0315\x03" +
		"\x02\x02\x02b\u0343\x03\x02\x02\x02d\u0345\x03\x02\x02\x02f\u0356\x03" +
		"\x02\x02\x02h\u0359\x03\x02\x02\x02j\u035E\x03\x02\x02\x02l\u036B\x03" +
		"\x02\x02\x02n\u0377\x03\x02\x02\x02p\u0384\x03\x02\x02\x02r\u038F\x03" +
		"\x02\x02\x02t\u03C8\x03\x02\x02\x02v\u03DE\x03\x02\x02\x02x\u03E1\x03" +
		"\x02\x02\x02z\u03EA\x03\x02\x02\x02|\u0404\x03\x02\x02\x02~\u040E\x03" +
		"\x02\x02\x02\x80\u0413\x03\x02\x02\x02\x82\u041B\x03\x02\x02\x02\x84\u0421" +
		"\x03\x02\x02\x02\x86\u0442\x03\x02\x02\x02\x88\u0444\x03\x02\x02\x02\x8A" +
		"\u0450\x03\x02\x02\x02\x8C\u0466\x03\x02\x02\x02\x8E\u0469\x03\x02\x02" +
		"\x02\x90\u046D\x03\x02\x02\x02\x92\u0476\x03\x02\x02\x02\x94\u0496\x03" +
		"\x02\x02\x02\x96\u0499\x03\x02\x02\x02\x98\u04A2\x03\x02\x02\x02\x9A\u04DC" +
		"\x03\x02\x02\x02\x9C\u04DF\x03\x02\x02\x02\x9E\u04E8\x03\x02\x02\x02\xA0" +
		"\u0504\x03\x02\x02\x02\xA2\u0507\x03\x02\x02\x02\xA4\u0510\x03\x02\x02" +
		"\x02\xA6\u0538\x03\x02\x02\x02\xA8\u053A\x03\x02\x02\x02\xAA\u054F\x03" +
		"\x02\x02\x02\xAC\u0552\x03\x02\x02\x02\xAE\u055B\x03\x02\x02\x02\xB0\u0575" +
		"\x03\x02\x02\x02\xB2\u057C\x03\x02\x02\x02\xB4\u0587\x03\x02\x02\x02\xB6" +
		"\u0591\x03\x02\x02\x02\xB8\u05A3\x03\x02\x02\x02\xBA\u05AB\x03\x02\x02" +
		"\x02\xBC\u05AD\x03\x02\x02\x02\xBE\u05AF\x03\x02\x02\x02\xC0\u05B7\x03" +
		"\x02\x02\x02\xC2\u05C5\x03\x02\x02\x02\xC4\u05D3\x03\x02\x02\x02\xC6\u05D5" +
		"\x03\x02\x02\x02\xC8\u05E9\x03\x02\x02\x02\xCA\u05ED\x03\x02\x02\x02\xCC" +
		"\u0610\x03\x02\x02\x02\xCE\u0620\x03\x02\x02\x02\xD0\u0622\x03\x02\x02" +
		"\x02\xD2\u0625\x03\x02\x02\x02\xD4\u0635\x03\x02\x02\x02\xD6\xD8\x07\x13" +
		"\x02\x02\xD7\xD6\x03\x02\x02\x02\xD8\xDB\x03\x02\x02\x02\xD9\xD7\x03\x02" +
		"\x02\x02\xD9\xDA\x03\x02\x02\x02\xDA\xE3\x03\x02\x02\x02\xDB\xD9\x03\x02" +
		"\x02\x02\xDC\xDF\x05\xACW\x02\xDD\xE0\x05\xC4c\x02\xDE\xE0\x07\x02\x02" +
		"\x03\xDF\xDD\x03\x02\x02\x02\xDF\xDE\x03\x02\x02\x02\xE0\xE2\x03\x02\x02" +
		"\x02\xE1\xDC\x03\x02\x02\x02\xE2\xE5\x03\x02\x02\x02\xE3\xE1\x03\x02\x02" +
		"\x02\xE3\xE4\x03\x02\x02\x02\xE4\xE9\x03\x02\x02\x02\xE5\xE3\x03\x02\x02" +
		"\x02\xE6\xE8\x07\x13\x02\x02\xE7\xE6\x03\x02\x02\x02\xE8\xEB\x03\x02\x02" +
		"\x02\xE9\xE7\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02\xEA\xEC\x03\x02\x02" +
		"\x02\xEB\xE9\x03\x02\x02\x02\xEC\xED\x07\x02\x02\x03\xED\x03\x03\x02\x02" +
		"\x02\xEE\xF0\x07\x13\x02\x02\xEF\xEE\x03\x02\x02\x02\xF0\xF3\x03\x02\x02" +
		"\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xFB\x03\x02\x02" +
		"\x02\xF3\xF1\x03\x02\x02\x02\xF4\xF7\x05\x9CO\x02\xF5\xF8\x05\xC4c\x02" +
		"\xF6\xF8\x07\x02\x02\x03\xF7\xF5\x03\x02\x02\x02\xF7\xF6\x03\x02\x02\x02" +
		"\xF8\xFA\x03\x02\x02\x02\xF9\xF4\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02" +
		"\xFB\xF9\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\u0101\x03\x02\x02" +
		"\x02\xFD\xFB\x03\x02\x02\x02\xFE\u0100\x07\x13\x02\x02\xFF\xFE\x03\x02" +
		"\x02\x02\u0100\u0103\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0101\u0102" +
		"\x03\x02\x02\x02\u0102\u0104\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02" +
		"\u0104\u0105\x07\x02\x02\x03\u0105\x05\x03\x02\x02\x02\u0106\u0108\x07" +
		"\x13\x02\x02\u0107\u0106\x03\x02\x02\x02\u0108\u010B\x03\x02\x02\x02\u0109" +
		"\u0107\x03\x02\x02\x02\u0109\u010A\x03\x02\x02\x02\u010A\u0113\x03\x02" +
		"\x02\x02\u010B\u0109\x03\x02\x02\x02\u010C\u010F\x05x=\x02\u010D\u0110" +
		"\x05\xC4c\x02\u010E\u0110\x07\x02\x02\x03\u010F\u010D\x03\x02\x02\x02" +
		"\u010F\u010E\x03\x02\x02\x02\u0110\u0112\x03\x02\x02\x02\u0111\u010C\x03" +
		"\x02\x02\x02\u0112\u0115\x03\x02\x02\x02\u0113\u0111\x03\x02\x02\x02\u0113" +
		"\u0114\x03\x02\x02\x02\u0114\u0119\x03\x02\x02\x02\u0115\u0113\x03\x02" +
		"\x02\x02\u0116\u0118\x07\x13\x02\x02\u0117\u0116\x03\x02\x02\x02\u0118" +
		"\u011B\x03\x02\x02\x02\u0119\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02" +
		"\x02\x02\u011A\u011C\x03\x02\x02\x02\u011B\u0119\x03\x02\x02\x02\u011C" +
		"\u011D\x07\x02\x02\x03\u011D\x07\x03\x02\x02\x02\u011E\u011F\x07\x85\x02" +
		"\x02\u011F\u0120\x07\x8B\x02\x02\u0120\t\x03\x02\x02\x02\u0121\u0123\x07" +
		";\x02\x02\u0122\u0121\x03\x02\x02\x02\u0122\u0123\x03\x02\x02\x02\u0123" +
		"\u0124\x03\x02\x02\x02\u0124\u0125\x07\x85\x02\x02\u0125\u0126\x07\x8B" +
		"\x02\x02\u0126\u0127\x07\x03\x02\x02\u0127\u0128\x05\xC0a\x02\u0128\v" +
		"\x03\x02\x02\x02\u0129\u012C\x05\xC6d\x02";
	private static readonly _serializedATNSegment1: string =
		"\u012A\u012C\x05\xCCg\x02\u012B\u0129\x03\x02\x02\x02\u012B\u012A\x03" +
		"\x02\x02\x02\u012C\r\x03\x02\x02\x02\u012D\u012F\x07;\x02\x02\u012E\u012D" +
		"\x03\x02\x02\x02\u012E\u012F\x03\x02\x02\x02\u012F\u0130\x03\x02\x02\x02" +
		"\u0130\u0131\x07*\x02\x02\u0131\u0132\x07\x8B\x02\x02\u0132\u0133\x07" +
		"\x03\x02\x02\u0133\u0134\x07\x04\x02\x02\u0134\u0135\x05\xCEh\x02\u0135" +
		"\u0136\x07\x05\x02\x02\u0136\u0139\x05\xC0a\x02\u0137\u0138\x079\x02\x02" +
		"\u0138\u013A\x05\f\x07\x02\u0139\u0137\x03\x02\x02\x02\u0139\u013A\x03" +
		"\x02\x02\x02\u013A\u013D\x03\x02\x02\x02\u013B\u013C\x07F\x02\x02\u013C" +
		"\u013E\x07\x19\x02\x02\u013D\u013B\x03\x02\x02\x02\u013D\u013E\x03\x02" +
		"\x02\x02\u013E\x0F\x03\x02\x02\x02\u013F\u0141\x07;\x02\x02\u0140\u013F" +
		"\x03\x02\x02\x02\u0140\u0141\x03\x02\x02\x02\u0141\u0142\x03\x02\x02\x02" +
		"\u0142\u0143\x076\x02\x02\u0143\u0144\x07\x8B\x02\x02\u0144\u0145\x07" +
		"\x03\x02\x02\u0145\u0146\x05\xCEh\x02\u0146\x11\x03\x02\x02\x02\u0147" +
		"\u0148\x07\x8B\x02\x02\u0148\u014D\x07\x06\x02\x02\u0149\u014A\x07\x04" +
		"\x02\x02\u014A\u014B\x05\xCEh\x02\u014B\u014C\x07\x05\x02\x02\u014C\u014E" +
		"\x03\x02\x02\x02\u014D\u0149\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02" +
		"\u014E\u014F\x03\x02\x02\x02\u014F\u0152\x05\xC0a\x02\u0150\u0151\x07" +
		"F\x02\x02\u0151\u0153\x07\x19\x02\x02\u0152\u0150\x03\x02\x02\x02\u0152" +
		"\u0153\x03\x02\x02\x02\u0153\x13\x03\x02\x02\x02\u0154\u0156\x05\xD4k" +
		"\x02\u0155\u0154\x03\x02\x02\x02\u0155\u0156\x03\x02\x02\x02\u0156\u0157" +
		"\x03\x02\x02\x02\u0157\u015D\x05\x12\n\x02\u0158\u015A\x07\x07\x02\x02" +
		"\u0159\u0158\x03\x02\x02\x02\u0159\u015A\x03\x02\x02\x02\u015A\u015B\x03" +
		"\x02\x02\x02\u015B\u015E\x05\xD2j\x02\u015C\u015E\x05\xC2b\x02\u015D\u0159" +
		"\x03\x02\x02\x02\u015D\u015C\x03\x02\x02\x02\u015E\x15\x03\x02\x02\x02" +
		"\u015F\u0161\x05\xD4k\x02\u0160\u015F\x03\x02\x02\x02\u0160\u0161\x03" +
		"\x02\x02\x02\u0161\u0162\x03\x02\x02\x02\u0162\u0168\x05\x12\n\x02\u0163" +
		"\u0165\x07\x07\x02\x02\u0164\u0163\x03\x02\x02\x02\u0164\u0165\x03\x02" +
		"\x02\x02\u0165\u0166\x03\x02\x02\x02\u0166\u0169\x05\xD2j\x02\u0167\u0169" +
		"\x05\xC2b\x02\u0168\u0164\x03\x02\x02\x02\u0168\u0167\x03\x02\x02\x02" +
		"\u0168\u0169\x03\x02\x02\x02\u0169\x17\x03\x02\x02\x02\u016A\u016C\x07" +
		";\x02\x02\u016B\u016A\x03\x02\x02\x02\u016B\u016C\x03\x02\x02\x02\u016C" +
		"\u016D\x03\x02\x02\x02\u016D\u016E\x07}\x02\x02\u016E\u016F\x07\x8B\x02" +
		"\x02\u016F\u0173\x07\b\x02\x02\u0170\u0172\x07\x13\x02\x02\u0171\u0170" +
		"\x03\x02\x02\x02\u0172\u0175\x03\x02\x02\x02\u0173\u0171\x03\x02\x02\x02" +
		"\u0173\u0174\x03\x02\x02\x02\u0174\u017D\x03\x02\x02\x02\u0175\u0173\x03" +
		"\x02\x02\x02\u0176\u0178\x05\x14\v\x02\u0177\u0176\x03\x02\x02\x02\u0178" +
		"\u017B\x03\x02\x02\x02\u0179\u0177\x03\x02\x02\x02\u0179\u017A\x03\x02" +
		"\x02\x02\u017A\u017C\x03\x02\x02\x02\u017B\u0179\x03\x02\x02\x02\u017C" +
		"\u017E\x05\x16\f\x02\u017D\u0179\x03\x02\x02\x02\u017D\u017E\x03\x02\x02" +
		"\x02\u017E\u017F\x03\x02\x02\x02\u017F\u0182\x07\t\x02\x02\u0180\u0181" +
		"\x079\x02\x02\u0181\u0183\x05\xCAf\x02\u0182\u0180\x03\x02\x02\x02\u0182" +
		"\u0183\x03\x02\x02\x02\u0183\x19\x03\x02\x02\x02\u0184\u0185\t\x02\x02" +
		"\x02\u0185\x1B\x03\x02\x02\x02\u0186\u0187\t\x03\x02\x02\u0187\x1D\x03" +
		"\x02\x02\x02\u0188\u0189\x05\x1C\x0F\x02\u0189\u018A\x073\x02\x02\u018A" +
		"\u018C\x07\x8B\x02\x02\u018B\u018D\x05\xB6\\\x02\u018C\u018B\x03\x02\x02" +
		"\x02\u018C\u018D\x03\x02\x02\x02\u018D\u0190\x03\x02\x02\x02\u018E\u018F" +
		"\x07^\x02\x02\u018F\u0191\x05\xCEh\x02\u0190\u018E\x03\x02\x02\x02\u0190" +
		"\u0191\x03\x02\x02\x02\u0191\u0194\x03\x02\x02\x02\u0192\u0193\x07g\x02" +
		"\x02\u0193\u0195\x05\xCEh\x02\u0194\u0192\x03\x02\x02\x02\u0194\u0195" +
		"\x03\x02\x02\x02\u0195\u0197\x03\x02\x02\x02\u0196\u0198\x05\x1A\x0E\x02" +
		"\u0197\u0196\x03\x02\x02\x02\u0197\u0198\x03\x02\x02\x02\u0198\x1F\x03" +
		"\x02\x02\x02\u0199\u019A\x07c\x02\x02\u019A\u019B\x07\x8B\x02\x02\u019B" +
		"\u019C\x07\x06\x02\x02\u019C\u019F\x05\xC0a\x02\u019D\u019E\x079\x02\x02" +
		"\u019E\u01A0\x05\xCEh\x02\u019F\u019D\x03\x02\x02\x02\u019F\u01A0\x03" +
		"\x02\x02\x02\u01A0\u01A3\x03\x02\x02\x02\u01A1\u01A2\x07N\x02\x02\u01A2" +
		"\u01A4\x05\xCEh\x02\u01A3\u01A1\x03\x02\x02\x02\u01A3\u01A4\x03\x02\x02" +
		"\x02\u01A4\u01A8\x03\x02\x02\x02\u01A5\u01A6\x07v\x02\x02\u01A6\u01A7" +
		"\x07^\x02\x02\u01A7\u01A9\x05\xCEh\x02\u01A8\u01A5\x03\x02\x02\x02\u01A8" +
		"\u01A9\x03\x02\x02\x02\u01A9\u01AD\x03\x02\x02\x02\u01AA\u01AB\x07s\x02" +
		"\x02\u01AB\u01AC\x07^\x02\x02\u01AC\u01AE\x05\xCEh\x02\u01AD\u01AA\x03" +
		"\x02\x02\x02\u01AD\u01AE\x03\x02\x02\x02\u01AE!\x03\x02\x02\x02\u01AF" +
		"\u01B0\x07,\x02\x02\u01B0\u01B7\x07S\x02\x02\u01B1\u01B2\x07J\x02\x02" +
		"\u01B2\u01B7\x07S\x02\x02\u01B3\u01B4\x07~\x02\x02\u01B4\u01B7\x07S\x02" +
		"\x02\u01B5\u01B7\x07`\x02\x02\u01B6\u01AF\x03\x02\x02\x02\u01B6\u01B1" +
		"\x03\x02\x02\x02\u01B6\u01B3\x03\x02\x02\x02\u01B6\u01B5\x03\x02\x02\x02" +
		"\u01B7#\x03\x02\x02\x02\u01B8\u01B9\x073\x02\x02\u01B9\u01D4\x07m\x02" +
		"\x02\u01BA\u01BB\x073\x02\x02\u01BB\u01D4\x07p\x02\x02\u01BC\u01BD\x07" +
		"3\x02\x02\u01BD\u01D4\x07r\x02\x02\u01BE\u01D4\x07B\x02\x02\u01BF\u01C0" +
		"\x07c\x02\x02\u01C0\u01D4\x07G\x02\x02\u01C1\u01C2\x07c\x02\x02\u01C2" +
		"\u01D4\x07v\x02\x02\u01C3\u01D4\x07\x7F\x02\x02\u01C4\u01C5\x07\x80\x02" +
		"\x02\u01C5\u01D4\x07B\x02\x02\u01C6\u01C7\x07\x82\x02\x02\u01C7\u01D4" +
		"\x07G\x02\x02\u01C8\u01C9\x07i\x02\x02\u01C9\u01D4\x07G\x02\x02\u01CA" +
		"\u01CB\x07i\x02\x02\u01CB\u01D4\x07q\x02\x02\u01CC\u01CE\t\x03\x02\x02" +
		"\u01CD\u01CC\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE\u01CF\x03" +
		"\x02\x02\x02\u01CF\u01D0\x07i\x02\x02\u01D0\u01D4\x07m\x02\x02\u01D1\u01D2" +
		"\x07i\x02\x02\u01D2\u01D4\x07t\x02\x02\u01D3\u01B8\x03\x02\x02\x02\u01D3" +
		"\u01BA\x03\x02\x02\x02\u01D3\u01BC\x03\x02\x02\x02\u01D3\u01BE\x03\x02" +
		"\x02\x02\u01D3\u01BF\x03\x02\x02\x02\u01D3\u01C1\x03\x02\x02\x02\u01D3" +
		"\u01C3\x03\x02\x02\x02\u01D3\u01C4\x03\x02\x02\x02\u01D3\u01C6\x03\x02" +
		"\x02\x02\u01D3\u01C8\x03\x02\x02\x02\u01D3\u01CA\x03\x02\x02\x02\u01D3" +
		"\u01CD\x03\x02\x02\x02\u01D3\u01D1\x03\x02\x02\x02\u01D4%\x03\x02\x02" +
		"\x02\u01D5\u01D8\x07u\x02\x02\u01D6\u01D8\x05\xB8]\x02\u01D7\u01D5\x03" +
		"\x02\x02\x02\u01D7\u01D6\x03\x02\x02\x02\u01D8\'\x03\x02\x02\x02\u01D9" +
		"\u01DA\x05\"\x12\x02\u01DA\u01DB\x07f\x02\x02\u01DB\u01DC\x07\x8B\x02" +
		"\x02\u01DC\u01E1\x07\x06\x02\x02\u01DD\u01DE\x07\x04\x02\x02\u01DE\u01DF" +
		"\x05\xCEh\x02\u01DF\u01E0\x07\x05\x02\x02\u01E0\u01E2\x03\x02\x02\x02" +
		"\u01E1\u01DD\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02\x02\u01E2\u01E3\x03" +
		"\x02\x02\x02\u01E3\u01E6\x05&\x14\x02\u01E4\u01E5\x07g\x02\x02\u01E5\u01E7" +
		"\x05\xCEh\x02\u01E6\u01E4\x03\x02\x02\x02\u01E6\u01E7\x03\x02\x02\x02" +
		"\u01E7\u01E9\x03\x02\x02\x02\u01E8\u01EA\x05\x1A\x0E\x02\u01E9\u01E8\x03" +
		"\x02\x02\x02\u01E9\u01EA\x03\x02\x02\x02\u01EA)\x03\x02\x02\x02\u01EB" +
		"\u01EC\x05$\x13\x02\u01EC\u01ED\x07f\x02\x02\u01ED\u01F0\x07\x8B\x02\x02" +
		"\u01EE\u01EF\x07g\x02\x02\u01EF\u01F1\x05\xCEh\x02\u01F0\u01EE\x03\x02" +
		"\x02\x02\u01F0\u01F1\x03\x02\x02\x02\u01F1\u01F3\x03\x02\x02\x02\u01F2" +
		"\u01F4\x05\x1A\x0E\x02\u01F3\u01F2\x03\x02\x02\x02\u01F3\u01F4\x03\x02" +
		"\x02\x02\u01F4+\x03\x02\x02\x02\u01F5\u01F6\t\x04\x02\x02\u01F6-\x03\x02" +
		"\x02\x02\u01F7\u01F8\x05,\x17\x02\u01F8\u01F9\x05\xCEh\x02\u01F9/\x03" +
		"\x02\x02\x02\u01FA\u01FE\x07\b\x02\x02\u01FB\u01FD\x07\x13\x02\x02\u01FC" +
		"\u01FB\x03\x02\x02\x02\u01FD\u0200\x03\x02\x02\x02\u01FE\u01FC\x03\x02" +
		"\x02\x02\u01FE\u01FF\x03\x02\x02\x02\u01FF\u020D\x03\x02\x02\x02\u0200" +
		"\u01FE\x03\x02\x02\x02\u0201\u0207\x05.\x18\x02\u0202\u0203\x05\xC2b\x02" +
		"\u0203\u0204\x05.\x18\x02\u0204\u0206\x03\x02\x02\x02\u0205\u0202\x03" +
		"\x02\x02\x02\u0206\u0209\x03\x02\x02\x02\u0207\u0205\x03\x02\x02\x02\u0207" +
		"\u0208\x03\x02\x02\x02\u0208\u020B\x03\x02\x02\x02\u0209\u0207\x03\x02" +
		"\x02\x02\u020A\u020C\x05\xC2b\x02\u020B\u020A\x03\x02\x02\x02\u020B\u020C" +
		"\x03\x02\x02\x02\u020C\u020E\x03\x02\x02\x02\u020D\u0201\x03\x02\x02\x02" +
		"\u020D\u020E\x03\x02\x02\x02\u020E\u020F\x03\x02\x02\x02\u020F\u0210\x07" +
		"\t\x02\x02\u02101\x03\x02\x02\x02\u0211\u0215\x07)\x02\x02\u0212\u0213" +
		"\x07]\x02\x02\u0213\u0215\x071\x02\x02\u0214\u0211\x03\x02\x02\x02\u0214" +
		"\u0212\x03\x02\x02\x02\u02153\x03\x02\x02\x02\u0216\u0217\x07\x7F\x02" +
		"\x02\u0217\u0218\x07\x8B\x02\x02\u0218\u0219\x07\x06\x02\x02\u0219\u021C" +
		"\x05\xC0a\x02\u021A\u021B\x07N\x02\x02\u021B\u021D\x05\xCEh\x02\u021C" +
		"\u021A\x03\x02\x02\x02\u021C\u021D\x03\x02\x02\x02\u021D\u0220\x03\x02" +
		"\x02\x02\u021E\u021F\x07\x87\x02\x02\u021F\u0221\x052\x1A\x02\u0220\u021E" +
		"\x03\x02\x02\x02\u0220\u0221\x03\x02\x02\x02\u0221\u0224\x03\x02\x02\x02" +
		"\u0222\u0223\x07F\x02\x02\u0223\u0225\x07\x19\x02\x02\u0224\u0222\x03" +
		"\x02\x02\x02\u0224\u0225\x03\x02\x02\x02\u0225\u0228\x03\x02\x02\x02\u0226" +
		"\u0227\x07X\x02\x02\u0227\u0229\x050\x19\x02\u0228\u0226\x03\x02\x02\x02" +
		"\u0228\u0229\x03\x02\x02\x02\u0229\u022C\x03\x02\x02\x02\u022A\u022B\x07" +
		"L\x02\x02\u022B\u022D\x050\x19\x02\u022C\u022A\x03\x02\x02\x02\u022C\u022D" +
		"\x03\x02\x02\x02\u022D5\x03\x02\x02\x02\u022E\u022F\x07&\x02\x02\u022F" +
		"\u0232\x07\x8B\x02\x02\u0230\u0231\x07\x06\x02\x02\u0231\u0233\x05\xC0" +
		"a\x02\u0232\u0230\x03\x02\x02\x02\u0232\u0233\x03\x02\x02\x02\u02337\x03" +
		"\x02\x02\x02\u0234\u0235\x072\x02\x02\u0235\u0236\x07\x8B\x02\x02\u0236" +
		"\u023A\x07\b\x02\x02\u0237\u0239\x07\x13\x02\x02\u0238\u0237\x03\x02\x02" +
		"\x02\u0239\u023C\x03\x02\x02\x02\u023A\u0238\x03\x02\x02\x02\u023A\u023B" +
		"\x03\x02\x02\x02\u023B\u023D\x03\x02\x02\x02\u023C\u023A\x03\x02\x02\x02" +
		"\u023D\u023E\x07O\x02\x02\u023E\u023F\x07\x8B\x02\x02\u023F\u0240\x05" +
		"@!\x02\u0240\u0241\x07>\x02\x02\u0241\u0245\x05@!\x02\u0242\u0244\x07" +
		"\x13\x02\x02\u0243\u0242\x03\x02\x02\x02\u0244\u0247\x03\x02\x02\x02\u0245" +
		"\u0243\x03\x02\x02\x02\u0245\u0246\x03\x02\x02\x02\u0246\u0248\x03\x02" +
		"\x02\x02\u0247\u0245\x03\x02\x02\x02\u0248\u0249\x07\t\x02\x02\u02499" +
		"\x03\x02\x02\x02\u024A\u024B\x07I\x02\x02\u024B\u024E\x07\x8B\x02\x02" +
		"\u024C\u024D\x07\x06\x02\x02\u024D\u024F\x05\xC0a\x02\u024E\u024C\x03" +
		"\x02\x02\x02\u024E\u024F\x03\x02\x02\x02\u024F;\x03\x02\x02\x02\u0250" +
		"\u0251\x07x\x02\x02\u0251\u0254\x07\x8B\x02\x02\u0252\u0253\x07\x06\x02" +
		"\x02\u0253\u0255\x05\xC0a\x02\u0254\u0252\x03\x02\x02\x02\u0254\u0255" +
		"\x03\x02\x02\x02\u0255=\x03\x02\x02\x02\u0256\u0257\x07<\x02\x02\u0257" +
		"\u025B\x07\b\x02\x02\u0258\u025A\x07\x13\x02\x02\u0259\u0258\x03\x02\x02" +
		"\x02\u025A\u025D\x03\x02\x02\x02\u025B\u0259\x03\x02\x02\x02\u025B\u025C" +
		"\x03\x02\x02\x02\u025C\u0267\x03\x02\x02\x02\u025D\u025B\x03\x02\x02\x02" +
		"\u025E\u0264\x07\x8B\x02\x02\u025F\u0260\x05\xC2b\x02\u0260\u0261\x07" +
		"\x8B\x02\x02\u0261\u0263\x03\x02\x02\x02\u0262\u025F\x03\x02\x02\x02\u0263" +
		"\u0266\x03\x02\x02\x02\u0264\u0262\x03\x02\x02\x02\u0264\u0265\x03\x02" +
		"\x02\x02\u0265\u0268\x03\x02\x02\x02\u0266\u0264\x03\x02\x02\x02\u0267" +
		"\u025E\x03\x02\x02\x02\u0267\u0268\x03\x02\x02\x02\u0268\u026A\x03\x02" +
		"\x02\x02\u0269\u026B\x05\xC2b\x02\u026A\u0269\x03\x02\x02\x02\u026A\u026B" +
		"\x03\x02\x02\x02\u026B\u026C\x03\x02\x02\x02\u026C\u026D\x07\t\x02\x02" +
		"\u026D?\x03\x02\x02\x02\u026E\u0270\x05> \x02\u026F\u026E\x03\x02\x02" +
		"\x02\u026F\u0270\x03\x02\x02\x02\u0270\u0271\x03\x02\x02\x02\u0271\u0272" +
		"\x07?\x02\x02\u0272\u0273\x05\xB8]\x02\u0273A\x03\x02\x02\x02\u0274\u0275" +
		"\x07R\x02\x02\u0275\u0276\x05@!\x02\u0276C\x03\x02\x02\x02\u0277\u027A" +
		"\x05@!\x02\u0278\u027A\x05> \x02\u0279\u0277\x03\x02\x02\x02\u0279\u0278" +
		"\x03\x02\x02\x02\u027AE\x03\x02\x02\x02\u027B\u027C\x07]\x02\x02\u027C" +
		"\u027F\x07\x8B\x02\x02\u027D\u027E\x07O\x02\x02\u027E\u0280\x07\x8B\x02" +
		"\x02\u027F\u027D\x03\x02\x02\x02\u027F\u0280\x03\x02\x02\x02\u0280\u0281" +
		"\x03\x02\x02\x02\u0281\u0282\x05D#\x02\u0282G\x03\x02\x02\x02\u0283\u0284" +
		"\x07@\x02\x02\u0284\u0285\x05> \x02\u0285I\x03\x02\x02\x02\u0286\u0287" +
		"\x07C\x02\x02\u0287\u0288\x05> \x02\u0288K\x03\x02\x02\x02\u0289\u0290" +
		"\x05B\"\x02\u028A\u0290\x058\x1D\x02\u028B\u0290\x05P)\x02\u028C\u0290" +
		"\x05F$\x02\u028D\u0290\x05H%\x02\u028E\u0290\x05J&\x02\u028F\u0289\x03" +
		"\x02\x02\x02\u028F\u028A\x03\x02\x02\x02\u028F\u028B\x03\x02\x02\x02\u028F" +
		"\u028C\x03\x02\x02\x02\u028F\u028D\x03\x02\x02\x02\u028F\u028E\x03\x02" +
		"\x02\x02\u0290M\x03\x02\x02\x02\u0291\u0293\x05\xD4k\x02\u0292\u0291\x03" +
		"\x02\x02\x02\u0292\u0293\x03\x02\x02\x02\u0293\u0294\x03\x02\x02\x02\u0294" +
		"\u0296\x05L\'\x02\u0295\u0297\x07\x13\x02\x02\u0296\u0295\x03\x02\x02" +
		"\x02\u0296\u0297\x03\x02\x02\x02\u0297\u0299\x03\x02\x02\x02\u0298\u029A" +
		"\x05\xD0i\x02\u0299\u0298\x03\x02\x02\x02\u0299\u029A\x03\x02\x02\x02" +
		"\u029AO\x03\x02\x02\x02\u029B\u029C\x07{\x02\x02\u029C\u02B3\x07\x8B\x02" +
		"\x02\u029D\u02A1\x07\b\x02\x02\u029E\u02A0\x07\x13\x02\x02\u029F\u029E" +
		"\x03\x02\x02\x02\u02A0\u02A3\x03\x02\x02\x02\u02A1\u029F\x03\x02\x02\x02" +
		"\u02A1\u02A2\x03\x02\x02\x02\u02A2\u02A9\x03\x02\x02\x02\u02A3\u02A1\x03" +
		"\x02\x02\x02\u02A4\u02A5\x05N(\x02\u02A5\u02A6\x05\xC4c\x02\u02A6\u02A8" +
		"\x03\x02\x02\x02\u02A7\u02A4\x03\x02\x02\x02\u02A8\u02AB\x03\x02\x02\x02" +
		"\u02A9\u02A7\x03\x02\x02\x02\u02A9\u02AA\x03\x02\x02\x02\u02AA\u02AF\x03" +
		"\x02\x02\x02\u02AB\u02A9\x03\x02\x02\x02\u02AC\u02AE\x07\x13\x02\x02\u02AD" +
		"\u02AC\x03\x02\x02\x02\u02AE\u02B1\x03\x02\x02\x02\u02AF\u02AD\x03\x02" +
		"\x02\x02\u02AF\u02B0\x03\x02\x02\x02\u02B0\u02B2\x03\x02\x02\x02\u02B1" +
		"\u02AF\x03\x02\x02\x02\u02B2\u02B4\x07\t\x02\x02\u02B3\u029D\x03\x02\x02" +
		"\x02\u02B3\u02B4\x03\x02\x02\x02\u02B4Q\x03\x02\x02\x02\u02B5\u02BC\x05" +
		"8\x1D\x02\u02B6\u02BC\x05:\x1E\x02\u02B7\u02BC\x05B\"\x02\u02B8\u02BC" +
		"\x05<\x1F\x02\u02B9\u02BC\x05P)\x02\u02BA\u02BC\x056\x1C\x02\u02BB\u02B5" +
		"\x03\x02\x02\x02\u02BB\u02B6\x03\x02\x02\x02\u02BB\u02B7\x03\x02\x02\x02" +
		"\u02BB\u02B8\x03\x02\x02\x02\u02BB\u02B9\x03\x02\x02\x02\u02BB\u02BA\x03" +
		"\x02\x02\x02\u02BCS\x03\x02\x02\x02\u02BD\u02BF\x05\xD4k\x02\u02BE\u02BD" +
		"\x03\x02\x02\x02\u02BE\u02BF\x03\x02\x02\x02\u02BF\u02C0\x03\x02\x02\x02" +
		"\u02C0\u02C2\x05R*\x02\u02C1\u02C3\x07\x13\x02\x02\u02C2\u02C1\x03\x02" +
		"\x02\x02\u02C2\u02C3\x03\x02\x02\x02\u02C3\u02C5\x03\x02\x02\x02\u02C4" +
		"\u02C6\x05\xD0i\x02\u02C5\u02C4\x03\x02\x02\x02\u02C5\u02C6\x03\x02\x02" +
		"\x02\u02C6U\x03\x02\x02\x02\u02C7\u02C8\x07{\x02\x02\u02C8\u02C9\x07Y" +
		"\x02\x02\u02C9\u02E0\x07\x8B\x02\x02\u02CA\u02CE\x07\b\x02\x02\u02CB\u02CD" +
		"\x07\x13\x02\x02\u02CC\u02CB\x03\x02\x02\x02\u02CD\u02D0\x03\x02\x02\x02" +
		"\u02CE\u02CC\x03\x02\x02\x02\u02CE\u02CF\x03\x02\x02\x02\u02CF\u02D6\x03" +
		"\x02\x02\x02\u02D0\u02CE\x03\x02\x02\x02\u02D1\u02D2\x05T+\x02\u02D2\u02D3" +
		"\x05\xC4c\x02\u02D3\u02D5\x03\x02\x02\x02\u02D4\u02D1\x03\x02\x02\x02" +
		"\u02D5\u02D8\x03\x02\x02\x02\u02D6\u02D4\x03\x02\x02\x02\u02D6\u02D7\x03" +
		"\x02\x02\x02\u02D7\u02DC\x03\x02\x02\x02\u02D8\u02D6\x03\x02\x02\x02\u02D9" +
		"\u02DB\x07\x13\x02\x02\u02DA\u02D9\x03\x02\x02\x02\u02DB\u02DE\x03\x02" +
		"\x02\x02\u02DC\u02DA\x03\x02\x02\x02\u02DC\u02DD\x03\x02\x02\x02\u02DD" +
		"\u02DF\x03\x02\x02\x02\u02DE\u02DC\x03\x02\x02\x02\u02DF\u02E1\x07\t\x02" +
		"\x02\u02E0\u02CA\x03\x02\x02\x02\u02E0\u02E1\x03\x02\x02\x02\u02E1W\x03" +
		"\x02\x02\x02\u02E2\u02E3\x07{\x02\x02\u02E3\u02E4\x07Y\x02\x02\u02E4\u02E5" +
		"\x07T\x02\x02\u02E5\u02E6\x07\x8B\x02\x02\u02E6\u02E7\x07\x06\x02\x02" +
		"\u02E7\u02EA\x05\xB8]\x02\u02E8\u02E9\x07g\x02\x02\u02E9\u02EB\x05\xCE" +
		"h\x02\u02EA\u02E8\x03\x02\x02\x02\u02EA\u02EB\x03\x02\x02\x02\u02EB\u02ED" +
		"\x03\x02\x02\x02\u02EC\u02EE\x05\x1A\x0E\x02\u02ED\u02EC\x03\x02\x02\x02" +
		"\u02ED\u02EE\x03\x02\x02\x02\u02EEY\x03\x02\x02\x02\u02EF\u02F2\x07\x8B" +
		"\x02\x02\u02F0\u02F1\x07\x03\x02\x02\u02F1\u02F3\x05\xCEh\x02\u02F2\u02F0" +
		"\x03\x02\x02\x02\u02F2\u02F3\x03\x02\x02\x02\u02F3[\x03\x02\x02\x02\u02F4" +
		"\u02F6\x05\xD4k\x02\u02F5\u02F4\x03\x02\x02\x02\u02F5\u02F6\x03\x02\x02" +
		"\x02\u02F6\u02F7\x03\x02\x02\x02\u02F7\u0302\x05Z.\x02\u02F8\u02FA\x07" +
		"\x07\x02\x02\u02F9\u02F8\x03\x02\x02\x02\u02F9\u02FA\x03\x02\x02\x02\u02FA" +
		"\u02FF\x03\x02\x02\x02\u02FB\u02FD\x07\x13\x02\x02\u02FC\u02FB\x03\x02" +
		"\x02\x02\u02FC\u02FD\x03\x02\x02\x02\u02FD\u02FE\x03\x02\x02\x02\u02FE" +
		"\u0300\x05\xD0i\x02\u02FF\u02FC\x03\x02\x02\x02\u02FF\u0300\x03\x02\x02" +
		"\x02\u0300\u0303\x03\x02\x02\x02\u0301\u0303\x05\xC2b\x02\u0302\u02F9" +
		"\x03\x02\x02\x02\u0302\u0301\x03\x02\x02\x02\u0303]\x03\x02\x02\x02\u0304" +
		"\u0306\x05\xD4k\x02\u0305\u0304\x03\x02\x02\x02\u0305\u0306\x03\x02\x02" +
		"\x02\u0306\u0307\x03\x02\x02\x02\u0307\u0312\x05Z.\x02\u0308\u030A\x07" +
		"\x07\x02\x02\u0309\u0308\x03\x02\x02\x02\u0309\u030A\x03\x02\x02\x02\u030A" +
		"\u030F\x03\x02\x02\x02\u030B\u030D\x07\x13\x02\x02\u030C\u030B\x03\x02" +
		"\x02\x02\u030C\u030D\x03\x02\x02\x02\u030D\u030E\x03\x02\x02\x02\u030E" +
		"\u0310\x05\xD0i\x02\u030F\u030C\x03\x02\x02\x02\u030F\u0310\x03\x02\x02" +
		"\x02\u0310\u0313\x03\x02\x02\x02\u0311\u0313\x05\xC2b\x02\u0312\u0309" +
		"\x03\x02\x02\x02\u0312\u0311\x03\x02\x02\x02\u0313_\x03\x02\x02\x02\u0314" +
		"\u0316\x07;\x02\x02\u0315\u0314\x03\x02\x02\x02\u0315\u0316\x03\x02\x02" +
		"\x02\u0316\u0317\x03\x02\x02\x02\u0317\u0318\x07A\x02\x02\u0318\u031B" +
		"\x07\x8B\x02\x02\u0319\u031A\x07\x06\x02\x02\u031A\u031C\x05\xC0a\x02" +
		"\u031B\u0319\x03\x02\x02\x02\u031B\u031C\x03\x02\x02\x02\u031C\u031D\x03" +
		"\x02\x02\x02\u031D\u0321\x07\b\x02\x02\u031E\u0320\x07\x13\x02\x02\u031F" +
		"\u031E\x03\x02\x02\x02\u0320\u0323\x03\x02\x02\x02\u0321\u031F\x03\x02" +
		"\x02\x02\u0321\u0322\x03\x02\x02\x02\u0322\u032B\x03\x02\x02\x02\u0323" +
		"\u0321\x03\x02\x02\x02\u0324\u0326\x05\\/\x02\u0325\u0324\x03\x02\x02" +
		"\x02\u0326\u0329\x03\x02\x02\x02\u0327\u0325\x03\x02\x02\x02\u0327\u0328" +
		"\x03\x02\x02\x02\u0328\u032A\x03\x02\x02\x02\u0329\u0327\x03\x02\x02\x02" +
		"\u032A\u032C\x05^0\x02\u032B\u0327\x03\x02\x02\x02\u032B\u032C\x03\x02" +
		"\x02\x02\u032C\u0330\x03\x02\x02\x02\u032D\u032F\x07\x13\x02\x02\u032E" +
		"\u032D\x03\x02\x02\x02\u032F\u0332\x03\x02\x02\x02\u0330\u032E\x03\x02" +
		"\x02\x02\u0330\u0331\x03\x02\x02\x02\u0331\u0333\x03\x02\x02\x02\u0332" +
		"\u0330\x03\x02\x02\x02\u0333\u0336\x07\t\x02\x02\u0334\u0335\x079\x02" +
		"\x02\u0335\u0337\x05\xCEh\x02\u0336\u0334\x03\x02\x02\x02\u0336\u0337" +
		"\x03\x02\x02\x02\u0337a\x03\x02\x02\x02\u0338\u0339\x07(\x02\x02\u0339" +
		"\u0344\x07L\x02\x02\u033A\u033B\x07(\x02\x02\u033B\u0344\x07X\x02\x02" +
		"\u033C\u0344\x073\x02\x02\u033D\u0344\x07:\x02\x02\u033E\u0344\x07E\x02" +
		"\x02\u033F\u0340\x07\x88\x02\x02\u0340\u0344\x07L\x02\x02\u0341\u0342" +
		"\x07\x88\x02\x02\u0342\u0344\x07X\x02\x02\u0343\u0338\x03\x02\x02\x02" +
		"\u0343\u033A\x03\x02\x02\x02\u0343\u033C\x03\x02\x02\x02\u0343\u033D\x03" +
		"\x02\x02\x02\u0343\u033E\x03\x02\x02\x02\u0343\u033F\x03\x02\x02\x02\u0343" +
		"\u0341\x03\x02\x02\x02\u0344c\x03\x02\x02\x02\u0345\u0346\x07B\x02\x02" +
		"\u0346\u0348\x07\x8B\x02\x02\u0347\u0349\x05\xB6\\\x02\u0348\u0347\x03" +
		"\x02\x02\x02\u0348\u0349\x03\x02\x02\x02\u0349\u034A\x03\x02\x02\x02\u034A" +
		"\u034B\x07w\x02\x02\u034B\u034E\x05b2\x02\u034C\u034D\x07N\x02\x02\u034D" +
		"\u034F\x05\xCEh\x02\u034E\u034C\x03\x02\x02\x02\u034E\u034F\x03\x02\x02" +
		"\x02\u034F\u0350\x03\x02\x02\x02\u0350\u0351\x07F\x02\x02\u0351\u0354" +
		"\x07\x19\x02\x02\u0352\u0353\x07\x81\x02\x02\u0353\u0355\x05\xCEh\x02" +
		"\u0354\u0352\x03\x02\x02\x02\u0354\u0355\x03\x02\x02\x02\u0355e\x03\x02" +
		"\x02\x02\u0356\u0357\x07Q\x02\x02\u0357\u0358\x07\x19\x02\x02\u0358g\x03" +
		"\x02\x02\x02\u0359\u035A\x07Z\x02\x02\u035A\u035B\x07\x8B\x02\x02\u035B" +
		"\u035C\x07\x89\x02\x02\u035C\u035D\x07\x8B\x02\x02\u035Di\x03\x02\x02" +
		"\x02\u035E\u035F\x07V\x02\x02\u035F\u0360\x07f\x02\x02\u0360\u0362\x07" +
		"\x8B\x02\x02\u0361\u0363\x05\xB6\\\x02\u0362\u0361\x03\x02\x02\x02\u0362" +
		"\u0363\x03\x02\x02\x02\u0363\u0366\x03\x02\x02\x02\u0364\u0365\x07g\x02" +
		"\x02\u0365\u0367\x05\xCEh\x02\u0366\u0364\x03\x02\x02\x02\u0366\u0367" +
		"\x03\x02\x02\x02\u0367\u0369\x03\x02\x02\x02\u0368\u036A\x05\x1A\x0E\x02" +
		"\u0369\u0368\x03\x02\x02\x02\u0369\u036A\x03\x02\x02\x02\u036Ak\x03\x02" +
		"\x02\x02\u036B\u036C\x07i\x02\x02\u036C\u036D\x07l\x02\x02\u036D\u036E" +
		"\x07\x8B\x02\x02\u036E\u036F\x07\x06\x02\x02\u036F\u0371\x05\xC0a\x02" +
		"\u0370\u0372\x07*\x02\x02\u0371\u0370\x03\x02\x02\x02\u0371\u0372\x03" +
		"\x02\x02\x02\u0372\u0375\x03\x02\x02\x02\u0373\u0374\x07N\x02\x02\u0374" +
		"\u0376\x05\xCEh\x02\u0375\u0373\x03\x02\x02\x02\u0375\u0376\x03\x02\x02" +
		"\x02\u0376m\x03\x02\x02\x02\u0377\u0378\x07i\x02\x02\u0378\u0379\x077" +
		"\x02\x02\u0379\u037C\x07\x8B\x02\x02\u037A\u037B\x07N\x02\x02\u037B\u037D" +
		"\x05\xCEh\x02\u037C\u037A\x03\x02\x02\x02\u037C\u037D\x03\x02\x02\x02" +
		"\u037D\u0381\x03\x02\x02\x02\u037E\u037F\x079\x02\x02\u037F\u0380\x07" +
		"g\x02\x02\u0380\u0382\x05\xCEh\x02\u0381\u037E\x03\x02\x02\x02\u0381\u0382" +
		"\x03\x02\x02\x02\u0382o\x03\x02\x02\x02\u0383\u0385\x05\xD4k\x02\u0384" +
		"\u0383\x03\x02\x02\x02\u0384\u0385\x03\x02\x02\x02\u0385\u0386\x03\x02" +
		"\x02\x02\u0386\u0387\x07e\x02\x02\u0387\u0388\x05\xCEh\x02\u0388\u038A" +
		"\x07\x19\x02\x02\u0389\u038B\x07\x13\x02\x02\u038A\u0389\x03\x02\x02\x02" +
		"\u038A\u038B\x03\x02\x02\x02\u038B\u038D\x03\x02\x02\x02\u038C\u038E\x05" +
		"\xD0i\x02\u038D\u038C\x03\x02\x02\x02\u038D\u038E\x03\x02\x02\x02\u038E" +
		"q\x03\x02\x02\x02\u038F\u0390\x07T\x02\x02\u0390\u0391\x07\x8B\x02\x02" +
		"\u0391\u0392\x07\x06\x02\x02\u0392\u0393\x05\xB8]\x02\u0393\u0394\x07" +
		".\x02\x02\u0394\u0395\x07N\x02\x02\u0395\u0398\x05\xCEh\x02\u0396\u0397" +
		"\x07\x85\x02\x02\u0397\u0399\x07\x19\x02\x02\u0398\u0396\x03\x02\x02\x02" +
		"\u0398\u0399\x03\x02\x02\x02\u0399\u039C\x03\x02\x02\x02\u039A\u039B\x07" +
		"-\x02\x02\u039B\u039D\x07\x19\x02\x02\u039C\u039A\x03\x02\x02\x02\u039C" +
		"\u039D\x03\x02\x02\x02\u039D\u03A1\x03\x02\x02\x02\u039E\u039F\x07j\x02" +
		"\x02\u039F\u03A0\x07y\x02\x02\u03A0\u03A2\x05\xCEh\x02\u03A1\u039E\x03" +
		"\x02\x02\x02\u03A1\u03A2\x03\x02\x02\x02\u03A2\u03A6\x03\x02\x02\x02\u03A3" +
		"\u03A4\x07z\x02\x02\u03A4\u03A5\x07y\x02\x02\u03A5\u03A7\x05\xCEh\x02" +
		"\u03A6\u03A3\x03\x02\x02\x02\u03A6\u03A7\x03\x02\x02\x02\u03A7\u03AA\x03" +
		"\x02\x02\x02\u03A8\u03A9\x07g\x02\x02\u03A9\u03AB\x05\xCEh\x02\u03AA\u03A8" +
		"\x03\x02\x02\x02\u03AA\u03AB\x03\x02\x02\x02\u03AB\u03AE\x03\x02\x02\x02" +
		"\u03AC\u03AD\x078\x02\x02\u03AD\u03AF\x05\xCEh\x02\u03AE\u03AC\x03\x02" +
		"\x02\x02\u03AE\u03AF\x03\x02\x02\x02\u03AF\u03C6\x03\x02\x02\x02\u03B0" +
		"\u03B4\x07\b\x02\x02\u03B1\u03B3\x07\x13\x02\x02\u03B2\u03B1\x03\x02\x02" +
		"\x02\u03B3\u03B6\x03\x02\x02\x02\u03B4\u03B2\x03\x02\x02\x02\u03B4\u03B5" +
		"\x03\x02\x02\x02\u03B5\u03BC\x03\x02\x02\x02\u03B6\u03B4\x03\x02\x02\x02" +
		"\u03B7\u03B8\x05p9\x02\u03B8\u03B9\x05\xC4c\x02\u03B9\u03BB\x03\x02\x02" +
		"\x02\u03BA\u03B7\x03\x02\x02\x02\u03BB\u03BE\x03\x02\x02\x02\u03BC\u03BA" +
		"\x03\x02\x02\x02\u03BC\u03BD\x03\x02\x02\x02\u03BD\u03C2\x03\x02\x02\x02" +
		"\u03BE\u03BC\x03\x02\x02\x02\u03BF\u03C1\x07\x13\x02\x02\u03C0\u03BF\x03" +
		"\x02\x02\x02\u03C1\u03C4\x03\x02\x02\x02\u03C2\u03C0\x03\x02\x02\x02\u03C2" +
		"\u03C3\x03\x02\x02\x02\u03C3\u03C5\x03\x02\x02\x02\u03C4\u03C2\x03\x02" +
		"\x02\x02\u03C5\u03C7\x07\t\x02\x02\u03C6\u03B0\x03\x02\x02\x02\u03C6\u03C7" +
		"\x03\x02\x02\x02\u03C7s\x03\x02\x02\x02\u03C8\u03C9\t\x05\x02\x02\u03C9" +
		"u\x03\x02\x02\x02\u03CA\u03DF\x05\b\x05\x02\u03CB\u03DF\x05\n\x06\x02" +
		"\u03CC\u03DF\x05\x0E\b\x02\u03CD\u03DF\x05\x10\t\x02\u03CE\u03DF\x05\x18" +
		"\r\x02\u03CF\u03DF\x05\x1E\x10\x02\u03D0\u03DF\x05\x8EH\x02\u03D1\u03DF" +
		"\x05 \x11\x02\u03D2\u03DF\x05(\x15\x02\u03D3\u03DF\x05*\x16\x02\u03D4" +
		"\u03DF\x054\x1B\x02\u03D5\u03DF\x05`1\x02\u03D6\u03DF\x05d3\x02\u03D7" +
		"\u03DF\x05f4\x02\u03D8\u03DF\x05j6\x02\u03D9\u03DF\x05h5\x02\u03DA\u03DF" +
		"\x05l7\x02\u03DB\u03DF";
	private static readonly _serializedATNSegment2: string =
		"\x05n8\x02\u03DC\u03DF\x05X-\x02\u03DD\u03DF\x05V,\x02\u03DE\u03CA\x03" +
		"\x02\x02\x02\u03DE\u03CB\x03\x02\x02\x02\u03DE\u03CC\x03\x02\x02\x02\u03DE" +
		"\u03CD\x03\x02\x02\x02\u03DE\u03CE\x03\x02\x02\x02\u03DE\u03CF\x03\x02" +
		"\x02\x02\u03DE\u03D0\x03\x02\x02\x02\u03DE\u03D1\x03\x02\x02\x02\u03DE" +
		"\u03D2\x03\x02\x02\x02\u03DE\u03D3\x03\x02\x02\x02\u03DE\u03D4\x03\x02" +
		"\x02\x02\u03DE\u03D5\x03\x02\x02\x02\u03DE\u03D6\x03\x02\x02\x02\u03DE" +
		"\u03D7\x03\x02\x02\x02\u03DE\u03D8\x03\x02\x02\x02\u03DE\u03D9\x03\x02" +
		"\x02\x02\u03DE\u03DA\x03\x02\x02\x02\u03DE\u03DB\x03\x02\x02\x02\u03DE" +
		"\u03DC\x03\x02\x02\x02\u03DE\u03DD\x03\x02\x02\x02\u03DFw\x03\x02\x02" +
		"\x02\u03E0\u03E2\x05\xD4k\x02\u03E1\u03E0\x03\x02\x02\x02\u03E1\u03E2" +
		"\x03\x02\x02\x02\u03E2\u03E3\x03\x02\x02\x02\u03E3\u03E5\x05v<\x02\u03E4" +
		"\u03E6\x07\x13\x02\x02\u03E5\u03E4\x03\x02\x02\x02\u03E5\u03E6\x03\x02" +
		"\x02\x02\u03E6\u03E8\x03\x02\x02\x02\u03E7\u03E9\x05\xD0i\x02\u03E8\u03E7" +
		"\x03\x02\x02\x02\u03E8\u03E9\x03\x02\x02\x02\u03E9y\x03\x02\x02\x02\u03EA" +
		"\u03EB\x05t;\x02\u03EB\u03EC\x074\x02\x02\u03EC\u03ED\x07\x8B\x02\x02" +
		"\u03ED\u03F1\x07\b\x02\x02\u03EE\u03F0\x07\x13\x02\x02\u03EF\u03EE\x03" +
		"\x02\x02\x02\u03F0\u03F3\x03\x02\x02\x02\u03F1\u03EF\x03\x02\x02\x02\u03F1" +
		"\u03F2\x03\x02\x02\x02\u03F2\u03F9\x03\x02\x02\x02\u03F3\u03F1\x03\x02" +
		"\x02\x02\u03F4\u03F5\x05x=\x02\u03F5\u03F6\x05\xC4c\x02\u03F6\u03F8\x03" +
		"\x02\x02\x02\u03F7\u03F4\x03\x02\x02\x02\u03F8\u03FB\x03\x02\x02\x02\u03F9" +
		"\u03F7\x03\x02\x02\x02\u03F9\u03FA\x03\x02\x02\x02\u03FA\u03FF\x03\x02" +
		"\x02\x02\u03FB\u03F9\x03\x02\x02\x02\u03FC\u03FE\x07\x13\x02\x02\u03FD" +
		"\u03FC\x03\x02\x02\x02\u03FE\u0401\x03\x02\x02\x02\u03FF\u03FD\x03\x02" +
		"\x02\x02\u03FF\u0400\x03\x02\x02\x02\u0400\u0402\x03\x02\x02\x02\u0401" +
		"\u03FF\x03\x02\x02\x02\u0402\u0403\x07\t\x02\x02\u0403{\x03\x02\x02\x02" +
		"\u0404\u0405\x07f\x02\x02\u0405\u0407\x07\x8B\x02\x02\u0406\u0408\x05" +
		"\xB6\\\x02\u0407\u0406\x03\x02\x02\x02\u0407\u0408\x03\x02\x02\x02\u0408" +
		"\u040B\x03\x02\x02\x02\u0409\u040A\x07\n\x02\x02\u040A\u040C\x05\xC0a" +
		"\x02\u040B\u0409\x03\x02\x02\x02\u040B\u040C\x03\x02\x02\x02\u040C}\x03" +
		"\x02\x02\x02\u040D\u040F\x07h\x02\x02\u040E\u040D\x03\x02\x02\x02\u040E" +
		"\u040F\x03\x02\x02\x02\u040F\u0410\x03\x02\x02\x02\u0410\u0411\x07T\x02" +
		"\x02\u0411\u0412\x05\xB8]\x02\u0412\x7F\x03\x02\x02\x02\u0413\u0418\x05" +
		"\xB8]\x02\u0414\u0415\x07\x04\x02\x02\u0415\u0416\x05\xCEh\x02\u0416\u0417" +
		"\x07\x05\x02\x02\u0417\u0419\x03\x02\x02\x02\u0418\u0414\x03\x02\x02\x02" +
		"\u0418\u0419\x03\x02\x02\x02\u0419\x81\x03\x02\x02\x02\u041A\u041C\x07" +
		"\x86\x02\x02\u041B\u041A\x03\x02\x02\x02\u041B\u041C\x03\x02\x02\x02\u041C" +
		"\u041D\x03\x02\x02\x02\u041D\u041E\x05\x80A\x02\u041E\u041F\x07\n\x02" +
		"\x02\u041F\u0420\x05\x80A\x02\u0420\x83\x03\x02\x02\x02\u0421\u0422\x07" +
		"5\x02\x02\u0422\u0423\x07\x8B\x02\x02\u0423\u0427\x07\b\x02\x02\u0424" +
		"\u0426\x07\x13\x02\x02\u0425\u0424\x03\x02\x02\x02\u0426\u0429\x03\x02" +
		"\x02\x02\u0427\u0425\x03\x02\x02\x02\u0427\u0428\x03\x02\x02\x02\u0428" +
		"\u042F\x03\x02\x02\x02\u0429\u0427\x03\x02\x02\x02\u042A\u042B\x05\x82" +
		"B\x02\u042B\u042C\x05\xC2b\x02\u042C\u042E\x03\x02\x02\x02\u042D\u042A" +
		"\x03\x02\x02\x02\u042E\u0431\x03\x02\x02\x02\u042F\u042D\x03\x02\x02\x02" +
		"\u042F\u0430\x03\x02\x02\x02\u0430\u0435\x03\x02\x02\x02\u0431\u042F\x03" +
		"\x02\x02\x02\u0432\u0434\x07\x13\x02\x02\u0433\u0432\x03\x02\x02\x02\u0434" +
		"\u0437\x03\x02\x02\x02\u0435\u0433\x03\x02\x02\x02\u0435\u0436\x03\x02" +
		"\x02\x02\u0436\u0438\x03\x02\x02\x02\u0437\u0435\x03\x02\x02\x02\u0438" +
		"\u0439\x07\t\x02\x02\u0439\x85\x03\x02\x02\x02\u043A\u0443\x073\x02\x02" +
		"\u043B\u0443\x07B\x02\x02\u043C\u043D\x07\x80\x02\x02\u043D\u0443\x07" +
		"B\x02\x02\u043E\u0443\x07K\x02\x02\u043F\u0443\x07c\x02\x02\u0440\u0443" +
		"\x07\x7F\x02\x02\u0441\u0443\x07\x82\x02\x02\u0442\u043A\x03\x02\x02\x02" +
		"\u0442\u043B\x03\x02\x02\x02\u0442\u043C\x03\x02\x02\x02\u0442\u043E\x03" +
		"\x02\x02\x02\u0442\u043F\x03\x02\x02\x02\u0442\u0440\x03\x02\x02\x02\u0442" +
		"\u0441\x03\x02\x02\x02\u0443\x87\x03\x02\x02\x02\u0444\u044A\x05\xB8]" +
		"\x02\u0445\u0446\x05\xC2b\x02\u0446\u0447\x05\xB8]\x02\u0447\u0449\x03" +
		"\x02\x02\x02\u0448\u0445\x03\x02\x02\x02\u0449\u044C\x03\x02\x02\x02\u044A" +
		"\u0448\x03\x02\x02\x02\u044A\u044B\x03\x02\x02\x02\u044B\u044E\x03\x02" +
		"\x02\x02\u044C\u044A\x03\x02\x02\x02\u044D\u044F\x05\xC2b\x02\u044E\u044D" +
		"\x03\x02\x02\x02\u044E\u044F\x03\x02\x02\x02\u044F\x89\x03\x02\x02\x02" +
		"\u0450\u0451\x05\x86D\x02\u0451\u0452\x075\x02\x02\u0452\u0453\x07T\x02" +
		"\x02\u0453\u0464\x05\xB8]\x02\u0454\u0458\x07\b\x02\x02\u0455\u0457\x07" +
		"\x13\x02\x02\u0456\u0455\x03\x02\x02\x02\u0457\u045A\x03\x02\x02\x02\u0458" +
		"\u0456\x03\x02\x02\x02\u0458\u0459\x03\x02\x02\x02\u0459\u045B\x03\x02" +
		"\x02\x02\u045A\u0458\x03\x02\x02\x02\u045B\u045F\x05\x88E\x02\u045C\u045E" +
		"\x07\x13\x02\x02\u045D\u045C\x03\x02\x02\x02\u045E\u0461\x03\x02\x02\x02" +
		"\u045F\u045D\x03\x02\x02\x02\u045F\u0460\x03\x02\x02\x02\u0460\u0462\x03" +
		"\x02\x02\x02\u0461\u045F\x03\x02\x02\x02\u0462\u0463\x07\t\x02\x02\u0463" +
		"\u0465\x03\x02\x02\x02\u0464\u0454\x03\x02\x02\x02\u0464\u0465\x03\x02" +
		"\x02\x02\u0465\x8B\x03\x02\x02\x02\u0466\u0467\x07P\x02\x02\u0467\u0468" +
		"\x05\xB8]\x02\u0468\x8D\x03\x02\x02\x02\u0469\u046A\x07P\x02\x02\u046A" +
		"\u046B\x05\xB8]\x02\u046B\x8F\x03\x02\x02\x02\u046C\u046E\x05\xD4k\x02" +
		"\u046D\u046C\x03\x02\x02\x02\u046D\u046E\x03\x02\x02\x02\u046E\u046F\x03" +
		"\x02\x02\x02\u046F\u0471\x05\xB8]\x02\u0470\u0472\x07\x13\x02\x02\u0471" +
		"\u0470\x03\x02\x02\x02\u0471\u0472\x03\x02\x02\x02\u0472\u0474\x03\x02" +
		"\x02\x02\u0473\u0475\x05\xD0i\x02\u0474\u0473\x03\x02\x02\x02\u0474\u0475" +
		"\x03\x02\x02\x02\u0475\x91\x03\x02\x02\x02\u0476\u0477\x07a\x02\x02\u0477" +
		"\u0478\x07\x8B\x02\x02\u0478\u0479\x07N\x02\x02\u0479\u047A\x05\xCEh\x02" +
		"\u047A\u047B\x03\x02\x02\x02\u047B\u047C\x07H\x02\x02\u047C\u047D\x05" +
		"\xCEh\x02\u047D\u0481\x07\b\x02\x02\u047E\u0480\x07\x13\x02\x02\u047F" +
		"\u047E\x03\x02\x02\x02\u0480\u0483\x03\x02\x02\x02\u0481\u047F\x03\x02" +
		"\x02\x02\u0481\u0482\x03\x02\x02\x02\u0482\u0489\x03\x02\x02\x02\u0483" +
		"\u0481\x03\x02\x02\x02\u0484\u0485\x05\x90I\x02\u0485\u0486\x05\xC2b\x02" +
		"\u0486\u0488\x03\x02\x02\x02\u0487\u0484\x03\x02\x02\x02\u0488\u048B\x03" +
		"\x02\x02\x02\u0489\u0487\x03\x02\x02\x02\u0489\u048A\x03\x02\x02\x02\u048A" +
		"\u048F\x03\x02\x02\x02\u048B\u0489\x03\x02\x02\x02\u048C\u048E\x07\x13" +
		"\x02\x02\u048D\u048C\x03\x02\x02\x02\u048E\u0491\x03\x02\x02\x02\u048F" +
		"\u048D\x03\x02\x02\x02\u048F\u0490\x03\x02\x02\x02\u0490\u0492\x03\x02" +
		"\x02\x02\u0491\u048F\x03\x02\x02\x02\u0492\u0493\x07\t\x02\x02\u0493\x93" +
		"\x03\x02\x02\x02\u0494\u0497\x05f4\x02\u0495\u0497\x05\x92J\x02\u0496" +
		"\u0494\x03\x02\x02\x02\u0496\u0495\x03\x02\x02\x02\u0497\x95\x03\x02\x02" +
		"\x02\u0498\u049A\x05\xD4k\x02\u0499\u0498\x03\x02\x02\x02\u0499\u049A" +
		"\x03\x02\x02\x02\u049A\u049B\x03\x02\x02\x02\u049B\u049D\x05\x94K\x02" +
		"\u049C\u049E\x07\x13\x02\x02\u049D\u049C\x03\x02\x02\x02\u049D\u049E\x03" +
		"\x02\x02\x02\u049E\u04A0\x03\x02\x02\x02\u049F\u04A1\x05\xD0i\x02\u04A0" +
		"\u049F\x03\x02\x02\x02\u04A0\u04A1\x03\x02\x02\x02\u04A1\x97\x03\x02\x02" +
		"\x02\u04A2\u04A3\x07\x7F\x02\x02\u04A3\u04A4\x07b\x02\x02\u04A4\u04BB" +
		"\x07\x8B\x02\x02\u04A5\u04A9\x07\b\x02\x02\u04A6\u04A8\x07\x13\x02\x02" +
		"\u04A7\u04A6\x03\x02\x02\x02\u04A8\u04AB\x03\x02\x02\x02\u04A9\u04A7\x03" +
		"\x02\x02\x02\u04A9\u04AA\x03\x02\x02\x02\u04AA\u04B1\x03\x02\x02\x02\u04AB" +
		"\u04A9\x03\x02\x02\x02\u04AC\u04AD\x05\x96L\x02\u04AD\u04AE\x05\xC4c\x02" +
		"\u04AE\u04B0\x03\x02\x02\x02\u04AF\u04AC\x03\x02\x02\x02\u04B0\u04B3\x03" +
		"\x02\x02\x02\u04B1\u04AF\x03\x02\x02\x02\u04B1\u04B2\x03\x02\x02\x02\u04B2" +
		"\u04B7\x03\x02\x02\x02\u04B3\u04B1\x03\x02\x02\x02\u04B4\u04B6\x07\x13" +
		"\x02\x02\u04B5\u04B4\x03\x02\x02\x02\u04B6\u04B9\x03\x02\x02\x02\u04B7" +
		"\u04B5\x03\x02\x02\x02\u04B7\u04B8\x03\x02\x02\x02\u04B8\u04BA\x03\x02" +
		"\x02\x02\u04B9\u04B7\x03\x02\x02\x02\u04BA\u04BC\x07\t\x02\x02\u04BB\u04A5" +
		"\x03\x02\x02\x02\u04BB\u04BC\x03\x02\x02\x02\u04BC\u04D4\x03\x02\x02\x02" +
		"\u04BD\u04BE\x07\\\x02\x02\u04BE\u04C2\x07\b\x02\x02\u04BF\u04C1\x07\x13" +
		"\x02\x02\u04C0\u04BF\x03\x02\x02\x02\u04C1\u04C4\x03\x02\x02\x02\u04C2" +
		"\u04C0\x03\x02\x02\x02\u04C2\u04C3\x03\x02\x02\x02\u04C3\u04CA\x03\x02" +
		"\x02\x02\u04C4\u04C2\x03\x02\x02\x02\u04C5\u04C6\x05\x90I\x02\u04C6\u04C7" +
		"\x05\xC2b\x02\u04C7\u04C9\x03\x02\x02\x02\u04C8\u04C5\x03\x02\x02\x02" +
		"\u04C9\u04CC\x03\x02\x02\x02\u04CA\u04C8\x03\x02\x02\x02\u04CA\u04CB\x03" +
		"\x02\x02\x02\u04CB\u04D0\x03\x02\x02\x02\u04CC\u04CA\x03\x02\x02\x02\u04CD" +
		"\u04CF\x07\x13\x02\x02\u04CE\u04CD\x03\x02\x02\x02\u04CF\u04D2\x03\x02" +
		"\x02\x02\u04D0\u04CE\x03\x02\x02\x02\u04D0\u04D1\x03\x02\x02\x02\u04D1" +
		"\u04D3\x03\x02\x02\x02\u04D2\u04D0\x03\x02\x02\x02\u04D3\u04D5\x07\t\x02" +
		"\x02\u04D4\u04BD\x03\x02\x02\x02\u04D4\u04D5\x03\x02\x02\x02\u04D5\x99" +
		"\x03\x02\x02\x02\u04D6\u04DD\x05~@\x02\u04D7\u04DD\x05\x84C\x02\u04D8" +
		"\u04DD\x05\x8AF\x02\u04D9\u04DD\x05\x8CG\x02\u04DA\u04DD\x05\x98M\x02" +
		"\u04DB\u04DD\x05f4\x02\u04DC\u04D6\x03\x02\x02\x02\u04DC\u04D7\x03\x02" +
		"\x02\x02\u04DC\u04D8\x03\x02\x02\x02\u04DC\u04D9\x03\x02\x02\x02\u04DC" +
		"\u04DA\x03\x02\x02\x02\u04DC\u04DB\x03\x02\x02\x02\u04DD\x9B\x03\x02\x02" +
		"\x02\u04DE\u04E0\x05\xD4k\x02\u04DF\u04DE\x03\x02\x02\x02\u04DF\u04E0" +
		"\x03\x02\x02\x02\u04E0\u04E1\x03\x02\x02\x02\u04E1\u04E3\x05\x9AN\x02" +
		"\u04E2\u04E4\x07\x13\x02\x02\u04E3\u04E2\x03\x02\x02\x02\u04E3\u04E4\x03" +
		"\x02\x02\x02\u04E4\u04E6\x03\x02\x02\x02\u04E5\u04E7\x05\xD0i\x02\u04E6" +
		"\u04E5\x03\x02\x02\x02\u04E6\u04E7\x03\x02\x02\x02\u04E7\x9D\x03\x02\x02" +
		"\x02\u04E8\u04E9\x07\x83\x02\x02\u04E9\u04EA\x07\x8B\x02\x02\u04EA\u04EE" +
		"\x07\b\x02\x02\u04EB\u04ED\x07\x13\x02\x02\u04EC\u04EB\x03\x02\x02\x02" +
		"\u04ED\u04F0\x03\x02\x02\x02\u04EE\u04EC\x03\x02\x02\x02\u04EE\u04EF\x03" +
		"\x02\x02\x02\u04EF\u04F6\x03\x02\x02\x02\u04F0\u04EE\x03\x02\x02\x02\u04F1" +
		"\u04F2\x05\x9CO\x02\u04F2\u04F3\x05\xC4c\x02\u04F3\u04F5\x03\x02\x02\x02" +
		"\u04F4\u04F1\x03\x02\x02\x02\u04F5\u04F8\x03\x02\x02\x02\u04F6\u04F4\x03" +
		"\x02\x02\x02\u04F6\u04F7\x03\x02\x02\x02\u04F7\u04FC\x03\x02\x02\x02\u04F8" +
		"\u04F6\x03\x02\x02\x02\u04F9\u04FB\x07\x13\x02\x02\u04FA\u04F9\x03\x02" +
		"\x02\x02\u04FB\u04FE\x03\x02\x02\x02\u04FC\u04FA\x03\x02\x02\x02\u04FC" +
		"\u04FD\x03\x02\x02\x02\u04FD\u04FF\x03\x02\x02\x02\u04FE\u04FC\x03\x02" +
		"\x02\x02\u04FF\u0500\x07\t\x02\x02\u0500\x9F\x03\x02\x02\x02\u0501\u0505" +
		"\x05(\x15\x02\u0502\u0505\x05*\x16\x02\u0503\u0505\x05\x8EH\x02\u0504" +
		"\u0501\x03\x02\x02\x02\u0504\u0502\x03\x02\x02\x02\u0504\u0503\x03\x02" +
		"\x02\x02\u0505\xA1\x03\x02\x02\x02\u0506\u0508\x05\xD4k\x02\u0507\u0506" +
		"\x03\x02\x02\x02\u0507\u0508\x03\x02\x02\x02\u0508\u0509\x03\x02\x02\x02" +
		"\u0509\u050B\x05\xA0Q\x02\u050A\u050C\x07\x13\x02\x02\u050B\u050A\x03" +
		"\x02\x02\x02\u050B\u050C\x03\x02\x02\x02\u050C\u050E\x03\x02\x02\x02\u050D" +
		"\u050F\x05\xD0i\x02\u050E\u050D\x03\x02\x02\x02\u050E\u050F\x03\x02\x02" +
		"\x02\u050F\xA3\x03\x02\x02\x02\u0510\u0511\x07U\x02\x02\u0511\u0512\x07" +
		"\x8B\x02\x02\u0512\u0516\x07\b\x02\x02\u0513\u0515\x07\x13\x02\x02\u0514" +
		"\u0513\x03\x02\x02\x02\u0515\u0518\x03\x02\x02\x02\u0516\u0514\x03\x02" +
		"\x02\x02\u0516\u0517\x03\x02\x02\x02\u0517\u051E\x03\x02\x02\x02\u0518" +
		"\u0516\x03\x02\x02\x02\u0519\u051A\x05\xA2R\x02\u051A\u051B\x05\xC4c\x02" +
		"\u051B\u051D\x03\x02\x02\x02\u051C\u0519\x03\x02\x02\x02\u051D\u0520\x03" +
		"\x02\x02\x02\u051E\u051C\x03\x02\x02\x02\u051E\u051F\x03\x02\x02\x02\u051F" +
		"\u0524\x03\x02\x02\x02\u0520\u051E\x03\x02\x02\x02\u0521\u0523\x07\x13" +
		"\x02\x02\u0522\u0521\x03\x02\x02\x02\u0523\u0526\x03\x02\x02\x02\u0524" +
		"\u0522\x03\x02\x02\x02\u0524\u0525\x03\x02\x02\x02\u0525\u0527\x03\x02" +
		"\x02\x02\u0526\u0524\x03\x02\x02\x02\u0527\u0528\x07\t\x02\x02\u0528\xA5" +
		"\x03\x02\x02\x02\u0529\u0539\x07T\x02\x02\u052A\u0539\x074\x02\x02\u052B" +
		"\u052D\x07;\x02\x02\u052C\u052B\x03\x02\x02\x02\u052C\u052D\x03\x02\x02" +
		"\x02\u052D\u052E\x03\x02\x02\x02\u052E\u0539\x076\x02\x02\u052F\u0539" +
		"\x07f\x02\x02\u0530\u0539\x07\x83\x02\x02\u0531\u0533\x07;\x02\x02\u0532" +
		"\u0531\x03\x02\x02\x02\u0532\u0533\x03\x02\x02\x02\u0533\u0534\x03\x02" +
		"\x02\x02\u0534\u0539\x07\x85\x02\x02\u0535\u0536\x07{\x02\x02\u0536\u0539" +
		"\x07Y\x02\x02\u0537\u0539\x07U\x02\x02\u0538\u0529\x03\x02\x02\x02\u0538" +
		"\u052A\x03\x02\x02\x02\u0538\u052C\x03\x02\x02\x02\u0538\u052F\x03\x02" +
		"\x02\x02\u0538\u0530\x03\x02\x02\x02\u0538\u0532\x03\x02\x02\x02\u0538" +
		"\u0535\x03\x02\x02\x02\u0538\u0537\x03\x02\x02\x02\u0539\xA7\x03\x02\x02" +
		"\x02\u053A\u053B\x07W\x02\x02\u053B\u053C\x05\xA6T\x02\u053C\u053D\x05" +
		"\xB8]\x02\u053D\u053E\x07-\x02\x02\u053E\u053F\x07\x19\x02\x02\u053F\xA9" +
		"\x03\x02\x02\x02\u0540\u0550\x05\b\x05\x02\u0541\u0550\x05\n\x06\x02\u0542" +
		"\u0550\x05\x0E\b\x02\u0543\u0550\x05z>\x02\u0544\u0550\x05r:\x02\u0545" +
		"\u0550\x05\x10\t\x02\u0546\u0550\x05\xA4S\x02\u0547\u0550\x05\xAEX\x02" +
		"\u0548\u0550\x05|?\x02\u0549\u0550\x05\x18\r\x02\u054A\u0550\x05\xA8U" +
		"\x02\u054B\u0550\x05`1\x02\u054C\u0550\x05f4\x02\u054D\u0550\x05\x9EP" +
		"\x02\u054E\u0550\x05V,\x02\u054F\u0540\x03\x02\x02\x02\u054F\u0541\x03" +
		"\x02\x02\x02\u054F\u0542\x03\x02\x02\x02\u054F\u0543\x03\x02\x02\x02\u054F" +
		"\u0544\x03\x02\x02\x02\u054F\u0545\x03\x02\x02\x02\u054F\u0546\x03\x02" +
		"\x02\x02\u054F\u0547\x03\x02\x02\x02\u054F\u0548\x03\x02\x02\x02\u054F" +
		"\u0549\x03\x02\x02\x02\u054F\u054A\x03\x02\x02\x02\u054F\u054B\x03\x02" +
		"\x02\x02\u054F\u054C\x03\x02\x02\x02\u054F\u054D\x03\x02\x02\x02\u054F" +
		"\u054E\x03\x02\x02\x02\u0550\xAB\x03\x02\x02\x02\u0551\u0553\x05\xD4k" +
		"\x02\u0552\u0551\x03\x02\x02\x02\u0552\u0553\x03\x02\x02\x02\u0553\u0554" +
		"\x03\x02\x02\x02\u0554\u0556\x05\xAAV\x02\u0555\u0557\x07\x13\x02\x02" +
		"\u0556\u0555\x03\x02\x02\x02\u0556\u0557\x03\x02\x02\x02\u0557\u0559\x03" +
		"\x02\x02\x02\u0558\u055A\x05\xD0i\x02\u0559\u0558\x03\x02\x02\x02\u0559" +
		"\u055A\x03\x02\x02\x02\u055A\xAD\x03\x02\x02\x02\u055B\u055C\x07[\x02" +
		"\x02\u055C\u055D\x07\x8B\x02\x02\u055D\u0561\x07\b\x02\x02\u055E\u0560" +
		"\x07\x13\x02\x02\u055F\u055E\x03\x02\x02\x02\u0560\u0563\x03\x02\x02\x02" +
		"\u0561\u055F\x03\x02\x02\x02\u0561\u0562\x03\x02\x02\x02\u0562\u0569\x03" +
		"\x02\x02\x02\u0563\u0561\x03\x02\x02\x02\u0564\u0565\x05\xACW\x02\u0565" +
		"\u0566\x05\xC4c\x02\u0566\u0568\x03\x02\x02\x02\u0567\u0564\x03\x02\x02" +
		"\x02\u0568\u056B\x03\x02\x02\x02\u0569\u0567\x03\x02\x02\x02\u0569\u056A" +
		"\x03\x02\x02\x02\u056A\u056F\x03\x02\x02\x02\u056B\u0569\x03\x02\x02\x02" +
		"\u056C\u056E\x07\x13\x02\x02\u056D\u056C\x03\x02\x02\x02\u056E\u0571\x03" +
		"\x02\x02\x02\u056F\u056D\x03\x02\x02\x02\u056F\u0570\x03\x02\x02\x02\u0570" +
		"\u0572\x03\x02\x02\x02\u0571\u056F\x03\x02\x02\x02\u0572\u0573\x07\t\x02" +
		"\x02\u0573\xAF\x03\x02\x02\x02\u0574\u0576\x07o\x02\x02\u0575\u0574\x03" +
		"\x02\x02\x02\u0575\u0576\x03\x02\x02\x02\u0576\u0577\x03\x02\x02\x02\u0577" +
		"\u0578\x07\x8B\x02\x02\u0578\u0579\x07\x06\x02\x02\u0579\u057A\x05\xC0" +
		"a\x02\u057A\xB1\x03\x02\x02\x02\u057B\u057D\x05\xD4k\x02\u057C\u057B\x03" +
		"\x02\x02\x02\u057C\u057D\x03\x02\x02\x02\u057D\u057E\x03\x02\x02\x02\u057E" +
		"\u0584\x05\xB0Y\x02\u057F\u0581\x07\x07\x02\x02\u0580\u057F\x03\x02\x02" +
		"\x02\u0580\u0581\x03\x02\x02\x02\u0581\u0582\x03\x02\x02\x02\u0582\u0585" +
		"\x05\xD2j\x02\u0583\u0585\x05\xC2b\x02\u0584\u0580\x03\x02\x02\x02\u0584" +
		"\u0583\x03\x02\x02\x02\u0585\xB3\x03\x02\x02\x02\u0586\u0588\x05\xD4k" +
		"\x02\u0587\u0586\x03\x02\x02\x02\u0587\u0588\x03\x02\x02\x02\u0588\u0589" +
		"\x03\x02\x02\x02\u0589\u058F\x05\xB0Y\x02\u058A\u058C\x07\x07\x02\x02" +
		"\u058B\u058A\x03\x02\x02\x02\u058B\u058C\x03\x02\x02\x02\u058C\u058D\x03" +
		"\x02\x02\x02\u058D\u0590\x05\xD2j\x02\u058E\u0590\x05\xC2b\x02\u058F\u058B" +
		"\x03\x02\x02\x02\u058F\u058E\x03\x02\x02\x02\u058F\u0590\x03\x02\x02\x02" +
		"\u0590\xB5\x03\x02\x02\x02\u0591\u0595\x07\v\x02\x02\u0592\u0594\x07\x13" +
		"\x02\x02\u0593\u0592\x03\x02\x02\x02\u0594\u0597\x03\x02\x02\x02\u0595" +
		"\u0593\x03\x02\x02\x02\u0595\u0596\x03\x02\x02\x02\u0596\u059F\x03\x02" +
		"\x02\x02\u0597\u0595\x03\x02\x02\x02\u0598\u059A\x05\xB2Z\x02\u0599\u0598" +
		"\x03\x02\x02\x02\u059A\u059D\x03\x02\x02\x02\u059B\u0599\x03\x02\x02\x02" +
		"\u059B\u059C\x03\x02\x02\x02\u059C\u059E\x03\x02\x02\x02\u059D\u059B\x03" +
		"\x02\x02\x02\u059E\u05A0\x05\xB4[\x02\u059F\u059B\x03\x02\x02\x02\u059F" +
		"\u05A0\x03\x02\x02\x02\u05A0\u05A1\x03\x02\x02\x02\u05A1\u05A2\x07\f\x02" +
		"\x02\u05A2\xB7\x03\x02\x02\x02\u05A3\u05A8\x07\x8B\x02\x02\u05A4\u05A5" +
		"\x07\r\x02\x02\u05A5\u05A7\x07\x8B\x02\x02\u05A6\u05A4\x03\x02\x02\x02" +
		"\u05A7\u05AA\x03\x02\x02\x02\u05A8\u05A6\x03\x02\x02\x02\u05A8\u05A9\x03" +
		"\x02\x02\x02\u05A9\xB9\x03\x02\x02\x02\u05AA\u05A8\x03\x02\x02\x02\u05AB" +
		"\u05AC\t\x06\x02\x02\u05AC\xBB\x03\x02\x02\x02\u05AD\u05AE\t\x07\x02\x02" +
		"\u05AE\xBD\x03\x02\x02\x02\u05AF\u05B2\x07|\x02\x02\u05B0\u05B1\x07y\x02" +
		"\x02\u05B1\u05B3\x05\xCEh\x02\u05B2\u05B0\x03\x02\x02\x02\u05B2\u05B3" +
		"\x03\x02\x02\x02\u05B3\xBF\x03\x02\x02\x02\u05B4\u05B8\x05\xBE`\x02\u05B5" +
		"\u05B8\x05\xBC_\x02\u05B6\u05B8\x05\xB8]\x02\u05B7\u05B4\x03\x02\x02\x02" +
		"\u05B7\u05B5\x03\x02\x02\x02\u05B7\u05B6\x03\x02\x02\x02\u05B8\xC1\x03" +
		"\x02\x02\x02\u05B9\u05BD\x07\x07\x02\x02\u05BA\u05BC\x07\x13\x02\x02\u05BB" +
		"\u05BA\x03\x02\x02\x02\u05BC\u05BF\x03\x02\x02\x02\u05BD\u05BB\x03\x02" +
		"\x02\x02\u05BD\u05BE\x03\x02\x02\x02\u05BE\u05C6\x03\x02\x02\x02\u05BF" +
		"\u05BD\x03\x02\x02\x02\u05C0\u05C2\x07\x13\x02\x02\u05C1\u05C0\x03\x02" +
		"\x02\x02\u05C2\u05C3\x03\x02\x02\x02\u05C3\u05C1\x03\x02\x02\x02\u05C3" +
		"\u05C4\x03\x02\x02\x02\u05C4\u05C6\x03\x02\x02\x02\u05C5\u05B9\x03\x02" +
		"\x02\x02\u05C5\u05C1\x03\x02\x02\x02\u05C6\xC3\x03\x02\x02\x02\u05C7\u05CB" +
		"\x07\x0E\x02\x02\u05C8\u05CA\x07\x13\x02\x02\u05C9\u05C8\x03\x02\x02\x02" +
		"\u05CA\u05CD\x03\x02\x02\x02\u05CB\u05C9\x03\x02\x02\x02\u05CB\u05CC\x03" +
		"\x02\x02\x02\u05CC\u05D4\x03\x02\x02\x02\u05CD\u05CB\x03\x02\x02\x02\u05CE" +
		"\u05D0\x07\x13\x02\x02\u05CF\u05CE\x03\x02\x02\x02\u05D0\u05D1\x03\x02" +
		"\x02\x02\u05D1\u05CF\x03\x02\x02\x02\u05D1\u05D2\x03\x02\x02\x02\u05D2" +
		"\u05D4\x03\x02\x02\x02\u05D3\u05C7\x03\x02\x02\x02\u05D3\u05CF\x03\x02" +
		"\x02\x02\u05D4\xC5\x03\x02\x02\x02\u05D5\u05D9\x07\x04\x02\x02\u05D6\u05D8" +
		"\x07\x13\x02\x02\u05D7\u05D6\x03\x02\x02\x02\u05D8\u05DB\x03\x02\x02\x02" +
		"\u05D9\u05D7\x03\x02\x02\x02\u05D9\u05DA\x03\x02\x02\x02\u05DA\u05E5\x03" +
		"\x02\x02\x02\u05DB\u05D9\x03\x02\x02\x02\u05DC\u05E2\x05\xCCg\x02\u05DD" +
		"\u05DE\x05\xC2b\x02\u05DE\u05DF\x05\xCCg\x02\u05DF\u05E1\x03\x02\x02\x02" +
		"\u05E0\u05DD\x03\x02\x02\x02\u05E1\u05E4\x03\x02\x02\x02\u05E2\u05E0\x03" +
		"\x02\x02\x02\u05E2\u05E3\x03\x02\x02\x02\u05E3\u05E6\x03\x02\x02\x02\u05E4" +
		"\u05E2\x03\x02\x02\x02\u05E5\u05DC\x03\x02\x02\x02\u05E5\u05E6\x03\x02" +
		"\x02\x02\u05E6\u05E7\x03\x02\x02\x02\u05E7\u05E8\x07\x05\x02\x02\u05E8" +
		"\xC7\x03\x02\x02\x02\u05E9\u05EA\x07\x8B\x02\x02\u05EA\u05EB\x07\x03\x02" +
		"\x02\u05EB\u05EC\x05\xCEh\x02\u05EC\xC9\x03\x02\x02\x02\u05ED\u05F1\x07" +
		"\b\x02\x02\u05EE\u05F0\x07\x13\x02\x02\u05EF\u05EE\x03\x02\x02\x02\u05F0" +
		"\u05F3\x03\x02\x02\x02\u05F1\u05EF\x03\x02\x02\x02\u05F1\u05F2\x03\x02" +
		"\x02\x02\u05F2\u0600\x03\x02\x02\x02\u05F3\u05F1\x03\x02\x02\x02\u05F4" +
		"\u05FA\x05\xC8e\x02\u05F5\u05F6\x05\xC2b\x02\u05F6\u05F7\x05\xC8e\x02" +
		"\u05F7\u05F9\x03\x02\x02\x02\u05F8\u05F5\x03\x02\x02\x02\u05F9\u05FC\x03" +
		"\x02\x02\x02\u05FA\u05F8\x03\x02\x02\x02\u05FA\u05FB\x03\x02\x02\x02\u05FB" +
		"\u05FE\x03\x02\x02\x02\u05FC\u05FA\x03\x02\x02\x02\u05FD\u05FF\x05\xC2" +
		"b\x02\u05FE\u05FD\x03\x02\x02\x02\u05FE\u05FF\x03\x02\x02\x02\u05FF\u0601" +
		"\x03\x02\x02\x02\u0600\u05F4\x03\x02\x02\x02\u0600\u0601\x03\x02\x02\x02" +
		"\u0601\u0602\x03\x02\x02\x02\u0602\u0603\x07\t\x02\x02\u0603\xCB\x03\x02" +
		"\x02\x02\u0604\u0605\bg\x01\x02\u0605\u0606\x07\x0F\x02\x02\u0606\u0611" +
		"\x05\xCCg\v\u0607\u0611\x05\xB8]\x02\u0608\u0611\x07\x18\x02\x02\u0609" +
		"\u0611\x07\x1A\x02\x02\u060A\u0611\x07\x1B\x02\x02\u060B\u0611\x07\x19" +
		"\x02\x02\u060C\u060D\x07\v\x02\x02\u060D\u060E\x05\xCCg\x02\u060E\u060F" +
		"\x07\f\x02\x02\u060F\u0611\x03\x02\x02\x02\u0610\u0604\x03\x02\x02\x02" +
		"\u0610\u0607\x03\x02\x02\x02\u0610\u0608\x03\x02\x02\x02\u0610\u0609\x03" +
		"\x02\x02\x02\u0610\u060A\x03\x02\x02\x02\u0610\u060B\x03\x02\x02\x02\u0610" +
		"\u060C\x03\x02\x02\x02\u0611\u061A\x03\x02\x02\x02\u0612\u0613\f\n\x02" +
		"\x02\u0613\u0614\t\b\x02\x02\u0614\u0619\x05\xCCg\v\u0615\u0616\f\t\x02" +
		"\x02\u0616\u0617\t\t\x02\x02\u0617\u0619\x05\xCCg\n\u0618\u0612\x03\x02" +
		"\x02\x02\u0618\u0615\x03\x02\x02\x02\u0619\u061C\x03\x02\x02\x02\u061A" +
		"\u0618\x03\x02\x02\x02\u061A\u061B\x03\x02\x02\x02\u061B\xCD\x03\x02\x02" +
		"\x02\u061C\u061A\x03\x02\x02\x02\u061D\u0621\x05\xC6d\x02\u061E\u0621" +
		"\x05\xCAf\x02\u061F\u0621\x05\xCCg\x02\u0620\u061D\x03\x02\x02\x02\u0620" +
		"\u061E\x03\x02\x02\x02\u0620\u061F\x03\x02\x02\x02\u0621\xCF\x03\x02\x02" +
		"\x02\u0622\u0623\x07\x17\x02\x02\u0623\xD1\x03\x02\x02\x02\u0624\u0626" +
		"\x07\x13\x02\x02\u0625\u0624\x03\x02\x02\x02\u0625\u0626\x03\x02\x02\x02" +
		"\u0626\u0629\x03\x02\x02\x02\u0627\u0628\x07\x17\x02\x02\u0628\u062A\x07" +
		"\x13\x02\x02\u0629\u0627\x03\x02\x02\x02\u062A\u062B\x03\x02\x02\x02\u062B" +
		"\u0629\x03\x02\x02\x02\u062B\u062C\x03\x02\x02\x02\u062C\u0630\x03\x02" +
		"\x02\x02\u062D\u062F\x07\x13\x02\x02\u062E\u062D\x03\x02\x02\x02\u062F" +
		"\u0632\x03\x02\x02\x02\u0630\u062E\x03\x02\x02\x02\u0630\u0631\x03\x02" +
		"\x02\x02\u0631\xD3\x03\x02\x02\x02\u0632\u0630\x03\x02\x02\x02\u0633\u0634" +
		"\x07\x17\x02\x02\u0634\u0636\x07\x13\x02\x02\u0635\u0633\x03\x02\x02\x02" +
		"\u0636\u0637\x03\x02\x02\x02\u0637\u0635\x03\x02\x02\x02\u0637\u0638\x03" +
		"\x02\x02\x02\u0638\u063C\x03\x02\x02\x02\u0639\u063B\x07\x13\x02\x02\u063A" +
		"\u0639\x03\x02\x02\x02\u063B\u063E\x03\x02\x02\x02\u063C\u063A\x03\x02" +
		"\x02\x02\u063C\u063D\x03\x02\x02\x02\u063D\xD5\x03\x02\x02\x02\u063E\u063C" +
		"\x03\x02\x02\x02\xE6\xD9\xDF\xE3\xE9\xF1\xF7\xFB\u0101\u0109\u010F\u0113" +
		"\u0119\u0122\u012B\u012E\u0139\u013D\u0140\u014D\u0152\u0155\u0159\u015D" +
		"\u0160\u0164\u0168\u016B\u0173\u0179\u017D\u0182\u018C\u0190\u0194\u0197" +
		"\u019F\u01A3\u01A8\u01AD\u01B6\u01CD\u01D3\u01D7\u01E1\u01E6\u01E9\u01F0" +
		"\u01F3\u01FE\u0207\u020B\u020D\u0214\u021C\u0220\u0224\u0228\u022C\u0232" +
		"\u023A\u0245\u024E\u0254\u025B\u0264\u0267\u026A\u026F\u0279\u027F\u028F" +
		"\u0292\u0296\u0299\u02A1\u02A9\u02AF\u02B3\u02BB\u02BE\u02C2\u02C5\u02CE" +
		"\u02D6\u02DC\u02E0\u02EA\u02ED\u02F2\u02F5\u02F9\u02FC\u02FF\u0302\u0305" +
		"\u0309\u030C\u030F\u0312\u0315\u031B\u0321\u0327\u032B\u0330\u0336\u0343" +
		"\u0348\u034E\u0354\u0362\u0366\u0369\u0371\u0375\u037C\u0381\u0384\u038A" +
		"\u038D\u0398\u039C\u03A1\u03A6\u03AA\u03AE\u03B4\u03BC\u03C2\u03C6\u03DE" +
		"\u03E1\u03E5\u03E8\u03F1\u03F9\u03FF\u0407\u040B\u040E\u0418\u041B\u0427" +
		"\u042F\u0435\u0442\u044A\u044E\u0458\u045F\u0464\u046D\u0471\u0474\u0481" +
		"\u0489\u048F\u0496\u0499\u049D\u04A0\u04A9\u04B1\u04B7\u04BB\u04C2\u04CA" +
		"\u04D0\u04D4\u04DC\u04DF\u04E3\u04E6\u04EE\u04F6\u04FC\u0504\u0507\u050B" +
		"\u050E\u0516\u051E\u0524\u052C\u0532\u0538\u054F\u0552\u0556\u0559\u0561" +
		"\u0569\u056F\u0575\u057C\u0580\u0584\u0587\u058B\u058F\u0595\u059B\u059F" +
		"\u05A8\u05B2\u05B7\u05BD\u05C3\u05C5\u05CB\u05D1\u05D3\u05D9\u05E2\u05E5" +
		"\u05F1\u05FA\u05FE\u0600\u0610\u0618\u061A\u0620\u0625\u062B\u0630\u0637" +
		"\u063C";
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
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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
	public _type!: TypeNameContext;
	public _default_!: ExprContext;
	public ENUM(): TerminalNode { return this.getToken(FppParser.ENUM, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(FppParser.IDENTIFIER, 0); }
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
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
	public DICTIONARY(): TerminalNode | undefined { return this.tryGetToken(FppParser.DICTIONARY, 0); }
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


