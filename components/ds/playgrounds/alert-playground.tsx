'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSAlert } from '@/components/ds/ds-alert';
import type { PropControl } from '@/components/docs/playground-controls';

const alertControls: PropControl[] = [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'info',
    options: ['info', 'success', 'warning', 'error'],
  },
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Informacion',
  },
  {
    name: 'description',
    type: 'text',
    defaultValue: 'Tu sesion expirara en 5 minutos. Guarda tus cambios.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    defaultValue: false,
  },
];

export function AlertPlayground() {
  return <ComponentPlayground component={DSAlert} controls={alertControls} />;
}
