// llmNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'Claude-3-Sonnet');
  const [prompt, setPrompt] = useState(data?.prompt || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode id={id} data={data} title="LLM" handles={handles} selected={selected}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Model</span>
          <select
            id={`${id}-model`}
            name="node-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13px',
              background: 'white'
            }}
          >
            <option value="Claude-3-Sonnet">Claude 3 Sonnet</option>
            <option value="Claude-3-Opus">Claude 3 Opus</option>
            <option value="Gemini-1.5-Pro">Gemini 1.5 Pro</option>
            <option value="Gemini-1.5-Flash">Gemini 1.5 Flash</option>
            <option value="GPT-4o">GPT-4o</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Prompt</span>
          <textarea
            id={`${id}-prompt`}
            name="node-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Provide prompt text to run the model"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13px',
              minHeight: '60px',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
}
