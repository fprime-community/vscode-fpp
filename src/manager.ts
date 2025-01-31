import * as vscode from 'vscode';

import * as fs from 'fs/promises';
import * as path from 'path';

import { TextDecoder } from 'util';

import { FppAnnotator } from "./annotator";
import { DeclCollector } from "./decl";
import { DiangosicManager } from "./diagnostics";
import { DocumentOrFile, FppMessage, FppWorker } from "./parser/client";

export interface ParsingOptions {
    /**
     * Parse even if the latest AST is up to date
     * This could happen if we think that the version
     * identifier for this document is incorrect
     */
    forceReparse?: boolean;

    /**
     * Don't run the file through the declaration collector
     */
    disableDecl?: boolean;

    /**
     * Don't run the file through the annotator
     */
    disableAnnotations?: boolean;

    /**
     * Normally, parsing a document will trigger open
     * text documents to be re-annotated to give you
     * live feedback on on errors and other rules
     * 
     * When indexing the entire project we push this back
     * to the end of the indexing run since we only really need
     * to do it once.
     */
    disableRefresh?: boolean;
}

const textDecoder = new TextDecoder();
export abstract class FppProjectManager {
    readonly decl: DeclCollector = new DeclCollector();

    private asts = new Map<string, FppMessage>();
    private annotations = new Map<string, FppAnnotator>();
    private worker = new FppWorker();
    private syntaxListener: DiangosicManager;

    private hasComponentInstances = new Set<string>();
    protected parentFiles = new Map<string, Set<string>>();

    private _onRefresh = new vscode.EventEmitter<void>();
    readonly onRefresh = this._onRefresh.event;

    constructor(
        public readonly documentSelector: vscode.DocumentSelector
    ) {
        this.syntaxListener = new DiangosicManager();
    }

    abstract inProject(path: string): boolean;

    ready(): Promise<void> {
        return this.worker.ready();
    }

    clear(path: string) {
        this.decl.clearDecls(path);
        this.asts.delete(path);
        this.hasComponentInstances.delete(path);
        this.annotations.get(path)?.dispose();
        this.annotations.delete(path);
        this.syntaxListener.flush(path);
        this.syntaxListener.flush(path);
    }

    clearAll() {
        for (const path of this.asts.keys()) {
            this.clear(path);
        }

        this.asts.clear();
        this.hasComponentInstances.clear();
        this._onRefresh.fire();
    }

    dispose() {
        this.decl.dispose();
        for (const v of this.annotations.values()) {
            v.dispose();
        }

        this.annotations.clear();
        this.worker.dispose();
    }


    refreshAnnotations() {
        // Move through all files and re-annotate them
        for (const ast of this.asts.values()) {
            this.annotations.get(ast.path)?.pass(ast.ast);
        }

        // Run all listeners that care about refresh events
        this._onRefresh.fire();
    }

    private async getTextOf(uri: vscode.Uri): Promise<[number, string]> {
        // Check if we already have this file open in the workspace
        // If we do, use the open version instead of reading directly from disk
        const alreadyOpenDoc = vscode.workspace.textDocuments.find(v => v.uri.path === uri.path);
        if (alreadyOpenDoc) {
            return [alreadyOpenDoc.version, alreadyOpenDoc.getText()];
        }

        // Read and decode the text file
        return [-1, textDecoder.decode(await vscode.workspace.fs.readFile(uri))];
    }

    async get(document: vscode.TextDocument, token?: vscode.CancellationToken, options?: ParsingOptions): Promise<FppAnnotator> {
        // Re-parse the document if needed
        const parseOut = await this.parse(document, token, options);
        return this.annotations.get(parseOut.path)!;
    }

    async parse(
        documentOrUri: vscode.TextDocument | vscode.Uri,
        token?: vscode.CancellationToken,
        options?: ParsingOptions
    ): Promise<FppMessage> {
        if (documentOrUri instanceof vscode.Uri) {
            const [version, text] = await this.getTextOf(documentOrUri);
            return await this.parseImpl({
                path: documentOrUri.path,
                version,
                getText: () => text,
            }, token, options);
        } else {
            return await this.parseImpl({
                path: documentOrUri.uri.path,
                version: documentOrUri.version,
                getText: documentOrUri.getText.bind(documentOrUri)
            }, token, options);
        }
    }

    private async parseImpl(
        document: DocumentOrFile,
        token?: vscode.CancellationToken,
        options?: ParsingOptions
    ): Promise<FppMessage> {
        // Symlinks cause issues since there are two different paths referencing
        // the same file, we should resolve the symlinks here before going further.
        document.path = await fs.realpath(document.path);

        // If we are attempting to parse a file that has been included by another file
        // We actually need to parse the parent file so the declarations work properly
        const parentFiles = this.parentFiles.get(document.path);

        if (parentFiles && parentFiles.size > 0) {
            this.syntaxListener.flush(document.path);
            this.syntaxListener.flush(document.path);

            let out!: FppMessage;
            for (const parentFile of parentFiles) {
                const [version, text] = await this.getTextOf(vscode.Uri.file(parentFile));
                out = await this.parseImpl2({
                    path: parentFile,
                    version,
                    getText: () => text,
                    getTextSub: () => [document.getText(), document.path]
                }, token, {
                    ...options,
                    forceReparse: true
                });
            }

            return out;
        } else if (path.extname(document.path) === ".fppi") {
            this.syntaxListener.flush(document.path);
            this.syntaxListener.flush(document.path);
            this.syntaxListener.emit(vscode.Uri.file(document.path), new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                ".fppi has no parent .fpp"
            ));
            this.syntaxListener.flush(document.path);

            return FppMessage.deserialize({
                ast: {
                    location: {
                        source: document.path,
                        start: { line: 0, column: 0 },
                        end: { line: 0, column: 0 },
                    },
                    type: "TranslationUnit",
                    members: [],
                    dependencies: [],
                },
                path: document.path,
                ranges: [],
                syntaxErrors: [],
                version: -1,
            });
        } else {
            return await this.parseImpl2(document, token, options ?? {});
        }
    }

    private async parseImpl2(
        document: DocumentOrFile,
        token: vscode.CancellationToken | undefined,
        options: ParsingOptions
    ): Promise<FppMessage> {
        const key = document.path;

        // First check if the AST we have is good enough
        if (!options.forceReparse && (this.asts.get(key)?.version ?? -10) >= document.version) {
            return this.asts.get(key)!;
        }

        // Wait for the document to be parsed in the other thread
        const msg = await this.worker.parse(document, token);

        // Update our knowledge of the AST
        this.asts.set(key, msg);

        for (const dep of msg.ast.dependencies) {
            this.clear(dep);
            let pfs = this.parentFiles.get(dep);
            if (!pfs) {
                pfs = new Set();
                this.parentFiles.set(dep, pfs);
            }

            pfs.add(key);
        }

        // Create an annotator for this file
        let annotator = this.annotations.get(key);
        if (!annotator) {
            annotator = new FppAnnotator(this.decl);
            this.annotations.set(key, annotator);
        }

        if (!this.inProject(key)) {
            options.disableDecl = true;
        }

        if (!options.disableDecl) {
            this.decl.hasComponentInstances = false;

            this.decl.pass(msg.ast);

            // Keep track of files that have component instances
            // This is important since instances create an extra depth
            // of annotation dependencies
            if (this.decl.hasComponentInstances) {
                this.hasComponentInstances.add(key);
            } else {
                this.hasComponentInstances.delete(key);
            }
        }

        if (!options.disableAnnotations) {
            annotator.pass(msg.ast);
        }

        this.syntaxListener.flush(key);
        this.syntaxListener.flush(key);
        for (const [uriStr, err] of msg.syntaxErrors) {
            this.syntaxListener.emit(vscode.Uri.file(uriStr), err);
        }
        this.syntaxListener.flush(key);

        if (!options.disableRefresh && !options.disableAnnotations) {
            this.refreshAnnotations();
        }

        return msg;
    }
}
