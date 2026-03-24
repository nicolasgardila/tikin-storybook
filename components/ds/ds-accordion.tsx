/**
 * FIGMA SPEC — Accordion
 *
 * Container: border-radius 20px, border 0.5px solid
 * Title: Funnel Display 15px 400
 * Chevron: 16x16, opacity 0.35, rotate 180deg when open
 * Content: Ubuntu Sans 14px, opacity 0.65, line-height 1.5
 * Item separator: 0.5px solid border
 * Item padding: 16px
 */

interface DSAccordionProps {
  items?: string;
  openIndex?: number;
}

const sampleContent: Record<number, string> = {
  0: 'Ve a Configuracion, selecciona Seguridad y luego Cambiar contrasena. Ingresa tu contrasena actual y la nueva.',
  1: 'Abre la app, ve a la seccion Tarjetas y selecciona Activar tarjeta. Sigue las instrucciones en pantalla.',
  2: 'En la pantalla principal, desliza hacia abajo para ver tus movimientos recientes.',
  3: 'Ve a Configuracion, selecciona Ayuda y luego Contactar soporte.',
  4: 'Abre la seccion Transferencias y selecciona el tipo de transferencia que deseas realizar.',
};

export function DSAccordion({
  items = 'Item 1, Item 2, Item 3',
  openIndex = 0,
}: DSAccordionProps) {
  const itemList = items.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '20px',
        border: '0.5px solid var(--preview-border)',
        overflow: 'hidden',
      }}
    >
      {itemList.map((item, i) => {
        const isOpen = i === openIndex;
        const isLast = i === itemList.length - 1;
        return (
          <div
            key={`${item}-${i}`}
            style={{
              borderBottom: isLast ? 'none' : '0.5px solid var(--preview-border)',
            }}
          >
            <div
              className="ds-pressable"
              role="button"
              aria-expanded={isOpen}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                cursor: 'pointer',
              }}
            >
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-funnel-display), 'Funnel Display', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'inherit',
                  }}
                >
                  {item}
                </span>
              </div>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    opacity: 0.35,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                  }}
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </div>
            {isOpen && (
              <div
                style={{
                  padding: '0 16px 16px 16px',
                  fontFamily: "var(--font-ubuntu-sans), 'Ubuntu Sans', sans-serif",
                  fontSize: '14px',
                  color: 'inherit',
                  opacity: 0.65,
                  lineHeight: '1.5',
                }}
              >
                {sampleContent[i % 5]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
