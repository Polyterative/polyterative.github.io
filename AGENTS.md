# AGENTS.md — polyterative.github.io

Astro static site: personal blog + software portfolio. `pnpm dev` / `pnpm build` (Node 22+, pnpm).

## Content architecture — pages are connected

Content about the same project lives in **several places on purpose** (each page speaks to a
different audience with hand-tuned copy). When adding or updating content, walk the relevant
checklist below so nothing goes stale.

### Single sources of truth

| Data | Lives in |
|---|---|
| App registry (names, taglines, facts, links, `featured` flag) | `src/data/apps.ts` |
| Blog posts | `src/content/blog/*.md` (schema in `src/content.config.ts`) |
| Music releases | `src/data/releases.ts` |
| CV / experience | `src/data/experience.ts` |
| Timeline-specific milestones | `src/data/timeline.ts` |
| About "Now" list | `src/pages/about.astro` |
| Home selected cards + featured posts | `src/pages/index.astro` |
| Projects archive | `src/pages/projects.astro` (`archiveSections`) |

### Checklist: adding a new application

1. `src/data/apps.ts` — add a full `AppEntry`. `featured: true` = large gallery showcase
   (reserve for flagships; currently Patcher + Kinetip). No screenshot? Set `icon` +
   `accentHue`; a gradient cover is generated.
2. `src/pages/apps/<slug>.astro` — dedicated story page using `AppLayout`. Structure:
   Why it exists → What it does (pillars + shots) → optional How it's built → Where it is now,
   closing with a `blockquote` that lands the ending. Set `showPublishing={false}` unless the
   app is actually open to publishing partners (currently only Kinetip).
3. Screenshots → `public/apps/<slug>/`, JPEG, ≤1600px wide, ~150–250KB
   (`sips --resampleWidth 1600 -s formatOptions 72`).
4. `src/pages/projects.astro` — add an archive entry with `details: '/apps/<slug>'`.
5. Consider: home `selectedProjects` (keep to ~4), About "Now" list if it's active work.

### Checklist: app release / version bump

Version and status strings are duplicated deliberately — update **all**:
- `src/data/apps.ts` (facts: version/status)
- `src/pages/projects.astro` (archive card description, e.g. "currently v6.5")
- `src/pages/about.astro` (`currentFocus` entries)
- The app's story page if the "Where it is now" section mentions the state

### Checklist: new blog post

1. Markdown in `src/content/blog/` (frontmatter: title, description, date, tags, cover).
2. Cover image → `public/blog/covers/`; post images → `public/blog/<post-slug>/`.
3. Consider `featuredPostIds` on the home page.
4. If it's the canonical write-up for an app, link it from that app's `links` in `apps.ts`.

### Checklist: new music release

- `releases` array in `src/data/releases.ts` + cover in `public/music/`.
- Avoid null/dash fields: use honest labels (e.g. `released: 'Unreleased single'`).

## Page roles (don't blur them)

- `/apps` — the showcase. Software-company gallery; flagships large, the rest as compact cards.
- `/apps/<slug>` — product story pages: why built, problems solved, satisfying ending. Also
  the publisher-facing fact sheets.
- `/projects` — the plain archive. Everything, lightly annotated, links into `/apps` via
  `details`. No "selected work" section here — that job belongs to `/apps`.
- `/` — brief intro, a few cards (titles link to app pages), featured writing.
- `/about` — CV surface. Keep "Now" current.

## Conventions

- Voice: plain, direct, first person. No hype words, no LinkedIn-speak.
- Internal links never `target="_blank"`; external always `target="_blank" rel="noopener"`.
- Design language lives in `DESIGN.md` (source of truth for web, PDF, slides, app UI).
  Tokens in `src/styles/global.css` implement it; mono font for meta/labels, one accent color.
- `ProjectCard` props: `url` (live/external), `repo`, `details` (internal app page — the
  card title prefers it).
- Facts must stay truthful: statuses like "Pre-release" or "Unofficial" are features, not
  weaknesses. Never overstate.

### Blog prose: typographic emphasis

Inspired by [how Blade Runner's title cards use one typeface deliberately](https://randsinrepose.com/archives/blade-runner-title-cards/).
The article's real point: the theatrical cut (deliberate Goudy Oldstyle, letterspaced caps, one
red italic word) and the work-print (the lazy default: plain Impact) use the *same* typeface
options — the difference is that every small choice in the theatrical cut was actually decided,
not defaulted to. Feeling and readability both come from *obsessing over which small decisions
to make*, not from adding new fonts or flourish. Four tools, each with one job, within the site's
existing two typefaces (sans + mono):

| Style | Markdown | Use for | Frequency |
|---|---|---|---|
| **Bold** | `**text**` | A key term or fact, on its first meaningful mention only | ~1–3 per post |
| *Italic* | `*text*` | A tonal beat: aside, closing punchline, quoted UI copy/dialogue, borrowed term | ~1–3 per post |
| `code` | `` `text` `` | A literal technical artifact: filename, command, config key, data format (CSV, JSON) | as needed, unchanged from normal usage |
| Small caps | `<span class="caps">TEXT</span>` | An institutional name/acronym treated as a fixed fact of the world (agency, standard, protocol) | ~0–1 per post, rare |

Rules:
- Never emphasize the same word/phrase twice in one post — emphasis marks a *first* encounter,
  not importance-by-repetition.
- Never stack two styles on one span (no bold-italic, no bold small caps).
- If nothing in a section earns emphasis, leave it plain. Plain prose is the default state;
  emphasis is the exception that proves it.
- Small caps CSS utility lives in `src/pages/blog/[slug].astro` (`.prose :global(.caps)`) —
  letterspaced uppercase in the same sans, never applied to lowercase running text.

## Images and SEO

- New raster images go in `public/`, then run `node scripts/optimize-images.mjs` (recompresses to ≤1600px and writes a `.webp` sibling). Render them with `src/components/Img.astro` (adds intrinsic size + WebP `<picture>`); raw `<img>` in blog markdown is handled by `src/lib/rehype-images.mjs`.
- Share cards are generated per post at `/og/<slug>.png` (`src/lib/og.ts`, satori + Departure Mono). Pages can pass `image`, `type`, `noindex`, `breadcrumbs` to `BaseLayout`.
- Optional `updated:` frontmatter on a post feeds `dateModified` and sitemap `lastmod`.

## Showcase screenshots

`pnpm showcase` rebuilds `/showcase` and post covers from the apps' own snapshot output. Curate in
`showcase/manifest.mjs`; see `showcase/README.md`. Commit the generated `public/showcase/` and
`src/data/showcase.generated.json`.
