// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import rehypeImages from './src/lib/rehype-images.mjs';

// Per-post lastmod from frontmatter (`updated`, falling back to `date`).
const postDates = new Map(
  readdirSync('./src/content/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = readFileSync(`./src/content/blog/${f}`, 'utf8');
      const date = fm.match(/^updated:\s*"?([\d-]+)"?/m)?.[1] ?? fm.match(/^date:\s*"?([\d-]+)"?/m)?.[1];
      return [`/blog/${f.replace(/\.md$/, '')}/`, date];
    }),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://polyterative.github.io',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const date = postDates.get(new URL(item.url).pathname);
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeImages],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
    },
  },
});
