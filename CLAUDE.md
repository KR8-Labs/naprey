# Naprey Almario Portfolio — Developer Notes

## Stack
Astro 7 + TypeScript (strict mode). Static output — no server runtime needed.

## Commands
```bash
npm run dev       # dev server → http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npx astro check  # TypeScript type-check all .astro files
```

## Where to edit content
All copy (text, titles, links, timeline entries, etc.) lives in one file:

**`src/data/content.ts`** — edit here to update any section without touching markup.

## Go High Level integration
See `GHL_INTEGRATION.md` for the full wiring guide.
Config lives in `.env` (gitignored). Template: `.env.example`.
GHL config is read by `src/data/ghl.ts`.

## Skills installed (project-level)
Located in `.agents/skills/`:
- `astro` (astrolicious) — Astro best practices
- `baseline-ui` (ibelick) — UI quality baseline
- `fixing-accessibility` (ibelick) — accessibility
- `fixing-motion-performance` (ibelick) — animation/motion perf
- `fixing-metadata` (ibelick) — SEO / social meta

## Project structure
```
src/
  data/
    content.ts      ← all site copy (edit here)
    ghl.ts          ← GoHighLevel embed config
  layouts/
    Base.astro      ← HTML shell, meta, skip link, GHL chat widget
  components/
    Nav.astro
    Hero.astro      ← photo placeholder — swap in real headshot when available
    Story.astro
    Work.astro
    Advocacy.astro
    Timeline.astro
    Recognition.astro
    Affiliations.astro
    Contact.astro   ← GHL form + calendar embeds
    Footer.astro
  styles/
    global.css      ← design tokens, reset, shared utilities
  pages/
    index.astro     ← composes all sections
client_files/       ← original client materials (PDFs, requirements)
GHL_INTEGRATION.md  ← client-facing GHL setup guide
```

## Accessibility targets
WCAG 2.1 AA minimum. All text/bg colour pairs pass ≥4.5:1 contrast.
Skip link, semantic landmarks, single h1, keyboard focus styles, prefers-reduced-motion, 200% zoom support.

## Pending client deliverables
- Real photos (hero headshot, advocacy/travel moments)
- GHL account credentials / embed IDs (see GHL_INTEGRATION.md)
- Social media handles beyond Facebook (Instagram, LinkedIn?)
- Domain and hosting choice (Netlify / Cloudflare Pages / GitHub Pages recommended)
