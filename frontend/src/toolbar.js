// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            padding: '12px 24px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}>
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='transform' label='Transform' />
            <DraggableNode type='filter' label='Filter' />
            <DraggableNode type='merge' label='Merge' />
            <DraggableNode type='webhook' label='Webhook' />
            <DraggableNode type='log' label='Log' />
        </div>
    );
};
