// mergeNode.js

import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const MergeNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input1', style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: 'input2', style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} data={data} title="Merge" handles={handles} selected={selected}>
            <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                Combines two input streams into a single unified output.
            </div>
        </BaseNode>
    );
}
