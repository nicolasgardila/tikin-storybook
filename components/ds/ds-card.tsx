/**
 * FIGMA SPECS — Card (from card.html)
 *
 * Base:
 *   border-radius: 24px
 *   border: 0.5px solid
 *   overflow: hidden
 *
 * Variants:
 *   Default (warm):
 *     Light: bg #FFFFFF, border #E8E4DD
 *     Dark:  bg #1E1E1E, border #2A2826
 *
 *   Neutral:
 *     Light: bg #FFFFFF, border #DEDEDE
 *     Dark:  bg #1E1E1E, border #333333
 *
 *   Filled:
 *     Light: bg #F1EFEB, border #E8E4DD
 *     Dark:  bg #151413, border #2A2826
 *
 *   Elevated:
 *     Light: bg #FFFFFF, border transparent, shadow 0 0 2px rgba(11,15,16,0.12)
 *     Dark:  bg #1E1E1E, border transparent, shadow 0 0 4px rgba(0,0,0,0.30)
 *
 *   Outline:
 *     Light: bg transparent, border #DEDEDE, border-width 0.5px
 *     Dark:  bg transparent, border #333333, border-width 0.5px
 *
 * Body:
 *   Default padding: 20px, gap: 16px
 *   Compact padding: 16px, gap: 12px
 *
 * Typography:
 *   Title: Funnel Display 400
 *     lg: 20px, md: 16px, sm: 14px
 *     Light: #0B0B0B, Dark: #FFFFFF
 *   Subtitle: Ubuntu Sans 400
 *     md: 13px, sm: 12px
 *     Light: rgba(11,11,11,0.72), Dark: rgba(255,255,255,0.5)
 *   Body text: Ubuntu Sans 400 14px, lh 1.45
 *     Light: rgba(11,11,11,0.65), Dark: rgba(255,255,255,0.55)
 *   Amount: Ubuntu Sans Mono 400
 *     xl: 28px, lg: 24px, md: 20px
 *
 * Footer:
 *   padding-top: 12px, border-top: 0.5px solid
 *   Light border: #E8E4DD, Dark border: #2A2826
 *   gap: 8px
 */
import type { ReactNode } from 'react';

interface DSCardProps {
  variant?: 'default' | 'neutral' | 'filled' | 'elevated' | 'outline';
  padding?: 'default' | 'compact';
  loading?: boolean;
  children?: ReactNode;
}

export function DSCard({
  variant = 'default',
  padding = 'default',
  loading = false,
  children,
}: DSCardProps) {
  const pad = padding === 'compact' ? '16px' : '20px';
  const gap = padding === 'compact' ? '12px' : '16px';

  const baseStyle: React.CSSProperties = {
    borderRadius: '24px',
    padding: pad,
    display: 'flex',
    flexDirection: 'column',
    gap,
    width: '320px',
    fontFamily: 'var(--font-ubuntu-sans), system-ui, sans-serif',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    transition: 'background-color 200ms ease, border-color 200ms ease',
  };

  /* Figma-exact variant styles using --preview-* CSS vars */
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--preview-surface)',
      border: '0.5px solid var(--preview-warm-border, #E8E4DD)',
    },
    neutral: {
      backgroundColor: 'var(--preview-surface)',
      border: '0.5px solid var(--preview-neutral-border, #DEDEDE)',
    },
    filled: {
      backgroundColor: 'var(--preview-muted-bg)',
      border: '0.5px solid var(--preview-warm-border, #E8E4DD)',
    },
    elevated: {
      backgroundColor: 'var(--preview-surface)',
      border: '0.5px solid transparent',
      boxShadow: 'var(--preview-card-shadow, 0 0 2px rgba(11,15,16,0.12))',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '0.5px solid var(--preview-neutral-border, #DEDEDE)',
    },
  };

  const style = { ...baseStyle, ...variantStyles[variant] };

  const defaultContent = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'inherit',
            opacity: 0.6,
          }}
        >
          Cuenta de Ahorro
        </span>
        <span style={{ fontSize: '0.625rem', color: 'inherit', opacity: 0.5 }}>MXN</span>
      </div>
      <div>
        <span
          style={{
            fontFamily: 'var(--font-funnel-display), system-ui, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 400,
            color: 'inherit',
          }}
        >
          $24,850.00
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: '#16A34A' }}>+2.4%</span>
        <span style={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.5 }}>este mes</span>
      </div>
    </>
  );

  const skeletonStyle: React.CSSProperties = {
    borderRadius: '4px',
    backgroundColor: 'var(--preview-muted-bg)',
    animation: 'ds-pulse 1.8s ease-in-out infinite',
  };

  const loadingContent = (
    <>
      <div style={{ ...skeletonStyle, height: '20px', width: '60%' }} />
      <div style={{ ...skeletonStyle, height: '14px', width: '100%' }} />
      <div style={{ ...skeletonStyle, height: '14px', width: '80%' }} />
      <div style={{ ...skeletonStyle, height: '24px', width: '40%' }} />
    </>
  );

  return <div className="ds-pressable" style={style}>{loading ? loadingContent : (children || defaultContent)}</div>;
}
