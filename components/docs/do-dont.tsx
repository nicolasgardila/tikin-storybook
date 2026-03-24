import type { ReactNode } from 'react';

interface DoDontProps {
  type: 'do' | 'dont';
  children: ReactNode;
}

export function DoDont({ type, children }: DoDontProps) {
  const isDo = type === 'do';

  return (
    <div
      className={`my-4 rounded-lg border p-4 ${
        isDo
          ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10'
          : 'border-red-500/30 bg-red-50/50 dark:bg-red-950/10'
      }`}
    >
      <div className="mb-1.5 flex items-center gap-2">
        {isDo ? (
          <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
        <span className={`text-[13px] font-semibold ${
          isDo ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
        }`}>
          {isDo ? 'Do' : "Don't"}
        </span>
      </div>
      <div className="text-[13px] text-[var(--docs-muted)] leading-relaxed pl-6">
        {children}
      </div>
    </div>
  );
}
