import * as vscode from 'vscode';

import {
    ANTLRErrorListener,
    CharStreams,
    CommonTokenStream,
    ParserRuleContext,
    RecognitionException,
    Recognizer,
    Token,
    TokenSource
} from 'antlr4ts';

import { FppLexer } from './grammar/FppLexer';
import { ComponentDeclContext, FppParser, ModuleDeclContext } from './grammar/FppParser';
import { ATN, ATNConfigSet, ATNState, RuleTransition } from 'antlr4ts/atn';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { FppVisitor } from './grammar/FppVisitor';

class AtCursor {
    constructor(
        readonly state: number,
        readonly context: ParserRuleContext,
        readonly nextToken: Token,
        readonly lastToken?: Token,
    ) {
    }
}

class ConsumeAtCursorError extends Error {
    constructor(
        readonly atn: ATN,
        readonly lookAheads: AtCursor[],
        readonly recognitionException?: RecognitionException
    ) {
        super();
    }
}

interface BasicParser {
    state: number;
    atn: ATN;
    ctx: ParserRuleContext;
}

class CandidateListener extends CommonTokenStream implements ANTLRErrorListener<Token> {
    lookAheadsAtCursor: AtCursor[] = [];
    atCursorReported = false;

    constructor(
        readonly caretOffset: number,
        tokenSource: TokenSource, channel?: number
    ) {
        super(tokenSource, channel);
    }

    private parser!: BasicParser;
    setParser(p: BasicParser) {
        this.parser = p;
    }

    private lastToken?: Token;
    tryLT(k: number): Token | undefined {
        const token = super.tryLT(k);
        if (token) {
            if (token.stopIndex + 1 > this.caretOffset) {
                this.lookAheadsAtCursor.push(new AtCursor(
                    this.parser.state,
                    this.parser.ctx,
                    token,
                    this.lastToken
                ));
            }
        }

        this.lastToken = token;
        return token;
    }

    syntaxError(
        recognizer: Recognizer<Token, any>,
        offendingSymbol: Token | undefined,
        line: number, charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        if (this.lookAheadsAtCursor.length) {
            this.atCursor(e);
        }
    }

    atCursor(re?: RecognitionException) {
        if (!this.atCursorReported) {
            this.atCursorReported = true;
            throw new ConsumeAtCursorError(
                this.parser.atn,
                this.lookAheadsAtCursor,
                re
            );
        }
    }

    consume(): void {
        if (this.lookAheadsAtCursor.length) {
            this.atCursor();
        }

        super.consume();
    }
}

/**
 * This is the default visitor
 * Should pull all rules through the parser
 */
class BasicVisitor extends AbstractParseTreeVisitor<void> implements FppVisitor<void> {
    protected defaultResult(): void { }

    scope: string[] = [];

    visitComponentDecl(ctx: ComponentDeclContext) {
        const oldScope = this.scope;
        this.scope = [...oldScope, ctx.IDENTIFIER().text];
        super.visitChildren(ctx);
        this.scope = oldScope;
    }

    visitModuleDecl(ctx: ModuleDeclContext) {
        const oldScope = this.scope;
        this.scope = [...oldScope, ctx.IDENTIFIER().text];
        super.visitChildren(ctx);
        this.scope = oldScope;
    }
}

class FppParserWrapper extends FppParser {
    constructor(private readonly tokenStream: CandidateListener) {
        super(tokenStream);
    }

    get ctx() {
        return this._ctx;
    }

    match(ttype: number): Token {
        let t = this.currentToken;
        if (this.tokenStream.lookAheadsAtCursor.length) {
            this.tokenStream.atCursor();
        }

        return super.match(ttype);
    }

    exitRule(): void {
        if (this.tokenStream.lookAheadsAtCursor.length) {
            this.tokenStream.atCursor();
        }

        super.exitRule();
    }
}

export interface CompletionRelevantInfo {
    state: number;
    context: ParserRuleContext;
}

interface CandidateResult {
    /**
     * Possible tokens that can follow the caret
     */
    tokens: Set<number>;

    /**
     * Get the parsing state most relevant where the cursor is sitting
     * This is determined by telling the candidate searching algorithm
     * which parsing rules to extract the parsing state from.
     */
    rules: Map<number, CompletionRelevantInfo>;

    /**
     * The scope is collected at parse time and is
     * Fpp specific. It is used for completion
     * lookup which is influenced by the caret's scope
     */
    scope: string[];
}

function getNextState(atn: ATN, context: ParserRuleContext) {
    const invokingState = atn.states[context.invokingState];
    for (const transition of invokingState.getTransitions()) {
        if (transition instanceof RuleTransition &&
            transition.target.ruleIndex === context.ruleIndex
        ) {
            return transition.followState;
        }
    }

    throw new Error(`Could not found valid transition from ${context.invokingState} while solving rule ${context.ruleIndex}`);
}

function getNextOf(
    atn: ATN,
    state: number,
    context_: ParserRuleContext
): Set<number> {
    const out = new Set<number>();

    let atnState: ATNState | undefined = atn.states[state];
    let context: ParserRuleContext | undefined = context_;

    while (atnState && context) {
        let searchParent: ATNState | undefined = undefined;
        for (const token of atn.nextTokens(atnState).toSet()) {
            if (token === Token.EPSILON) {
                if (context.parent) {
                    searchParent = getNextState(atn, context);
                }
            } else {
                out.add(token);
            }
        }

        atnState = searchParent;
        context = context.parent;
    }

    return out;
}

function getRuleMetadata(context: ParserRuleContext, state: number, relevantRules?: Set<number>): { scope: string[], rules: Map<number, CompletionRelevantInfo> } {
    let scope: string[] = [];

    let relevantContext: ParserRuleContext | undefined = context;
    let invokingState = state;

    const rules = new Map<number, CompletionRelevantInfo>();

    for (; relevantContext; invokingState = relevantContext.invokingState, relevantContext = relevantContext.parent) {
        if (relevantContext.ruleIndex === FppParser.RULE_moduleDecl ||
            relevantContext.ruleIndex === FppParser.RULE_componentDecl
        ) {
            const declName = (relevantContext as (ModuleDeclContext | ComponentDeclContext)).tryGetToken(FppParser.IDENTIFIER, 0)?.text;
            if (declName) {
                scope.push(declName);
            } else {
                break;
            }
        }

        if (relevantRules && !relevantRules.has(relevantContext.ruleIndex)) {
            continue;
        } else if (rules.has(relevantContext.ruleIndex)) {
            continue;
        }

        rules.set(relevantContext.ruleIndex, {
            state: invokingState,
            context: relevantContext
        });
    }

    return { scope: scope.reverse(), rules };
}

function processAtCursor(
    atn: ATN,
    input: AtCursor,
    relevantRules?: Set<number>
) {
    return {
        tokens: getNextOf(atn, input.state, input.context),
        ...getRuleMetadata(input.context, input.state, relevantRules)
    };
}

function processCandiates(
    input: ConsumeAtCursorError,
    relevantRules?: Set<number>
): CandidateResult {
    const result: CandidateResult = {
        tokens: new Set<number>(),
        rules: new Map<number, CompletionRelevantInfo>(),
        scope: []
    };

    if (input.recognitionException) {
        const deadEndConfigs: ATNConfigSet | undefined = (input.recognitionException as any).deadEndConfigs;
        if (deadEndConfigs) {
            for (const cfg of deadEndConfigs?.toArray() ?? []) {
                for (const token of input.atn.nextTokens(cfg.state).toSet()) {
                    if (token !== Token.EPSILON) {
                        result.tokens.add(token);
                    }
                }
            }

        } else {
            result.tokens = input.recognitionException.expectedTokens?.toSet() ?? result.tokens;
        }

        for (const candidate of input.lookAheads) {
            const candidateResult = processAtCursor(input.atn, candidate, relevantRules);

            for (const [key, value] of candidateResult.rules) {
                // The first rule context is best since that makes the
                // most sense syntactically
                if (!result.rules.has(key)) {
                    result.rules.set(key, value);
                }
            }

            // All scopes should be the same (hopefully)
            // The last one should be good enough
            result.scope = candidateResult.scope;
        }
    } else {
        for (const candidate of input.lookAheads) {
            const candidateResult = processAtCursor(input.atn, candidate, relevantRules);
            for (const tok of candidateResult.tokens) {
                result.tokens.add(tok);
            }

            for (const [key, value] of candidateResult.rules) {
                // The first rule context is best since that makes the
                // most sense syntactically
                if (!result.rules.has(key)) {
                    result.rules.set(key, value);
                }
            }

            // All scopes should be the same (hopefully)
            // The last one should be good enough
            result.scope = candidateResult.scope;
        }
    }

    return result;
}

export function getCandidates(
    document: vscode.TextDocument,
    caret: vscode.Position,
    relevantRules?: Set<number>
): CandidateResult & { parser: FppParser } {
    const inputStream = CharStreams.fromString(document.getText());

    const lexer = new FppLexer(inputStream);
    lexer.removeErrorListeners();

    const caretOffset: number = document.offsetAt(caret);
    const tokenStream = new CandidateListener(caretOffset, lexer);
    const parser = new FppParserWrapper(tokenStream);
    parser.removeErrorListeners();
    parser.addErrorListener(tokenStream);

    tokenStream.setParser(parser);

    // Run the tokens through the parser
    // We should reach a past cursor exception
    try {
        new BasicVisitor().visit(parser.prog());

        // EOF was reached before the cursor was hit
        // Syntax errors should tell us what is expected next
        return {
            tokens: new Set<number>(),
            rules: new Map(),
            scope: [],
            parser
        };
    } catch (e: unknown) {
        if (e instanceof ConsumeAtCursorError) {
            return {
                ...processCandiates(e, relevantRules),
                parser
            };
        } else {
            throw e;
        }
    }
}
