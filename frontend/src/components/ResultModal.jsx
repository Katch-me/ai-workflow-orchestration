import React from 'react';

const ResultModal = ({ isOpen, onClose, result }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999, // Extremely high z-index
            backdropFilter: 'blur(5px)',
            pointerEvents: 'auto', // Ensure it captures clicks
        }}>
            <div style={{
                background: 'var(--card-bg)',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '440px',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
            }}>
                <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '24px', fontWeight: '800' }}>Pipeline Analysis</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{
                        background: 'var(--bg-color)',
                        padding: '18px',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-color)' }}>{result?.num_nodes || 0}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Nodes</div>
                    </div>
                    <div style={{
                        background: 'var(--bg-color)',
                        padding: '18px',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-color)' }}>{result?.num_edges || 0}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Edges</div>
                    </div>
                </div>

                {(() => {
                    const numNodes = result?.num_nodes || 0;
                    const numEdges = result?.num_edges || 0;
                    const isDag = result?.is_dag;

                    let title = "Valid DAG";
                    let message = "Your pipeline is a Directed Acyclic Graph.";
                    let bgColor = 'rgba(16, 185, 129, 0.08)';
                    let borderColor = '#10b981';
                    let textColor = '#059669';

                    if (numNodes === 1) {
                        title = "Pipeline Incomplete";
                        message = "Add more nodes to create a workflow.";
                        bgColor = 'rgba(99, 102, 241, 0.08)';
                        borderColor = 'var(--primary-color)';
                        textColor = 'var(--primary-color)';
                    } else if (numNodes > 1 && numEdges === 0) {
                        title = "Nodes Disconnected";
                        message = "Pipeline incomplete. Connect nodes to define flow.";
                        bgColor = 'rgba(245, 158, 11, 0.08)';
                        borderColor = '#f59e0b';
                        textColor = '#b45309';
                    } else if (numEdges > 0) {
                        if (!isDag) {
                            title = "Invalid Pipeline";
                            message = "Cycle detected. Pipelines must be acyclic.";
                            bgColor = 'rgba(239, 68, 68, 0.08)';
                            borderColor = '#ef4444';
                            textColor = '#dc2626';
                        }
                    }

                    return (
                        <div style={{
                            padding: '18px',
                            borderRadius: '16px',
                            backgroundColor: bgColor,
                            border: `1.5px solid ${borderColor}`,
                        }}>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: textColor
                            }}>
                                {title}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                {message}
                            </div>
                        </div>
                    );
                })()}

                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Close Result
                </button>
            </div>
        </div>
    );
};

export default ResultModal;
