'use client';

// Prop control definition types
export type ControlType = 'select' | 'boolean' | 'text' | 'number';

export interface PropControl {
  name: string;
  type: ControlType;
  defaultValue: any;
  options?: string[];  // for 'select' type
  label?: string;      // display label (defaults to name)
  min?: number;        // for 'number' type
  max?: number;        // for 'number' type
}

interface ControlRowProps {
  control: PropControl;
  value: any;
  onChange: (name: string, value: any) => void;
}

const monoFont = 'var(--font-ubuntu-sans-mono), ui-monospace, monospace';

export function ControlRow({ control, value, onChange }: ControlRowProps) {
  const label = control.label || control.name;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderBottom: '1px solid var(--docs-border)',
        gap: '12px',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--docs-fg)',
          fontFamily: monoFont,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>

      {/* Control */}
      <div style={{ flexShrink: 0 }}>
        {control.type === 'select' && (
          <select
            id={`control-${control.name}`}
            aria-label={label}
            value={value}
            onChange={(e) => onChange(control.name, e.target.value)}
            style={{
              fontSize: '13px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--docs-border)',
              backgroundColor: 'transparent',
              color: 'var(--docs-fg)',
              cursor: 'pointer',
              fontFamily: monoFont,
            }}
          >
            {control.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {control.type === 'boolean' && (
          <button
            role="switch"
            aria-checked={value}
            aria-label={label}
            onClick={() => onChange(control.name, !value)}
            style={{
              position: 'relative',
              width: '32px',
              height: '18px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: value ? 'var(--docs-fg)' : 'var(--docs-border)',
              cursor: 'pointer',
              transition: 'background-color 200ms ease',
              padding: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '2px',
                left: value ? '16px' : '2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: value ? 'var(--docs-bg)' : '#FFFFFF',
                transition: 'left 200ms ease',
              }}
            />
          </button>
        )}

        {control.type === 'text' && (
          <input
            id={`control-${control.name}`}
            aria-label={label}
            type="text"
            value={value}
            onChange={(e) => onChange(control.name, e.target.value)}
            style={{
              fontSize: '13px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--docs-border)',
              backgroundColor: 'transparent',
              color: 'var(--docs-fg)',
              width: '140px',
              fontFamily: monoFont,
            }}
          />
        )}

        {control.type === 'number' && (
          <input
            id={`control-${control.name}`}
            aria-label={label}
            type="number"
            value={value}
            min={control.min}
            max={control.max}
            onChange={(e) => onChange(control.name, Number(e.target.value))}
            style={{
              fontSize: '13px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--docs-border)',
              backgroundColor: 'transparent',
              color: 'var(--docs-fg)',
              width: '80px',
              fontFamily: monoFont,
            }}
          />
        )}
      </div>
    </div>
  );
}
