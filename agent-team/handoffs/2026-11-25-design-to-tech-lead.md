# Handoff: Art / Design Lead → Tech Lead

- **Date:** 2026-11-25
- **From:** Art / Design Lead
- **To:** Tech Lead (then Independent QA)
- **Approval:** Project owner approved brief revision 3 on 2026-11-25, including D12 (keyboard alternative): "Approve Revision 3 as of now, if it doesn't work, I'll see."
- **Due:** Playable vertical slice for the G2/G3 recording, **2026-11-28**

## Deliverable

Build the vertical slice described in [`agent-team/design/2026-11-25-vertical-slice-brief.md`](../design/2026-11-25-vertical-slice-brief.md) (revision 3), branch `design/vertical-slice-plan`. Implement on `tech/<task>` branches; never push or merge to `main`.

**Summary of what to build:**

1. Phaser + TypeScript + Vite project, CI, and a text-grid level loader (brief §3).
2. Controls: move, Space/E context action, X ruler attack, Tab switch fold in packed order; mouse only on the packing and folding screens, with a keyboard alternative there (§4, §11).
3. World map: Workshop → 1-1 Frog Hollow → 1-2 The Thicket → 1-3 The Long Crease → 1-4 Moth Queen's Bower; unlock in order, replay allowed (§5).
4. Every level split into mini-levels (introduce, develop, twist) with checkpoint workbenches; dying restarts only the current mini-level; the boss has a checkpoint between phases (§5).
5. Packing screen: drag folds into the satchel, drag to reorder, Tab follows that order; opens at every checkpoint; patching by dragging a sheet onto a fold (§6).
6. Folding screen: fold diagrams found in levels; learn each fold by dragging flaps across creases to ghost targets; a miss springs back and costs no sheet; quick packing afterwards (§7).
7. Mothling, Soot Mote, the Moth Queen (two phases), the local Commander with validator and fallback, three-channel counter feedback with taunts on by default, and next-action telemetry (§5, §8; GDD Commander and Fair-Play sections).

## Acceptance Criteria and Verifiers

AC1–AC15 in brief §12. QA verifies AC1, AC3–AC5, AC7–AC10, AC13, AC15; PM/owner verify AC2, AC6, and the playtest half of AC10; Art / Design Lead verifies AC11, AC12, AC14.

## Assets

- Asset list: [`agent-team/design/2026-11-25-vertical-slice-brief-assets.md`](../design/2026-11-25-vertical-slice-brief-assets.md).
- **No asset is approved yet.** Build with greybox shapes in the palette tokens from brief §9 until assets reach status `approved`; then load them from `assets/generated/` and `assets/third-party/`.

## Dependencies

- Owner generates P0 images in Codex and Gemini and approves them (asset list).
- Live Gemini endpoint (#12) is not required for the slice; the local Commander with validator and fallback must ship.

## GDD Rules That Must Survive

- Paper Woods levels 1-1 to 1-3 completable without the Fan; the clue ledge in 1-2 is Frog-only and optional.
- Green appears nowhere in the slice.
- Commander fair-play rules enforced in code; the Commander sees only the summary context.
- No Threadbare code, assets, layouts, or text.
- The GDD's G1 text is unchanged; the decisions above are recorded as dated entries under "Changes Since G1".

## Exclusions

Brief §15: Stages 2–3, Shield, Umbrella, Dart glide, seed-paper ending, per-region music, extra settings, touch controls, remapping, dialogue, procedural folding.

## Cut Line (owner approves each cut)

Greybox art → Gemini live slips → world map as a list → cut 1-3. Never cut: the four controls, drag-and-drop folding (with keyboard alternative), packing order, mini-level checkpoints.

## Next

Tech Lead implements and hands a runnable build to QA with a dated `tech-lead-to-qa` note. After every commit, the committing agent requests the PM sync (`agent-team/agents/pm.md` → **After Every Commit**).
