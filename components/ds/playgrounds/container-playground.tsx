'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSContainer } from '@/components/ds/ds-container';
import type { PropControl } from '@/components/docs/playground-controls';

const containerControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'double',
    options: ['double', 'simple', 'warm'],
  },
  {
    name: 'padding',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'compact'],
  },
];

export function ContainerPlayground() {
  return <ComponentPlayground component={DSContainer} controls={containerControls} />;
}
