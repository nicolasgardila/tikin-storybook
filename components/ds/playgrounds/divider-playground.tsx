'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSDivider } from '@/components/ds/ds-divider';
import type { PropControl } from '@/components/docs/playground-controls';

const dividerControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'neutral',
    options: ['neutral', 'warm', 'subtle', 'strong'],
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Section',
  },
  {
    name: 'showLabel',
    type: 'boolean',
    defaultValue: false,
  },
];

export function DividerPlayground() {
  return <ComponentPlayground component={DSDivider} controls={dividerControls} />;
}
