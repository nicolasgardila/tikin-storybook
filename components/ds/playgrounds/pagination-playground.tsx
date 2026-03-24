'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSPagination } from '@/components/ds/ds-pagination';
import type { PropControl } from '@/components/docs/playground-controls';

const paginationControls: PropControl[] = [
  {
    name: 'totalPages',
    type: 'number',
    defaultValue: 10,
    min: 1,
    max: 50,
  },
  {
    name: 'currentPage',
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 50,
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md'],
  },
];

export function PaginationPlayground() {
  return <ComponentPlayground component={DSPagination} controls={paginationControls} />;
}
