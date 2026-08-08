---
title: "SwiftDeck — Why I Rewrote the Stream Deck App From Scratch"
description: "The official Elgato app was eating a gigabyte of RAM across eight processes and locking up every time my monitor slept. I got tired of it and wrote a native macOS replacement instead."
date: "2026-08-08"
tags: ["SwiftDeck", "macOS", "Swift", "Stream Deck", "Tooling", "Open Source"]
---

I run a Stream Deck XL and a Stream Deck Pedal all day — dozens of hotkeys, window switching, a Home Assistant panel, macros I don't want to think about while I'm using them. The hardware is great. The official software is the reason I stopped trusting it.

The Elgato app is a Qt desktop shell wrapping a bundled Chromium (QtWebEngine) for its UI and a couple of out-of-process Node.js runtimes for plugins. Measured on my machine with the XL, the Pedal, and two Node plugins running: **~936 MB of RAM at idle, across 8 separate processes**, before you've even opened the window. Open it and it climbs past a gigabyte. The app bundle itself is 730 MB on disk. For software whose entire job is "listen for a button press and swap an image," that's an absurd amount of machinery.

The RAM number is annoying. The instability is what actually pushed me over the edge. More than once, after the monitor went to sleep — nothing exotic, just macOS's own screen standby — the Stream Deck app would come back stuck: keys unresponsive, images frozen, sometimes ownership of the hardware itself just gone until I force-quit and relaunched. For a device I reach for constantly, "it might not work after your screen wakes up" is not a tolerable failure mode.

So I wrote my own driver: **SwiftDeck**, a clean-room native macOS replacement, and I'm in the process of open sourcing it.

## What it actually is

SwiftDeck talks to the hardware directly over USB HID via IOKit — no vendor driver, no bundled runtime, no WebKit anywhere in the process. It's one SwiftUI process: a menu-bar accessory with a status icon, brightness control, and a proper main window for editing profiles.

The engine is split into small, honest pieces rather than one monolith:

- `DeckCore` — the pure engine: profiles, pages, key specs, JSON persistence, no I/O
- `DeckHID` — the IOKit transport, with per-model descriptors for the XL and the Pedal, hotplug handling, and graceful stand-down when the official app already owns the device
- `DeckRender` — turns an icon and a title into the 96×96 JPEG each key actually expects, rotated per device
- `DeckActions` — hotkey injection via `CGEvent`, launching apps/URLs/files
- `DeckImport` — reads existing Elgato `ProfilesV3` profiles so I didn't have to rebuild years of button layouts by hand
- `DeckHomeAssistant` — a native WebSocket client talking directly to Home Assistant, no Node plugin in between

Profiles, pages, hotkey hold/release semantics, multi-actions, a live grid editor that mirrors the physical device as you edit it, local vector icon packs, a first-run device-identification wizard — the parts of the official feature set I actually use are all there, built native instead of imported wholesale.

## The two bugs that mattered most

Two failure modes drove the rewrite more than the RAM number did.

Getting stuck after the screen slept. The Mac's own display sleep would leave the official app in a state where key input either stopped registering or fired stale/duplicate events on wake. Building SwiftDeck meant confronting this directly instead of hoping it wouldn't happen: it has explicit idle and Mac-sleep screen-standby handling with a brightness fade, and — because the first pass wasn't enough — a dedicated guard on key input during the wake transition itself, so a press right as the display comes back doesn't get misread. This is exactly the class of bug that made the original app impossible to trust for all-day use.

Silent profile-navigation failures. Pressing the equivalent of a "home" action to get back to a default profile would sometimes just... not, or land somewhere unexpected, with no error and no obvious cause. Multi-page, multi-profile navigation logic turned out to have several distinct edge cases hiding under one symptom. Chasing all of them down was its own project, but the payoff is a device that reliably goes where you tell it to go, every time, not most of the time.

Neither of these is a glamorous feature. Both are the difference between a tool you forget is running and one you have to keep half an eye on.

## What "lighter" actually means here

macOS doesn't grant exclusive USB HID access in practice, so SwiftDeck and the official app can coexist — it detects when Elgato already owns the devices and hands off cleanly rather than fighting over them. That made it possible to build and validate against the real hardware incrementally, switching ownership back and forth, instead of needing a second physical deck.

The target I measured the official app against: a single native process idling under 50 MB of RAM, an app bundle under 20 MB, effectively 0% idle CPU because HID reads are event-driven rather than polled, and one process total instead of eight. Roughly the difference between a background daemon and a small desktop application suite that happens to run when you're not using it.

## Where it stands

The daily-driver foundation, `ProfilesV3` import, and the Home Assistant integration are built and running on real hardware — this is what's been driving my actual Stream Deck XL and Pedal for weeks now, not a demo. There's a longer tail of native rewrites for third-party plugins I used to depend on (Hue, Spotify, OBS, JetBrains, mouse controls) and less common Tier-2 action types still being ported over, tracked openly rather than hidden behind a vague "done" label.

It replaced the official app on my machine because it had to earn that by being more reliable, not just lighter. Open sourcing it is next — not as a finished product, but as a working, native alternative for anyone else tired of running a browser engine to *light up thirty-two buttons*.
