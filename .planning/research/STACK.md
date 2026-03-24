# Stack Research: Design System Documentation Site

**Domain:** Design System Documentation Site (shadcn/ui-style)
**Researched:** 2026-03-20
**Confidence:** HIGH

## Summary

The shadcn/ui v4 documentation site itself uses **fumadocs-mdx** for MDX processing, **Next.js App Router** for routing, and a **custom component registry** for live previews. This is the proven pattern to replicate. Rather than cobbling together low-level MDX tooling, use fumadocs-mdx as the content layer (like shadcn does) and build the UI/layout custom with Tailwind v4.

**Primary recommendation:** Use fumadocs-mdx for content processing + rehype-pretty-code/shiki for syntax highlighting + custom component previews (no Sandpack) + cmdk for search + next-themes for dark mode. This matches the exact shadcn/ui v4 architecture.

**Important version note:** Next.js 16 (v16.2.0) is now available as of March 2026. However, the project spec calls for Next.js 15, which remains stable and well-supported. Fumadocs has full Next.js 15 support. Recommend staying with Next.js 15 as specified -- upgrading to 16 can be a future milestone if needed.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (latest 15) | Framework, routing, SSR/SSG | Specified in project. Stable, App Router mature. Fumadocs supports it fully. |
| React | 19.x | UI library | Required by Next.js 15. |
| Tailwind CSS | 4.2.x | Styling | Specified in project. v4 has zero-config, 5x faster builds, CSS-first config. |
| TypeScript | 5.x | Type safety | Standard for Next.js projects. Fumadocs generates typed content. |

**Confidence:** HIGH -- these are specified in PROJECT.md and verified as current.

### MDX Processing

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| fumadocs-mdx | ^14.2.x | MDX content processing, frontmatter, file-based routing | **This is what shadcn/ui v4 uses.** Handles MDX compilation, frontmatter extraction, TOC generation, content validation. Built for Next.js App Router. |
| fumadocs-core | ^14.x | Core utilities (sidebar, breadcrumbs, TOC, search) | Required companion to fumadocs-mdx. Provides headless utilities without imposing UI. |
| @mdx-js/react | ^3.x | MDX React runtime | Required for custom MDX components rendering. |

**Confidence:** HIGH -- verified that shadcn/ui v4 uses fumadocs-mdx via [DeepWiki analysis](https://deepwiki.com/shadcn-ui/ui/8-development-workflow) and GitHub source.

**Why NOT fumadocs-ui:** fumadocs-ui is a pre-built UI layer. Since the goal is to replicate shadcn/ui's exact look with custom Black Cash DS styling, use only fumadocs-mdx (content) + fumadocs-core (headless utils) and build the UI yourself with Tailwind. This gives full visual control.

### Syntax Highlighting

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| shiki | ^4.0.x | Syntax highlighting engine | Uses VS Code's grammar engine. Server-side rendering = zero client JS. Accurate TypeScript/JSX highlighting. Industry standard for docs sites in 2025+. |
| rehype-pretty-code | ^0.14.x | Rehype plugin bridging shiki to MDX | Beautiful code blocks with line highlighting, line numbers, word highlighting, copy button support. Works at build time. ESM-only, supports shiki 4. |

**Confidence:** HIGH -- verified via [npm](https://www.npmjs.com/package/shiki) (shiki 4.0.2, 10 days ago) and [rehype-pretty-code](https://www.npmjs.com/package/rehype-pretty-code) (0.14.3, 17 days ago).

### Live Component Previews

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Custom `<ComponentPreview>` | N/A | Render live component examples inline in docs | **This is how shadcn/ui does it.** Build a registry of example components, lazy-load them into a preview wrapper. No heavy sandbox needed. |

**Confidence:** HIGH -- verified via [shadcn source analysis](https://jmduke.com/posts/post/how-shadcn-ui-works/).

**Why NOT Sandpack:** Sandpack is for full interactive code editing (like React docs). For a DS docs site showing your own components, you just render them directly. A `<ComponentPreview>` wrapper with tabs (Preview / Code) is simpler, faster, and exactly what shadcn does. Sandpack adds ~250KB+ of client JS unnecessarily.

**Pattern:** Create a `/registry` directory with example files. A build script generates an index. The `<ComponentPreview>` component imports the example by name, renders it in an iframe or div, and shows raw source alongside.

### Search

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| cmdk | ^1.1.x | Command palette UI (Cmd+K) | The standard for docs search. Unstyled, accessible, keyboard-first. Used by shadcn/ui, Vercel, Linear. ~10M weekly downloads. |
| flexsearch | ^0.7.x | Client-side full-text search index | Lightweight, fast, no external service needed. Perfect for internal docs with 30-50 pages. Builds search index at build time. |

**Confidence:** HIGH for cmdk (verified [npm 1.1.1](https://www.npmjs.com/package/cmdk)). MEDIUM for flexsearch (alternative: fumadocs-core has built-in search integration with Orama).

**Alternative:** If fumadocs-core's built-in search is sufficient, skip flexsearch entirely. fumadocs-core supports Orama (local) and Algolia (hosted). For 30+ component pages, local search is plenty.

### Theming / Dark Mode

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| next-themes | ^0.4.6 | Theme switching (light/dark/system) | De facto standard for Next.js dark mode. 2-line setup. Works with App Router. Used by shadcn/ui. No hydration flash. |

**Confidence:** HIGH -- verified [npm 0.4.6](https://www.npmjs.com/package/next-themes). Stable, 2400+ dependents.

**Tailwind v4 integration:** Use `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` in globals.css with `attribute="data-theme"` on ThemeProvider to avoid hydration mismatches.

### Sidebar Navigation

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| fumadocs-core (sidebar utils) | ^14.x | Sidebar structure from file system | Generates sidebar items from MDX file structure automatically. Supports nested groups, labels, ordering via meta files. |
| Custom `<Sidebar>` component | N/A | Visual sidebar matching shadcn layout | Build with Tailwind. Sticky, collapsible, responsive (sheet on mobile). Consumes fumadocs-core data. |

**Confidence:** HIGH -- fumadocs-core sidebar generation is well-documented.

### Code Copy Functionality

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Built into rehype-pretty-code + custom button | N/A | Copy code to clipboard | rehype-pretty-code exposes raw code via data attributes. Add a `<CopyButton>` using `navigator.clipboard.writeText()`. No library needed. |

**Confidence:** HIGH -- standard pattern, no external dependency required.

### Icons

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| @phosphor-icons/react | ^2.1.10 | Icon library | Specified in project constraints. Tree-shakeable, 6 weights, 1000+ icons. |

**Confidence:** HIGH -- verified [npm 2.1.10](https://www.npmjs.com/package/@phosphor-icons/react).

### Fonts

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| next/font/google | (bundled with Next.js) | Font loading | Zero-layout-shift font loading. Built into Next.js. Supports Funnel Display, Ubuntu Sans, Ubuntu Sans Mono. |

**Confidence:** HIGH -- built into Next.js, no extra dependency.

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwind-corner-smoothing | latest | iOS-style corner smoothing (60%) | For the DS's distinctive 60% corner smoothing on all radii. |
| clsx + tailwind-merge | latest | Conditional class merging | Standard utility for Tailwind component building. |
| lucide-react | latest | Additional UI icons (optional) | Only if Phosphor lacks specific docs-UI icons (unlikely). |
| react-resizable-panels | latest | Resizable preview panels | If you want draggable desktop/mobile preview sizing (nice-to-have). |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @tailwindcss/vite | Tailwind v4 build plugin | Required for Tailwind v4 with Next.js |
| eslint + eslint-config-next | Linting | Standard Next.js linting |
| prettier + prettier-plugin-tailwindcss | Formatting | Auto-sorts Tailwind classes |
| turbo (optional) | Build orchestration | Only if monorepo structure needed |

## Installation

```bash
# Core framework
npm install next@15 react@19 react-dom@19 typescript

# Tailwind v4
npm install tailwindcss @tailwindcss/vite

# MDX processing (the shadcn/ui approach)
npm install fumadocs-mdx fumadocs-core @mdx-js/react

# Syntax highlighting
npm install shiki rehype-pretty-code

# Theming
npm install next-themes

# Search (command palette)
npm install cmdk

# Icons
npm install @phosphor-icons/react

# Utilities
npm install clsx tailwind-merge

# Corner smoothing
npm install tailwind-corner-smoothing

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom @types/mdx
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| fumadocs-mdx | @next/mdx (raw) | Only if you want zero framework overhead and will manually handle frontmatter, TOC, sidebar generation, and content validation. Massive extra work for no benefit. |
| fumadocs-mdx | next-mdx-remote | Avoid -- poorly maintained as of 2025. next-mdx-remote-client exists but adds unnecessary complexity for local files. |
| fumadocs-mdx | Velite | Valid alternative for content management with Zod schemas. Choose if you want more explicit schema control and don't need fumadocs-core sidebar/search utils. |
| fumadocs-mdx | Contentlayer | Avoid -- project was unmaintained for long periods. Velite is the spiritual successor. |
| shiki + rehype-pretty-code | Prism.js | Only if you need client-side highlighting (you don't -- SSG handles it). Prism has inferior TypeScript/JSX support. |
| shiki + rehype-pretty-code | @shikijs/rehype | Valid alternative to rehype-pretty-code. More minimal, fewer features (no word highlighting, line highlighting). Use if rehype-pretty-code feels too opinionated. |
| Custom ComponentPreview | Sandpack | Only if you need user-editable live code playgrounds. Overkill for showing static component previews. Adds 250KB+ client JS. |
| Custom ComponentPreview | react-live | Lighter than Sandpack but still unnecessary for rendering your own components. Useful for "try editing this code" experiences. |
| cmdk | Algolia DocSearch | If you had 500+ pages and needed hosted search. Overkill for 30-50 internal pages. |
| next-themes | Custom CSS media query | Only if you need zero JS for theme switching. Loses system preference detection and toggle persistence. |
| fumadocs-core sidebar | Custom file-system walker | Only if fumadocs-core's sidebar generation doesn't fit your content structure. Unlikely. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Storybook | Heavy, different paradigm. You want a docs site, not a component development environment. Does not replicate shadcn layout. | Custom Next.js + MDX site |
| next-mdx-remote | Poorly maintained. Designed for remote content, not local files. | fumadocs-mdx |
| Contentlayer | Maintenance concerns. Development stalled for extended periods. | fumadocs-mdx or Velite |
| Nextra | Opinionated framework that constrains layout/design. Hard to match shadcn's exact layout. | fumadocs-mdx (content) + custom UI |
| Docusaurus | React-based but not Next.js. Different ecosystem. Can't use App Router features. | Next.js + fumadocs-mdx |
| Prism.js / react-syntax-highlighter | Inferior TypeScript/JSX highlighting. Client-side rendering unnecessary with SSG. | shiki + rehype-pretty-code |
| Sandpack | 250KB+ client JS for interactive sandboxes. You're showing your own components, not user-editable code. | Custom ComponentPreview |
| Inter / Roboto / system fonts | Generic "AI slop" aesthetics. Project has specific brand fonts. | Funnel Display, Ubuntu Sans, Ubuntu Sans Mono |
| Radix UI primitives | Adds dependency layer for basic docs UI. Not needed when building with Tailwind. | Pure Tailwind components |
| fumadocs-ui | Pre-built UI theme. Prevents matching shadcn/ui layout exactly with Black Cash DS branding. | fumadocs-core (headless) + custom Tailwind UI |

## Stack Patterns: The shadcn/ui Architecture

### Content Layer (fumadocs-mdx)
```
content/
  docs/
    foundations/
      colors.mdx          # Frontmatter + MDX content
      typography.mdx
      spacing.mdx
    components/
      button.mdx
      checkbox.mdx
      dialog.mdx
    guides/
      installation.mdx
      theming.mdx
    meta.json              # Sidebar ordering and labels
```

fumadocs-mdx processes this directory into typed content objects with:
- Parsed frontmatter (title, description, component name)
- Generated TOC (table of contents)
- Compiled MDX (server-side)
- Sidebar structure from file hierarchy + meta.json

### Preview Layer (Custom Registry)
```
registry/
  examples/
    button-primary.tsx     # Self-contained example component
    button-secondary.tsx
    checkbox-default.tsx
    dialog-basic.tsx
  index.ts                 # Auto-generated registry map
```

A build script scans `/registry/examples/`, extracts raw source code, and generates an index:
```typescript
// registry/index.ts (auto-generated)
export const registry = {
  "button-primary": {
    component: lazy(() => import("./examples/button-primary")),
    source: `// raw source code string...`,
  },
  // ...
}
```

The `<ComponentPreview name="button-primary" />` MDX component:
1. Looks up the registry entry
2. Renders the component in a preview container
3. Shows raw source in a code block with copy button
4. Supports light/dark theme toggle within preview

### Page Layer (Next.js App Router)
```
app/
  docs/
    [[...slug]]/
      page.tsx             # Dynamic route consuming fumadocs content
  layout.tsx               # Root layout with ThemeProvider, fonts
  globals.css              # Tailwind v4 imports, CSS variables
```

### Component Layer (Custom UI)
```
components/
  docs/
    sidebar.tsx            # Custom sidebar matching shadcn layout
    toc.tsx                # Table of contents (right side)
    component-preview.tsx  # Preview + Code tabs
    copy-button.tsx        # Clipboard copy for code blocks
    search-dialog.tsx      # Cmd+K with cmdk
    theme-toggle.tsx       # next-themes toggle
    props-table.tsx        # Component props documentation
    mdx-components.tsx     # Custom MDX element overrides
```

## Version Compatibility Matrix

| Package | Min Version | Tested With | Notes |
|---------|-------------|-------------|-------|
| Next.js | 15.0 | 15.x latest | Do NOT use 16.x yet -- middleware renamed, caching changes |
| React | 19.0 | 19.x | Required by Next.js 15 |
| Tailwind CSS | 4.0 | 4.2.x | CSS-first config, no tailwind.config.js needed |
| fumadocs-mdx | 14.0 | 14.2.x | Requires Next.js 14+ |
| fumadocs-core | 14.0 | 14.x | Same major as fumadocs-mdx |
| shiki | 4.0 | 4.0.x | Major version jump from 1.x |
| rehype-pretty-code | 0.14 | 0.14.x | Supports shiki ^4.0 in latest |
| next-themes | 0.4 | 0.4.6 | Stable, works with App Router |
| cmdk | 1.0 | 1.1.x | Stable, unstyled |
| @phosphor-icons/react | 2.1 | 2.1.10 | Tree-shakeable |

## Configuration Patterns

### Tailwind v4 Dark Mode with next-themes

In `globals.css`:
```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

In `ThemeProvider`:
```tsx
<ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

This avoids class-based hydration mismatches with Tailwind v4.

### rehype-pretty-code Configuration

In fumadocs-mdx config or next.config.mjs:
```typescript
rehypePrettyCode({
  theme: { dark: "github-dark", light: "github-light" },
  keepBackground: false, // Let Tailwind handle backgrounds
  defaultLang: "tsx",
})
```

## Open Questions

1. **fumadocs-mdx + shiki 4 compatibility:** fumadocs-mdx bundles its own rehype pipeline. Need to verify if it passes through custom rehype plugins (rehype-pretty-code) or if it handles syntax highlighting internally. **Recommendation:** Check fumadocs docs during implementation; it likely has built-in shiki support.

2. **Corner smoothing browser support:** `tailwind-corner-smoothing` uses `border-radius` with `-webkit-mask` tricks. Verify it works on the team's browsers (likely Chrome/Edge only for internal tool). **Recommendation:** Test early, fallback to standard border-radius if needed.

3. **Component preview iframe vs inline:** shadcn uses inline rendering (same page context). For theme isolation (showing light AND dark previews), iframe approach may be needed. **Recommendation:** Start with inline, add iframe if theme bleeding occurs.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Documentation System Architecture - DeepWiki](https://deepwiki.com/shadcn-ui/ui/8-development-workflow) -- confirms fumadocs-mdx usage
- [How shadcn/ui examples work - jmduke](https://jmduke.com/posts/post/how-shadcn-ui-works/) -- component preview registry pattern
- [Fumadocs official site](https://www.fumadocs.dev/) -- framework documentation
- [fumadocs-mdx on npm](https://www.npmjs.com/package/fumadocs-mdx) -- version 14.2.9
- [shiki on npm](https://www.npmjs.com/package/shiki) -- version 4.0.2
- [rehype-pretty-code on npm](https://www.npmjs.com/package/rehype-pretty-code) -- version 0.14.3
- [next-themes on npm](https://www.npmjs.com/package/next-themes) -- version 0.4.6
- [cmdk on npm](https://www.npmjs.com/package/cmdk) -- version 1.1.1
- [@phosphor-icons/react on npm](https://www.npmjs.com/package/@phosphor-icons/react) -- version 2.1.10
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- official Next.js docs
- [shadcn/ui dark mode with next-themes](https://ui.shadcn.com/docs/dark-mode/next) -- official pattern

### Secondary (MEDIUM confidence)
- [Tailwind v4 + next-themes data-theme approach](https://www.sujalvanjare.com/blog/dark-mode-nextjs15-tailwind-v4) -- community guide, verified pattern
- [Comparing web code highlighters](https://chsm.dev/blog/2025/01/08/comparing-web-code-highlighters) -- shiki vs prism analysis
- [Fumadocs vs alternatives assessment](https://dev.to/infrasity-learning/fumadocs-for-products-with-rapidly-evolving-spis-sdks-1bah) -- comparison context

### Tertiary (LOW confidence)
- Next.js 16 upgrade impact -- mentioned for awareness but not recommended for this project yet

## Metadata

**Confidence breakdown:**
- Core framework (Next.js/React/Tailwind): HIGH -- specified in project, versions verified on npm
- MDX processing (fumadocs-mdx): HIGH -- verified as shadcn/ui's own choice, active maintenance
- Syntax highlighting (shiki/rehype-pretty-code): HIGH -- industry standard, recent releases
- Search (cmdk): HIGH -- de facto standard, 10M weekly downloads
- Theming (next-themes): HIGH -- stable, shadcn/ui uses it
- Component previews (custom registry): HIGH -- pattern verified from shadcn source
- Corner smoothing: MEDIUM -- browser support needs validation

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (30 days -- stable ecosystem, unlikely to shift)
