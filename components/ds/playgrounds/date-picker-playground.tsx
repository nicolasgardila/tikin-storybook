'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSDatePicker } from '@/components/ds/ds-date-picker';
import type { PropControl } from '@/components/docs/playground-controls';

const datePickerControls: PropControl[] = [
  {
    name: 'selectedDay',
    type: 'number',
    defaultValue: 15,
    min: 1,
    max: 31,
  },
  {
    name: 'month',
    type: 'text',
    defaultValue: 'Marzo',
  },
];

export function DatePickerPlayground() {
  return <ComponentPlayground component={DSDatePicker} controls={datePickerControls} />;
}
