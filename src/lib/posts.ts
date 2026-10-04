import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

/** "Creative Coding" → "creative-coding", "Next.js" → "next-js". */
export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const byDateDesc = (a: Post, b: Post) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime();

/** Tag → posts, sorted by popularity then name. */
export function tagIndex(posts: Post[]) {
  const map = new Map<string, { slug: string; label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const label of post.data.tags) {
      const slug = tagSlug(label);
      const entry = map.get(slug) ?? { slug, label, posts: [] };
      entry.posts.push(post);
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.posts.length - a.posts.length || a.label.localeCompare(b.label));
}

/** Posts sharing the most tags with `post`; ties go to the more recent one. */
export function relatedPosts(posts: Post[], post: Post, limit = 3) {
  const mine = new Set(post.data.tags.map(tagSlug));
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(tagSlug(t))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}
