'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSButton } from '@/components/ds/ds-button';
import type { PropControl } from '@/components/docs/playground-controls';

const buttonControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: ['primary', 'secondary', 'ghost'],
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
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'children',
    type: 'text',
    defaultValue: 'Continuar',
    label: 'label',
  },
];

export function ButtonsPlayground() {
  return <ComponentPlayground component={DSButton} controls={buttonControls} />;
}
