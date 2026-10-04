---
title: "Poly Highlights — Designing a Luminance-Corrected IDE Theme"
description: "My eyes were tired after a couple of hours with every theme I tried. Here's how I fixed it by designing the colors around brightness first."
date: "2024-04-15"
tags: ["Design", "Tooling", "Color Theory", "JetBrains"]
---

Every IDE theme I tried wore me out in the same way. Comments were so dim I stopped reading them. Strings were so bright they pulled my eye away from the logic. After about two hours my eyes ached, and I couldn't tell you why.

Eventually I worked out what those themes had in common. Somebody had picked colors that looked nice together, given each one to a token type, and stopped there. Nobody had checked how bright each color actually looks against the background.

So I made my own theme, with one rule: every token color sits at a **planned perceptual brightness**, and hue comes second.

## Why picking by eye goes wrong

Hex colors are defined in sRGB, and sRGB isn't perceptually uniform. `#ff0000` and `#0000ff` are both fully saturated, but pure blue looks much darker to the eye than pure red. Equal numbers don't mean equal brightness.

When you choose theme colors by feel, you end up making up for this without noticing, and you usually get it wrong. Strings come out louder than keywords and comments fade away. Your eyes end up sorting out a hierarchy that the highlighting was supposed to make obvious.

## Brightness first

The fix was to calculate relative luminance, as defined in <span class="caps">WCAG</span> 2.1, for every color and treat it as the main design axis. The formula converts sRGB to linear light, then weights each channel by how sensitive the eye is to it:

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```

Green carries most of the weight because our eyes respond to it most strongly. Blue carries the least, which is why that pure blue looks so dark.

With that in place, the theme came down to three luminance bands on a dark background:

- **Primary tokens** (keywords, operators): around 0.35. Clearly visible without shouting.
- **Secondary tokens** (strings, types): around 0.55. A step brighter, so they stand apart.
- **Tertiary tokens** (comments, punctuation): around 0.15. Still there, clearly in the background.

I only chose hues after that. Warm against cool still carries meaning, but it can't push a token into the wrong band.

## Working inside JetBrains

JetBrains IDEs have their own color slots, and they don't line up one-to-one with the token types I wanted. Sometimes two things I wanted to tell apart share a single slot. In those cases I let the luminance drift a little to keep the distinction that mattered most. Every time JetBrains adds new slots, I get another chance to fix one of those compromises, so the theme keeps changing slowly.

## Two hours later

Now I'm two hours into a session and my eyes are fine. Comments are readable. You can see the structure of the code without the colors getting loud. It's a small change, but most of programming is reading code, so I feel it every day.

The theme is on GitHub and free to use.
