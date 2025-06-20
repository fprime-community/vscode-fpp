import * as vscode from 'vscode';

import { FppProjectManager } from './manager';
import { EntireWorkspaceScanner, LocsFileScanner, WorkspaceFileScanner } from './workspace';
import { symLinkCache } from './annotator';

export class FppProject extends FppProjectManager implements vscode.Disposable {
    private files = new Set<string>();
    private workspace?: WorkspaceFileScanner;

    private projectSelect: vscode.LanguageStatusItem;
    private locsReload: vscode.LanguageStatusItem;

    private loadingProject: boolean = false;

    constructor(selector: vscode.DocumentSelector) {
        super(selector);

        this.projectSelect = vscode.languages.createLanguageStatusItem(
            'fpp.project',
            this.documentSelector
        );
        this.projectSelect.name = "FPP Project Status";

        this.locsReload = vscode.languages.createLanguageStatusItem(
            'fpp.locsReload',
            this.documentSelector
        );

        this.refreshLanguageStatus();
    }

    private refreshLanguageStatus() {
        if (!this.workspace) {
            this.projectSelect.text = "No `locs.fpp` file or workspace loaded";
            this.projectSelect.command = { title: "Select", command: "fpp.select" };
            this.projectSelect.severity = vscode.LanguageStatusSeverity.Warning;

            // Don't show this language item right now
            this.locsReload.selector = { scheme: 'INVALID', language: 'INVALID' };

            this.locsReload.command = undefined;
            this.locsReload.detail = undefined;
            this.locsReload.text = "";
        } else {
            this.projectSelect.text = "FPP Project Loaded";
            this.projectSelect.command = { title: "Select", command: "fpp.select" };
            this.projectSelect.severity = vscode.LanguageStatusSeverity.Information;

            this.locsReload.selector = this.documentSelector;
            this.locsReload.command = { title: "Reload", command: "fpp.reload" };
            this.locsReload.detail = "Reload FPP Project";
            this.locsReload.text = this.workspace.label();
        }
    }

    // Tracks which files should be tracked by the decl collector
    inProject(path: string): boolean {
        const isInProject = this.loadingProject || this.files.has(path);
        if (!isInProject) {
            const parentFiles = this.parentFiles.get(path);
            if (parentFiles) {
                for (const parentFile of parentFiles) {
                    if (this.files.has(parentFile)) {
                        return true;
                    }
                }
            }

            return false;
        }

        return isInProject;
    }

    private async scan(progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken) {
        this.clearAll();
        symLinkCache.clear();
        this.loadingProject = true;

        this.files = await this.workspace?.scan(progress, token) ?? new Set();

        this.loadingProject = false;
    }

    [Symbol.iterator](): Iterator<string> {
        return this.files.keys();
    }

    async reload() {
        this.refreshLanguageStatus();
        if (!this.workspace) {
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
            vscode.window.showErrorMessage(`Failed to load workspace: ${e}`);
            this.projectSelect.text = "FPP workspace load failed";
            this.projectSelect.severity = vscode.LanguageStatusSeverity.Error;
        } finally {
            this.locsReload.busy = false;
        }
    }

    async index() {
        this.projectSelect.busy = true;

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Indexing FPP Project",
                cancellable: true
            }, this.scan.bind(this));
        } catch (e) {
            console.error(e);
            vscode.window.showErrorMessage(`Failed to load workspace: ${e}`);
            this.projectSelect.text = "FPP workspace load failed";
            this.projectSelect.severity = vscode.LanguageStatusSeverity.Error;
        } finally {
            this.projectSelect.busy = false;
        }
    }

    async locsFile(locsFile: vscode.Uri | undefined) {
        if (!locsFile) {
            this.workspace = undefined;
            this.clearAll();
            this.refreshLanguageStatus();
        } else {
            this.workspace = new LocsFileScanner(this, locsFile);
            this.refreshLanguageStatus();
            await this.index();
        }
    }

    async workspaceScan() {
        this.workspace = new EntireWorkspaceScanner(this);
        this.refreshLanguageStatus();
        await this.index();
    }

    dispose() {
        super.dispose();
        this.files.clear();
        this.projectSelect.dispose();
        this.locsReload.dispose();
    }
}
