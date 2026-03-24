# Project Research Summary

**Project:** Black Cash Design System — Documentation Site
**Domain:** Design System Documentation Site (Internal, Fintech)
**Researched:** 2026-03-20
**Confidence:** HIGH

## Executive Summary

The Black Cash DS documentation site should replicate the shadcn/ui docs architecture, which is a well-understood, proven pattern: **fumadocs-mdx** for MDX content processing, **Next.js 15 App Router** with a catch-all `[[...slug]]` route, **custom component previews** via a registry pattern (no Sandpack), **shiki + rehype-pretty-code** for syntax highlighting, **cmdk** for search, and **next-themes** for dark mode. This is literally the stack shadcn/ui v4 uses — verified via source analysis.

The recommended approach uses fumadocs-mdx + fumadocs-core (headless utilities) but **not** fumadocs-ui, since the docs site needs pixel-precise control to match Black Cash DS branding (warm/neutral dual-tone, Funnel Display typography, 60% corner smoothing). Build the UI layer custom with Tailwind v4.

The biggest risks are: (1) **preview/production fidelity** — if docs components don't match production, developers abandon the docs permanently; (2) **theme namespace collision** between docs chrome and DS tokens — must be namespaced from day one; (3) **perfectionism paralysis** — shipping stub pages with previews + props tables is infinitely better than shipping nothing.

## Key Findings

### Recommended Stack

The stack follows the exact shadcn/ui v4 architecture. All versions verified on npm within the last 17 days.

**Core technologies:**
- **fumadocs-mdx ^14.2.x + fumadocs-core ^14.x**: MDX processing, frontmatter, TOC, sidebar utils — what shadcn/ui itself uses
- **shiki ^4.0.x + rehype-pretty-code ^0.14.x**: Server-rendered syntax highlighting, zero client JS, VS Code accuracy
- **cmdk ^1.1.x**: Command palette search (Cmd+K) — unstyled, accessible, 10M weekly downloads
- **next-themes ^0.4.6**: Dark/light/system theme switching — de facto standard for Next.js
- **@phosphor-icons/react ^2.1.10**: Icon library as specified in DS constraints
- **tailwind-corner-smoothing**: 60% corner smoothing on all radii (DS distinctive pattern)

**What NOT to use:** Storybook (different paradigm), Sandpack (250KB+ for unnecessary interactivity), Nextra/Docusaurus (opinionated, can't match shadcn layout), Prism.js (inferior to shiki), fumadocs-ui (imposes design opinions).

See [STACK.md](STACK.md) for full details, installation commands, and version compatibility matrix.

### Expected Features

Based on analysis of 7 reference DS sites (shadcn/ui, Radix, Chakra, MUI, Ant Design, Carbon, Primer).

**Must have (table stakes — 13 features):**
- Sidebar navigation with categories
- Component page structure: description + preview + code + props
- Syntax-highlighted code blocks with copy button
- Props/API reference table
- Dark/Light mode toggle
- Responsive layout
- Search (cmdk)
- Foundations pages (colors, typography, spacing, radius, shadows)
- Getting Started guide
- Production-stack code examples
- Do/Don't usage guidelines
- On-this-page TOC
- Previous/Next navigation

**Should have (differentiators):**
- Live component previews (rendered, not screenshots) — highest value but highest effort
- Desktop + Mobile variant toggle — unique to this DS
- Light + Dark theme preview toggle per component
- Color token visualizer for warm/neutral dual-tone system
- Component status badges (Alpha/Beta/Stable)
- Copy-paste ready code snippets

**Defer (v2+):**
- Interactive playground / live code editor
- Figma embeds
- AI-powered search
- Multi-framework examples
- Automated prop extraction from source

See [FEATURES.md](FEATURES.md) for full prioritization matrix and competitor analysis.

### Architecture Approach

The architecture follows a 6-layer build order with clear dependency chains. Content lives in `content/docs/` (decoupled from `app/`), processed by fumadocs-mdx at build time, rendered through a catch-all `[[...slug]]` route. Sidebar navigation is config-driven (not filesystem-generated) for explicit control over ordering and grouping.

**Major components:**
1. **MDX Pipeline** — fumadocs-mdx + rehype-pretty-code + remark-gfm → compiled React Server Components
2. **Layout Shell** — Sidebar + content area + TOC in CSS Grid, mobile-responsive with sheet/drawer nav
3. **Content Components** — Custom MDX components (ComponentPreview, CodeBlock, PropsTable, ColorSwatch, DoDont)
4. **Component Registry** — `/registry/examples/` with lazy-loaded demo components + raw source extraction
5. **Theme System** — next-themes + Tailwind v4 `@custom-variant dark` + namespaced CSS variables (docs chrome vs DS tokens)
6. **Search** — cmdk + static index built from MDX frontmatter at build time

See [ARCHITECTURE.md](ARCHITECTURE.md) for full project structure, data flows, and code examples.

### Critical Pitfalls

12 specific pitfalls identified, mapped to prevention phases:

1. **Preview/production mismatch** (trust-killer #1) — Share exact Tailwind theme config between docs and production. Visual spot-check first 3 components. *Phase 1.*
2. **Theme namespace collision** — Namespace DS tokens (`--ds-bg-warm`) vs docs tokens (`--docs-bg`). Render previews in isolated scope. *Phase 1.*
3. **Unvalidated component page template** — Document 2 components (1 simple, 1 complex) and get developer feedback before scaling to 30. *Phase 2.*
4. **MDX blank-line-inside-JSX crashes** — Document rule, add linting. *Phase 1.*
5. **Perfectionism paralysis** — Define "minimum viable page" (preview + props + 1 code snippet). Ship stubs with banners. *Phase 2.*
6. **Search missing until too late** — Implement by Phase 2. Without it, devs Slack instead of checking docs. *Phase 2.*
7. **Warm/neutral dual-tone undocumented** — Every preview must show correct background context. Add dual-tone decision tree to Foundations. *Phase 1-2.*
8. **Font loading layout shift** — Use `next/font/google` with explicit weight subsets. Target CLS < 0.1. *Phase 1.*

See [PITFALLS.md](PITFALLS.md) for all 12 pitfalls with prevention strategies and recovery plans.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation Layer + Site Shell
**Rationale:** MDX pipeline and layout must exist before any content can be authored. All 12 pitfalls require Phase 1 decisions (theming, font loading, namespace strategy, content pipeline architecture).
**Delivers:** Working Next.js 15 app with fumadocs-mdx pipeline, Tailwind v4 theming with namespaced DS tokens, sidebar + content layout, dark mode toggle, font loading.
**Addresses:** T1 (sidebar), T5 (dark mode), T6 (responsive), T9 (getting started placeholder)
**Avoids:** P2 (preview mismatch — shared theme config), P3 (MDX coupling), P4 (blank line linting), P5 (namespace collision), P12 (font FOUT)

### Phase 2: Content Infrastructure + MDX Components
**Rationale:** Custom MDX components (CodeBlock, PropsTable, ComponentPreview, DoDont, Callout) are needed before any meaningful content. This is the "template" phase — build and validate the component page template.
**Delivers:** All custom MDX components, code copy functionality, component preview system, props table component, search (cmdk).
**Addresses:** T2 (page structure), T3 (code blocks), T4 (props table), T7 (search), T11 (do/don't), T12 (TOC), T13 (prev/next)
**Avoids:** P1 (validate template with 2 real components before scaling), P7 (search exists early)

### Phase 3: Foundations Content
**Rationale:** Foundations pages establish the DS's core vocabulary (colors, typography, spacing, grids). These are simpler than component pages (no preview system needed) and give the team immediate reference value. Also validates the warm/neutral dual-tone documentation.
**Delivers:** All foundations pages with visual token representations — colors (warm/neutral), typography specimens, spacing scale, radius tokens, shadow levels, border widths, component heights, grids, corner smoothing.
**Addresses:** T8 (foundations), D4 (color visualizer), D7 (typography specimen), D8 (grid visualizer)
**Avoids:** P11 (warm/neutral dual-tone explicitly documented)

### Phase 4: Component Documentation (Batch 1 — Core)
**Rationale:** Start with the most-used components. Validate the component page workflow end-to-end before documenting all 30+. Build actual React preview components for each.
**Delivers:** ~10-12 most critical component pages (Buttons, TextField, Select, Checkbox, Toggle, Card, Badge, Toast, Dialog, Container) with live previews, code examples, props tables.
**Addresses:** D1 (live previews), D6 (copy-paste snippets), D10 (status badges)
**Avoids:** P6 (code drift — real imports), P10 (ship MVP pages, enhance later)

### Phase 5: Component Documentation (Batch 2 — Complete)
**Rationale:** Remaining 20+ components using the validated template and preview system from Phase 4.
**Delivers:** All remaining component pages: Radio, Bottom Sheet, Side Panel, Navigation, Tabs, Search Bar, OTP Input, Avatar, Tooltip, Skeleton, Progress Bar, Divider, Chip/Tag, Pagination, Table, Alert/Banner, Breadcrumbs, Accordion, Date Picker, Slider/Range, Popover, Segmented Control, Snackbar, Dropdown, Status Chips.
**Addresses:** D2 (desktop/mobile toggle), D3 (light/dark preview toggle)

### Phase 6: Polish + Guides
**Rationale:** Enhancement pass once all content exists. Add guides, icon reference, and refinements based on team feedback.
**Delivers:** Installation guide polish, icon library reference page (D9), component anatomy diagrams (D5), changelog page (D11), any requested enhancements.
**Addresses:** D5, D9, D11

### Phase Ordering Rationale

- **Phase 1 before everything:** All other phases depend on the MDX pipeline, theme system, and layout shell. Pitfall research confirms that theming, namespace, and font decisions in Phase 1 have irreversible consequences.
- **Phase 2 before content:** You can't write MDX content without the custom components that make it useful (CodeBlock, ComponentPreview, PropsTable).
- **Phase 3 before Phase 4:** Foundations pages are simpler (no preview components needed) and establish the DS vocabulary that component docs reference. Also validates the content pipeline.
- **Phase 4 batched (10-12) before Phase 5 (20+):** Validates the component documentation workflow at small scale. Pitfall #1 (unvalidated template) is the most expensive mistake to make at 30-page scale.
- **Phase 6 last:** Guides and polish are enhancements that can wait until the core documentation exists.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** fumadocs-mdx + shiki 4 integration specifics — verify if fumadocs handles syntax highlighting internally or needs rehype-pretty-code as additional plugin
- **Phase 1:** Corner smoothing (`tailwind-corner-smoothing`) with Tailwind v4 CSS-only config — needs implementation-time verification
- **Phase 1:** Confirm `Funnel_Display` is available via `next/font/google` with exact registered name
- **Phase 2:** Component preview isolation strategy — start inline, research iframe if theme bleeding occurs

Phases with standard patterns (skip research-phase):
- **Phase 3:** Foundations content pages are straightforward MDX with custom visualization components
- **Phase 5:** Same template as Phase 4, just more components
- **Phase 6:** Standard guide pages, no novel patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified on npm within last 17 days. shadcn/ui architecture confirmed via source analysis. |
| Features | HIGH | Verified against all 7 reference sites via direct page fetching. |
| Architecture | HIGH | Synthesized from shadcn/ui source, Next.js conventions, fumadocs docs. |
| Pitfalls | HIGH | Core pitfalls verified against official docs. Stack-specific edge cases are MEDIUM. |

**Overall confidence:** HIGH

### Gaps to Address

- **Dark mode token values:** Light theme tokens are documented (warm #F1EFEB, neutral #F6F6F6), but dark mode equivalents need design validation before Phase 1 implementation.
- **Live preview strategy:** Should docs build its own React components or reuse production components? Biggest Phase 4 architectural decision — needs deeper research during Phase 4 planning.
- **fumadocs-mdx internal pipeline:** May handle shiki internally — verify during Phase 1 whether rehype-pretty-code is needed as additional plugin or redundant.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Documentation Architecture — DeepWiki](https://deepwiki.com/shadcn-ui/ui/8-development-workflow)
- [shadcn/ui GitHub Repository](https://github.com/shadcn-ui/ui)
- [Next.js Official MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Fumadocs official site](https://www.fumadocs.dev/)
- npm: fumadocs-mdx 14.2.9, shiki 4.0.2, rehype-pretty-code 0.14.3, next-themes 0.4.6, cmdk 1.1.1, @phosphor-icons/react 2.1.10

### Secondary (MEDIUM confidence)
- [Carbon Design System](https://carbondesignsystem.com/) — documentation patterns
- [Primer Design System](https://primer.style/) — component status and navigation patterns
- [Chakra UI](https://chakra-ui.com/docs) — feature analysis
- [UXPin: DS Documentation Mistakes](https://www.uxpin.com/studio/blog/common-design-system-documentation-mistakes/)
- [NNGroup: IA Mistakes](https://www.nngroup.com/articles/top-10-ia-mistakes/)

### Tertiary (LOW confidence)
- Dark mode token values (extrapolated from light theme)
- Corner smoothing browser support (needs runtime validation)

---
*Research completed: 2026-03-20*
*Ready for roadmap: yes*
