# Papersmith of the Crinkled Kingdom

G2/G3 browser-game vertical slice for a top-down paper puzzle-adventure. Fold and pack a limited satchel, cross the Paper Woods, respond to an adaptive Commander, find the optional clue, and defeat the Moth Queen.

## Quick Start

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173`.

The game uses Three.js/WebGL when available and automatically switches to a Canvas 2D compatibility renderer when WebGL is disabled or unavailable.

## Controls

- WASD or arrow keys: move
- Space or E: nearby contextual action, such as opening a workbench or launching the Boat
- Z: strike with the ruler
- X: use the selected packed craft
- 1-3 or click: select a satchel slot
- Q, Tab, or Enter: cycle slots
- T: inspect and download telemetry
- R: return to the latest checkpoint

## Checkpoint Demonstrations

- Normal local fallback: run the game without `VITE_COMMANDER_ENDPOINT`.
- Forced two-second timeout: open `http://127.0.0.1:4173/?forceTimeout=1` and cross into the Woods.
- Live Commander: copy `.env.example` to `.env.local` and set `VITE_COMMANDER_ENDPOINT` to an HTTPS service that accepts `CommanderContext` JSON and returns one valid `CommanderAction` JSON object.

Do not put a Gemini key in a `VITE_*` variable. Vite variables are shipped to the browser; credentials belong behind the configured server endpoint.

## Verification

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright evidence is written under `tests/artifacts/`. CI runs type checking, unit tests, a production build, browser tests, and uploads browser evidence.

## Repository Map

- `src/`: Three.js game, Commander contract, validation, fallback, and telemetry
- `tests/unit/`: deterministic rules and evaluation cases
- `tests/e2e/`: independent browser checks
- `agent-team/`: coverage map, tailored Art/Design, Tech Lead, QA, and PM roles, origin notes, and handoffs
- `Game Design Document.md`: living design and dated gate changes
- `CONFIGURATION.md`: Commander and production-agent configuration
- `PROJECT_PLAN.md`: gate dates and production tasks

## Current Scope

Implemented for G2/G3: Stage 1 traversal and combat loop, three crafts plus the ruler, two minions, Moth Queen, Commander interface and fallback, telemetry, deterministic evaluation, and the Tech Lead-to-QA handoff.

Still external/manual: connect a deployed Gemini endpoint, measure live latency and cost, complete an external playtest, add the owner's final handoff decision, move this work into the course-provided final repository, and post that repository link with the recording.
