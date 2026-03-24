'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSBreadcrumbs } from '@/components/ds/ds-breadcrumbs';
import type { PropControl } from '@/components/docs/playground-controls';

const breadcrumbsControls: PropControl[] = [
  {
    name: 'items',
    type: 'text',
    defaultValue: 'Home, Products, Detail',
    label: 'items (comma-separated)',
  },
  {
    name: 'separator',
    type: 'select',
    defaultValue: 'chevron',
    options: ['chevron', 'slash'],
  },
];

export function BreadcrumbsPlayground() {
  return <ComponentPlayground component={DSBreadcrumbs} controls={breadcrumbsControls} />;
}
