import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg } from '../../lib/og';
import { isoDots, pad } from '../../lib/datum';

export const getStaticPaths = (async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());
  const cards = posts.map((post, i) => ({
    params: { slug: post.id },
    props: { title: post.data.title, kicker: `No. ${pad(i + 1, 3)} · ${isoDots(post.data.date)}`, tags: post.data.tags },
  }));
  cards.push({
    params: { slug: 'default' },
    props: { title: 'Designer, engineer, musician', kicker: 'Personal archive', tags: ['Software', 'Visuals', 'Music'] },
  });
  return cards;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as Parameters<typeof renderOg>[0]);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
