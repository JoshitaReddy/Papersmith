# Living Agent Handoff

- **Last updated:** 2026-11-23
- **Gate:** G2/G3 checkpoint
- **Working branch:** `tech/g2g3-checkpoint`
- **Current owner decision:** Build the local G2/G3 checkpoint; defer Asana.
- **Gate decision:** 2026-11-25 — owner removed the checkpoint build (did not match the vision); restarting from scratch. See Owner Decision Log.

This is the current-status document for the production-agent chain. Detailed, dated handoffs remain in `agent-team/handoffs/`; QA evidence remains in `tests/`. The project owner is the only person who can approve a design direction, change scope, accept a gate, or authorize a merge.

## Current Chain

| From | To | State | Authoritative evidence | Next action |
| --- | --- | --- | --- | --- |
| Art / Design Lead | Tech Lead | **Approved for Tech** (revision 3, owner approved 2026-11-25) | `agent-team/handoffs/2026-11-25-design-to-tech-lead.md` → brief and asset list (branch `design/vertical-slice-plan`) | Tech Lead builds the Phaser vertical slice on `tech/<task>` branches by 2026-11-28, greybox until assets are owner-approved; then hands to QA. |
| Tech Lead | Independent QA | **Complete** | `agent-team/handoffs/2026-11-23-tech-lead-to-qa.md` | No further implementation work unless the owner requests revision or an approved design brief arrives. |
| Independent QA | Project Owner | **ACCEPT recommended** | `tests/QA_REPORT_G2G3.md` | Owner records **accept**, **revise**, or **cut** below. |
| Producer / PM | Project Owner | **Status ready** | This document and `PROJECT_PLAN.md` | Present missing evidence, deadlines, and the pending gate decision without inferring it. |

## Design Status

The Art / Design Lead exists because two player-facing problems recurred: the blank WebGL screen and unnecessarily difficult controls. The evidence and role origin are recorded in `agent-team/origin-notes/2026-11-23-art-design-lead.md`.

**2026-11-25:** Draft brief `agent-team/design/2026-11-25-vertical-slice-brief.md` (vertical slice, Threadbare interaction patterns as reference only) and asset list `agent-team/design/2026-11-25-vertical-slice-brief-assets.md` are **Draft - awaiting owner decision**. Revision 3 applies the owner's answers: Phaser; Space/X/Tab controls (X attack, Tab switches folds in packed order); Mario-style world map of progressive levels, each split into mini-levels with checkpoint workbenches; satchel packed and ordered by drag and drop before each level; folds learned by drag and drop; GDD changes recorded only under "Changes Since G1". AC1–AC15 name their verifiers. **Owner approved revision 3 on 2026-11-25, including D12 (keyboard alternative); status: Approved for Tech.** Design-to-Tech handoff: `agent-team/handoffs/2026-11-25-design-to-tech-lead.md`.

Earlier status (kept for history): before 2026-11-25 no Art / Design brief was owner-approved. At that time:

- no design direction is ready for Tech Lead implementation;
- no Design-to-Tech handoff should be created yet;
- Threadbare remains a reference for direct actions and contextual prompts only, never a source for copied assets, layouts, dialogue, characters, or code;
- the existing direct-control scheme and GDD invariants remain authoritative until the owner approves a new brief.

When a design brief is created, record its path, branch, status, acceptance criteria, named verifier, and required evidence here. Use exactly one of these states: **Draft - awaiting owner decision**, **Approved for Tech**, **In implementation**, **Ready for QA**, **QA revise**, or **Owner accepted**.

## Implemented Checkpoint

The Tech Lead delivered the Paper Woods vertical slice, Commander interface and fallback, telemetry, evaluation coverage including case 9, browser compatibility fallback, and the revised direct controls. The dated Tech-to-QA handoff contains run instructions and affected GDD rules.

Independent QA found three initial GDD mismatches. Tech Lead revised deep-water Boat protection, half-durability patching, and Moth Queen weak-point recovery. QA then reported:

- `npm run typecheck`: pass;
- `npm run build`: pass, with one non-blocking bundle-size warning;
- `npm test`: 14/14 pass;
- `npm run test:e2e`: 8/8 pass.

## Open Decisions and External Work

- [ ] Owner records the local G2/G3 decision: **accept**, **revise**, or **cut**.
- [ ] Connect a deployed Gemini endpoint and measure live latency and session cost.
- [ ] Run an external-player playtest and complete `tests/PLAYTEST_LOG.md`.
- [ ] Move or push the checkpoint to the course-provided final repository.
- [ ] Run the course team initialization in that repository and read its template README.
- [ ] Post the final-repository link with the G2/G3 recording.
- [ ] Set up the tracker later; Asana is intentionally deferred and must not block the checkpoint.

## Owner Decision Log

| Date | Decision | Effect on handoff |
| --- | --- | --- |
| 2026-11-23 | Skip Asana for now and build the G2/G3 checkpoint. | Tech proceeded with the local playable checkpoint; tracker work remains external. |
| Pending | Accept, revise, or cut the local G2/G3 checkpoint. | QA recommends **accept**; no final owner decision has been inferred. |
| 2026-11-25 | Remove the G2/G3 checkpoint build: it did not match the owner's vision. Start the game from scratch. | Game code, build, and tooling deleted (never committed, so not recoverable). Docs, `agent-team/`, `agents/commander/`, and `tests/` (historical QA evidence) were kept. The earlier QA **accept** doesn't apply to the new build. See `logs/2026-11-25-checkpoint-removed.md`. |
| 2026-11-25 | Use GitHub for tracking instead of Asana/Notion. | Issues #1–#18 created at `JoshitaReddy/Papersmith`, with `area:*`, `owner-decision`, `commander` and stage labels, and milestones **G2/G3 — Stage 1 vertical slice** (due 2026-11-28) and **Gold — final build** (due 2026-12-05). Board: https://github.com/users/JoshitaReddy/projects/1 (Todo → Needs owner decision → In Progress → In Review (QA) → Done). Start with #1 (restart vision and stack). |
| 2026-11-25 | Art / Design Lead must produce an asset list with image-generation prompts, and use cited open-source assets where suitable. | Role file and `SKILL.md` updated. Asset lists go under `agent-team/design/`; open-source assets in `assets/third-party/` with license files; generated images in `assets/generated/`; all credits in `assets/CREDITS.md`. Owner approves every asset. |
| 2026-11-25 | Answers to the design brief: "Too many unknown controls, cognitive overload." "The original game didn't have level complexity." Wants "level update to be like Mario with intermediate levels where you unlock new folds by actually folding sheets." Taunts on; keep Nov 28; images in Codex and Gemini interchangeably. | Brief revised to revision 2. Engine (D2) and D7–D10 still open. |
| 2026-11-25 | "PM lead should after every commit ensure that the kanban board is updated & all documentation is updated." | `agent-team/agents/pm.md` gains **After Every Commit**; `AGENTS.md` requires every committing agent to request the sync; syncs are logged in `agent-team/production/sync-log.md`. |
| 2026-11-25 | "The beats were bad in the original version. Levels should progressively go with Phaser." "X is attack right? Maybe to switch folds press Tab & player can decide order of folds before each level in satchel for Tab to [cycle] through, levels should have mini levels like checkpoints." "D9 - I want drag & drop." "GDD just mention in changes after G1, don't modify text in G1." | Engine: Phaser. Brief revised to revision 3. PM's GDD permission limited to adding dated bullets under "Changes Since G1". |
| 2026-11-25 | "Approve Revision 3 as of now, if it doesn't work, I'll see. D12 yes." | Brief revision 3 is **Approved for Tech**; keyboard alternative for drag screens added (AC15). PM added 8 dated entries to the GDD's "Changes Since G1" (no G1 text changed). Design-to-Tech handoff written. Owner may revisit after playtesting. |

## Maintenance Rules

Update this document whenever responsibility or approval state changes:

1. The sending agent writes a dated detailed note in `agent-team/handoffs/` using `YYYY-MM-DD-<from>-to-<to>.md`.
2. The sender, or Producer / PM acting from completed evidence, updates the matching row in **Current Chain** and links the detailed note.
3. Art / Design labels every unapproved brief **Draft - awaiting owner decision** and never marks its own work approved.
4. Tech records the branch or commit, runnable command, tests, affected GDD rules, and known gaps.
5. QA writes its independent evidence only under `tests/`; the next permitted actor links that report here without changing QA's conclusion.
6. The owner records design, scope, gate, and merge decisions in **Owner Decision Log**.
7. Do not replace history. Add a new dated handoff or decision and update the current-state summary.
