/**
 * FIGMA SPECS — Dialog (from modal.html)
 *
 * Backdrop: rgba(0,0,0,0.40)
 *
 * Outer shell (double-layer):
 *   border-radius: 24px
 *   padding: 12px
 *   max-width: 605px
 *   Light: bg #F6F6F6, border 1px #DEDEDE, shadow 0 0 2px rgba(11,15,16,0.12)
 *   Dark:  bg #171717, border 1px #2A2A2A, shadow 0 0 4px rgba(0,0,0,0.30)
 *
 * Inner panel:
 *   border-radius: 20px
 *   padding: 36px
 *   Light: bg #FFFFFF
 *   Dark:  bg #1E1E1E
 *
 * Close button:
 *   position: absolute top 28px right 28px
 *   size: 40x40px
 *   icon: 16x16
 *   Light: color #0B0B0B, Dark: color #FFFFFF
 *
 * Title:
 *   font: Funnel Display 400 24px
 *   Light: #0B0B0B, Dark: #FFFFFF
 *
 * Description:
 *   font: Ubuntu Sans 400 16px
 *   margin-top: 8px
 *   Light: rgba(11,11,11,0.65), Dark: rgba(255,255,255,0.55)
 *
 * Footer:
 *   justify-content: flex-end
 *   gap: 10px
 *   margin-top: 28px
 *
 * Buttons:
 *   height: 40px
 *   border-radius: 12px
 *   padding: 0 16px
 *   font: Ubuntu Sans Mono 500 14px uppercase
 *   Primary Light: bg #0B0B0B, color #FFFFFF
 *   Primary Dark:  bg #FFFFFF, color #0B0B0B
 *   Secondary Light: bg #F6F6F6, border 1px #E1E1E1, color #1C1C1C
 *   Secondary Dark:  bg #2C2C2C, border 1px #3A3A3A, color #FFFFFF
 *   Destructive: bg #EC221F, color #FFFFFF
 *
 * Danger icon:
 *   48x48, border-radius 12px
 *   Light: bg #FEE9E7, color #EC221F
 *   Dark:  bg rgba(236,34,31,0.12), color #EC221F
 */
import type { ReactNode } from 'react';

interface DSDialogProps {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  variant?: 'confirmation' | 'destructive';
  children?: ReactNode;
}

const sizeMaxWidths: Record<string, string> = {
  sm: '400px',
  md: '605px',
  lg: '605px',
};

export function DSDialog({
  title = 'Confirmar accion',
  description = 'Esta seguro de que deseas continuar? Esta accion no se puede deshacer.',
  size = 'md',
  showCloseButton = true,
  variant = 'confirmation',
}: DSDialogProps) {
  const maxWidth = sizeMaxWidths[size] || sizeMaxWidths.md;
  const primaryBg = variant === 'destructive' ? '#EC221F' : 'var(--preview-brand)';
  const primaryColor = variant === 'destructive' ? '#FFFFFF' : 'var(--preview-brand-on)';

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Outer shell — double-layer */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          backgroundColor: 'var(--preview-muted-bg)',
          border: '1px solid var(--preview-border)',
          borderRadius: '24px',
          padding: '12px',
          boxShadow: '0 0 2px rgba(11,15,16,0.12)',
          maxWidth,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Close button — positioned on outer shell */}
        {showCloseButton && (
          <button
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '28px',
              right: '28px',
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        )}

        {/* Inner panel */}
        <div
          style={{
            backgroundColor: 'var(--preview-surface)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Title — Funnel Display 400 24px */}
          <h3
            style={{
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontSize: '24px',
              fontWeight: 400,
              fontStyle: 'normal',
              lineHeight: 'normal',
              margin: 0,
              color: 'inherit',
            }}
          >
            {title}
          </h3>

          {/* Description — Ubuntu Sans 400 16px */}
          <p
            style={{
              fontFamily: 'var(--font-ubuntu-sans), sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: 'inherit',
              opacity: 0.65,
              margin: 0,
              marginTop: '8px',
              lineHeight: 'normal',
            }}
          >
            {description}
          </p>

          {/* Actions — flex-end, gap 10px, margin-top 28px */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '28px' }}>
            <button
              style={{
                borderRadius: '12px',
                border: '1px solid var(--preview-border)',
                backgroundColor: 'transparent',
                height: '40px',
                padding: '0 16px',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                lineHeight: 'normal',
                whiteSpace: 'nowrap',
                color: 'inherit',
                cursor: 'pointer',
                fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
              }}
            >
              Cancelar
            </button>
            <button
              style={{
                borderRadius: '12px',
                backgroundColor: primaryBg,
                height: '40px',
                padding: '0 16px',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                lineHeight: 'normal',
                whiteSpace: 'nowrap',
                color: primaryColor,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
              }}
            >
              {variant === 'destructive' ? 'Eliminar' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
