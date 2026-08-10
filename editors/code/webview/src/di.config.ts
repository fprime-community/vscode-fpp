import 'sprotty/css/sprotty.css';
import '../css/diagram.css';

import { Container, ContainerModule } from 'inversify';
import { boundsFeature, configureModelElement, configureViewerOptions, editFeature, layoutableChildFeature, loadDefaultModules, moveFeature, overrideViewerOptions, SEdgeImpl, SGraphImpl, SGraphView, SLabelImpl, SLabelView, SNodeImpl, SPortImpl, SRoutingHandleImpl, SRoutingHandleView } from 'sprotty';
import { ArrowEdgeView, ChoiceNodeView, ComponentNodeView, InitialNodeView, MultiLineLabelView, RectanglePortView, StateNodeView } from './views';

const myModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraphImpl, SGraphView);

    // Component / topology (port-based) diagrams.
    configureModelElement(context, 'node:component', SNodeImpl, ComponentNodeView, { enable: [layoutableChildFeature], disable: [moveFeature] });
    configureModelElement(context, 'label:node:component', SLabelImpl, SLabelView);
    configureModelElement(context, 'port', SPortImpl, RectanglePortView, { disable: [boundsFeature] }); // By default, boundsFeature is enabled for SPort. We want fixed-size ports so this feature needs to be disabled.
    configureModelElement(context, 'label:port', SLabelImpl, SLabelView);
    configureModelElement(context, 'edge', SEdgeImpl, ArrowEdgeView, { disable: [editFeature] });

    // State machine diagrams.
    configureModelElement(context, 'node:state', SNodeImpl, StateNodeView, { enable: [layoutableChildFeature], disable: [moveFeature] });
    configureModelElement(context, 'node:choice', SNodeImpl, ChoiceNodeView, { enable: [layoutableChildFeature], disable: [moveFeature] });
    configureModelElement(context, 'node:initial', SNodeImpl, InitialNodeView, { disable: [moveFeature] });
    configureModelElement(context, 'label:node:state', SLabelImpl, MultiLineLabelView);
    configureModelElement(context, 'edge:transition', SEdgeImpl, ArrowEdgeView, { disable: [editFeature] });
    configureModelElement(context, 'label:transition', SLabelImpl, MultiLineLabelView);

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
