# Independent QA Report - G2/G3 Checkpoint

- **Initial review:** 2026-11-23
- **Revision review:** 2026-11-23
- **Reviewer:** Independent QA agent
- **Input:** `agent-team/handoffs/2026-11-23-tech-lead-to-qa.md`
- **Branch reviewed:** `tech/g2g3-checkpoint`
- **Environment:** macOS arm64, Node 26.11.1, Chromium 159 via Playwright 1.65.1
- **Final recommendation:** **ACCEPT the local G2/G3 checkpoint**

## Final Verification

| Command | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; one non-blocking main-bundle size warning (576 kB) |
| `npm test` | Pass: **14/14** across 3 files |
| `npm run test:e2e` | Pass: **8/8** across 2 files |

## Revision Closure

### QA-01 - Deep-water Boat protection and spawn safety: Closed

- Director-side state remains outside the Commander summary and supplies water state, usable crafts, and distances to fixed spawn points.
- The validator rejects targeting the only usable Boat over deep water.
- The validator rejects spawn points closer than four tiles.
- Scripted fallback sanitization removes an unsafe Boat target and selects an available safe spawn.
- Evidence: `tests/unit/qa-gdd-regressions.test.ts`.

### QA-02 - Patching amount: Closed by source inspection

- Existing crafts now gain half their maximum durability, capped at maximum: `Math.min(maximum, existing.durability + maximum / 2)`.

### QA-03 - Moth Queen weak-point counterplay: Closed by source inspection and build

- The ruler cannot damage the Queen until Dive grounds her.
- A grounded hit resets boss energy to zero, clears grounded state, and starts a two-turn recovery.
- Boss decisions pause while the two recovery turns count down.

### QA-04 - Blank screen when WebGL is unavailable: Closed

- QA denies `webgl`, `webgl2`, and `experimental-webgl` contexts before startup while leaving Canvas 2D available.
- The compatibility canvas remains visible, the HUD and workbench remain interactive, and the status message identifies compatibility mode.
- When QA denies every canvas context, the page presents a visible `role="alert"` with the renderer failure and recovery guidance instead of remaining blank.
- Evidence: the two focused regressions in `tests/e2e/qa-regressions.spec.ts`.

### QA-05 - Context-sensitive and direct controls: Closed

- The nearby prompt shows Space/E for the workbench and opens it with Space.
- At the river, the same prompt changes to Launch Paper Boat; E selects and launches the packed Boat even while the ruler was selected.
- Number keys 1-3 directly select ruler, first craft, and second craft after the Frog is folded.
- HUD slots are buttons with `aria-pressed` state and respond to clicks.
- Tab and Q cycle across all three slots in order.
- Z strikes with the ruler while the Boat remains selected; X uses the selected craft.
- The original core-loop checks continue to pass with legacy Enter/X selection and use.
- Evidence: the two control regressions in `tests/e2e/qa-regressions.spec.ts` plus `tests/e2e/core-loop.spec.ts`.

## Browser Evidence

- `tests/artifacts/workbench.png` - keyboard-opened workbench with Boat, Frog, Fan, sheets, and Stage 1 slot rule.
- `tests/artifacts/stage1-start.png` - 1280x720 game view, objective, HUD, river, workbenches, and controls.
- `tests/artifacts/forced-timeout-fallback.png` - visible scripted fallback after the forced two-second timeout.
- `tests/artifacts/canvas-fallback.png` - playable workbench rendered with WebGL deliberately unavailable.

The browser suite additionally verifies that HUD panels remain within the recorded viewport and that the tested walking-only route does not collect the Frog-gated clue.

## Verified Rule Coverage

- TypeScript build and production bundle.
- Workbench interaction and initial satchel display.
- Ruler always present in the HUD.
- Boat launch and deep-water gate in the core browser path.
- Forced timeout returns to a visible, playable scripted fallback.
- Wave budget, mercy cap, energy affordability, warning requirement, variety cap, and boss fallback.
- Cumulative per-craft counter history for two-craft alternation.
- Evaluation case 5 and director-side spawn-distance safety.
- Fallback safety sanitization.
- Recorded-viewport HUD containment and a walking-only negative clue route.
- Canvas 2D compatibility rendering with WebGL disabled and visible startup failure when all contexts are unavailable.
- Contextual Space/E prompts, direct Z/X actions, slots 1-3, mouse selection, Q/Tab cycling, and legacy Enter/X compatibility.

## Remaining Non-Blocking Gate Work

These were already identified as external/manual and do not invalidate the local checkpoint:

- Connect a deployed Gemini endpoint and measure real latency and session cost.
- Run the external player playtest and complete `tests/PLAYTEST_LOG.md`.
- Record the project owner's explicit **accept**, **revise**, or **cut** decision in the handoff.
- Move/push the checkpoint to the course-provided final repository before the deadline.

Additional browser coverage for a complete Moth Queen victory, Boat-break recovery, zero-heart recovery, Frog-positive clue collection, and telemetry download would strengthen the gate evidence but is not required to accept this vertical-slice checkpoint.

## Owner Decision Requested

QA recommends **accept** for the local G2/G3 checkpoint. The owner should record that decision in the handoff after reviewing this report.
