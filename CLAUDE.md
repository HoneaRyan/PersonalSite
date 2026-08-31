# Personal Site — CLAUDE.md

## Vision

A modern professional personal site for Ryan Honea, a senior data scientist. The site is a
career instrument, not a novelty piece. Primary positioning: **data as a discipline,
practiced across industries** — Ryan is applying for roles beyond the public sector, so the
site must read industry-agnostic first. His breadth is documented, not claimed: logistics
(FedEx), eCommerce (recommendation engine), consumer R&D (Electrolux), government (BDO),
legal evidence (SPLC). He cares about where the field is going and the interstitial layer
where one industry's advances become another's head start.

Audiences: hiring managers and technical leaders across industries, plus the civic-data
community.

Three pillars the home page communicates:

1. **Data platforms & engineering** — end-to-end platforms, schema rigor, lineage,
   audit-ready pipelines
2. **Machine learning in production** — shipped models (Databricks Model Serving, NLP),
   measured continuously
3. **Decision science & evidence** — data storytelling, statistical evidence, quality-driven
   measurement

The **public-interest practice** (grants, digital government, nonprofit data → funding
power) is a featured *side* practice — framed on the home page as "on the side," a personal
practice that happens to align with his current role. It's a differentiator, not the
identity. Don't let copy anywhere re-center the site on civic work.

## Structure

- **Home** (`/`) — hero, three pillars, featured projects, recent writing
- **Projects** (`/projects`) — case studies in problem → approach → measurable outcome shape
- **Writing** (`/writing`) — hybrid blog: on-site markdown posts merged with external
  (Medium) links, plus RSS at `/rss.xml`
- **About** (`/about`) — bio, experience timeline, toolbox, practice areas
- **`/character`** — hidden easter egg: the original JRPG character-screen concept, kept as a
  React island. Reached via the "▸ press start" link in the footer. Don't extend it; don't
  let it leak into the professional pages.

## Tech

- **Astro + React islands + Tailwind 4**, deployed to **GitHub Pages** via
  `.github/workflows/deploy.yml`, served at the custom domain **https://honea.info**
  (no base path; `site` in `astro.config.mjs`).
- Content is data-driven via Astro content collections (`src/content.config.ts`):
  - `src/content/projects/*.md` — case studies (`_template.md` shows the frontmatter)
  - `src/content/posts/*.md` — on-site blog posts
  - `src/content/external-posts.json` — writing published elsewhere (Medium etc.)
  - `src/content/experience.json` — work history for the About timeline
  - `src/content/rpg/*.md` — content for the `/character` easter egg only
- Internal links go through `url()` from `src/lib/site.ts` (applies the base path, now
  `/`; keep using it in case the deployment target ever changes).

## Design

"Data-flavored professional": light, editorial, with visible data DNA — mono small-caps
labels, numbered section headings, hairline rules, tabular numerals, metric stat tiles, a
faint graph-paper grid behind the hero. Palette tokens live in `src/styles/global.css`
(paper/ink/accent/signal/positive). Geist for text, Geist Mono for labels and numbers.

Rules of thumb:

- Numbers are content: never invent metrics — placeholder copy is bracketed `[like this]`
  until Ryan supplies real values, and fake stats never ship.
- Text wears text colors; accent color is for identity and emphasis, sparingly.
- Tone is credible and data-literate. The charm lives in restraint (and in `/character`).
