'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSTable } from '@/components/ds/ds-table';
import type { PropControl } from '@/components/docs/playground-controls';

const tableControls: PropControl[] = [
  {
    name: 'rows',
    type: 'number',
    defaultValue: 5,
    min: 3,
    max: 10,
  },
  {
    name: 'showHeader',
    type: 'boolean',
    defaultValue: true,
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
];

export function TablePlayground() {
  return <ComponentPlayground component={DSTable} controls={tableControls} />;
}
