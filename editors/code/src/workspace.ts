import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';
import * as ext from "./lsp_ext";

export interface WorkspaceFileScanner {
    label(): string;
    scan(client: LanguageClient): Promise<void>;
}

export class LocsFileScanner implements WorkspaceFileScanner {
    constructor(readonly locsFile: vscode.Uri) { }

    label(): string {
        return vscode.workspace.asRelativePath(this.locsFile);
    }

    async scan(
        client: LanguageClient
    ): Promise<void> {
        await client.sendRequest(ext.setLocsWorkspace, { uri: this.locsFile.toString() });
    }
}


export class EntireWorkspaceScanner implements WorkspaceFileScanner {
    constructor() { }

    label(): string {
        return "Workspace";
    }

    async scan(client: LanguageClient): Promise<void> {
        if (!vscode.workspace.workspaceFolders) {
            // No workspace is loaded, cannot load FPP project
            return;
        }

        await client.sendRequest(ext.setFullWorkspace);
    }
}
