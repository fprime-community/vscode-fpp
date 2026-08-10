/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { IView, IViewArgs, PolylineEdgeView, RenderingContext, SEdgeImpl, SLabelImpl, SLabelView, SNodeImpl, SPortImpl } from 'sprotty';
import { Point, Selectable } from 'sprotty-protocol';
import { ComponentSNode, PortSNode } from '../../common/models';

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
    render(node: Readonly<SPortImpl & PortSNode>, context: RenderingContext): VNode {
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
    render(node: Readonly<SPortImpl & PortSNode>, context: RenderingContext): VNode {
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
    override renderLine(edge: SEdgeImpl & { detail?: string }, segments: Point[], context: RenderingContext, args?: IViewArgs): VNode {
        const firstPoint = segments[0];
        let path = `M ${firstPoint.x},${firstPoint.y}`;
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i];
            path += ` L ${p.x},${p.y}`;
        }
        const detail = edge.detail;
        return <g>
            {detail ? <title>{detail}</title> : null}
            <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
                class-sprotty-edge-arrow={true}
            >
                <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
            <path
                d={path}
                marker-end="url(#arrow)"
            />
        </g>
            ;
    }
}

// --- state machine views ----------------------------------------------------

/**
 * Fill color for a state box at a given nesting depth. Uses a single-hue palette
 * that darkens as nesting deepens, so inner states are visibly darker than the
 * outer state that contains them. Lightness steps down per level and clamps so
 * deeply nested states stay legible.
 */
function stateFill(depth: number): string {
    const HUE = 210;          // blue
    const SATURATION = 45;    // %
    const TOP_LIGHTNESS = 74; // % at depth 0
    const STEP = 11;          // % darker per level
    const MIN_LIGHTNESS = 24;
    const lightness = Math.max(MIN_LIGHTNESS, TOP_LIGHTNESS - depth * STEP);
    return `hsl(${HUE}, ${SATURATION}%, ${lightness}%)`;
}

/** A state: a rounded rectangle with its name (and entry/exit actions). */
@injectable()
export class StateNodeView implements IView {
    render(node: Readonly<SNodeImpl & Selectable & { detail?: string, depth?: number }>, context: RenderingContext): VNode {
        const detail = node.detail;
        const depth = node.depth ?? 0;
        return <g>
            {detail ? <title>{detail}</title> : null}
            <rect class-sprotty-node={true} class-sm-state={true}
                class-selected={node.selected}
                width={node.size.width}
                height={node.size.height}
                rx={8}
                style={{ fill: stateFill(depth) }}
            >
            </rect>
            {context.renderChildren(node)}
        </g>;
    }
}

/** A choice (junction): a diamond. */
@injectable()
export class ChoiceNodeView implements IView {
    render(node: Readonly<SNodeImpl & Selectable>, context: RenderingContext): VNode {
        const w = node.size.width;
        const h = node.size.height;
        const diamond = `${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`;
        return <g>
            <polygon
                points={diamond}
                class-sprotty-node={true}
                class-sm-choice={true}
                class-selected={node.selected}
            />
            {context.renderChildren(node)}
        </g>;
    }
}

/** The initial pseudo-state: a filled circle. */
@injectable()
export class InitialNodeView implements IView {
    render(node: Readonly<SNodeImpl>, context: RenderingContext): VNode {
        const r = Math.min(node.size.width, node.size.height) / 2;
        return <g>
            <circle
                cx={r}
                cy={r}
                r={r}
                class-sm-initial={true}
            />
            {context.renderChildren(node)}
        </g>;
    }
}

/**
 * A label that honours newlines: SVG `<text>` ignores `\n`, so each line is
 * rendered as its own `<tspan>`. Used for state-node labels (name + entry/exit
 * action list) and transition labels (trigger + action list).
 */
@injectable()
export class MultiLineLabelView extends SLabelView {
    override render(label: Readonly<SLabelImpl>, context: RenderingContext): VNode | undefined {
        const text = (label as any).text as string | undefined;
        if (text === undefined) {
            return super.render(label, context);
        }
        const lines = text.split('\n');
        const tspans = lines.map((line, i) =>
            <tspan x={0} dy={i === 0 ? 0 : '1.15em'}>{line}</tspan>
        );
        return <text class-sprotty-label={true}>{tspans}</text>;
    }
}
