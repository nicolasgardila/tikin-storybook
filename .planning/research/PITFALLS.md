# Pitfalls Research

**Domain:** Design System Documentation Site (Next.js 15 + App Router + Tailwind v4 + MDX)
**Researched:** 2026-03-20
**Confidence:** HIGH (core pitfalls), MEDIUM (some stack-specific edge cases)

---

## Critical Pitfalls

### Pitfall 1: Building All 30+ Component Pages Before Validating the Template

**What goes wrong:** Team invests weeks documenting every component using a page template that turns out to be missing critical sections (e.g., no "do/don't" area, no mobile variant toggle, no dark mode preview). Reworking 30 pages is 30x more painful than reworking 1.

**Why it happens:** The progressive approach says "foundations first, then components one by one" but doesn't enforce validating the component page template with real user feedback before scaling. People assume the first template will be right.

**How to avoid:** Document exactly 2 components end-to-end first (one simple like Divider, one complex like Dialog with double-layer container). Get real feedback from 2-3 engineers on whether the page answered their questions. Lock the template only after this validation.

**Warning signs:** Component pages are being created from a template that has never been tested with a real developer looking up a real question.

**Phase to address:** Phase 1 (Site Shell + Foundations) should include the template; Phase 2 (First Components) must validate it before scaling.

---

### Pitfall 2: Component Preview That Doesn't Match Production

**What goes wrong:** The live preview renders a component that looks slightly different from the real production component -- wrong font loading, missing corner smoothing, different spacing. Developers copy code from docs, paste into the app, and get a different result. Trust in the docs collapses immediately.

**Why it happens:** The docs site loads components in isolation without the full production CSS context. Tailwind v4's CSS-first configuration means the docs site and production app may resolve design tokens differently. The 60% corner smoothing via `tailwind-corner-smoothing` plugin may not be configured identically. Google Fonts loading order may differ.

**How to avoid:**
- Share the exact same Tailwind theme configuration (CSS file with `@theme` tokens) between production and docs site.
- Load the same 3 Google Fonts (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono) with identical weights.
- Ensure `tailwind-corner-smoothing` is configured identically.
- Visual spot-check: screenshot production vs docs preview for first 3 components.

**Warning signs:** Any preview where border-radius looks "off," fonts render differently, or warm/neutral tone colors don't match production screens.

**Phase to address:** Phase 1 (must establish shared theme config from day one).

---

### Pitfall 3: MDX Content Trapped Inside `app/` Directory

**What goes wrong:** Using `@next/mdx` with App Router requires MDX files to live as `page.mdx` inside the `app/` directory. This means content authors must understand Next.js routing conventions. Adding a new component page requires creating `app/components/button/page.mdx` rather than just dropping a file in a `content/` folder. Content becomes coupled to routing infrastructure.

**Why it happens:** Next.js 15 App Router's `@next/mdx` integration treats MDX files as route segments. The alternative (`next-mdx-remote`) is poorly maintained as of 2025. The newer `next-mdx-remote-client` works but adds complexity.

**How to avoid:** Choose the content strategy upfront and document it clearly:
- **Option A (simpler):** Use `@next/mdx` with files in `app/`. Accept the coupling. Create a clear folder convention and a script/template for adding new component pages.
- **Option B (decoupled):** Use a content layer (e.g., Contentlayer2, Velite, or manual `fs.readFile` + `@mdx-js/mdx` compilation) that reads from a `content/` directory and renders via server components.
- For 30+ pages with non-technical contributors, Option B is safer long-term. For a small team of developers, Option A is fine.

**Warning signs:** Content authors asking "where do I put the file?" or "why does my MDX file not show up?"

**Phase to address:** Phase 1 (content pipeline architecture decision).

---

### Pitfall 4: MDX Blank Line Explosion

**What goes wrong:** MDX silently breaks when you leave a blank line inside a JSX element. The error messages are cryptic and don't point to the blank line. A content author adds a blank line for readability inside a `<ComponentPreview>` block and the entire page crashes with an incomprehensible parser error.

**Why it happens:** MDX's parser switches between Markdown and JSX modes. A blank line inside a JSX block signals "end of JSX" to the parser. This is a fundamental MDX behavior, not a bug, but it is profoundly unintuitive.

**How to avoid:**
- Document this rule prominently in a "Contributing to Docs" guide.
- Add an ESLint or remark plugin that detects blank lines inside JSX blocks in MDX files.
- Use wrapper components that accept children as props rather than deeply nested JSX in MDX.
- Keep MDX content simple: prefer Markdown with minimal inline JSX.

**Warning signs:** Cryptic MDX compilation errors that don't point to the actual problem. New contributors breaking pages with seemingly innocent edits.

**Phase to address:** Phase 1 (content pipeline setup) -- configure linting. Phase 2 (first components) -- document the rule when creating contribution guidelines.

---

### Pitfall 5: Theming the Docs Site vs. Documenting the DS Theme

**What goes wrong:** The docs site's own dark mode toggle, color scheme, and typography get confused with the design system's tokens being documented. Developers visit the docs in dark mode and can't tell if the component preview shows the DS's dark mode or the docs site's dark mode. The warm/neutral dual-tone system of the DS clashes with the docs site's own neutral chrome.

**Why it happens:** Two independent theming systems overlap: (1) the docs site's UI chrome (sidebar, header, code blocks) and (2) the component previews showing DS tokens. When both use Tailwind v4 CSS variables, namespace collisions are likely. Tailwind v4 exposes all `@theme` tokens as CSS variables, so if you define `--color-background` for the docs site and the DS also has a background token, they collide.

**How to avoid:**
- Namespace DS tokens distinctly: `--ds-bg-warm`, `--ds-bg-neutral` vs docs-site tokens `--docs-bg`, `--docs-sidebar`.
- Render component previews in an isolated scope (CSS containment, iframe, or a dedicated `.ds-preview` wrapper that resets to DS tokens).
- Make the docs site chrome intentionally different from the DS aesthetic so there's zero visual confusion. The shadcn docs do this well: their chrome is minimal/neutral, letting the component previews stand out.
- The docs dark mode toggle should control docs chrome only. Component previews should have their own light/dark toggle.

**Warning signs:** Someone asks "is this the docs background or the DS background?" Preview colors shift when you toggle the site's dark mode.

**Phase to address:** Phase 1 (theming architecture). Must be decided before any component previews are built.

---

### Pitfall 6: Code Examples That Drift From Reality

**What goes wrong:** The docs show `<Button variant="primary" size="lg">` but the actual production component API changed to `<Button intent="primary" size="large">` three months ago. Nobody updated the docs. Developers copy-paste code that doesn't compile.

**Why it happens:** Code examples are static strings in MDX files. There is no automated check that the code in docs actually compiles against the current component API. Documentation updates aren't part of the component change workflow.

**How to avoid:**
- Use real imports in code examples wherever possible. If the code block imports `Button` from the actual component library, TypeScript will catch API drift at build time.
- For code blocks that must be static strings (copy-paste snippets), add a CI step that extracts and type-checks code examples.
- Establish a rule: "No component PR merges without updating its docs page."
- Keep a `last-verified` date on each component page's frontmatter.

**Warning signs:** Code examples use prop names that don't exist in the current component types. No TypeScript errors during docs build even when components change.

**Phase to address:** Phase 2 (first component pages) -- establish the pattern. Ongoing governance concern.

---

### Pitfall 7: Search That Doesn't Exist Until It's Too Late

**What goes wrong:** With 30+ component pages plus foundations, developers can't find what they need. They Cmd+F the sidebar, don't find it, and go ask someone instead of using the docs. The docs site becomes a reference nobody references.

**Why it happens:** Search is treated as a "nice to have" rather than core infrastructure. Teams build the site, add content, and only think about search when someone complains. By then, the habit of "just ask someone" is already formed.

**How to avoid:**
- Plan search from Phase 1, implement by Phase 2 at the latest.
- For internal docs with 30-50 pages, a simple client-side search (Flexsearch, Pagefind, or Fuse.js indexing frontmatter + headings) is sufficient. No need for Algolia.
- Index component names, prop names, token names, and aliases (e.g., searching "toggle" should find "Switch").
- Add component aliases/keywords in MDX frontmatter: `aliases: ["toggle", "on-off"]`.

**Warning signs:** You have 10+ pages and no search. Engineers ask questions in Slack that are answered in the docs.

**Phase to address:** Phase 2 (implement alongside first component batch) or Phase 3 at latest.

---

### Pitfall 8: Sidebar Navigation That Mirrors File Structure, Not Mental Model

**What goes wrong:** Navigation shows: `Foundations > Colors`, `Foundations > Typography`, `Components > Accordion`, `Components > Alert`, etc. -- a flat alphabetical dump. Developers looking for "how to build a form" have to mentally map that they need TextField + Select + Button + validation patterns, hunting across alphabetical entries.

**Why it happens:** The sidebar is auto-generated from the file system or MDX frontmatter alphabetically. Nobody designs the information architecture intentionally.

**How to avoid:**
- Group components by usage pattern, not alphabet: "Forms" (TextField, Select, Checkbox, Radio, OTP Input), "Feedback" (Toast, Alert, Snackbar, Skeleton), "Navigation" (Top Bar, Tab Bar, Sidebar, Tabs, Breadcrumbs), "Overlay" (Dialog, Bottom Sheet, Side Panel, Popover, Tooltip), "Data Display" (Table, Card, Avatar, Badge, Chip/Tag), "Layout" (Container, Divider, Pagination).
- Within each group, alphabetical is fine.
- Add a secondary alphabetical index for people who know the component name.
- Test: ask 3 developers "find how to show an error message to the user" and see if they navigate to Alert/Toast/Snackbar without confusion.

**Warning signs:** Sidebar has 30+ items in a flat list. No grouping beyond "Foundations" and "Components."

**Phase to address:** Phase 1 (information architecture design) -- before building navigation.

---

### Pitfall 9: Performance Death by Component Preview

**What goes wrong:** Each component page loads the full component library to render previews. With 30+ component pages, the site becomes sluggish. Navigation between pages feels slow. Build times balloon.

**Why it happens:** Component previews require importing React components, their dependencies, and their CSS. If previews are client-rendered (e.g., using react-live or sandpack), each page ships a JavaScript runtime. If all component CSS is loaded globally, the CSS bundle grows with every new page.

**How to avoid:**
- Render previews as server components wherever possible (Next.js 15 RSC). Static previews that don't need interactivity should just be server-rendered HTML.
- For interactive previews (e.g., toggling button states), use a lightweight client island, not a full sandbox runtime.
- Lazy-load preview components: `dynamic(() => import('./ButtonPreview'), { ssr: true })`.
- Avoid Sandpack/react-live unless you specifically need editable code. For a DS docs site, static previews with variant toggles are almost always sufficient.
- Monitor build time and page weight from the start: set a budget (e.g., < 200KB JS per page, < 30s full build).

**Warning signs:** Build time grows linearly with each new component page. Lighthouse scores drop below 90. Navigating between component pages shows a loading state.

**Phase to address:** Phase 1 (preview architecture decision). Phase 3+ (monitor as pages scale).

---

### Pitfall 10: Perfectionist Documentation Paralysis

**What goes wrong:** The Checkbox page has been "in progress" for 3 weeks because nobody can agree on the exact wording of usage guidelines, or the do/don't examples aren't pixel-perfect, or the edge cases section isn't complete. Meanwhile, engineers are building with the Checkbox component using no documentation at all.

**Why it happens:** Internal tools teams often over-index on quality because they're building for peers who will judge the work. The "code reviewed before each component ships" constraint (from PROJECT.md) can become a bottleneck if review standards are too high for docs content.

**How to avoid:**
- Define "minimum viable documentation" for each component: name, visual preview, props table, one usage example, one code snippet. Everything else is enhancement.
- Ship incomplete pages with a "stub" banner rather than no page at all. A page with a preview and props table is infinitely more useful than no page.
- Separate "API docs" (factual, auto-generable) from "usage guidelines" (editorial, slower). Ship API docs first.
- Review code/accuracy rigorously but treat prose/guidelines with lighter review.

**Warning signs:** Multiple component pages stuck in PR review. Engineers using components that have no docs page. Docs site has been "almost ready" for weeks.

**Phase to address:** Phase 2 (establish minimum viable page definition before first component batch).

---

### Pitfall 11: Ignoring the Warm/Neutral Dual-Tone Complexity

**What goes wrong:** Component documentation shows components on a white or generic gray background, ignoring that in production, some components live on warm backgrounds (`#F1EFEB`, `#FAF8F4`) and others on neutral backgrounds (`#F6F6F6`). Developers copy a Card component, place it on a neutral dialog background, and the warm border tone (`#E8E4DD`) looks wrong.

**Why it happens:** This dual-tone system is a distinctive Black Cash DS pattern that doesn't exist in standard design systems. Generic documentation templates don't account for "this component looks different depending on which background it sits on."

**How to avoid:**
- Every component preview must show the component on its correct background context (warm or neutral or both).
- Document explicitly: "Card uses warm tone -- place on warm backgrounds only" or "Dialog inner panel uses neutral tone."
- Add a "Context" section to each component page showing which background/container it belongs in.
- Create a Foundations page specifically about the dual-tone system with a decision tree: "If your container is X, use Y tone."

**Warning signs:** All component previews use the same white/gray background. No documentation of which tone applies to which component.

**Phase to address:** Phase 1 (foundations -- dual-tone documentation). Phase 2 (component template must include background context).

---

### Pitfall 12: Google Fonts Loading Causing Layout Shift

**What goes wrong:** The docs site loads 3 font families from Google Fonts (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono). Without proper loading strategy, text flashes in system fonts before switching to the correct fonts (FOUT). Component previews briefly render with wrong typography, making screenshots unreliable and first-load experience jarring.

**Why it happens:** Three font families with multiple weights is a heavy load. Google Fonts serves via external CDN with variable latency. Next.js has `next/font/google` but loading 3 families with specific weight subsets requires careful configuration.

**How to avoid:**
- Use `next/font/google` for all 3 families with `display: 'swap'` and explicit weight subsets.
- Preload the most critical weights (Funnel Display 400/700 for headings, Ubuntu Sans 400 for body, Ubuntu Sans Mono 400 for CTAs).
- Consider self-hosting fonts via `next/font/local` for faster, more reliable loading.
- Set explicit `font-size` and `line-height` on containers to minimize layout shift during font swap.

**Warning signs:** Visible font flash on first load. Component previews look different for 0.5-1s during load. CLS (Cumulative Layout Shift) > 0.1.

**Phase to address:** Phase 1 (font loading infrastructure).

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded color values in MDX instead of tokens | Faster to write | Every color change requires editing every MDX file | Never -- use CSS variables from day one |
| Static screenshots instead of live previews | No component import complexity | Screenshots go stale silently; no dark mode toggle | Only for "coming soon" placeholder pages |
| Single `mdx-components.tsx` with all overrides | Quick to set up | File becomes 500+ lines; hard to maintain | Only for Phase 1; refactor into per-component providers by Phase 2 |
| Copy-pasting component code into MDX code blocks | Works immediately | Code examples drift from actual component source | Acceptable for Phase 2; add type-checking CI by Phase 3 |
| No frontmatter schema validation | Less tooling overhead | Inconsistent metadata across 30+ pages breaks search, nav, and filtering | Acceptable briefly; add Zod schema by Phase 2 |
| Inline Tailwind classes in docs chrome instead of design tokens | Faster prototyping | Docs site UI becomes inconsistent; hard to re-theme | Only during Phase 1 prototyping; extract tokens before Phase 2 |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading full component library per page | > 300KB JS per page, slow nav | Dynamic imports, tree-shaking, RSC for static previews | At 10+ component pages |
| Unoptimized MDX compilation | Build > 60s, dev server lag | Use `@next/mdx` with RSC (no client-side MDX runtime) | At 20+ MDX files |
| Global CSS with all component styles | Large initial CSS payload, specificity wars | Scoped CSS per component preview; Tailwind's purge handles most of this | At 15+ component pages with unique styles |
| Sandpack/react-live for every preview | 200KB+ per playground instance | Use static RSC previews; reserve sandpack for "try it" sections only | Immediately on any page with multiple examples |
| Unoptimized images/SVG icons in previews | Slow LCP, large page weight | Use `next/image`, inline SVGs only for icons (per DS standard), lazy-load below-fold previews | At 5+ previews per page |
| No build caching for MDX | Full rebuild on every content change | Enable Next.js incremental builds; separate content from code changes | At 15+ pages during active development |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Props table without default values | Developer has to read source code to know defaults | Always show: prop name, type, default, description |
| Code examples without import statements | Copy-paste fails; developer has to guess imports | Always show complete, runnable code with imports |
| No "copy" button on code blocks | Developer manually selects text, misses characters | Add copy-to-clipboard on every code block from Phase 1 |
| Preview shows only one variant | Developer doesn't discover the variant they need | Show variant switcher (tabs or toggles) in preview area |
| No indication of component status (stable/beta/deprecated) | Developer uses unstable component in production | Add status badge in sidebar and page header |
| Mobile previews hidden behind a toggle | Mobile-first devs miss responsive behavior | Show desktop and mobile side by side, or at minimum show viewport switcher prominently |
| Token values shown without visual swatch | Developer can't quickly scan for the right color/spacing | Always pair token names with visual representation |
| "Do/Don't" section with only text, no visuals | Guidelines are ignored because they're not scannable | Show visual do/don't with side-by-side component screenshots |

## "Looks Done But Isn't" Checklist

Before declaring any phase "complete," verify these often-missed items:

- [ ] **Code blocks actually compile**: Copy the code example, paste into a fresh file with the documented imports. Does it work?
- [ ] **Dark mode previews exist**: Toggle dark mode. Does every preview show the dark variant correctly?
- [ ] **Warm/neutral context is documented**: Does each component page say which background tone it belongs on?
- [ ] **Props table matches TypeScript types**: Are the documented props actually the current component interface?
- [ ] **Mobile layout works**: Open docs on a phone. Can you read and use them?
- [ ] **Search finds the component**: Search for each component by name and by common alias. Does it appear?
- [ ] **Corner smoothing is visible**: Do preview components show the 60% corner smoothing, or default browser radius?
- [ ] **Font rendering matches production**: Compare a heading in docs vs production. Same font, weight, size?
- [ ] **Navigation reflects mental model**: Ask someone unfamiliar to find "how to show an error notification." Do they find Toast/Snackbar without help?
- [ ] **Code examples use production patterns**: Do examples use the same import paths, Tailwind classes, and composition patterns the team actually uses?

## Recovery Strategies

**If docs are already stale:**
1. Run an audit: list every component page and compare its code examples against current TypeScript interfaces. Flag mismatches.
2. Prioritize by usage: update the 10 most-used components first.
3. Add `last-verified: YYYY-MM-DD` frontmatter to every page. Anything older than 60 days gets a "needs review" banner.

**If previews don't match production:**
1. Extract the production Tailwind config and import it directly into the docs project.
2. Create a visual comparison script: screenshot production vs docs for the same component.
3. Fix token namespace collisions (docs chrome vs DS tokens).

**If developers aren't using the docs:**
1. Interview 3 developers: "When you last used [Component], where did you look for guidance?" If they say Figma/Slack/source code, the docs have a discoverability problem.
2. Add the docs URL to component source files as a JSDoc link: `/** @see https://ds.internal/components/button */`.
3. Add a Slack bot or IDE snippet that links to docs when component names are mentioned.

**If build times are unacceptable:**
1. Profile the build: `ANALYZE=true next build` to identify heavy bundles.
2. Convert client-side previews to RSC where interactivity isn't needed.
3. Split the site: foundations pages (lightweight) vs component pages (heavier) with different build strategies.

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| P1: Unvalidated template | Phase 2 (First Components) | Template tested with 2 real components + developer feedback before scaling |
| P2: Preview/production mismatch | Phase 1 (Foundations/Shell) | Shared Tailwind config; visual spot-check against production |
| P3: MDX content coupling | Phase 1 (Content Pipeline) | Content strategy documented; new page creation takes < 2 minutes |
| P4: MDX blank line crashes | Phase 1 (Content Pipeline) | Linting configured; contributing guide documents the rule |
| P5: Theme namespace collision | Phase 1 (Theming Architecture) | DS tokens namespaced; preview isolated from docs chrome |
| P6: Code example drift | Phase 2 (First Components) | At least one code example per page is a real import that fails build if API changes |
| P7: Missing search | Phase 2 or 3 | Search finds components by name + alias; tested with 5 queries |
| P8: Flat sidebar navigation | Phase 1 (Information Architecture) | Components grouped by usage pattern; tested with "find X" tasks |
| P9: Preview performance | Phase 1 (Architecture) + Phase 3 (Monitor) | JS budget per page < 200KB; build time < 30s at 15 pages |
| P10: Perfectionist paralysis | Phase 2 (Process) | "Minimum viable page" definition written; stub pages ship |
| P11: Warm/neutral tone ignored | Phase 1 (Foundations) + Phase 2 (Template) | Dual-tone documented; previews show correct background context |
| P12: Font loading FOUT | Phase 1 (Infrastructure) | `next/font` configured for all 3 families; CLS < 0.1 |

---

## Sources

### Primary (HIGH confidence)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- official App Router MDX integration docs
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- official CSS-first token system docs
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- migration changes and gotchas
- [Next.js mdx-components.js convention](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) -- required configuration file

### Secondary (MEDIUM confidence)
- [UXPin: Common Design System Documentation Mistakes](https://www.uxpin.com/studio/blog/common-design-system-documentation-mistakes/) -- adoption and governance pitfalls
- [Knapsack: Why Design Systems Fail](https://www.knapsack.cloud/blog/why-design-systems-fail) -- organizational failure patterns
- [Brad Frost: Maintaining Design Systems](https://atomicdesign.bradfrost.com/chapter-5/) -- governance and lifecycle strategies
- [Figma Blog: Documentation That Drives Adoption](https://www.figma.com/blog/design-systems-103-documentation-that-drives-adoption/) -- adoption-focused documentation patterns
- [Netguru: Design System Adoption Pitfalls](https://www.netguru.com/blog/design-system-adoption-pitfalls) -- common adoption failures
- [Getting started with Next.js 15 and MDX](https://dev.to/ptpaterson/getting-started-with-nextjs-15-and-mdx-305k) -- App Router MDX integration gotchas
- [MDX integration strategies for Next.js](https://blog.logrocket.com/mdx-integration-strategies-next-js/) -- comparison of @next/mdx vs next-mdx-remote
- [Sabigara: React Live Preview in MDX](https://sabigara.com/posts/react-live-preview-in-mdx) -- live preview implementation challenges
- [NNGroup: Top 10 IA Mistakes](https://www.nngroup.com/articles/top-10-ia-mistakes/) -- navigation and information architecture
- [Tailwind v4 Design Tokens Guide](https://dev.to/wearethreebears/exploring-typesafe-design-tokens-in-tailwind-4-372d) -- token architecture patterns

### Tertiary (LOW confidence)
- [Medium: Design Systems in 2026](https://medium.com/@rydarashid/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563) -- trend predictions, unverified
- [Medium: Why Most Design Systems Fail](https://medium.com/@codefarmer/why-most-design-systems-fail-03cf8c93a2d6) -- anecdotal failure patterns
