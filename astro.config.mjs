// @ts-check
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Deployed as a GitHub Pages project site. If this ever moves to a custom
// domain (e.g. honea.info), set `site` to that URL and remove `base`.
export default defineConfig({
  site: 'https://honearyan.github.io',
  base: '/PersonalSite',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
