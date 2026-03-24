'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSBottomSheet } from '@/components/ds/ds-bottom-sheet';
import type { PropControl } from '@/components/docs/playground-controls';

const bottomSheetControls: PropControl[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Titulo',
  },
  {
    name: 'showHandle',
    type: 'boolean',
    defaultValue: true,
  },
];

export function BottomSheetPlayground() {
  return <ComponentPlayground component={DSBottomSheet} controls={bottomSheetControls} />;
}
