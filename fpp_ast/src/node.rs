use crate::*;
use fpp_core::Span;
use fpp_macros::DirectRefWalkable;

/// This enum is a super variant of all the types of nodes in the AST
/// This allows implementing highly generic visitors that can just match
/// recursively on any node in the AST.
///
/// This allows for composing together "analyzers" which look at various
/// parts of the AST and build .
#[derive(Debug, Clone, Copy, DirectRefWalkable)]
pub enum Node<'a> {
    /* Definitions */
    DefAbsType(&'a DefAbsType),
    DefAction(&'a DefAction),
    DefAliasType(&'a DefAliasType),
    DefArray(&'a DefArray),
    DefChoice(&'a DefChoice),
    DefComponent(&'a DefComponent),
    DefComponentInstance(&'a DefComponentInstance),
    DefConstant(&'a DefConstant),
    DefEnum(&'a DefEnum),
    DefEnumConstant(&'a DefEnumConstant),
    DefGuard(&'a DefGuard),
    DefInterface(&'a DefInterface),
    DefModule(&'a DefModule),
    DefPort(&'a DefPort),
    DefSignal(&'a DefSignal),
    DefState(&'a DefState),
    DefStateMachine(&'a DefStateMachine),
    DefStruct(&'a DefStruct),
    DefTopology(&'a DefTopology),
    /* Specifiers */
    SpecCommand(&'a SpecCommand),
    SpecDirectConnectionGraph(&'a SpecDirectConnectionGraph),
    SpecPatternConnectionGraph(&'a SpecPatternConnectionGraph),
    SpecContainer(&'a SpecContainer),
    SpecEvent(&'a SpecEvent),
    SpecGeneralPortInstance(&'a SpecGeneralPortInstance),
    SpecInterfaceImport(&'a SpecInterfaceImport),
    SpecInclude(&'a SpecInclude),
    SpecInit(&'a SpecInit),
    SpecInitialTransition(&'a SpecInitialTransition),
    SpecInstance(&'a SpecInstance),
    SpecInternalPort(&'a SpecInternalPort),
    SpecLoc(&'a SpecLoc),
    SpecParam(&'a SpecParam),
    SpecPortInstance(&'a SpecPortInstance),
    SpecPortMatching(&'a SpecPortMatching),
    SpecRecord(&'a SpecRecord),
    SpecSpecialPortInstance(&'a SpecSpecialPortInstance),
    SpecStateEntry(&'a SpecStateEntry),
    SpecStateExit(&'a SpecStateExit),
    SpecStateMachineInstance(&'a SpecStateMachineInstance),
    SpecStateTransition(&'a SpecStateTransition),
    SpecTlmChannel(&'a SpecTlmChannel),
    SpecTlmPacket(&'a SpecTlmPacket),
    SpecTlmPacketSet(&'a SpecTlmPacketSet),
    SpecTopPort(&'a SpecTopPort),
    /* Other AST nodes */
    Expr(&'a Expr),
    FormalParam(&'a FormalParam),
    Name(&'a Name),
    Ident(&'a Ident),
    LitString(&'a LitString),
    QualIdent(&'a QualIdent),
    Qualified(&'a Qualified),
    StructExprMember(&'a StructExprMember),
    TypeName(&'a TypeName),
    /* Inner AST nodes */
    Connection(&'a Connection),
    DoExpr(&'a DoExpr),
    EventThrottle(&'a EventThrottle),
    PortInstanceIdentifier(&'a PortInstanceIdentifier),
    StructTypeMember(&'a StructTypeMember),
    TlmChannelIdentifier(&'a TlmChannelIdentifier),
    TlmChannelLimit(&'a TlmChannelLimit),
    TransitionExpr(&'a TransitionExpr),
}
