/**
 * FIGMA SPEC -- Dropdown
 * Source: DS decisions (STATE.md) + dropdown.mdx specs
 *
 * Double-layer container pattern matching dialog DS
 * Items: 10px 16px padding (using 8px 12px per MDX)
 * Trigger: r12 0.5px border, p12-16
 * Menu: r12 0.5px border, shadow 0 4px 12px rgba(0,0,0,0.08)
 * Font: Ubuntu Sans, 14px items, 16px trigger
 */

interface DSDropdownProps {
  state?: 'default' | 'active';
  label?: string;
}

const menuItems = ['Editar', 'Duplicar', 'Archivar'];

export function DSDropdown({
  state = 'active',
  label = 'Opciones',
}: DSDropdownProps) {
  const triggerStyle: React.CSSProperties = {
    borderRadius: '12px',
    border: '0.5px solid var(--preview-border)',
    backgroundColor: 'var(--preview-surface)',
    padding: '12px 16px',
    fontSize: '16px',
    fontFamily: 'var(--font-ubuntu-sans), sans-serif',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '100%',
  };

  const menuStyle: React.CSSProperties = {
    marginTop: '4px',
    borderRadius: '12px',
    border: '0.5px solid var(--preview-border)',
    backgroundColor: 'var(--preview-surface)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  };

  return (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <div style={triggerStyle}>
        <span>{label}</span>
        <svg
          style={{
            width: '16px',
            height: '16px',
            flexShrink: 0,
            transform: state === 'active' ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease',
          }}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {state === 'active' && (
        <div style={menuStyle}>
          {menuItems.map((item, i) => (
            <div
              key={item}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontFamily: 'var(--font-ubuntu-sans), sans-serif',
                color: 'inherit',
                cursor: 'pointer',
                backgroundColor: i === 1 ? 'var(--preview-muted-bg)' : 'transparent',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
