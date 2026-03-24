/**
 * FIGMA SPECS — Select
 * Source: Figma file vGu558KBAfGjAhT498KWEF
 *
 * Shares visual base with TextField (borders, radii, padding).
 *
 * Sizes:
 *   sm: padding 8px 12px, font-size 14px, border-radius 8px
 *   md: padding 12px 16px, font-size 16px, border-radius 12px
 *   lg: padding 16px 20px, font-size 16px, border-radius 14px
 *
 * Border:
 *   width: 0.5px (default), 1px (active/focused)
 *   color-default-light: #DEDEDE
 *   color-default-dark: #333333
 *   color-active-light: #0B0B0B
 *   color-active-dark: #FFFFFF
 *
 * Background:
 *   light: #FFFFFF
 *   dark: #1E1E1E
 *   disabled-light: #F5F5F5
 *   disabled-dark: #151515
 *
 * Typography:
 *   font: Ubuntu Sans, 400
 *   text-light: #0B0B0B
 *   text-dark: #FFFFFF
 *   placeholder-light: rgba(11,11,11,0.55)
 *   placeholder-dark: rgba(255,255,255,0.45)
 *   disabled-light: rgba(11,11,11,0.25)
 *   disabled-dark: rgba(255,255,255,0.18)
 *
 * Chevron:
 *   size: 16x16px
 *   stroke: currentColor, 1.5px
 *
 * Dropdown:
 *   gap from trigger: 4px
 *   border-radius: same as trigger
 *   border: 0.5px solid border-color
 *   shadow: 0 4px 12px rgba(0,0,0,0.08)
 *   item-padding: 8px 12px
 *   hover-bg-light: #F5F5F5
 *   hover-bg-dark: #1E1E1E
 */

interface DSSelectProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'active' | 'disabled';
  feedback?: 'default' | 'error';
  label?: string;
  value?: string;
  loading?: boolean;
  errorMessage?: string;
}

const sizeConfig: Record<string, { padding: string; fontSize: number; radius: number }> = {
  sm: { padding: '8px 12px', fontSize: 14, radius: 8 },
  md: { padding: '12px 16px', fontSize: 16, radius: 12 },
  lg: { padding: '16px 20px', fontSize: 16, radius: 14 },
};

const sampleOptions = ['Opcion 1', 'Opcion 2', 'Opcion 3'];

export function DSSelect({
  size = 'md',
  state = 'default',
  feedback = 'default',
  label = 'Seleccionar...',
  value = '',
  loading = false,
  errorMessage = 'Selecciona una opción válida',
}: DSSelectProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const isDisabled = state === 'disabled';
  const isActive = state === 'active';
  const isError = feedback === 'error';

  const triggerStyle: React.CSSProperties = {
    borderRadius: `${cfg.radius}px`,
    border: `${isActive || isError ? '1px' : '0.5px'} solid ${isError ? '#EC221F' : isActive ? 'var(--preview-brand)' : 'var(--preview-border)'}`,
    backgroundColor: isDisabled ? 'var(--preview-muted-bg)' : isError ? 'var(--preview-error-bg, #FEE9E7)' : 'var(--preview-surface)',
    padding: cfg.padding,
    fontSize: `${cfg.fontSize}px`,
    fontFamily: 'var(--font-ubuntu-sans), Ubuntu Sans, sans-serif',
    color: 'inherit',
    opacity: isDisabled ? 0.5 : value ? 1 : 0.6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    width: '100%',
    maxWidth: '320px',
    boxSizing: 'border-box' as const,
    boxShadow: isActive ? '0 0 0 1px var(--preview-brand)' : undefined,
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
  };

  const spinner = (
    <span
      style={{
        width: '14px',
        height: '14px',
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'ds-spin 0.6s linear infinite',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );

  const chevron = (
    <svg
      style={{ width: '16px', height: '16px', flexShrink: 0 }}
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
  );

  return (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <div style={triggerStyle}>
        <span>{loading ? 'Cargando...' : (value || label)}</span>
        {loading ? spinner : chevron}
      </div>
      {isError && (
        <span
          style={{
            fontSize: '13px',
            fontFamily: 'var(--font-ubuntu-sans), sans-serif',
            fontWeight: 400,
            color: '#EC221F',
            lineHeight: 1.2,
            marginTop: '8px',
            display: 'block',
          }}
        >
          {errorMessage}
        </span>
      )}
      {isActive && !isError && !loading && (
        <div
          style={{
            marginTop: '4px',
            borderRadius: `${cfg.radius}px`,
            border: '0.5px solid var(--preview-border)',
            backgroundColor: 'var(--preview-surface)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          {sampleOptions.map((opt, i) => (
            <div
              key={opt}
              style={{
                padding: '8px 12px',
                fontSize: `${cfg.fontSize}px`,
                fontFamily: 'var(--font-ubuntu-sans), Ubuntu Sans, sans-serif',
                color: 'inherit',
                cursor: 'pointer',
                backgroundColor: i === 1 ? 'var(--preview-muted-bg)' : 'transparent',
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
