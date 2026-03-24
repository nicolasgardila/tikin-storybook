/**
 * FIGMA SPEC — Button
 * Source: No dedicated HTML file. Specs from existing DS decisions and Figma review.
 *
 * VARIANTS: primary, secondary, ghost, link, icon-primary, icon-secondary, icon-muted
 *
 * SIZES (text buttons):
 *   sm: padding 6px 12px, font-size 12px, height 32px
 *   md: padding 8px 20px, font-size 14px, height 40px
 *   lg: padding 12px 28px, font-size 14px, height 44px
 *   xl: padding 14px 32px, font-size 16px, height 48px
 *
 * TYPOGRAPHY:
 *   font-family: Ubuntu Sans Mono
 *   font-weight: 500
 *   text-transform: uppercase
 *   letter-spacing: 0.05em
 *
 * BORDER-RADIUS: 12px (all sizes)
 *
 * COLORS (light):
 *   primary:   bg #0B0B0B, color #FFFFFF
 *   secondary: bg transparent, border 1px solid #DEDEDE, color #0B0B0B
 *   ghost:     bg transparent, no border, color #0B0B0B
 *   link:      bg transparent, no border, color #0B0B0B, text-decoration underline
 *
 * COLORS (dark):
 *   primary:   bg #FFFFFF, color #0B0B0B
 *   secondary: bg transparent, border 1px solid #333333, color #FFFFFF
 *   ghost:     bg transparent, no border, color #FFFFFF
 *
 * DISABLED: opacity 0.5, cursor not-allowed
 * TRANSITION: opacity 200ms ease
 */
import type { ReactNode } from 'react';

interface DSButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

/* Figma sizes: sm=h32, md=h40, lg=h44, xl not in HTML but extrapolated */
const sizeStyles: Record<string, { padding: string; fontSize: string; height: string }> = {
  sm: { padding: '6px 12px', fontSize: '12px', height: '32px' },
  md: { padding: '8px 20px', fontSize: '14px', height: '40px' },
  lg: { padding: '12px 28px', fontSize: '14px', height: '44px' },
};

export function DSButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  loading = false,
  children = 'Continuar',
}: DSButtonProps) {
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  const baseStyle: React.CSSProperties = {
    borderRadius: '12px',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    height: sizeStyle.height,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer',
    opacity: disabled ? 0.5 : loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' as const : undefined,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
    transition: 'opacity 200ms ease',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const variantOverrides: React.CSSProperties =
    variant === 'primary'
      ? {
          backgroundColor: 'var(--preview-brand)',
          color: 'var(--preview-brand-on)',
        }
      : variant === 'secondary'
        ? {
            backgroundColor: 'transparent',
            border: '1px solid var(--preview-border)',
            color: 'inherit',
          }
        : {
            // ghost
            backgroundColor: 'transparent',
            border: 'none',
            color: 'inherit',
          };

  return (
    <button
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      className={!disabled && !loading ? 'ds-pressable' : undefined}
      style={{ ...baseStyle, ...variantOverrides }}
    >
      {loading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'ds-spin 0.6s linear infinite',
            display: 'inline-block',
          }}
        />
      ) : (
        children
      )}
    </button>
  );
}
