// logNode.js

import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const LogNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} data={data} title="Log" handles={handles} selected={selected}>
            <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                This node logs the incoming data stream to the system console.
            </div>
        </BaseNode>
    );
}
