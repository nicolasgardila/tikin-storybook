---
phase: 12-figma-fidelity-audit
plan: 01
subsystem: ui
tags: [figma, form-inputs, textfield, select, checkbox, radio, otp, css-specs]

requires:
  - phase: 08-component-docs-core
    provides: Initial form input component docs and DS playground components
  - phase: 09-component-docs-complete
    provides: Complete component documentation with MDX previews
  - phase: 11-interactive-playground
    provides: DS playground components for TextField, Select, Checkbox

provides:
  - Figma-accurate form input DS components with spec comments
  - Figma-accurate MDX static previews for all 5 form input components
  - Documented spec sheets as code comments for developer reference

affects: []

tech-stack:
  added: []
  patterns:
    - Figma spec comment block at top of DS component files
    - Inner-square/inner-dash pattern for checkbox indicators (not SVG)
    - Filled-circle radio pattern (bg=brand, dot=brand-on)
    - 0.5px border + box-shadow ring for focus states

key-files:
  created: []
  modified:
    - components/ds/ds-text-field.tsx
    - components/ds/ds-select.tsx
    - components/ds/ds-checkbox.tsx
    - content/docs/components/text-field.mdx
    - content/docs/components/select.mdx
    - content/docs/components/checkbox.mdx
    - content/docs/components/radio-button.mdx
    - content/docs/components/otp-input.mdx

key-decisions:
  - "Checkbox uses inner-square (10x10 r2) and inner-dash (10x2 r1) filled divs instead of SVG checkmark/dash to match Figma exactly"
  - "Radio selected state uses filled circle (bg=brand with inner dot=brand-on) not outlined circle with dot=brand"
  - "Error color standardized to #EC221F (Figma) replacing #FF2E2E and #E74C3C across all form components"
  - "OTP cells are 48x56 (desktop) not 48x48, with 0.5px border not 1.5px"
  - "Radio label uses Funnel Display font (not Ubuntu Sans) per Figma specs"

patterns-established:
  - "Figma spec audit pattern: extract from HTML source -> write spec comment -> compare vs implementation -> fix discrepancies"
  - "Error background: #FEE9E7 (light) / rgba(236,34,31,0.08) (dark) for form error states"

duration: 6min
completed: 2026-03-21
---

# Phase 12 Plan 01: Form Input Figma Fidelity Audit Summary

**Audited and fixed 5 form input components (TextField, Select, Checkbox, Radio Button, OTP Input) to match Figma specs with 15+ discrepancies corrected across border-radius, border-width, colors, fonts, dimensions, and indicator patterns**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-21T15:29:20Z
- **Completed:** 2026-03-21T15:35:26Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Extracted complete Figma spec sheets from HTML source files (checkbox index.html, radio.html, otp.html) and wrote as code comments in 3 DS component files
- Fixed 15+ CSS discrepancies across all 5 form input components in both DS playground components and static MDX previews
- Standardized error color to #EC221F and error bg to #FEE9E7 across all form components (was inconsistent #FF2E2E / #E74C3C)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract Figma specs** - `b2b9c52` (docs)
2. **Task 2: Fix all discrepancies** - `1099f4b` (fix)

## Files Created/Modified
- `components/ds/ds-text-field.tsx` - Added Figma spec comment, fixed radius 10->12, error color, padding, focus ring
- `components/ds/ds-select.tsx` - Added Figma spec comment, fixed border 1px->0.5px, focus ring, font CSS var
- `components/ds/ds-checkbox.tsx` - Added Figma spec comment, SVG->inner-square/dash, radius 6->5, font weight logic
- `content/docs/components/text-field.mdx` - Fixed radius, error color, padding, feedback font, anatomy table
- `content/docs/components/select.mdx` - Fixed border-width, dropdown shadow, font family CSS var
- `content/docs/components/checkbox.mdx` - SVG->inner-square, radius 6->5, font 16->14, weight logic
- `content/docs/components/radio-button.mdx` - Font Ubuntu Sans->Funnel Display, filled circle pattern, dot 10->8px
- `content/docs/components/otp-input.mdx` - Dimensions 48x48->48x56, border 1.5->0.5, font 20->24, error color+bg, separator

## Decisions Made
- Checkbox inner indicator changed from SVG paths to filled rectangles matching Figma (inner-square 10x10 r2, inner-dash 10x2 r1)
- Radio selected state changed to filled-circle pattern (bg=brand, dot=white) matching Figma source
- Error color standardized to #EC221F across all form components (was #FF2E2E in TextField, #E74C3C in OTP)
- OTP cell dimensions corrected to 48x56 (desktop), not 48x48 -- the height difference is visible in Figma

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 5 form input components now match Figma specs exactly
- Ready for remaining component audits in 12-02 through 12-05

---
*Phase: 12-figma-fidelity-audit*
*Completed: 2026-03-21*
