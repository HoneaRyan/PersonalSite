import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'

// Projects — one markdown file per case study. Files starting with "_" are ignored.
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['active', 'completed', 'paused']).default('completed'),
    org: z.string().optional(),
    role: z.string().optional(),
    period: z.string().optional(),
    tech: z.array(z.string()).default([]),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /** Work on proprietary data — renders a badge and a details-withheld note */
    confidential: z.boolean().default(false),
  }),
})

// On-site blog posts. Files starting with "_" are ignored.
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

// Writing published elsewhere (Medium etc.) — merged into the Writing page.
const externalPosts = defineCollection({
  loader: file('./src/content/external-posts.json'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    source: z.string().default('Medium'),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
  }),
})

// Work history — rendered as a timeline on the About page.
const experience = defineCollection({
  loader: file('./src/content/experience.json'),
  schema: z.object({
    org: z.string(),
    role: z.string(),
    start: z.string(),
    end: z.string().nullable(), // null = present
    location: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    order: z.number().default(99), // newest first
  }),
})

export const collections = { projects, posts, externalPosts, experience }
