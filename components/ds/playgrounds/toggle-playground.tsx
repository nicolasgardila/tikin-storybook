'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSToggle } from '@/components/ds/ds-toggle';
import type { PropControl } from '@/components/docs/playground-controls';

const toggleControls: PropControl[] = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Notificaciones push',
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md'],
  },
];

export function TogglePlayground() {
  return <ComponentPlayground component={DSToggle} controls={toggleControls} />;
}
