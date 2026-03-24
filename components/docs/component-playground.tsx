'use client';

import { useState, type ReactNode, type ComponentType } from 'react';
import { ControlRow, type PropControl } from './playground-controls';
import { PreviewToolbar } from './preview-toolbar';

interface ComponentPlaygroundProps {
  component: ComponentType<any>;
  controls: PropControl[];
  children?: ReactNode;
}

export function ComponentPlayground({ component: Component, controls, children }: ComponentPlaygroundProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize state from control defaultValues
  const [propValues, setPropValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    for (const control of controls) {
      initial[control.name] = control.defaultValue;
    }
    return initial;
  });

  const handleControlChange = (name: string, value: any) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[var(--docs-border)]">
      {/* Preview area — isolated from docs site theme */}
      <div
        className="ds-preview-area flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: theme === 'dark' ? '#0B0B0B' : '#FAF8F4',
          color: theme === 'dark' ? '#FFFFFF' : '#0B0B0B',
          padding: '2.5rem 1.5rem',
          minHeight: '120px',
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Component {...propValues} />
          {children}
        </div>
      </div>

      {/* Bottom toolbar + controls */}
      <div className="bg-[var(--docs-bg)]">
        {/* Toolbar row */}
        <PreviewToolbar viewport={viewport} onViewportChange={setViewport} theme={theme} onThemeChange={() => setTheme(t => t === 'light' ? 'dark' : 'light')} extra={<><div className="flex-1" /><span className="text-[11px] font-medium text-[var(--docs-muted)] uppercase tracking-wider">Controls</span></>} />

        {/* Control rows */}
        {controls.map((control) => (
          <ControlRow
            key={control.name}
            control={control}
            value={propValues[control.name]}
            onChange={handleControlChange}
          />
        ))}
      </div>
    </div>
  );
}
