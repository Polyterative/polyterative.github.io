---
title: "Layers and Ensembles: Engineering a Development Loop Like a Network"
description: "How I designed the skill system I now direct — borrowing depth, width, and ensemble structure from neural network architecture, on purpose, over months of iteration."
date: "2026-08-07"
tags: ["AI", "Workflow", "Agents", "Architecture", "Process"]
---

I want to be precise about something, because the easy version of this story makes it sound like a system that assembled itself. It didn't. I designed it, deliberately, over months, and the design choices came from a specific place: I looked at how neural networks get their power — depth, width, and ensembles of specialists instead of one generalist — and I asked whether the same shape would work for a development process directed by a human instead of trained by gradient descent. It does. Here's how I got there and why the shape is what it is.

## Where it started: asking for "layers" by hand

Before any of this was formalized into reusable skills, I was already asking for it manually, one session at a time. On Patcher's rack analysis and insights pages, my instructions read like this, verbatim, across different sessions: "do five layers of improvements," "continue refining insights page x15 more layers of expansion/refinement with subagents," "we need like twenty layers of checks." I wasn't asking for one pass at a feature. I was asking for a stack of passes, each one building on what the last one produced, each pass itself made of several sub-agents working a different facet of the same surface in parallel.

That's depth and width, named without me having a word for it yet. Depth: each layer of refinement takes the previous layer's output as its starting point and improves on it, the same way each layer in a network takes the previous layer's representation and refines it rather than starting from raw input again. Width: within one layer, I wasn't running one sub-agent that tried to hold constants, layout, accessibility, and copy in its head at once — I ran several, each scoped to one concern, in parallel, the way a layer's units each respond to a different feature of the input instead of one unit trying to encode everything.

The result, session after session, was compounding. A single generalist pass on a feature gets you a solid first draft. Fifteen narrow, stacked passes get you something that looks like it was built by a team that actually specializes — because structurally, that's what it was.

## Formalizing it: skills as fixed layers, agents as fixed units

Once I noticed I was typing "do fifteen more layers of refinement with subagents" often enough that it had become a personal ritual, I did what you do with any manual step that's earned its place: I made it a reusable skill instead of a sentence I retyped every time. That's the actual origin of the skill system — not a theory I applied top-down, but a pattern I kept doing by hand until it deserved to be infrastructure.

The skills now encode fixed roles the way a network encodes fixed layers: discovery, design, architecture, implementation, QA, documentation, each one a specialist pass with a specific mandate, each one consuming the output of the one before it rather than re-deriving everything from the original request. A refactor sweep runs several independent agents over disjoint parts of a codebase in one layer, each committing one scoped fix — width, again, applied deliberately instead of one agent trying to hold an entire repository's issues in one context window.

## The council: ensembles instead of one generalist verdict

The second borrowed idea is more specific and it addresses a real failure mode: a single reviewer, however capable, has blind spots that are consistent — it tends to miss the same category of problem every time, because it's one perspective applied repeatedly. Ensemble methods exist because independently-reasoning specialists, each looking through a narrow and different lens, catch things a single generalist model misses, and their disagreement is itself informative rather than noise to be smoothed over.

That's why quality review in my loop runs as a small council, not one pass. A voice-and-identity reviewer checks tone and register against my own stated conventions, line by line, nothing vaguer than "line 4 violates rule X." A skeptic checks structural claims and failure modes. An evidence reviewer checks what's actually substantiated versus asserted. A strategy reviewer checks whether the work still serves the actual goal. Each one is deliberately narrow — the same way an ensemble's individual members are deliberately not trying to be each other — and only after they've each independently scored the work does a synthesis step reconcile their verdicts into one decision: ship, revise, or hold.

I used exactly this council structure on the first draft of this article an hour ago. The voice reviewer caught two banned phrasing patterns I'd let slip in. That's the mechanism working as designed, not a coincidence — a single self-review pass is exactly the kind of consistent blind spot ensembles exist to catch.

## Why I organized it like a small company, and why that's the same idea

The "mimicking a small company" framing I used casually before is really the mixture-of-experts idea again, just applied to workflow roles instead of network weights: route each concern to the specialist built for it, instead of asking one generalist to reason about product, design, architecture, and QA in the same breath. A company organizes around this because one person holding every function in their head produces worse decisions in each function than a person dedicated to just that function would. The same degradation happens inside one unstructured AI pass trying to do everything at once — it optimizes for none of its objectives well. Splitting it into fixed, specialized roles with a defined handoff between them is the fix in both cases, for the same underlying reason.

## What I actually did versus what happened

None of this is automatic and none of it happened by itself. I wrote each skill's mandate. I decided which concerns get their own layer and which get merged. I decided the council needs four independent lenses and not two or eight — a number I arrived at by watching where extra reviewers stopped catching anything new. I still read every output and decide ship, revise, or redirect. The system doesn't design itself and it doesn't run itself; it's an architecture I hold in my head and keep tuning, the same way you'd keep tuning a network's depth and width once you've noticed where it under- or over-fits the problem.

What changed is that I no longer have to reassert the structure by hand every single time, the way I was manually typing "fifteen layers" a few months ago. The architecture is now load-bearing infrastructure instead of a habit I had to remember. That's the actual unlock — not that the software builds itself, but that the process I designed, based on a real and specific analogy to how networks get their power, now runs without me having to re-explain it in every session. I still direct every layer. I just don't have to redraw the blueprint each time I use it.
