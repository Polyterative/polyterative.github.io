---
title: "Giving AI Agents Eyes and Hands in Creative Tools"
description: "MCP bridges let AI assistants operate Figma, Blender, and other creative software directly. Here's what that actually enables."
date: "2026-03-05"
tags: ["MCP", "AI", "Figma", "Blender", "Claude", "Creative Coding", "Tooling"]
---

There's a gap between "AI assistant that can write code" and "AI assistant that can participate in your actual workflow." For a developer who spends significant time in creative tools — Figma for design, Blender for 3D — that gap has been frustrating. The assistant can see code. It can't see the canvas.

Model Context Protocol (MCP) is closing that gap. It's a standard that lets AI assistants connect to external tools and services — giving them the ability to read from, write to, and in some cases directly operate software that isn't text.

## Figma MCP

The Figma Console MCP server connects Claude (and other MCP-capable assistants) directly to Figma. When it's running, the assistant can:

- Read the design system — variables, components, styles, tokens
- Inspect specific frames or components with their properties
- Create frames and components directly in the canvas
- Manage design tokens (create, update, rename, delete)
- Capture console output from plugins for debugging

The practical effect is significant. Instead of describing a component and having the assistant generate code that I then manually translate into Figma, I can ask the assistant to inspect an existing component, identify inconsistencies with the design system, and make corrections — in Figma, directly. The design system becomes queryable in the same conversation where I'm working on implementation.

The setup is straightforward — an MCP server config pointing to the Figma API with an access token:

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

The difference between the read-only remote mode and the full local mode is substantial: read-only gives you 16 tools for inspection; local gives you 56+ including creation and modification. For anything beyond quick queries, you want the local setup.

## Blender MCP

Blender is a different challenge. Where Figma has a well-structured API, Blender is a Python-scriptable 3D environment — powerful but historically not accessible from outside the application. MCP changes this.

With a Blender MCP server running, an AI agent can execute Python scripts inside Blender, inspect the scene graph, create and modify geometry, adjust materials and rendering settings, and trigger renders. The agent works on the 3D scene the way it works on a codebase — reading structure, making targeted changes, iterating.

I used this in March for a project where I needed to model and render a physical object I was planning to fabricate. The workflow: describe the geometry to the agent, have it generate and execute the Blender Python script, inspect the result, iterate. What would have taken me several hours of manual Blender work — I'm not a fast modeler — became a back-and-forth over about 45 minutes. The renders came out as reference images I could work from for the physical design.

The fog and atmospheric rendering in the screenshots from that session came from having the agent adjust the volumetric settings after seeing a test render that looked too clean — a feedback loop between description and visual result that feels genuinely new.

## The pattern

Both of these tools follow the same pattern: the AI assistant stops being something you talk to in a separate window and becomes something that operates in the same environment you're working in.

This matters more as the tools get more complex. A senior developer can hold a Blender scene or a Figma design system in their head to some degree. The AI assistant, without MCP, can't see any of it — you're narrating a visual environment to something that has no visual channel into it. MCP creates the visual channel.

The honest constraint: these integrations are still early. The Figma MCP is production-quality and I use it regularly. The Blender integration requires more setup and the feedback loop is slower — executing a Python script, waiting for a render, assessing the result, iterating. It works, but it's not yet as fluid as working with code.

The direction is clear though. Every creative tool I use regularly is one that I'd like an AI agent to be able to reach into. The ones that don't have MCP integrations yet are just waiting for someone to build them.

The tools that stay text-only are the ones that get left behind.

Related: [Three Small Tools for Living with Local AI](/blog/local-ai-toolkit-tagger-renamer-guard) covers a different angle on the same theme — building the plumbing around local models rather than reaching them through a chat window. And [thear](/blog/sonifying-ai-work-thear) is a small example of what happens when you give an AI assistant a non-text output channel.
