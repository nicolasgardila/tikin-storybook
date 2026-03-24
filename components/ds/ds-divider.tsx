/**
 * FIGMA SPECS — Divider
 *
 * Hairline: 0.5px
 * Label: Ubuntu Sans Mono 11px uppercase, letter-spacing 0.5px
 *
 * Variants:
 *   neutral: #DEDEDE light / #333333 dark
 *   warm:    #E8E4DD light / #2A2826 dark
 *   subtle:  rgba(0,0,0,0.08) light / rgba(255,255,255,0.08) dark
 *   strong:  #0B0B0B light / #FFFFFF dark
 */

interface DSDividerProps {
  variant?: 'neutral' | 'warm' | 'subtle' | 'strong';
  label?: string;
  showLabel?: boolean;
}

const variantColors: Record<string, string> = {
  neutral: 'var(--preview-border, #DEDEDE)',
  warm: 'var(--preview-border, #E8E4DD)',
  subtle: 'color-mix(in srgb, currentColor 8%, transparent)',
  strong: 'var(--preview-brand, #0B0B0B)',
};

export function DSDivider({
  variant = 'neutral',
  label = 'Section',
  showLabel = false,
}: DSDividerProps) {
  const color = variantColors[variant] || variantColors.neutral;

  if (showLabel) {
    return (
      <div
        role="separator"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div style={{ flex: 1, height: '0.5px', backgroundColor: color }} />
        <span
          style={{
            padding: '0 12px',
            fontSize: '11px',
            fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
            fontWeight: 400,
            color: 'color-mix(in srgb, currentColor 35%, transparent)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: '0.5px', backgroundColor: color }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      style={{
        width: '100%',
        height: '0.5px',
        backgroundColor: color,
      }}
    />
  );
}
