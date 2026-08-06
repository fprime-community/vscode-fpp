import * as lc from "vscode-languageclient";

export const reloadWorkspace = new lc.RequestType0<void, void>("fpp/reloadWorkspace");

export type DumpSyntaxTree = {
    uri: lc.URI
};
export const dumpSyntaxTree = new lc.NotificationType<DumpSyntaxTree>(
    "fpp/dumpSyntaxTree",
);
