import Signatures from "./signatures.json";
import * as vscode from 'vscode';

export interface ISignature {
    signature: string;
    parameters: Record<string, string | string[]>;
    stateMap?: {
        offset: number;
        map: Record<string, number[]>
    } | string[];
}

export const signaturesDefinitions = (
    Signatures as Record<string, ISignature>
);

export function generateSignature(signature: ISignature, activeParameter: string): vscode.SignatureInformation {
    const parameters: vscode.ParameterInformation[] = [];
    let activeParameterIdx: number | undefined = undefined;

    let i = 0;
    for (const [name, desc] of Object.entries(signature.parameters)) {
        let description: string;
        if (typeof desc === "string") {
            description = desc;
        } else {
            description = desc.join("\n");
        }

        if (name === activeParameter) {
            activeParameterIdx = i;
        }

        parameters.push(new vscode.ParameterInformation(name, new vscode.MarkdownString(description)));
        i++;
    }

    if (activeParameterIdx === undefined) {
        // Keywords and symbols are not explicitely
        // defined in the signature file
        // We still include and highlight them in the signature
        parameters.push(new vscode.ParameterInformation(activeParameter));
        activeParameterIdx = parameters.length - 1;
    }

    const out = new vscode.SignatureInformation(signature.signature);
    out.parameters = parameters;
    out.activeParameter = activeParameterIdx;
    return out;
}
