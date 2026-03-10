// inputNode.js

import { useState, useRef } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [fileName, setFileName] = useState(data?.fileName || '');
  const fileInputRef = useRef(null);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <BaseNode id={id} data={data} title="Input" handles={handles} selected={selected}>
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
            value={inputType}
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
            <option value="File">File</option>
          </select>
        </div>

        {inputType === 'File' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Source</span>
            <input
              id={`${id}-file`}
              name="node-file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={triggerFileSelect}
              style={{
                padding: '8px',
                border: '1px dashed var(--border-color)',
                borderRadius: '6px',
                fontSize: '12px',
                background: 'var(--bg-color)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onMouseOut={(e) => e.target.style.borderColor = 'var(--border-color)'}
            >
              <span style={{ fontSize: '16px' }}>📁</span>
              {fileName ? 'Change File' : 'Browse File'}
            </button>
            {fileName && (
              <div style={{
                fontSize: '11px',
                color: 'var(--primary-color)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginTop: '2px',
                padding: '0 4px'
              }}>
                📄 {fileName}
              </div>
            )}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
