'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSTooltip } from '@/components/ds/ds-tooltip';
import type { PropControl } from '@/components/docs/playground-controls';

const tooltipControls: PropControl[] = [
  {
    name: 'text',
    type: 'text',
    defaultValue: 'Tooltip content',
  },
  {
    name: 'position',
    type: 'select',
    defaultValue: 'top',
    options: ['top', 'bottom', 'left', 'right'],
  },
];

export function TooltipPlayground() {
  return <ComponentPlayground component={DSTooltip} controls={tooltipControls} />;
}
