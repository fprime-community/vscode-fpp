import * as vscode from 'vscode';

const names = {
    locsSearch: "fpp.locsSearch",
    locsExclude: "fpp.locsExclude",
    serverPath: "fpp.serverPath",
    pythonVenv: "fpp.pythonVenv",
    checkForUpdates: "fpp.checkForUpdates",
    lspServerRunLogLevel: "fpp.lspServerRunLogLevel",
    lspServerDevLogLevel: "fpp.lspServerDevLogLevel",
    highlightPhaseBlocks: "fpp.highlightPhaseBlocks"
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

/** Explicit venv root override used when discovering the server executable. */
export function pythonVenv(): string | null {
    return vscode.workspace.getConfiguration().get<string | null>(names.pythonVenv) ?? null;
}

export function onPythonVenvChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(names.pythonVenv)) {
            callback();
        }
    });
}

/**
 * Whether to periodically poll PyPI for a newer `fprime-fpp-lsp` and prompt to
 * update. Defaults to true.
 */
export function checkForUpdates(): boolean {
    return vscode.workspace.getConfiguration().get<boolean>(names.checkForUpdates) ?? true;
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

/**
 * Whether to shade the C++ body of `phase` init specifiers. Defaults to true.
 */
export function highlightPhaseBlocks(): boolean {
    return vscode.workspace.getConfiguration().get<boolean>(names.highlightPhaseBlocks) ?? true;
}

export function onHighlightPhaseBlocksChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(names.highlightPhaseBlocks)) {
            callback();
        }
    });
}
