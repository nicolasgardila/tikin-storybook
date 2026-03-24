'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSTextField } from '@/components/ds/ds-text-field';
import type { PropControl } from '@/components/docs/playground-controls';

const textFieldControls: PropControl[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['xs', 'sm', 'md', 'lg'],
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
    options: ['default', 'success', 'error'],
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Label',
  },
  {
    name: 'placeholder',
    type: 'text',
    defaultValue: 'Placeholder',
  },
  {
    name: 'showIcon',
    type: 'boolean',
    defaultValue: false,
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

export function TextFieldPlayground() {
  return <ComponentPlayground component={DSTextField} controls={textFieldControls} />;
}
