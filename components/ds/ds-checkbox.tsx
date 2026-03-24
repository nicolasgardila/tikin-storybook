/**
 * FIGMA SPECS — Checkbox
 * Source: checkbox-ds/index.html (Figma export)
 *
 * Sizes:
 *   desktop (sm): box 20x20px, border-radius 5px, label 14px, gap 8px
 *   mobile (md): box 24x24px, border-radius 6px, label 16px, gap 10px
 *
 * Border:
 *   width: 1.5px
 *
 * Unchecked (default):
 *   border-light: #D9D9D9
 *   border-dark: #5A5A5A
 *   bg-light: #FFFFFF
 *   bg-dark: transparent
 *   label-light: #1E1E1E, 400
 *   label-dark: #FFFFFF, 400
 *
 * Checked (default):
 *   border-light: #0B0B0B
 *   border-dark: #FFFFFF
 *   bg-light: #0B0B0B
 *   bg-dark: #FFFFFF
 *   inner-square-light: #FFFFFF (10x10 desktop / 12x12 mobile, r2)
 *   inner-square-dark: #0B0B0B
 *   label-light: #1E1E1E, 600
 *   label-dark: #FFFFFF, 600
 *
 * Indeterminate (default):
 *   Same border/bg as checked
 *   inner-dash: 10x2 desktop / 12x2 mobile, r1
 *   dash-light: #FFFFFF
 *   dash-dark: #0B0B0B
 *   label-weight: 400
 *
 * Disabled unchecked:
 *   border-light: #E6E6E6, bg-light: #F5F5F5, label-light: #B3B3B3
 *   border-dark: #383838, bg-dark: #1E1E1E, label-dark: #5A5A5A
 *
 * Disabled checked:
 *   border-light: #D9D9D9, bg-light: #D9D9D9, inner-light: #B3B3B3
 *   border-dark: #434343, bg-dark: #434343, inner-dark: #5A5A5A
 *   label-light: #B3B3B3, label-dark: #5A5A5A
 *
 * Label font: Ubuntu Sans, line-height 1.3
 * Wrapper padding: desktop 6px 10px 6px 6px, mobile 8px 12px 8px 8px
 * Wrapper border-radius: desktop 8px, mobile 10px
 */

interface DSCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

export function DSCheckbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label = 'Acepto los terminos',
  size = 'md',
}: DSCheckboxProps) {
  const isDesktop = size === 'sm';
  const boxSize = isDesktop ? 20 : 24;
  const borderRadius = isDesktop ? '5px' : '6px';
  const fontSize = isDesktop ? '14px' : '16px';
  const gap = isDesktop ? '8px' : '10px';

  const isActive = checked || indeterminate;

  const boxStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    borderRadius,
    border: `1.5px solid ${isActive ? 'var(--preview-brand)' : 'var(--preview-border)'}`,
    backgroundColor: isActive ? 'var(--preview-brand)' : 'var(--preview-surface)',
    flexShrink: 0,
    transition: 'background-color 200ms ease, border-color 200ms ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-ubuntu-sans), Ubuntu Sans, sans-serif',
    fontSize,
    lineHeight: '1.3',
    color: 'inherit',
    opacity: disabled ? 0.5 : 1,
    fontWeight: checked ? 600 : 400,
  };

  // Inner square for checked state (matches Figma inner-square dimensions)
  const innerSize = isDesktop ? 10 : 12;

  const checkIcon = (
    <div style={{
      width: `${innerSize}px`,
      height: `${innerSize}px`,
      borderRadius: '2px',
      backgroundColor: 'var(--preview-brand-on)',
    }} />
  );

  const indeterminateIcon = (
    <div style={{
      width: `${innerSize}px`,
      height: '2px',
      borderRadius: '1px',
      backgroundColor: 'var(--preview-brand-on)',
    }} />
  );

  return (
    <label className={!disabled ? 'ds-pressable' : undefined} style={labelStyle}>
      <span style={boxStyle}>
        {indeterminate ? indeterminateIcon : checked ? checkIcon : null}
      </span>
      {label}
    </label>
  );
}
