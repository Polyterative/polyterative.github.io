---
title: "Voice Coding with Talon — A Year of Hands-Free Development"
description: "What works, what doesn't, and how I configured Talon Voice for daily development across JetBrains IDEs and the terminal."
date: "2025-02-10"
tags: ["voice-coding", "talon", "tooling", "accessibility", "productivity"]
---

I've been using Talon Voice as my primary coding interface for over a year. Not as an experiment — as my daily driver for production TypeScript, Angular, and terminal work. Here's what actually happened.

## Why

Two reasons, one more practical than the other.

The practical one: repetitive strain from keyboard-heavy development. Before voice coding, I had consistent wrist fatigue after long sessions. Voice eliminates the mechanical load entirely.

The less practical one: I was curious whether you could build complex software with your voice at production speed. The answer is yes, with caveats.

## What Talon Is

Talon Voice is a programmable voice control system for desktop computers. Unlike dictation software, it's not trying to transcribe natural speech — it listens for specific spoken commands that you define yourself, and executes code (Python) in response.

Every command is a Python function:

```python
# Say "slap" → press Enter
"slap": key(enter)

# Say "go line 42" → navigate to line
"go line <number>": edit.jump_line(number)

# Say "select funk" → select current function in editor
"select funk": user.select_function()
```

The commands are short, unambiguous, and composable. "Grab word right" selects the next word. "Chuck line" deletes the current line. "Paste that" pastes.

## The JetBrains Setup

JetBrains IDEs need specific integration. The Talon community has a shared `talon_community` repo with JetBrains-specific commands, but I've extended mine substantially in [Poly-Talon-Scripts](https://github.com/polyterative/Poly-Talon-Scripts).

The key additions for Angular/TypeScript work:

- **Refactoring commands**: "rename symbol", "extract variable", "implement interface" — all mapped to the JetBrains refactoring shortcuts
- **File navigation**: "open component", "go to template", "switch spec" for Angular component navigation
- **Snippet expansion**: custom spoken triggers for common TypeScript patterns (Observable chains, component decorators, async/await)
- **Terminal toggle**: "show terminal", "run tests", "build it"

## What's Fast vs Slow

Fast:
- Navigation (jumping to files, symbols, lines)
- Refactoring (rename, extract, move)
- Running builds and tests
- Git operations via terminal commands
- Dictating comments and documentation

Slow:
- Writing dense expression syntax (arrow functions, template literals)
- Anything involving unusual punctuation clusters
- Switching between voice and manual input mid-flow

The practical workflow is hybrid: voice for navigation, commands, and structure; keyboard for dense expression bodies when speed matters.

## The Learning Curve

The first two weeks are frustrating. You're slower than you would be on a keyboard, and the command vocabulary doesn't feel natural yet. Around week three it shifts — commands become reflexes rather than lookups.

The full command set is in the repo. It's opinionated toward my workflow but the structure is documented well enough to fork.

## Honest Assessment

Voice coding is not universally faster than keyboard coding. It's faster for specific things (navigation, large-scale refactoring, terminal work) and slower for others (dense expression writing).

The real benefit for me was ergonomic. Zero wrist fatigue after full-day sessions. That alone is worth the two-week learning investment.
