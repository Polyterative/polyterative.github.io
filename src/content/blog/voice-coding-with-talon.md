---
title: "Voice Coding with Talon — A Year of Hands-Free Development"
description: "My wrists were getting tired, so I started coding by voice. A year later, here's what works, what doesn't, and how my Talon setup works with JetBrains and the terminal."
date: "2025-02-10"
tags: ["Voice Coding", "Talon", "Tooling", "Accessibility", "Productivity"]
---

It started with my wrists. Long days of keyboard-heavy development left them tired every single time, and I didn't want to wait for that to turn into something worse.

So I started using Talon Voice. More than a year later it's my **main coding interface**. I write production TypeScript and Angular with it and do my terminal work through it every day. I was also curious whether you could build serious software by voice at a normal pace. You can, with some caveats, and this post is about those caveats.

## What Talon actually is

Talon isn't dictation. It doesn't try to transcribe what you say. It listens for short spoken commands that you define yourself, and each command runs a bit of Python:

```python
# Say "slap" → press Enter
"slap": key(enter)

# Say "go line 42" → navigate to line
"go line <number>": edit.jump_line(number)

# Say "select funk" → select current function in editor
"select funk": user.select_function()
```

The words are short and easy to tell apart, and they chain together. "Grab word right" selects the next word. "Chuck line" deletes the current line. "Paste that" pastes. It sounds strange at first, and then it turns into a language you speak without thinking.

## The first two weeks

The first two weeks were frustrating. I was slower than on a keyboard, and every command felt like looking something up. I had to stop and remember the word for "select to end of line", then say it, then check it had worked.

Around the third week it changed. The commands started coming out on their own the way keyboard shortcuts do, and I stopped translating in my head.

## Fitting it to JetBrains

JetBrains IDEs need their own integration. The Talon community shares a `talon_community` repo with JetBrains commands, and I've built a lot on top of it in [Poly-Talon-Scripts](https://github.com/polyterative/Poly-Talon-Scripts). Most of my additions come from Angular and TypeScript work:

- **Refactoring**: "rename symbol", "extract variable", "implement interface", each mapped to the JetBrains refactoring shortcut
- **Navigation**: "open component", "go to template", "switch spec" for jumping around an Angular component
- **Snippets**: spoken triggers for common TypeScript shapes like Observable chains, component decorators and async/await
- **Terminal**: "show terminal", "run tests", "build it"

## Where voice wins, and where it doesn't

Voice turned out to be fast for anything with a name: jumping to a file, symbol or line, refactoring, running builds and tests, git commands in the terminal, and writing comments and documentation.

It's slow for dense syntax. Arrow functions, template literals and any line full of punctuation take longer to say than to type. Switching between voice and keyboard in the middle of a thought is slow too.

So in practice I mix them. I use voice for navigation, commands and structure, and the keyboard for the dense bits when speed matters.

## Was it worth it?

Voice coding isn't faster than typing across the board. It's faster for some kinds of work and slower for others.

But speed was never the reason I started. After a full day of coding my wrists are fine now, and that alone was worth two awkward weeks. My full command set is in the repo. It's shaped around how I work, but it's documented well enough to fork.

Voice took care of the worst days. For the hours I still spend on the keyboard, I rebuilt the rest of my input setup, which I wrote about in [Stream Deck + Karabiner](/blog/streamdeck-karabiner-input-layer).
