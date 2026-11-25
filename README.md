# Papersmith of the Crinkled Kingdom

A top-down paper puzzle-adventure for the browser. Learn new folds by folding them, pack and order your satchel, work through the Paper Woods level by level, adapt to a boss Commander that counters your favorite crafts, and defeat the Moth Queen.

## Status: Restarting the Vertical Slice (2026-11-25)

The first G2/G3 checkpoint build was removed because it did not match the owner's vision (see `logs/2026-11-25-checkpoint-removed.md`). The vertical slice is being rebuilt in **Phaser + TypeScript** from the approved design brief:

- Brief (revision 3, approved): `agent-team/design/2026-11-25-vertical-slice-brief.md`
- Asset list: `agent-team/design/2026-11-25-vertical-slice-brief-assets.md`
- Handoff to Tech Lead: `agent-team/handoffs/2026-11-25-design-to-tech-lead.md`
- Tracking: [GitHub project board](https://github.com/users/JoshitaReddy/projects/1) and milestone *G2/G3 — Stage 1 vertical slice* (due 2026-11-28)

**There is no runnable build yet.** Run and test instructions will be added here when the Phaser project lands.

## Planned Controls

- WASD or arrow keys: move
- Space or E: the action shown on screen (open workbench, launch boat, hop, take, use the selected fold)
- X: attack with the ruler
- Tab: switch folds, in the order you packed them
- Mouse (packing and folding screens only): drag folds into the satchel, reorder them, and fold paper; arrows + Space also work there

## Commander Endpoint Safety

The boss Commander can call a deployed Gemini endpoint configured through `VITE_COMMANDER_ENDPOINT` (see `.env.example`). Do not put a Gemini key in a `VITE_*` variable: Vite variables are shipped to the browser; credentials belong behind the server endpoint.

## Repository Map

- `Game Design Document.md`: living design; dated changes since G1 at the top
- `CONFIGURATION.md`: Commander and production-agent configuration
- `PROJECT_PLAN.md`: gate dates, tasks, and dated status updates
- `agents/commander/`: the in-game Commander's prompt, schema, taunts, and manifest
- `agent-team/`: production roles (Tech Lead, QA, Art / Design Lead, Producer / PM), design briefs, handoffs, and the post-commit sync log
- `tests/`: QA evidence; the existing suites targeted the removed build and are kept as history
- `logs/`: decision logs and session logs

## Workflow

Tech work happens on `tech/<task>` branches, design on `design/<task>`, production tracking on `production/<task>`. Nobody pushes or merges to `main` directly; the project owner approves design, scope, gates, and merges. After every commit, the Producer / PM updates the board and all affected documentation (`agent-team/agents/pm.md`).
