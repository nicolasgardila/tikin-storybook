'use client';

import { useState } from 'react';

const typeScale = [
  { name: '5xl', size: '48px', lineHeight: '48px' },
  { name: '4xl', size: '36px', lineHeight: '40px' },
  { name: '3xl', size: '30px', lineHeight: '36px' },
  { name: '2xl', size: '24px', lineHeight: '32px' },
  { name: 'xl', size: '20px', lineHeight: '28px' },
  { name: 'lg', size: '18px', lineHeight: '28px' },
  { name: 'base', size: '16px', lineHeight: '24px' },
  { name: 'sm', size: '14px', lineHeight: '20px' },
  { name: 'xs', size: '12px', lineHeight: '16px' },
];

const fonts = [
  {
    name: 'Funnel Display',
    cssVar: 'var(--font-funnel-display)',
    tailwind: 'font-ds-display',
    role: 'Titulos y labels de componente',
    sampleText: 'Bienvenido a Black Cash',
    weights: [
      { name: 'Regular', value: 400 },
      { name: 'Bold', value: 700 },
    ],
  },
  {
    name: 'Ubuntu Sans',
    cssVar: 'var(--font-ubuntu-sans)',
    tailwind: 'font-ds-body',
    role: 'Texto de cuerpo',
    sampleText: 'El sistema de diseno para tu producto fintech',
    weights: [
      { name: 'Regular', value: 400 },
      { name: 'Medium', value: 500 },
      { name: 'Semi-bold', value: 600 },
      { name: 'Bold', value: 700 },
    ],
  },
  {
    name: 'Ubuntu Sans Mono',
    cssVar: 'var(--font-ubuntu-sans-mono)',
    tailwind: 'font-ds-mono',
    role: 'Numeros y CTAs',
    sampleText: '$12,450.00',
    weights: [
      { name: 'Regular', value: 400 },
      { name: 'Medium', value: 500 },
      { name: 'Bold', value: 700 },
    ],
  },
];

export function TypeSpecimen() {
  const [activeWeights, setActiveWeights] = useState<Record<string, number>>({
    'Funnel Display': 400,
    'Ubuntu Sans': 400,
    'Ubuntu Sans Mono': 400,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {fonts.map((font) => (
        <section
          key={font.name}
          style={{
            border: '1px solid var(--docs-border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--docs-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--docs-fg)',
                    fontFamily: `${font.cssVar}, system-ui, sans-serif`,
                  }}
                >
                  {font.name}
                </h3>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '13px',
                    color: 'var(--docs-muted)',
                  }}
                >
                  {font.role} &middot;{' '}
                  <code
                    style={{
                      fontSize: '12px',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: 'var(--docs-border)',
                      color: 'var(--docs-fg)',
                    }}
                  >
                    {font.tailwind}
                  </code>
                </p>
              </div>
            </div>

            {/* Weight selector */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                flexWrap: 'wrap',
              }}
            >
              {font.weights.map((w) => {
                const isActive = activeWeights[font.name] === w.value;
                return (
                  <button
                    key={w.value}
                    onClick={() =>
                      setActiveWeights((prev) => ({
                        ...prev,
                        [font.name]: w.value,
                      }))
                    }
                    style={{
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500,
                      borderRadius: '9999px',
                      border: isActive
                        ? '1px solid var(--docs-accent)'
                        : '1px solid var(--docs-border)',
                      background: isActive
                        ? 'var(--docs-accent)'
                        : 'transparent',
                      color: isActive
                        ? 'var(--docs-bg)'
                        : 'var(--docs-muted)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {w.name} ({w.value})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specimen rows */}
          <div style={{ padding: '8px 0' }}>
            {typeScale.map((scale, idx) => (
              <div
                key={scale.name}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '10px 24px',
                  gap: '20px',
                  borderBottom:
                    idx < typeScale.length - 1
                      ? '1px solid color-mix(in srgb, var(--docs-border) 50%, transparent)'
                      : 'none',
                }}
              >
                {/* Size label */}
                <div
                  style={{
                    minWidth: '72px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--docs-fg)',
                    }}
                  >
                    {scale.name}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--docs-muted)',
                    }}
                  >
                    {scale.size} / {scale.lineHeight}
                  </span>
                </div>

                {/* Rendered sample */}
                <span
                  style={{
                    fontFamily: `${font.cssVar}, system-ui, sans-serif`,
                    fontSize: scale.size,
                    lineHeight: scale.lineHeight,
                    fontWeight: activeWeights[font.name],
                    color: 'var(--docs-fg)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {font.sampleText}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
