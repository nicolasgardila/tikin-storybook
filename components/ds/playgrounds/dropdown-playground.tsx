'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSDropdown } from '@/components/ds/ds-dropdown';
import type { PropControl } from '@/components/docs/playground-controls';

const dropdownControls: PropControl[] = [
  {
    name: 'state',
    type: 'select',
    defaultValue: 'active',
    options: ['default', 'active'],
  },
  {
    name: 'label',
    type: 'text',
    defaultValue: 'Opciones',
  },
];

export function DropdownPlayground() {
  return <ComponentPlayground component={DSDropdown} controls={dropdownControls} />;
}
