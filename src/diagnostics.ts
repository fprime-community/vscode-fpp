import * as vscode from 'vscode';

import * as Fpp from './parser/ast';


type MessageSeverity = "info" | "warning" | "error";
export interface AstMessage {
    severity: MessageSeverity;
    location: Fpp.Location;
    message: string;
}

export class DiangosicManager implements vscode.Disposable {
    private diagnostics: vscode.DiagnosticCollection;
    private pendingDiagnostics = new Map<string, vscode.Diagnostic[]>();

    constructor() {
        this.diagnostics = vscode.languages.createDiagnosticCollection("fpp");
    }

    flush(grammarSource: string) {
        this.diagnostics.set(vscode.Uri.file(grammarSource), undefined);
        for (const [uri, diags] of this.pendingDiagnostics) {
            this.diagnostics.set(vscode.Uri.file(uri), diags);
        }
        this.pendingDiagnostics.clear();
    }

    static asRange(location: Fpp.Location): vscode.Range {
        const start = new vscode.Position(location.start.line, location.start.column);
        const end = new vscode.Position(location.end.line, location.end.column);
        return new vscode.Range(start, end);
    }

    static asLocation(location: Fpp.Location): vscode.Location {
        return new vscode.Location(vscode.Uri.file(location.source), DiangosicManager.asRange(location));
    }

    static getQualifiedRange(qualified: Fpp.QualifiedIdentifier) {
        // The last token should always be non-implicit
        const last = DiangosicManager.asRange(qualified[qualified.length - 1].location);

        // Get the first non-implicit token
        for (const tok of qualified) {
            if (tok.location.start.line !== -1) {
                return DiangosicManager.asRange(tok.location).union(last);
            }
        }

        return last;
    }

    static flat(qual: Fpp.QualifiedIdentifier, f?: Fpp.Identifier): string {
        return (f ? qual.concat(f) : qual).map(q => q ? q.value : "").join(".");
    }

    clear(source: string) {
        this.pendingDiagnostics.delete(source);
        this.diagnostics.delete(vscode.Uri.file(source));
    }

    dispose() {
        this.pendingDiagnostics.clear();
        this.diagnostics.dispose();
    }

    emit(uri: vscode.Uri, diagnostic: vscode.Diagnostic) {
        diagnostic.source = "fpp";

        if (!this.pendingDiagnostics.has(uri.path)) {
            this.pendingDiagnostics.set(uri.path, [diagnostic]);
        } else {
            this.pendingDiagnostics.get(uri.path)!.push(diagnostic);
        }
    }
}
