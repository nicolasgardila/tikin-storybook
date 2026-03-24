/**
 * FIGMA SPEC — Table
 *
 * Container: border-radius 20px, border 0.5px solid, overflow hidden
 * Headers: Ubuntu Sans Mono 12px uppercase, weight 500, opacity 0.5
 *   letter-spacing 0.3px, padding 12px 16px
 *   bg muted, border-bottom 0.5px solid
 * Body: Ubuntu Sans 14px, weight 400, padding 12px 16px
 *   Row separator: 0.5px solid border (except last row)
 * Amount column: Ubuntu Sans Mono, text-align right
 */

interface DSTableProps {
  rows?: number;
  showHeader?: boolean;
  loading?: boolean;
}

const sampleData = [
  { name: 'Ana Lopez', email: 'ana@correo.com', role: 'Admin' },
  { name: 'Carlos Ruiz', email: 'carlos@correo.com', role: 'Editor' },
  { name: 'Maria Torres', email: 'maria@correo.com', role: 'Viewer' },
  { name: 'Pedro Garcia', email: 'pedro@correo.com', role: 'Editor' },
  { name: 'Laura Mendez', email: 'laura@correo.com', role: 'Admin' },
  { name: 'Jorge Herrera', email: 'jorge@correo.com', role: 'Viewer' },
  { name: 'Sofia Navarro', email: 'sofia@correo.com', role: 'Editor' },
  { name: 'Diego Morales', email: 'diego@correo.com', role: 'Viewer' },
  { name: 'Camila Rios', email: 'camila@correo.com', role: 'Admin' },
  { name: 'Andres Vega', email: 'andres@correo.com', role: 'Editor' },
];

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
  fontWeight: 500,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  borderBottom: '0.5px solid var(--preview-border)',
  opacity: 0.5,
  backgroundColor: 'var(--preview-muted-bg)',
  color: 'inherit',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontWeight: 400,
  backgroundColor: 'var(--preview-surface)',
  color: 'inherit',
};

const skeletonWidths = ['60%', '80%', '40%'];

export function DSTable({
  rows = 5,
  showHeader = true,
  loading = false,
}: DSTableProps) {
  const rowCount = Math.max(3, Math.min(10, rows));
  const data = sampleData.slice(0, rowCount);

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '0.5px solid var(--preview-border)',
        backgroundColor: 'var(--preview-surface)',
        fontFamily: "var(--font-ubuntu-sans), 'Ubuntu Sans', sans-serif",
        fontSize: '14px',
        color: 'inherit',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {showHeader && (
          <thead>
            <tr style={{ backgroundColor: 'var(--preview-muted-bg)' }}>
              <th style={headerStyle}>Nombre</th>
              <th style={headerStyle}>Correo</th>
              <th style={{ ...headerStyle, textAlign: 'right' }}>Rol</th>
            </tr>
          </thead>
        )}
        <tbody>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => {
                const isLast = i === 3;
                return (
                  <tr key={`skeleton-${i}`}>
                    {skeletonWidths.map((w, j) => (
                      <td
                        key={j}
                        style={{
                          ...cellStyle,
                          borderBottom: isLast ? 'none' : '0.5px solid var(--preview-border)',
                          textAlign: j === 2 ? 'right' as const : undefined,
                        }}
                      >
                        <div
                          style={{
                            height: '14px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--preview-muted-bg)',
                            width: w,
                            animation: 'ds-pulse 1.8s ease-in-out infinite',
                            marginLeft: j === 2 ? 'auto' : undefined,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })
            : data.map((row, i) => {
                const isLast = i === data.length - 1;
                return (
                  <tr key={`${row.name}-${i}`}>
                    <td
                      style={{
                        ...cellStyle,
                        borderBottom: isLast ? 'none' : '0.5px solid var(--preview-border)',
                      }}
                    >
                      {row.name}
                    </td>
                    <td
                      style={{
                        ...cellStyle,
                        borderBottom: isLast ? 'none' : '0.5px solid var(--preview-border)',
                      }}
                    >
                      {row.email}
                    </td>
                    <td
                      style={{
                        ...cellStyle,
                        borderBottom: isLast ? 'none' : '0.5px solid var(--preview-border)',
                        textAlign: 'right',
                        fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
                      }}
                    >
                      {row.role}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
