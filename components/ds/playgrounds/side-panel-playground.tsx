'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSidePanel } from '@/components/ds/ds-side-panel';
import type { PropControl } from '@/components/docs/playground-controls';

const sidePanelControls: PropControl[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Detalles',
  },
  {
    name: 'width',
    type: 'select',
    defaultValue: '464',
    options: ['320', '400', '464'],
  },
];

export function SidePanelPlayground() {
  return <ComponentPlayground component={DSSidePanel} controls={sidePanelControls} />;
}
