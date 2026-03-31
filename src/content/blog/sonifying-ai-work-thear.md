---
title: "Sonifying AI Work — thear"
description: "A small Python tool that turns Claude Code's activity into sound, using Ableton and OSC."
date: "2025-06-01"
tags: ["Python", "Ableton", "OSC", "AI", "Tooling"]
---

I spend a lot of time with AI coding assistants. The experience is largely visual — you watch tokens appear. I wanted to *hear* the work happening.

[thear](https://github.com/polyterative/thear) is a small Python daemon that hooks into Claude Code's activity events and emits OSC messages. Those messages trigger Ableton Live clips and effects in real time.

## How It Works

Claude Code exposes a hooks system that fires events on tool calls, file writes, and completions. thear listens on those hooks and maps events to OSC messages:

```python
# tool_call → trigger a short percussive hit
# file_write → modulate filter cutoff by file size
# completion → release a long reverb tail
```

Ableton receives these via a Max for Live device and routes them to whatever sounds you've set up.

## Why

Partly curiosity. Partly because working for long stretches with AI tools can feel dissociative — you lose track of what's happening. Sound gives you a peripheral awareness without demanding visual attention.

It's also just fun. The output is surprisingly musical. File writes cluster rhythmically. Long reasoning steps produce slow ambient swells.

The code is on GitHub. It needs Ableton + Max for Live, but the OSC output is generic enough to route anywhere.

thear isn't the only tooling I've built around local AI workflows. If this kind of thing interests you, [Three Small Tools for Living with Local AI](/blog/local-ai-toolkit-tagger-renamer-guard) covers mini-tagger, mini-renamer, and lms-guard — a set of macOS utilities built on the same philosophy of instrumenting the AI experience rather than just consuming it.
