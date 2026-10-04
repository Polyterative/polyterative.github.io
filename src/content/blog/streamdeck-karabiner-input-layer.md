---
title: "Stream Deck + Karabiner — Building an Input Layer That Fits How I Actually Work"
description: "I stopped putting up with the default keyboard and built my own input setup out of a Stream Deck XL and some Karabiner rules. It isn't really about speed."
date: "2026-01-15"
tags: ["Productivity", "Tooling", "Stream Deck", "Karabiner", "macOS", "Keyboard"]
---

The keyboard layout we all use dates back to 1873. The symbols are in odd places, the modifier keys are wherever they ended up, and the function row barely does anything. For most tasks that's fine. When you write code and switch between tools all day, though, you pay for those small awkward moves thousands of times a day without noticing.

I noticed when my wrists started getting tired after long sessions. Voice coding with Talon took care of the worst days. But I still spend a lot of hours at a keyboard, and I wanted those hours to cost less too. So I stopped putting up with the defaults and built my own input setup in two layers.

## Two layers for two jobs

**Karabiner** works at the operating-system level, below every app. It catches each keystroke before anything else sees it and can turn it into whatever you like. That's where my remapping lives.

The **Stream Deck XL** is a separate device with 32 labelled buttons. It's for actions that should be one deliberate press instead of a chord, things that benefit from a visible label, and things I want to reach without thinking about where they live.

They solve different problems, and together they cover most of what used to bother me.

## Karabiner: one spare key, and symbols under your fingers

The change I'd keep if I could only keep one is the hyper key. Caps Lock, which is almost useless, acts as Control + Option + Command + Shift when you hold it. No app uses that combination, so nothing ever clashes with it. Every global shortcut and macro I own lives under `Hyper + [key]`.

Next is symbols. `[`, `]`, `{`, `}`, `|` and `\` are hard to reach on most keyboards, and on an Italian layout they need Option chords that never became muscle memory for code. So I put them on a layer. Hold one modifier and the home row turns into a row of symbols. My hands don't move, and I don't have to remember where anything is.

Last is navigation. HJKL as arrow keys on a layer, Vim-style, plus word jumps and start/end of line. These work in every app, not just editors that support them.

## Stream Deck: actions you can see

Karabiner is invisible. You can't see which layer you're on or what a key does right now. The Stream Deck is the opposite: every button has a label and an icon.

So it gets the jobs where seeing helps:

- switching apps and windows, with each app always in the same physical spot, so no Alt-Tab hunting
- system actions: muting the mic, do-not-disturb, switching audio between studio monitors and headphones
- macros: multi-step actions that would be hard-to-remember chords but work well as a single button
- per-app pages: the deck switches pages depending on which app is in front

Those per-app pages are what made it stick. The buttons in front of me are always the ones that matter in the app I'm using. There are no blank buttons and none that don't apply.

## What it cost

The Stream Deck XL was the real expense. Karabiner is free and open source.

Karabiner takes time. Complex modifications need some reading, and the `JSON` rule format isn't obvious at first. Plan on a couple of evenings to get from nothing to something useful, and then keep tweaking it whenever you notice another awkward spot.

The Stream Deck is quicker to set up. Its software is drag-and-drop, and per-app profiles are easy. The ongoing work is keeping the profiles up to date as your workflow changes.

## Why it was worth it

Each awkward chord or hunt for a key is a tiny tax. One on its own costs nothing, but over eight or ten hours of work they add up to real tiredness, both physical and mental.

Removing them hasn't made me measurably faster. What it changed is how the day feels. By the evening I don't notice the tools anymore, and that's the best thing a tool can do.

The furthest version of this is [Voice Coding with Talon](/blog/voice-coding-with-talon), where the keyboard drops out completely.
