'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSProgressBar } from '@/components/ds/ds-progress-bar';
import type { PropControl } from '@/components/docs/playground-controls';

const progressBarControls: PropControl[] = [
  {
    name: 'value',
    type: 'number',
    defaultValue: 60,
    min: 0,
    max: 100,
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'bar',
    options: ['bar', 'steps'],
  },
  {
    name: 'steps',
    type: 'number',
    defaultValue: 4,
    min: 2,
    max: 8,
  },
];

export function ProgressBarPlayground() {
  return <ComponentPlayground component={DSProgressBar} controls={progressBarControls} />;
}
