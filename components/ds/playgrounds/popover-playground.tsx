'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSPopover } from '@/components/ds/ds-popover';
import type { PropControl } from '@/components/docs/playground-controls';

const popoverControls: PropControl[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Opciones',
  },
  {
    name: 'showArrow',
    type: 'boolean',
    defaultValue: true,
  },
];

export function PopoverPlayground() {
  return <ComponentPlayground component={DSPopover} controls={popoverControls} />;
}
