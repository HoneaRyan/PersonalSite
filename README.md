# honea.info — personal site

Personal site for Ryan Honea: data scientist working across government, grants, and
public-interest data. Built with [Astro](https://astro.build), React islands, and
Tailwind 4; deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321/PersonalSite/
npm run build     # production build into dist/
```

## Edit content

Everything editorial is data-driven — no component changes needed:

| What | Where |
| --- | --- |
| Projects / case studies | `src/content/projects/*.md` (copy `_template.md`) |
| Blog posts | `src/content/posts/*.md` (copy `_template.md`) |
| Writing published elsewhere (Medium, LinkedIn…) | `src/content/external-posts.json` |
| Experience timeline | `src/content/experience.json` |
| Name, email, social links | `src/lib/site.ts` |
| The `/character` easter egg | `src/content/rpg/*.md` |

## Deploy

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml`.
One-time setup: repository **Settings → Pages → Source → GitHub Actions**.
