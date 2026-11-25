# Handoff: Tech Lead to QA

- **Date:** 2026-11-23
- **From:** Tech Lead
- **To:** Independent QA
- **Gate:** G2/G3 checkpoint
- **Status:** Independent QA recommends ACCEPT after one revision cycle

## Owner Decision Carried With This Handoff

On 2026-11-23, the owner decided: **skip Asana for now and build the G2/G3 checkpoint**. Tracking setup must not delay the playable vertical slice. The live Gemini endpoint may remain configurable while the validator, two-second timeout path, logging, and scripted fallback are demonstrated locally.

## Implemented

- Three.js and TypeScript browser-game scaffold.
- Paper Woods vertical slice with Boat traversal, Frog hop, Fan gust, ruler combat, workbench, two-slot satchel, durability, checkpoint reset, optional Frog clue, opening wave, and Moth Queen.
- Summary-only Commander context, cumulative per-craft counters, validation, configurable endpoint, forced timeout, scripted fallback, and browser telemetry.
- Deterministic evaluation coverage including case 9.
- Playwright browser checks and CI workflow.

## Run and Review

```bash
npm install
npm run dev
npm test
npm run test:e2e
```

Use `http://127.0.0.1:4173/?forceTimeout=1` to demonstrate the two-second fallback. Press `T` to inspect and download local telemetry.

## QA Focus

1. Verify the critical path does not require Fan.
2. Verify Frog is the only way onto the clue ledge.
3. Verify invalid/late Commander output cannot reach the encounter director.
4. Verify evaluation case 9 retains both crafts' counter histories.
5. Verify keyboard flow and UI are readable at 1280x720 and a narrow viewport.

## Known External Gap

No deployed Gemini endpoint or credentials are available in this repository. QA should test the interface contract and fallback; live-model latency and cost remain a checkpoint measurement task after an endpoint is supplied.

## Owner Decision After QA

Independent QA initially found three GDD mismatches: deep-water Boat protection, half-durability patching, and Moth Queen weak-point recovery. The Tech Lead revised all three; QA re-ran the build and reports 14/14 unit tests and 4/4 Playwright checks passing.

QA recommendation: **accept the local G2/G3 checkpoint**. Project-owner decision remains to be recorded as **accept**, **revise**, or **cut**.
