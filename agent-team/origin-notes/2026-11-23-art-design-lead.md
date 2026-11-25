# Origin Note: Art / Design Lead

- **Date:** 2026-11-23
- **Created before first agent commit:** Yes
- **New production agent:** Art / Design Lead

## Evidence 1: Rendering Direction Reached QA Too Late

[QA-04 in the checkpoint report](../../tests/QA_REPORT_G2G3.md#qa-04---blank-screen-when-webgl-is-unavailable-closed) records the blank-screen failure when WebGL was unavailable. The initial visual implementation assumed one renderer and required a late compatibility redesign plus new browser evidence.

## Evidence 2: Interaction Direction Required a Second Late Correction

[QA-05 in the checkpoint report](../../tests/QA_REPORT_G2G3.md#qa-05---context-sensitive-and-direct-controls-closed) records the control redesign prompted by owner feedback that the original cycle-then-use flow was unnecessarily difficult. The revised direct actions and contextual prompts then required a separate implementation and review cycle.

## Why This Agent

Both incidents were player-facing design problems that crossed art, interaction, and engineering. In each case, Tech Lead implemented before a dedicated role had specified readability and compatibility acceptance criteria. The Art / Design Lead now owns that specification and hands an approved brief to Tech Lead before code begins.

## First Expected Chain

Art / Design Lead → Tech Lead → Independent QA. The owner approves the design brief and the final gate decision.
