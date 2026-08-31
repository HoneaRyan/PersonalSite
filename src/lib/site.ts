export const SITE = {
  name: 'Ryan Honea',
  title: 'Ryan Honea — Data Scientist',
  description:
    'Data scientist working across industries — data platforms, production machine learning, and decision science — with a public-interest practice in grants and digital government.',
  email: 'ryan@honea.info',
  github: 'https://github.com/HoneaRyan',
  linkedin: 'https://www.linkedin.com/in/ryan-honea/',
  /** Medium profile URL — external posts in external-posts.json link out individually */
  medium: '',
}

/** Prefix a site-absolute path with the deployment base (e.g. /PersonalSite). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
