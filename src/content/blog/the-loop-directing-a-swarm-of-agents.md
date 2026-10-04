---
title: "Layers and Ensembles: Engineering a Development Loop Like a Network"
description: "How a sentence I kept typing to my AI agents turned into a skill system, and why it ended up shaped like a neural network: depth, width and a council of specialists."
date: "2026-08-07"
tags: ["AI", "Workflow", "Agents", "Architecture", "Process"]
---

A few months ago, while working on Patcher's rack analysis and insights pages, I kept typing the same kind of instruction to my coding agents. Going back through those sessions, they read like this:

> "do five layers of improvements"
>
> "continue refining insights page x15 more layers of expansion/refinement with subagents"
>
> "we need like twenty layers of checks"

I wasn't asking for one pass at a feature. I was asking for a stack of passes, each building on the one before, and each made of several sub-agents working on different parts of the same page at the same time.

I didn't have a name for it then. Later I noticed it was the same shape that gives neural networks their power. This post is about how a habit turned into a system, and why I deliberately kept that shape.

## Depth and width, before I had the words

Two things were going on in those sessions.

The first was **depth**. Each layer of refinement started from what the previous layer produced, not from the original request. That's how layers in a network work too. Each one takes the representation from the layer before and refines it, without going back to the raw input.

The second was width. Inside a single layer, I didn't give one agent the constants, the layout, accessibility and the copy all at once. I ran several agents in parallel, each looking at one concern. In a network, each unit in a layer responds to a different feature of the input. Nobody expects one unit to encode everything.

The results showed up session after session. One general-purpose pass gets you a decent first draft. Fifteen narrow passes stacked on each other get you something that looks like it was built by a team of specialists, because in a way it was.

## From a sentence to a skill

At some point I realised that "do fifteen more layers of refinement with subagents" had become a ritual. When I keep doing something by hand and it keeps working, I turn it into a tool. So I turned it into reusable skills.

That's where the skill system actually came from. I didn't start with a theory and apply it. I kept doing something by hand until it was obviously worth automating.

Each skill is a fixed role, the way a network has fixed layers: discovery, design, architecture, implementation, QA and documentation. Each one has a specific job and takes the previous skill's output as its input, instead of working everything out again from the original request. Width shows up too. A refactor sweep sends several independent agents across separate parts of a codebase in one layer, and each one commits a single scoped fix, instead of one agent trying to hold a whole repository's problems in its head.

## One reviewer wasn't enough

Next I ran into a problem with review. A single reviewer, however capable, has blind spots, and they're always the same ones. It misses the same kind of problem every time, because it's one point of view applied over and over.

Machine learning deals with this using ensembles. Several independent models, each looking from a narrow and different angle, catch things a single generalist misses, and where they disagree is useful information in itself.

So review in my loop is a small council, not one pass. A voice reviewer checks tone and wording against my own written rules, line by line. Its feedback is specific, like "line 4 breaks rule X". A skeptic looks at structural claims and ways things could fail. An evidence reviewer checks what's actually backed up and what's just asserted. A strategy reviewer asks whether the work still serves the goal. Each one is deliberately narrow. Only after all four have scored the work separately does a synthesis step combine their verdicts into one decision: ship, revise or hold.

I ran the first draft of this article through that council an hour before writing this sentence. The voice reviewer caught two phrasing patterns I've banned from my writing that had slipped back in. A single self-review would very likely have missed them, because that's exactly the kind of repeated blind spot the council exists to catch.

## Why it looks like a small company

I used to describe this setup as "a small company of agents". It's really the same idea again, applied to job roles instead of network weights. In machine learning it's called mixture of experts. You send each problem to the specialist built for it, instead of asking one generalist to think about product, design, architecture and QA all at once.

Companies are organised this way for the same reason. One person juggling every role makes worse decisions in each of them than someone focused on just one. A single unstructured AI pass that tries to do everything has the same problem: it does none of it well. In both cases the fix is the same. Split the work into fixed roles with clear handoffs between them.

## What I still do

None of this runs itself. I wrote each skill's brief. I decided which concerns get their own layer and which get merged. I settled on four reviewers, not two or eight, by watching where adding more stopped finding anything new. I still read every output and decide whether to ship it, revise it or send it in a different direction. It's a structure I keep in my head and keep adjusting, the way you'd keep tuning a network's depth and width once you see where it underfits or overfits.

The real change is that I don't have to type "fifteen layers" anymore. The structure is built into the system now, so I don't have to remember it every session. It doesn't build software by itself, and I still direct every layer. *I just don't have to draw the plan again every time I use it.*
