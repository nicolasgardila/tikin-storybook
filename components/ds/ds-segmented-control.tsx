/**
 * FIGMA SPEC — Segmented Control
 * Source: DS decisions (STATE.md) and segmented-control.mdx specs
 *
 * CONTAINER: r14, p3, warm bg #F1EFEB, border 1px #E8E4DD
 * SEGMENTS: r12, active bg #0B0B0B, active color #FFFFFF
 * FONT: Ubuntu Sans Mono, uppercase, weight 500 active / 400 inactive
 * INACTIVE COLOR: rgba(11,11,11,0.50)
 * SIZES:
 *   sm: fontSize 11px, padding 6px 12px
 *   md: fontSize 13px, padding 8px 16px
 */

interface DSSegmentedControlProps {
  tabs?: string;
  activeTab?: number;
  size?: 'sm' | 'md';
}

const sizeConfig: Record<string, { fontSize: string; padding: string }> = {
  sm: { fontSize: '11px', padding: '6px 12px' },
  md: { fontSize: '13px', padding: '8px 16px' },
};

export function DSSegmentedControl({
  tabs = 'Tab 1, Tab 2, Tab 3',
  activeTab = 0,
  size = 'md',
}: DSSegmentedControlProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const segments = tabs.split(',').map((t) => t.trim()).filter(Boolean);

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--preview-muted-bg, #F1EFEB)',
    borderRadius: '14px',
    padding: '3px',
    border: '1px solid var(--preview-border, #E8E4DD)',
  };

  return (
    <div style={containerStyle}>
      {segments.map((label, i) => {
        const isActive = i === activeTab;
        const segmentStyle: React.CSSProperties = {
          borderRadius: '12px',
          backgroundColor: isActive ? 'var(--preview-brand, #0B0B0B)' : 'transparent',
          padding: cfg.padding,
          fontSize: cfg.fontSize,
          fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
          fontWeight: isActive ? 500 : 400,
          textTransform: 'uppercase',
          color: isActive ? 'var(--preview-brand-on, #FFFFFF)' : 'color-mix(in srgb, currentColor 50%, transparent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        };

        return (
          <button key={i} className={!isActive ? 'ds-pressable' : undefined} style={segmentStyle}>
            {label}
          </button>
        );
      })}
    </div>
  );
}
