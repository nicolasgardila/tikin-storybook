'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSCard } from '@/components/ds/ds-card';
import type { PropControl } from '@/components/docs/playground-controls';

const cardControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'neutral', 'filled', 'elevated', 'outline'],
  },
  {
    name: 'padding',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'compact'],
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
];

export function CardPlayground() {
  return <ComponentPlayground component={DSCard} controls={cardControls} />;
}
