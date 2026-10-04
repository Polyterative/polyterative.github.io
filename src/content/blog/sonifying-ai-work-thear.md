---
title: "Sonifying AI Work — thear"
description: "A small Python tool that turns Claude Code's activity into sound through Ableton and OSC, so I can hear the work instead of watching it."
date: "2025-06-01"
tags: ["Python", "Ableton", "OSC", "AI", "Tooling"]
---

I spend a lot of my day working with AI coding assistants, and all of it happens on screen. Text appears, tool calls scroll past, files change. After long sessions I'd notice that I'd lost track of what had actually happened, even though I'd been looking at it the whole time. It felt oddly detached.

I make music, so I tried to fix it with sound. [thear](https://github.com/polyterative/thear) is a small Python daemon that listens to Claude Code and plays its activity through Ableton Live.

## How it works

Claude Code has a `hooks` system that fires on events like tool calls, file writes and completions. thear listens to those hooks and sends an <span class="caps">OSC</span> message for each event:

```python
# tool_call → trigger a short percussive hit
# file_write → modulate filter cutoff by file size
# completion → release a long reverb tail
```

A Max for Live device in Ableton receives those messages and sends them to whatever sounds you've set up.

## What it sounds like

I expected noise. It sounds more like music than I thought it would. File writes come in clusters, so they fall into rhythms. Long reasoning steps turn into slow ambient swells. Before long you can follow a session by ear: busy stretches sound busy, and a reverb tail tells you it's finished.

That's what I was after. Sound gives you **peripheral awareness**: you know what's going on without having to stare at it. I could look away from the screen and still know where the session was. And it's fun to leave running.

The code is on GitHub. My setup needs Ableton and Max for Live, but the OSC output is generic, so you can send it to anything that listens.

thear is one of a few small tools I've built around working with AI. The others, mini-tagger, mini-renamer and lms-guard, are in [Three Small Tools for Living with Local AI](/blog/local-ai-toolkit-tagger-renamer-guard).
