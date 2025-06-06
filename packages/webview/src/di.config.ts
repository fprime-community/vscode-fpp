import 'sprotty/css/sprotty.css';
import '../css/diagram.css';

import { Container, ContainerModule } from 'inversify';
import { CircularNodeView, configureModelElement, configureViewerOptions, layoutableChildFeature, loadDefaultModules, LocalModelSource, overrideViewerOptions, PolylineEdgeView, RectangularNodeView, SEdgeImpl, SGraphImpl, SGraphView, SNodeImpl, SPortImpl, TYPES } from 'sprotty';
import { ComponentNodeView, PortView } from './views';

const myModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraphImpl, SGraphView, {enable: [layoutableChildFeature]});
    // FIXME: When ELK is integrated, disable layoutableChildFeature.
    configureModelElement(context, 'component', SNodeImpl, ComponentNodeView, {enable: [layoutableChildFeature]});
    configureModelElement(context, 'port', SNodeImpl, PortView, {enable: [layoutableChildFeature]});
    configureModelElement(context, 'edge', SEdgeImpl, PolylineEdgeView);
    configureViewerOptions(context, {
        needsClientLayout: true, // Turn on micro-layout
        needsServerLayout: false,
    });
});

export const createFppContainer = (containerId: string) => {

    const container = new Container();
    loadDefaultModules(container);
    container.load(myModule);
    overrideViewerOptions(container, {
        baseDiv: containerId,
    });

    return container;
};