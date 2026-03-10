// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const FilterNode = ({ id, data, selected }) => {
    const [condition, setCondition] = useState(data?.condition || '');

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} data={data} title="Filter" handles={handles} selected={selected}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Condition</span>
                <input
                    id={`${id}-condition`}
                    name="node-condition"
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        fontSize: '13px'
                    }}
                    placeholder="e.g. x > 10"
                />
            </div>
        </BaseNode>
    );
}
