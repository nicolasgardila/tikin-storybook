'use client';

interface PreviewToolbarProps {
  viewport: 'desktop' | 'mobile';
  onViewportChange: (v: 'desktop' | 'mobile') => void;
  theme: 'light' | 'dark';
  onThemeChange: () => void;
  extra?: React.ReactNode;
}

export function PreviewToolbar({ viewport, onViewportChange, theme, onThemeChange, extra }: PreviewToolbarProps) {
  return (
    <div className="flex items-center gap-1.5 border-t border-[var(--docs-border)] bg-[var(--docs-bg)] px-3 py-1.5">
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onViewportChange('desktop')}
          aria-label="Desktop viewport"
          aria-pressed={viewport === 'desktop'}
          className={`rounded-md p-1.5 transition-colors ${
            viewport === 'desktop'
              ? 'text-[var(--docs-fg)]'
              : 'text-[var(--docs-muted)] hover:text-[var(--docs-fg)]'
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </button>
        <button
          onClick={() => onViewportChange('mobile')}
          aria-label="Mobile viewport"
          aria-pressed={viewport === 'mobile'}
          className={`rounded-md p-1.5 transition-colors ${
            viewport === 'mobile'
              ? 'text-[var(--docs-fg)]'
              : 'text-[var(--docs-muted)] hover:text-[var(--docs-fg)]'
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>
        </button>
      </div>
      <div className="h-4 w-px bg-[var(--docs-border)]" />
      <button
        onClick={onThemeChange}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} preview`}
        className="rounded-md p-1.5 text-[var(--docs-muted)] hover:text-[var(--docs-fg)] transition-colors"
      >
        {theme === 'light' ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      {extra}
    </div>
  );
}
