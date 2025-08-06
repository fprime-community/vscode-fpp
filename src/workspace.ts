import * as vscode from 'vscode';

import { FppProjectManager } from './manager';
import { MemberTraverser } from './passes/traverser';
import * as Fpp from './parser/ast';

export interface WorkspaceFileScanner {
    label(): string;

    scan(
        progress: vscode.Progress<{ message?: string; increment?: number }>,
        token: vscode.CancellationToken,
    ): Promise<Set<string>>;
}

export class LocsFileScanner implements WorkspaceFileScanner {
    locsFile: vscode.Uri;
    project: FppProjectManager;

    private locsTrav = new class extends MemberTraverser {
        parent!: LocsFileScanner;

        files = new Set<string>();
        promises: [vscode.Uri, () => Promise<unknown>][] = [];
        token?: vscode.CancellationToken;

        pass(ast: Fpp.TranslationUnit): void {
            this.files.clear();
            this.promises = [];

            super.pass(ast);
        }

        protected locationStmt(ast: Fpp.LocationStmt, scope: Fpp.QualifiedIdentifier): void {
            if (this.files.has(ast.path.value)) {
                // No need to double dip this file
                return;
            }

            // Make sure we don't double parse a file
            if (!this.files.has(ast.path.value)) {
                // Add the parsing file to the queue
                const uri = vscode.Uri.file(ast.path.value);
                this.promises.push([
                    uri,
                    () => {
                        return this.parent.project.parse(uri, this.token, {
                            disableRefresh: true,
                        });
                    }
                ]);
            }

            this.files.add(ast.path.value);
        }
    }();

    constructor(project: FppProjectManager, locsFile: vscode.Uri) {
        this.project = project;
        this.locsFile = locsFile;
        this.locsTrav.parent = this;
    }

    label(): string {
        return vscode.workspace.asRelativePath(this.locsFile);
    }

    async scan(
        progress: vscode.Progress<{ message?: string; increment?: number }>,
        token: vscode.CancellationToken,
    ): Promise<Set<string>> {
        // Read the locsFile file
        progress.report({
            message: "Scanning locs file",
            increment: 0
        });

        // Parse the locs file
        const { ast } = await this.project.parse(this.locsFile, token, {
            forceReparse: true,
            disableRefresh: true,
        });

        // Parse the locs file
        this.locsTrav.files.clear();
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

        this.locsTrav.token = undefined;

        // Annotate all the files at once
        progress.report({
            message: 'Refreshing project annotations',
            increment: 0
        });

        // Force reparse of locs
        this.project.refreshAnalysis();
        await this.project.parse(this.locsFile, token, {
            forceReparse: true
        });

        return new Set(this.locsTrav.files.values());
    }
}


export class EntireWorkspaceScanner implements WorkspaceFileScanner {
    project: FppProjectManager;

    constructor(project: FppProjectManager) {
        this.project = project;
    }

    label(): string {
        return "Workspace";
    }

    async scan(progress: vscode.Progress<{ message?: string; increment?: number; }>, token: vscode.CancellationToken): Promise<Set<string>> {
        // Glob the entire workspace
        progress.report({
            message: "Scanning for .fpp files in workspace",
            increment: 0
        });

        const allFppFiles = await vscode.workspace.findFiles("**/*.fpp", null, Infinity, token);

        // Wait for all files to finish parsing
        for (const uri of allFppFiles) {
            try {
                progress.report({
                    message: uri.path,
                    increment: 100 / allFppFiles.length
                });

                await this.project.parse(uri, token, {
                    disableRefresh: true,
                });
            } catch { }
        }

        // Annotate all the files at once
        progress.report({
            message: 'Refreshing project annotations',
            increment: 0
        });

        // Refresh project annotations
        this.project.refreshAnalysis();

        return new Set(allFppFiles.map(v => v.path));
    }
}