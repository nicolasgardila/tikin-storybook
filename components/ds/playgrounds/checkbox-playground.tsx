'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSCheckbox } from '@/components/ds/ds-checkbox';
import type { PropControl } from '@/components/docs/playground-controls';

const checkboxControls: PropControl[] = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'indeterminate',
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
    defaultValue: 'Acepto los terminos',
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md'],
  },
];

export function CheckboxPlayground() {
  return <ComponentPlayground component={DSCheckbox} controls={checkboxControls} />;
}
