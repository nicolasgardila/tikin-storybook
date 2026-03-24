/**
 * FIGMA SPECS — Chip
 * ===================
 * Pill-shaped interactive tags for filters, multi-select, categories.
 *
 * SHAPE: border-radius 44px (pill), border 0.5px
 * FONT: Ubuntu Sans Mono, weight 500, uppercase
 *
 * SIZES:
 *   sm: height 28px, padding 0 10px, fontSize 11px
 *   md: height 32px, padding 0 12px, fontSize 13px
 *   lg: height 36px, padding 0 14px, fontSize 14px
 *
 * VARIANTS:
 *   default:  bg transparent/#FFFFFF, border #DEDEDE, color inherit
 *   active:   bg #0B0B0B, border #0B0B0B, color #FFFFFF
 *   disabled: opacity 0.5, cursor default
 *
 * CLOSE ICON: 10x10 X svg, color rgba(0,0,0,0.35) or rgba(255,255,255,0.6) when active
 */

interface DSChipProps {
  label?: string;
  variant?: 'default' | 'active' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  showClose?: boolean;
}

const sizeConfig: Record<string, { height: string; padding: string; fontSize: string }> = {
  sm: { height: '28px', padding: '0 10px', fontSize: '11px' },
  md: { height: '32px', padding: '0 12px', fontSize: '13px' },
  lg: { height: '36px', padding: '0 14px', fontSize: '14px' },
};

export function DSChip({
  label = 'Etiqueta',
  variant = 'default',
  size = 'md',
  showClose = false,
}: DSChipProps) {
  const s = sizeConfig[size] || sizeConfig.md;
  const isActive = variant === 'active';
  const isDisabled = variant === 'disabled';

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: showClose ? '6px' : undefined,
    height: s.height,
    padding: s.padding,
    lineHeight: 1,
    boxSizing: 'border-box' as const,
    borderRadius: '44px',
    border: isActive ? '0.5px solid var(--preview-brand, #0B0B0B)' : '0.5px solid var(--preview-border, #DEDEDE)',
    backgroundColor: isActive ? 'var(--preview-brand, #0B0B0B)' : 'var(--preview-surface, #FFFFFF)',
    color: isActive ? 'var(--preview-brand-on, #FFFFFF)' : 'inherit',
    fontSize: s.fontSize,
    fontWeight: 500,
    fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
    textTransform: 'uppercase',
    cursor: isDisabled ? 'default' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  };

  const closeColor = isActive ? 'rgba(255,255,255,0.6)' : 'color-mix(in srgb, currentColor 35%, transparent)';

  return (
    <span className={!isDisabled ? 'ds-pressable' : undefined} style={chipStyle}>
      {label}
      {showClose && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            color: closeColor,
            marginLeft: '-2px',
            marginRight: '-2px',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </span>
      )}
    </span>
  );
}
