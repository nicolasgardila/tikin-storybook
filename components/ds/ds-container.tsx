/**
 * FIGMA SPEC -- Container
 * Source: DS decisions (STATE.md) + container.mdx specs
 *
 * VARIANTS:
 *   double: Shell r24 p12 + Panel r20 p24 (signature double-layer)
 *   simple: Single layer r24 p24 border
 *   warm:   Double-layer with warm tones
 *
 * COLORS (light):
 *   double: shell #F6F6F6 border #DEDEDE, panel #FFFFFF
 *   simple: bg #FFFFFF border #DEDEDE
 *   warm:   shell #F1EFEB border #E8E4DD, panel #FFFFFF
 *
 * COLORS (dark):
 *   double: shell #171717 border #2A2A2A, panel #1E1E1E
 *   simple: bg #1E1E1E border #2A2A2A
 *   warm:   shell #171717 border #2A2A2A, panel #1E1E1E
 */
import type { ReactNode } from 'react';

interface DSContainerProps {
  variant?: 'double' | 'simple' | 'warm';
  padding?: 'default' | 'compact';
  children?: ReactNode;
}

const variantConfig: Record<string, { shellBg: string; shellBorder: string; panelBg: string }> = {
  double: {
    shellBg: 'var(--preview-muted-bg)',
    shellBorder: 'var(--preview-border)',
    panelBg: 'var(--preview-surface)',
  },
  simple: {
    shellBg: 'var(--preview-surface)',
    shellBorder: 'var(--preview-border)',
    panelBg: 'var(--preview-surface)',
  },
  warm: {
    shellBg: 'var(--preview-muted-bg)',
    shellBorder: 'var(--preview-border)',
    panelBg: 'var(--preview-surface)',
  },
};

function DefaultContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <span
        style={{
          fontFamily: 'var(--font-funnel-display), system-ui, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 400,
          color: 'inherit',
        }}
      >
        Confirmar Transferencia
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <span style={{ color: 'inherit', opacity: 0.6 }}>Destinatario</span>
          <span style={{ color: 'inherit' }}>Juan Perez</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <span style={{ color: 'inherit', opacity: 0.6 }}>Monto</span>
          <span style={{ color: 'inherit' }}>$1,200.00</span>
        </div>
      </div>
    </div>
  );
}

export function DSContainer({
  variant = 'double',
  padding = 'default',
  children,
}: DSContainerProps) {
  const config = variantConfig[variant] || variantConfig.double;
  const innerPadding = padding === 'compact' ? '16px' : '24px';

  if (variant === 'simple') {
    return (
      <div
        style={{
          borderRadius: '24px',
          border: `1px solid ${config.shellBorder}`,
          backgroundColor: config.shellBg,
          padding: innerPadding,
          width: '380px',
          maxWidth: '100%',
          fontFamily: 'var(--font-ubuntu-sans), system-ui, sans-serif',
          color: 'inherit',
        }}
      >
        {children || <DefaultContent />}
      </div>
    );
  }

  // double or warm
  return (
    <div
      style={{
        borderRadius: '24px',
        border: `1px solid ${config.shellBorder}`,
        backgroundColor: config.shellBg,
        padding: '12px',
        width: '380px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          borderRadius: '20px',
          backgroundColor: config.panelBg,
          padding: innerPadding,
          fontFamily: 'var(--font-ubuntu-sans), system-ui, sans-serif',
          color: 'inherit',
        }}
      >
        {children || <DefaultContent />}
      </div>
    </div>
  );
}
