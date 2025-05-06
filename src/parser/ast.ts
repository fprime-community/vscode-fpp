export const implicitLocation: Location = {
    source: "",
    start: { line: -1, column: -1 },
    end: { line: -1, column: -1 },
};

export function isIntegral(type: string): boolean {
    switch (type) {
        case "U8":
        case "I8":
        case "U16":
        case "I16":
        case "U32":
        case "I32":
        case "U64":
        case "I64":
            return true;
        default:
            return false;
    }
}

export function isFloating(type: string): boolean {
    switch (type) {
        case "F32":
        case "F64":
            return true;
        default:
            return false;
    }
}

export function isNumeric(type: string): boolean {
    return isIntegral(type) || isFloating(type);
}

export type IntegralTypeKey = (
    | "U8"
    | "I8"
    | "U16"
    | "I16"
    | "U32"
    | "I32"
    | "U64"
    | "I64"
);

export type FloatingTypeKey = "F32" | "F64";
export type NumericTypeKey = IntegralTypeKey | FloatingTypeKey;
export type PrimitiveTypeKey = NumericTypeKey | "bool";

interface TypeBase extends Ast {
    complex: boolean;
    type: unknown;
}

export interface PrimitiveType extends TypeBase {
    complex: false;
    type: PrimitiveTypeKey;
}

export interface StringPrimitiveType extends TypeBase {
    complex: false;
    type: "string";
    size?: Expr;
}

export interface ComplexType extends TypeBase {
    complex: true;
    type: QualifiedIdentifier;
}

export type TypeName = (
    PrimitiveType
    | StringPrimitiveType
    | ComplexType
);

export interface Identifier extends Ast {
    value: string;
}

export interface Range {
    line: number;
    column: number;
}

export interface Location {
    source: string;
    start: Range;
    end: Range;
}

export interface Ast {
    location: Location;
    isError?: boolean;
}

export interface Annotatable extends Ast {
    /**
     * The manually attached annotation denoted with
     * the '@' or '@<' syntax. This is converted into
     * a markdown compatible string and attached to
     * syntax elements.
     */
    annotation?: string;

    /**
     * When evaluating a declaration or expression
     * we can attach some extra metadata to the hover
     * information.
     * 
     * This will show up in declarations as:
     * name: Type VALUE.
     * This value should include the ' = ' syntax for
     * values or '()' for other types of declarations.
     */
    annotatedValue?: string;

    /**
     * If this is a declaration with parameters such as
     * as port, command or enum, each argument may be
     * annotated separately.
     */
    annotatedMembers?: [string, string][];
    annotatedMemberName?: string;
}

export interface Error extends Ast {
    isError: true;
}

export interface StringLiteral extends Ast {
    value: string;
}

export interface Decl extends Annotatable {
    scope: QualifiedIdentifier;
    type: string;
    fppType?: TypeName;
    name: Identifier;
}

export interface AbstractTypeDecl extends Decl {
    type: "AbstractTypeDecl";
    fppType: undefined;
}

export interface AliasTypeDecl extends Decl {
    type: "AliasTypeDecl";
    name: Identifier;

    /* Underlying type this alias points to */
    fppType: TypeName;
}

export interface ActionDef extends Decl {
    type: "ActionDef";
    name: Identifier;
    fppType: TypeName | undefined;
}

export interface ChoiceDef extends Decl {
    type: "ChoiceDef";
    fppType: undefined;

    name: Identifier;

    guard: Identifier;
    then: TransitionExpr;
    else: TransitionExpr;
}

export interface GuardDef extends Decl {
    type: "GuardDef";

    name: Identifier;
    fppType: TypeName | undefined;
}

export interface SignalDef extends Decl {
    type: "SignalDef";
    name: Identifier;
    fppType: TypeName | undefined;
}

export interface StateExprValue {
    // TODO(tumbar) What information needs to be resolved here?
}

export interface StateExpr extends Ast {
    type: string;
    evaluated?: StateExprValue;
}

export interface DoExpr extends StateExpr {
    type: "DoExpr";
    actions: Identifier[];
}

export interface TransitionExpr extends StateExpr {
    type: "TransitionExpr";
    do?: DoExpr;
    state: QualifiedIdentifier;
}

export interface InitialTransition extends Annotatable {
    type: "InitialTransition";
    transition: TransitionExpr;
}

export interface StateTransition extends Annotatable {
    type: "StateTransition";

    signal: Identifier;
    guard?: Identifier;
    transition: TransitionExpr | DoExpr;
}

export interface StateEntry extends Annotatable {
    type: "StateEntry";
    do: DoExpr;
}

export interface StateExit extends Annotatable {
    type: "StateExit";
    do: DoExpr;
}

export type StateDefMember = (
    | InitialTransition
    | ChoiceDef
    | StateDef
    | StateTransition
    | StateEntry
    | StateExit
);

export interface StateDef extends Decl {
    type: "StateDef";
    fppType: undefined;

    name: Identifier;
    members: StateDefMember[];
}

export type StateMachineMember = (
    | ChoiceDef
    | GuardDef
    | InitialTransition
    | SignalDef
    | StateDef
    | ActionDef
);

export interface StateMachineDecl extends Decl {
    type: "StateMachineDecl";
    name: Identifier;
    members: StateMachineMember[];
}

export interface StateMachineInstance extends Decl {
    type: "StateMachineInstance";
    name: Identifier;
    stateMachine: QualifiedIdentifier;
    priority?: Expr;
    queueFull?: QueueFullBehavior;
}

export interface ArrayDecl extends Decl {
    type: "ArrayDecl";
    fppType: TypeName;
    default_?: ArrayExpr;
    size: Expr;
    format?: StringLiteral;
}

export interface ConstantDecl extends Decl {
    type: "ConstantDecl";
    value: Expr;
}

export interface StructMember extends Decl {
    type: "StructMemberDecl";
    fppType: TypeName,
    name: Identifier;
    size?: Expr;
    format?: StringLiteral;
}

export interface StructDecl extends Decl {
    type: "StructDecl";
    fppType: undefined;
    members: StructMember[];
    default_: StructExpr;
}

export interface FormalParameter extends Annotatable {
    ref: boolean;
    name: Identifier;
    type: TypeName;
}

export interface Keyword<T extends string> extends Ast {
    value: T;
}

export type CommandKind = Keyword<"async" | "guarded" | "sync">;
export type QueueFullBehavior = Keyword<"assert" | "block" | "drop" | "hook">;

export interface CommandDecl extends Decl {
    type: "CommandDecl";
    kind: CommandKind;
    fppType: undefined;
    params: FormalParameter[];
    opcode?: Expr;
    priority?: Expr;
    queueFull?: QueueFullBehavior;
}

export interface ParamDecl extends Decl {
    type: "ParamDecl";
    fppType: TypeName;
    default_?: Expr;
    id?: Expr;
    setOpcode?: Expr;
    saveOpcode?: Expr;
}

export interface PortInstance extends Ast {
    isOutput: boolean;
    isSpecial: boolean;
}

export interface GeneralOutputPortInstance extends PortInstance {
    direction: Keyword<"output">;
    isOutput: true;
    isSpecial: false;
}

export interface GeneralInputPortInstance extends PortInstance {
    direction: Keyword<"input">;
    kind: Keyword<"async" | "guarded" | "sync">;
    isOutput: false;
    isSpecial: false;
}

export interface SpecialOutputPortInstance extends PortInstance {
    isOutput: true;
    isSpecial: true;
    kind: Keyword<
        | "commandReg"
        | "commandResp"
        | "event"
        | "paramGet"
        | "paramSet"
        | "telemetry"
        | "textEvent"
        | "timeGet"
        | "productGet"
        | "productRecv"
        | "productRequest"
        | "productSend"
    >;
}

export interface CommandRecvPortInstance extends PortInstance {
    isOutput: false;
    isSpecial: true;
    kind: Keyword<"commandRecv">;
}

export type GeneralPortKind = (
    | GeneralInputPortInstance
    | GeneralOutputPortInstance
);

export type SpecialPortKind = (
    | CommandRecvPortInstance
    | SpecialOutputPortInstance
);

export interface GeneralPortInstanceDecl extends Decl {
    type: "GeneralPortInstanceDecl";
    kind: GeneralPortKind;
    n?: Expr;
    // Undefined fppType means the port is a serial port
    fppType?: ComplexType;
    priority?: Expr;
    queueFullBehavior?: QueueFullBehavior;
}

export interface SpecialPortInstanceDecl extends Decl {
    type: "SpecialPortInstanceDecl";
    kind: SpecialPortKind;
    fppType: undefined;
}

export type PortInstanceDecl = GeneralPortInstanceDecl | SpecialPortInstanceDecl;

export interface ProductContainerDecl extends Decl {
    type: "ProductContainerDecl";
    id?: Expr;
    defaultPriority?: Expr;
}

export interface ProductRecordDecl extends Decl {
    type: "ProductRecordDecl";
    fppType: TypeName;
    isArray?: boolean;
    id?: Expr;
}

export type ComponentMember = (
    | AbstractTypeDecl
    | AliasTypeDecl
    | ArrayDecl
    | ConstantDecl
    | StructDecl
    | CommandDecl
    | ParamDecl
    | PortInstanceDecl
    | TelemetryChannelDecl
    | EnumDecl
    | EventDecl
    | IncludeStmt<ComponentMember>
    | MatchStmt
    | InternalPortDecl
    | ProductContainerDecl
    | ProductRecordDecl
    | StateMachineInstance
);

export type ComponentKind = Keyword<"active" | "passive" | "queued">;
export interface ComponentDecl extends Decl {
    type: "ComponentDecl";
    kind: ComponentKind;
    members: ComponentMember[];
    fppType: undefined;
}

export type TelemetryLimitKind = Keyword<"red" | "orange" | "yellow">;
export interface TelemetryLimitExpr extends Ast {
    type: TelemetryLimitKind;
    value: Expr;
}

export interface TelemetryChannelDecl extends Decl {
    type: "TelemetryChannelDecl";
    fppType: TypeName;
    id?: Expr;
    update?: Keyword<"always" | "onChange">;
    format?: StringLiteral;
    lowLimits?: TelemetryLimitExpr[];
    highLimits?: TelemetryLimitExpr[];
}

export interface EnumMember extends Decl {
    type: "EnumMember";
    name: Identifier;
    value?: Expr;
}

export interface EnumDecl extends Decl {
    type: "EnumDecl";
    fppType?: TypeName;
    members: EnumMember[];
    default_?: Expr;
}

export type EventSeverity = Keyword<
    | "activityHigh"
    | "activityLow"
    | "command"
    | "diagnostic"
    | "fatal"
    | "warningHigh"
    | "warningLow"
>;

export interface EventDecl extends Decl {
    type: "EventDecl",
    fppType: undefined;
    params: FormalParameter[];
    severity: EventSeverity;
    id?: Expr;
    format?: StringLiteral;
    throttle?: Expr;
}

export interface IncludeStmt<T> extends Annotatable {
    type: "IncludeStmt";
    include: StringLiteral;

    // The imported file is resolved asynchronously
    // If this ends up undefined, it failed to parse/read file
    resolved?: TranslationUnit<T>;
}

export interface MatchStmt extends Annotatable {
    type: "MatchStmt";
    match: Identifier;
    with: Identifier;
}

export interface InternalPortDecl extends Decl {
    type: "InternalPortDecl";
    fppType: undefined;
    params: FormalParameter[];
    priority?: Expr;
    queueFullBehavior?: QueueFullBehavior;
}

export interface InitSpecifier extends Annotatable {
    phase: Expr;
    code: StringLiteral;
}

export interface ComponentInstanceDecl extends Decl {
    type: "ComponentInstanceDecl";
    fppType: ComplexType;
    baseId: Expr;
    cppType?: StringLiteral;
    at?: StringLiteral;
    queueSize?: Expr;
    stackSize?: Expr;
    priority?: Expr;
    cpu?: Expr;
    init: InitSpecifier[];
}

export interface PortDecl extends Decl {
    type: "PortDecl",
    fppType: undefined;
    params: FormalParameter[],
    returnType?: TypeName;
}

export interface ComponentInstanceSpec extends Annotatable {
    type: "ComponentInstanceSpec";
    name: QualifiedIdentifier;
    isPrivate: boolean;
}

export interface ConnectionNode extends Ast {
    node: QualifiedIdentifier;
    index?: Expr;
}

export interface Connection extends Annotatable {
    source: ConnectionNode;
    destination: ConnectionNode;
}

export interface DirectGraphDecl extends Decl {
    type: "DirectGraphDecl";
    fppType: undefined;
    connections: Connection[];
}

export type PatternKind = Keyword<
    | "command"
    | "event"
    | "health"
    | "param"
    | "telemetry"
    | "time"
>;

export interface PatternGraphStmt extends Annotatable {
    type: "PatternGraphStmt";
    kind: PatternKind;
    target: QualifiedIdentifier;
    sources: QualifiedIdentifier[];
}

export interface TopologyImportStmt extends Annotatable {
    type: "TopologyImportStmt";
    topology: QualifiedIdentifier;
}

export type TopologyMember = (
    ComponentInstanceSpec |
    DirectGraphDecl |
    PatternGraphStmt |
    TopologyImportStmt |
    IncludeStmt<TopologyMember>
);

export interface TopologyDecl extends Decl {
    type: "TopologyDecl";
    fppType: undefined;
    members: TopologyMember[];
}

export type LocationKind = Keyword<
    | "instance"
    | "component"
    | "constant"
    | "port"
    | "topology"
    | "type"
>;

export interface LocationStmt extends Annotatable {
    type: "LocationStmt";
    name: QualifiedIdentifier;
    kind: LocationKind;
    path: StringLiteral;
}

export type ModuleMember = (
    | AbstractTypeDecl
    | AliasTypeDecl
    | ArrayDecl
    | ComponentDecl
    | ComponentInstanceDecl
    | ConstantDecl
    | ModuleDecl
    | PortDecl
    | StructDecl
    | TopologyDecl
    | LocationStmt
    | EnumDecl
    | IncludeStmt<ModuleMember>
    | StateMachineDecl
);
export interface ModuleDecl extends Decl {
    type: "ModuleDecl";
    fppType: undefined;
    members: ModuleMember[];
}

export interface BasicExpr extends Ast {
    type: string;
    evaluated?: ExprValue;
}
export interface IdentifierExpr extends BasicExpr {
    type: "Identifier";
    value: QualifiedIdentifier;
}
export interface LiteralIntExpr extends BasicExpr {
    type: "IntLiteral";
    value: number;
}
export interface LiteralFloatExpr extends BasicExpr {
    type: "FloatLiteral";
    value: number;
}
export interface LiteralStringExpr extends BasicExpr {
    type: "StringLiteral";
    value: string;
}

export interface ArrayExpr extends BasicExpr {
    type: "ArrayExpr";
    value: Expr[];
};

export type PrimaryExpr = (
    IdentifierExpr |
    LiteralIntExpr |
    LiteralFloatExpr |
    LiteralStringExpr
);

export interface NegExpr extends BasicExpr {
    type: "NegExpr";
    value: Expr;
}

export type BinaryOperator = Keyword<"+" | "-" | "*" | "/">;
export interface BinaryExpr extends BasicExpr {
    type: "BinaryExpr";
    operator: BinaryOperator;
    left: Expr;
    right: Expr;
}

export interface BooleanExpr extends BasicExpr {
    type: "BooleanExpr";
    value: boolean;
}

export interface StructAssignment extends Ast {
    name: Identifier;
    value: Expr;
}

export interface StructExpr extends BasicExpr {
    type: "StructExpr";
    value: StructAssignment[];
};

export type Expr = (
    | BinaryExpr
    | NegExpr
    | BooleanExpr
    | StructExpr
    | ArrayExpr
    | PrimaryExpr
);

export type QualifiedIdentifier = readonly Identifier[];

export type Member = (
    | ModuleMember
    | TopologyMember
    | ComponentMember
    | StateMachineMember
    | StateDefMember
);

export interface TranslationUnit<T = ModuleMember> extends Ast {
    type: "TranslationUnit";
    members: T[];
    dependencies: string[];
};


export type TypeDecl = AbstractTypeDecl | AliasTypeDecl | StructDecl | ArrayDecl | EnumDecl;
export type ConstantDefinition = ConstantDecl | EnumMember;

export enum PrimExprType {
    integer = "integer",
    floating = "floating",
    boolean = "boolean",
    string = "string",
    array = "array",
    struct = "struct",
}

interface ExprValueBase<T> {
    type: PrimExprType;
    value: T;
}

export interface IntExprValue extends ExprValueBase<number> {
    type: PrimExprType.integer;
    enumMember?: EnumMember;
}

export interface FloatExprValue extends ExprValueBase<number> {
    type: PrimExprType.floating;
}

export interface BoolExprValue extends ExprValueBase<boolean> {
    type: PrimExprType.boolean;
}

export interface StrExprValue extends ExprValueBase<string> {
    type: PrimExprType.string;
    size?: number; // max size type can take
}

export interface ArrayExprValue extends ExprValueBase<ExprValue[]> {
    type: PrimExprType.array;
}

export interface StructExprValue extends ExprValueBase<Record<string, ExprValue>> {
    type: PrimExprType.struct;
}

export type NumericExprValue = IntExprValue | FloatExprValue;

export type ExprValue = (
    | IntExprValue
    | FloatExprValue
    | BoolExprValue
    | StrExprValue
    | ArrayExprValue
    | StructExprValue
);
