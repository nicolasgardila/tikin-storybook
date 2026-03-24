---
phase: 01-foundation-pipeline
plan: 02
subsystem: ui
tags: [tailwind-v4, next-font, css-tokens, theming, dark-mode, funnel-display, ubuntu-sans]

# Dependency graph
requires:
  - phase: 01-foundation-pipeline-01
    provides: Next.js 15 app with fumadocs-mdx pipeline and global.css
provides:
  - Production fonts (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono) via next/font
  - Namespaced DS tokens (--ds-*) for design system component values
  - Namespaced docs chrome tokens (--docs-*) for documentation site theming
  - Dark/light theme support for docs site with brand inversion
  - Tailwind v4 font utilities (font-ds-display, font-ds-body, font-ds-mono)
affects: [02-site-shell, 03-content-components, 06-tokens]

# Tech tracking
tech-stack:
  added: [next/font/google]
  patterns: [CSS custom property namespacing (--ds-* vs --docs-*), Tailwind v4 @theme CSS-only config]

key-files:
  created:
    - lib/fonts.ts
  modified:
    - app/layout.tsx
    - app/global.css

key-decisions:
  - "Used Funnel_Display from next/font/google (confirmed available with weights 300-800)"
  - "DS tokens use --ds-* prefix, docs site chrome uses --docs-* prefix for clean separation"
  - "DS tones (warm/neutral) stay constant in dark mode; only --ds-brand inverts"
  - "No tailwind.config.ts created — Tailwind v4 CSS-only @theme configuration is sufficient"

patterns-established:
  - "Token namespacing: --ds-* for design system values, --docs-* for documentation site chrome"
  - "Font variable pattern: next/font creates --font-* vars, @theme maps them to --font-ds-* Tailwind utilities"
  - "Dark mode strategy: .dark class toggles --docs-* tokens and --ds-brand; DS component tones remain constant"

# Metrics
duration: 2min
completed: 2026-03-20
---

# Phase 1 Plan 2: Theming & Tokens Summary

**Tailwind v4 theme with namespaced --ds-* design system tokens, --docs-* docs chrome tokens, and Funnel Display / Ubuntu Sans / Ubuntu Sans Mono production fonts via next/font**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-21T00:00:54Z
- **Completed:** 2026-03-21T00:02:59Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Three production font families (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono) loaded via next/font with CSS variables and swap display
- DS tokens namespaced with --ds-* prefix: warm/neutral tones, brand colors, spacing scale, radius scale
- Docs site chrome tokens namespaced with --docs-* prefix with full dark/light theme support
- Tailwind v4 @theme block mapping font CSS variables to utilities (font-ds-display, font-ds-body, font-ds-mono)

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure production fonts with next/font** - `c081ec1` (feat)
2. **Task 2: Set up namespaced DS tokens and docs theme in Tailwind v4** - `c45609c` (feat)

## Files Created/Modified
- `lib/fonts.ts` - Google Font definitions for Funnel Display, Ubuntu Sans, Ubuntu Sans Mono with CSS variable output
- `app/layout.tsx` - Updated to apply font CSS variable classes to html element
- `app/global.css` - Tailwind v4 @theme with font mappings, --ds-* tokens in :root/.dark, --docs-* tokens in :root/.dark

## Decisions Made
- **All 3 fonts available in next/font/google**: Confirmed Funnel_Display, Ubuntu_Sans, Ubuntu_Sans_Mono all exist with required weight ranges
- **No tailwind.config.ts needed**: Tailwind v4 CSS-only @theme configuration handles font mapping; fumadocs content paths work without explicit config
- **DS tones constant in dark mode**: Warm and neutral tones represent component-level tokens and should not change with site theme; only --ds-brand inverts

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Font system and token foundation complete
- Ready for site shell layout customization with DS fonts and tokens
- Component previews can use --ds-* tokens independently of --docs-* site chrome

---
*Phase: 01-foundation-pipeline*
*Completed: 2026-03-20*
