'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSelect } from '@/components/ds/ds-select';
import type { PropControl } from '@/components/docs/playground-controls';

const selectControls: PropControl[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'state',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'active', 'disabled'],
  },
  {
    name: 'feedback',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'error'],
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Seleccionar...',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'errorMessage',
    type: 'text',
    defaultValue: 'Mensaje de error',
    label: 'error message',
  },
];

export function SelectPlayground() {
  return <ComponentPlayground component={DSSelect} controls={selectControls} />;
}
