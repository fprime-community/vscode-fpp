import * as vscode from 'vscode';

import * as Fpp from './parser/ast';
import { MemberTraverser } from './traverser';
import { symLinkCache } from './annotator';
import { FppProjectManager } from './manager';

export class FppProject extends FppProjectManager implements vscode.Disposable {
    private locs = new Set<string>();
    private locsFile?: vscode.Uri;

    private availableLocs = new Set<string>();

    private locsSelect: vscode.LanguageStatusItem;
    private locsReload: vscode.LanguageStatusItem;

    private loadingProject: boolean = false;

    constructor(selector: vscode.DocumentSelector) {
        super(selector);

        this.locsSelect = vscode.languages.createLanguageStatusItem(
            'fpp.locsNew',
            this.documentSelector
        );
        this.locsSelect.name = "FPP Project Status";

        this.locsReload = vscode.languages.createLanguageStatusItem(
            'fpp.locsReload',
            this.documentSelector
        );

        this.refreshLanguageStatus();

        this.locsTrav.parent = this;
    }

    private refreshLanguageStatus() {
        if (!this.locsFile) {
            this.locsSelect.text = "No `locs.fpp` file file loaded";
            this.locsSelect.command = { title: "Select", command: "fpp.select" };
            this.locsSelect.severity = vscode.LanguageStatusSeverity.Warning;

            // Don't show this language item right now
            this.locsReload.selector = { scheme: 'INVALID', language: 'INVALID' };

            this.locsReload.command = undefined;
            this.locsReload.detail = undefined;
            this.locsReload.text = "";
        } else {
            this.locsSelect.text = "FPP Project Loaded";
            this.locsSelect.command = { title: "Select", command: "fpp.select" };
            this.locsSelect.severity = vscode.LanguageStatusSeverity.Information;

            this.locsReload.selector = this.documentSelector;
            this.locsReload.command = { title: "Reload", command: "fpp.reload" };
            this.locsReload.detail = "Reload FPP Project";
            this.locsReload.text = vscode.workspace.asRelativePath(this.locsFile);
        }
    }

    // Tracks which files should be tracked by the decl collector
    inProject(path: string): boolean {
        const isInProject = this.loadingProject || this.locs.has(path);
        if (!isInProject) {
            const parentFiles = this.parentFiles.get(path);
            if (parentFiles) {
                for (const parentFile of parentFiles) {
                    if (this.locs.has(parentFile)) {
                        return true;
                    }
                }
            }

            return false;
        }

        return isInProject;
    }

    clearAll(): void {
        this.locs.clear();
        super.clearAll();
    }

    private async scan(progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken) {
        // Read the locsFile file
        if (!this.locsFile) {
            throw new Error('No locs loaded');
        }

        symLinkCache.clear();
        this.clearAll();

        progress.report({
            message: "Scanning locs file",
            increment: 0
        });

        // Parse the locs file
        const { ast } = await this.parse(this.locsFile, undefined, {
            forceReparse: true,
            disableAnnotations: true
        });

        // Parse the locs file
        this.loadingProject = true;
        this.locsTrav.pass(ast);
        const indexCount = this.locsTrav.promises.length;

        // Wait for all files to finish
        let i = 1;
        this.locsTrav.token = token;
        for (const [uri, prom] of this.locsTrav.promises) {
            try {
                progress.report({
                    message: uri.path,
                    increment: 100 / indexCount
                });

                await prom();
            } catch { }
            i++;
        }

        this.loadingProject = false;
        this.locsTrav.token = undefined;

        // Annotate all the files at once
        progress.report({
            message: 'Refreshing project annotations',
            increment: 0
        });
        this.refreshAnnotations();

        // Force reparse of locs
        await this.parse(this.locsFile, token, {
            forceReparse: true
        });
    }

    private locsTrav = new class extends MemberTraverser {
        parent!: FppProject;

        newLocs = new Set<string>();
        promises: [vscode.Uri, () => Promise<unknown>][] = [];
        token?: vscode.CancellationToken;

        pass(ast: Fpp.TranslationUnit): void {
            this.newLocs.clear();
            this.promises = [];

            super.pass(ast);

            this.parent.locs = this.newLocs;
        }

        protected locationStmt(ast: Fpp.LocationStmt, scope: Fpp.QualifiedIdentifier): void {
            if (this.newLocs.has(ast.path.value)) {
                // No need to double dip this file
                return;
            }

            // Make sure we don't double parse a file
            if (!this.newLocs.has(ast.path.value)) {
                // Add the parsing file to the queue
                const uri = vscode.Uri.file(ast.path.value);
                this.promises.push([
                    uri,
                    () => {
                        return this.parent.parse(uri, undefined, {
                            disableAnnotations: true
                        });
                    }
                ]);
            }

            this.newLocs.add(ast.path.value);
        }
    }();

    [Symbol.iterator](): Iterator<string> {
        return this.locs.keys();
    }

    async reload() {
        this.refreshLanguageStatus();
        if (!this.locsFile) {
            return;
        }

        this.locsReload.busy = true;

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Indexing FPP Project",
                cancellable: true
            }, this.scan.bind(this));
        } catch (e) {
            console.error(e);
            vscode.window.showErrorMessage(`Failed to load locs.fpp: ${e}`);
            this.locsSelect.text = "Locs load failed";
            this.locsSelect.severity = vscode.LanguageStatusSeverity.Error;
        } finally {
            this.locsReload.busy = false;
        }
    }

    async set(locsFile: vscode.Uri | undefined) {
        if (!locsFile) {
            this.locsFile = undefined;
            this.clearAll();
            this.refreshLanguageStatus();
        } else {
            this.locsFile = locsFile;

            this.refreshLanguageStatus();
            this.locsSelect.busy = true;

            try {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Indexing FPP Project",
                    cancellable: true
                }, this.scan.bind(this));
            } catch (e) {
                console.error(e);
                vscode.window.showErrorMessage(`Failed to load locs.fpp: ${e}`);
                this.locsSelect.text = "Locs load failed";
                this.locsSelect.severity = vscode.LanguageStatusSeverity.Error;
            } finally {
                this.locsSelect.busy = false;
            }
        }
    }

    dispose() {
        super.dispose();
        this.locs.clear();
        this.locsSelect.dispose();
        this.locsReload.dispose();
    }
}
