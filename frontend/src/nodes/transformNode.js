// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const TransformNode = ({ id, data, selected }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'Uppercase');

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} data={data} title="Transform" handles={handles} selected={selected}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Transformation</span>
                <select
                    id={`${id}-transform`}
                    name="node-transform"
                    value={transformType}
                    onChange={(e) => setTransformType(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        background: 'white'
                    }}
                >
                    <option value="Uppercase">Uppercase</option>
                    <option value="Lowercase">Lowercase</option>
                    <option value="Trim">Trim</option>
                </select>
            </div>
        </BaseNode>
    );
}
