/**
 * FIGMA SPEC -- Status Chips
 * Source: DS decisions (STATE.md) + status-chips.mdx specs
 *
 * VARIANTS: success, warning, error, info, neutral, brand
 *
 * TYPOGRAPHY:
 *   font: Ubuntu Mono / Ubuntu Sans Mono, 12px, weight 500
 *   text-transform: uppercase
 *   letter-spacing: 0.6px
 *
 * SIZES:
 *   xs: height 24px
 *   sm: height 28px
 *   md: height 32px
 *
 * BORDER-RADIUS: 44px (pill)
 * BORDER: 0.5px rgba(0,0,0,0.08) — per variant overrides with solid colors
 * PADDING: 0 12px
 *
 * COLORS:
 *   success: bg #ECFDF5, text #059669, border #A7F3D0
 *   warning: bg #FFFBEB, text #D97706, border #FDE68A
 *   error:   bg #FEF2F2, text #DC2626, border #FECACA
 *   info:    bg #EFF6FF, text #2563EB, border #BFDBFE
 *   neutral: bg #F6F6F6, text #666666, border #DEDEDE
 *   brand:   bg #0B0B0B, text #FFFFFF, no border
 */

interface DSStatusChipsProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';
  label?: string;
  size?: 'xs' | 'sm' | 'md';
}

const variantColors: Record<
  string,
  { bg: string; color: string; border?: string }
> = {
  success: { bg: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' },
  warning: { bg: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A' },
  error: { bg: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' },
  info: { bg: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' },
  neutral: { bg: 'var(--preview-muted-bg, #F6F6F6)', color: '#525252', border: '1px solid var(--preview-border, #DEDEDE)' },
  brand: { bg: 'var(--preview-brand)', color: 'var(--preview-brand-on)' },
};

const sizeHeights: Record<string, string> = {
  xs: '24px',
  sm: '28px',
  md: '32px',
};

export function DSStatusChips({
  variant = 'success',
  label = 'Activo',
  size = 'sm',
}: DSStatusChipsProps) {
  const colors = variantColors[variant] || variantColors.success;
  const height = sizeHeights[size] || sizeHeights.sm;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '44px',
        paddingLeft: '12px',
        paddingRight: '12px',
        height,
        fontSize: '12px',
        lineHeight: 1,
        boxSizing: 'border-box',
        fontFamily: 'var(--font-ubuntu-sans-mono, "Ubuntu Sans Mono", monospace)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        backgroundColor: colors.bg,
        color: colors.color,
        border: colors.border || 'none',
      }}
    >
      {label}
    </span>
  );
}
