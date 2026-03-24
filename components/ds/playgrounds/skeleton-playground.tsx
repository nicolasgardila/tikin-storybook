'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSkeleton } from '@/components/ds/ds-skeleton';
import type { PropControl } from '@/components/docs/playground-controls';

const skeletonControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'text',
    options: ['text', 'circle', 'rectangle'],
  },
  {
    name: 'width',
    type: 'text',
    defaultValue: '200px',
  },
  {
    name: 'height',
    type: 'text',
    defaultValue: '16px',
  },
];

export function SkeletonPlayground() {
  return <ComponentPlayground component={DSSkeleton} controls={skeletonControls} />;
}
