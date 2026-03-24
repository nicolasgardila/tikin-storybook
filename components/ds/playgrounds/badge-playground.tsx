'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSBadge } from '@/components/ds/ds-badge';
import type { PropControl } from '@/components/docs/playground-controls';

const badgeControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'count',
    options: ['count', 'dot'],
  },
  {
    name: 'count',
    type: 'number',
    defaultValue: 3,
    min: 0,
    max: 99,
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: 99,
    min: 1,
    max: 999,
  },
  {
    name: 'showZero',
    type: 'boolean',
    defaultValue: false,
  },
];

export function BadgePlayground() {
  return <ComponentPlayground component={DSBadge} controls={badgeControls} />;
}
