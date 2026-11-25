# Papersmith of the Crinkled Kingdom

**Initial Project Plan · Version 0.1 (G1, Nov 15, 2026).** This plan moves into Asana after G1.

## Gate dates

| Date | Milestone |
|---|---|
| Sun Nov 15 | G1 Concept recording due |
| Mon Nov 16 | G1 review |
| Thu Nov 19 | Two Braintrust replies due |
| Mon Nov 23 | Checkpoint: deployed model call, isolated session state, forced-timeout fallback |
| Sat Nov 28 | G2/G3 recording (first playable) |
| Mon Nov 30 | G2 Prototype and G3 Production review (scope locks) |
| Wed Dec 2 | Alpha |
| Fri Dec 4 | Beta |
| Sat Dec 5 | Gold recording |
| Mon Dec 7 | G4 Final / Pre-Launch review |
| Mon Dec 14 | G5 Retrospective / Closure |
| Dec 17–23 | Final presentation |

## First tasks through G2

- [x] **Nov 16–17:** repo, Three.js and TypeScript scaffold, CI running tests on every PR
- [x] **Nov 17–18:** walking and collisions; tutorial river with the boat
- [x] **Nov 18–19:** workbench and satchel (fold, pack, use, patch), durability
- [ ] **Nov 19:** two Braintrust replies
- [x] **Nov 20–21:** encounter director, Mothling and Soot Mote, scripted waves (the baseline)
- [x] **Nov 21–22:** commander interface: context builder, endpoint contract, validator, fallback, logging
- [ ] **Nov 23:** checkpoint demo complete locally; live Gemini latency and cost measurement still required
- [x] **Nov 24–25:** Moth Queen and her commander moves; Frog and Fan
- [x] **Nov 25–26:** deterministic tests: rule invariants, a valid path, invalid-action rejection, one regression
- [ ] **Nov 26–27:** external playtest, Initial Playtest Log, scope-lock plan, updated GDD and Configuration Document
- [ ] **Nov 28:** G2/G3 recording

## Status Update — Nov 25, 2026 (Restart)

The tasks checked above were completed for the first checkpoint build, which the owner removed on Nov 25 because it did not match the vision (`logs/2026-11-25-checkpoint-removed.md`). They are kept as history. Tracking moved to GitHub instead of Asana: issues, milestones, and the [project board](https://github.com/users/JoshitaReddy/projects/1).

Restart plan to the Nov 28 G2/G3 recording, from the approved brief (`agent-team/design/2026-11-25-vertical-slice-brief.md`, revision 3):

- [x] **Nov 25:** design brief approved (Phaser; Space/X/Tab controls; world map of progressive levels with mini-levels and checkpoints; drag-and-drop folding and packing); GDD "Changes Since G1" updated; Design-to-Tech handoff written
- [ ] **Nov 25–26:** Phaser scaffold and CI (#3); controls (#23); packing screen (#21); folding screen (#22); Boat and Frog (#6); Workshop and 1-1 greybox; level layouts (#24); P0 assets generated (#25)
- [ ] **Nov 27:** world map (#19); mini-levels and checkpoints (#20); 1-2 and 1-3; ruler, hearts, minions (#7, #9); local Commander with validator and fallback (#11); telemetry (#13); owner approves P0 assets
- [ ] **Nov 28:** Moth Queen, two phases (#10); art swap; QA pass (#14); external playtest (#15); recording

**Risks:** three days for a full restart. **Cut line**, each cut needing owner approval: greybox art; live Gemini (#12) slips; world map as a list; cut 1-3. **Owner decisions pending:** asset approvals (#25); move to the course repository (#16).

## AI Disclosure

Claude helped structure this plan from the course gate dates and my scope decisions. I set the priorities, task order and deadlines, and I'll track and adjust the plan in Asana after G1.
