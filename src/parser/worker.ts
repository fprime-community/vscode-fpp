import {
    ErrorListener,
    BufferedTokenStream,
    CharStreams,
    CommonTokenStream,
    RecognitionException,
    Recognizer
} from 'antlr4';

import FppParser from '../grammar/FppParser';
import FppLexer from '../grammar/FppLexer';

import * as Fpp from './ast';

import * as fs from 'fs/promises';

import { parentPort } from 'worker_threads';
import { AstVisitor, IncludeContext, IncludeProduct } from './visitor';
import { IFppMessage, IDiagnostic, IFppWorkerRequest } from './message';
import { TextDecoder } from 'util';


class SyntaxErrorListener implements ErrorListener<any> {
    diagnostics: IDiagnostic[] = [];

    constructor(private readonly source: string) { }

    syntaxError(
        recognizer: Recognizer<any>,
        offendingSymbol: any,
        line: number,
        charPositionInLine: number,
        message: string, e: RecognitionException | undefined
    ): void {
        this.diagnostics.push({
            source: this.source,
            range: [
                line - 1, charPositionInLine,
                line - 1, charPositionInLine + (e?.offendingToken?.text.length ?? 1)
            ],
            message
        });
    }
}

let subFile: {
    path: string;
    text: string;
} | undefined = undefined;

const textDecoder = new TextDecoder();
async function parse(
    path: string,
    pathStack: readonly string[],
    scope: Fpp.QualifiedIdentifier,
    context: IncludeContext
): Promise<[IncludeProduct, Fpp.TranslationUnit<Fpp.Member>]> {
    if (pathStack.includes(path)) {
        // Cyclic dependency, stop parsing or we'll be here all week
        throw new Error("Cyclic dependency detected");
    }

    // Get the file contents
    let text: string;

    if (subFile?.path === path) {
        // We are currently editing this dependency
        text = subFile.text;
    } else {
        // Read and decode the file
        text = textDecoder.decode(await fs.readFile(path));
    }

    // Generate a token stream from the document
    // Run this through C3 to get parsing candidates
    const inputStream = CharStreams.fromString(text);
    const lexer = new FppLexer(inputStream);

    const listener = new SyntaxErrorListener(path);
    lexer.removeErrorListeners();
    lexer.addErrorListener(listener);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new FppParser(tokenStream);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);

    const visitor = new AstVisitor(tokenStream, [...pathStack, path], scope, parse);
    let out: Fpp.TranslationUnit<Fpp.Member>;
    switch (context) {
        case IncludeContext.module:
            out = visitor.visitProg(parser.prog());
            break;
        case IncludeContext.topology:
            out = visitor.visitProgTopology(parser.progTopology());
            break;
        case IncludeContext.component:
            out = visitor.visitProgComponent(parser.progComponent());
            break;
        // case IncludeContext.stateMachine:
        // case IncludeContext.state:
    }

    return [await visitor.finish(), out];
}

parentPort?.on("message", async (message: IFppWorkerRequest) => {
    try {
        if (message.subText) {
            subFile = {
                text: message.subText[0],
                path: message.subText[1]
            };
        }

        // Generate a token stream from the document
        // Run this through C3 to get parsing candidates
        const inputStream = CharStreams.fromString(message.text);
        const lexer = new FppLexer(inputStream);

        const listener = new SyntaxErrorListener(message.path);
        lexer.removeErrorListeners();
        lexer.addErrorListener(listener);

        const tokenStream = new CommonTokenStream(lexer);
        const parser = new FppParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);

        // Lower the ANTLR parsing tree to an AST
        const visitor = new AstVisitor(tokenStream, [message.path], [], parse);
        const ast = visitor.visitProg(parser.prog());

        // Wait for any includes to finish up
        const product = await visitor.finish();
        ast.dependencies = product.dependencies;

        subFile = undefined;

        const retMessage: IFppMessage = {
            ast,
            path: message.path,
            ranges: Array.from(product.ranges.entries()),
            syntaxErrors: listener.diagnostics.concat(product.errors),
            version: message.version
        };

        // Reply to the parsing request
        parentPort?.postMessage({
            code: "success",
            msg: retMessage
        });
    } catch (e) {
        parentPort?.postMessage({
            code: "error",
            msg: `${e}`
        });
    }
});

parentPort?.postMessage({ code: "startup" });
