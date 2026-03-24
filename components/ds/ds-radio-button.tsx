/**
 * FIGMA SPEC -- Radio Button
 * Source: DS decisions (STATE.md) + radio-button.mdx specs
 *
 * CIRCLE: 20px, r50%, border 1.5px
 * DOT (selected): 8px r50%
 * LABEL: Funnel Display 14px 400 (unselected) / 600 (selected)
 * GAP: 8px between circle and label
 *
 * COLORS (light):
 *   unselected: border #DEDEDE, bg surface
 *   selected:   border brand, bg brand, dot brand-on
 *   disabled:   border #E6E6E6, bg muted, opacity 0.5
 *
 * COLORS (dark):
 *   unselected: border #333333, bg surface
 *   selected:   border brand, bg brand, dot brand-on
 */

interface DSRadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
}

export function DSRadioButton({
  checked = false,
  disabled = false,
  label = 'Opcion 1',
}: DSRadioButtonProps) {
  const circleStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `1.5px solid ${checked ? 'var(--preview-brand)' : 'var(--preview-border)'}`,
    backgroundColor: checked ? 'var(--preview-brand)' : 'var(--preview-surface)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  if (disabled) {
    circleStyle.backgroundColor = 'var(--preview-muted-bg)';
    circleStyle.border = '1.5px solid var(--preview-border)';
  }

  return (
    <label
      className={!disabled ? 'ds-pressable' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-funnel-display), Funnel Display, sans-serif',
        fontSize: '14px',
        fontWeight: checked ? 600 : 400,
        color: 'inherit',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={circleStyle}>
        {checked && !disabled && (
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--preview-brand-on)',
            }}
          />
        )}
      </span>
      {label}
    </label>
  );
}
