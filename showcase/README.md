# Showcase pipeline

Regenerates the `/showcase` gallery and post covers from the apps' own UI captures.

```
app repo (snapshot tests / snap tool)  →  raw PNG  →  scripts/showcase.mjs  →  public/showcase/*.jpg|webp
                                                     (flat ground, hairline)    src/data/showcase.generated.json
```

## Run

```bash
pnpm showcase                    # compose from the captures that already exist
pnpm showcase --refresh          # re-run every app's snapshot command first (slow: Swift builds)
pnpm showcase --refresh --only ledge
pnpm showcase --list             # which captures are found / missing
```

Projects are expected next to this repo (`../Habitat`, …). Override with `SHOWCASE_PROJECTS_DIR`.
Fresh captures land in `.showcase-cache/<app>/` (gitignored) and win over the project's own output folder.
Commit `public/showcase/` and `src/data/showcase.generated.json`; CI cannot reach the other repos.

## Curate

`showcase/manifest.mjs` is the only file to edit. Each source names an app's snapshot command; each shot picks
**one** capture and how to frame it (`window` / `object`, `tone`, `chrome`, `key`, `cover`). Add a shot, run
`pnpm showcase`, look at `public/showcase/<id>.jpg`, adjust. Keep it to the few screens worth showing.

## Add an app

1. Make sure the app can write named PNGs headlessly (SwiftUI `ImageRenderer` or an XCTest that renders a view; see
   Ledge `Tools/snapshots.sh`, Kinetip `Tools/marketing_screenshots.sh`). Rendering in tests keeps the shots
   reproducible and independent of the desktop.
2. Add the source and `apps` entry (name, accent hue) to the manifest.
3. Add shots, run `pnpm showcase`.

Posts can use a shot as header art: `cover: "/showcase/<id>-cover.jpg"` (21:9, only for shots with `cover: true`).

## Look

Follows DESIGN.md §7 and §11: the capture sits flat on the grey image ground (Paper `c-100` or Instrument `c-900`
by `tone`) with grain on the ground only, a hairline edge, no shadows, gradients or accent colour. Opaque captures
with a flat background (widgets, shelves, wheels) are keyed out with `key: true`.
