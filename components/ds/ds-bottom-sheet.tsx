/**
 * FIGMA SPECS — Bottom Sheet
 *
 * Container:
 *   border-radius: 24px 24px 0 0
 *   border-top: 1px solid rgba(255,255,255,0.1)
 *   bg: var(--preview-surface) (#FFFFFF / #1E1E1E)
 *
 * Handle bar:
 *   40x4px, border-radius 8px
 *   Light: #E1E1E1, Dark: #434343
 *   Padding: 8px (centered)
 *
 * Title:
 *   font: Funnel Display 400
 *   centered, padding 16px, border-bottom 0.5px
 *
 * Content padding: 24px
 */

interface DSBottomSheetProps {
  title?: string;
  showHandle?: boolean;
}

export function DSBottomSheet({
  title = 'Titulo',
  showHandle = true,
}: DSBottomSheetProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: '100%',
          backgroundColor: 'var(--preview-surface, #FFFFFF)',
          borderRadius: '24px 24px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 50,
        }}
      >
        {/* Handle bar */}
        {showHandle && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: 'var(--preview-border, #E1E1E1)',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <div
            style={{
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              textAlign: 'center',
              padding: '16px',
              borderBottom: '0.5px solid var(--preview-border, #DEDEDE)',
              color: 'inherit',
            }}
          >
            {title}
          </div>
        )}

        {/* Sample content */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontFamily: 'var(--font-ubuntu-sans), sans-serif',
              fontSize: '14px',
              color: 'inherit',
              opacity: 0.65,
              margin: '0 0 16px 0',
              lineHeight: '1.45',
            }}
          >
            Selecciona una opcion para continuar con tu operacion.
          </p>
          <button
            style={{
              borderRadius: '12px',
              backgroundColor: 'var(--preview-brand, #0B0B0B)',
              height: '48px',
              padding: '0 16px',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'uppercase',
              lineHeight: 'normal',
              color: 'var(--preview-brand-on, #FFFFFF)',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
