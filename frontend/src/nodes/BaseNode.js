// BaseNode.js

import { Handle } from 'reactflow';
import { useStore } from '../store';

// Icon components for different node types
const iconMap = {
    customInput: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 10 12 13 9 10"></polyline>
            <line x1="12" y1="3" x2="12" y2="13"></line>
            <path d="M20 4v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4"></path>
        </svg>
    ),
    customOutput: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 14 12 11 15 14"></polyline>
            <line x1="12" y1="21" x2="12" y2="11"></line>
            <path d="M20 20v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1"></path>
        </svg>
    ),
    llm: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
    ),
    text: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    ),
    transform: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
    ),
    filter: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
    ),
    merge: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A3 3 0 1018 2a3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6z"></path>
            <path d="M9 12h2a4 4 0 014 4v2"></path>
            <path d="M9 12h2a4 4 0 004-4V6"></path>
        </svg>
    ),
    webhook: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    ),
    log: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    ),
};

const BaseNode = ({ id, data, title, children, selected, handles = [], style = {}, type = 'logic' }) => {
    const deleteNode = useStore((state) => state.deleteNode);

    return (
        <div style={{
            width: 220,
            minHeight: 110,
            border: '1.5px solid',
            borderColor: selected ? 'var(--primary-color)' : 'var(--border-color)',
            borderRadius: 'var(--radius)',
            background: 'var(--card-bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            boxShadow: selected
                ? 'var(--shadow-glow), var(--shadow-lg)'
                : 'var(--shadow-md)',
            position: 'relative',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: selected ? 1000 : 1,
            ...style
        }}>
            <div style={{
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                padding: '0 12px',
                height: '42px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-color)',
                borderTopLeftRadius: 'calc(var(--radius) - 1px)',
                borderTopRightRadius: 'calc(var(--radius) - 1px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        color: 'var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {iconMap[data?.type] || iconMap[title?.toLowerCase()] || null}
                    </div>
                    <span style={{ color: 'var(--text-main)', letterSpacing: '0.01em' }}>{title}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteNode(id);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'normal',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = '#ef4444';
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = 'none';
                    }}
                    title="Delete Node"
                >
                    &times;
                </button>
            </div>
            <div style={{
                padding: '16px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {children}
            </div>
            {handles.map((handle) => (
                <Handle
                    key={`${id}-${handle.type}-${handle.id}`}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={{
                        ...handle.style
                    }}
                />
            ))}
        </div>
    );
};

export default BaseNode;
