import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { getDecoratedTree } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={getDecoratedTree()}
      nav={{
        title: (
          <Image
            src="/logo-white.png"
            alt="Black Cash DS"
            width={80}
            height={20}
            style={{ objectFit: 'contain' }}
          />
        ),
      }}
      links={[
        { type: 'main', text: 'Docs', url: '/docs', active: 'nested-url' },
        {
          type: 'main',
          text: 'Componentes',
          url: '/docs/components',
          active: 'nested-url',
        },
        {
          type: 'main',
          text: 'Foundations',
          url: '/docs/foundations',
          active: 'nested-url',
        },
        {
          type: 'main',
          text: 'Guias',
          url: '/docs/guides',
          active: 'nested-url',
        },
      ]}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
