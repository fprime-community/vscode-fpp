import * as vscode from 'vscode';

import { EntireWorkspaceScanner, LocsFileScanner, WorkspaceFileScanner } from './workspace';
import { LanguageClient } from 'vscode-languageclient/node';

export class FppProject implements vscode.Disposable {
    private files = new Set<string>();

    private projectSelect: vscode.LanguageStatusItem;
    private locsReload: vscode.LanguageStatusItem;

    private workspace?: WorkspaceFileScanner;

    private loadingProject: boolean = false;

    constructor(public readonly documentSelector: vscode.DocumentSelector) {
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

    private async scan(client: LanguageClient) {
        this.loadingProject = true;
        this.files = await this.workspace?.scan(client) ?? new Set();
        this.loadingProject = false;
    }

    [Symbol.iterator](): Iterator<string> {
        return this.files.keys();
    }

    async reload(client: LanguageClient) {
        this.refreshLanguageStatus();
        if (!this.workspace) {
            return;
        }

        this.locsReload.busy = true;

        try {
            await this.scan(client);
        } catch (e) {
            console.error(e);
            vscode.window.showErrorMessage(`Failed to load workspace: ${e}`);
            this.projectSelect.text = "FPP workspace load failed";
            this.projectSelect.severity = vscode.LanguageStatusSeverity.Error;
        } finally {
            this.locsReload.busy = false;
        }
    }

    async locsFile(client: LanguageClient, locsFile: vscode.Uri | undefined) {
        if (!locsFile) {
            this.workspace = undefined;
            this.refreshLanguageStatus();
        } else {
            this.workspace = new LocsFileScanner(locsFile);
            this.refreshLanguageStatus();
            await this.reload(client);
        }
    }

    async workspaceScan(client: LanguageClient) {
        this.workspace = new EntireWorkspaceScanner();
        await this.reload(client);
    }

    dispose() {
        this.files.clear();
        this.projectSelect.dispose();
        this.locsReload.dispose();
    }
}
