import { useState } from 'react';
import { useStore } from './store';
import ResultModal from './components/ResultModal';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiResult, setApiResult] = useState(null);

    const isSubmitDisabled = nodes.length === 0;

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setApiResult(result);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. Is the backend running?');
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid var(--border-color)',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
                position: 'sticky',
                bottom: '0',
                zIndex: 100,
            }}>
                <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={isSubmitDisabled}
                    style={{
                        backgroundColor: isSubmitDisabled ? '#e2e8f0' : 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 40px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isSubmitDisabled ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.2)',
                        opacity: isSubmitDisabled ? 0.6 : 1,
                        letterSpacing: '0.02em'
                    }}
                    onMouseOver={(e) => {
                        if (!isSubmitDisabled) {
                            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.3)';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isSubmitDisabled) {
                            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)';
                        }
                    }}
                >
                    Submit Pipeline
                </button>
            </div>

            <ResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                result={apiResult}
            />
        </>
    );
};
