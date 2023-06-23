import * as path from 'path';

import { FppVisitor } from '../grammar/FppVisitor';
import { ParserRuleContext, Token } from "antlr4ts";
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

import * as fs from 'fs';

import * as Fpp from './ast';
import * as FppParser from '../grammar/FppParser';
import { IRangeAssociation, RangeAssociator } from '../associator';
import { RangeRuleAssociation } from './common';
import { IDiagnostic } from './message';

export enum IncludeContext {
    module,
    topology,
    component
}

export interface IncludeProduct {
    source: string;
    dependencies: string[];
    ranges: Map<string, IRangeAssociation>;
    errors: IDiagnostic[];
}

export class AstVisitor extends AbstractParseTreeVisitor<Fpp.Ast> implements FppVisitor<Fpp.Ast> {
    signature = new RangeAssociator<RangeRuleAssociation>();

    private promises: [FppParser.IncludeStmtContext, Promise<IncludeProduct>][] = [];
    private includeContextStack: IncludeContext[] = [];
    private source: string;

    constructor(
        private readonly sourceStack: readonly string[],
        private scope: Fpp.QualifiedIdentifier,
        private readonly onInclude: (path: string, pathStack: readonly string[], scope: Fpp.QualifiedIdentifier, context: IncludeContext) => Promise<[IncludeProduct, Fpp.TranslationUnit<Fpp.Member>]>,
    ) {
        super();
        this.source = this.sourceStack[this.sourceStack.length - 1];
    }

    async finish(): Promise<IncludeProduct> {
        const product: IncludeProduct = {
            source: this.source,
            dependencies: [],
            ranges: new Map<string, IRangeAssociation>(),
            errors: []
        };

        product.ranges.set(this.source, this.signature.serialize());

        for (const [ctx, promise] of this.promises) {
            try {
                const singleProduct = await promise;
                product.dependencies.push(singleProduct.source);
                product.dependencies = product.dependencies.concat(singleProduct.dependencies);
                product.errors = product.errors.concat(singleProduct.errors);

                for (const [key, ranges] of singleProduct.ranges) {
                    if (!product.ranges.has(key)) {
                        product.ranges.set(key, ranges);
                    } else {
                        console.error("Found duplicate ranges for ", key);
                    }
                }

            } catch(e) {
                const loc = this.loc(ctx);
                product.errors.push({
                    source: this.source,
                    range: [
                        loc.start.line, loc.start.column,
                        loc.end.line, loc.end.column
                    ],
                    message: `${e}`
                });
            }
        }

        return product;
    }

    protected defaultResult(): Fpp.Ast {
        return this.error();
    }

    private error(): any {
        return {
            location: Fpp.implicitLocation,
            isError: true
        };
    }

    private resolvePath(lit: Fpp.StringLiteral): Fpp.StringLiteral {
        return {
            location: lit.location,
            value: fs.realpathSync(path.resolve(path.dirname(lit.location.source), lit.value), { encoding: "utf-8" })
            // value: path.resolve(path.dirname(lit.location.source), lit.value)
        };
    }

    private loc(ctx: ParserRuleContext): Fpp.Location {
        if (!ctx) {
            return Fpp.implicitLocation;
        }

        return {
            source: this.source,
            start: {
                line: ctx.start.line - 1,
                column: ctx.start.charPositionInLine
            },
            end: {
                // AST errors cause length to be zero
                line: (ctx.stop?.line ?? ctx.start.line) - 1,
                column: ctx.stop ? (ctx.stop.charPositionInLine + (ctx.stop.text?.length ?? 1)) : (ctx.start.charPositionInLine + ctx.text.length)
            }
        };
    }

    private locT(tok: Token): Fpp.Location {
        return {
            source: this.source,
            start: {
                line: tok.line - 1,
                column: tok.charPositionInLine
            },
            end: {
                line: tok.line - 1,
                column: tok.charPositionInLine + (tok.text?.length ?? 0)
            }
        };
    }

    private mergeToks(toks: Token[]): Fpp.Location {
        return {
            source: this.source,
            start: {
                line: toks[0].line - 1,
                column: toks[0].charPositionInLine
            },
            end: {
                line: toks[toks.length - 1].line - 1,
                column: toks[toks.length - 1].charPositionInLine + (toks[toks.length - 1].text?.length ?? 0)
            }
        };
    }

    private identifier(tok: Token): Fpp.Identifier {
        if (!tok) {
            return this.error();
        }

        let text = tok.text ?? "";
        if (text.startsWith("$")) {
            text = text.substring(1);
        }

        return {
            value: text,
            location: this.locT(tok)
        };
    }

    private associate(ctx: ParserRuleContext | Token | undefined, rule: number, param: string) {
        if (ctx === undefined) { }
        else if (ctx instanceof ParserRuleContext) {
            this.signature.add(
                {
                    start: { line: ctx.start.line - 1, character: ctx.start.charPositionInLine },
                    end: {
                        line: (ctx.stop ?? ctx.start).line - 1,
                        character: ctx.stop ? (ctx.stop.charPositionInLine + (ctx.stop.text?.length ?? 1))
                            : (ctx.start.charPositionInLine + ctx.text.length)
                    }
                }, { rule, param }
            );
        } else {
            // Single tokens are always on the same line,
            // Except for long string literals
            const textLines = (ctx.text ?? '').split("\n");
            const finalLineLen = textLines[textLines.length - 1].length;

            this.signature.add(
                {
                    start: { line: ctx.line - 1, character: ctx.charPositionInLine },

                    end: {
                        line: ctx.line - 1 + textLines.length - 1,
                        character: textLines.length > 1 ? finalLineLen : ctx.charPositionInLine + finalLineLen
                    }
                }, { rule, param }
            );
        }
    }

    private keyword<K extends string>(ctx: ParserRuleContext, value?: K): Fpp.Keyword<K> {
        return {
            location: this.loc(ctx),
            value: value ?? ctx.text as K
        };
    }

    private keywordT<K extends string>(tok: Token): Fpp.Keyword<K> {
        return {
            location: this.locT(tok),
            value: tok.text as K ?? ""
        };
    }

    private keywordsT<K extends string>(toks: Token[], value: K): Fpp.Keyword<K> {
        return {
            location: this.mergeToks(toks),
            value: value
        };
    }

    private stringLiteral(tok: Token): Fpp.StringLiteral {
        if (!tok) {
            return this.error();
        }

        let text;
        if (tok.text) {
            if (tok.text.startsWith("\"\"\"")) {
                text = tok.text.substring(3, tok.text.length - 3);
            } else {
                text = tok.text.substring(1, tok.text.length - 1);
            }
        } else {
            text = "";
        }

        return {
            location: this.locT(tok),
            value: text
        };
    }

    private annotation(ctx?: FppParser.AnnotationContext): string | undefined {
        if (!ctx) {
            return undefined;
        }

        const annotations = ctx.ANNOTATION().map(e => {
            if (e.text.startsWith("@<")) {
                return e.text.substring(2); // @<
            } else {
                return e.text.substring(1); // @
            }
        });
        return annotations.join(" ");
    }

    visitProg(ctx: FppParser.ProgContext): Fpp.TranslationUnit {
        if (!ctx) {
            return this.error();
        }

        this.includeContextStack.push(IncludeContext.module);

        return {
            type: "TranslationUnit",
            location: this.loc(ctx),
            members: ctx.moduleMember().map(this.visitModuleMember.bind(this)) as Fpp.ModuleMember[]
        };
    }

    visitProgTopology(ctx: FppParser.ProgTopologyContext): Fpp.TranslationUnit<Fpp.TopologyMember> {
        if (!ctx) {
            return this.error();
        }

        this.includeContextStack.push(IncludeContext.topology);

        return {
            type: "TranslationUnit",
            location: this.loc(ctx),
            members: ctx.topologyMember().map(this.visitTopologyMember.bind(this)) as Fpp.TopologyMember[]
        };
    }

    visitProgComponent(ctx: FppParser.ProgComponentContext): Fpp.TranslationUnit<Fpp.ComponentMember> {
        if (!ctx) {
            return this.error();
        }

        this.includeContextStack.push(IncludeContext.component);

        return {
            type: "TranslationUnit",
            location: this.loc(ctx),
            members: ctx.componentMember().map(this.visitComponentMember.bind(this)) as Fpp.ComponentMember[]
        };
    }

    visitAbstractTypeDecl(ctx: FppParser.AbstractTypeDeclContext): Fpp.AbstractTypeDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.TYPE()._symbol, ctx.ruleIndex, "type");
        this.associate(ctx._name, ctx.ruleIndex, "name");

        return {
            type: "AbstractTypeDecl",
            scope: [...this.scope],
            name: this.identifier(ctx._name),
            location: this.loc(ctx),
            fppType: undefined
        };
    }

    visitArrayDecl(ctx: FppParser.ArrayDeclContext): Fpp.ArrayDecl {
        if (!ctx) {
            return this.error();
        }

        const default_ = ctx._default_;
        const format = ctx._format;

        this.associate(ctx.ARRAY()._symbol, ctx.ruleIndex, "array");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._size, ctx.ruleIndex, "sizeExpression");
        this.associate(ctx._type, ctx.ruleIndex, "typeName");
        this.associate(ctx.DEFAULT()?._symbol, ctx.ruleIndex, "default");
        this.associate(ctx.FORMAT()?._symbol, ctx.ruleIndex, "format");
        this.associate(ctx._default_, ctx.ruleIndex, "defaultExpression");
        this.associate(ctx._format, ctx.ruleIndex, "formatLiteral");

        return {
            type: "ArrayDecl",
            scope: [...this.scope],
            name: this.identifier(ctx._name),
            location: this.loc(ctx),
            fppType: this.visitTypeName(ctx._type),
            size: this.visitExpr(ctx._size),
            default_: default_ ? this.visitArrayExpr(default_) : undefined,
            format: format ? this.stringLiteral(format) : undefined
        };
    }

    visitConstantDecl(ctx: FppParser.ConstantDeclContext): Fpp.ConstantDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.CONSTANT().symbol, ctx.ruleIndex, "constant");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._value, ctx.ruleIndex, "expression");

        return {
            type: "ConstantDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            value: this.visitExpr(ctx._value) as Fpp.Expr
        };
    }

    visitStructMember(ctx: FppParser.StructMemberContext): Fpp.StructMember {
        if (!ctx) {
            return this.error();
        }

        const size = ctx._size;
        const format = ctx._format;

        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._size, ctx.ruleIndex, "n");
        this.associate(ctx._type, ctx.ruleIndex, "type");
        this.associate(ctx.FORMAT()?._symbol, ctx.ruleIndex, "format");
        this.associate(ctx._format, ctx.ruleIndex, "formatLiteral");

        return {
            name: this.identifier(ctx._name),
            scope: [...this.scope],
            type: "StructMemberDecl",
            location: this.loc(ctx),
            fppType: this.visitTypeName(ctx._type),
            size: size ? this.visitExpr(size) : undefined,
            format: format ? this.stringLiteral(format) : undefined,
        };
    }

    visitStructMember_(ctx: FppParser.StructMemberNContext | FppParser.StructMemberLContext): Fpp.StructMember {
        if (!ctx) {
            return this.error();
        }

        const out = this.visitStructMember(ctx.structMember());
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitStructDecl(ctx: FppParser.StructDeclContext): Fpp.StructDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.STRUCT()._symbol, ctx.ruleIndex, "struct");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx.DEFAULT()?._symbol, ctx.ruleIndex, "default");
        this.associate(ctx._default_, ctx.ruleIndex, "defaultExpr");

        const lastMember = ctx.structMemberL();
        let members: Fpp.StructMember[];
        if (lastMember) {
            members = [
                ...ctx.structMemberN().map(v => this.visitStructMember_(v)),
                this.visitStructMember_(lastMember)
            ];
        } else {
            members = [];
        }

        return {
            type: "StructDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            members,
            default_: this.visitStructExpr(ctx._default_)
        };
    }

    visitQueueFullBehavior(ctx: FppParser.QueueFullBehaviorContext): Fpp.QueueFullBehavior {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitCommandKind(ctx: FppParser.CommandKindContext): Fpp.CommandKind {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitCommandDecl(ctx: FppParser.CommandDeclContext): Fpp.CommandDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx._kind, ctx.ruleIndex, "commandKind");
        this.associate(ctx.COMMAND().symbol, ctx.ruleIndex, "command");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._params, ctx.ruleIndex, "param-list");
        this.associate(ctx.OPCODE()?._symbol, ctx.ruleIndex, "opcode");
        this.associate(ctx._opcode, ctx.ruleIndex, "opcodeExpr");
        this.associate(ctx.PRIORITY()?._symbol, ctx.ruleIndex, "priority");
        this.associate(ctx._priority, ctx.ruleIndex, "priorityExpr");
        this.associate(ctx._queueFull, ctx.ruleIndex, "queue-full-behavior");

        return {
            type: "CommandDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            kind: this.visitCommandKind(ctx._kind),
            params: ctx._params ? this.visitFormalParameterList_(ctx._params) : [],
            opcode: ctx._opcode ? this.visitExpr(ctx._opcode) : undefined,
            queueFull: ctx._queueFull ? this.visitQueueFullBehavior(ctx._queueFull) : undefined
        };
    }

    visitParamDecl(ctx: FppParser.ParamDeclContext): Fpp.ParamDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.PARAM()?.symbol, ctx.ruleIndex, "param");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._type, ctx.ruleIndex, "type");
        this.associate(ctx.DEFAULT()?._symbol, ctx.ruleIndex, "default");
        this.associate(ctx._default_, ctx.ruleIndex, "defaultExpr");
        this.associate(ctx.ID()?._symbol, ctx.ruleIndex, "id");
        this.associate(ctx._id, ctx.ruleIndex, "idExpr");
        this.associate(ctx.SET()?._symbol, ctx.ruleIndex, "set opcode");
        if (ctx.SET()) {
            this.associate(ctx.OPCODE()[0]?._symbol, ctx.ruleIndex, "set opcode");
            this.associate(ctx.OPCODE()[1]?._symbol, ctx.ruleIndex, "save opcode");
        } else {
            this.associate(ctx.OPCODE()[0]?._symbol, ctx.ruleIndex, "save opcode");
        }

        this.associate(ctx._setOpcode, ctx.ruleIndex, "setOpcode");
        this.associate(ctx.SAVE()?._symbol, ctx.ruleIndex, "save opcode");
        this.associate(ctx._saveOpcode, ctx.ruleIndex, "saveOpcode");

        return {
            type: "ParamDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            fppType: this.visitTypeName(ctx._type),
            default_: ctx._default_ ? this.visitExpr(ctx._default_) : undefined,
            id: ctx._id ? this.visitExpr(ctx._id) : undefined,
            setOpcode: ctx._setOpcode ? this.visitExpr(ctx._setOpcode) : undefined,
            saveOpcode: ctx._saveOpcode ? this.visitExpr(ctx._saveOpcode) : undefined,
        };
    }

    visitGeneralPortKind(ctx: FppParser.GeneralPortKindContext): Fpp.GeneralPortKind {
        if (!ctx) {
            return this.error();
        }

        if (ctx.OUTPUT()) {
            return {
                location: this.loc(ctx),
                direction: this.keywordT<"output">(ctx.OUTPUT()!.symbol),
                isOutput: true,
                isSpecial: false
            };
        } else {
            let kind;
            const kAsync = ctx.ASYNC();
            const kGuarded = ctx.GUARDED();
            const kSync = ctx.SYNC();
            if (kAsync) {
                kind = this.keywordT<"async">(kAsync.symbol);
            } else if (kGuarded) {
                kind = this.keywordT<"guarded">(kGuarded.symbol);
            } else {
                kind = this.keywordT<"sync">(kSync!.symbol);
            }

            return {
                location: this.loc(ctx),
                direction: this.keywordT<"input">(ctx.INPUT()!.symbol),
                kind: kind,
                isOutput: false,
                isSpecial: false
            };
        }
    }

    visitSpecialPortKind(ctx: FppParser.SpecialPortKindContext): Fpp.SpecialPortKind {
        if (!ctx) {
            return this.error();
        }

        const commandK = ctx.COMMAND();
        const regK = ctx.REG();
        const recvK = ctx.RECV();
        const respK = ctx.RESP();
        const eventK = ctx.EVENT();
        const paramK = ctx.PARAM();
        const setK = ctx.SET();
        const getK = ctx.GET();
        const telemetryK = ctx.TELEMETRY();
        const textK = ctx.TEXT();
        const timeK = ctx.TIME();

        let kind;
        if (commandK) {
            if (regK) {
                kind = this.keywordsT([commandK.symbol, regK.symbol], "commandReg");
            } else if (respK) {
                kind = this.keywordsT([commandK.symbol, respK.symbol], "commandResp");
            } else {
                return {
                    location: this.loc(ctx),
                    kind: this.keywordsT([commandK.symbol, recvK!.symbol], "commandRecv"),
                    isOutput: false,
                    isSpecial: true
                };
            }
        } else if (paramK) {
            if (getK) {
                kind = this.keywordsT([paramK.symbol, getK.symbol], "paramGet");
            } else {
                kind = this.keywordsT([paramK.symbol, setK!.symbol], "paramSet");
            }
        } else if (telemetryK) {
            kind = this.keywordT<"telemetry">(telemetryK.symbol);
        } else if (textK) {
            kind = this.keywordsT([textK.symbol, eventK!.symbol], "textEvent");
        } else if (eventK) {
            kind = this.keywordT<"event">(eventK.symbol);
        } else {
            kind = this.keywordsT([timeK!.symbol, getK!.symbol], "timeGet");
        }

        return {
            location: this.loc(ctx),
            kind: kind,
            isOutput: true,
            isSpecial: true
        };
    }

    visitGeneralPortInstanceType_(ctx: FppParser.GeneralPortInstanceTypeContext): Fpp.ComplexType | undefined {
        if (!ctx) {
            return this.error();
        }

        const serialK = ctx.SERIAL();
        if (serialK) {
            // return this.keywordT<"serial">(serialK.symbol);
            return undefined;
        } else {
            return {
                complex: true,
                location: this.loc(ctx),
                type: this.visitQualIdent_(ctx.qualIdent()!),
            };
        }
    }

    visitGeneralPortInstanceDecl(ctx: FppParser.GeneralPortInstanceDeclContext): Fpp.GeneralPortInstanceDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx._kind, ctx.ruleIndex, "generalPortKind");
        this.associate(ctx.tryGetToken(FppParser.FppParser.PORT, 0)?._symbol, ctx.ruleIndex, "port");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._n, ctx.ruleIndex, "portNum");
        this.associate(ctx._type, ctx.ruleIndex, "port-instance-type");
        this.associate(ctx.PRIORITY()?.symbol, ctx.ruleIndex, "priority");
        this.associate(ctx._priority, ctx.ruleIndex, "priorityExpr");
        this.associate(ctx._queueFull, ctx.ruleIndex, "queue-full-behavior");

        return {
            type: "GeneralPortInstanceDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            kind: this.visitGeneralPortKind(ctx._kind),
            n: ctx._n ? this.visitExpr(ctx._n) : undefined,
            fppType: this.visitGeneralPortInstanceType_(ctx._type),
            queueFullBehavior: ctx._queueFull ? this.visitQueueFullBehavior(ctx._queueFull) : undefined
        };
    }

    visitSpecialPortInstanceDecl(ctx: FppParser.SpecialPortInstanceDeclContext): Fpp.SpecialPortInstanceDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.specialPortKind(), ctx.ruleIndex, "specialPortKind");
        this.associate(ctx.PORT()._symbol, ctx.ruleIndex, "port");
        this.associate(ctx._name, ctx.ruleIndex, "name");

        return {
            type: "SpecialPortInstanceDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            kind: this.visitSpecialPortKind(ctx.specialPortKind())
        };
    }

    visitTelemetryLimitKind(ctx: FppParser.TelemetryLimitKindContext): Fpp.TelemetryLimitKind {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitTelemetryLimitExpr(ctx: FppParser.TelemetryLimitExprContext): Fpp.TelemetryLimitExpr {
        if (!ctx) {
            return this.error();
        }

        return {
            location: this.loc(ctx),
            type: this.visitTelemetryLimitKind(ctx._kind),
            value: this.visitExpr(ctx._limit)
        };
    }

    visitTelemetryLimit_(ctx: FppParser.TelemetryLimitContext): Fpp.TelemetryLimitExpr[] {
        if (!ctx) {
            return this.error();
        }

        return ctx.telemetryLimitExpr().map(this.visitTelemetryLimitExpr.bind(this));
    }

    visitTelemetryUpdate_(ctx: FppParser.TelemetryUpdateContext): Fpp.Keyword<"always" | "onChange"> {
        if (!ctx) {
            return this.error();
        }

        if (ctx.ALWAYS()) {
            return this.keyword(ctx);
        } else {
            return this.keyword(ctx, "onChange");
        }
    }

    visitTelemetryChannelDecl(ctx: FppParser.TelemetryChannelDeclContext): Fpp.TelemetryChannelDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.TELEMETRY()._symbol, ctx.ruleIndex, "telemetry");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._type, ctx.ruleIndex, "type");
        this.associate(ctx.ID()?.symbol, ctx.ruleIndex, "id");
        this.associate(ctx._id, ctx.ruleIndex, "idExpr");
        this.associate(ctx.UPDATE()?.symbol, ctx.ruleIndex, "update");
        this.associate(ctx._update, ctx.ruleIndex, "telemetry-update");
        this.associate(ctx.FORMAT()?.symbol, ctx.ruleIndex, "format");
        this.associate(ctx._format, ctx.ruleIndex, "formatLiteral");
        this.associate(ctx.LOW()?.symbol, ctx.ruleIndex, "low");
        this.associate(ctx._low, ctx.ruleIndex, "lowLimit");
        this.associate(ctx.HIGH()?.symbol, ctx.ruleIndex, "high");
        this.associate(ctx._high, ctx.ruleIndex, "highLimit");

        return {
            type: "TelemetryChannelDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            fppType: this.visitTypeName(ctx._type),
            id: ctx._id ? this.visitExpr(ctx._id) : undefined,
            update: ctx._update ? this.visitTelemetryUpdate_(ctx._update) : undefined,
            format: ctx._format ? this.stringLiteral(ctx._format) : undefined,
            lowLimits: ctx._low ? this.visitTelemetryLimit_(ctx._low) : undefined,
            highLimits: ctx._high ? this.visitTelemetryLimit_(ctx._high) : undefined,
        };
    }

    visitEnumMember(ctx: FppParser.EnumMemberContext): Fpp.EnumMember {
        if (!ctx) {
            return this.error();
        }

        const value = ctx.expr();
        return {
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            value: value ? this.visitExpr(value) : undefined
        };
    }

    visitEnumMember_(ctx: FppParser.EnumMemberNContext | FppParser.EnumMemberLContext): Fpp.EnumMember {
        if (!ctx) {
            return this.error();
        }

        const out = this.visitEnumMember(ctx.enumMember());
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitEnumDecl(ctx: FppParser.EnumDeclContext): Fpp.EnumDecl {
        if (!ctx) {
            return this.error();
        }

        let members: Fpp.EnumMember[];
        const lastMember = ctx.enumMemberL();
        if (lastMember) {
            members = [
                ...ctx.enumMemberN().map(this.visitEnumMember_.bind(this)),
                this.visitEnumMember_(lastMember)
            ];
        } else {
            members = [];
        }

        return {
            type: "EnumDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            members
        };
    }

    visitEventSeverity(ctx: FppParser.EventSeverityContext): Fpp.EventSeverity {
        if (!ctx) {
            return this.error();
        }

        const activity = ctx.ACTIVITY();
        const warning = ctx.WARNING();
        const command = ctx.COMMAND();
        const diagnostic = ctx.DIAGNOSTIC();
        const fatal = ctx.FATAL();
        const high = ctx.HIGH();
        const low = ctx.LOW();
        if (command) {
            return this.keywordT<"command">(command.symbol);
        } else if (diagnostic) {
            return this.keywordT<"diagnostic">(diagnostic.symbol);
        } else if (fatal) {
            return this.keywordT<"fatal">(fatal.symbol);
        } else if (activity) {
            if (low) {
                return this.keywordsT([activity.symbol, low.symbol], "activityLow");
            } else {
                return this.keywordsT([activity.symbol, high!.symbol], "activityHigh");
            }
        } else if (warning) {
            if (low) {
                return this.keywordsT([warning.symbol, low.symbol], "warningLow");
            } else {
                return this.keywordsT([warning.symbol, high!.symbol], "warningHigh");
            }
        }

        throw new Error("Invalid event severity");
    }

    visitEventDecl(ctx: FppParser.EventDeclContext): Fpp.EventDecl {
        if (!ctx) {
            return this.error();
        }

        const params = ctx._params;
        const id = ctx._id;
        const format = ctx._format;
        const throttle = ctx._throttle;

        this.associate(ctx.EVENT()._symbol, ctx.ruleIndex, "event");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._params, ctx.ruleIndex, "param-list");
        this.associate(ctx.SEVERITY()._symbol, ctx.ruleIndex, "severity");
        this.associate(ctx.eventSeverity(), ctx.ruleIndex, "severityKeyword");
        this.associate(ctx.ID()?.symbol, ctx.ruleIndex, "id");
        this.associate(ctx._id, ctx.ruleIndex, "idExpr");
        this.associate(ctx.FORMAT()?._symbol, ctx.ruleIndex, "format");
        this.associate(ctx._format, ctx.ruleIndex, "formatLiteral");
        this.associate(ctx.THROTTLE()?.symbol, ctx.ruleIndex, "throttle");
        this.associate(ctx._throttle, ctx.ruleIndex, "throttleExpr");

        return {
            type: "EventDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            params: params ? this.visitFormalParameterList_(params) : [],
            severity: this.visitEventSeverity(ctx.eventSeverity()),
            id: id ? this.visitExpr(id) : undefined,
            format: format ? this.stringLiteral(format) : undefined,
            throttle: throttle ? this.visitExpr(throttle) : undefined
        };
    }

    visitIncludeStmt(ctx: FppParser.IncludeStmtContext): Fpp.IncludeStmt<Fpp.Member> {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.INCLUDE().symbol, ctx.ruleIndex, "include");
        this.associate(ctx._include, ctx.ruleIndex, "includeFile");

        const outAst: Fpp.IncludeStmt<Fpp.Member> = {
            type: "IncludeStmt",
            location: this.loc(ctx),
            include: this.resolvePath(this.stringLiteral(ctx._include)),
            resolved: undefined as any
        };

        if (outAst.include && !outAst.include.isError) {
            const currentContext = this.includeContextStack[this.includeContextStack.length - 1];

            const parsePromise = this.onInclude(outAst.include.value, this.sourceStack, this.scope, currentContext);
            this.promises.push([ctx, parsePromise.then(v => { outAst.resolved = v[1]; return v[0]; })]);
        }

        return outAst;
    }

    visitMatchStmt(ctx: FppParser.MatchStmtContext): Fpp.MatchStmt {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.MATCH().symbol, ctx.ruleIndex, "match");
        this.associate(ctx._match, ctx.ruleIndex, "target");
        this.associate(ctx.WITH().symbol, ctx.ruleIndex, "with");
        this.associate(ctx._with_, ctx.ruleIndex, "source");

        return {
            type: "MatchStmt",
            location: this.loc(ctx),
            match: this.identifier(ctx._match),
            with: this.identifier(ctx._with_),
        };
    }

    visitInternalPortDecl(ctx: FppParser.InternalPortDeclContext): Fpp.InternalPortDecl {
        if (!ctx) {
            return this.error();
        }

        const params = ctx._params;
        const priority = ctx._priority;
        const queueFullBehavior = ctx._queueFull;

        this.associate(ctx.INTERNAL()._symbol, ctx.ruleIndex, "internal");
        this.associate(ctx.PORT()._symbol, ctx.ruleIndex, "port");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._params, ctx.ruleIndex, "param-list");
        this.associate(ctx.PRIORITY()?._symbol, ctx.ruleIndex, "priority");
        this.associate(ctx._priority, ctx.ruleIndex, "priorityExpr");
        this.associate(ctx._queueFull, ctx.ruleIndex, "queue-full-behavior");

        return {
            type: "InternalPortDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            params: params ? this.visitFormalParameterList_(params) : [],
            priority: priority ? this.visitExpr(priority) : undefined,
            queueFullBehavior: queueFullBehavior ? this.keyword(queueFullBehavior) : undefined,
        };
    }

    visitInitSpecifier(ctx: FppParser.InitSpecifierContext): Fpp.InitSpecifier {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.tryGetToken(FppParser.FppParser.PHASE, 0)?._symbol, ctx.ruleIndex, "phase");
        this.associate(ctx._phaseExpr, ctx.ruleIndex, "phaseExpr");
        this.associate(ctx._code, ctx.ruleIndex, "codeLiteral");

        return {
            location: this.loc(ctx),
            phase: this.visitExpr(ctx._phaseExpr),
            code: this.stringLiteral(ctx._code),
            annotation: this.annotation(ctx.annotation())
        };
    }

    visitComponentInstanceDecl(ctx: FppParser.ComponentInstanceDeclContext): Fpp.ComponentInstanceDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.INSTANCE()._symbol, ctx.ruleIndex, "instance");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._fppType, ctx.ruleIndex, "component");
        this.associate(ctx.tryGetToken(FppParser.FppParser.BASE, 0)?._symbol, ctx.ruleIndex, "base");
        this.associate(ctx.tryGetToken(FppParser.FppParser.ID, 0)?._symbol, ctx.ruleIndex, "id");
        this.associate(ctx._base_id, ctx.ruleIndex, "baseIdExpr");
        this.associate(ctx.TYPE()?._symbol, ctx.ruleIndex, "type");
        this.associate(ctx._cppType, ctx.ruleIndex, "C++ type");
        this.associate(ctx.AT()?._symbol, ctx.ruleIndex, "at");
        this.associate(ctx._at, ctx.ruleIndex, "includeFile");
        this.associate(ctx.QUEUE()?._symbol, ctx.ruleIndex, "queue size");
        this.associate(ctx.SIZE()[0]?.symbol, ctx.ruleIndex, "queue size");
        this.associate(ctx._queueSize, ctx.ruleIndex, "queueSize");
        this.associate(ctx.STACK()?._symbol, ctx.ruleIndex, "stack size");
        this.associate(ctx.SIZE()[1]?.symbol, ctx.ruleIndex, "stack size");
        this.associate(ctx._stackSize, ctx.ruleIndex, "stackSize");
        this.associate(ctx.PRIORITY()?._symbol, ctx.ruleIndex, "priority");
        this.associate(ctx._priority, ctx.ruleIndex, "priorityExpr");
        this.associate(ctx.CPU()?._symbol, ctx.ruleIndex, "cpu");
        this.associate(ctx._cpu, ctx.ruleIndex, "cpuExpr");

        return {
            type: "ComponentInstanceDecl",
            scope: [...this.scope],
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            fppType: {
                complex: true,
                location: this.loc(ctx._fppType),
                type: this.visitQualIdent_(ctx._fppType)
            },
            baseId: this.visitExpr(ctx._base_id),
            at: ctx._at ? this.stringLiteral(ctx._at) : undefined,
            queueSize: ctx._queueSize ? this.visitExpr(ctx._queueSize) : undefined,
            stackSize: ctx._stackSize ? this.visitExpr(ctx._stackSize) : undefined,
            priority: ctx._priority ? this.visitExpr(ctx._priority) : undefined,
            cpu: ctx._cpu ? this.visitExpr(ctx._cpu) : undefined,
            init: ctx.initSpecifier().map((v) => this.visitInitSpecifier(v))
        };
    }

    visitComponentKind(ctx: FppParser.ComponentKindContext): Fpp.ComponentKind {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitComponentMember(ctx: FppParser.ComponentMemberContext): Fpp.ComponentMember {
        const out = this.visit(ctx.componentMemberTempl()) as Fpp.ComponentMember;
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitModuleMember(ctx: FppParser.ModuleMemberContext): Fpp.ModuleMember {
        const out = this.visit(ctx.moduleMemberTempl()) as Fpp.ModuleMember;
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitTopologyMember(ctx: FppParser.TopologyMemberContext): Fpp.TopologyMember {
        const out = this.visit(ctx.topologyMemberTempl()) as Fpp.TopologyMember;
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitComponentDecl(ctx: FppParser.ComponentDeclContext): Fpp.ComponentDecl {
        if (!ctx) {
            return this.error();
        }

        const name = this.identifier(ctx._name);

        this.includeContextStack.push(IncludeContext.component);

        const oldScope = this.scope;
        this.scope = [...this.scope, name];

        const members: Fpp.ComponentMember[] = [];
        for (const memberCtx of ctx.componentMember()) {
            try {
                members.push(this.visitComponentMember(memberCtx));
            } catch (e) { }
        }

        this.includeContextStack.pop();

        this.scope = oldScope;

        return {
            type: "ComponentDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name,
            kind: this.visitComponentKind(ctx._kind),
            members
        };
    }

    visitPortDecl(ctx: FppParser.PortDeclContext): Fpp.PortDecl {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.PORT()._symbol, ctx.ruleIndex, "port");
        this.associate(ctx._name, ctx.ruleIndex, "name");
        this.associate(ctx._params, ctx.ruleIndex, "param-list");
        this.associate(ctx._returnType, ctx.ruleIndex, "returnType");

        return {
            type: "PortDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            params: ctx._params ? this.visitFormalParameterList_(ctx._params) : [],
            returnType: ctx._returnType ? this.visitTypeName(ctx._returnType) : undefined
        };
    }

    visitComponentInstanceSpec(ctx: FppParser.ComponentInstanceSpecContext): Fpp.ComponentInstanceSpec {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx.PRIVATE()?.symbol, ctx.ruleIndex, "private");
        this.associate(ctx.INSTANCE().symbol, ctx.ruleIndex, "instance");
        this.associate(ctx._name, ctx.ruleIndex, "componentInstance");

        return {
            type: "ComponentInstanceSpec",
            location: this.loc(ctx),
            name: this.visitQualIdent_(ctx._name),
            isPrivate: !!ctx.PRIVATE()
        };
    }

    visitConnectionNode(ctx: FppParser.ConnectionNodeContext): Fpp.ConnectionNode {
        if (!ctx) {
            return this.error();
        }

        return {
            location: this.loc(ctx),
            node: this.visitQualIdent_(ctx._node),
            index: ctx._index ? this.visitExpr(ctx._index) : undefined
        };
    }

    visitConnection(ctx: FppParser.ConnectionContext): Fpp.Connection {
        if (!ctx) {
            return this.error();
        }

        this.associate(ctx._source, ctx.ruleIndex, "input");
        this.associate(ctx._destination, ctx.ruleIndex, "output");

        return {
            location: this.loc(ctx),
            source: this.visitConnectionNode(ctx._source),
            destination: this.visitConnectionNode(ctx._destination),
        };
    }

    visitDirectGraphDecl(ctx: FppParser.DirectGraphDeclContext): Fpp.DirectGraphDecl {
        if (!ctx) {
            return this.error();
        }

        return {
            type: "DirectGraphDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            connections: ctx.connection().map(v => this.visitConnection(v))
        };
    }

    visitPatternKind(ctx: FppParser.PatternKindContext): Fpp.PatternKind {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitPatternGraphSources_(ctx: FppParser.PatternGraphSourcesContext): Fpp.QualifiedIdentifier[] {
        if (!ctx) {
            return this.error();
        }

        return ctx.qualIdent().map(v => this.visitQualIdent_(v));
    }

    visitPatternGraphStmt(ctx: FppParser.PatternGraphStmtContext): Fpp.PatternGraphStmt {
        if (!ctx) {
            return this.error();
        }

        const sources = ctx.patternGraphSources();
        return {
            type: "PatternGraphStmt",
            location: this.loc(ctx),
            kind: this.visitPatternKind(ctx._kind),
            target: this.visitQualIdent_(ctx._target),
            sources: sources ? this.visitPatternGraphSources_(sources) : []
        };
    }

    visitTopologyImportStmt(ctx: FppParser.TopologyImportStmtContext): Fpp.TopologyImportStmt {
        if (!ctx) {
            return this.error();
        }

        return {
            type: "TopologyImportStmt",
            location: this.loc(ctx),
            topology: this.visitQualIdent_(ctx._topology)
        };
    }

    visitTopologyDecl(ctx: FppParser.TopologyDeclContext): Fpp.TopologyDecl {
        if (!ctx) {
            return this.error();
        }

        this.includeContextStack.push(IncludeContext.topology);

        const members: Fpp.TopologyMember[] = [];
        for (const memberCtx of ctx.topologyMember()) {
            try {
                members.push(this.visitTopologyMember(memberCtx) as Fpp.TopologyMember);
            } catch (e) { }
        }

        this.includeContextStack.pop();

        return {
            type: "TopologyDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name: this.identifier(ctx._name),
            members
        };
    }

    visitLocationKind(ctx: FppParser.LocationKindContext): Fpp.LocationKind {
        if (!ctx) {
            return this.error();
        }

        return this.keyword(ctx);
    }

    visitLocationStmt(ctx: FppParser.LocationStmtContext): Fpp.LocationStmt {
        if (!ctx) {
            return this.error();
        }

        return {
            type: "LocationStmt",
            location: this.loc(ctx),
            name: this.visitQualIdent_(ctx._name),
            kind: this.visitLocationKind(ctx._kind),
            path: this.resolvePath(this.stringLiteral(ctx._path))
        };
    }

    visitModuleDecl(ctx: FppParser.ModuleDeclContext): Fpp.ModuleDecl {
        if (!ctx) {
            return this.error();
        }

        const name = this.identifier(ctx._name);

        this.includeContextStack.push(IncludeContext.module);

        const oldScope = this.scope;
        this.scope = [...this.scope, name];

        const members: Fpp.ModuleMember[] = [];
        for (const memberCtx of ctx.moduleMember()) {
            try {
                members.push(this.visitModuleMember(memberCtx));
            } catch (e) { }
        }

        this.scope = oldScope;
        this.includeContextStack.pop();

        return {
            type: "ModuleDecl",
            scope: [...this.scope],
            fppType: undefined,
            location: this.loc(ctx),
            name,
            members
        };
    }

    visitFormalParameter(ctx: FppParser.FormalParameterContext): Fpp.FormalParameter {
        if (!ctx) {
            return this.error();
        }

        return {
            location: this.loc(ctx),
            ref: !!ctx.REF(),
            name: this.identifier(ctx._name),
            type: this.visitTypeName(ctx._type)
        };
    }

    visitFormalParameter_(ctx: FppParser.FormalParameterNContext | FppParser.FormalParamaterLContext): Fpp.FormalParameter {
        if (!ctx) {
            return this.error();
        }

        const out = this.visitFormalParameter(ctx.formalParameter());
        out.annotation = this.annotation(ctx.annotation());
        return out;
    }

    visitFormalParameterList_(ctx: FppParser.FormalParameterListContext): Fpp.FormalParameter[] {
        if (!ctx) {
            return [];
        }

        const lastParam = ctx.formalParamaterL();
        if (!lastParam) {
            return [];
        }

        return [
            ...ctx.formalParameterN().map(v => this.visitFormalParameter_(v)),
            this.visitFormalParameter_(lastParam)
        ];
    }

    visitQualIdent_(ctx: FppParser.QualIdentContext): Fpp.QualifiedIdentifier {
        if (!ctx) {
            return this.error();
        }

        return ctx.IDENTIFIER().map(v => this.identifier(v._symbol));
    }

    visitPrimitiveType(ctx: FppParser.PrimitiveTypeContext): Fpp.TypeName {
        if (!ctx) {
            return this.error();
        }

        return {
            complex: false,
            type: ctx.text! as Fpp.PrimitiveTypeKey,
            location: this.loc(ctx)
        };
    }

    visitTypeName(ctx: FppParser.TypeNameContext): Fpp.TypeName {
        if (!ctx) {
            return this.error();
        }

        const complexType = ctx.qualIdent();
        const primitiveType = ctx.primitiveType();
        if (complexType) {
            return {
                complex: true,
                location: this.loc(ctx),
                type: this.visitQualIdent_(complexType)
            };
        } else if (primitiveType) {
            return this.visitPrimitiveType(primitiveType!);
        } else {
            return this.error() as Fpp.TypeName;
        }
    }

    visitArrayExpr(ctx: FppParser.ArrayExprContext): Fpp.ArrayExpr {
        if (!ctx) {
            return this.error();
        }

        return {
            type: "ArrayExpr",
            location: this.loc(ctx),
            value: ctx.expr().map((v) => this.visitExpr(v))
        };
    }

    visitStructAssignment(ctx: FppParser.StructAssignmentContext): Fpp.StructAssignment {
        if (!ctx) {
            return this.error();
        }

        return {
            name: this.identifier(ctx._name),
            value: this.visitExpr(ctx._value),
            location: this.loc(ctx)
        };
    }

    visitStructExpr(ctx: FppParser.StructExprContext): Fpp.StructExpr {
        if (!ctx) {
            return this.error();
        }

        return {
            type: "StructExpr",
            location: this.loc(ctx),
            value: ctx.structAssignment().map(v => this.visitStructAssignment(v))
        };
    }

    visitExpr(ctx: FppParser.ExprContext): Fpp.Expr {
        if (!ctx) {
            return this.error();
        }

        if (ctx.LIT_FLOAT()) {
            return {
                type: "FloatLiteral",
                value: parseFloat(ctx.LIT_FLOAT()!.text),
                location: this.loc(ctx)
            };
        } else if (ctx.LIT_INT()) {
            return {
                type: "IntLiteral",
                value: parseInt(ctx.LIT_INT()!.text),
                location: this.loc(ctx)
            };
        } else if (ctx.LIT_STRING()) {
            const strLit = this.stringLiteral(ctx.LIT_STRING()!._symbol);
            return {
                type: "StringLiteral",
                value: strLit.value,
                location: strLit.location
            };
        } else if (ctx.LIT_BOOLEAN()) {
            return {
                type: "BooleanExpr",
                location: this.loc(ctx),
                value: ctx.LIT_BOOLEAN()!.text === "true"
            };
        } else if (ctx.qualIdent()) {
            return {
                type: "Identifier",
                value: this.visitQualIdent_(ctx.qualIdent()!),
                location: this.loc(ctx)
            };
        } else if (ctx._unary) {
            return {
                type: "NegExpr",
                location: this.loc(ctx),
                value: this.visitExpr(ctx._unary)
            };
        } else if (ctx._op) {
            return {
                type: "BinaryExpr",
                location: this.loc(ctx),
                left: this.visitExpr(ctx._left),
                right: this.visitExpr(ctx._right),
                operator: this.keywordT(ctx._op)
            };
        } else {
            return this.visitExpr(ctx._p);
        }
    }
}
