/**
 * FIGMA SPEC — Pagination
 *
 * Buttons: 32x32 r10 (default), Ubuntu Sans Mono 13px, weight 500
 * Active: bg #0B0B0B, color #FFFFFF
 * Inactive: bg transparent, opacity 0.55
 * Arrows: 16x16 SVG chevron, r10 button
 * Gap: 4px between buttons
 * Size sm: 28x28 buttons, 12px font
 */

interface DSPaginationProps {
  totalPages?: number;
  currentPage?: number;
  size?: 'sm' | 'md';
}

export function DSPagination({
  totalPages = 10,
  currentPage = 1,
  size = 'md',
}: DSPaginationProps) {
  const total = Math.max(1, Math.min(50, totalPages));
  const current = Math.max(1, Math.min(total, currentPage));

  const btnSize = size === 'sm' ? '28px' : '32px';
  const fontSize = size === 'sm' ? '12px' : '13px';
  const iconSize = size === 'sm' ? 14 : 16;

  /* Build visible page range with ellipsis */
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
  }

  const btnBase: React.CSSProperties = {
    width: btnSize,
    height: btnSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
    fontWeight: 500,
    fontSize,
    lineHeight: 1,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
        fontSize,
      }}
    >
      {/* Prev */}
      <button
        className={current !== 1 ? 'ds-pressable' : undefined}
        style={{
          ...btnBase,
          backgroundColor: 'transparent',
          color: 'inherit',
          opacity: current === 1 ? 0.25 : 1,
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none">
          <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Pages */}
      {pages.map((page, i) =>
        typeof page === 'string' ? (
          <span
            key={`ellipsis-${i}`}
            style={{
              width: btnSize,
              height: btnSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
              opacity: 0.3,
              fontSize,
              fontFamily: "var(--font-ubuntu-sans-mono), 'Ubuntu Sans Mono', monospace",
              letterSpacing: '1px',
            }}
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={page !== current ? 'ds-pressable' : undefined}
            style={{
              ...btnBase,
              backgroundColor: page === current ? 'var(--preview-brand)' : 'transparent',
              color: page === current ? 'var(--preview-brand-on)' : 'inherit',
              opacity: page === current ? 1 : 0.55,
            }}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className={current !== total ? 'ds-pressable' : undefined}
        style={{
          ...btnBase,
          backgroundColor: 'transparent',
          color: 'inherit',
          opacity: current === total ? 0.25 : 1,
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
