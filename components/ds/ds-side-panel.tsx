/**
 * FIGMA SPECS — Side Panel
 *
 * Warm double-layer pattern:
 *   Outer: bg #F1EFEB, border 0.5px #E8E4DD, r24, padding 12px
 *   Inner: bg #FFFFFF, border 0.5px #E8E4DD, r20
 *
 * Widths: 320, 400, 464
 *
 * Title: Funnel Display 400 20px
 * Close button: 40x40 on outer shell, icon 16px
 *
 * Header: px 24, pt 24
 * Body: p 24, scrollable
 * Divider: 0.5px #E8E4DD, full-width bleed
 */

interface DSSidePanelProps {
  title?: string;
  width?: '320' | '400' | '464';
}

export function DSSidePanel({
  title = 'Detalles',
  width = '464',
}: DSSidePanelProps) {
  const panelWidth = `${width}px`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Outer shell — warm double-layer */}
      <div
        role="dialog"
        style={{
          width: panelWidth,
          maxWidth: '100%',
          height: '100%',
          backgroundColor: 'var(--preview-muted-bg, #F6F6F6)',
          borderRadius: '24px',
          padding: '12px',
          border: '0.5px solid var(--preview-border, #DEDEDE)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          position: 'relative',
        }}
      >
        {/* Close button — 40x40 on outer shell */}
        <button
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            zIndex: 3,
            padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>

        {/* Inner panel */}
        <div
          style={{
            backgroundColor: 'var(--preview-surface, #FFFFFF)',
            borderRadius: '20px',
            border: '0.5px solid var(--preview-border, #DEDEDE)',
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ padding: '24px 24px 0 24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-funnel-display), sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: 'normal',
                margin: 0,
                color: 'inherit',
                paddingRight: '40px',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-ubuntu-sans), sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: 'inherit',
                opacity: 0.72,
                margin: 0,
                marginTop: '4px',
                lineHeight: 'normal',
              }}
            >
              Informacion de la transaccion
            </p>
            {/* Full-bleed divider */}
            <div
              style={{
                height: '0.5px',
                backgroundColor: 'var(--preview-border, #DEDEDE)',
                marginTop: '16px',
                marginLeft: '-24px',
                marginRight: '-24px',
                width: 'calc(100% + 48px)',
              }}
            />
          </div>

          {/* Body */}
          <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-ubuntu-sans), sans-serif',
                fontSize: '14px',
                color: 'inherit',
                opacity: 0.65,
                margin: 0,
                lineHeight: '1.45',
              }}
            >
              Contenido secundario del panel. Puede incluir formularios, listas o informacion detallada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
