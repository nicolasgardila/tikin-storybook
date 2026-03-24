# Feature Research

**Domain:** Design System Documentation Site (Internal, Fintech)
**Researched:** 2026-03-20
**Confidence:** HIGH

Based on systematic analysis of shadcn/ui, Radix UI, Chakra UI, MUI, Ant Design, Carbon Design System, and Primer (GitHub). Each site was fetched and analyzed for documentation patterns, navigation, interactive features, and developer experience.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Every reference design system docs site has these. Omitting any of them will cause friction and undermine trust in the documentation.

| # | Feature | Why Expected | Complexity | Notes |
|---|---------|--------------|------------|-------|
| T1 | **Sidebar navigation with categories** | Every DS site (shadcn, MUI, Chakra, Carbon, Primer, Ant) uses persistent left sidebar grouped by category. Developers muscle-memory this pattern. | LOW | Group by: Foundations, Components, Guides. shadcn groups components alphabetically; Carbon groups by function. For 30+ components, alphabetical with category headers works best. |
| T2 | **Component page structure: description + preview + code + props** | Universal pattern across all 7 sites analyzed. This IS the documentation. | MEDIUM | Each page: title, 1-line description, visual preview, code snippet, props/API table. shadcn and Primer both follow this exact flow. |
| T3 | **Syntax-highlighted code blocks with copy button** | Present on ALL 7 sites. Developers expect to copy-paste code. Without copy button, friction is unacceptable. | LOW | Use rehype-pretty-code or shiki for highlighting. Copy button is non-negotiable. |
| T4 | **Props/API reference table** | shadcn, MUI, Chakra, Primer, Ant all have structured prop tables with name, type, default, and description columns. | LOW | Columns: Prop, Type, Default, Description. Can auto-generate from TypeScript types later, but manual MDX tables work for v1. |
| T5 | **Dark/Light mode toggle** | shadcn, Chakra, MUI, Primer, Ant all have it. Especially critical here since the DS itself has light + dark themes. | LOW | Toggle in header. Docs site theme AND component previews must switch. next-themes is the standard solution. |
| T6 | **Responsive layout** | Carbon, MUI, Chakra all handle mobile well. Internal devs will reference on mobile for quick lookups. | MEDIUM | Collapsible sidebar on mobile (hamburger menu). Content area full-width. shadcn pattern: sidebar hidden on mobile, toggle to reveal. |
| T7 | **Search** | Every major DS site has search. With 30+ components + foundations, navigation alone is insufficient. | MEDIUM | cmdk (command palette with Cmd+K) is the standard for Next.js sites. shadcn, Chakra use this pattern. For internal site, local search over MDX frontmatter is sufficient -- no Algolia needed. |
| T8 | **Foundations pages: Colors, Typography, Spacing, Radius, Shadows** | Carbon, MUI, Ant, Primer all document design tokens. This is the "source of truth" promise. | MEDIUM | Visual swatches for colors, type scale specimens, spacing scale visualization. These are content pages, not interactive tools. The DS has 19 spacing tokens, 10 radius tokens, 5 shadow levels -- all need visual representation. |
| T9 | **Installation / Getting Started guide** | shadcn, MUI, Chakra, Ant all lead with setup instructions. First page new devs hit. | LOW | Single page: install dependencies, import fonts, configure Tailwind, first component usage. |
| T10 | **Code examples matching production stack** | All sites show examples in their actual framework (React for MUI/Chakra/shadcn). Examples must match what devs write. | LOW | React + Tailwind examples. No multi-framework support needed (internal team uses one stack). |
| T11 | **Do/Don't usage guidelines** | Carbon, Primer, and Ant all include visual do/don't cards showing correct vs incorrect usage. | LOW | Green checkmark / red X visual pattern. Critical for components with nuanced usage (Dialog vs Bottom Sheet, Chip vs Badge). |
| T12 | **"On this page" table of contents** | shadcn, Primer, Chakra show right-side TOC for long component pages. | LOW | Auto-generated from MDX headings. Right column on desktop, hidden on mobile. |
| T13 | **Previous/Next navigation** | shadcn, Chakra link to adjacent component pages at bottom. Supports linear browsing. | LOW | Simple prev/next links at page bottom. |

### Differentiators (Competitive Advantage for Internal Adoption)

These features separate great DS docs from adequate ones. For an internal team, these drive adoption speed and reduce Slack questions.

| # | Feature | Value Proposition | Complexity | Notes |
|---|---------|-------------------|------------|-------|
| D1 | **Live component previews (rendered, not screenshots)** | Developers see exactly what the component looks like in both themes. Builds trust that docs match reality. shadcn, Chakra, MUI all render real components. | HIGH | Requires building actual React components for the docs site (not the production lib). This is the single highest-value feature but also the most work. Can start with static previews and upgrade to live. |
| D2 | **Desktop + Mobile variant toggle** | Unique to this DS -- components have explicit mobile variants. No major public DS site does this well because they don't have mobile-specific components. | MEDIUM | Toggle or tabs showing desktop vs mobile render of each component. Critical since the DS explicitly defines both. |
| D3 | **Light + Dark theme preview toggle** | Show component in both themes side-by-side or with toggle. Carbon and Primer do this. Most DS sites only show one theme. | MEDIUM | Per-component theme toggle, separate from the site-wide dark mode. Lets devs see both variants without switching the whole page. |
| D4 | **Color token visualizer with semantic mapping** | The warm/neutral dual-tone system is distinctive. A visual that maps semantic tokens (bg-primary, border-subtle) to actual values across both tones would eliminate confusion. | MEDIUM | Table or visual grid: token name, warm value, neutral value, usage context. No public DS does the dual-tone mapping well because it's uncommon. |
| D5 | **Component anatomy diagrams** | Carbon and Primer label component parts (trigger, content, overlay). Helps devs understand structure before reading props. | LOW | Static SVG/image annotations. Can be simple labeled screenshots from Figma. Not interactive. |
| D6 | **Copy-paste ready code snippets** | shadcn pioneered this -- code you can literally copy into your project. Not abstract examples but production-ready patterns. | LOW | Each component page has 3-5 real usage snippets (basic, with icons, in a form, etc.) that work when pasted into the Tikin app. |
| D7 | **Typography specimen page** | Show all 3 font families (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono) with their roles, sizes, weights, and real text samples. | LOW | Static page but visually rich. Show each font at each defined size with the actual role label (H1, Body, CTA). |
| D8 | **Grid system visualizer** | Interactive or static visualization of the 12/8/4 column grid system with sidebar layouts. | LOW | CSS grid overlay visualization. Can be a simple colored-column diagram. |
| D9 | **Icon library reference page** | Searchable page listing available Phosphor icons with copy-to-clipboard for SVG/component import. Primer has this. | MEDIUM | Filterable grid of icons. Each icon: visual, name, copy SVG button. Links to phosphoricons.com for full library. |
| D10 | **Component status badges** | Primer uses status indicators (Alpha, Beta, Stable, Deprecated). Shows which components are ready vs in progress. | LOW | Badge on sidebar and component page header. Useful during progressive rollout of 30+ components. |
| D11 | **Changelog / What's New** | Carbon and MUI maintain changelogs. Keeps team informed of DS updates. | LOW | Simple MDX page updated when components are added or changed. Not automated. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that sound valuable but create maintenance burden, complexity, or false promises for an internal 30-component documentation site.

| # | Feature | Why Requested | Why Problematic | Alternative |
|---|---------|---------------|-----------------|-------------|
| A1 | **Full interactive playground / live code editor** | MUI and Chakra have them. Devs want to "try before they use." | Massive complexity (sandpack, iframe isolation, dependency bundling). Maintenance burden is ongoing. For an internal team that can just run the code locally, ROI is low. Stale playgrounds erode trust faster than no playground. | Copy-paste code snippets that work in the actual project. Link to Storybook if interactive exploration is needed later. |
| A2 | **StackBlitz / CodeSandbox embeds** | Primer links to StackBlitz. Feels modern. | External dependency, slow to load, requires maintaining separate sandbox configs per component. Breaks when dependencies update. For internal use with a single known stack, unnecessary. | Local dev setup guide + copy-paste examples. |
| A3 | **Figma embed / live sync** | Teams want "single source of truth" from Figma. | Figma embeds are slow, require auth, break on reorganization. The docs already capture the design intent -- duplicating Figma frames adds no new info and creates sync issues. | Link to Figma file for each component. Screenshot key frames as static images in the docs. |
| A4 | **Automated prop extraction from source code** | Saves time generating props tables. MUI does this. | Requires tight coupling between docs and component library build system. Since this is a documentation site (not a distributable library), there's no source package to extract from. Premature optimization. | Manual props tables in MDX. Update when components change. For 30 components, this is manageable. |
| A5 | **AI-powered search / chatbot** | Algolia AskAI, Chakra promotes "AI tips." Trendy. | Massive overkill for internal docs with 30 components. Cmd+K local search covers 100% of use cases. AI search requires indexing pipeline, API costs, and maintenance. | cmdk local search over MDX frontmatter + headings. |
| A6 | **Multi-framework examples** | MUI shows React/TypeScript/JavaScript variants. | Internal team uses ONE stack (Next.js + React + Tailwind). Multiple framework examples are pure waste. | React + Tailwind only. |
| A7 | **Version selector / multi-version docs** | MUI and Ant support multiple versions. | No versioned package exists yet. The DS is v1. Multi-version adds routing complexity and maintenance for zero current value. | Single version. Add versioning only if/when the DS becomes a distributable package. |
| A8 | **Internationalization (i18n) for docs** | Ant Design supports Chinese/English. | Internal team is Spanish-speaking. Single language is explicitly in scope. i18n doubles content maintenance. | Spanish-only content. |
| A9 | **Automated visual regression testing** | Catch unintended visual changes. | Explicitly out of scope per PROJECT.md. Requires CI pipeline, screenshot diffing infrastructure. Not a docs feature, it's a testing feature. | Manual review. Add visual regression as a separate milestone if needed. |
| A10 | **WYSIWYG documentation editor** | Let designers write docs without code. | MDX is already human-readable. WYSIWYG adds editor complexity, format inconsistency, and a whole UI to build and maintain. For a small team, teaching MDX basics is faster. | MDX with clear templates. Quick-start guide for writing docs. |
| A11 | **Component usage analytics** | Track which docs pages are viewed most. | Internal site with small team. Just ask people what they need. Analytics infrastructure is overhead for <20 users. | Slack feedback channel. |

---

## Feature Dependencies

```
T1 (Sidebar nav) ──────────────────┐
T9 (Getting Started) ──────────────┤
T8 (Foundations pages) ─────────────┼── Site shell (layout, nav, routing)
T7 (Search / cmdk) ────────────────┤
T5 (Dark/Light toggle) ────────────┘

T2 (Component page structure) ─────┐
T3 (Code blocks + copy) ───────────┤
T4 (Props table) ───────────────────┼── Component page template
T11 (Do/Don't guidelines) ─────────┤
T12 (TOC) ──────────────────────────┤
T13 (Prev/Next nav) ───────────────┘

D1 (Live previews) ────────────────┐
D2 (Desktop/Mobile toggle) ────────┼── Component preview system
D3 (Light/Dark preview toggle) ────┘
  └── Depends on: actual React component implementations

T8 (Foundations) ──────────────────┐
D4 (Color token visualizer) ───────┼── Foundations content
D7 (Typography specimen) ──────────┤
D8 (Grid visualizer) ──────────────┘

D9 (Icon reference) ── Standalone page, no dependencies
D10 (Status badges) ── Depends on T1 (sidebar) + T2 (page header)
D11 (Changelog) ── Standalone MDX page
```

**Critical path:** Site shell -> Component page template -> Foundations content -> First component pages -> Previews

---

## MVP Definition

### Launch With (v1.0) -- "Devs can find and use any documented component"

| Feature | Rationale |
|---------|-----------|
| T1 Sidebar navigation | Core navigation. Without it, nothing works. |
| T2 Component page structure | The documentation itself. |
| T3 Code blocks + copy | Primary developer interaction. |
| T4 Props table | Reference information. |
| T5 Dark/Light toggle | DS has both themes; docs must show both. |
| T6 Responsive layout | Devs will check on mobile. |
| T7 Search (cmdk) | 30+ components need search, not just browsing. |
| T8 Foundations pages | Colors, typography, spacing -- the "why" behind components. |
| T9 Getting Started | First landing point. |
| T10 Production-stack examples | Copy-paste value. |
| T11 Do/Don't guidelines | Prevents misuse. |
| T12 On-this-page TOC | Navigation for long pages. |
| T13 Prev/Next links | Browsing flow. |
| D6 Copy-paste ready snippets | Core value proposition: "never guess." |
| D10 Component status badges | Essential during progressive rollout. |

**Preview strategy for v1.0:** Static component previews (screenshots or simple rendered examples). Full live previews (D1) can come in v1.x when React component implementations exist for the docs site.

### Add After Validation (v1.x) -- "Docs are delightful to use"

| Feature | Trigger to Add |
|---------|---------------|
| D1 Live component previews | When React preview components are built for enough components to justify the system. |
| D2 Desktop/Mobile variant toggle | When live previews exist; static screenshots can show both variants in v1.0. |
| D3 Light/Dark preview toggle | When live previews exist. Until then, show both themes as separate images/sections. |
| D4 Color token visualizer | After foundations pages are validated and team wants richer token exploration. |
| D5 Component anatomy diagrams | After first 10 component pages ship and team requests structural context. |
| D7 Typography specimen page | After core foundations; can be basic text in v1.0, rich specimen in v1.x. |
| D8 Grid system visualizer | Low priority; a well-written page with images suffices for v1. |
| D9 Icon library reference | After core components are documented; can link to phosphoricons.com in v1.0. |
| D11 Changelog | After there are actual changes to log (post-launch). |

### Future Consideration (v2+) -- "Only if there's real demand"

| Feature | Condition |
|---------|-----------|
| Interactive playground (A1) | Only if team is large enough (10+ devs) that "try before use" saves real time. |
| Figma embed (A3) | Only if Figma API stabilizes and there's a real sync workflow. |
| Auto prop extraction (A4) | Only if the DS becomes a distributable npm package with TypeScript source. |
| Version selector (A7) | Only if breaking changes require maintaining multiple DS versions. |
| Visual regression (A9) | Only if component count exceeds 50+ and manual review is insufficient. |

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Effort | Priority Score |
|---------|-----------|----------------------|----------------|
| T1 Sidebar nav | HIGH | LOW | **P0** |
| T2 Component page template | HIGH | MEDIUM | **P0** |
| T3 Code blocks + copy | HIGH | LOW | **P0** |
| T5 Dark/Light toggle | HIGH | LOW | **P0** |
| T7 Search (cmdk) | HIGH | MEDIUM | **P0** |
| T8 Foundations pages | HIGH | MEDIUM | **P0** |
| T9 Getting Started | HIGH | LOW | **P0** |
| T4 Props table | MEDIUM | LOW | **P1** |
| T6 Responsive layout | MEDIUM | MEDIUM | **P1** |
| T10 Production-stack examples | HIGH | LOW | **P1** |
| T11 Do/Don't guidelines | MEDIUM | LOW | **P1** |
| T12 TOC | MEDIUM | LOW | **P1** |
| T13 Prev/Next | LOW | LOW | **P1** |
| D6 Copy-paste snippets | HIGH | LOW | **P1** |
| D10 Status badges | MEDIUM | LOW | **P1** |
| D1 Live previews | HIGH | HIGH | **P2** |
| D2 Desktop/Mobile toggle | HIGH | MEDIUM | **P2** |
| D3 Light/Dark preview toggle | MEDIUM | MEDIUM | **P2** |
| D4 Color visualizer | MEDIUM | MEDIUM | **P2** |
| D5 Anatomy diagrams | LOW | LOW | **P2** |
| D7 Typography specimen | MEDIUM | LOW | **P2** |
| D9 Icon reference | MEDIUM | MEDIUM | **P2** |

---

## Competitor Feature Analysis

| Feature | shadcn/ui | MUI | Chakra UI | Ant Design | Carbon | Primer | Radix |
|---------|-----------|-----|-----------|------------|--------|--------|-------|
| Sidebar nav | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Search (Cmd+K) | Yes | DocSearch | Yes (Cmd+K) | Algolia | Yes | Yes | Yes |
| Live preview | Rendered | Interactive | Rendered | Rendered | Rendered | Rendered | Rendered |
| Props table | Yes | Auto-generated | Yes | Auto-generated | Yes | Yes | Yes |
| Code copy button | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Dark/Light toggle | Yes | Yes | Yes | No (separate theme) | Yes | Yes | Yes |
| Do/Don't guidelines | Minimal | Minimal | Minimal | Minimal | Strong | Strong | No |
| Accessibility docs | Basic | Good | Good | Good | Excellent | Excellent | Excellent |
| Component status | No | No | Version badge | No | No | Alpha/Beta/Stable | No |
| Playground | No | Yes | Live editor | Yes | No | StackBlitz | No |
| Multi-framework | No | No | No | Yes | Yes (React/Angular/Vue) | React/Rails | Yes (vanilla/React) |
| Typography docs | Minimal | Theme guide | Yes | Token docs | Excellent | Good | Minimal |
| Color docs | Minimal | Theme guide | Yes | Token docs | Excellent | Good | Theme docs |
| Figma link | Yes | Yes | No | Yes | Yes | Yes | No |
| On-this-page TOC | Yes | No | Yes | Yes | No | Yes | Yes |
| Prev/Next nav | Yes | No | Yes | Yes | No | Yes | Yes |
| Responsive docs | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| i18n | No | No | No | Yes (zh/en) | No | No | No |
| Changelog | No | Yes (blog) | Yes | Yes | Yes | Yes | No |
| Getting started | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

**Key insight for this project:** shadcn/ui is the explicit reference model. It succeeds with a surprisingly lean feature set: sidebar, rendered previews, code copy, props table, dark mode toggle, and search. It deliberately avoids playgrounds, auto-generated API docs, and multi-framework support. This validates a lean approach for an internal DS docs site.

---

## Sources

### Primary (HIGH confidence) -- Direct site analysis
- [shadcn/ui Docs](https://ui.shadcn.com/docs) -- Fetched and analyzed component page structure
- [MUI Button Docs](https://mui.com/material-ui/react-button/) -- Fetched for feature analysis
- [Chakra UI Button Docs](https://chakra-ui.com/docs/components/button) -- Fetched for feature analysis
- [Carbon Design System](https://carbondesignsystem.com/components/button/usage/) -- Fetched for documentation patterns
- [Primer Button Docs](https://primer.style/components/button/react) -- Fetched for feature analysis
- [Ant Design Button Docs](https://ant.design/components/button) -- Fetched for feature analysis

### Secondary (MEDIUM confidence) -- Verified patterns
- [Backlight - DS Documentation Best Practices](https://backlight.dev/blog/design-system-documentation-best-practices) -- Documentation structure patterns
- [UXPin - Common DS Documentation Mistakes](https://www.uxpin.com/studio/blog/common-design-system-documentation-mistakes/) -- Anti-patterns and pitfalls
- [UXPin - Best Design System Examples 2025](https://www.uxpin.com/studio/blog/best-design-system-examples/) -- Feature landscape survey
- [StackBlitz - How to Document DS Components](https://blog.stackblitz.com/posts/design-system-component-documentation/) -- Component documentation patterns
- [DocSearch by Algolia](https://docsearch.algolia.com/) -- Search implementation reference
- [Storybook Docs](https://storybook.js.org/docs) -- Alternative documentation approach comparison

### Tertiary (LOW confidence) -- General context
- [Makers' Den - React UI Libraries 2025](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra) -- Ecosystem context
- [LogRocket - DS Documentation Tips](https://blog.logrocket.com/ux-design/design-system-documentation/) -- General best practices
