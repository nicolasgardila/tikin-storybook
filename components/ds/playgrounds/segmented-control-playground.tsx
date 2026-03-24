'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSegmentedControl } from '@/components/ds/ds-segmented-control';
import type { PropControl } from '@/components/docs/playground-controls';

const segmentedControlControls: PropControl[] = [
  {
    name: 'tabs',
    type: 'text',
    defaultValue: 'Tab 1, Tab 2, Tab 3',
  },
  {
    name: 'activeTab',
    type: 'number',
    defaultValue: 0,
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md'],
  },
];

export function SegmentedControlPlayground() {
  return <ComponentPlayground component={DSSegmentedControl} controls={segmentedControlControls} />;
}
