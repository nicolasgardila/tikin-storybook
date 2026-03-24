/**
 * FIGMA SPEC — Toggle
 * Source: No dedicated HTML file. Specs from DS decisions (STATE.md).
 *
 * SIZES:
 *   md: track 44x24px, thumb 20x20px, inset 2px
 *   sm: track 36x20px, thumb 16x16px, inset 2px
 *
 * BORDER-RADIUS:
 *   track: 12px (half of height)
 *   thumb: 50% (circle)
 *
 * COLORS (light):
 *   off: track #DEDEDE, thumb #FFFFFF
 *   on:  track #0B0B0B (brand), thumb #FFFFFF
 *
 * COLORS (dark):
 *   off: track #333333, thumb #0B0B0B
 *   on:  track #FFFFFF (brand), thumb #0B0B0B
 *
 * THUMB SHADOW: 0 1px 3px rgba(0,0,0,0.15)
 * TRANSITION: left 200ms ease, background-color 200ms ease
 * DISABLED: opacity 0.5, cursor not-allowed
 * LABEL: Ubuntu Sans, 16px (md) / 14px (sm), gap 12px
 */
interface DSToggleProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

export function DSToggle({
  checked = false,
  disabled = false,
  label = '',
  size = 'md',
}: DSToggleProps) {
  const isMd = size === 'md';
  const trackW = isMd ? 44 : 36;
  const trackH = isMd ? 24 : 20;
  const thumbSize = isMd ? 20 : 16;
  const inset = 2;
  const thumbLeft = checked ? trackW - thumbSize - inset : inset;

  const trackStyle: React.CSSProperties = {
    display: 'inline-block',
    width: `${trackW}px`,
    height: `${trackH}px`,
    borderRadius: `${trackH / 2}px`,
    backgroundColor: checked ? 'var(--preview-brand)' : 'var(--preview-border)',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
    transition: 'background-color 200ms ease',
  };

  const thumbStyle: React.CSSProperties = {
    width: `${thumbSize}px`,
    height: `${thumbSize}px`,
    borderRadius: '50%',
    backgroundColor: checked ? 'var(--preview-brand-on, #FFFFFF)' : 'var(--preview-surface)',
    position: 'absolute',
    top: `${inset}px`,
    left: `${thumbLeft}px`,
    transition: 'left 200ms ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
  };

  if (!label) {
    return (
      <div className={!disabled ? 'ds-pressable' : undefined} style={trackStyle}>
        <div style={thumbStyle} />
      </div>
    );
  }

  return (
    <div
      className={!disabled ? 'ds-pressable' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <div style={{ ...trackStyle, opacity: 1 }}>
        <div style={thumbStyle} />
      </div>
      <span
        style={{
          fontSize: isMd ? '16px' : '14px',
          fontFamily: 'var(--font-ubuntu-sans), sans-serif',
          color: 'inherit',
        }}
      >
        {label}
      </span>
    </div>
  );
}
