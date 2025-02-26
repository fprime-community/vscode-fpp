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

aliasTypeDecl: TYPE name=IDENTIFIER '=' type=typeName;

arrayDecl:
    ARRAY name=IDENTIFIER '=' '[' size=expr ']'
    type=typeName
    (DEFAULT default_=expr)?
    (FORMAT format=LIT_STRING)?
    ;

constantDecl: CONSTANT name=IDENTIFIER '=' value=expr;

structMember:
    name=IDENTIFIER ':' ('[' size=expr ']')?
    type=typeName (FORMAT format=LIT_STRING)?
    ;

structMemberN: structMember (','? commaDelim);
structMemberL: structMember (','? commaDelim)?;
structDecl:
    STRUCT name=IDENTIFIER '{'
        NL* (structMemberN* structMemberL)?
    '}' (DEFAULT default_=structExpr)?
    ;

queueFullBehavior: ASSERT | BLOCK | DROP;
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
    | ASYNC? PRODUCT RECV
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
    queueFull=queueFullBehavior?;

telemetryLimitKind: RED | ORANGE | YELLOW;
telemetryLimitExpr: kind=telemetryLimitKind limit=expr;
telemetryLimit: '{'
        NL* (telemetryLimitExpr (commaDelim telemetryLimitExpr)* commaDelim?)?
    '}';
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
choiceDef: CHOICE name=IDENTIFIER '{'
        IF guard=IDENTIFIER then=transitionExpr ELSE else=transitionExpr
    '}';
guardDef: GUARD name=IDENTIFIER (':' type=typeName)?;
signalDef: SIGNAL name=IDENTIFIER (':' type=typeName)?;

doExpr: DO '{'
        NL* (IDENTIFIER (commaDelim IDENTIFIER)*)? commaDelim?
    '}';
transitionExpr: do=doExpr? ENTER state=qualIdent;
initialTransition: INITIAL transition=transitionExpr;

transitionOrDoExpr: transitionExpr | doExpr;
stateTransition: ON signal=IDENTIFIER (IF guard=IDENTIFIER)? transition=transitionOrDoExpr;
stateEntry: ENTRY do=doExpr;
stateExit: EXIT do=doExpr;

stateMember:
    initialTransition
    | choiceDef
    | stateDef
    | stateTransition
    | stateEntry
    | stateExit
    ;

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

stateMachineMember: stateMachineMemberTempl ANNOTATION?;
stateMachineDef: STATE MACHINE name=IDENTIFIER
    ('{'
        NL* (stateMachineMember semiDelim)* NL*
    '}')?
    ;

stateMachineInstance: STATE MACHINE INSTANCE name=IDENTIFIER ':' stateMachine=qualIdent
    (PRIORITY priority=expr)?
    queueFull=queueFullBehavior?
    ;

enumMember: name=IDENTIFIER ('=' value=expr)?;
enumMemberN: enumMember (','? commaDelim);
enumMemberL: enumMember (','? commaDelim)?;
enumDecl: ENUM name=IDENTIFIER (':' type=intType)?
    '{'
        NL* (enumMemberN* enumMemberL)?
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

initSpecifier: PHASE phaseExpr=expr code=LIT_STRING;
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
componentMember:
    abstractTypeDecl
    | aliasTypeDecl
    | arrayDecl
    | constantDecl
    | structDecl
    | commandDecl
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
    patternGraphSources?
    ;

topologyImportStmt: IMPORT topology=qualIdent;
topologyMember:
    componentInstanceSpec
    | directGraphDecl
    | patternGraphStmt
    | topologyImportStmt
    | includeStmt
    ;

topologyDecl:
    TOPOLOGY name=IDENTIFIER '{'
        NL* (topologyMember semiDelim)* NL*
    '}'
    ;

locationKind:
    INSTANCE
    | COMPONENT
    | CONSTANT
    | PORT
    | TOPOLOGY
    | TYPE
    ;
locationStmt:
    LOCATE kind=locationKind
    name=qualIdent AT path=LIT_STRING;

moduleMember:
    abstractTypeDecl
    | aliasTypeDecl
    | arrayDecl
    | componentDecl
    | componentInstanceDecl
    | constantDecl
    | moduleDecl
    | portDecl
    | structDecl
    | locationStmt
    | enumDecl
    | includeStmt
    | topologyDecl
    | stateMachineDef
    ;

moduleDecl: MODULE name=IDENTIFIER '{'
        NL* (moduleMember semiDelim)* NL*
    '}'
    ;

//////////////////////
// Helper definitions
//////////////////////

formalParameter: REF? name=IDENTIFIER ':' type=typeName;

// Normal
formalParameterN: formalParameter (','? commaDelim);
formalParamaterL: formalParameter (','? commaDelim)?;

formalParameterList: '(' NL* (formalParameterN* formalParamaterL)? ')';

qualIdent: IDENTIFIER ('.' IDENTIFIER)*;

// PRIM_TYPE:  U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64 | F32 | F64 | BOOL;
intType:  U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64;
primitiveType: type=(U8 | I8 | U16 | I16 | U32 | I32 | U64 | I64 | F32 | F64 | BOOL) | type=STRING (SIZE size=LIT_INT)?;
typeName: primitiveType | qualIdent;

commaDelim: ',' NL* | NL+;
semiDelim: ';' NL* | NL+;

//////////////////////
// Helper definitions
//////////////////////
arrayExpr: '[' NL* (expr (commaDelim expr)*)? ']';

structAssignment: name=IDENTIFIER '=' value=expr;
structExpr: '{'
        NL* (structAssignment (commaDelim structAssignment)* commaDelim?)?
    '}';
expr:
    '-' unary=expr
    | left=expr op=('*' | '/') right=expr
    | left=expr op=('+' | '-') right=expr
    | arrayExpr
    | structExpr
    | qualIdent
    | LIT_BOOLEAN
    | LIT_FLOAT
    | LIT_INT
    | LIT_STRING
    | '(' p=expr ')'
    ;

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
WS_NL: '\\'~[\n]*[\n] -> skip;
COMMENT: [#]~[\n]* -> skip;

ANNOTATION: [@]~[\n]* -> channel(2);

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
INTERNAL: 'internal';
LOCATE: 'locate';
LOW: 'low';
MACHINE: 'machine';
MATCH: 'match';
MODULE: 'module';
ON: 'on';
OPCODE: 'opcode';
ORANGE: 'orange';
OUTPUT: 'output';
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

IDENTIFIER: [$]? [A-Za-z_][a-zA-Z_0-9]*;
