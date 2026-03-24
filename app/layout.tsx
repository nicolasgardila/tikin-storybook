import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { funnelDisplay, ubuntuSans, ubuntuSansMono } from '@/lib/fonts';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${funnelDisplay.variable} ${ubuntuSans.variable} ${ubuntuSansMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
