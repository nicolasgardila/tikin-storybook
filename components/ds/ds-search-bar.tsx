/**
 * FIGMA SPEC — Search Bar
 * Source: DS decisions (STATE.md) and search-bar.mdx specs
 *
 * BORDER-RADIUS: 12px (not pill r44)
 * BORDER: 0.5px solid
 * LAYOUT: flex, gap 8px, icon 16px desktop
 * SIZES:
 *   sm: height 32px, fontSize 12px, icon 14px
 *   md: height 40px, fontSize 14px, icon 16px
 *   lg: height 48px, fontSize 16px, icon 18px
 */

interface DSSearchBarProps {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const sizeConfig: Record<string, { height: string; fontSize: string; iconSize: number; padding: string }> = {
  sm: { height: '32px', fontSize: '12px', iconSize: 14, padding: '0 10px' },
  md: { height: '40px', fontSize: '14px', iconSize: 16, padding: '0 12px' },
  lg: { height: '48px', fontSize: '16px', iconSize: 18, padding: '0 14px' },
};

export function DSSearchBar({
  placeholder = 'Buscar...',
  size = 'md',
  disabled = false,
}: DSSearchBarProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '320px',
    height: cfg.height,
    borderRadius: '12px',
    border: '0.5px solid var(--preview-border)',
    backgroundColor: 'var(--preview-surface)',
    padding: cfg.padding,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  return (
    <div style={containerStyle}>
      <svg
        style={{ width: `${cfg.iconSize}px`, height: `${cfg.iconSize}px`, color: 'color-mix(in srgb, currentColor 35%, transparent)', flexShrink: 0 }}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="M11 11l3 3" />
      </svg>
      <span
        style={{
          fontSize: cfg.fontSize,
          fontFamily: 'var(--font-ubuntu-sans), system-ui, sans-serif',
          fontWeight: 400,
          color: 'color-mix(in srgb, currentColor 45%, transparent)',
          flex: 1,
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}
