'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSAccordion } from '@/components/ds/ds-accordion';
import type { PropControl } from '@/components/docs/playground-controls';

const accordionControls: PropControl[] = [
  {
    name: 'items',
    type: 'text',
    defaultValue: 'Item 1, Item 2, Item 3',
    label: 'items (comma-separated)',
  },
  {
    name: 'openIndex',
    type: 'number',
    defaultValue: 0,
    min: -1,
    max: 5,
  },
];

export function AccordionPlayground() {
  return <ComponentPlayground component={DSAccordion} controls={accordionControls} />;
}
