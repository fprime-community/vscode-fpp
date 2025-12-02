grammar Fpp;

prog:
    NL* (moduleMember (semiDelim | EOF))* NL*
    EOF
    ;

progTopology:
    NL* (topologyMember (semiDelim | EOF))* NL*
    EOF
    ;

progComponent:
    NL* (componentMember (semiDelim | EOF))* NL*
    EOF
    ;

// progStateMachine:
//     NL* (stateMachineMember (semiDelim | EOF))* NL*
//     EOF
//     ;

// progState:
//     NL* (stateMember (semiDelim | EOF))* NL*
//     EOF
//     ;

abstractTypeDecl: TYPE name=IDENTIFIER;

aliasTypeDecl: DICTIONARY? TYPE name=IDENTIFIER '=' type=typeName;

arrayDecl:
    DICTIONARY? ARRAY name=IDENTIFIER '=' '[' size=expr ']'
    type=typeName
    (DEFAULT default_=expr)?
    (FORMAT format=LIT_STRING)?
    ;

constantDecl: DICTIONARY? CONSTANT name=IDENTIFIER '=' value=expr;

structMember:
    name=IDENTIFIER ':' ('[' size=expr ']')?
    type=typeName (FORMAT format=LIT_STRING)?
    ;

structMemberN: preAnnotation? structMember (','? postMultiAnnotation | commaDelim);
structMemberL: preAnnotation? structMember (','? postMultiAnnotation | commaDelim)?;
structDecl:
    DICTIONARY? STRUCT name=IDENTIFIER '{'
        NL* (structMemberN* structMemberL)?
    '}' (DEFAULT default_=structExpr)?
    ;

queueFullBehavior: ASSERT | BLOCK | DROP | HOOK;
commandKind: ASYNC | GUARDED | SYNC;
commandDecl:
    kind=commandKind COMMAND name=IDENTIFIER
    params=formalParameterList?
    (OPCODE opcode=expr)?
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

paramDecl:
    PARAM name=IDENTIFIER ':' type=typeName
    (DEFAULT default_=expr)?
    (ID id=expr)?
    (SET OPCODE setOpcode=expr)?
    (SAVE OPCODE saveOpcode=expr)?
    ;

generalPortKind:
    ASYNC INPUT
    | GUARDED INPUT
    | SYNC INPUT
    | OUTPUT
    ;

specialPortKind:
    COMMAND RECV
    | COMMAND REG
    | COMMAND RESP
    | EVENT
    | PARAM GET
    | PARAM SET
    | TELEMETRY
    | TEXT EVENT
    | TIME GET
    | PRODUCT GET
    | PRODUCT REQUEST
    | (ASYNC | GUARDED | SYNC)? PRODUCT RECV
    | PRODUCT SEND
    ;

generalPortInstanceType: SERIAL | qualIdent;
generalPortInstanceDecl:
    kind=generalPortKind PORT name=IDENTIFIER
    ':' ('[' n=expr ']')?
    type=generalPortInstanceType
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

specialPortInstanceDecl:
    specialPortKind PORT name=IDENTIFIER
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

telemetryLimitKind: RED | ORANGE | YELLOW;
telemetryLimitExpr: kind=telemetryLimitKind limit=expr;
telemetryLimit: '{' NL* (telemetryLimitExpr (commaDelim telemetryLimitExpr)* commaDelim?)? '}';
telemetryUpdate: ALWAYS | ON CHANGE;
telemetryChannelDecl:
    TELEMETRY name=IDENTIFIER ':' type=typeName
    (ID id=expr)?
    (UPDATE update=telemetryUpdate)?
    (FORMAT format=LIT_STRING)?
    (LOW low=telemetryLimit)?
    (HIGH high=telemetryLimit)?
    ;

actionDef: ACTION name=IDENTIFIER (':' type=typeName)?;
choiceDef: CHOICE name=IDENTIFIER '{' NL* IF guard=IDENTIFIER then=transitionExpr ELSE else=transitionExpr NL* '}';
guardDef: GUARD name=IDENTIFIER (':' type=typeName)?;
signalDef: SIGNAL name=IDENTIFIER (':' type=typeName)?;

doExpr: DO '{' NL* (IDENTIFIER (commaDelim IDENTIFIER)*)? commaDelim? '}';
transitionExpr: do=doExpr? ENTER state=qualIdent;
initialTransition: INITIAL transition=transitionExpr;

transitionOrDoExpr: transitionExpr | doExpr;
stateTransition: ON signal=IDENTIFIER (IF guard=IDENTIFIER)? transition=transitionOrDoExpr;
stateEntry: ENTRY do=doExpr;
stateExit: EXIT do=doExpr;

stateMemberTempl:
    initialTransition
    | choiceDef
    | stateDef
    | stateTransition
    | stateEntry
    | stateExit
    ;

stateMember: preAnnotation? stateMemberTempl NL? postAnnotation?;
stateDef: STATE name=IDENTIFIER ('{'
        NL* (stateMember semiDelim)* NL*
    '}')?;

stateMachineMemberTempl:
    choiceDef
    | guardDef
    | initialTransition
    | signalDef
    | stateDef
    | actionDef
    ;

stateMachineMember: preAnnotation? stateMachineMemberTempl NL? postAnnotation?;
stateMachineDef: STATE MACHINE name=IDENTIFIER
    ('{' NL* (stateMachineMember semiDelim)* NL* '}')?
    ;

stateMachineInstance: STATE MACHINE INSTANCE name=IDENTIFIER ':' stateMachine=qualIdent
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

enumMember: name=IDENTIFIER ('=' value=expr)?;
enumMemberN: preAnnotation? enumMember (','? (NL? postAnnotation)? | commaDelim);
enumMemberL: preAnnotation? enumMember (','? (NL? postAnnotation)? | commaDelim);
enumDecl: DICTIONARY? ENUM name=IDENTIFIER (':' type=typeName)?
    '{'
        NL* (enumMemberN* enumMemberL)? NL*
    '}' (DEFAULT default_=expr)?
    ;

eventSeverity:
    ACTIVITY HIGH
    | ACTIVITY LOW
    | COMMAND
    | DIAGNOSTIC
    | FATAL
    | WARNING HIGH
    | WARNING LOW
    ;
eventDecl: EVENT name=IDENTIFIER
    params=formalParameterList?
    SEVERITY eventSeverity
    (ID id=expr)?
    FORMAT format=LIT_STRING
    (THROTTLE throttle=expr)?
    ;

includeStmt: INCLUDE include=LIT_STRING;
matchStmt: MATCH match=IDENTIFIER WITH with_=IDENTIFIER;

internalPortDecl:
    INTERNAL PORT name=IDENTIFIER
    params=formalParameterList?
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

recordSpecifierDecl:
    PRODUCT RECORD name=IDENTIFIER ':' fppType=typeName ARRAY? (ID id=expr)?
    ;

containerSpecifierDecl:
    PRODUCT CONTAINER name=IDENTIFIER (ID id=expr)? (DEFAULT PRIORITY priority=expr)?
    ;

initSpecifier: preAnnotation? PHASE phaseExpr=expr code=LIT_STRING NL? postAnnotation?;
componentInstanceDecl:
    INSTANCE name=IDENTIFIER ':' fppType=qualIdent
    BASE ID base_id=expr
    (TYPE cppType=LIT_STRING)?
    (AT at=LIT_STRING)?
    (QUEUE SIZE queueSize=expr)?
    (STACK SIZE stackSize=expr)?
    (PRIORITY priority=expr)?
    (CPU cpu=expr)?
    ('{'
        NL* (initSpecifier semiDelim)* NL*
    '}')?
    ;

componentKind: ACTIVE | PASSIVE | QUEUED;
componentMemberTempl:
    abstractTypeDecl
    | aliasTypeDecl
    | arrayDecl
    | constantDecl
    | structDecl
    | commandDecl
    | importInterfaceStmt
    | paramDecl
    | generalPortInstanceDecl
    | specialPortInstanceDecl
    | telemetryChannelDecl
    | enumDecl
    | eventDecl
    | includeStmt
    | internalPortDecl
    | matchStmt
    | recordSpecifierDecl
    | containerSpecifierDecl
    | stateMachineInstance
    | stateMachineDef
    ;

componentMember: preAnnotation? componentMemberTempl NL? postAnnotation?;

componentDecl:
    kind=componentKind COMPONENT name=IDENTIFIER '{'
        NL* (componentMember semiDelim)* NL*
    '}'
    ;

portDecl:
    PORT name=IDENTIFIER params=formalParameterList?
    ('->' returnType=typeName)?
    ;

componentInstanceSpec: PRIVATE? INSTANCE name=qualIdent;
connectionNode: node=qualIdent ('[' index=expr ']')?;
connection: UNMATCHED? source=connectionNode '->' destination=connectionNode;
directGraphDecl:
    CONNECTIONS name=IDENTIFIER '{'
        NL* (connection commaDelim)* NL*
    '}'
    ;

patternKind:
    COMMAND
    | EVENT
    | TEXT EVENT
    | HEALTH
    | PARAM
    | TELEMETRY
    | TIME
    ;
patternGraphSources: (qualIdent (commaDelim qualIdent)* commaDelim?);
patternGraphStmt:
    kind=patternKind CONNECTIONS INSTANCE target=qualIdent
    ('{' NL* patternGraphSources NL* '}')?
    ;

importTopologyStmt: IMPORT symbol=qualIdent;
importInterfaceStmt: IMPORT symbol=qualIdent;

telemetryChannelIdentifier: preAnnotation? qualIdent NL? postAnnotation?;

telemetryPacketSpecifier:
    PACKET name=IDENTIFIER (ID id=expr) GROUP group=expr
    '{' NL* (packets=telemetryChannelIdentifier commaDelim)* NL* '}'
    ;

telemetryPacketSetMemberTempl:
    includeStmt
    | telemetryPacketSpecifier
    ;

telemetryPacketSetMember:
    preAnnotation? telemetryPacketSetMemberTempl NL? postAnnotation?;

telemetryPacketSetDecl:
    TELEMETRY PACKETS name=IDENTIFIER
    ('{' NL* (telemetryPacketSetMember semiDelim)* NL* '}')?
    (OMIT '{' NL* (omit=telemetryChannelIdentifier commaDelim)* NL* '}')?
    ;

topologyMemberTempl:
    componentInstanceSpec
    | directGraphDecl
    | patternGraphStmt
    | importTopologyStmt
    | telemetryPacketSetDecl
    | includeStmt
    ;

topologyMember: preAnnotation? topologyMemberTempl NL? postAnnotation?;

topologyDecl:
    TOPOLOGY name=IDENTIFIER '{'
        NL* (topologyMember semiDelim)* NL*
    '}'
    ;

interfaceMemberTempl:
    generalPortInstanceDecl
    | specialPortInstanceDecl
    | importInterfaceStmt
    ;

interfaceMember: preAnnotation? interfaceMemberTempl NL? postAnnotation?;

interfaceDecl:
    INTERFACE name=IDENTIFIER '{'
        NL* (interfaceMember semiDelim)* NL*
    '}'
    ;

locationKind:
    INSTANCE
    | COMPONENT
    | DICTIONARY? CONSTANT
    | PORT
    | TOPOLOGY
    | DICTIONARY? TYPE
    | STATE MACHINE
    | INTERFACE
    ;
locationStmt:
    LOCATE kind=locationKind
    name=qualIdent AT path=LIT_STRING;

moduleMemberTempl:
    abstractTypeDecl
    | aliasTypeDecl
    | arrayDecl
    | componentDecl
    | componentInstanceDecl
    | constantDecl
    | interfaceDecl
    | moduleDecl
    | portDecl
    | structDecl
    | locationStmt
    | enumDecl
    | includeStmt
    | topologyDecl
    | stateMachineDef
    ;

moduleMember: preAnnotation? moduleMemberTempl NL? postAnnotation?;

moduleDecl: MODULE name=IDENTIFIER '{'
        NL* (moduleMember semiDelim)* NL*
    '}'
    ;

//////////////////////
// Helper definitions
//////////////////////

formalParameter: REF? name=IDENTIFIER ':' type=typeName;

// Normal
formalParameterN: (preAnnotation)? formalParameter (','? postMultiAnnotation | commaDelim);
formalParamaterL: (preAnnotation)? formalParameter (','? postMultiAnnotation | commaDelim)?;

formalParameterList: '(' NL* (formalParameterN* formalParamaterL)? ')';

qualIdent: IDENTIFIER ('.' IDENTIFIER)*;

// PRIM_TYPE:  U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64 | F32 | F64 | BOOL;
intType:  U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64;
primitiveType: U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64 | F32 | F64 | BOOL;
stringType: STRING (SIZE size=expr)?;
typeName: stringType | primitiveType | qualIdent;

commaDelim: ',' NL* | NL+;
semiDelim: ';' NL* | NL+;

//////////////////////
// Expression definitions
//////////////////////

exprDot: '.' member=IDENTIFIER;
exprSubscript: '[' index=expr ']';
exprUnary: '-' expr;
exprMulDiv: op=('*' | '/') right=expr;
exprAddSub: op=('+' | '-') right=expr;

expr:
    expr exprDot
    | expr exprSubscript
    | exprUnary
    | expr exprMulDiv
    | expr exprAddSub
    | exprPrimary
    ;

exprPrimary:
    arrayExpr
    | structExpr
    | IDENTIFIER
    | LIT_BOOLEAN
    | LIT_FLOAT
    | LIT_INT
    | LIT_STRING
    | '(' p=expr ')'
    ;

arrayExpr:
    '[' NL* (expr (commaDelim expr)*)? ']'
    ;

structAssignment: name=IDENTIFIER '=' value=expr;
structExpr: '{' NL* (structAssignment (commaDelim structAssignment)* commaDelim?)? '}';

//////////////////////
// Token definitions
//////////////////////

fragment LONG_STRING: '"""' LONG_STRING_ITEM*? '"""';

/// longstringitem  ::=  longstringchar | stringescapeseq
fragment LONG_STRING_ITEM: LONG_STRING_CHAR | STRING_ESCAPE_SEQ;

/// longstringchar  ::=  <any source character except "\">
fragment LONG_STRING_CHAR: ~'\\';

fragment STRING_ESCAPE_SEQ: '\\' . | '\\' [\n];

fragment SHORT_STRING: '"' ( STRING_ESCAPE_SEQ | ~[\\\r\n\f"])* '"';

// Comments, standard whitespace, and line continuations are all skiped
NL: [\n];
WS: [ \r\t]+ -> skip;
WS_NL: '\\'[ ]*[\n] -> skip;
COMMENT: [#]~[\n]* -> skip;

ANNOTATION: [@]~[\n]*;
postAnnotation: ANNOTATION;
postMultiAnnotation: NL? (ANNOTATION NL)+ NL*;
preAnnotation: (ANNOTATION NL)+ NL*;

LIT_BOOLEAN: FALSE | TRUE;
LIT_STRING: LONG_STRING | SHORT_STRING;

LIT_FLOAT:
    [0-9]+[Ee][+-]?[0-9]+
    | [0-9]*'.'[0-9]+([Ee][+-]?[0-9]+)?
    ;

LIT_INT: [0][Xx][0-9a-fA-F]+
    | [0-9]+
    ;

////////////////////////
// Tokens
////////////////////////

F32: 'F32';
F64: 'F64';
I16: 'I16';
I32: 'I32';
I64: 'I64';
I8: 'I8';
U16: 'U16';
U32: 'U32';
U64: 'U64';
U8: 'U8';

ACTION: 'action';
ACTIVE: 'active';
ACTIVITY: 'activity';
ALWAYS: 'always';
ARRAY: 'array';
ASSERT: 'assert';
ASYNC: 'async';
AT: 'at';
BASE: 'base';
BLOCK: 'block';
BOOL: 'bool';
CHANGE: 'change';
CHOICE: 'choice';
COMMAND: 'command';
COMPONENT: 'component';
CONNECTIONS: 'connections';
CONSTANT: 'constant';
CONTAINER: 'container';
CPU: 'cpu';
DEFAULT: 'default';
DIAGNOSTIC: 'diagnostic';
DICTIONARY: 'dictionary';
DO: 'do';
DROP: 'drop';
ELSE: 'else';
ENTER: 'enter';
ENTRY: 'entry';
ENUM: 'enum';
EVENT: 'event';
EXIT: 'exit';
FALSE: 'false';
FATAL: 'fatal';
FORMAT: 'format';
GET: 'get';
GROUP: 'group';
GUARD: 'guard';
GUARDED: 'guarded';
HEALTH: 'health';
HIGH: 'high';
HOOK: 'hook';
ID: 'id';
IF: 'if';
IMPORT: 'import';
INCLUDE: 'include';
INITIAL: 'initial';
INPUT: 'input';
INSTANCE: 'instance';
INTERFACE: 'interface';
INTERNAL: 'internal';
LOCATE: 'locate';
LOW: 'low';
MACHINE: 'machine';
MATCH: 'match';
MODULE: 'module';
OMIT: 'omit';
ON: 'on';
OPCODE: 'opcode';
ORANGE: 'orange';
OUTPUT: 'output';
PACKET: 'packet';
PACKETS: 'packets';
PARAM: 'param';
PASSIVE: 'passive';
PHASE: 'phase';
PORT: 'port';
PRIORITY: 'priority';
PRIVATE: 'private';
PRODUCT: 'product';
QUEUE: 'queue';
QUEUED: 'queued';
RECORD: 'record';
RECV: 'recv';
RED: 'red';
REF: 'ref';
REG: 'reg';
REQUEST: 'request';
RESP: 'resp';
SAVE: 'save';
SEND: 'send';
SERIAL: 'serial';
SET: 'set';
SEVERITY: 'severity';
SIGNAL: 'signal';
SIZE: 'size';
STACK: 'stack';
STATE: 'state';
STRING: 'string';
STRUCT: 'struct';
SYNC: 'sync';
TELEMETRY: 'telemetry';
TEXT: 'text';
THROTTLE: 'throttle';
TIME: 'time';
TOPOLOGY: 'topology';
TRUE: 'true';
TYPE: 'type';
UNMATCHED: 'unmatched';
UPDATE: 'update';
WARNING: 'warning';
WITH: 'with';
YELLOW: 'yellow';

IDENTIFIER: [$]?[A-Za-z_][a-zA-Z_0-9]*;
