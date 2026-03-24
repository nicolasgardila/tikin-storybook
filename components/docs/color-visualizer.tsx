'use client';

import { useState } from 'react';

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
}

interface ColorGroup {
  name: string;
  description: string;
  colors: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    name: 'Warm Tone',
    description: 'Paneles, tarjetas, wallet, fondos de pagina',
    colors: [
      { name: 'warm-bg', variable: '--ds-warm-bg', hex: '#FAF8F4' },
      { name: 'warm-surface', variable: '--ds-warm-surface', hex: '#F1EFEB' },
      { name: 'warm-border', variable: '--ds-warm-border', hex: '#E8E4DD' },
    ],
  },
  {
    name: 'Neutral Tone',
    description: 'Dialogos, tabs, inputs, contenedores funcionales',
    colors: [
      { name: 'neutral-bg', variable: '--ds-neutral-bg', hex: '#F6F6F6' },
      { name: 'neutral-surface', variable: '--ds-neutral-surface', hex: '#FFFFFF' },
      { name: 'neutral-border', variable: '--ds-neutral-border', hex: '#DEDEDE' },
    ],
  },
  {
    name: 'Brand',
    description: 'Accion primaria y enfasis',
    colors: [
      { name: 'brand', variable: '--ds-brand', hex: '#0B0B0B' },
      { name: 'brand-on', variable: '--ds-brand-on', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Texto',
    description: 'Colores de texto transversales',
    colors: [
      { name: 'primary', variable: '', hex: '#0B0B0B' },
      { name: 'secondary', variable: '', hex: '#666666' },
      { name: 'muted', variable: '', hex: '#999999' },
    ],
  },
  {
    name: 'Estado',
    description: 'Feedback de sistema',
    colors: [
      { name: 'success', variable: '', hex: '#2ECC71' },
      { name: 'error', variable: '', hex: '#E74C3C' },
      { name: 'warning', variable: '', hex: '#F39C12' },
    ],
  },
];

const lightHexValues = new Set(['#FAF8F4', '#F1EFEB', '#E8E4DD', '#F6F6F6', '#FFFFFF', '#DEDEDE']);

function isLightColor(hex: string): boolean {
  return lightHexValues.has(hex.toUpperCase());
}

function isDarkColor(hex: string): boolean {
  return hex.toUpperCase() === '#0B0B0B';
}

export function ColorVisualizer() {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(token: ColorToken) {
    const text = token.variable || token.hex;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(token.name);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      console.warn('Clipboard API not available. Color token not copied.');
    }
  }

  return (
    <div className="my-6 space-y-8">
      {colorGroups.map((group) => (
        <div key={group.name}>
          <h3 className="mb-1 text-base font-semibold text-[var(--docs-fg)]">
            {group.name}
          </h3>
          <p className="mb-3 text-sm text-[var(--docs-muted)]">
            {group.description}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleCopy(color)}
                className="group relative overflow-hidden rounded-lg border border-[var(--docs-border)] text-left transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--ds-brand)]/40"
              >
                {/* Color swatch */}
                <div
                  className="relative h-20"
                  style={{
                    backgroundColor: color.hex,
                    border: isLightColor(color.hex) ? '1px solid var(--docs-border)' : undefined,
                    borderBottom: 'none',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                  }}
                >
                  {/* Copied feedback */}
                  {copied === color.name && (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
                      style={{ color: isDarkColor(color.hex) ? '#FFFFFF' : '#0B0B0B' }}
                    >
                      Copiado!
                    </span>
                  )}
                </div>
                {/* Token info */}
                <div className="space-y-0.5 bg-[var(--docs-bg)] px-3 py-2.5">
                  <div className="text-sm font-medium text-[var(--docs-fg)]">
                    {color.name}
                  </div>
                  {color.variable && (
                    <div className="font-mono text-xs text-[var(--docs-muted)]">
                      {color.variable}
                    </div>
                  )}
                  <div className="font-mono text-xs text-[var(--docs-muted)]">
                    {color.hex}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
