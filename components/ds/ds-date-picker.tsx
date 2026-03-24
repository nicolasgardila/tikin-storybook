/**
 * FIGMA SPECS — Date Picker
 * ==========================
 * Calendar view with month navigation and day selection.
 *
 * STRUCTURE: Double-layer container
 *   Outer: border-radius 24px, padding 12px, bg #F6F6F6
 *   Inner: border-radius 20px, padding 20px, bg #FFFFFF
 *
 * MONTH HEADER: Funnel Display 400 16px
 * WEEKDAY LABELS: Ubuntu Sans Mono 11px, rgba(11,11,11,0.35), uppercase
 * DAY CELLS: 36x36, border-radius 10px (not circular)
 *   Normal: fontSize 13px, Mono, weight 400, color #0B0B0B
 *   Selected: bg #0B0B0B, color #FFFFFF, weight 500
 *   Today: border 1px solid #DEDEDE, weight 500
 *
 * NAV ARROWS: 28x28 r8 buttons
 */

interface DSDatePickerProps {
  selectedDay?: number;
  month?: string;
}

export function DSDatePicker({
  selectedDay = 15,
  month = 'Marzo',
}: DSDatePickerProps) {
  const weekdays = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];

  // Build grid: Marzo 2026 starts on Sunday (index 6), pad 6 empty cells
  const emptyCells = 6;
  const totalDays = 31;
  const cells: string[] = [];
  for (let i = 0; i < emptyCells; i++) cells.push('');
  for (let d = 1; d <= totalDays; d++) cells.push(String(d));

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '12px',
        border: '1px solid var(--preview-border, #DEDEDE)',
        boxShadow: '0px 0px 2px rgba(11,15,16,0.12)',
        width: '320px',
        backgroundColor: 'var(--preview-muted-bg, #F6F6F6)',
      }}
    >
      <div
        style={{
          borderRadius: '20px',
          padding: '20px',
          backgroundColor: 'var(--preview-surface, #FFFFFF)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Month header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'var(--font-funnel-display), sans-serif',
              fontWeight: 400,
              color: 'inherit',
            }}
          >
            {month} 2026
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" />
              </svg>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M87.51,56.49a12,12,0,0,1,17-17l80,80a12,12,0,0,1,0,17l-80,80a12,12,0,0,1-17-17L159,128Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Weekday headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0', textAlign: 'center' }}>
          {weekdays.map((d) => (
            <div
              key={d}
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
                fontWeight: 400,
                color: 'color-mix(in srgb, currentColor 35%, transparent)',
                textTransform: 'uppercase',
                padding: '4px 0',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
          {cells.map((day, i) => {
            const dayNum = parseInt(day);
            const isSelected = dayNum === selectedDay;
            const isToday = dayNum === 21;
            return (
              <div
                key={i}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
                  fontWeight: isSelected || isToday ? 500 : 400,
                  color: isSelected
                    ? 'var(--preview-brand-on, #FFFFFF)'
                    : day === ''
                      ? 'transparent'
                      : 'inherit',
                  backgroundColor: isSelected ? 'var(--preview-brand, #0B0B0B)' : 'transparent',
                  borderRadius: '10px',
                  border: isToday && !isSelected ? '1px solid var(--preview-border, #DEDEDE)' : '1px solid transparent',
                  cursor: day ? 'pointer' : 'default',
                }}
              >
                {day || '\u00A0'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
