import * as lc from "vscode-languageclient";

interface UriRequest {
    uri: lc.URI
}

export const reloadWorkspace = new lc.RequestType0<void, void>("fpp/reloadWorkspace");
export const setLocsWorkspace = new lc.RequestType<UriRequest, void, void>("fpp/setLocsWorkspace");
export const setFullWorkspace = new lc.RequestType0<void, void>("fpp/setFullWorkspace");

export type DumpSyntaxTree = {
    uri: lc.URI
};
export const dumpSyntaxTree = new lc.NotificationType<DumpSyntaxTree>(
    "fpp/dumpSyntaxTree",
);
