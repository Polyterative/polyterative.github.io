---
title: "Giving AI Agents Eyes and Hands in Creative Tools"
description: "My AI assistant could read my code but not my canvas. MCP servers for Figma and Blender changed that. Here's what it was like to use them on real work."
date: "2026-03-05"
tags: ["MCP", "AI", "Figma", "Blender", "Claude", "Creative Coding", "Tooling"]
---

A lot of my work happens outside code. I design in Figma and model in Blender. For a long time my AI assistant could help with everything in my editor and nothing on my canvas. I'd describe a component in words, it would write code, and then I'd rebuild the result in Figma by hand. I was basically narrating a visual tool to something that couldn't see it.

**Model Context Protocol** (MCP) is what changed that. It's a standard way to connect an assistant to outside tools, so it can read from them, write to them and, in some cases, drive them directly. I tried it in the two creative tools I use most.

## Figma: asking the design system questions

The Figma Console MCP server connects Claude, or any assistant that speaks MCP, straight to Figma. With it running, the assistant can:

- read the design system: variables, components, styles and tokens
- inspect specific frames or components and their properties
- create frames and components on the canvas
- create, update, rename and delete design tokens
- capture console output from plugins for debugging

The way I work changed straight away. I don't describe a component and then translate the code back into Figma anymore. I ask the assistant to inspect a component, find where it drifts from the design system, and fix it in Figma. The design system is now something I can ask questions about in the same conversation where I'm writing the implementation.

Setup is a small config block with your Figma access token:

```json
{
  "mcpServers": {
    "figma-console": {
      "command": "npx",
      "args": ["-y", "figma-console-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_token_here",
        "ENABLE_MCP_APPS": "true"
      }
    }
  }
}
```

One tip: use the local mode. The read-only remote mode gives you 16 inspection tools, while local gives you 56+, including creating and editing. For anything past a quick question, local is the one you want.

## Blender: modelling by conversation

Blender was a different problem. It doesn't have a tidy external API like Figma. It's a 3D environment you script in Python from the inside. A Blender MCP server opens that up: the agent can run Python inside Blender, inspect the scene, create and change geometry, adjust materials and render settings, and start renders. It treats the scene the way it treats a codebase. It reads the structure, makes targeted changes and goes round again.

In March I needed to model and render an object I was planning to make physically. I'm not a fast modeller, so by hand that would have taken me several hours. Instead I described the shape, the agent wrote and ran the Blender script, I looked at the result, and we went back and forth. It took about 45 minutes, and I came away with renders I could use as references for the physical design.

The moment that stayed with me was small. A test render came out too clean, and the agent adjusted the volumetric settings until the fog and atmosphere looked right. It was looking at a picture and changing the scene based on what it saw. I hadn't been able to work with an assistant that way before.

## What changed

In both tools the same thing happened. The assistant stopped being something I talk to in another window and started working in the same place I do. Before MCP it couldn't see a Figma file or a Blender scene at all. Now it can, and I don't have to describe everything to it anymore.

It's still early. The Figma server is solid, and I use it all the time. The Blender setup takes more work, and the loop is slower: run a script, wait for a render, look, adjust. It works, but it doesn't flow the way coding with an assistant does.

I still want it everywhere. Every creative tool I use regularly is one I'd like an agent to be able to reach into, and for the ones that don't have an MCP server yet, someone will build one eventually.

On a related note, [Three Small Tools for Living with Local AI](/blog/local-ai-toolkit-tagger-renamer-guard) is about building around local models instead of talking to them in a chat window, and [thear](/blog/sonifying-ai-work-thear) gives an assistant a way to make sound.
