/**
 * FIGMA SPEC — OTP Input
 * Source: DS decisions (STATE.md) and otp-input.mdx specs
 *
 * CELL DIMENSIONS: 48x56 desktop (not 48x48)
 * BORDER: 0.5px (not 1.5px)
 * BORDER-RADIUS: 12px
 * ERROR COLOR: #EC221F
 * ERROR BG: #FEE9E7
 * FONT: Ubuntu Sans Mono, 24px, weight 500
 * SIZES:
 *   xs: 36x42
 *   sm: 40x48
 *   md: 48x56
 *   lg: 52x60
 * STATES: default, active, error, disabled
 */

interface DSOTPInputProps {
  length?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  state?: 'default' | 'active' | 'error' | 'disabled';
}

const sizeConfig: Record<string, { width: number; height: number; fontSize: string }> = {
  xs: { width: 36, height: 42, fontSize: '18px' },
  sm: { width: 40, height: 48, fontSize: '20px' },
  md: { width: 48, height: 56, fontSize: '24px' },
  lg: { width: 52, height: 60, fontSize: '26px' },
};

export function DSOTPInput({
  length = 4,
  size = 'md',
  state = 'default',
}: DSOTPInputProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const isError = state === 'error';
  const isActive = state === 'active';
  const isDisabled = state === 'disabled';

  const sampleDigits = ['3', '8', '4', '1', '7', '2'];

  const cellStyle = (index: number): React.CSSProperties => ({
    width: `${cfg.width}px`,
    height: `${cfg.height}px`,
    borderRadius: '12px',
    border: `0.5px solid ${isError ? '#EC221F' : isActive && index === 0 ? 'var(--preview-brand)' : 'var(--preview-border)'}`,
    backgroundColor: isError ? 'var(--preview-error-bg, #FEE9E7)' : isDisabled ? 'var(--preview-muted-bg, #F5F5F5)' : 'var(--preview-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
    fontSize: cfg.fontSize,
    fontWeight: 500,
    color: isError ? '#EC221F' : 'inherit',
    opacity: isDisabled ? 0.4 : 1,
  });

  const showDigits = isError || state === 'default';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {Array.from({ length: Math.min(length, 6) }).map((_, i) => (
          <div key={i} style={cellStyle(i)}>
            {showDigits && isError ? sampleDigits[i] : ''}
          </div>
        ))}
      </div>
      {isError && (
        <span
          style={{
            fontFamily: 'var(--font-ubuntu-sans), system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#EC221F',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="7" cy="7" r="5.5" />
            <line x1="7" y1="4.5" x2="7" y2="7.5" />
            <circle cx="7" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          Codigo incorrecto. Intenta de nuevo.
        </span>
      )}
    </div>
  );
}
