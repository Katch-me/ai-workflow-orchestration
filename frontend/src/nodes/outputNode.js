// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode id={id} data={data} title="Output" handles={handles} selected={selected}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Name</span>
          <input
            id={`${id}-name`}
            name="node-name"
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13px'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Type</span>
          <select
            id={`${id}-type`}
            name="node-type"
            value={outputType}
            onChange={handleTypeChange}
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13px',
              background: 'white'
            }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
}
