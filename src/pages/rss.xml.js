import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'polyterative — Writing',
    description: 'Notes on code, sound, and making things by Vlady Yakovenko.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
