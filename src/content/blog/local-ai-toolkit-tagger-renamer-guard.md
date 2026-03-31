---
title: "Three Small Tools for Living with Local AI"
description: "mini-tagger, mini-renamer, and lms-guard: a set of macOS utilities I built because local LLMs are powerful but rough around the edges."
date: "2026-03-20"
tags: ["Python", "Local AI", "LM Studio", "macOS", "Tooling", "Productivity"]
---

Running models locally is great until your machine grinds to a halt because you forgot to unload a 14B model — or until you notice your screenshots folder has 800 files named `Screenshot 2026-03-14 at 09.43.11.png` and no way to find anything in them.

I built three small macOS utilities to deal with this. Each does one thing.

---

## mini-tagger — Auto-tag and rename your screenshots

mini-tagger is a menu bar app that watches a folder. When a new image appears, it sends the image to [Moondream2](https://moondream.ai) — a compact vision-language model — running locally on MPS (Apple Silicon GPU), extracts semantic tags, and renames the file to:

```
2026-03-14 at 09.43.11 (terminal python error traceback).png
```

Then it moves it to a destination folder and copies the result to your clipboard.

macOS screenshots are tricky: the system writes them via an atomic temp-file rename, not a direct create. The watcher handles both `FileCreatedEvent` and `FileMovedEvent` exactly for this reason. There's also a small polling loop that waits for file size to stabilize before handing it to the model — otherwise PIL opens a partial write and produces garbage.

```python
def _wait_for_stable(path: Path, timeout: float = 5.0) -> bool:
    prev_size = -1
    deadline = time.time() + timeout
    while time.time() < deadline:
        size = path.stat().st_size
        if size > 0 and size == prev_size:
            return True
        prev_size = size
        time.sleep(0.15)
    return False
```

There's also a memory monitor that auto-unloads the model when free RAM drops below a configurable threshold, so the tool doesn't become a problem in itself.

---

## mini-renamer — Human-in-the-loop file renaming

Same idea, different interaction model. You drag files onto a window — images, PDFs, DOCX — and a local LLM proposes a clean filename for each one. You review them one at a time, edit the proposed name inline if needed, then hit Apply.

The file handling per type:
- **Images** → sent as base64 to the VLM
- **PDFs** → text extracted with `pdfplumber`; scanned PDFs fall back to first-page image via `pymupdf`
- **DOCX** → text extracted with `python-docx`

Everything stays on your machine. No uploads. The model runs in LM Studio locally, you configure which one in a TOML file.

```toml
[model]
base_url   = "http://localhost:1234"
identifier = ""  # leave empty to auto-select first loaded model

[naming]
style      = "kebab-case"
max_length = 60
```

The output style — kebab-case, snake_case, Title Case — is configurable because different workflows want different things.

---

## lms-guard — Memory watchdog for LM Studio

This one is the most utilitarian. LM Studio models are large. If you have a few loaded and then switch to something memory-heavy, the system starts swapping and everything becomes slow.

lms-guard is a macOS menu bar app that polls RAM usage every N seconds. If available memory drops below a threshold *and* the loaded models have been idle for a configurable period, it starts a 10-second countdown and then unloads them. You can cancel, snooze, or pause the guard entirely from the menu.

The menu bar icon tells you at a glance what's happening:

| Icon | State |
|------|-------|
| `▫` | No models loaded |
| `▪` | Models loaded, guard active |
| `⏸` | Guard paused by you |
| `⤓` | Unloading in progress |

It talks to LM Studio via the `lms` CLI, not the HTTP API, which turns out to be more reliable for unload operations.

---

## The pattern

These three tools are small individually. Together they make a point: local AI is powerful but still unfinished as a day-to-day experience. The models are good. The scaffolding around them — memory management, file organization, the basic lifecycle of loading and unloading — mostly doesn't exist yet. You either build it yourself or you tolerate the friction.

I'd rather build it. It's also the fastest way to actually understand what these models are doing, as opposed to prodding them through a chat window and hoping.

All three are Python, packaged as native macOS `.app` bundles via py2app, living in the menu bar with rumps. Tidy codebases. I'll open-source them when they've had more time on my machine.
