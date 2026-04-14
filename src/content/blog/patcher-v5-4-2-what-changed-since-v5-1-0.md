---
title: "Patcher v5.4.2 — What Changed Since v5.1.0"
description: "A progress update on Patcher: manufacturer pages, public profiles, SSR, moderation tools, multi-panel workflows, and a more coherent digital twin workspace for Eurorack."
date: "2026-04-14"
tags: ["Patcher", "Eurorack", "Angular", "Supabase", "Open Source"]
---

It has been a while since the last public update for Patcher.

The last major message was around **v5.1.0**, which was the release where the patch editor finally started to feel complete. Since then, the work has been less about one single headline feature and more about pushing the whole product forward in a steady way: public pages, browsing, moderation, panel workflows, SEO, onboarding, and the database itself.

The result is that Patcher now feels less like a set of separate tools and more like one coherent workspace for modular musicians.

## The database side got much stronger

One of the biggest improvements since v5.1.0 is the database and discovery layer.

Patcher now has **manufacturer pages** with dedicated browsing, filtering, pagination, and recent activity. That makes the public hardware database more useful as a reference, not just as a support system for patches and racks.

On the module side, there is now support for **store links**, better issue reporting, smarter power defaults, and a fuller moderation workflow. Users can flag problematic entries, and admins now have a proper flow for reviewing, resolving, or deleting those reports.

That work matters because Patcher is only as useful as the quality of the shared data behind it.

## Public pages and sharing improved a lot

Another major area of work was the public-facing layer of the app.

Patcher now includes **server-side rendering**, structured SEO data, improved metadata handling, and better sitemap behavior. In practical terms, this means public content is easier to discover, preview, and share.

There are now also **public profile pages**, which give contributors a more visible presence in the system and help connect patches, racks, and module contributions back to real users.

This has been an important step toward making Patcher more legible from the outside, not just more useful once logged in.

## Multi-panel support became a real workflow

Multi-panel modules have also moved much closer to the original vision.

What started as basic support is now a more complete system: panel galleries, clearer labels, click-to-preview behavior, rack-local panel switching, and a global panel color preference. If you care about panel variants, alternate layouts, or keeping a digital representation of your system visually accurate, this part of Patcher is now substantially better than it was a few versions ago.

## Browsing and account flows got smoother

A lot of work went into the connective tissue of the app.

Pagination state now persists across navigation. Floating search has expanded. Module tag filtering is in place. Onboarding has become more contextual. Auth and profile flows have been cleaned up, and username completion is now enforced properly.

None of these changes are flashy on their own, but together they make the app feel more stable and more deliberate in day-to-day use.

## A lot of quality-of-life work landed too

There were also many smaller but meaningful improvements:

- comments UI got a major refresh
- discovery tips can now be paused globally
- rack creation can default to private
- rack editing supports HP overrides
- public profile queries and comments handling were hardened
- backup and restore scripts were added for local Supabase workflows

This kind of work is easy to overlook in a changelog, but it is often what makes a tool feel trustworthy.

## Where Patcher is now

Patcher started from a simple need: documenting modular patches in a way that was actually usable over time.

That idea is still the core of the project, but the app has grown well beyond patch notes. It is now much closer to what I wanted from the beginning: a digital twin workspace for Eurorack musicians, where patches, racks, modules, public discovery, and personal workflow all belong to the same system.

If you have not looked at it since **v5.1.0**, now is a good time to check back in.

**https://patcher.xyz**
