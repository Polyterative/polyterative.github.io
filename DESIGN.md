# Design language

Working name: **Datum**. A personal design system for polyterative deliverables: this site,
PDFs, decks, app UI, covers, posters. This file is the source of truth. Medium-specific
implementations (CSS tokens in `src/styles/global.css`, PDF templates, app themes) follow it,
not the other way round.

Status: v0.3. Values marked *(provisional)* are still open (see the end of this file).

---

## 1. The aesthetic in one paragraph

Things that look like they were made to be *used*: instrument panels, synth modules, boarding
passes, museum tags, specimen sheets, concrete buildings, institutional forms. The decoration
is the information itself: coordinates, version numbers, tick marks, serial codes, crop marks,
jack labels. Everything sits on a visible grid, and every control of the same kind looks and
sits the same way, so a regular user could find it with their eyes closed. The palette is
almost colourless (paper, concrete, black) with a faint material grain. One signal colour
appears only where something needs attention, and a little moss green grows in a few places,
like plants against concrete. Type is split into two voices: a large, tight
grotesk that states things, and a small monospace that annotates them. It should feel precise,
quiet and slightly cold, but made by one person who cares about every small decision.

## 2. Where it comes from

Six reference families, each contributing something specific. The overall mood is northern:
cold overcast light, restraint, clean surfaces, and something faintly strange in the filing.

| Source | What it looks like | What we take from it |
|---|---|---|
| **Instrument / HUD** | Dark screens, hairline vectors, radial gauges, radar sweeps, telemetry readouts, crosshairs, phosphor green, one red indicator | Hairline geometry, measurement marks, the "live readout" feeling, dark mode as an instrument |
| **Industrial print** | Type specimens, tickets, hang tags, invoices, signage systems, posters with huge numerals and tiny specs, barcodes, orange on grey | Scale contrast, labels-as-layout, the document as a physical object, signal orange |
| **Brutalist architecture** | Raw concrete, repeated modular facades, cantilevers, overcast flat light, mass and shadow, plants growing against it | Honest structure, repetition as rhythm, heavy blocks against empty space, grey as a material, the soft/hard contrast of greenery on concrete |
| **Generative / signal** | Black fields with wireframe terrain, halftone, glitch smear, scanlines, test charts, ASCII, terminal logs | Texture made from data, procedural imagery, the screen as a medium with its own artefacts |
| **Modular synthesis** | Eurorack panels: a fixed height, widths in HP units, silkscreened short labels, rows of identical knobs and jacks, inverted labels on outputs, patch cables crossing the rack | Coherency across modules, controls you can operate by feel, signal flow as layout, inputs vs outputs |
| **Institutional brutalism** | A quiet bureau inside a concrete monolith, slightly uncanny: forms, filing codes, redaction bars, classification lines, huge location names cut across the screen | The document as an institution, redaction as a mark, giant title cards, mass as composition |

What ties them together: **nothing is ornamental unless it is also information**, the
structure underneath (grid, module, measurement) is allowed to show, and **the same thing
always looks and sits the same way**.

## 3. Principles

1. **Information is the ornament.** If a surface feels empty, add real metadata (date,
   version, index, coordinates, file size, status), never a decorative shape with no meaning.
   Invented numbers are not allowed; the record must stay true (see `PRODUCT.md`).
2. **Show the grid.** Rules, ticks, corner marks and column lines can be visible. Alignment is
   strict; when something breaks the grid it does so on purpose and by a lot.
3. **Two voices.** Big grotesk says *what it is*. Small mono says *everything about it*. Never
   mix the jobs.
4. **Extreme scale contrast.** Pair a very large element (numeral, word, image) with very small
   annotations. Avoid the comfortable middle where everything is 16–24px.
5. **Monochrome first, one signal.** Design it in greys. Then add the signal colour to at most
   one or two things per view: the current state, the primary action, the warning.
6. **Hairlines over boxes.** Separate with 1px rules and spacing, not with filled cards and
   shadows. Fills are reserved for blocks that need to read as solid objects (tags, tickets,
   signal panels, output labels, redactions).
7. **Repetition is rhythm.** Like a concrete facade or a row of identical knobs: modules in
   series. Lists, grids and indices should be visibly regular.
8. **Objects, not pages.** A deliverable can behave like a thing: a ticket, a label, a panel, a
   filed form. Give it an edge, an ID, a version.
9. **Hands on the controls.** Same control, same form, same place, every time. Someone who has
   used one deliverable should be able to find the page number, the primary action or the
   status in the next one without looking. Coherency beats novelty.
10. **Material, lightly.** Surfaces have a faint grain, like concrete or uncoated paper. It is
    felt more than seen, and it never touches text.
11. **Quiet by default.** The work leads. Instrument details live at the edges and in the
    margins; the content area stays readable and calm.

## 4. Colour

Two environments share one structure. **Paper** is the light mode (print, documents, light
web). **Instrument** is the dark mode (screens, app UI, covers). The site follows the OS.

The palette has four layers: a **concrete** neutral ramp that does almost all the work, one
**signal** colour (the main accent), one **moss** colour that balances it, and three **state**
colours that only appear on live data.

Proportion per view, roughly: **90% concrete · up to 5% signal · up to 3% moss**. Orange is
always the most used accent. Moss is there to balance it, never to compete.

### 4.1 Concrete ramp (neutrals)

Very slightly warm, so the greys read as material (paper, concrete) and not as a UI default.
Every neutral in every medium comes from this ramp.

| Step | Hex | Paper role | Instrument role |
|---|---|---|---|
| `c-000` | `#F7F7F5` | surface (tag, sheet, panel) | |
| `c-050` | `#EDEDEA` | bg | |
| `c-100` | `#E2E2DE` | hover, zebra, image ground | |
| `c-200` | `#CFCFCA` | rule (hairlines, grid) | |
| `c-300` | `#B4B4AE` | strong rule, disabled fill | |
| `c-400` | `#808079` | | ink-3 |
| `c-500` | `#686862` | ink-3 | |
| `c-600` | `#55554F` | ink-2 | |
| `c-700` | `#9A9A94` *(see note)* | | ink-2 |
| `c-800` | `#3A3A36` | | strong rule, disabled fill |
| `c-850` | `#2A2A28` | | rule (hairlines, grid) |
| `c-900` | `#1C1C1B` | | hover, image ground |
| `c-950` | `#141414` | | surface (panel) |
| `c-980` | `#0A0A0A` | | bg |
| `ink-paper` | `#111111` | ink | |
| `ink-instrument` | `#E8E8E4` | | ink |

Note: the ramp is ordered by role, not strictly by lightness; `c-700` is the light grey used
as secondary text on black. Keep the hex values, renumber freely later.

### 4.2 Signal (the main accent)

v0.2: a touch less saturated and less bright than v0.1 (`#FF4F1F` → `#EA562A`), so it reads as
ink on a surface rather than light from a screen.

| Token | Hex | Use |
|---|---|---|
| `signal` | `#EA562A` | Fills: the primary action, a status block, a poster field, a single mark. Paper and print |
| `signal-dark` | `#EB6137` | Same role on Instrument (a hair lighter so it holds on black) |
| `signal-text` | `#B83A14` | Signal used *as text or a thin line* on Paper (the fill colour fails as text) |
| `signal-text-dark` | `#F0724C` | Signal as text or line on Instrument |
| `signal-weak` | `#F5DED6` | Selection, highlighted row on Paper. Never behind body copy |
| `signal-weak-dark` | `#33170F` | Same on Instrument |
| `on-signal` | `#111111` | Text on any signal fill. Never white (fails contrast) |

### 4.3 Moss (balance)

The green of plants on concrete: muted, grey-olive, organic. Orange asks for attention; moss is
the one thing that is alive. It is deliberately dull so it never reads like the phosphor `live`
green (that one is an LED, this one is a plant).

| Token | Paper | Instrument | Use |
|---|---|---|---|
| `moss` | `#55664A` | `#8FA27A` | Fill, text or line |
| `moss-weak` | `#DDE1D3` | `#1A2016` | Ground of a planter block only |
| `on-moss` | `#F7F7F5` | `#0A0A0A` | Text on a moss fill |

Where it goes:
- **Planter block.** At most one per view: a block on `moss-weak`, like a planted courtyard in
  a concrete plaza. About "Now", a closing quote, a colophon.
- **Growth line.** The branching mark from section 9, drawn in moss.
- **Photography.** Brutalist photos may include greenery (ivy, a courtyard tree). Everything
  else in the frame stays grey and flat.
- **Covers.** A moss field is an allowed alternative to the orange poster. One or the other on
  a cover, never both.

Where it never goes: buttons, links, status pills, charts, anything that asks for action. Moss
never sits next to signal at the same visual weight; in any view one of them clearly leads,
and it is usually signal.

### 4.4 State (live data only)

Status, charts, telemetry, terminals. Never decoration, never a second accent, never in body
copy. Each has a Paper and an Instrument value.

| Token | Meaning | Paper | Instrument |
|---|---|---|---|
| `live` | Running, OK, live feed (phosphor) | `#0E7A41` | `#3DDC84` |
| `alert` | Error, stop, critical | `#D11A1A` | `#FF4545` |
| `cold` | Info, selection in data, link to data | `#2650D9` | `#6B93FF` |

### 4.5 Semantic tokens (what code and templates use)

| Token | Paper | Instrument |
|---|---|---|
| `bg` | `#EDEDEA` | `#0A0A0A` |
| `surface` | `#F7F7F5` | `#141414` |
| `hover` | `#E2E2DE` | `#1C1C1B` |
| `ink` | `#111111` | `#E8E8E4` |
| `ink-2` | `#55554F` | `#9A9A94` |
| `ink-3` | `#686862` | `#808079` |
| `rule` | `#CFCFCA` | `#2A2A28` |
| `rule-strong` | `#B4B4AE` | `#3A3A36` |
| `signal` | `#EA562A` | `#EB6137` |
| `signal-text` | `#B83A14` | `#F0724C` |
| `signal-weak` | `#F5DED6` | `#33170F` |
| `on-signal` | `#111111` | `#0A0A0A` |
| `moss` | `#55664A` | `#8FA27A` |
| `moss-weak` | `#DDE1D3` | `#1A2016` |
| `on-moss` | `#F7F7F5` | `#0A0A0A` |
| `live` / `alert` / `cold` | see 4.4 | see 4.4 |

### 4.6 Contrast (WCAG, against `bg`)

| Pair | Paper | Instrument |
|---|---|---|
| ink | 16.1 | 16.1 |
| ink-2 | 6.4 | 7.0 |
| ink-3 | 4.8 | 5.0 |
| signal-text | 4.9 | 6.8 |
| signal fill (as a shape) | 3.1 | 5.9 |
| on-signal text on signal fill | 5.3 | 5.7 |
| moss | 5.3 | 7.2 |
| on-moss text on moss fill | 5.8 | 6.9 |
| live / alert / cold | 4.6 / 4.6 / 5.5 | 11.1 / 5.8 / 6.8 |

Everything used for text clears 4.5:1. The Paper signal fill is a shape colour, not a text
colour; that is why `signal-text` exists.

### 4.7 Rules

- Design in the concrete ramp first. Add signal last, to one or two things per view. Add moss
  only if the view needs balance, and less of it than signal.
- Signal covers at most ~5% of a view, unless the whole object *is* a signal block (a poster
  or a tag printed on orange); then nothing else on it gets colour.
- No gradients except inside procedural imagery. No tinted backgrounds behind text.
- State colours appear only where the data is live or has a status. A chart with categories
  uses the concrete ramp plus signal for the one series that matters.
- Print: signal orange as a spot colour where possible (closest Pantone to be chosen); check
  every page also works in greyscale.

## 5. Typography

Three fonts. No fourth.

| Font | Voice | Use | Fallback |
|---|---|---|---|
| **Grotesk** *(provisional: Helvetica Neue / Neue Haas Grotesk)* | Statement | Headings, display numerals, body copy, **buttons and controls** | Helvetica, Arial, sans-serif |
| **Departure Mono** | Plate | Large codes and indices only: section numbers, `C-4`, `02/14`, serials set as a feature. **20px / 15pt and up** | IBM Plex Mono |
| **IBM Plex Mono** | Data | Every small mono string: labels, meta, status pills, captions, code, tables, readouts | ui-monospace, Menlo |

Departure Mono is pixel-built. It is beautiful large and hard to read small, so it never
appears below 20px on screen or 15pt in print. Everything small and monospaced is Plex Mono.
Buttons use the grotesk, because a button label has to be read in a glance.

Files: `public/fonts/DepartureMono-Regular.woff2` (OFL, licence alongside); Plex Mono from
Google Fonts or self-hosted (OFL).

### Scale

A steep scale. Small steps at the bottom for annotation, a big jump to display.

| Step | Size (web) | Size (print) | Family | Notes |
|---|---|---|---|---|
| `micro` | 11px | 6.5–7pt | Plex Mono 500, caps | Labels, ticks, corner labels, pills. Tracking +0.06em |
| `meta` | 12–13px | 8pt | Plex Mono 400 | Dates, captions, data, code |
| `control` | 14px | 9pt | Grotesk 500 | Buttons, tabs, nav items. Sentence case |
| `body` | 16–17px | 9.5–10pt | Grotesk 400 | Line height 1.55, max 66ch |
| `lead` | 20–22px | 13pt | Grotesk 400 | Intros |
| `plate` | 24–64px | 15–40pt | Departure Mono | Indices, codes, serials as a feature |
| `h2` | 28–32px | 18pt | Grotesk 600 | Tracking −0.02em |
| `h1` | 48–72px | 32–40pt | Grotesk 600 | Tracking −0.035em, line height 0.95–1.05 |
| `display` | 120px+ / viewport units | 72pt+ | Grotesk 600–700 | Numerals and single words only. Tracking −0.05em |

### Rules

- Departure Mono: 20px and up, short strings, no lowercase running text.
- Plex Mono labels are uppercase with +0.06em tracking; data and code stay sentence case.
- Use tabular figures for anything numeric that sits in a column.
- Display numerals and title cards can be cropped by the edge of the frame. That is a feature.
- Emphasis inside prose follows the existing rules in `AGENTS.md` (bold / italic / code /
  small caps, one job each).
- Never stretch, outline, or add effects to type. Glitch and grain belong to surfaces and
  images, not to text you need to read.

## 6. Grid and space

- **Base unit 4px**, spacing on 4/8/12/16/24/32/48/64/96.
- **12 columns** on web and A4/Letter; **8** on narrow screens and slides; **4** on phones.
- **Modules, like a rack.** Think of columns as HP units in a Eurorack case: blocks share one
  height per row and vary only in width (in whole columns). A row of different-width modules
  with aligned tops and bottoms is the default composition.
- **Margins are generous and asymmetric.** A wide left gutter can hold mono annotations
  (section index, date, version) like a technical drawing's title block.
- **Baseline** for print: 12pt grid; body leading snaps to it.
- Content blocks align to column edges. Annotation hangs outside the content column when there
  is room.

## 7. Material and texture

The surfaces should feel like concrete or uncoated paper, just a touch. Texture is a property
of the *ground*, not of the content.

| Layer | What it is | Paper | Instrument |
|---|---|---|---|
| **Grain** | Fine fractal noise, like paper fibre or poured concrete | ink-coloured, 4–5% opacity, multiply | white, 3–4%, screen |
| **Mottle** | Very low-frequency noise: the uneven tone of a concrete wall or a sheet that has been handled | 2–3% | 2% |
| **Ink** | Stronger grain on solid fills (signal blocks, ink slabs, redactions), like screen print or riso | 6–8% on the fill | 5–6% on the fill |

Rules:
- Never on text, small controls, charts or screenshots. Never animated.
- The page should look clean at a glance; the grain shows up when you look closer.
- Real print: the paper stock is the texture (uncoated, off-white). Do not add noise to files
  going to a printer, except on large solid fills where an ink feel is wanted.
- Screens and PDFs read on screen: use the grain layers above.
- Web recipe: an inline SVG `feTurbulence` (`fractalNoise`, baseFrequency ~0.8 for grain,
  ~0.01 for mottle) as a fixed `background-image` on a pseudo-element over `body`, with
  `pointer-events: none`. One tile, no image files, no JS.

## 8. Control surfaces

From modular synthesis: a rack of different modules that still feels like one instrument
because every module follows the same conventions. Applies to app UI first, but also to
documents and the site.

- **One control, one form.** A button, a toggle, a field, a status pill each have exactly one
  design across every deliverable. No variants for decoration.
- **Fixed positions.** The primary action, page/position index, version and status always sit
  in the same place within a type of deliverable (e.g. PDF footer strip, app top-right). Move
  them never.
- **Label above, value below.** Like silkscreen over a knob: the mono label sits above the
  control or value, always, with the same gap.
- **Signal flows left → right, top → bottom.** Inputs and settings first, results last.
- **Outputs are inverted.** The result of something (an output jack, a total, a final status,
  the download) gets an *inverted label*: a solid ink block with bg-coloured text. Inputs keep
  plain labels. This is the one place where fills replace hairlines by default.
- **Operable by feel.** Hit targets at least 40px; keyboard shortcuts for everything that
  repeats, shown as keycaps next to the control; no layout shift when values change (tabular
  figures, fixed widths).
- **Short, consistent abbreviations.** Like panel silkscreen: `REV`, `OUT`, `IN`, `STAT`,
  `PG`, `VER`. Keep one glossary and never use two names for one thing.
- **Patching.** Relationships between items can be drawn as single curved hairlines between
  two jack points; the active connection is signal-coloured.

## 9. Marks and details (the vocabulary)

The small recurring elements that make a surface recognisable. Use 1–3 per view, always
carrying real information.

| Mark | Form | Typical content |
|---|---|---|
| **Index** | `§0x03`, `B`, `III`, `No. 019`, `Fig. α`, `ii` (Departure if ≥20px, else Plex) | See counting systems below |
| **Serial / ID** | `PLY-2026-014`, `OBJ-01` | Document or project identifier |
| **Version stamp** | `v0.2 · 2026.10.04` | Revision and date (ISO, dots or dashes) |
| **Coordinates** | `00.0000° N, 00.0000° E` | Place of origin, only if true |
| **Crop / corner marks** | 8–12px L-shapes at corners | Frame a sheet, image or hero |
| **Panel screws** | Small circles with a slot, at corners | Frame an *object* (panel, card that behaves like hardware) instead of crop marks |
| **Crosshair / registration** | `+` with hairlines | Centre of a figure, anchor of a diagram |
| **Tick ruler** | Short hairlines at regular intervals | Edge of a panel, progress, scale |
| **Knob scale** | Arc of ticks around a value | A setting with a range (0–10, %, dB) |
| **Jack** | Ring + dot, label above | An input or output point; filled ring + inverted label for outputs |
| **Inverted label** | Solid ink block, bg text | Outputs, results, totals |
| **Patch line** | One curved hairline between two jacks | A real relationship between two items |
| **Status pill** | Plex caps in a 1px box, or a solid signal block | `LIVE`, `PRE-RELEASE`, `ARCHIVED` |
| **Hairline table** | Rows separated by 1px rules, no fills | Specs, facts, credits |
| **Data strip** | Bars drawn from the bits of a real string | Ticket and tag objects |
| **Redaction bar** | Solid ink bar the length of the hidden text, label `WITHHELD` | Something that genuinely is not public yet |
| **Filing stamp** | Boxed mono block: `FILED`, date, serial, slightly heavier rule | Approval, release, archive state |
| **Growth line** | A branching hairline in moss, drawn from real data (one node per year, one leaf per item) | Releases, milestones, years of a project. The only organic shape in the system |
| **Title card** | A word set huge, uppercase grotesk, cropped by the frame | Section or place name at a section start |

### Counting systems

Each kind of counter has its own system, the same on every page (helpers in `src/lib/datum.ts`).
Decimal means "how many" or the post number; every other system means "which one".

| Counts | System | Example |
|---|---|---|
| Site sections | Hex | `§0x03 Timeline` |
| Sections inside a page | Uppercase letters | `A`, `B` |
| Registries (apps, releases) | Roman numerals, no total | `III`, `PLY-A-III` |
| Posts | 3-digit decimal | `No. 019` |
| Figures | Greek letters | `Fig. α` |
| List items | Lowercase roman | `i`, `ii` |
| Quantities | Plain decimal, no padding | `19` |

Hairlines are 1px on screen, 0.5pt in print. Corners are sharp (radius 0). The only exception
is a deliberate physical-object reference (a rounded hang tag, a jack, a screw head).

## 10. The institutional layer

From the bureau: documents that behave like they belong to an institution,
inside a concrete building. Use it for proposals, reports, spec sheets, archive pages.

- **Forms, not pages.** Numbered fields (`01 Title`, `02 Owner`, `03 Status`) laid out like a
  filing form. Field numbers are real and stable across versions.
- **Classification line.** A single mono line at the top: document type, serial, revision,
  access (`PUBLIC` / `DRAFT` / `INTERNAL`).
- **Redaction is truthful.** A bar hides something that really is withheld (an unreleased
  title, a client under NDA). It is never used to fake mystery.
- **Title cards.** At a section start, the section or place name can appear huge and cropped,
  like a location name on screen. One per section, never on top of body text.
- **Mass.** Large solid ink slabs and wide empty concrete fields as composition, the way a
  brutalist building uses volume. Keep them few.
- Use the ideas, not the source: no names, logos, symbols or art from the game.

## 11. Imagery

- **Photography:** grey, overcast, flat light; concrete, structure, repetition. Greenery
  against concrete is welcome in small amounts. Desaturate or
  convert to monochrome unless colour is the subject. Prefer straight-on, architectural
  framing.
- **Generative / procedural:** black field, white or grey lines; wireframe terrain, halftone
  dots, scanline smear, waveform, point clouds. Good for covers and section openers.
- **Product screenshots:** shown flat or as an object on a grey ground, with a caption line in
  mono. No glossy device mockups with shadows.
- **Diagrams:** hairline vectors, mono labels, crosshairs at nodes, jacks and patch lines for
  connections, signal colour on the one path that matters.
- Images can be framed by corner marks and a mono caption with index + description.

## 12. Motion (screen only)

- Short and mechanical: 120–180ms, linear or ease-out. Things *switch* more than they *float*.
- Allowed: counters ticking up, a cursor blink, a scan line passing once, a value updating, a
  title card cutting in once.
- Not allowed: bounce, parallax, decorative loops, moving grain. Respect
  `prefers-reduced-motion`.

## 13. Voice in the interface

Labels read like an instrument panel or a filing form: short, uppercase mono, nouns. `STATUS`,
`RELEASED`, `FILE`, `REV`, `OUT`. Buttons are verbs in sentence case, in the grotesk
("Download PDF"). Body copy follows `PRODUCT.md`: plain, first person, no hype. The contrast
between cold labels and warm, direct prose is intentional.

## 14. Applying it per medium

### Web (this site)
- Tokens in `src/styles/global.css` map 1:1 to the tables above.
- Paper is light mode, Instrument is dark mode. The site follows the visitor's OS setting by
  default, with a manual toggle.
- Instrument detail level: **visible**. Marks live in headers, margins, footers and around
  images; the reading column stays plain.
- Page header behaves like a title block: name, section index, version/date in mono.
- Lists of work use hairline tables and visible indices, not shadowed cards.
- Grain and mottle on the page ground (section 7).

### PDF / print
- A4 or Letter, 12-column grid, 12pt baseline.
- Classification line at the top, footer strip on every page in a fixed position: serial,
  page `03/12`, revision, date.
- Cover: one display element (numeral or word) + a title block in the lower corner.
- Proposals and reports use the form layout from section 10.
- Print in Paper colours. Signal orange as a spot colour; check it survives greyscale.

### Slides
- 16:9, 8 columns. One idea per slide, one display element, mono annotation at the edges.
- Section dividers can switch to Instrument (black) and use a title card.

### App UI
- Instrument by default for tools; Paper for reading-heavy apps.
- Section 8 applies in full: one form per control, fixed positions, label above value,
  inverted outputs, shortcuts as keycaps.
- Controls are flat, 1px outlined, sharp, grotesk labels. Primary action is the only
  signal-filled control.
- Data readouts in Plex Mono with tabular figures; live values can use `live` green.

### Covers / posters / social
- The place where the system can be loud: a full signal-orange field with ink grain, a cropped
  giant numeral, a generative black field, or (less often) a moss field. One colour field per
  cover, still real metadata.

## 15. Don'ts

- Fake data, fake coordinates, fake version numbers, fake redactions.
- More than one accent colour in a view. Moss is not an accent: it never marks actions or
  status, and it never outweighs signal.
- Drop shadows, glassmorphism, soft gradients, rounded "friendly" cards.
- A fourth font. Departure Mono below 20px. Mono on buttons.
- Mono for long body text.
- Grain on text, or grain you notice before the content.
- Two designs for the same control, or a control that moves between screens.
- Sci-fi cosplay: HUD decoration that crowds the content or carries no meaning.

---

## Decisions log

- 2026-10-04: Signal colour is signal orange.
- 2026-10-04: Site follows the OS colour scheme (Paper / Instrument), with a toggle.
- 2026-10-04: Instrument detail on the site is "visible": edges and headers, calm content.
- 2026-10-04: Three fonts total: grotesk + Departure Mono + IBM Plex Mono.
- 2026-10-04: Full palette defined: concrete ramp, signal, state, semantic tokens, contrast checked.
- 2026-10-04 (v0.2): Departure Mono only at 20px+; all small mono is Plex Mono; buttons use
  the grotesk.
- 2026-10-04 (v0.2): Signal toned down a touch: `#FF4F1F` → `#EA562A`.
- 2026-10-04 (v0.2): Added material texture, control-surface rules (modular synthesis) and the
  institutional layer.

- 2026-10-04 (v0.3): Added moss (`#55664A` / `#8FA27A`) as a balance colour, max ~3% per
  view, always less than signal. Added the growth line mark and the planter block.
- 2026-10-04: Counting systems per counter type (hex, letters, roman, greek); light motion
  (settle-in on load, reveal on scroll); secondary labels pushed further back in colour.

## Open decisions

- Final name for the system (working name: Datum).
- Statement grotesk: system Helvetica Neue vs licensed Neue Haas Grotesk.
