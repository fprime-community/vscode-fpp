import { FppParser } from '../grammar/FppParser';

export interface RangeRuleAssociation {
    rule: number;
    param: string;
}

export const declRules = new Set([
    FppParser.RULE_abstractTypeDecl,
    FppParser.RULE_aliasTypeDecl,
    FppParser.RULE_arrayDecl,
    FppParser.RULE_commandDecl,
    FppParser.RULE_componentInstanceDecl,
    FppParser.RULE_componentInstanceSpec,
    FppParser.RULE_connection,
    FppParser.RULE_connectionNode,
    FppParser.RULE_constantDecl,
    FppParser.RULE_enumDecl,
    FppParser.RULE_eventDecl,
    FppParser.RULE_generalPortInstanceDecl,
    FppParser.RULE_includeStmt,
    FppParser.RULE_initSpecifier,
    FppParser.RULE_internalPortDecl,
    FppParser.RULE_locationStmt,
    FppParser.RULE_matchStmt,
    FppParser.RULE_paramDecl,
    FppParser.RULE_patternGraphStmt,
    FppParser.RULE_portDecl,
    FppParser.RULE_specialPortInstanceDecl,
    FppParser.RULE_structDecl,
    FppParser.RULE_actionDef,
    FppParser.RULE_choiceDef,
    FppParser.RULE_guardDef,
    FppParser.RULE_stateMachineInstance,
]);

export const ignoreTokens = new Set([
    FppParser.T__0,
    FppParser.T__1,
    FppParser.T__2,
    FppParser.T__3,
    FppParser.T__4,
    FppParser.T__5,
    FppParser.T__6,
    FppParser.T__7,
    FppParser.T__8,
    FppParser.T__9,
    FppParser.T__10,
    FppParser.T__11,
    FppParser.T__12,
    FppParser.T__13,
    FppParser.T__14,
    FppParser.T__15,
    FppParser.NL,
    FppParser.WS,
    FppParser.WS_NL,
    FppParser.COMMENT,
    FppParser.ANNOTATION,
]);
