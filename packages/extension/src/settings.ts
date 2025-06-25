import * as vscode from 'vscode';

const names = {
    locsSearch: "fpp.locsSearch",
    locsExclude: "fpp.locsExclude"
};

export function locsSearch(): string[] {
    return vscode.workspace.getConfiguration().get<string[]>(names.locsSearch) ?? [
        "**/build-fprime-automatic-native/locs.fpp",
        "**/build-fprime-*/locs.fpp"
    ];
}

export function excludeLocs(): string | null {
    return vscode.workspace.getConfiguration().get<string | null>(names.locsExclude) ?? null;
}

export function onLocsSearchChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(names.locsSearch)
            || e.affectsConfiguration(names.locsExclude)
        ) {
            callback();
        }
    });
}
