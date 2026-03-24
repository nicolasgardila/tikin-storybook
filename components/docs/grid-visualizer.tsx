'use client';

import { useState } from 'react';

const breakpoints = [
  {
    name: 'Desktop',
    label: '> 1024px',
    columns: 12,
    gutter: 16,
    margin: 24,
    maxWidth: 1280,
  },
  {
    name: 'Tablet',
    label: '768–1024px',
    columns: 8,
    gutter: 16,
    margin: 20,
    maxWidth: null,
  },
  {
    name: 'Mobile',
    label: '< 768px',
    columns: 4,
    gutter: 12,
    margin: 16,
    maxWidth: null,
  },
] as const;

type Breakpoint = (typeof breakpoints)[number];

export function GridVisualizer() {
  const [selected, setSelected] = useState<number>(0);
  const bp = breakpoints[selected];

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[var(--docs-border)]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-[var(--docs-border)] bg-[var(--docs-bg)] px-3 py-2">
        <div className="flex items-center gap-1 rounded-md bg-[var(--docs-border)]/30 p-0.5">
          {breakpoints.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setSelected(i)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                selected === i
                  ? 'bg-[var(--docs-bg)] text-[var(--docs-fg)] shadow-sm'
                  : 'text-[var(--docs-muted)] hover:text-[var(--docs-fg)]'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-xs text-[var(--docs-muted)]">{bp.label}</span>
      </div>

      {/* Grid visualization */}
      <div className="bg-[var(--docs-bg)] p-4">
        <div
          className="relative mx-auto"
          style={{
            maxWidth: bp.maxWidth ? `${bp.maxWidth}px` : '100%',
          }}
        >
          {/* Grid container with margins */}
          <div
            className="relative overflow-hidden rounded-md"
            style={{
              padding: `0 ${bp.margin}px`,
              background: 'var(--docs-border)',
              opacity: 0.15,
              position: 'absolute',
              inset: 0,
              borderRadius: '0.375rem',
            }}
          />
          <div
            className="relative"
            style={{
              padding: `0 ${bp.margin}px`,
            }}
          >
            {/* Margin labels */}
            <div
              className="absolute top-0 left-0 h-full flex items-center justify-center text-[10px] text-[var(--docs-muted)]"
              style={{ width: `${bp.margin}px` }}
            >
              <span className="rotate-[-90deg] whitespace-nowrap">{bp.margin}px</span>
            </div>
            <div
              className="absolute top-0 right-0 h-full flex items-center justify-center text-[10px] text-[var(--docs-muted)]"
              style={{ width: `${bp.margin}px` }}
            >
              <span className="rotate-[90deg] whitespace-nowrap">{bp.margin}px</span>
            </div>

            {/* Columns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${bp.columns}, 1fr)`,
                gap: `${bp.gutter}px`,
                height: '180px',
              }}
            >
              {Array.from({ length: bp.columns }, (_, i) => (
                <div
                  key={i}
                  className="relative rounded-sm flex flex-col items-center"
                  style={{
                    background: 'color-mix(in srgb, var(--ds-brand) 8%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--ds-brand) 15%, transparent)',
                  }}
                >
                  <span
                    className="mt-2 text-[10px] font-medium"
                    style={{ color: 'color-mix(in srgb, var(--ds-brand) 50%, transparent)' }}
                  >
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid specs */}
      <div className="grid grid-cols-4 border-t border-[var(--docs-border)] text-center">
        <Spec label="Columnas" value={String(bp.columns)} />
        <Spec label="Gutter" value={`${bp.gutter}px`} />
        <Spec label="Margen" value={`${bp.margin}px`} />
        <Spec label="Ancho max" value={bp.maxWidth ? `${bp.maxWidth}px` : '100%'} />
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-[var(--docs-border)] last:border-r-0 py-3 px-2">
      <div className="text-[11px] text-[var(--docs-muted)]">{label}</div>
      <div className="text-sm font-medium text-[var(--docs-fg)] mt-0.5">{value}</div>
    </div>
  );
}
