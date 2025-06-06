import * as vscode from 'vscode';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

	private codeLenses: vscode.CodeLens[] = [];
	private regex: RegExp;
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor() {
		this.regex = /(.+)/g;

		vscode.workspace.onDidChangeConfiguration((_) => {
			this._onDidChangeCodeLenses.fire();
		});
	}

	public provideCodeLenses(document: vscode.TextDocument, _token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {

		if (vscode.workspace.getConfiguration("fpp").get("enableCodeLens", true)) {
			const lenses: vscode.CodeLens[] = [];

            // This regex matches the word "connections" as a whole word, followed by one or more spaces,
            // then captures the next word (the group name) in a capture group.
            // Example match: "connections Downlink" will capture "Downlink" as match[1].
            // It does NOT require a "{" after the group name, so it works even if "{" is on the next line.
            const regex = /^\s*connections\s+(\w+)\s*(?:\{)?/gm;
            const text = document.getText();
            let match;

            while ((match = regex.exec(text))) {
                const line = document.positionAt(match.index).line;
                const position = new vscode.Position(line, 0);
                const range = new vscode.Range(position, position);
                const elemName = match[1];
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this connection group',
                    command: 'fpp.visualizeConnectionGroup',
                    arguments: [elemName]
                });
                lenses.push(lens);
            }

            return lenses;
		}
		return [];
	}

    // Called right before CodeLens is rendered for the user.
	public resolveCodeLens(codeLens: vscode.CodeLens, _token: vscode.CancellationToken) {
		if (vscode.workspace.getConfiguration("fpp").get("enableCodeLens", true)) {
            // Usually for registering commands, in our case,
            // commands have been registered.
			return codeLens;
		}
		return null;
	}
}
