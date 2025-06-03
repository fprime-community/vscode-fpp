/********************************************************************************
 * Copyright (c) 2020 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import 'reflect-metadata';
import 'sprotty-vscode-webview/css/sprotty-vscode.css';

import { Container } from 'inversify';
import { configureModelElement, DiagramServerProxy, KeyTool, TYPES } from 'sprotty';
import { DiagramIdentifierNotification, SprottyDiagramIdentifier, VscodeDiagramServer, VscodeDiagramWidget, VscodeDiagramWidgetFactory, WebviewReadyNotification } from 'sprotty-vscode-webview';
import { SprottyStarter } from 'sprotty-vscode-webview/lib';
import { createFppContainer } from './di.config';
import { HOST_EXTENSION } from 'vscode-messenger-common';
import { VsCodeApi, VsCodeMessenger } from 'sprotty-vscode-webview/lib/services';

export class FppSprottyStarter extends SprottyStarter {

    protected override createContainer(diagramIdentifier: SprottyDiagramIdentifier) {
        return createFppContainer(diagramIdentifier.clientId);
    }

    protected override sendReadyMessage(): void {
        console.log("Sprotty Webview ready!");
        this.messenger.sendNotification(WebviewReadyNotification, HOST_EXTENSION, { readyMessage: 'Sprotty Webview ready' });
    }

    protected override acceptDiagramIdentifier(): void {
        console.log('Waiting for diagram identifier!');
        this.messenger.onNotification(DiagramIdentifierNotification, newIdentifier => {
            if (this.container) {
                const oldIdentifier = this.container.get<SprottyDiagramIdentifier>(SprottyDiagramIdentifier);
                oldIdentifier.diagramType = newIdentifier.diagramType;
                oldIdentifier.uri = newIdentifier.uri;
                const diagramWidget = this.container.get(VscodeDiagramWidget);
                diagramWidget.requestModel();
            } else {
                console.log('...received!', newIdentifier);
                this.container = this.createContainer(newIdentifier);
                this.addVscodeBindings(this.container, newIdentifier);
                console.log('Binded added!');
                this.container.get(VscodeDiagramWidget);
                console.log('VscodeDiagramWidget received!');
            }
        });
    }

    protected override addVscodeBindings(container: Container, diagramIdentifier: SprottyDiagramIdentifier): void {
        container.bind(VsCodeApi).toConstantValue(this.vscodeApi);
        container.bind(VsCodeMessenger).toConstantValue(this.messenger);
        container.bind(VscodeDiagramWidget).toSelf().inSingletonScope();
        container.bind(VscodeDiagramWidgetFactory).toFactory(context => {
            return () => context.container.get<VscodeDiagramWidget>(VscodeDiagramWidget);
        });
        container.bind(SprottyDiagramIdentifier).toConstantValue(diagramIdentifier);
        container.bind(VscodeDiagramServer).toSelf().inSingletonScope();
        // container.bind(TYPES.ModelSource).toService(VscodeDiagramServer);    // FIXME: This line is problematic when LocalModelSource is bound!
        container.bind(DiagramServerProxy).toService(VscodeDiagramServer);
        // container.rebind(KeyTool).to(DisabledKeyTool);                       // FIXME: DisabledKeyTool cannot be found for some reason.
    }
}

new FppSprottyStarter().start();
