/**
 * FIGMA SPEC — Breadcrumbs
 *
 * Font: Ubuntu Sans 13px
 * Current item (last): Ubuntu Sans Mono, weight 500
 * Previous items: opacity 0.55, no text-decoration
 * Separator: chevron or slash, padding 0 4px, opacity 0.25
 * Chevron: 12x12 SVG
 */

interface DSBreadcrumbsProps {
  items?: string;
  separator?: 'chevron' | 'slash';
}

export function DSBreadcrumbs({
  items = 'Home, Products, Detail',
  separator = 'chevron',
}: DSBreadcrumbsProps) {
  const itemList = items.split(',').map((t) => t.trim()).filter(Boolean);

  const separatorElement =
    separator === 'slash' ? (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
          opacity: 0.25,
          fontSize: '13px',
        }}
      >
        /
      </span>
    ) : (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
          opacity: 0.25,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ display: 'block' }}
        >
          <path
            d="M4.5 2.5L8 6L4.5 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        fontFamily: "var(--font-ubuntu-sans), 'Ubuntu Sans', sans-serif",
        fontSize: '13px',
      }}
    >
      {itemList.map((item, i) => {
        const isLast = i === itemList.length - 1;
        return (
          <span key={`${item}-${i}`} style={{ display: 'contents' }}>
            {i > 0 && separatorElement}
            {isLast ? (
              <span
                style={{
                  color: 'inherit',
                  fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
                  fontWeight: 500,
                  padding: '4px 0',
                }}
              >
                {item}
              </span>
            ) : (
              <a
                href="#"
                style={{
                  color: 'inherit',
                  opacity: 0.55,
                  textDecoration: 'none',
                  padding: '4px 0',
                }}
              >
                {item}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
