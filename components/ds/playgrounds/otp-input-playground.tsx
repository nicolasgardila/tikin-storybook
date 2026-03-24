'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSOTPInput } from '@/components/ds/ds-otp-input';
import type { PropControl } from '@/components/docs/playground-controls';

const otpInputControls: PropControl[] = [
  {
    name: 'length',
    type: 'number',
    defaultValue: 4,
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  {
    name: 'state',
    type: 'select',
    defaultValue: 'default',
    options: ['default', 'active', 'error', 'disabled'],
  },
];

export function OTPInputPlayground() {
  return <ComponentPlayground component={DSOTPInput} controls={otpInputControls} />;
}
