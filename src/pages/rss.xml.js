import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE, url } from '@/lib/site'

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: url(`/writing/${post.id}/`),
      })),
  })
}
