/**
 * FIGMA SPECS — Progress Bar
 *
 * Track: bg #EEEBE6, border-radius 100px, overflow hidden
 * Sizes: sm=4px, md=6px, lg=8px
 * Fill: bg var(--preview-brand), border-radius 100px, transition width 300ms
 *
 * Steps variant:
 *   32px circles with numbers, Funnel Display 12px labels
 *   Completed: filled bg brand, color brand-on, checkmark
 *   Active: filled bg brand, color brand-on, number
 *   Upcoming: hollow bg surface, border 1.5px #DEDEDE, color muted
 *   Connecting lines: 2px height, completed=#0B0B0B, upcoming=#DEDEDE
 */

interface DSProgressBarProps {
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bar' | 'steps';
  steps?: number;
}

const sizeHeights: Record<string, string> = {
  sm: '4px',
  md: '6px',
  lg: '8px',
};

const stepLabels = ['Datos', 'Verificacion', 'Revision', 'Listo', 'Confirmacion', 'Envio', 'Pago', 'Final'];

export function DSProgressBar({
  value = 60,
  size = 'md',
  variant = 'bar',
  steps = 4,
}: DSProgressBarProps) {
  if (variant === 'steps') {
    /* Calculate active step from value: e.g., value=50 with 4 steps → step 2 active */
    const activeStep = Math.max(1, Math.min(steps, Math.ceil((value / 100) * steps)));
    const totalSteps = Math.max(2, Math.min(8, steps));

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = i < activeStep - 1;
          const isActive = i === activeStep - 1;
          const isLast = i === totalSteps - 1;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
                position: 'relative',
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted || isActive
                    ? 'var(--preview-brand, #0B0B0B)'
                    : 'var(--preview-surface, #FFFFFF)',
                  border: isCompleted || isActive
                    ? '1.5px solid var(--preview-brand, #0B0B0B)'
                    : '1.5px solid var(--preview-border, #DEDEDE)',
                  color: isCompleted || isActive
                    ? 'var(--preview-brand-on, #FFFFFF)'
                    : 'color-mix(in srgb, currentColor 35%, transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
                  fontWeight: 500,
                  fontSize: '13px',
                  zIndex: 1,
                }}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                    <path d="M3 7l3 3 5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>

              {/* Connecting line (not on last step) */}
              {!isLast && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: 'calc(50% + 20px)',
                    right: 'calc(-50% + 20px)',
                    height: '2px',
                    backgroundColor: isCompleted
                      ? 'var(--preview-brand, #0B0B0B)'
                      : 'var(--preview-border, #DEDEDE)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Label */}
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-funnel-display), sans-serif',
                  fontWeight: isActive ? 500 : 400,
                  color: isCompleted || isActive
                    ? 'inherit'
                    : 'color-mix(in srgb, currentColor 35%, transparent)',
                  textAlign: 'center',
                }}
              >
                {stepLabels[i] || `Paso ${i + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  /* Bar variant */
  const trackHeight = sizeHeights[size] || sizeHeights.md;
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height: trackHeight,
        backgroundColor: 'var(--preview-muted-bg, #EEEBE6)',
        borderRadius: '100px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clampedValue}%`,
          height: '100%',
          backgroundColor: 'var(--preview-brand, #0B0B0B)',
          borderRadius: '100px',
          transition: 'width 300ms ease',
        }}
      />
    </div>
  );
}
