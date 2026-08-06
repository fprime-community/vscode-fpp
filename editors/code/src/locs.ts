import * as vscode from 'vscode';

export enum LocsQuickPickType {
    locsOpenDialog,
    locsFile,
    workspaceScan
}

export interface LocsQuickPickOpen extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Default;
    locsKind: LocsQuickPickType.locsOpenDialog;
}

export interface LocsQuickPickWorkspaceScan extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Default;
    locsKind: LocsQuickPickType.workspaceScan;
}

export interface LocsQuickPickFile extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Default;
    locsKind: LocsQuickPickType.locsFile;
    uri: vscode.Uri;
}

export interface LocsQuickPickSeparator extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Separator;
}

export type LocsQuickPickItem = (
    | LocsQuickPickOpen
    | LocsQuickPickWorkspaceScan
    | LocsQuickPickFile
    | LocsQuickPickSeparator
);
