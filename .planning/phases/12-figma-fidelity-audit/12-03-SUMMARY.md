---
phase: 12-figma-fidelity-audit
plan: 03
subsystem: ui
tags: [figma, card, dialog, container, bottom-sheet, side-panel, layout, double-layer]

requires:
  - phase: 08-component-docs-core
    provides: Initial Card, Dialog, Container MDX docs
  - phase: 09-component-docs-complete
    provides: Bottom Sheet, Side Panel MDX docs
  - phase: 11-interactive-playground
    provides: DSCard and DSDialog playground components
provides:
  - Figma-accurate Card DS component with spec comments
  - Figma-accurate Dialog DS component with spec comments
  - Fixed MDX previews for Card, Container, Dialog, Bottom Sheet, Side Panel
affects: []

tech-stack:
  added: []
  patterns:
    - Figma spec comment block at top of DS component files
    - Warm double-layer pattern for Side Panel (outer #F1EFEB + inner #FFFFFF)

key-files:
  modified:
    - components/ds/ds-card.tsx
    - components/ds/ds-dialog.tsx
    - content/docs/components/dialog.mdx
    - content/docs/components/bottom-sheet.mdx
    - content/docs/components/side-panel.mdx
    - content/docs/components/container.mdx

key-decisions:
  - "Dialog title uses Funnel Display 400 24px (not 600 20px as previously implemented)"
  - "Dialog description uses 16px (not 14px) per Figma"
  - "Dialog destructive color is #EC221F (not #DC2626)"
  - "Dialog footer is flex-end with gap 10px and margin-top 28px"
  - "Dialog buttons use height 40px with padding 0 16px (not padding-based sizing)"
  - "Dialog close button positioned top 28px right 28px with 40x40 hit area"
  - "Danger icon uses r12 rectangle bg #FEE9E7 (not round #FEF3C7)"
  - "Bottom Sheet handle bar is 40x4 r8 #E1E1E1 (not 32px r9999)"
  - "Side Panel uses warm double-layer pattern: outer #F1EFEB border #E8E4DD, inner #FFFFFF border #E8E4DD"
  - "Side Panel title uses Funnel Display 400 20px (not Ubuntu Sans 600 16px)"
  - "Side Panel width is 464px per Figma (not 300px)"
  - "Side Panel close button is 40x40 on outer shell (not 24x24)"
  - "Card DS component needs overflow:hidden and variant-specific border CSS vars"

patterns-established:
  - "Figma spec comment block pattern for DS components"

duration: 5min
completed: 2026-03-21
---

# Phase 12 Plan 03: Layout Components Figma Fidelity Audit Summary

**Audited Card, Dialog, Container, Bottom Sheet, Side Panel against Figma HTML source — fixed 13+ spec discrepancies in DS components and MDX previews**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-21T15:29:57Z
- **Completed:** 2026-03-21T15:35:27Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added comprehensive Figma spec comment blocks to ds-card.tsx and ds-dialog.tsx with exact values per variant/theme
- Fixed Dialog DS component: title weight (400 not 600), title size (24px not 20px), description size (16px not 14px), close button position (28/28 not 24/24), footer layout (flex-end gap 10px mt 28px), button sizing (h40), destructive color (#EC221F), max-width (605px)
- Fixed Bottom Sheet MDX: handle bar dimensions (40x4 r8 not 32x4 r9999), added border-top, added anatomy diagram
- Replaced Side Panel flat design with warm double-layer pattern matching Figma (outer #F1EFEB + inner #FFFFFF with borders), fixed title font, width, close button
- Fixed Card DS component: added overflow:hidden, variant-specific border CSS variables

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract Figma specs for all Layout components** - `48c9a89` (fix)
2. **Task 2: Fix all discrepancies in DS components and MDX previews** - `719001e` (fix)

## Files Created/Modified

- `components/ds/ds-card.tsx` - Added Figma spec comment, overflow:hidden, variant-specific border vars
- `components/ds/ds-dialog.tsx` - Complete rewrite with Figma-accurate specs (title, desc, buttons, close, footer)
- `content/docs/components/dialog.mdx` - Fixed preview styles, anatomy table, danger icon specs
- `content/docs/components/bottom-sheet.mdx` - Fixed handle bar, added anatomy diagram and specs table
- `content/docs/components/side-panel.mdx` - Replaced with warm double-layer pattern, added anatomy diagram
- `content/docs/components/container.mdx` - Added dark mode shadow to specs table

## Decisions Made

See key-decisions in frontmatter. Major findings:
- Dialog had the most discrepancies (8+ fixes): wrong font weight, sizes, colors, layout
- Side Panel needed a structural change from flat to warm double-layer pattern
- Bottom Sheet handle bar dimensions were wrong (32px vs 40px, pill vs r8)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Container does not have a dedicated HTML file in checkbox-ds/ and the plan suggested using Figma MCP tool. However, the dialog.html already contains the complete double-layer specs which Container uses, so no MCP call was needed. The Container MDX was already mostly correct; only the dark shadow value was missing from the specs table.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 layout components now match Figma specs exactly
- Card MDX previews were already correct (using var() CSS vars properly)
- Build succeeds with no errors

---
*Phase: 12-figma-fidelity-audit*
*Completed: 2026-03-21*
