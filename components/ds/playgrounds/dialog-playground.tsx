'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSDialog } from '@/components/ds/ds-dialog';
import type { PropControl } from '@/components/docs/playground-controls';

const dialogControls: PropControl[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Confirmar accion',
  },
  {
    name: 'description',
    type: 'text',
    defaultValue: 'Esta seguro de que deseas continuar? Esta accion no se puede deshacer.',
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    defaultValue: true,
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'confirmation',
    options: ['confirmation', 'destructive'],
  },
];

export function DialogPlayground() {
  return <ComponentPlayground component={DSDialog} controls={dialogControls} />;
}
