---
title: "Three Small Tools for Living with Local AI"
description: "mini-tagger, mini-renamer and lms-guard: three small macOS utilities I built because running models locally is great, except for everything around the model."
date: "2026-03-20"
tags: ["Python", "Local AI", "LM Studio", "macOS", "Tooling", "Productivity"]
---

Running models on my own machine is great until two things happen. The first is when the whole Mac grinds to a halt because I forgot a **14B model** was still loaded. The second is when I open my screenshots folder and find 800 files called `Screenshot 2026-03-14 at 09.43.11.png`, with no way to find the one I want.

The models were fine. What was missing was everything around them. So I built three small macOS utilities, and each one fixes one of those problems.

## mini-tagger: screenshots that name themselves

mini-tagger is a menu bar app that watches a folder. When a new image shows up, it sends it to [Moondream2](https://moondream.ai), a small vision-language model running locally on the Apple Silicon GPU. The model returns a few tags, and the file gets renamed to something you can actually search for:

```
2026-03-14 at 09.43.11 (terminal python error traceback).png
```

Then it moves the file to a destination folder and copies the result to the clipboard.

The tricky part wasn't the model. macOS doesn't write screenshots directly. It writes a temporary file and renames it at the end, so the watcher has to listen for both `FileCreatedEvent` and `FileMovedEvent`. Even then, the file can still be half-written when the event arrives, and PIL will happily open it and return garbage. So there's a small loop that waits for the file size to stop changing:

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

It also watches memory and unloads the model if free RAM drops below a threshold you set, so the tagger doesn't turn into the problem it was built to fix.

## mini-renamer: renaming with a human in the loop

mini-renamer applies the same idea to files where I want the final say. You drag files onto a window, whether they're images, PDFs or DOCX, and a local model suggests a clean name for each one. You go through them one by one, edit any name you don't like, and press Apply.

Each file type takes a different route to the model:
- Images are sent as base64 to the vision model
- `PDF` text is extracted with `pdfplumber`, and scanned PDFs fall back to an image of the first page via `pymupdf`
- `DOCX` text is extracted with `python-docx`

Nothing leaves your machine. The model runs in LM Studio, and you choose which one in a `TOML` file:

```toml
[model]
base_url   = "http://localhost:1234"
identifier = ""  # leave empty to auto-select first loaded model

[naming]
style      = "kebab-case"
max_length = 60
```

The naming style is configurable, kebab-case, snake_case or Title Case, because different folders need different conventions.

## lms-guard: a watchdog for forgotten models

The third tool deals with the frozen Mac. LM Studio models are big. If a few are loaded and you open something else that's memory-hungry, the system starts swapping and everything slows to a crawl.

lms-guard sits in the menu bar and checks RAM every few seconds. If free memory drops below a threshold and the loaded models have been idle for a while, it starts a 10-second countdown and then unloads them. You can cancel, snooze or pause it from the menu, and the icon shows what it's doing:

| Icon | State |
|------|-------|
| `▫` | No models loaded |
| `▪` | Models loaded, guard active |
| `⏸` | Guard paused by you |
| `⤓` | Unloading in progress |

It talks to LM Studio through the `lms` CLI instead of the HTTP API, because I found the CLI more reliable for unloading.

## What building them taught me

None of these tools is impressive on its own. Together they show that local AI isn't finished yet as something you use every day. The models are good. What's still mostly missing is everything around them: managing memory, keeping files organised, the basic routine of loading and unloading. Either you build that yourself or you put up with the friction.

I'd rather build it, partly because it's the best way I've found to understand what these models actually do. You learn more by wiring one into your file system than by poking at it in a chat window.

All three are written in Python, packaged as native macOS `.app` bundles with py2app, and live in the menu bar using rumps. I'll open-source them once they've run on my machine a bit longer.

[thear](/blog/sonifying-ai-work-thear) comes from the same itch: it turns Claude Code's activity into sound. And the physical side of my setup is in [Voice Coding with Talon](/blog/voice-coding-with-talon) and [Stream Deck + Karabiner](/blog/streamdeck-karabiner-input-layer).
