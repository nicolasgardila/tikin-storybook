import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { DoDont } from '@/components/docs/do-dont';
import { PropsTable } from '@/components/docs/props-table';
import { StatusBadge } from '@/components/docs/status-badge';
import { ComponentPreview } from '@/components/docs/component-preview';
import { DSStatusChips } from '@/components/ds/ds-status-chips';
import { ColorVisualizer } from '@/components/docs/color-visualizer';
import { GridVisualizer } from '@/components/docs/grid-visualizer';
import { TypeSpecimen } from '@/components/docs/type-specimen';
import { IconSearch } from '@/components/docs/icon-search';
import { ButtonsPlayground } from '@/components/ds/playgrounds/buttons-playground';
import { TextFieldPlayground } from '@/components/ds/playgrounds/text-field-playground';
import { SelectPlayground } from '@/components/ds/playgrounds/select-playground';
import { CheckboxPlayground } from '@/components/ds/playgrounds/checkbox-playground';
import { TogglePlayground } from '@/components/ds/playgrounds/toggle-playground';
import { CardPlayground } from '@/components/ds/playgrounds/card-playground';
import { DialogPlayground } from '@/components/ds/playgrounds/dialog-playground';
import { ToastPlayground } from '@/components/ds/playgrounds/toast-playground';
import { AlertPlayground } from '@/components/ds/playgrounds/alert-playground';
import { TabsPlayground } from '@/components/ds/playgrounds/tabs-playground';
import { ContainerPlayground } from '@/components/ds/playgrounds/container-playground';
import { BadgePlayground } from '@/components/ds/playgrounds/badge-playground';
import { StatusChipsPlayground } from '@/components/ds/playgrounds/status-chips-playground';
import { DropdownPlayground } from '@/components/ds/playgrounds/dropdown-playground';
import { RadioButtonPlayground } from '@/components/ds/playgrounds/radio-button-playground';
import { SearchBarPlayground } from '@/components/ds/playgrounds/search-bar-playground';
import { OTPInputPlayground } from '@/components/ds/playgrounds/otp-input-playground';
import { SegmentedControlPlayground } from '@/components/ds/playgrounds/segmented-control-playground';
import { AvatarPlayground } from '@/components/ds/playgrounds/avatar-playground';
import { TooltipPlayground } from '@/components/ds/playgrounds/tooltip-playground';
import { SkeletonPlayground } from '@/components/ds/playgrounds/skeleton-playground';
import { DividerPlayground } from '@/components/ds/playgrounds/divider-playground';
import { ProgressBarPlayground } from '@/components/ds/playgrounds/progress-bar-playground';
import { BottomSheetPlayground } from '@/components/ds/playgrounds/bottom-sheet-playground';
import { SidePanelPlayground } from '@/components/ds/playgrounds/side-panel-playground';
import { AccordionPlayground } from '@/components/ds/playgrounds/accordion-playground';
import { PopoverPlayground } from '@/components/ds/playgrounds/popover-playground';
import { TablePlayground } from '@/components/ds/playgrounds/table-playground';
import { PaginationPlayground } from '@/components/ds/playgrounds/pagination-playground';
import { BreadcrumbsPlayground } from '@/components/ds/playgrounds/breadcrumbs-playground';
import { ChipPlayground } from '@/components/ds/playgrounds/chip-playground';
import { DatePickerPlayground } from '@/components/ds/playgrounds/date-picker-playground';
import { SliderPlayground } from '@/components/ds/playgrounds/slider-playground';
import { SnackbarPlayground } from '@/components/ds/playgrounds/snackbar-playground';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    DoDont,
    PropsTable,
    StatusBadge,
    ComponentPreview,
    DSStatusChips,
    ColorVisualizer,
    GridVisualizer,
    TypeSpecimen,
    IconSearch,
    ButtonsPlayground,
    TextFieldPlayground,
    SelectPlayground,
    CheckboxPlayground,
    TogglePlayground,
    CardPlayground,
    DialogPlayground,
    ToastPlayground,
    AlertPlayground,
    TabsPlayground,
    ContainerPlayground,
    BadgePlayground,
    StatusChipsPlayground,
    DropdownPlayground,
    RadioButtonPlayground,
    SearchBarPlayground,
    OTPInputPlayground,
    SegmentedControlPlayground,
    AvatarPlayground,
    TooltipPlayground,
    SkeletonPlayground,
    DividerPlayground,
    ProgressBarPlayground,
    BottomSheetPlayground,
    SidePanelPlayground,
    AccordionPlayground,
    PopoverPlayground,
    TablePlayground,
    PaginationPlayground,
    BreadcrumbsPlayground,
    ChipPlayground,
    DatePickerPlayground,
    SliderPlayground,
    SnackbarPlayground,
    ...components,
  };
}
