# 2026-11-25 — G2/G3 Checkpoint Build Removed; Restarting From Scratch

**Decision by:** Project owner
**Reason:** The implemented game did not match the owner's vision for *Papersmith of the Crinkled Kingdom*, so development starts over from scratch.

## What was removed

These files were never committed to git, so they cannot be restored from version control:

- The Three.js / TypeScript game: `src/` (`game.ts`, `commander.ts`, `telemetry.ts`, `types.ts`, `main.ts`, `style.css`, `vite-env.d.ts`), `index.html`, and the built `dist/`.
- Build and test tooling: `package.json`, `package-lock.json`, `node_modules/`, `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `tsconfig*.json`, `*.tsbuildinfo`.
- An earlier experimental `base-game/` (plain JS / Canvas 2D build of Stage 0 + Stage 1), deleted by the owner on 2026-11-23 for the same reason.

## What was kept

- The GDD, Configuration Document, Project Plan, README, Deck, and `assets/`.
- `agent-team/` (roles, handoffs, revisions) and the in-game Commander definition in `agents/commander/` (prompt, schema, taunts, manifest).
- `tests/`, including `tests/QA_REPORT_G2G3.md`, kept as historical QA evidence. The unit and e2e suites test the removed code and won't run until a new build exists.
- `.github/workflows/ci.yml`. It will fail until a new `package.json` and build exist.

## Effect on the checkpoint

The pending G2/G3 gate decision (accept / revise / cut) is replaced by this restart. QA's earlier **accept** recommendation applied to the removed build and doesn't carry over to the new one.
