'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSRadioButton } from '@/components/ds/ds-radio-button';
import type { PropControl } from '@/components/docs/playground-controls';

const radioButtonControls: PropControl[] = [
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
    defaultValue: 'Opcion 1',
  },
];

export function RadioButtonPlayground() {
  return <ComponentPlayground component={DSRadioButton} controls={radioButtonControls} />;
}
