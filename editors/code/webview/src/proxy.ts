import { ActionHandlerRegistry, DiagramServerProxy, SelectCommand } from "sprotty";
import { isActionMessage, SModelRoot } from "sprotty-protocol";
import { ActionNotification, VscodeDiagramServer } from "sprotty-vscode-webview";

const receivedFromServerProperty = '__receivedFromServer';

/**
 * A proxy on the webview side to communicate with the extension host, which
 * fetches the diagram model from the FPP language server (`fpp/diagram`).
 *
 * This class primarily overrides existing methods to insert debug messages and
 * to store the model returned by the layout round-trip.
 */
export class FppWorkerDiagramProxy extends VscodeDiagramServer {
    // initialize() is called by the sprotty framework automatically.
    override initialize(registry: ActionHandlerRegistry) {
        super.initialize(registry);
        registry.register(SelectCommand.KIND, this);
        this.messenger.onNotification(ActionNotification, message => {
            this.messageReceived(message);
        });
    }

    /**
     * Called when a message is received from the remote diagram server.
     */
    override messageReceived(data: any): void {
        const object = typeof (data) === 'string' ? JSON.parse(data) : data;
        if (isActionMessage(object) && object.action) {
            if (!object.clientId || object.clientId === this.clientId) {
                (object.action as any)[receivedFromServerProperty] = true;
                this.logger.log(this, 'receiving', object);
                this.actionDispatcher.dispatch(object.action).then(() => {
                    console.log(`Webview executes action: ${object.action.kind}`);
                    const root: SModelRoot = (object.action as any).newRoot as SModelRoot;
                    this.storeNewModel(object.action);
                });
            }
        } else {
            this.logger.error(this, 'received data is not an action message', object);
        }
    }
}
