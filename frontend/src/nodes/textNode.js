// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 110 });
  const textAreaRef = useRef(null);
  const measurementRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  // Sync with global store
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  // Handle dynamic variables {{ var }}
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = Array.from(currText.matchAll(regex))
      .map(match => match[1].trim())
      .filter(name => name.length > 0);

    setVariables([...new Set(matches)]); // Unique variables
  }, [currText]);

  // Notify React Flow when handles change so it re-registers them
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  // Dynamic resizing logic (Width and Height)
  useEffect(() => {
    if (measurementRef.current) {
      const lines = currText.split('\n');
      const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b, '');

      measurementRef.current.textContent = longestLine || ' ';
      const textWidth = measurementRef.current.offsetWidth + 40;
      const newWidth = Math.min(Math.max(textWidth, 220), 450);

      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        const newHeight = Math.max(textAreaRef.current.scrollHeight + 80, 110);

        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'output' },
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: varName, // Use the variable name as the handle ID for easier mapping
      style: {
        top: `${(index + 1) * 100 / (variables.length + 1)}%`,
        backgroundColor: '#6366f1'
      }
    }))
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      selected={selected}
      style={{ width: dimensions.width }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>Text Content</span>

        {/* Hidden measurement span */}
        <span
          ref={measurementRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            height: '0',
            whiteSpace: 'pre',
            fontSize: '13px',
            fontFamily: 'inherit',
            padding: '0 8px'
          }}
        />

        <textarea
          id={`${id}-text`}
          name="node-text"
          ref={textAreaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '13px',
            resize: 'none',
            overflow: 'hidden',
            minHeight: '40px',
            fontFamily: 'inherit',
            lineHeight: '1.4'
          }}
          placeholder="Type {{var}} for dynamic inputs..."
        />
      </div>
    </BaseNode>
  );
}
