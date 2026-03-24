# Black Cash Design System — Documentation Site

## What This Is

A comprehensive design system documentation site for the Black Cash / Tikin fintech product. It documents all 30+ UI components, foundations (colors, typography, spacing, grids, shadows), guides, and installation instructions. The UI replicates the shadcn/ui documentation experience — sidebar navigation, live component previews, code snippets, and props tables. Internal use only for the product/engineering team.

## Core Value

Every component is documented with exact production tokens, real usage examples, and copy-paste code — so the team never has to guess how to use the DS.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] shadcn-style layout: sidebar + main content area with live previews + code blocks
- [ ] Foundations section: Colors (semantic tokens, bg/border/text/icon), Typography (Funnel Display, Ubuntu Sans, Ubuntu Sans Mono + roles), Spacing (19 tokens from 0-64px), Radius (10 tokens), Shadows (5 levels), Border Widths (4 tokens), Component Heights
- [ ] Grids documentation: 12/8/4 column system, sidebar layouts
- [ ] Corner Smoothing documentation (60% smoothing, tailwind-corner-smoothing)
- [ ] 30+ component pages with: visual preview, usage guidelines, props/variants table, code examples, do/don't patterns
- [ ] Components to document: Checkbox, Radio Button, Dialog, Bottom Sheet, Side Panel, Navigation (Top Bar + Tab Bar + Sidebar), Tabs (Contained + Underline), Search Bar, OTP Input, Card, Avatar, Tooltip, Skeleton, Progress Bar / Step Indicator, Divider, Chip/Tag, Pagination, Table, Alert/Banner, Breadcrumbs, Accordion, Date Picker, Slider/Range, Popover/Dropdown Menu, Segmented Control, Snackbar + existing DS components (TextField, Select, Dropdown, Container, Toggle, Buttons, Status Chips, Badge, Toast)
- [ ] Each component page shows: Desktop + Mobile variants, Light + Dark themes
- [ ] Installation/Getting Started guide
- [ ] Icon library reference (Phosphor Icons — phosphoricons.com)
- [ ] Dark mode toggle on the docs site itself
- [ ] MDX-based content for easy editing
- [ ] Component code examples using React + Tailwind (matching production stack)
- [ ] Responsive docs site (works on mobile for quick reference)

### Out of Scope

- Public-facing marketing site — internal tool only
- Component library npm package — this is documentation, not a distributable package (for now)
- Figma plugin integration — docs reference Figma but don't sync with it
- Automated visual regression testing — future milestone
- Multi-language (i18n) — Spanish-only content is fine

## Context

### Design System Source

The DS was built and analyzed from production Figma files. All tokens, colors, typography, spacing, and component specs are extracted from real production screens of the Tikin fintech app. Key source files:

- **Figma DS file**: `OpnXhqgNyKq96xoW7F0xBu` (Black Cash DS — original)
- **Figma working file**: `vGu558KBAfGjAhT498KWEF` (Prueba — all new components captured here)
- **HTML component files**: `/Users/nicolasgarcia/Tikin/checkbox-ds/*.html` (30 component HTML files with exact specs)

### Typography System

| Family | Role | Usage |
|--------|------|-------|
| **Funnel Display** | Titles + Component labels | H1-H5, dialog titles, card titles, nav labels, component labels |
| **Ubuntu Sans** | Body text | Paragraphs, descriptions, labels, tooltips, metadata |
| **Ubuntu Sans Mono** | Numbers + CTAs | Montos, balances, buttons (uppercase), tabs, OTP, references |

### Color System — Two Tones

| Tone | Purpose | Colors |
|------|---------|--------|
| **Warm** | Side panel, cards, wallet, page bg | `#F1EFEB`, `#E8E4DD`, `#FAF8F4` |
| **Neutral** | Dialog, tabs, inputs, generic | `#F6F6F6`, `#DEDEDE`, `#E1E1E1` |

### Distinctive DS Patterns

- **Double-layer containers**: Dialog/Panel use outer shell (`#F6F6F6` r24) + inner white panel (r20) with 12px gap
- **Warm vs Neutral border tones**: Warm (`#E8E4DD`) for organic containers, Neutral (`#DEDEDE`) for functional UI
- **Brand inversion**: Light = dark brand (`#0B0B0B`), Dark = white brand (`#FFFFFF`)
- **Icon library**: Phosphor Icons (phosphoricons.com) — always use inline SVGs, never icon fonts
- **Corner smoothing**: 60% on all radii
- **Status tags**: r44 pill shape, Ubuntu Mono 12px, tracking 0.6px

### Existing Components in DS (already in Figma)

TextField (4 sizes × 6 states), Select, Dropdown, Container, Toggle, Buttons (Primary, Secondary, Icon Primary/Secondary/Muted, Ghost, Link), Status Chips (40 variants), Badge, Toast (Mobile + Desktop)

### Tech Environment

- Production app: Next.js + React + Tailwind
- This docs site: Next.js 15 + App Router + Tailwind v4 + MDX
- Hosted internally, no public deployment needed

## Constraints

- **Stack**: Next.js 15 + App Router + Tailwind + MDX — matches production and enables shadcn-like layout
- **UI Reference**: Must look and feel like shadcn/ui docs (sidebar, preview, code, props table)
- **Icons**: Phosphor Icons only (phosphoricons.com)
- **Quality**: Code reviewed before each component ships — no rushing
- **Progressive**: Foundations first, then components one by one
- **Fonts**: Must load Funnel Display, Ubuntu Sans, Ubuntu Sans Mono from Google Fonts

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 + MDX over Storybook native | shadcn uses this stack; gives full UI control to replicate their layout | — Pending |
| Phosphor Icons as official icon library | Already established in DS and production | ✓ Good |
| Inline SVGs over icon fonts | Figma capture doesn't render icon fonts; SVGs are more reliable | ✓ Good |
| Warm + Neutral dual-tone system | Extracted from production; distinguishes organic (panel/cards) from functional (dialog/inputs) UI | ✓ Good |
| Progressive documentation | Start with foundations, add components one by one — ensures quality over quantity | — Pending |
| Internal use only | No public marketing needed; simplifies deployment and auth | — Pending |

---
*Last updated: 2026-03-20 after initialization*
