/**
 * FIGMA SPEC -- Badge
 * Source: DS decisions (STATE.md) + badge.mdx specs
 *
 * VARIANTS: count, dot
 *
 * COUNT BADGE:
 *   min-width: 16px, height: 16px, r8
 *   font: Ubuntu Sans Mono 500 10px
 *   bg: #0B0B0B (brand), color: #FFFFFF (brand-on)
 *   padding: 0 4px
 *   border on icon: 1.5px solid surface
 *
 * DOT BADGE:
 *   width: 8px, height: 8px, r50%
 *   bg: brand
 */

interface DSBadgeProps {
  variant?: 'count' | 'dot';
  count?: number;
  max?: number;
  showZero?: boolean;
}

export function DSBadge({
  variant = 'count',
  count = 3,
  max = 99,
  showZero = false,
}: DSBadgeProps) {
  // Bell icon SVG path (Phosphor)
  const bellPath =
    'M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 10-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0048 200h40.81a40 40 0 0078.38 0H208a16 16 0 0013.8-24.06zM128 216a24 24 0 01-22.62-16h45.24A24 24 0 01128 216zm-80-32c7.7-13.24 16-43.92 16-80a64 64 0 11128 0c0 36.05 8.28 66.73 16 80z';

  if (variant === 'dot') {
    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 256 256"
          fill="none"
          style={{ color: 'inherit' }}
        >
          <path d={bellPath} fill="currentColor" />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--preview-brand)',
            border: '2px solid var(--preview-surface)',
            boxShadow: '0 0 0 0.5px var(--preview-brand)',
          }}
        />
      </div>
    );
  }

  // count variant
  const shouldShow = showZero || count > 0;
  if (!shouldShow) {
    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 256 256"
          fill="none"
          style={{ color: 'inherit' }}
        >
          <path d={bellPath} fill="currentColor" />
        </svg>
      </div>
    );
  }

  const display = count > max ? `${max}+` : String(count);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 256 256"
        fill="none"
        style={{ color: 'inherit' }}
      >
        <path d={bellPath} fill="currentColor" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          minWidth: '16px',
          height: '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--preview-brand)',
          color: 'var(--preview-brand-on)',
          fontSize: '10px',
          fontFamily: 'var(--font-ubuntu-sans-mono), monospace',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
          lineHeight: 1,
          border: '1.5px solid var(--preview-surface)',
        }}
      >
        {display}
      </div>
    </div>
  );
}
