'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSChip } from '@/components/ds/ds-chip';
import type { PropControl } from '@/components/docs/playground-controls';

const chipControls: PropControl[] = [
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Etiqueta',
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'active', 'disabled'],
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'showClose',
    type: 'boolean',
    defaultValue: false,
  },
];

export function ChipPlayground() {
  return <ComponentPlayground component={DSChip} controls={chipControls} />;
}
