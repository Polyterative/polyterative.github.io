// Regenerate the portfolio showcase from the apps' own UI captures.
//
//   pnpm showcase                 compose every shot from the captures that exist now
//   pnpm showcase --refresh       re-run each app's snapshot command first, then compose
//   pnpm showcase --only ledge    limit to an app (or a shot id); combine with --refresh
//   pnpm showcase --list          list shots and whether their capture file exists
//
// Output: public/showcase/<id>.{jpg,webp} (+ <id>-cover.* for cover shots) and
// src/data/showcase.generated.json, which the /showcase page and post covers read.
import sharp from 'sharp';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { compose } from './lib/compose.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS = resolve(process.env.SHOWCASE_PROJECTS_DIR ?? join(ROOT, '..'));
const CACHE = join(ROOT, '.showcase-cache');
const OUT = join(ROOT, 'public/showcase');
const DATA = join(ROOT, 'src/data/showcase.generated.json');

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const { sources, apps, shots: allShots } = await import(pathToFileURL(join(ROOT, 'showcase/manifest.mjs')).href);
const shots = allShots.filter((s) => !only || s.app === only || s.id === only);

/** Where a shot's capture lives: refreshed cache first, then the project's own output folder. */
function capturePath(shot) {
  const src = sources[shot.app];
  const candidates = [join(CACHE, shot.app, shot.file), join(PROJECTS, src.project, src.dir, shot.file)];
  return candidates.find(existsSync) ?? null;
}

if (flag('list')) {
  for (const s of shots) console.log(`${capturePath(s) ? 'ok     ' : 'MISSING'} ${s.id.padEnd(26)} ${s.app}/${s.file}`);
  process.exit(0);
}

function run(cmd, cmdArgs, cwd, env = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, cmdArgs, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
    p.on('exit', (code) => (code === 0 ? res() : rej(new Error(`${cmd} ${cmdArgs.join(' ')} exited ${code}`))));
    p.on('error', rej);
  });
}

if (flag('refresh')) {
  for (const app of [...new Set(shots.map((s) => s.app))]) {
    const src = sources[app];
    const out = join(CACHE, app);
    await rm(out, { recursive: true, force: true });
    await mkdir(out, { recursive: true });
    const [cmd, ...rest] = src.refresh.map((a) => a.replace('{out}', out));
    console.log(`\n▸ ${app}: ${src.refresh.join(' ')}`);
    await run(join(PROJECTS, src.project, cmd), rest, join(PROJECTS, src.project), src.env);
  }
}

await mkdir(OUT, { recursive: true });

const SIZES = { cover: [2100, 900] };
// Canvas follows the capture: wide screens get 16:10, squarer windows 4:3, tall ones 1:1.
const standardSize = (aspect) => (aspect >= 1.5 ? [2000, 1250] : aspect >= 1.1 ? [2000, 1500] : [2000, 2000]);
const save = async (pipeline, base) => {
  await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${base}.jpg`);
  await pipeline.clone().webp({ quality: 84 }).toFile(`${base}.webp`);
};

let manifest = [];
try { manifest = JSON.parse(await readFile(DATA, 'utf8')).shots ?? []; } catch {}
const byId = new Map(manifest.map((m) => [m.id, m]));

let missing = 0;
for (const shot of shots) {
  const file = capturePath(shot);
  if (!file) {
    console.warn(`✗ ${shot.id}: capture not found (${sources[shot.app].project}/${sources[shot.app].dir}/${shot.file})`);
    missing++;
    continue;
  }
  const input = await readFile(file);
  const opts = { frame: shot.frame, tone: shot.tone, chrome: shot.chrome, trim: shot.trim, key: shot.key, largest: shot.largest, shape: shot.shape, round: shot.round };

  const m = await sharp(input).metadata();
  const [W, H] = standardSize(m.width / m.height);
  await save(await compose(input, { ...opts, width: W, height: H }), join(OUT, shot.id));
  const entry = {
    id: shot.id, app: shot.app, title: shot.title, caption: shot.caption, alt: shot.alt,
    tone: shot.tone, width: W, height: H,
    src: `/showcase/${shot.id}.jpg`, webp: `/showcase/${shot.id}.webp`,
  };
  if (shot.cover) {
    const [cw, ch] = SIZES.cover;
    await save(await compose(input, { ...opts, width: cw, height: ch, fill: shot.frame === 'window' ? 0.8 : 0.62 }), join(OUT, `${shot.id}-cover`));
    entry.cover = `/showcase/${shot.id}-cover.jpg`;
    entry.coverWebp = `/showcase/${shot.id}-cover.webp`;
  }
  byId.set(shot.id, entry);
  console.log(`✓ ${shot.id}`);
}

// Keep manifest order; drop entries whose shot no longer exists.
const ids = allShots.map((s) => s.id);
const out = ids.filter((id) => byId.has(id)).map((id) => ({ ...byId.get(id), appName: apps[byId.get(id).app].name }));
await writeFile(DATA, JSON.stringify({ apps, shots: out }, null, 2) + '\n');
console.log(`\n${out.length} shots in ${DATA.replace(ROOT + '/', '')}${missing ? `, ${missing} missing` : ''}`);
if (missing) process.exitCode = 1;
