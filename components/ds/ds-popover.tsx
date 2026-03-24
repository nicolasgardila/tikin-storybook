/**
 * FIGMA SPEC — Popover
 *
 * Double-layer container:
 *   Outer: border-radius 20px, padding 8px, bg muted, border 1px solid
 *   Inner: border-radius 16px, bg surface, overflow hidden
 *
 * Items: padding 10px 14px, Ubuntu Sans 14px, gap 10px (with icons)
 * Icons: 18px, opacity 0.55
 * Shadow: 0px 4px 16px rgba(11,15,16,0.10), 0px 0px 2px rgba(11,15,16,0.08)
 * Destructive item: color #EC221F
 * Divider: 0.5px solid, margin 4px 14px
 */

interface DSPopoverProps {
  title?: string;
  showArrow?: boolean;
}

export function DSPopover({
  title = 'Opciones',
  showArrow = true,
}: DSPopoverProps) {
  const menuItems = [
    { label: 'Editar', icon: 'M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H48V216H208V128a8,8,0,0,1,16,0Z' },
    { label: 'Duplicar', icon: 'M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z' },
    { label: 'Compartir', icon: 'M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66.09,8,8,0,0,1-15.5-4.18A104.07,104.07,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Z' },
  ];

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      {/* Trigger button */}
      <button
        style={{
          borderRadius: '12px',
          border: '0.5px solid var(--preview-border)',
          backgroundColor: 'transparent',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: "var(--font-ubuntu-sans), 'Ubuntu Sans', sans-serif",
        }}
      >
        {title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {/* Arrow */}
      {showArrow && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0px)',
            left: '20px',
            width: '12px',
            height: '6px',
            overflow: 'hidden',
            zIndex: 51,
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--preview-muted-bg)',
              border: '1px solid var(--preview-border)',
              transform: 'rotate(45deg)',
              position: 'absolute',
              top: '2px',
              left: '1px',
            }}
          />
        </div>
      )}

      {/* Popover menu — permanently visible for preview */}
      <div
        style={{
          position: 'absolute',
          top: showArrow ? 'calc(100% + 6px)' : 'calc(100% + 4px)',
          left: '0',
          borderRadius: '20px',
          padding: '8px',
          border: '1px solid var(--preview-border)',
          backgroundColor: 'var(--preview-muted-bg)',
          boxShadow: '0px 4px 16px rgba(11,15,16,0.10), 0px 0px 2px rgba(11,15,16,0.08)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--preview-surface)',
            minWidth: '200px',
          }}
        >
          {menuItems.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              style={{
                fontFamily: "var(--font-ubuntu-sans), 'Ubuntu Sans', sans-serif",
                fontSize: '14px',
                color: 'inherit',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 256 256"
                fill="currentColor"
                style={{ opacity: 0.55, flexShrink: 0 }}
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
