'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSAvatar } from '@/components/ds/ds-avatar';
import type { PropControl } from '@/components/docs/playground-controls';

const avatarControls: PropControl[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: '40',
    options: ['24', '32', '40', '48', '64'],
  },
  {
    name: 'initials',
    type: 'text',
    defaultValue: 'NG',
  },
  {
    name: 'src',
    type: 'text',
    defaultValue: '',
    label: 'image URL',
  },
  {
    name: 'showStatus',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'status',
    type: 'select',
    defaultValue: 'online',
    options: ['online', 'offline', 'busy', 'away'],
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
];

export function AvatarPlayground() {
  return <ComponentPlayground component={DSAvatar} controls={avatarControls} />;
}
