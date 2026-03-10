// webhookNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const WebhookNode = ({ id, data, selected }) => {
    const [url, setUrl] = useState(data?.url || '');

    const handles = [
        { type: 'target', position: Position.Left, id: 'payload' },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    return (
        <BaseNode id={id} data={data} title="Webhook" handles={handles} selected={selected}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Endpoint URL</span>
                <input
                    id={`${id}-url`}
                    name="node-url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        fontSize: '13px'
                    }}
                    placeholder="https://api.example.com"
                />
            </div>
        </BaseNode>
    );
}
