import { ActionHandlerRegistry, DiagramServerProxy, SelectCommand } from "sprotty";
import { Action, ActionMessage, ComputedBoundsAction, isActionMessage, SetModelAction, SModelRoot, UpdateModelAction } from "sprotty-protocol";
import { ActionNotification, VscodeDiagramServer } from "sprotty-vscode-webview";

const receivedFromServerProperty = '__receivedFromServer';

/**
 * A proxy on the webview side to communicate with the extension's worker parsing FPP files.
 * 
 * This class primarily overrides existing methods to insert debug messages.
 */
export class FppWorkerDiagramProxy extends VscodeDiagramServer {
    // initialize() is called by the sprotty framework automatically.
    override initialize(registry: ActionHandlerRegistry) {
        console.log("Inside FppWorkerDiagramProxy.initialize!!!");
        super.initialize(registry);
        registry.register(SelectCommand.KIND, this);
        this.messenger.onNotification(ActionNotification, message => {
            if (isActionMessage(message) && message.action) {
                console.log(`Webview received action: ${message.action.kind}`);
            }
            this.messageReceived(message);
        });
    }

    /**
     * Called when a message is received from the remote diagram server.
     */
    override messageReceived(data: any): void {
        const object = typeof(data) === 'string' ? JSON.parse(data) : data;
        if (isActionMessage(object) && object.action) {
            if (!object.clientId || object.clientId === this.clientId) {
                (object.action as any)[receivedFromServerProperty] = true;
                this.logger.log(this, 'receiving', object);
                console.log(`this.actionDispatcher: ${this.actionDispatcher}`);
                this.actionDispatcher.dispatch(object.action).then(() => {
                    console.log("Mirco-layout should have finished.");
                    console.log(`action: ${object.action.kind}`);
                    const root: SModelRoot = (object.action as any).newRoot as SModelRoot;
                    this.storeNewModel(object.action);
                });
            }
        } else {
            this.logger.error(this, 'received data is not an action message', object);
        }
    }
}