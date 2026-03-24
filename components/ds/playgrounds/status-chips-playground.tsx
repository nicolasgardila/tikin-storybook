'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSStatusChips } from '@/components/ds/ds-status-chips';
import type { PropControl } from '@/components/docs/playground-controls';

const statusChipsControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'success',
    options: ['success', 'warning', 'error', 'info', 'neutral', 'brand'],
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Activo',
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'sm',
    options: ['xs', 'sm', 'md'],
  },
];

export function StatusChipsPlayground() {
  return <ComponentPlayground component={DSStatusChips} controls={statusChipsControls} />;
}
