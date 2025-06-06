/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { IView, RenderingContext, SNodeImpl, SPortImpl } from 'sprotty';
import { Selectable } from 'sprotty-protocol';
import { ComponentNode, PortNode } from '../../extension/src/diagram/models';

@injectable()
export class ComponentNodeView implements IView {
    render(node: Readonly<SNodeImpl & ComponentNode & Selectable>, context: RenderingContext): VNode {
        return <g>
            <rect class-sprotty-node={true} class-task={true}
                class-active={node.astNode.kind.value === 'active'}
                class-queued={node.astNode.kind.value === 'queued'}
                class-passive={node.astNode.kind.value === 'passive'}
                class-selected={node.selected}
                width={node.size.width}
                height={node.size.height}
            >
            </rect>
            <text
                x={node.size.width / 2}
                y={node.size.height + 10}
                text-anchor="middle"
                alignment-baseline="hanging"
                class-comp-label={true}
            >
                {node.astNode.name.value}
            </text>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class PortView implements IView {
    render(node: Readonly<SNodeImpl & PortNode>, context: RenderingContext): VNode {
        return <g>
            <polygon
                points="0,0 10,5 0,10"
                class-sprotty-port={true}
            />
            <text
                x={0}
                y={node.size.height / 2}
                text-anchor="left"
                alignment-baseline="hanging"
                class-comp-label={true}
            >
                {node.astNode.name.value}
            </text>
        </g>;
    }
}
