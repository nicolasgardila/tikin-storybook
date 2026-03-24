'use client';

import { useState, type ReactNode } from 'react';
import { PreviewToolbar } from './preview-toolbar';

interface ComponentPreviewProps {
  children: ReactNode;
}

export function ComponentPreview({ children }: ComponentPreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-preview-box className="not-prose mt-6 mb-0 overflow-hidden rounded-t-lg rounded-b-none border border-b-0 border-[var(--docs-border)]">
      {/* Preview area — isolated from docs site theme */}
      <div
        className="ds-preview-area flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: theme === 'dark' ? '#0B0B0B' : '#FAF8F4',
          color: theme === 'dark' ? '#FFFFFF' : '#0B0B0B',
          padding: '2.5rem 1.5rem',
          minHeight: '140px',
          '--preview-brand': theme === 'dark' ? '#FFFFFF' : '#0B0B0B',
          '--preview-brand-on': theme === 'dark' ? '#0B0B0B' : '#FFFFFF',
          '--preview-surface': theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          '--preview-border': theme === 'dark' ? '#333333' : '#DEDEDE',
          '--preview-muted-bg': theme === 'dark' ? '#171717' : '#F6F6F6',
          '--preview-error-bg': theme === 'dark' ? 'rgba(236,34,31,0.08)' : '#FEE9E7',
        } as React.CSSProperties}
      >
        <div
          className="w-full transition-all duration-200"
          style={{
            maxWidth: viewport === 'mobile' ? '375px' : '100%',
          }}
        >
          {children}
        </div>
      </div>

      {/* Toolbar — bottom bar */}
      <PreviewToolbar viewport={viewport} onViewportChange={setViewport} theme={theme} onThemeChange={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
    </div>
  );
}
