'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSearchBar } from '@/components/ds/ds-search-bar';
import type { PropControl } from '@/components/docs/playground-controls';

const searchBarControls: PropControl[] = [
  {
    name: 'placeholder',
    type: 'text',
    defaultValue: 'Buscar...',
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
];

export function SearchBarPlayground() {
  return <ComponentPlayground component={DSSearchBar} controls={searchBarControls} />;
}
