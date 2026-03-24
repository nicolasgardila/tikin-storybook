# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-22)

**Core value:** Every component is documented with exact production tokens, real usage examples, and copy-paste code — so the team never has to guess how to use the DS.
**Current focus:** v1.0 shipped — planning next milestone

## Current Position

Phase: v1.0 complete — 13 phases shipped
Plan: Not started (next milestone)
Status: v1.0 shipped, ready for next milestone
Last activity: 2026-03-22 — v1.0 milestone complete, tagged

Progress: v1.0 ██████████ 100% SHIPPED

## Performance Metrics

**Velocity:**
- Total plans completed: 32
- Average duration: 2.5 min
- Total execution time: 1.30 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation-pipeline | 2 | 11 min | 5.5 min |
| 02-site-shell | 2 | 8 min | 4 min |
| 03-content-components | 4 | 10 min | 2.5 min |
| 04-search-navigation | 2 | 5 min | 2.5 min |
| 05-preview-system | 2 | 3 min | 1.5 min |
| 06-foundations-content | 3 | 7 min | 2.3 min |
| 07-foundations-visualizers | 3 | 6 min | 2 min |

| 08-component-docs-core | 4 | 14 min | 3.5 min |
| 09-component-docs-complete | 5 | 20 min | 4 min |
| 10-guides-reference | 2 | 8 min | 4 min |
| 11-interactive-playground | 3 | 11 min | 3.7 min |
| 12-figma-fidelity-audit | 6 | 41 min | 6.8 min |

**Recent Trend:**
- Last 5 plans: 5min, 5min, 6min, 8min, 11min
- Trend: steady

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- fumadocs-ui v16 requires `fumadocs-ui/provider/next` import (not `fumadocs-ui/provider`)
- fumadocs-mdx generates `.source/server.ts` — import from `@/.source/server` not `@/.source`
- next.config uses `.mjs` extension for ESM compatibility with fumadocs-mdx
- DS tokens use `--ds-*` prefix, docs chrome uses `--docs-*` prefix (clean separation)
- DS tones (warm/neutral) stay constant in dark mode; only `--ds-brand` inverts
- Tailwind v4 CSS-only @theme config is sufficient — no tailwind.config.ts needed
- Font variable pattern: next/font creates `--font-*` vars, @theme maps to `--font-ds-*` utilities
- Directory-based categories with meta.json, not sidebar tabs (tabs are for separate doc sets)
- meta.json per directory: title, defaultOpen, pages array controls sidebar structure
- sidebar.defaultOpenLevel: 1 expands first level of categories
- Typography overrides target .prose selectors in global.css for fumadocs content area
- Use next/font CSS variable names (--font-funnel-display) directly, not Tailwind utility names
- Custom MDX components go in components/docs/ and register in mdx-components.tsx
- CodeBlock wraps Pre with ref destructuring to avoid React forwardRef conflict
- PropsTable uses --docs-* CSS variables for dark mode, --ds-brand for prop names
- Inline SVG icons for doc components instead of Phosphor (zero-dependency)
- StatusBadge uses Record-based config pattern for variant-driven rendering
- Parallel plans merging mdx-components.tsx worked without conflicts (Plan 01 committed first, Plan 02 read updated file)
- Component doc template pattern: frontmatter + StatusBadge + code examples + PropsTable + DoDont
- Page tree icon injection for sidebar status dots (uses native PageTree.Item.icon field)
- frontmatterSchema.extend() pattern for adding custom frontmatter fields in source.config.ts
- lib/source.tsx (renamed from .ts) exports getDecoratedTree() for sidebar status indicators
- createFromSource(source) is the minimal search setup — auto-indexes all pages with structuredData
- fumadocs-ui RootProvider auto-discovers /api/search endpoint — no layout changes needed for search
- fumadocs-ui DocsPage provides TOC and prev/next footer navigation automatically (no page.tsx changes needed)
- Footer uses useFooterItems() hook resolving prev/next from page tree context, enabled by default
- ComponentPreview uses hardcoded DS hex values (#FAF8F4/#0B0B0B) for theme independence from docs site
- Preview buttons use inline styles (not Tailwind) in MDX for correct rendering in ComponentPreview
- Secondary/Ghost preview buttons use color: inherit for theme-adaptive text in light/dark preview
- Complete radius scale: 10 tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full, pill)
- Foundation token page pattern: frontmatter + intro + token table + usage guide + code example
- Intermediate spacing tokens (0.5, 1.5, 2.5, 3.5, 4.5) documented for completeness
- Spacing principles organized by level: micro/internal/component/section/layout
- HTML entities (&gt; &lt;) required for angle brackets in MDX table cells to avoid JSX parsing
- Grid code examples use html language blocks, not tsx, to avoid MDX compilation issues with JSX comments
- ColorVisualizer uses hardcoded hex values (not runtime CSS var reads) for hydration safety and theme independence
- Click-to-copy pattern: navigator.clipboard.writeText with useState timed feedback
- GridVisualizer uses color-mix(in srgb, var(--ds-brand) 8%, transparent) for subtle brand-tinted column bars
- Parallel wave execution: 3 plans updating mdx-components.tsx concurrently — each reads before editing to merge cleanly
- TypeSpecimen uses inline styles with CSS variable font-family for actual loaded font rendering (not Tailwind utility classes)
- Card specs table documents both light and dark mode border colors for developer reference
- Container includes ASCII anatomy diagram showing shell/panel nesting structure
- Outline card variant preview wraps in gray background to demonstrate transparent bg effect
- Checkbox uses span-based visual boxes with inline SVG icons (not native input) for consistent ComponentPreview rendering
- Select uses appearance:none + custom absolute-positioned chevron SVG for cross-browser consistency
- Form input doc pattern: Default + With Label + Error/States + Disabled + PropsTable + DoDont
- Status Chips uses CSS var font-family fallback in inline styles for ComponentPreview rendering
- Badge on-icon variant uses inline SVG Phosphor Bell path for zero-dependency preview
- Toggle track/thumb specs: 44x24px track, 20x20px thumb, 2px inset, 200ms ease transition
- Dialog preview simulates double-layer without actual backdrop (static ComponentPreview)
- Dropdown shown in permanently open state for non-interactive preview
- meta.json includes all 36 entries (index + 35 components) across Phase 8 and Phase 9
- Avatar size-to-font mapping from Figma: 24->9, 32->11, 40->14, 48->16, 64->22 (corrected from 24->10, 32->12, 64->20)
- Avatar status colors from Figma: online=#14AE5C, offline=#B3B3B3, busy=#EC221F, away=#E8B931 (corrected from #22C55E/#9CA3AF)
- Avatar initials bg: #E8E4DD light, #2C2C2C dark, border 0.5px solid #DEDEDE/#3A3A3A
- Badge uses brand #0B0B0B bg (not #E74C3C), Ubuntu Sans Mono 500 10px, min-width 16px r8
- Skeleton warm bg #EEEBE6 (not #F6F6F6), text 14px r4, shimmer animation 1.8s
- Divider hairline 0.5px, label Ubuntu Sans Mono 11px uppercase, 4 color variants (neutral/warm/subtle/strong)
- Progress bar track: sm=4px, md=6px, lg=8px, bg #EEEBE6, r100px
- Step indicator uses 32px circles with numbers (not 12px dots), Funnel Display 12px labels
- Slider track 4px default (not 8px), thumb 20px r50% 2px border, disabled #D9D9D9
- Date picker double-layer container: outer r24 #F6F6F6 p12, inner r20 #FFFFFF p20
- Date picker day cells: 36x36 r10 (not circular), weekday Ubuntu Sans Mono 11px
- Dropdown double-layer container matching dialog DS pattern, items 10px 16px padding
- Tooltip arrow uses CSS border triangle technique (6px)
- Step indicator three-state pattern: completed (filled), active (filled+ring), upcoming (hollow)
- OTP Input uses div boxes (not native inputs) for consistent static ComponentPreview rendering
- Segmented Control uses Ubuntu Sans Mono uppercase (corrected from Ubuntu Sans per Figma segmented.html)
- Segmented Control: r14 container, p3, warm bg #F1EFEB, border #E8E4DD, r12 segments, 13px, active #0B0B0B fill
- Tabs contained: r10 active, r3 inactive, p 6px 12px desktop, border 1px, bg #FDFDFD, active bg #EEEEEE (no shadow)
- Tabs underline: 0.5px border-bottom container, p 10px 16px desktop, 2px indicator
- Search Bar: r12 (not pill r44), 0.5px border, flex layout with gap 8px, icon 16px desktop
- Button md: padding 8px 20px, height 40px (corrected from 12px 24px)
- color-mix(in srgb, currentColor N%, transparent) for theme-safe muted text in DS components
- Navigation page documents three sub-components (TopBar, TabBar, Sidebar) with separate PropsTable sections
- Table uses border-radius 12px on outer container for consistent DS rounded style
- Overlay component previews use flex alignment (flex-end) to simulate sheet/panel positioning within bounded containers
- Sub-props documentation pattern: separate PropsTable sections for compound component children (AccordionItem, MenuItem)
- Component anatomy pattern: ## Anatomia heading + ASCII diagram in code block + specs table with DS tokens
- ASCII text diagrams for anatomy (not images) — maintainable, renders natively in MDX, no image pipeline needed
- Hardcoded ~50 Phosphor SVG paths for icon reference to avoid npm dependency
- Click-to-copy copies full SVG markup for direct paste into code
- DSButton uses inline styles (not Tailwind) for playground preview context compatibility
- Playground wrapper pattern: client component per page connecting DS component to generic playground
- Controls panel uses --docs-* variables (docs chrome), preview uses --preview-* variables (DS isolation)
- PropControl definition: name/type/defaultValue/options for auto-generating controls
- DS component pattern: components/ds/ds-{name}.tsx with inline styles and --preview-* vars
- Form input DS component pattern: size config record + state/feedback props + inline styles
- Layout DS component pattern: variant config record + children fallback content
- DSCard renders default financial sample content when no children provided
- DSToast uses hardcoded dark bg (#0B0B0B) independent of preview theme
- DSAlert uses hardcoded light background tints per variant for consistent appearance
- DSTabs accepts comma-separated string for tabs prop (simpler for playground text control)
- Dialog title: Funnel Display 400 24px (not 600 20px as originally implemented)
- Dialog description: Ubuntu Sans 400 16px (not 14px), opacity 0.65
- Dialog destructive: #EC221F (not #DC2626)
- Dialog footer: flex-end gap 10px margin-top 28px, buttons h40 r12 p0-16
- Dialog close button: top 28px right 28px, 40x40 hit area, icon 16px
- Dialog danger icon: 48x48 r12 bg #FEE9E7 (not round #FEF3C7)
- Bottom Sheet handle bar: 40x4 r8 #E1E1E1/#434343 (not 32px r9999)
- Side Panel uses warm double-layer: outer #F1EFEB border #E8E4DD, inner #FFFFFF border #E8E4DD, width 464px
- Side Panel title: Funnel Display 400 20px (not Ubuntu Sans 600 16px)
- Side Panel close: 40x40 on outer shell (not 24x24)
- Card DS component: overflow:hidden, variant-specific border CSS vars with fallbacks
- Checkbox uses inner-square (10x10 r2) and inner-dash (10x2 r1) filled divs instead of SVG checkmark/dash to match Figma
- Radio selected state uses filled circle (bg=brand, dot=brand-on) not outlined circle with dot=brand
- Error color standardized to #EC221F across all form components (was #FF2E2E in TextField, #E74C3C in OTP)
- OTP cell dimensions are 48x56 (desktop) not 48x48, border 0.5px not 1.5px
- Radio label uses Funnel Display font (not Ubuntu Sans) per Figma specs
- Toast uses Snackbar visual specs (double-layer shell pattern: outer r16 + inner r14)
- Alert uses full 1px border (not 3px left-only borderLeft) per Figma alert.html
- Alert title: Funnel Display weight 400, description: Ubuntu Sans 13px
- Snackbar action: Ubuntu Sans Mono 500 13px uppercase, color #FDDC72 (gold)
- Tooltip: 13px font, 280px max-width, shadow 0px 2px 8px rgba(11,15,16,0.16)
- Chip: r44 pill, 0.5px border, Ubuntu Sans Mono font, sizes sm 28/md 32/lg 36px
- Status tags: Ubuntu Mono 12px, r44, letter-spacing 0.6px, border 0.5px rgba(0,0,0,0.08)
- Table container r20 with 0.5px border (matches card DS pattern, not 12px)
- Table headers: Ubuntu Sans Mono 12px uppercase, weight 500, opacity 0.5
- Pagination buttons: 32x32 r10 (default), Mono 13px, active bg #0B0B0B
- Breadcrumb current item: Mono 500 (not Sans 600), separator padding 4px
- Navigation TopBar: TIKIN. Funnel Display 700, 40x40 r12 action buttons
- Navigation TabBar: h64, inner 343x48, FAB 48x44 r12, tab labels Mono 10px
- Navigation Sidebar: w244, bg #FAF8F4, nav labels Funnel Display 13px 400
- Accordion: Funnel Display 15px 400 titles, r20 container, chevron opacity 0.35
- Popover: double-layer (outer r20 p8 muted + inner r16 surface), items 10px 14px, icons 18px
- Container DS component uses variant config record mapping to --preview-* CSS vars
- Badge DS component renders on inline bell icon SVG for realistic preview context
- Status Chips DS component uses hardcoded hex colors per variant (semantic colors fixed across themes)
- Pagination uses intelligent ellipsis range algorithm for >7 pages
- Popover rendered in permanently visible state with trigger button for static preview

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-03-23T05:07:40Z
Stopped at: Completed 13-05-PLAN.md (Navigation, Chip, Date Picker, Slider, Snackbar playgrounds) — ALL PLANS COMPLETE
Resume file: None
