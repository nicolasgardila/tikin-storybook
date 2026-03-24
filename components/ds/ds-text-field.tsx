/**
 * FIGMA SPECS — TextField
 * Source: Figma file vGu558KBAfGjAhT498KWEF + OTP/Checkbox DS pattern reference
 *
 * Note: TextField shares visual patterns with OTP Input (border 0.5px, radius 12px for h48+).
 * The TextField uses a floating label pattern — label sits inside the input.
 *
 * Sizes:
 *   xs: height 32px, font-size 12px, padding 4px 8px, border-radius 6px
 *   sm: height 40px, font-size 14px, padding 8px 12px, border-radius 8px
 *   md: height 48px, font-size 16px, padding 12px 16px, border-radius 12px
 *   lg: height 56px, font-size 16px, padding 14px 16px, border-radius 12px
 *
 * Border:
 *   width-default: 0.5px
 *   width-active: 1px (focus ring via box-shadow: 0 0 0 1px)
 *   width-error: 1px
 *   color-default-light: #DEDEDE
 *   color-default-dark: #333333
 *   color-active-light: #0B0B0B
 *   color-active-dark: #FFFFFF
 *   color-error: #EC221F
 *   color-success: #14AE5C
 *
 * Background:
 *   light: #FFFFFF
 *   dark: #1E1E1E
 *   disabled-light: #F5F5F5
 *   disabled-dark: #151515
 *   error-light: #FEE9E7
 *   error-dark: rgba(236,34,31,0.08)
 *
 * Typography:
 *   label-default-font: Funnel Display, 400
 *   label-active-font: Ubuntu Sans, 400, 10px
 *   value-font: Ubuntu Sans, 400
 *   placeholder-light: rgba(11,11,11,0.55)
 *   placeholder-dark: rgba(255,255,255,0.45)
 *   text-light: #0B0B0B
 *   text-dark: #FFFFFF
 *   error-text: #EC221F
 *   disabled-text-light: rgba(11,11,11,0.25)
 *   disabled-text-dark: rgba(255,255,255,0.18)
 *
 * Feedback:
 *   font: Ubuntu Sans, 13px, 400
 *   error-color: #EC221F
 *   success-color: #14AE5C
 *   info-light: rgba(11,11,11,0.55)
 *   info-dark: rgba(255,255,255,0.45)
 */

interface DSTextFieldProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  state?: 'default' | 'active' | 'disabled';
  feedback?: 'default' | 'success' | 'error';
  label?: string;
  placeholder?: string;
  showIcon?: boolean;
  loading?: boolean;
  errorMessage?: string;
}

const sizeConfig: Record<string, { height: number; radius: number; paddingH: number; paddingV: number; fontSize: number }> = {
  xs: { height: 32, radius: 6, paddingH: 8, paddingV: 4, fontSize: 12 },
  sm: { height: 40, radius: 8, paddingH: 12, paddingV: 8, fontSize: 14 },
  md: { height: 48, radius: 12, paddingH: 16, paddingV: 12, fontSize: 16 },
  lg: { height: 56, radius: 12, paddingH: 16, paddingV: 14, fontSize: 16 },
};

export function DSTextField({
  size = 'md',
  state = 'default',
  feedback = 'default',
  label = 'Label',
  placeholder = 'Placeholder',
  showIcon = false,
  loading = false,
  errorMessage = 'Feedback error',
}: DSTextFieldProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const isDisabled = state === 'disabled';
  const isActive = state === 'active';
  const isError = feedback === 'error';
  const isSuccess = feedback === 'success';

  const borderColor = isError
    ? '#EC221F'
    : isSuccess
      ? '#14AE5C'
      : isActive
        ? 'var(--preview-brand)'
        : 'var(--preview-border)';

  const borderWidth = isActive || isError ? '1px' : '0.5px';

  const boxShadow = isActive
    ? '0 0 0 1px var(--preview-brand)'
    : undefined;

  const bgColor = isDisabled
    ? 'var(--preview-muted-bg)'
    : isError
      ? 'var(--preview-error-bg, #FEE9E7)'
      : 'var(--preview-surface)';

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '325px',
    height: `${cfg.height}px`,
    borderRadius: `${cfg.radius}px`,
    border: `${borderWidth} solid ${borderColor}`,
    backgroundColor: bgColor,
    padding: `${cfg.paddingV}px ${cfg.paddingH}px`,
    display: 'flex',
    flexDirection: isActive ? 'column' as const : 'row' as const,
    justifyContent: isActive ? 'center' as const : undefined,
    alignItems: isActive ? 'stretch' as const : 'center' as const,
    overflow: 'hidden',
    boxSizing: 'border-box',
    cursor: isDisabled ? 'not-allowed' : 'text',
    opacity: isDisabled ? 0.5 : 1,
    boxShadow,
    transition: 'border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease',
  };

  // Spinner for loading state (replaces eye icon when loading + active)
  const spinnerEl = (
    <span
      style={{
        width: '12px',
        height: '12px',
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'ds-spin 0.6s linear infinite',
        display: 'inline-block',
        flexShrink: 0,
        marginLeft: 'auto',
        opacity: 0.5,
      }}
    />
  );

  // Eye icon for showIcon
  const iconEl = loading && isActive
    ? spinnerEl
    : showIcon ? (
      <svg
        style={{ width: '18px', height: '18px', flexShrink: 0, opacity: 0.5, marginLeft: 'auto' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : null;

  const feedbackEl = (isError || isSuccess) && (
    <span
      style={{
        fontSize: '13px',
        fontFamily: 'var(--font-ubuntu-sans), sans-serif',
        fontWeight: 400,
        color: isError ? '#EC221F' : '#14AE5C',
        lineHeight: 1.2,
        marginTop: '8px',
        display: 'block',
      }}
    >
      {isError ? errorMessage : 'Success'}
    </span>
  );

  if (isActive) {
    return (
      <div style={{ width: '100%', maxWidth: '325px' }}>
        <div style={containerStyle}>
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-ubuntu-sans), sans-serif',
              fontWeight: 400,
              color: 'inherit',
              opacity: 0.5,
              lineHeight: '12px',
              margin: 0,
              display: 'block',
            }}
          >
            {label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: `${Math.max(cfg.fontSize - 2, 12)}px`,
                fontFamily: 'var(--font-ubuntu-sans), sans-serif',
                fontWeight: 400,
                color: isError ? '#EC221F' : 'inherit',
                lineHeight: '18px',
                margin: 0,
                display: 'block',
                flex: 1,
              }}
            >
              {placeholder}
            </span>
            {loading && spinnerEl}
          </div>
        </div>
        {feedbackEl}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '325px' }}>
      <div style={containerStyle}>
        <span
          style={{
            fontSize: `${cfg.fontSize}px`,
            fontFamily: 'var(--font-funnel-display), sans-serif',
            fontWeight: 400,
            color: isError ? '#EC221F' : 'inherit',
            opacity: isError ? 0.8 : 0.5,
            lineHeight: 1.2,
          }}
        >
          {label}
        </span>
        {iconEl}
      </div>
      {feedbackEl}
    </div>
  );
}
