---
title: "Poly Highlights — Designing a Luminance-Corrected IDE Theme"
description: "Why most syntax themes fail readability, and how perceptual luminance fixes it."
date: "2024-04-15"
tags: ["design", "tooling", "color", "jetbrains"]
---

Most IDE color themes are designed by eye in isolation: pick colors that look good together, assign them to token types, ship. The result is usually a theme where comments are so dim you skip them, strings are so bright they dominate, and after two hours your eyes ache in ways you can't explain.

Poly Highlights starts from a different constraint: every token color must sit at a consistent perceptual brightness relative to the background.

## The Problem with "Good Enough" Colors

Hex colors are specified in sRGB, which has no perceptual uniformity. `#ff0000` and `#0000ff` have the same saturation value but wildly different perceived brightness — red reads as much darker than blue to the human visual system.

When you pick theme colors by feel, you're implicitly compensating for this, badly. Strings end up louder than keywords. Comments become invisible. Your eyes do extra work to parse token hierarchy that the syntax highlighting was supposed to make effortless.

## Luminance as a Design Constraint

The fix is to compute relative luminance (per WCAG 2.1) for every color and use that as the primary design axis, not hue or saturation.

The formula converts sRGB values to linear light, then weights them by the sensitivity of the human eye to red, green, and blue light:

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```

That 0.7152 coefficient for green isn't arbitrary — it matches the distribution of cone cells in the fovea. Your eye is most sensitive to green, least sensitive to blue.

## The Design System

Poly Highlights uses three luminance bands:

- **Primary tokens** (keywords, operators): ~0.35 luminance on a dark background — visible but not aggressive
- **Secondary tokens** (strings, types): ~0.55 — slightly brighter, distinguishable without shouting
- **Tertiary tokens** (comments, punctuation): ~0.15 — present but clearly subordinate

Every color is then chosen within those bands. Hue is a secondary consideration — it adds semantic richness (warm vs cool) once luminance is set correctly.

## The JetBrains Constraint

JetBrains IDEs have their own color system that doesn't map 1:1 to token types. Some tokens you'd want to distinguish share a single JetBrains color slot. The theme has to work within that constraint, which occasionally means accepting a luminance deviation to preserve the most important distinctions.

The theme is updated regularly as JetBrains expands their token system. Each new slot is an opportunity to refine.

## Result

After two hours with a luminance-corrected theme, your eyes don't hurt. Comments don't disappear. The token hierarchy is obvious without being garish. It's a very small design intervention with a disproportionate daily impact — most developers spend more time reading code than writing it.

The theme is on GitHub and free to use.
