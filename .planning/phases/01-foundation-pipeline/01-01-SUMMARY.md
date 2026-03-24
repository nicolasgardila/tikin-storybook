---
phase: 01-foundation-pipeline
plan: 01
subsystem: infra
tags: [next.js, fumadocs-mdx, fumadocs-ui, tailwind-v4, mdx, shiki]

# Dependency graph
requires:
  - phase: none
    provides: greenfield project
provides:
  - Next.js 15 app with fumadocs-mdx build pipeline
  - MDX content rendering with syntax highlighting (shiki)
  - Sidebar navigation from content directory page tree
  - Root and docs layouts with fumadocs-ui components
  - Sample documentation page with code block and table
affects: [02-site-shell, 03-content-components, 04-search-navigation]

# Tech tracking
tech-stack:
  added: [next.js 16.2.1, fumadocs-mdx 14.x, fumadocs-ui 16.x, fumadocs-core 16.x, tailwind-css 4, shiki]
  patterns: [fumadocs-mdx source pipeline, loader pattern with pageTree]

key-files:
  created:
    - source.config.ts
    - lib/source.ts
    - app/docs/layout.tsx
    - app/docs/[[...slug]]/page.tsx
    - mdx-components.tsx
    - content/docs/index.mdx
    - content/docs/meta.json
    - next.config.mjs
    - app/global.css
  modified:
    - app/layout.tsx
    - app/page.tsx
    - tsconfig.json
    - package.json

key-decisions:
  - "Used fumadocs-ui/provider/next instead of fumadocs-ui/provider (v16 export path change)"
  - "Used @/.source/server import path for generated fumadocs-mdx source files"
  - "Set lang=es on html element (Spanish-only project per PROJECT.md)"
  - "Used .mjs extension for next.config for ESM compatibility with fumadocs-mdx"

patterns-established:
  - "Source loader: lib/source.ts imports from @/.source/server, uses loader() with toFumadocsSource()"
  - "Docs page pattern: async Page component with Promise<params>, source.getPage(), MDX body rendering"
  - "CSS imports: tailwindcss + fumadocs-ui/css/neutral.css + fumadocs-ui/css/preset.css"

# Metrics
duration: 9min
completed: 2026-03-20
---

# Phase 1 Plan 1: Foundation Pipeline Summary

**Next.js 15 app with fumadocs-mdx pipeline rendering MDX docs with sidebar navigation, shiki syntax highlighting, and page tree from content/docs/**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-20T23:49:24Z
- **Completed:** 2026-03-20T23:58:21Z
- **Tasks:** 2
- **Files modified:** 17

## Accomplishments
- Next.js 15 app scaffolded with TypeScript, Tailwind v4, ESLint
- fumadocs-mdx pipeline configured with source.config.ts and next.config.mjs
- Docs layout with sidebar navigation rendering page tree from content/docs/
- Sample MDX page with code block (syntax highlighted) and token table

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 app with fumadocs-mdx** - `4fa1ca7` (feat)
2. **Task 2: Create source loader, layouts, page component, and sample MDX content** - `c26916a` (feat)

## Files Created/Modified
- `source.config.ts` - fumadocs-mdx docs collection config pointing to content/docs
- `next.config.mjs` - Next.js config wrapped with createMDX plugin
- `lib/source.ts` - Source loader with pageTree and getPage for docs rendering
- `app/layout.tsx` - Root layout with RootProvider and Spanish lang
- `app/docs/layout.tsx` - Docs layout with DocsLayout sidebar and nav title
- `app/docs/[[...slug]]/page.tsx` - Dynamic docs page with MDX rendering and metadata
- `mdx-components.tsx` - MDX component mappings using fumadocs-ui defaults
- `content/docs/index.mdx` - Sample docs page with code block and token table
- `content/docs/meta.json` - Sidebar section structure
- `app/global.css` - Tailwind v4 + fumadocs-ui theme imports
- `app/page.tsx` - Home redirect to /docs
- `package.json` - Dependencies including fumadocs-mdx, fumadocs-ui, fumadocs-core

## Decisions Made
- **fumadocs-ui v16 provider path**: Used `fumadocs-ui/provider/next` instead of `fumadocs-ui/provider` since v16 requires framework-specific subpath
- **Source import path**: Used `@/.source/server` instead of `@/.source` since fumadocs-mdx generates separate server/browser/dynamic entry points without an index file
- **ESM config**: Used `.mjs` extension for next.config to ensure ESM compatibility with fumadocs-mdx plugin

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed fumadocs-ui/provider import path**
- **Found during:** Task 2 (build verification)
- **Issue:** Plan specified `fumadocs-ui/provider` but fumadocs-ui v16 exports provider under `fumadocs-ui/provider/next`
- **Fix:** Changed import to `fumadocs-ui/provider/next`
- **Files modified:** app/layout.tsx
- **Verification:** `npx next build` succeeds
- **Committed in:** c26916a (Task 2 commit)

**2. [Rule 3 - Blocking] Fixed @/.source import path**
- **Found during:** Task 2 (build verification)
- **Issue:** Plan specified `import { docs } from '@/.source'` but fumadocs-mdx generates server.ts/browser.ts/dynamic.ts without an index file
- **Fix:** Changed import to `@/.source/server`
- **Files modified:** lib/source.ts
- **Verification:** `npx next build` succeeds, static pages generated
- **Committed in:** c26916a (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for build to succeed. No scope creep.

## Issues Encountered
- `create-next-app` rejected directory name "Storybook" due to npm naming restrictions (capital letters). Scaffolded in /tmp and copied files over.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Build pipeline fully functional: `npm run build` succeeds, `npm run dev` starts cleanly
- MDX rendering pipeline works end-to-end (file to rendered page with TOC)
- Ready for Phase 2 (Site Shell & Layout) to add theming, fonts, and sidebar customization

---
*Phase: 01-foundation-pipeline*
*Completed: 2026-03-20*
