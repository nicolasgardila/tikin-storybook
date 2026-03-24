'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSToast } from '@/components/ds/ds-toast';
import type { PropControl } from '@/components/docs/playground-controls';

const toastControls: PropControl[] = [
  {
    name: 'message',
    type: 'text',
    defaultValue: 'Cambios guardados correctamente',
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'success',
    options: ['info', 'success', 'error', 'warning'],
  },
  {
    name: 'position',
    type: 'select',
    defaultValue: 'top-right',
    options: ['top-right', 'bottom-center'],
  },
  {
    name: 'showClose',
    type: 'boolean',
    defaultValue: false,
  },
];

export function ToastPlayground() {
  return <ComponentPlayground component={DSToast} controls={toastControls} />;
}
