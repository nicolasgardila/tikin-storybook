'use client';

import { ComponentPlayground } from '@/components/docs/component-playground';
import { DSSlider } from '@/components/ds/ds-slider';
import type { PropControl } from '@/components/docs/playground-controls';

const sliderControls: PropControl[] = [
  {
    name: 'value',
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 100,
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: 0,
    min: 0,
    max: 100,
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: 100,
    min: 0,
    max: 100,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
];

export function SliderPlayground() {
  return <ComponentPlayground component={DSSlider} controls={sliderControls} />;
}
