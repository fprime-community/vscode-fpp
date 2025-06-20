import * as vscode from 'vscode';
import { RangeAssociation } from './associator';

import * as Fpp from './parser/ast';
import { FppProject } from './project';
import { FppAnnotator } from './annotator';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

	private codeLenses: vscode.CodeLens[] = [];
	private regex: RegExp;
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor(readonly fppProject: FppProject) {
		this.regex = /(.+)/g;

		vscode.workspace.onDidChangeConfiguration((_) => {
			this._onDidChangeCodeLenses.fire();
		});
	}

	public async provideCodeLenses(document: vscode.TextDocument, _token: vscode.CancellationToken): Promise<vscode.CodeLens[]> {

		if (vscode.workspace.getConfiguration("fpp").get("enableCodeLens", true)) {
			const lenses: vscode.CodeLens[] = [];

            // This regex matches the word "connections" as a whole word, followed by one or more spaces,
            // then captures the next word (the group name) in a capture group.
            // Example match: "connections Downlink" will capture "Downlink" as match[1].
            // It does NOT require a "{" after the group name, so it works even if "{" is on the next line.
            const regex = /\bconnections\s+(\w+)\s*(?:\{)?/gm;
            const text = document.getText();
            let match;

            while ((match = regex.exec(text))) {                
                const elemName = match[1];
                const offsetInMatch = match[0].indexOf(elemName);
                const offsetInDoc = match.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the module.
                let association: RangeAssociation<Fpp.Decl> | undefined;
                
                // Check if this definition exists
                const declAssociation = this.fppProject.decl.translationUnitDeclarations.get(document.uri.path)?.getAssociation(position);
                if (declAssociation) {
                    const { range, value } = declAssociation;
                    const decl = this.fppProject.decl.get(value[1], value[0]);
                    association = decl ? { range: range, value: decl } : undefined;
                }
                else {
                    // Check if we are hovering over a variable reference
                    association = (await this.fppProject.get(document)).definitions.get(document.uri.path)?.getAssociation(position);
                }
                if (!association) {
                    continue;
                }

                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this connection group',
                    command: 'fpp.visualizeConnectionGroup',
                    arguments: [fullName]
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
