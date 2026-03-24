/**
 * FIGMA SPEC — Tooltip
 * Source: DS decisions (STATE.md) and tooltip.mdx specs
 *
 * FONT: 13px, Ubuntu Sans, weight 400
 * MAX-WIDTH: 280px
 * SHADOW: 0px 2px 8px rgba(11,15,16,0.16)
 * BG: #0B0B0B, color #FFFFFF
 * BORDER-RADIUS: 8px
 * PADDING: 8px 12px
 * ARROW: 6px CSS border triangle
 * POSITIONS: top, bottom, left, right
 */

interface DSTooltipProps {
  text?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function DSTooltip({
  text = 'Tooltip content',
  position = 'top',
}: DSTooltipProps) {
  const tooltipBase: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'var(--preview-brand)',
    color: 'var(--preview-brand-on)',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.4,
    fontFamily: 'var(--font-ubuntu-sans), sans-serif',
    borderRadius: '8px',
    padding: '8px 12px',
    maxWidth: '280px',
    whiteSpace: 'nowrap',
    zIndex: 50,
    boxShadow: '0px 2px 8px rgba(11,15,16,0.16)',
  };

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
  };

  const arrowStyles: Record<string, React.CSSProperties> = {
    top: {
      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
      borderTop: '6px solid var(--preview-brand)',
    },
    bottom: {
      position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
      borderBottom: '6px solid var(--preview-brand)',
    },
    left: {
      position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
      borderLeft: '6px solid var(--preview-brand)',
    },
    right: {
      position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
      borderRight: '6px solid var(--preview-brand)',
    },
  };

  const triggerStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: 'var(--preview-muted-bg, #F6F6F6)',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'var(--font-ubuntu-sans), sans-serif',
    color: 'inherit',
    border: 'none',
    cursor: 'pointer',
  };

  const wrapperPadding = position === 'top' ? '48px 0 0' : position === 'bottom' ? '0 0 48px' : position === 'left' ? '0 0 0 120px' : '0 120px 0 0';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: wrapperPadding }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div role="tooltip" style={{ ...tooltipBase, ...positionStyles[position] }}>
          {text}
          <div style={arrowStyles[position]} />
        </div>
        <div style={triggerStyle}>Hover me</div>
      </div>
    </div>
  );
}
