---
phase: 12-figma-fidelity-audit
plan: 05
subsystem: ui
tags: [table, pagination, breadcrumbs, navigation, accordion, popover, figma-audit, inline-styles]

requires:
  - phase: 09-component-docs-complete
    provides: "Original MDX component documentation with static previews"
provides:
  - "Figma-accurate inline styles for Table, Pagination, Breadcrumbs, Navigation, Accordion, Popover"
affects: []

tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - content/docs/components/table.mdx
    - content/docs/components/pagination.mdx
    - content/docs/components/breadcrumbs.mdx
    - content/docs/components/navigation.mdx
    - content/docs/components/accordion.mdx
    - content/docs/components/popover.mdx

key-decisions:
  - "Table container r20 with 0.5px border (matches card DS pattern, not previously assumed 12px)"
  - "Table headers use Ubuntu Sans Mono 12px uppercase (not Ubuntu Sans semibold)"
  - "Pagination buttons 32x32 r10 with Mono 13px (not 36x36 r8 with Sans 14px)"
  - "Breadcrumb current item uses Mono 500 (not Sans semibold 600), separator padding 4px"
  - "Navigation TopBar uses TIKIN. Funnel Display 700 logo, not generic icon"
  - "Navigation TabBar h64 with inner 343x48, FAB 48x44 r12"
  - "Navigation Sidebar w244, bg #FAF8F4, nav labels Funnel Display 13px 400"
  - "Accordion title uses Funnel Display 15px 400 (not Ubuntu Sans 16px 500)"
  - "Accordion container r20 0.5px border (matches card DS pattern)"
  - "Popover uses double-layer pattern: outer r20 p8 bg #F6F6F6 + inner r16 bg white"
  - "Popover menu items padding 10px 14px with 10px gap (not 8px 12px with 8px gap)"
  - "Popover destructive color is #EC221F (not #E74C3C)"

patterns-established:
  - "Double-layer popover/dropdown container (outer muted + inner surface)"

duration: 8min
completed: 2026-03-21
---

# Phase 12 Plan 05: Data and Navigation Components Figma Audit Summary

**Audited and fixed Table, Pagination, Breadcrumbs, Navigation, Accordion, and Popover to match exact Figma CSS specs from HTML source files**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-21T15:29:33Z
- **Completed:** 2026-03-21T15:37:45Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Extracted complete Figma specs from 6 HTML source files (table.html, pagination.html, breadcrumb.html, navbar.html, accordion.html, popover.html)
- Fixed all ComponentPreview inline styles across 6 MDX files to match exact Figma CSS values
- Build passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract Figma specs** - Analysis only (no file changes, specs documented in-memory for Task 2)
2. **Task 2: Fix all discrepancies** - `5ff70e2` (fix)

## Files Created/Modified
- `content/docs/components/table.mdx` - Fixed container r20, 0.5px borders, Mono uppercase headers, removed alternating row bg
- `content/docs/components/pagination.mdx` - Fixed 32x32 r10 buttons, Mono 13px, hardcoded active colors, simple prev/next with Mono uppercase labels
- `content/docs/components/breadcrumbs.mdx` - Fixed 13px font, opacity-based link colors, Mono 500 current item, 4px separator padding
- `content/docs/components/navigation.mdx` - Complete rewrite of all 3 sub-components (TopBar/TabBar/Sidebar) with exact Figma dimensions and structure
- `content/docs/components/accordion.mdx` - Fixed Funnel Display 15px titles, r20 container with 0.5px border, 0.35 opacity chevrons
- `content/docs/components/popover.mdx` - Fixed to double-layer container pattern (outer r20 p8 + inner r16), 10px 14px item padding, 18px icons

## Decisions Made

- Table container uses 20px border-radius matching the card DS pattern (previous decision of 12px was incorrect per Figma source)
- Popover uses a double-layer container pattern (outer muted bg + inner white surface) matching the Dialog DS pattern
- Popover destructive action color is #EC221F (Figma) instead of #E74C3C (was used in old MDX)
- Navigation sidebar uses Funnel Display for nav item labels (not Ubuntu Sans) per Figma
- Navigation TopBar shows "TIKIN." text mark logo (Funnel Display 700) not a generic icon

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All data/navigation components match Figma specs
- Plan 06 (remaining components) is ready for execution

---
*Phase: 12-figma-fidelity-audit*
*Completed: 2026-03-21*
