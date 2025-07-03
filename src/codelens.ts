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

            const text = document.getText();
            const lenses: vscode.CodeLens[] = [];

            // This regex matches the word "connections" as a whole word, followed by one or more spaces,
            // then captures the next word (the group name) in a capture group.
            // - \bconnections: matches the word "connections" as a whole word
            // - \s+: matches one or more whitespace characters after "connections"
            // - (\w+): captures the group name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the group name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "connections Downlink" will capture "Downlink" as match[1].
            const regexConnGroups = /\bconnections\s+(\w+)\s*(?:\{)?/gm;

            // This regex matches component declarations like "active component", "passive component", or "queued component",
            // followed by the component name, and optionally a "{" character.
            // - \b: matches a word boundary to ensure matching at the start of a word
            // - (?:active|passive|queued): non-capturing group that matches "active", "passive", or "queued"
            // - \s+: matches one or more whitespace characters after the type
            // - component: matches the literal word "component"
            // - \s+: matches one or more whitespace characters after "component"
            // - (\w+): captures the component name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the component name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "active component MyComponent {" will capture "MyComponent" as match[1]
            const regexComponent = /\b(?:active|passive|queued)\s+component\s+(\w+)\s*(?:\{)?/gm;

            // This regex matches topology declarations like "topology MyTopology {", capturing the topology name.
            // - \b: matches a word boundary to ensure matching at the start of a word
            // - topology: matches the literal word "topology"
            // - \s+: matches one or more whitespace characters after "topology"
            // - (\w+): captures the topology name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the topology name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "topology MyTopology {" will capture "MyTopology" as match[1]
            const regexTopology = /\btopology\s+(\w+)\s*(?:\{)?/gm;

            let matchConnGroups: RegExpExecArray | null;
            let matchComponents: RegExpExecArray | null;
            let matchTopology: RegExpExecArray | null;

            while ((matchConnGroups = regexConnGroups.exec(text))) {
                const elemName = matchConnGroups[1];
                const offsetInMatch = matchConnGroups[0].indexOf(elemName);
                const offsetInDoc = matchConnGroups.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this connection group',
                    command: 'fpp.displayConnectionGroup',
                    arguments: [fullName]
                });
                lenses.push(lens);
            }

            while ((matchComponents = regexComponent.exec(text))) {
                const elemName = matchComponents[1];
                const offsetInMatch = matchComponents[0].indexOf(elemName);
                const offsetInDoc = matchComponents.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this component',
                    command: 'fpp.displayComponent',
                    arguments: [fullName]
                });
                lenses.push(lens);
            }

            while ((matchTopology = regexTopology.exec(text))) {
                const elemName = matchTopology[1];
                const offsetInMatch = matchTopology[0].indexOf(elemName);
                const offsetInDoc = matchTopology.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this topology',
                    command: 'fpp.displayTopology',
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

    private async getAssociation(document: vscode.TextDocument, position: vscode.Position): Promise<RangeAssociation<Fpp.Decl> | undefined> {
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
        return association;
    }
}
