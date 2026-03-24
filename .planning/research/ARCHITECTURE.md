# Architecture Research

**Domain:** Design System Documentation Site
**Researched:** 2026-03-20
**Confidence:** HIGH

## Summary

MDX-based design system documentation sites like shadcn/ui follow a well-established architecture: file-system MDX content processed at build time, rendered through catch-all dynamic routes in Next.js App Router, with custom MDX components providing live previews, code blocks, and props tables. The shadcn/ui docs site itself uses **fumadocs-mdx** for content processing, but its custom layout, sidebar, component preview system, and theming are all bespoke.

For this project (Black Cash DS docs), the recommended approach is **@next/mdx with custom infrastructure** rather than fumadocs-ui. Rationale: the project needs pixel-precise control over layout to replicate shadcn's look using the DS's own design tokens (warm/neutral tones, Funnel Display typography, corner smoothing). Fumadocs-ui imposes its own design opinions that would need extensive overriding. Using @next/mdx with rehype/remark plugins gives full control while keeping the content pipeline simple.

**Primary recommendation:** Use @next/mdx + rehype-pretty-code (Shiki) for MDX pipeline, next-themes for dark mode, cmdk for search, and build the sidebar/layout/preview components from scratch using the DS's own tokens.

## Standard Architecture

### System Overview

```
+--------------------------------------------------+
|                   Next.js App                     |
|                                                   |
|  +-----------+    +----------------------------+  |
|  |  Sidebar  |    |     Main Content Area      |  |
|  |           |    |                            |  |
|  | nav-items |    |  +----------------------+  |  |
|  | from      |    |  | MDX Content          |  |  |
|  | config    |    |  |                      |  |  |
|  |           |    |  | <ComponentPreview/>  |  |  |
|  | search    |    |  | <CodeBlock/>         |  |  |
|  | (cmdk)    |    |  | <PropsTable/>        |  |  |
|  |           |    |  +----------------------+  |  |
|  |           |    |                            |  |
|  |           |    |  +----------------------+  |  |
|  |           |    |  | Table of Contents    |  |  |
|  |           |    |  | (right sidebar, opt) |  |  |
|  |           |    |  +----------------------+  |  |
|  +-----------+    +----------------------------+  |
|                                                   |
|  Theme Provider (next-themes) wraps everything    |
|  CSS Variables define light/dark tokens           |
+--------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| **MDX Pipeline** | Transform .mdx files into React pages at build time | @next/mdx + rehype-pretty-code + remark-gfm |
| **DocsLayout** | Shared layout with sidebar + content area | `app/docs/layout.tsx` with CSS Grid |
| **Sidebar** | Navigation tree, section grouping, active state | Config-driven client component with `usePathname()` |
| **ComponentPreview** | Live rendered component + code toggle | Custom MDX component, tabs for preview/code |
| **CodeBlock** | Syntax-highlighted code with copy button | rehype-pretty-code (Shiki) + custom `<pre>` wrapper |
| **PropsTable** | Component props/variants documentation | Custom MDX component, data from frontmatter or inline |
| **ThemeToggle** | Light/dark mode switch | next-themes + CSS custom properties |
| **Search** | Command palette for quick navigation | cmdk (Command Menu) with static index |
| **TableOfContents** | Right-side heading navigation | Parse headings from MDX at build time |
| **MobileNav** | Responsive sidebar for small screens | Sheet/drawer component triggered by menu button |
| **mdx-components.tsx** | Maps HTML elements to styled components | Root-level file required by @next/mdx |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx                # Home/landing page
│   ├── globals.css             # CSS variables, Tailwind v4 imports, theme tokens
│   └── docs/
│       ├── layout.tsx          # Docs layout: sidebar + content grid
│       └── [[...slug]]/
│           └── page.tsx        # Catch-all route: loads MDX by slug
│
├── content/
│   ├── docs/
│   │   ├── index.mdx           # Getting Started
│   │   ├── installation.mdx
│   │   ├── foundations/
│   │   │   ├── colors.mdx
│   │   │   ├── typography.mdx
│   │   │   ├── spacing.mdx
│   │   │   ├── radius.mdx
│   │   │   ├── shadows.mdx
│   │   │   ├── border-widths.mdx
│   │   │   ├── component-heights.mdx
│   │   │   ├── grids.mdx
│   │   │   └── corner-smoothing.mdx
│   │   ├── components/
│   │   │   ├── button.mdx
│   │   │   ├── checkbox.mdx
│   │   │   ├── dialog.mdx
│   │   │   └── ... (30+ component pages)
│   │   └── guides/
│   │       ├── icons.mdx
│   │       └── patterns.mdx
│   └── meta.json               # Navigation order and section labels (optional)
│
├── components/
│   ├── docs/
│   │   ├── sidebar.tsx         # Sidebar navigation tree
│   │   ├── sidebar-nav.tsx     # Individual nav section
│   │   ├── mobile-nav.tsx      # Mobile navigation drawer
│   │   ├── toc.tsx             # Table of contents (right sidebar)
│   │   ├── search.tsx          # Command menu (cmdk)
│   │   ├── theme-toggle.tsx    # Dark/light mode switch
│   │   ├── page-header.tsx     # Page title + description from frontmatter
│   │   └── pager.tsx           # Previous/Next page navigation
│   │
│   ├── mdx/
│   │   ├── component-preview.tsx   # Live preview + code tabs
│   │   ├── code-block.tsx          # Styled <pre> with copy button
│   │   ├── props-table.tsx         # Props/variants documentation table
│   │   ├── color-swatch.tsx        # Color token visualization
│   │   ├── typography-sample.tsx   # Typography specimen display
│   │   ├── spacing-scale.tsx       # Spacing token visualization
│   │   ├── do-dont.tsx             # Do/Don't pattern display
│   │   ├── callout.tsx             # Info/warning/error callouts
│   │   └── tabs.tsx                # Tab groups within MDX content
│   │
│   ├── previews/
│   │   ├── button-demo.tsx         # Button component preview
│   │   ├── checkbox-demo.tsx       # Checkbox component preview
│   │   └── ... (one per documented component)
│   │
│   └── ui/
│       ├── button.tsx              # DS button (used in previews)
│       ├── checkbox.tsx            # DS checkbox (used in previews)
│       └── ... (actual DS components rendered in previews)
│
├── config/
│   ├── docs.ts                 # Sidebar navigation structure
│   └── site.ts                 # Site metadata (title, description, URLs)
│
├── lib/
│   ├── mdx.ts                  # MDX utilities: slug resolution, frontmatter parsing
│   ├── toc.ts                  # Table of contents extraction from headings
│   └── utils.ts                # General utilities (cn(), etc.)
│
├── styles/
│   └── mdx.css                 # MDX content typography/prose styles
│
├── mdx-components.tsx          # Root MDX component mappings (REQUIRED by @next/mdx)
└── next.config.mjs             # MDX + rehype/remark plugin configuration
```

### Structure Rationale

**`content/docs/` separate from `app/`** -- Content authors edit MDX files without touching application code. The `[[...slug]]` catch-all route maps file paths to URLs. This mirrors how shadcn/ui and most documentation sites organize content.

**`components/docs/` vs `components/mdx/` vs `components/previews/`** -- Three distinct concerns:
- `docs/` = Site chrome (sidebar, search, nav) -- used in layouts
- `mdx/` = Custom components used *inside* MDX content -- mapped in mdx-components.tsx
- `previews/` = Component demo wrappers -- imported by ComponentPreview

**`components/ui/`** -- The actual design system components rendered in previews. These are the production components being documented, copied into this project. They use the DS tokens directly.

**`config/docs.ts`** -- Hardcoded navigation structure (not auto-generated from filesystem). This gives explicit control over ordering, grouping, and labels. shadcn/ui uses this approach -- sections are explicitly defined, not inferred.

## Architectural Patterns

### Pattern 1: Catch-All Dynamic Route for MDX

**What:** A single `app/docs/[[...slug]]/page.tsx` handles all documentation pages. The slug maps to an MDX file in `content/docs/`.

**Why:** Decouples URL structure from file system. One route handler, unlimited pages. Static generation via `generateStaticParams()` pre-renders all pages at build time.

**Example:**
```typescript
// app/docs/[[...slug]]/page.tsx
import { allDocs } from '@/lib/mdx'

export async function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slugAsParams.split('/') }))
}

export default async function DocPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') || 'index'
  const doc = await getDocBySlug(slug)
  if (!doc) notFound()

  return (
    <div className="flex">
      <article className="flex-1 min-w-0">
        <PageHeader title={doc.title} description={doc.description} />
        <MDXContent code={doc.body} />
      </article>
      <TableOfContents headings={doc.headings} />
    </div>
  )
}
```

### Pattern 2: Config-Driven Sidebar Navigation

**What:** Navigation structure defined in a TypeScript config file, not generated from the filesystem. Each section has a label, items with titles, hrefs, and optional nesting.

**Why:** Explicit ordering control. Sections like "Foundations" and "Components" need specific ordering that filesystem alphabetical sorting cannot provide. Labels can differ from file names.

**Example:**
```typescript
// config/docs.ts
export const docsConfig = {
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Installation', href: '/docs/installation' },
      ],
    },
    {
      title: 'Foundations',
      items: [
        { title: 'Colors', href: '/docs/foundations/colors' },
        { title: 'Typography', href: '/docs/foundations/typography' },
        { title: 'Spacing', href: '/docs/foundations/spacing' },
        // ...
      ],
    },
    {
      title: 'Components',
      items: [
        { title: 'Button', href: '/docs/components/button' },
        { title: 'Checkbox', href: '/docs/components/checkbox' },
        // ...
      ],
    },
  ],
}
```

### Pattern 3: Custom MDX Component Mapping

**What:** The root `mdx-components.tsx` file maps standard HTML elements and custom components to React components. This is how all MDX content gets styled consistently.

**Why:** Every `<h1>`, `<p>`, `<pre>`, `<code>`, `<table>` in MDX gets replaced with styled versions. Custom components like `<ComponentPreview>` become available in all MDX files without imports.

**Example:**
```typescript
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { ComponentPreview } from '@/components/mdx/component-preview'
import { CodeBlock } from '@/components/mdx/code-block'
import { PropsTable } from '@/components/mdx/props-table'
import { Callout } from '@/components/mdx/callout'
import { ColorSwatch } from '@/components/mdx/color-swatch'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="font-funnel text-3xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="font-funnel text-2xl font-semibold mt-8 mb-3 border-b pb-2">{children}</h2>,
    p: ({ children }) => <p className="font-ubuntu leading-7 mb-4">{children}</p>,
    code: ({ children }) => <code className="font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">{children}</code>,
    pre: CodeBlock,    // rehype-pretty-code outputs <pre>, we intercept it
    table: ({ children }) => <div className="overflow-x-auto"><table className="w-full text-sm">{children}</table></div>,
    // Custom components available in MDX without imports
    ComponentPreview,
    PropsTable,
    Callout,
    ColorSwatch,
    ...components,
  }
}
```

### Pattern 4: ComponentPreview with Tabs

**What:** A custom MDX component that renders a live component demo alongside its source code. Users toggle between "Preview" and "Code" tabs.

**Why:** The core UX of design system docs. Developers see what the component looks like AND how to use it. The preview renders the actual DS component; the code tab shows the usage snippet.

**Data flow:**
1. MDX author writes `<ComponentPreview name="button-demo" />`
2. ComponentPreview lazy-loads `components/previews/button-demo.tsx`
3. Preview tab renders the component in an isolated container
4. Code tab shows the source via a statically extracted code string

**Example:**
```typescript
// components/mdx/component-preview.tsx
'use client'
import { Suspense, lazy, useState } from 'react'
import { cn } from '@/lib/utils'

const previews: Record<string, React.LazyExoticComponent<React.FC>> = {
  'button-demo': lazy(() => import('@/components/previews/button-demo')),
  'checkbox-demo': lazy(() => import('@/components/previews/checkbox-demo')),
  // ...registered at build time or via a registry pattern
}

export function ComponentPreview({ name, code }: { name: string; code?: string }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const Preview = previews[name]

  return (
    <div className="border rounded-xl overflow-hidden my-6">
      <div className="flex border-b">
        <button onClick={() => setTab('preview')} className={cn('px-4 py-2', tab === 'preview' && 'bg-muted')}>Preview</button>
        <button onClick={() => setTab('code')} className={cn('px-4 py-2', tab === 'code' && 'bg-muted')}>Code</button>
      </div>
      {tab === 'preview' ? (
        <div className="p-6 flex items-center justify-center min-h-[200px]">
          <Suspense fallback={<div>Loading...</div>}>
            {Preview && <Preview />}
          </Suspense>
        </div>
      ) : (
        <div className="p-4">{/* Render code string with syntax highlighting */}</div>
      )}
    </div>
  )
}
```

## Data Flow

### Content Pipeline (MDX to Page)

```
content/docs/components/button.mdx
        │
        ▼
  @next/mdx (build time)
  + remark-gfm (tables, strikethrough)
  + rehype-pretty-code (Shiki syntax highlighting)
  + rehype-slug (heading anchors)
  + rehype-autolink-headings
        │
        ▼
  Compiled to React Server Component
        │
        ▼
  app/docs/[[...slug]]/page.tsx
  resolves slug → loads compiled MDX
        │
        ▼
  mdx-components.tsx
  maps <h1>, <pre>, <table> → styled components
  makes <ComponentPreview>, <PropsTable> available
        │
        ▼
  DocsLayout (app/docs/layout.tsx)
  wraps in sidebar + content grid
        │
        ▼
  Static HTML at build time (SSG)
```

### Theme System

```
globals.css
  @theme { ... }                    ← Tailwind v4 theme definition
  :root { --background: ...; }     ← Light mode CSS variables
  .dark { --background: ...; }     ← Dark mode CSS variables
        │
        ▼
  next-themes ThemeProvider
  (wraps app in root layout.tsx)
  attribute="class" → toggles .dark on <html>
        │
        ▼
  Tailwind v4 reads CSS variables
  @custom-variant dark (&:where(.dark, .dark *))
        │
        ▼
  Components use: bg-[var(--background)]
  or Tailwind semantic tokens: bg-background
        │
        ▼
  ThemeToggle button flips theme
  Persisted in localStorage by next-themes
```

**For Black Cash DS specifically:**
- Light mode: warm tones (#F1EFEB, #FAF8F4) for page bg, neutral (#F6F6F6) for functional UI
- Dark mode: inverted brand (#FFFFFF on dark), dark backgrounds
- CSS variables map to DS semantic tokens (--bg-warm, --bg-neutral, --border-warm, --border-neutral)

### Navigation / Sidebar

```
config/docs.ts
  Defines sections + items with titles, hrefs
        │
        ▼
  Sidebar component (client component)
  Reads config, renders navigation tree
  Uses usePathname() for active state
        │
        ▼
  Each nav item is a Next.js <Link>
  App Router handles navigation (no full reload)
  Layout persists, only page content swaps
        │
        ▼
  Mobile: same config, rendered in Sheet/Drawer
  Triggered by hamburger menu button
```

### Search

```
Build time: generate search index
  - Extract title + description from each MDX frontmatter
  - Map to slugs/URLs
  - Store as static JSON or in-memory array
        │
        ▼
  cmdk (Command Menu) component
  Opens with Cmd+K / Ctrl+K
  Filters index client-side (no server needed)
  Navigate on selection via router.push()
```

For 30+ components + foundations, a static client-side search index is sufficient. No need for Algolia or a search server. If the index grows beyond ~500 entries, consider FlexSearch for better fuzzy matching.

## Scaling Considerations

| Concern | At 30 Components | At 100+ Components | Mitigation |
|---------|-------------------|---------------------|------------|
| Build time | ~30s | ~2-3min | Static generation is one-time; incremental builds help |
| Search index | ~5KB JSON | ~20KB JSON | FlexSearch or Orama for client-side fuzzy search |
| Sidebar length | Scrollable | Needs collapsible sections | Accordion-style section groups from day 1 |
| Preview bundle | Manageable | Heavy | Lazy-load all previews (React.lazy), code-split per component |
| Navigation config | Single file | Split by section | `config/docs/foundations.ts`, `config/docs/components.ts` |

## Anti-Patterns

### 1. Auto-Generating Navigation from Filesystem

**Why it fails:** Alphabetical ordering, no control over section grouping, labels tied to filenames. "border-widths.mdx" becomes "Border Widths" but you might want "Border Width Tokens". Explicit config is cheap and gives total control.

### 2. Using Fumadocs-UI for Custom Design System Docs

**Why it fails for this project:** Fumadocs-ui provides its own design language (colors, spacing, typography). Overriding it to match Black Cash DS tokens (warm tones, Funnel Display, corner smoothing, double-layer containers) would be more work than building from scratch. Use @next/mdx + custom components instead.

### 3. Importing Components Directly in MDX Files

**Why it fails:** `import { Button } from '@/components/ui/button'` in every MDX file creates coupling, breaks when paths change, and clutters content. Use the ComponentPreview pattern with a registry instead -- MDX authors write `<ComponentPreview name="button-demo" />` and the mapping is centralized.

### 4. Client-Side MDX Compilation

**Why it fails:** Libraries like next-mdx-remote compile MDX at request time. For a documentation site with static content, this adds unnecessary runtime overhead. @next/mdx compiles at build time -- zero runtime MDX processing, smaller client bundles.

### 5. Inline Styles for Theme Tokens

**Why it fails:** Using `style={{ color: '#F1EFEB' }}` instead of CSS variables means dark mode cannot override values. All DS tokens must be CSS custom properties that change with theme class.

### 6. One Giant MDX File Per Component

**Why it fails:** Component docs with 500+ lines of MDX (all variants, all states, do/dont, props) become unmaintainable. Break large component docs into the MDX file (prose, guidelines) + separate preview files (components/previews/) + props data (can be frontmatter or separate).

## Integration Points

### Fonts (Google Fonts)

Load Funnel Display, Ubuntu Sans, and Ubuntu Sans Mono via `next/font/google` in the root layout. Define as CSS variables (`--font-funnel`, `--font-ubuntu`, `--font-mono`) and reference in Tailwind v4 theme config.

```typescript
// app/layout.tsx
import { Funnel_Display, Ubuntu_Sans, Ubuntu_Sans_Mono } from 'next/font/google'

const funnelDisplay = Funnel_Display({ subsets: ['latin'], variable: '--font-funnel' })
const ubuntuSans = Ubuntu_Sans({ subsets: ['latin'], variable: '--font-ubuntu' })
const ubuntuMono = Ubuntu_Sans_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

### Tailwind v4 Theme

Tailwind v4 uses CSS-based configuration (no tailwind.config.js). Theme tokens defined in `globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-funnel: var(--font-funnel);
  --font-ubuntu: var(--font-ubuntu);
  --font-mono: var(--font-mono);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-warm-bg: var(--warm-bg);
  --color-neutral-bg: var(--neutral-bg);
  /* ... all DS tokens */
}

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #FAF8F4;
  --foreground: #0B0B0B;
  --warm-bg: #F1EFEB;
  --warm-border: #E8E4DD;
  --neutral-bg: #F6F6F6;
  --neutral-border: #DEDEDE;
}

.dark {
  --background: #0B0B0B;
  --foreground: #FFFFFF;
  --warm-bg: #1A1917;
  --warm-border: #2A2825;
  --neutral-bg: #1A1A1A;
  --neutral-border: #2E2E2E;
}
```

### Phosphor Icons

Import `@phosphor-icons/react` and use as React components. No icon fonts. Map commonly used icons for the docs site UI (search, menu, sun/moon, copy, check, chevron).

### Corner Smoothing

Use `tailwind-corner-smoothing` plugin. Apply 60% smoothing on all rounded elements in the DS. Requires the plugin to be registered in the Tailwind v4 CSS config.

### rehype/remark Plugin Chain

```javascript
// next.config.mjs
import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: { light: 'github-light', dark: 'github-dark' },
        keepBackground: false,
      }],
      rehypeAutolinkHeadings,
    ],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
})
```

## Build Order (Dependency Chain)

Components must be built in this order due to dependencies:

```
Phase 1: Foundation Layer (no dependencies)
├── next.config.mjs (MDX + rehype pipeline)
├── globals.css (CSS variables, Tailwind v4 theme, DS tokens)
├── app/layout.tsx (fonts, ThemeProvider, metadata)
├── mdx-components.tsx (base HTML element mappings only)
├── config/site.ts
└── lib/utils.ts

Phase 2: Layout Shell (depends on Phase 1)
├── config/docs.ts (sidebar navigation config)
├── components/docs/sidebar.tsx
├── components/docs/mobile-nav.tsx
├── components/docs/theme-toggle.tsx
├── app/docs/layout.tsx (grid: sidebar + content)
└── app/docs/[[...slug]]/page.tsx (catch-all route)

Phase 3: Content Components (depends on Phase 2)
├── components/mdx/code-block.tsx (styled <pre>)
├── components/mdx/callout.tsx
├── components/mdx/tabs.tsx
├── components/mdx/do-dont.tsx
├── components/docs/toc.tsx (table of contents)
├── components/docs/pager.tsx (prev/next)
└── Update mdx-components.tsx with all mappings

Phase 4: First Content (depends on Phase 3)
├── content/docs/index.mdx (Getting Started)
├── content/docs/installation.mdx
└── Foundations pages (colors, typography, spacing, etc.)
    ├── components/mdx/color-swatch.tsx
    ├── components/mdx/typography-sample.tsx
    └── components/mdx/spacing-scale.tsx

Phase 5: Component Preview System (depends on Phase 3)
├── components/mdx/component-preview.tsx
├── components/mdx/props-table.tsx
├── components/ui/ (DS components: button, checkbox, etc.)
├── components/previews/ (demo wrappers)
└── Component MDX pages (one per component)

Phase 6: Search + Polish (depends on Phase 4-5)
├── components/docs/search.tsx (cmdk)
├── Search index generation
├── Responsive refinements
└── Cross-browser testing
```

**Key dependency insight:** The MDX pipeline (Phase 1) and layout shell (Phase 2) must work before any content can be authored. Foundations content (Phase 4) can proceed in parallel with the component preview system (Phase 5) since they use different MDX components.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Documentation System Architecture (DeepWiki)](https://deepwiki.com/shadcn-ui/ui/8-development-workflow) -- Complete breakdown of fumadocs-mdx pipeline, registry system, navigation, search
- [Next.js Official MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- @next/mdx setup, mdx-components.tsx requirement, App Router integration
- [shadcn/ui GitHub Repository](https://github.com/shadcn-ui/ui) -- apps/v4 structure, content/docs/ organization, TypeScript 89.9% + MDX 7.3%
- [Rehype Pretty Code](https://rehype-pretty.pages.dev/) -- Shiki-powered syntax highlighting plugin, theme configuration
- [next-themes GitHub](https://github.com/pacocoursey/next-themes) -- Dark mode implementation for Next.js

### Secondary (MEDIUM confidence)
- [Fumadocs Documentation](https://www.fumadocs.dev/docs/mdx/next) -- fumadocs-mdx content processing, page tree generation
- [Dark Mode with Next.js 15 + Tailwind v4 Guide](https://dev.to/darshan_bajgain/setting-up-2025-nextjs-15-with-shadcn-tailwind-css-v4-no-config-needed-dark-mode-5kl) -- @custom-variant dark pattern, data-theme vs class approach
- [Getting Started with Next.js 15 and MDX](https://dev.to/ptpaterson/getting-started-with-nextjs-15-and-mdx-305k) -- Project structure patterns, mdx-components.tsx setup

### Tertiary (LOW confidence)
- Dark mode CSS variable values for Black Cash DS dark theme are estimated/extrapolated from the light theme tokens. Actual dark mode token values need design validation.

## Metadata

**Confidence breakdown:**
- MDX pipeline architecture: HIGH -- verified against shadcn/ui source and Next.js official docs
- Project structure: HIGH -- synthesized from shadcn/ui, Next.js conventions, and multiple documentation sites
- Component preview pattern: HIGH -- directly observed in shadcn/ui architecture
- Theme system: HIGH -- next-themes + Tailwind v4 @custom-variant is well-documented
- Build order: MEDIUM -- derived from dependency analysis, not from a single authoritative source
- Dark mode token values: LOW -- light mode tokens from PROJECT.md, dark values extrapolated

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (stable patterns, Next.js 15 + Tailwind v4 are current)
