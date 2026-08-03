import * as vscode from 'vscode';

const names = {
    locsSearch: "fpp.locsSearch",
    locsExclude: "fpp.locsExclude",
    serverPath: "fpp.serverPath",
    lspServerRunLogLevel: "fpp.lspServerRunLogLevel",
    lspServerDevLogLevel: "fpp.lspServerDevLogLevel"
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

export function serverPath(): string | null {
    return vscode.workspace.getConfiguration().get<string | null>(names.serverPath) ?? null;
}

export function onLspServerPathChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(names.serverPath)) {
            callback();
        }
    });
}

type LogLevel = (
    "debug" |
    "info" |
    "warn" |
    "error" |
    "off"
)

export function lspServerRunLogLevel(): LogLevel {
    return vscode.workspace.getConfiguration().get<LogLevel>(names.lspServerRunLogLevel) ?? "error";
}

export function lspServerDevLogLevel(): LogLevel {
    return vscode.workspace.getConfiguration().get<LogLevel>(names.lspServerDevLogLevel) ?? "info";
}

export function onLspServerLogLevelChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(names.lspServerRunLogLevel)
            || e.affectsConfiguration(names.lspServerDevLogLevel)
        ) {
            callback();
        }
    });
}
