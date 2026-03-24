'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSTabs } from '@/components/ds/ds-tabs';
import type { PropControl } from '@/components/docs/playground-controls';

const tabsControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'contained',
    options: ['contained', 'underline'],
  },
  {
    name: 'tabs',
    type: 'text',
    defaultValue: 'Tab 1, Tab 2, Tab 3',
    label: 'tabs (comma-separated)',
  },
  {
    name: 'activeTab',
    type: 'number',
    defaultValue: 0,
    min: 0,
    max: 4,
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md'],
  },
];

export function TabsPlayground() {
  return <ComponentPlayground component={DSTabs} controls={tabsControls} />;
}
