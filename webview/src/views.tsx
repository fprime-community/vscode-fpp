/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { inject, injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { EdgeRouterRegistry, IView, IViewArgs, PolylineEdgeView, RenderingContext, SEdgeImpl, SGraphImpl, SGraphView, SLabelImpl, SLabelView, SNodeImpl, SPortImpl } from 'sprotty';
import { Point, SEdge, Selectable } from 'sprotty-protocol';
import { ComponentSNode, PortSNode } from './models';

@injectable()
export class FppGraphView implements IView {
    @inject(EdgeRouterRegistry) edgeRouterRegistry!: EdgeRouterRegistry;

    render(model: Readonly<SGraphImpl>, context: RenderingContext): VNode {
        const edgeRouting = this.edgeRouterRegistry.routeAllChildren(model);
        const transform = `scale(${model.zoom}) translate(${-model.scroll.x},${-model.scroll.y})`;
        return <svg class-sprotty-graph={true}>
            <defs>
                {/* A marker to be used as an arrowhead */}
                <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
                class-sprotty-edge-arrow={true}
                >
                <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>

            <g transform={transform}>
                {context.renderChildren(model, { edgeRouting })}
            </g>
        </svg>;
    }
}

@injectable()
export class ComponentNodeView implements IView {
    render(node: Readonly<SNodeImpl & ComponentSNode & Selectable>, context: RenderingContext): VNode {
        return <g>
            <rect class-sprotty-node={true} class-task={true}
                class-selected={node.selected}
                class-component-active={node.kind === 'active'}
                class-component-queued={node.kind === 'queued'}
                class-component-passive={node.kind === 'passive'}
                width={node.size.width}
                height={node.size.height}
                rx={10} // Rounded corner
            >
            </rect>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class TrianglePortView implements IView {
    render(node: Readonly<SNodeImpl & PortSNode>, context: RenderingContext): VNode {
        const triangle = `0,0 ${node.size.width},${node.size.height / 2} 0,${node.size.height}`;
        return <g>
            <polygon
                points={triangle}
                class-sprotty-port={true}
                class-port-sync={node.kind === 'sync'}
                class-port-async={node.kind === 'async'}
                class-port-guarded={node.kind === 'guarded'}
            />
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class RectanglePortView implements IView {
    render(node: Readonly<SNodeImpl & PortSNode>, context: RenderingContext): VNode {
        return <g>
            <rect 
                width={node.size.width} 
                height={node.size.height} 
                class-sprotty-port={true}
                class-port-sync={node.kind === 'sync'}
                class-port-async={node.kind === 'async'}
                class-port-guarded={node.kind === 'guarded'}
            />
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class RightAlignedLabelView extends SLabelView {
    override render(label: Readonly<SLabelImpl>, context: RenderingContext): VNode | undefined {
        const text = super.render(label, context);
        if (text instanceof SVGTextElement) {
            text.setAttribute('text-anchor', 'end');
            text.setAttribute('x', `${label.bounds.width}`); // Align to right edge
        }
        return text;
    }
}

@injectable()
export class ArrowEdgeView extends PolylineEdgeView {
    override renderLine(edge: SEdgeImpl, segments: Point[], context: RenderingContext, args?: IViewArgs): VNode {
        const firstPoint = segments[0];
        let path = `M ${firstPoint.x},${firstPoint.y}`;
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i];
            path += ` L ${p.x},${p.y}`;
        }
        return <path
            d={path}
            marker-end="url(#arrow)"
        />;
    }
}


