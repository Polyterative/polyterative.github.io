---
title: "Patcher — Building a Database for Eurorack Modular Synthesis"
description: "I kept losing my modular patches, so I built somewhere to keep them. Then other people started using it."
date: "2024-11-10"
tags: ["Eurorack", "Angular", "Supabase", "Open Source"]
cover: "/projects/patcher.jpg"
---

A modular synth patch only exists while the cables are plugged in. Pull them and the sound is gone, along with the knob positions that made it. For a long time my archive was a folder of photos of my rack and a spreadsheet where I tried to explain what each photo meant. Months later I'd open one and have no idea which cable went where, or why I'd liked the result.

That's how [patcher.xyz](https://patcher.xyz) started. I wanted to stop losing patches.

## Looking for something that already existed

Before writing any code I looked for a tool that already did this. Eurorack people talk about patches all the time, on forums, Reddit and Discord, but those conversations are hard to find again later. The apps I found were either from a single manufacturer, so they only knew that brand's modules, or general note apps that didn't know what a module was.

What I wanted was simple to describe. I wanted a place to keep my own patches. I wanted to see how other people used the modules I owned. And under both of those I needed a **shared module database** with specs I could trust.

## The first version

Patcher is an Angular app with a Supabase backend. Angular is what I work in every day, and RxJS streams suit an interface where lots of small things change at once. Supabase gave me auth and a realtime Postgres database, so I didn't have to run servers for a side project.

The first version did three things. You could log your modules from the shared database, save patches with routing, settings, notes and photos, and browse other people's patches by module, tag or contributor.

It launched with zero users and broke in three different browsers.

## Letting other people shape it

I shipped it anyway, and that was the right call. People from the Bologna Modulare community started using it and telling me what was wrong, and nearly every feature since has come out of those conversations. I'd built it for myself, but other people are the reason it kept getting better.

The module database is open for the same reason. I can't keep every module accurate by myself. Anyone can add or fix an entry, so the data improves faster than I could manage alone. Reviewing those changes takes work, and it's worth it.

## What's next

Two things are next. First, a better mobile layout, so I can document a patch on my phone while I'm standing at the rack. Second, an API so other tools can use the module database.

I still log every patch in Patcher before a live set, so it went from a fix for my own mess to a tool I depend on. If you play Eurorack, try it, and if something breaks, open an issue. Most of the app got built that way.

How Patcher fits into preparing a show is in [The Live AV Pipeline](/blog/live-av-performance-pipeline).
