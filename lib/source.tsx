import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import type * as PageTree from 'fumadocs-core/page-tree';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

/** Return the page tree without status dot decorations */
export function getDecoratedTree(): PageTree.Root {
  return source.pageTree;
}
