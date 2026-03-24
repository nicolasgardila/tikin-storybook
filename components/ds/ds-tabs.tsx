/**
 * FIGMA SPEC — Tabs
 * Source: /checkbox-ds/tabs.html
 *
 * === CONTAINED VARIANT ===
 * Container:
 *   display: inline-flex, align-items: center
 *   border-radius: 12px, padding: 4px
 *   border: 1px solid
 *   light: bg #FDFDFD, border #E1E1E1
 *   dark:  bg #1A1A1A, border #333333
 *   NO gap between tabs
 *
 * Tab item (all states):
 *   font-family: Ubuntu Sans Mono
 *   text-transform: uppercase
 *   NO letter-spacing specified
 *
 * Active tab:
 *   border-radius: 10px, font-weight: 500
 *   light: bg #EEEEEE, color #0B0B0B
 *   dark:  bg #333333, color #FFFFFF
 *   NO box-shadow
 *
 * Inactive tab:
 *   border-radius: 3px, font-weight: 400
 *   light: bg transparent, color rgba(11,15,16,0.65)
 *   dark:  bg transparent, color rgba(255,255,255,0.45)
 *
 * Desktop size: padding 6px 12px, font-size 14px, line-height 20px
 * Mobile size:  padding 5px 10px, font-size 12px, line-height 18px
 *
 * === UNDERLINE VARIANT ===
 * Container:
 *   display: inline-flex, align-items: center, gap: 0
 *   border-bottom: 0.5px solid
 *   light: border #E1E1E1
 *   dark:  border #333333
 *
 * Active tab:
 *   font-weight: 500
 *   light: color #0B0B0B
 *   dark:  color #FFFFFF
 *   ::after: height 2px, border-radius 2px, bottom -0.5px
 *   light ::after: bg #0B0B0B
 *   dark  ::after: bg #FFFFFF
 *
 * Inactive tab:
 *   font-weight: 400
 *   light: color rgba(11,15,16,0.45)
 *   dark:  color rgba(255,255,255,0.35)
 *
 * Desktop: padding 10px 16px, font-size 14px, line-height 20px
 * Mobile:  padding 8px 12px, font-size 12px, line-height 18px
 */
interface DSTabsProps {
  variant?: 'contained' | 'underline';
  tabs?: string;
  activeTab?: number;
  size?: 'sm' | 'md';
}

/* Figma sizes: md = desktop, sm = mobile */
const containedSizes: Record<string, { padding: string; fontSize: string; lineHeight: string }> = {
  sm: { padding: '5px 10px', fontSize: '12px', lineHeight: '18px' },
  md: { padding: '6px 12px', fontSize: '14px', lineHeight: '20px' },
};

const underlineSizes: Record<string, { padding: string; fontSize: string; lineHeight: string }> = {
  sm: { padding: '8px 12px', fontSize: '12px', lineHeight: '18px' },
  md: { padding: '10px 16px', fontSize: '14px', lineHeight: '20px' },
};

export function DSTabs({
  variant = 'contained',
  tabs = 'Tab 1, Tab 2, Tab 3',
  activeTab = 0,
  size = 'md',
}: DSTabsProps) {
  const tabList = tabs.split(',').map((t) => t.trim()).filter(Boolean);

  if (variant === 'underline') {
    const sz = underlineSizes[size] || underlineSizes.md;
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderBottom: '0.5px solid var(--preview-border)',
        }}
      >
        {tabList.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={`${tab}-${i}`}
              className={!isActive ? 'ds-pressable' : undefined}
              style={{
                padding: sz.padding,
                fontSize: sz.fontSize,
                lineHeight: sz.lineHeight,
                fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
                fontWeight: isActive ? 500 : 400,
                textTransform: 'uppercase',
                color: isActive ? 'inherit' : 'color-mix(in srgb, currentColor 45%, transparent)',
                border: 'none',
                borderBottom: isActive ? '2px solid currentColor' : '2px solid transparent',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                position: 'relative',
                marginBottom: '-0.5px',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    );
  }

  /* Contained variant — Figma: bg #FDFDFD, border 1px #E1E1E1, r12, p4 */
  const sz = containedSizes[size] || containedSizes.md;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'var(--preview-surface, #FDFDFD)',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid var(--preview-border)',
      }}
    >
      {tabList.map((tab, i) => {
        const isActive = i === activeTab;
        return (
          <button
            key={`${tab}-${i}`}
            className={!isActive ? 'ds-pressable' : undefined}
            style={{
              borderRadius: isActive ? '10px' : '3px',
              backgroundColor: isActive
                ? 'var(--preview-muted-bg, #EEEEEE)'
                : 'transparent',
              padding: sz.padding,
              fontSize: sz.fontSize,
              lineHeight: sz.lineHeight,
              fontFamily: 'var(--font-ubuntu-sans-mono), ui-monospace, monospace',
              fontWeight: isActive ? 500 : 400,
              textTransform: 'uppercase',
              color: isActive ? 'inherit' : 'color-mix(in srgb, currentColor 65%, transparent)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
