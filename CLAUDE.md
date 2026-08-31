# Personal Site — CLAUDE.md

## Vision

A modern professional personal site for Ryan Honea, a senior data scientist working at the
intersection of **government, grants, and public-interest data**. The site is a career
instrument, not a novelty piece — its audiences are government program officers, nonprofit
leaders, grant reviewers, and civic-tech collaborators.

Three pillars the site must communicate:

1. **Grant-based data work** — designing and delivering data systems where grants are the engine
2. **Digital government** — modernizing public-sector systems with modern data principles
   (pipelines, lineage, measurement)
3. **Nonprofit data → funding power** — turning nonprofit program data into actionable,
   metric-based evidence that wins government grants

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
  `.github/workflows/deploy.yml` (project site: base `/PersonalSite`). If a custom domain is
  added later, update `site`/`base` in `astro.config.mjs`.
- Content is data-driven via Astro content collections (`src/content.config.ts`):
  - `src/content/projects/*.md` — case studies (`_template.md` shows the frontmatter)
  - `src/content/posts/*.md` — on-site blog posts
  - `src/content/external-posts.json` — writing published elsewhere (Medium etc.)
  - `src/content/experience.json` — work history for the About timeline
  - `src/content/rpg/*.md` — content for the `/character` easter egg only
- Internal links must go through `url()` from `src/lib/site.ts` so the GitHub Pages base
  path is applied.

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
