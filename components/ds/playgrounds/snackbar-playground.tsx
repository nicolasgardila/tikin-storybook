'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSnackbar } from '@/components/ds/ds-snackbar';
import type { PropControl } from '@/components/docs/playground-controls';

const snackbarControls: PropControl[] = [
  {
    name: 'message',
    type: 'text',
    defaultValue: 'Operacion exitosa',
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'info',
    options: ['info', 'success', 'error', 'warning'],
  },
  {
    name: 'showAction',
    type: 'boolean',
    defaultValue: false,
  },
];

export function SnackbarPlayground() {
  return <ComponentPlayground component={DSSnackbar} controls={snackbarControls} />;
}
