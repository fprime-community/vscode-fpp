import { ActionHandlerRegistry, DiagramServerProxy, SelectCommand } from "sprotty";
import { ActionMessage } from "sprotty-protocol";
import { ActionNotification, VscodeDiagramServer } from "sprotty-vscode-webview";

import { HOST_EXTENSION } from 'vscode-messenger-common';

/**
 * A proxy on the webview side to communicate with the extension's worker parsing FPP files.
 */
export class FppWorkerDiagramProxy extends VscodeDiagramServer {
    // initialize() is called by the sprotty framework automatically.
    override initialize(registry: ActionHandlerRegistry) {
        console.log("Inside FppWorkerDiagramProxy.initialize!!!");
        super.initialize(registry);
        registry.register(SelectCommand.KIND, this);
        this.messenger.onNotification(ActionNotification, message => this.messageReceived(message));
    }
}