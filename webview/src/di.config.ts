import 'sprotty/css/sprotty.css';
import '../css/diagram.css';

import { Container, ContainerModule } from 'inversify';
import { configureModelElement, configureViewerOptions, editFeature, layoutableChildFeature, loadDefaultModules, moveFeature, overrideViewerOptions, PolylineEdgeView, SEdgeImpl, SGraphImpl, SGraphView, SLabelImpl, SLabelView, SNodeImpl, SPortImpl, SRoutingHandleImpl, SRoutingHandleView } from 'sprotty';
import { ArrowEdgeView, ComponentNodeView, FppGraphView, RectanglePortView } from './views';

const myModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraphImpl, FppGraphView);
    configureModelElement(context, 'component', SNodeImpl, ComponentNodeView, {enable: [layoutableChildFeature], disable: [moveFeature]});
    configureModelElement(context, 'component-label', SLabelImpl, SLabelView);
    configureModelElement(context, 'port', SPortImpl, RectanglePortView);
    configureModelElement(context, 'port-label', SLabelImpl, SLabelView);
    configureModelElement(context, 'edge', SEdgeImpl, ArrowEdgeView, { disable: [editFeature] });
    configureModelElement(context, 'routing-point', SRoutingHandleImpl, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandleImpl, SRoutingHandleView);
    configureViewerOptions(context, {
        needsClientLayout: false, // Whether client-side micro-layout is needed. We set it to false here because all layout is done by ELK.
        needsServerLayout: true,  // If true, webview sends back ComputedBoundsAction upon RequestBoundsAction.
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