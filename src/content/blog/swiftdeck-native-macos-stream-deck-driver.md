---
title: "SwiftDeck — Why I Rewrote the Stream Deck App From Scratch"
description: "The official Elgato app used almost a gigabyte of RAM across eight processes and got stuck whenever my monitor went to sleep. So I wrote a native macOS replacement."
date: "2026-08-08"
tags: ["SwiftDeck", "macOS", "Swift", "Stream Deck", "Tooling", "Open Source"]
---

I use a Stream Deck XL and a Stream Deck Pedal all day: dozens of hotkeys, window switching, a Home Assistant panel, and macros I don't want to think about while I'm using them. I love the hardware. The official software is why I stopped trusting it.

The first thing I noticed was the weight. The Elgato app is a Qt desktop shell around a bundled Chromium (QtWebEngine) for the interface, plus a couple of separate Node.js runtimes for plugins. On my machine, with the XL, the Pedal and two Node plugins, it used **~936 MB of RAM at idle, across 8 processes**, before I'd even opened the window. Open it and it goes past a gigabyte. The app bundle alone is 730 MB on disk. All of that, for software whose job is to notice a button press and swap a picture.

The RAM was annoying. What actually pushed me over the edge was the app breaking. More than once, after my monitor went to sleep (plain macOS display standby, nothing unusual), the app came back stuck. Keys didn't respond, images froze, and sometimes it lost control of the hardware completely until I force-quit and relaunched it. I reach for this device constantly, so "it might not work after your screen wakes up" isn't something I can live with.

So I wrote my own driver, **SwiftDeck**: a clean-room native macOS replacement. I'm getting it ready to open-source.

## What it is

SwiftDeck talks to the hardware directly over USB HID through IOKit. There's no vendor driver, no bundled runtime and no WebKit anywhere. It's a single SwiftUI process: a menu bar app with a status icon and brightness control, plus a proper window for editing profiles.

Inside, the work is split into small modules, each with one job:

- `DeckCore`: the engine. Profiles, pages, key specs and `JSON` persistence, with no I/O.
- `DeckHID`: the IOKit transport, with descriptors for the XL and the Pedal, hotplug handling, and stepping aside cleanly when the official app already has the device.
- `DeckRender`: turns an icon and a title into the 96×96 JPEG each key expects, rotated for each device.
- `DeckActions`: hotkeys through `CGEvent`, and launching apps, URLs and files.
- `DeckImport`: reads existing Elgato `ProfilesV3` profiles, so I didn't have to rebuild years of button layouts by hand.
- `DeckHomeAssistant`: a native WebSocket client that talks to Home Assistant directly, with no Node plugin in between.

On top of that there are profiles, pages, hotkeys that respect hold and release, multi-actions, a live grid editor that mirrors the physical device as you edit, local vector icon packs, and a first-run wizard that identifies your devices. It covers the parts of the official app I actually use, built natively instead of copied over wholesale.

## The two bugs that mattered

Two problems drove the rewrite more than the RAM did.

The first was getting stuck after the screen slept. When the display went to sleep, the official app would either stop registering keys or fire stale or duplicate presses on wake. In SwiftDeck I had to deal with that directly. It handles idle and Mac display sleep explicitly, fading the brightness down. The first version of that wasn't enough, so I added a guard on key input during the wake itself. Now a press that lands just as the display comes back can't be misread.

The second was profile navigation failing silently. Pressing the equivalent of "home" to get back to the default profile sometimes did nothing, or took me somewhere unexpected, with no error and no obvious cause. It turned out several separate edge cases in multi-page, multi-profile navigation were all producing the same symptom. Tracking them all down was a project in itself. Now the device goes where I tell it every time, not just most of the time.

Neither of these makes a good screenshot. But fixing them is the difference between a tool you forget is running and one you have to keep checking on.

## What "lighter" means

macOS doesn't really give any app exclusive access to a USB HID device, so SwiftDeck and the official app can run side by side. SwiftDeck notices when Elgato already has the devices and steps aside cleanly instead of fighting over them. That let me build and test against my real hardware bit by bit, handing control back and forth, without needing a second deck.

What I'm aiming for, compared with the official app: one native process idling under 50 MB of RAM, an app bundle under 20 MB, and practically zero CPU at idle, because HID input is event-driven, not polled. One process instead of eight. That's roughly the difference between a small background tool and a suite of desktop apps that keeps running even when you're not using it.

## Where it is now

The core of the daily driver is built and running on real hardware, along with `ProfilesV3` import and the Home Assistant integration. It has been driving my actual XL and Pedal for weeks, so this isn't a demo. Still to come are native versions of third-party plugins I used to rely on (Hue, Spotify, OBS, JetBrains, mouse controls) and some less common action types. I'm tracking those openly instead of calling the whole thing "done".

SwiftDeck replaced the official app on my machine because it was more reliable, not just because it was lighter. That had to come first. Open-sourcing it is next. It won't be a finished product, but it will be a working native alternative for anyone else who's tired of running a browser engine just to *light up thirty-two buttons*.
