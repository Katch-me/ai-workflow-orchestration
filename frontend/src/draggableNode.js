// draggableNode.js

const DraggableIconMap = {
  customInput: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 10 12 13 9 10"></polyline>
      <line x1="12" y1="3" x2="12" y2="13"></line>
      <path d="M20 4v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4"></path>
    </svg>
  ),
  customOutput: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 14 12 11 15 14"></polyline>
      <line x1="12" y1="21" x2="12" y2="11"></line>
      <path d="M20 20v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1"></path>
    </svg>
  ),
  llm: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
  ),
  text: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '80px',
        padding: '0 14px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '10px',
        backgroundColor: 'var(--card-bg)',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        color: 'var(--text-main)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary-color)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
      draggable
    >
      <div style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center' }}>
        {DraggableIconMap[type] || (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )}
      </div>
      <span style={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
};
