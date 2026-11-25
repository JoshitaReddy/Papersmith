# Design Brief: Vertical Slice — The Workshop + The Paper Woods World

- **Status:** Approved for Tech (revision 3). Owner approved 2026-11-25: "Approve Revision 3 as of now, if it doesn't work, I'll see." The owner may revisit any part after playtesting.
- **Author role:** Art / Design Lead
- **Branch:** `design/vertical-slice-plan`
- **Date:** 2026-11-25
- **Tracks:** GitHub milestone *G2/G3 — Stage 1 vertical slice* (issues #1–#15), board https://github.com/users/JoshitaReddy/projects/1
- **Asset list:** [`2026-11-25-vertical-slice-brief-assets.md`](2026-11-25-vertical-slice-brief-assets.md)

## Revision Log

| Rev | Date | Change |
| --- | --- | --- |
| 1 | 2026-11-25 | First draft: single-map Stage 1, Threadbare interaction patterns. |
| 2 | 2026-11-25 | Owner answers: fewer controls; Mario-style world map; folds learned by folding; taunts on; Nov 28 kept; Codex and Gemini. |
| 3 | 2026-11-25 | **Approved by the owner** with D12 (keyboard alternative) included. Owner answers: **Phaser approved**; drop the old crossing/fight/crossing/boss "beat" template for progressive levels; **X = attack**, **Tab = switch fold**; player sets the satchel order before each level; each level split into **mini-levels with checkpoints**; folds learned by **drag and drop**; GDD changes recorded **only** as entries under "Changes Since G1". |

## 1. Problem and Evidence

| Evidence | What it tells us |
| --- | --- |
| Owner, 2026-11-25: "Too many unknown controls, cognitive overload." | Few controls, taught one at a time. |
| Owner, 2026-11-25: "The original game didn't have level complexity." / "The beats were bad in the original version." | Replace the single map built on a fixed crossing → fight → crossing → boss template with levels that build on each other. |
| Owner, 2026-11-25: Mario-style progression with intermediate levels; "levels should have mini levels like checkpoints." | A world map of levels, each split into short mini-levels with a checkpoint between them. |
| Owner, 2026-11-25: "Unlock new folds by actually folding sheets"; "I want drag & drop." | New folds are learned by dragging the paper along its creases. |
| Owner, 2026-11-25: "Player can decide order of folds before each level in satchel for Tab to [cycle] through." | A packing screen before each level where the player orders the satchel. |
| QA-04 / QA-05 (`tests/QA_REPORT_G2G3.md`) | No WebGL dependency; direct, simple controls. |
| GDD "Largest Uncertainties" #1 | Players may read the Commander's adaptation as random. |

## 2. What We Take From Threadbare (Reference Only)

Source studied: https://github.com/endlessm/threadbare (Endless Access; Godot 4; code MPL-2.0, original assets CC-BY-SA 4.0). Areas read: `interact_area`, `input_hud`, `input_hints`, `lore_quests/quest_001`, `checkpoint`, `sign`, `hint`, `player_mode.gd`.

| Threadbare pattern | Papersmith adaptation |
| --- | --- |
| Each interactable declares its own verb; an indicator marks the one being faced. | Every interactable names its verb (*Fold*, *Launch Boat*, *Hop*, *Take*); an amber caret marks the one target. |
| The input HUD shows only actions available now; hidden in menus and transitions. | At most 3 key hints, only for taught and usable controls. |
| Abilities introduced one at a time. | One new fold per level, learned hands-on. |
| Checkpoints are level props. | A checkpoint workbench between mini-levels. |

**Must not copy:** no Threadbare code, art, audio, characters, story, dialogue, level or UI layouts, or shaders.

## 3. Engine (Decided)

**Phaser with TypeScript and Vite** (owner decision 2026-11-25). Phaser supplies tilemaps, scenes (world map, mini-levels, packing, folding), camera, collisions, animation, and pointer drag; its automatic Canvas fallback addresses QA-04. Levels are authored as text grids in code so agents can write and review them in diffs.

## 4. Controls

| Input | Does | Taught in |
| --- | --- | --- |
| **Arrows / WASD** | Move. | Workshop |
| **Space** (E also works) | The action shown on screen: open workbench, launch boat, hop a gap, take an item, or use the selected fold when nothing else is in reach. | Workshop |
| **X** | Attack with the ruler. | 1-1, first Mothling |
| **Tab** | Switch to the next fold in your satchel, in the order you packed them. | 1-1, once you carry two folds |
| **Mouse drag** | Only on the packing and folding screens: drag folds into the satchel, reorder them, and fold paper. | Workshop workbench |

- Removed from earlier schemes: Z, Q, number keys, Enter.
- Crafts that fit the terrain are offered automatically (at water: **Space Launch Boat**; at a gap: **Space Hop**), whichever slot they are in. Tab matters for combat choices such as the Fan.
- No more than 3 key hints on screen, only for controls already taught.
- **Adding another input requires an owner decision.**

## 5. Structure: Progressive Levels Made of Mini-Levels

The Paper Woods is a walkable world map of levels. Each level is three short **mini-levels**, separated by checkpoint workbenches, like a mid-level checkpoint flag. Each level teaches one idea and builds it up across its mini-levels:

- **a — Introduce:** the new fold or pest appears in a safe space.
- **b — Develop:** the same idea with more pressure or a new layout.
- **c — Twist:** it combines with something learned earlier, or the layout turns it around.

Levels also escalate as a set: each one keeps everything before it and adds one idea, so 1-3 is visibly harder than 1-1.

```
 Workshop ──▶ 1-1 Frog Hollow ──▶ 1-2 The Thicket ──▶ 1-3 The Long Crease ──▶ 1-4 Moth Queen's Bower
 learn Boat     learn Frog            learn Fan              combine everything        learn Dart (drop)
```

| Level | a — Introduce | b — Develop | c — Twist | Commander |
| --- | --- | --- | --- | --- |
| **Workshop** | Fold your first Paper Boat at the bench (drag-and-drop tutorial). | Cross a calm river. | — (two mini-levels only) | Off |
| **1-1 Frog Hollow** | Find the Frog diagram, fold it, hop small gaps; no danger. | Hops onto ledges; first Mothlings teach **X**. | Gaps and a river side by side: carry Boat and Frog, **Tab** taught. | Off (scripted) |
| **1-2 The Thicket** | Find the Fan diagram, fold it; Soot Motes appear on dry land. | Motes over water while you boat; the Fan helps, X also works. | First adaptive wave; **optional Frog-only ledge with clue 1**. | **On** |
| **1-3 The Long Crease** | Long chained crossings, river into chasm. | Adaptive waves at the crossings. | Two slots, three useful folds: your packing order decides the run. | **On** |
| **1-4 Moth Queen's Bower** | Approach and final packing at the bench. | Boss phase 1: Swarm and Dive. | Boss phase 2 below half health: Dust Cloud added. Beating her drops the Dart diagram. | **On** (boss moves) |

- **Checkpoints:** reaching a checkpoint workbench saves progress, refills hearts, and lets you repack and reorder. Dying sends you back to the start of the current mini-level, never the whole level. In 1-4 the checkpoint between phases means losing phase 2 doesn't replay phase 1.
- **Replay:** completed levels stay open on the map to collect missed sheets or the clue.
- The Fan is never required: 1-1 through 1-3 can all be finished without it (GDD invariant).
- **Commander memory** spans 1-2 to 1-4 and resets at the next region, consistent with the GDD's per-stage reset.

## 6. Packing the Satchel Before Each Level

Entering a level from the map opens the **packing screen** at its first workbench:

- A shelf of learned folds on the left, satchel slots on the right (2 in the Woods).
- **Drag** a fold onto a slot to fold and pack it (spends its sheet cost). **Drag** packed folds between slots to set the order. **Drag** a fold off the satchel to unpack it.
- **Tab** in the level cycles through the satchel in exactly this order. The first slot starts selected.
- The same screen opens at every checkpoint workbench, so the player can reorder between mini-levels.
- Patching (1 sheet restores half durability) is a drag of a sheet onto a packed fold.

## 7. Learning a Fold by Drag and Drop

1. **Find the diagram.** Each teaching level hides a fold diagram page in mini-level *a*, on the main path, after a small challenge.
2. **Fold it at the workbench.** With the diagram and 1 sheet, the folding screen shows a square sheet:
   - The part to fold has a glowing grab handle (a corner or an edge).
   - The crease is a dashed line, and a faint ghost outline shows where the paper should land.
   - **Drag the handle across the crease to the ghost and let go.** Close enough: the crease snaps with a sound and the fold animates. Too far off: the paper springs back; no sheet is lost.
   - Boat 4 folds, Frog 5, Fan 3 (accordion drags back and forth), Dart 4. Step dots show progress.
3. On the last fold the craft "poofs" into the satchel and the fold is **learned for good**. After that it is packed by a single drag on the packing screen.

The crease sequences are fixed, not procedural, so the GDD's exclusion of procedural folding still holds.

## 8. Intended Player Experience

- **No overload:** never more than one new idea at a time; the Workshop uses only Move, Space, and the mouse at the bench.
- **Hands-on craft:** folding is something the player does, not a menu unlock.
- **Short, fair retries:** mini-levels are about 1 minute each, and a checkpoint is never more than one mini-level away.
- **The Commander is legible:** every counter shows three ways: a taunt naming the craft, the craft's icon on the pests sent for it, and the satchel slot tearing when nibbled. **Taunts on by default** (T toggles them in settings).

## 9. Visual Direction

| Token | Hex | Use |
| --- | --- | --- |
| parchment | `#EFE4C8` | Ground, panels |
| parchment-dark | `#DCCB9F` | Shadows, ledge faces |
| ink | `#2B2622` | Line work, enemies, text |
| ink-grey | `#77706A` | Secondary text, craft shading |
| amber | `#E2A03A` | Safety and focus only: workbench glow, target caret, selected slot, grab handles, checkpoint reached, current map node, weak point |
| water-wash | `#CFD5CF` | Water |
| reserved-green | `#6B8F4E` | **Hidden ending only; must not appear in the slice** |

**Shape language** (readable in greyscale): safe = rounded and amber-lit; hazard = jagged and densely hatched; interactable = paper-white with a fold line, plus an amber caret when targeted; enemies = dark ink silhouettes with white eyes, each with a distinct outline; crafts = clean white origami.

**Camera:** top-down three-quarter view, 32 px tiles, about 30 × 20 tiles visible at 960 × 640, scaled to fit. Mini-levels are about 30–45 tiles wide.

## 10. HUD Spec

- **Top-left:** portrait + 5 hearts. **Top-right:** sheets *n/6*. **Bottom-centre:** satchel slots in packed order, durability bars, selected slot outlined in amber. **Above the satchel:** one context prompt. **Bottom-right:** at most 3 key hints. **Top-centre:** level and mini-level (e.g. *1-2 b*), or the boss bar.
- **Context priority:** workbench > diagram/clue > exit > launch boat > hop > use selected fold. One prompt; never one that would fail; blocked actions show the reason in grey.
- **Folding screen:** the sheet, the grab handle, the dashed crease, the ghost target, step dots. Nothing else.
- **Packing screen:** shelf, slots, sheet count, and a "Start" button (Space also starts).
- **World map:** folded-paper flag nodes; mini-level progress shown as three small dots under each node.
- **Evaluator overlay (C):** the Commander's summary and recent decisions, for playtests and grading. Off by default; not a player control.

## 11. Accessibility and Rendering Compatibility

- Playable without WebGL (Phaser Canvas fallback, tested by QA).
- Drag targets are generous (snap within about a third of the sheet width) and there is no time limit on folding.
- **Keyboard alternative for drag screens (owner approved, D12):** on the folding screen, arrow keys choose the fold direction and Space confirms each crease; on the packing screen, arrows move a highlight between shelf and slots, Space picks up and drops. These screens are menus, so this adds no new in-level controls.
- No meaning carried by colour alone; text at least 14 px at 960 × 640; Dust Cloud keeps about 3 tiles visible; nothing flashes faster than 3 Hz; audio never required.

## 12. Acceptance Criteria

| ID | Criterion | Verifier | Evidence |
| --- | --- | --- | --- |
| AC1 | In levels, the only inputs are move, Space/E, X and Tab; the mouse is used only on the packing and folding screens; never more than 3 key hints, only taught ones. | QA | Browser test + screenshots |
| AC2 | After 1-1, a first-time player can name every control they have needed, without help. | PM / owner | Playtest notes in `tests/PLAYTEST_LOG.md` |
| AC3 | Each interactable shows its verb only when in reach and faced; the caret marks the same object; the prompt never offers an action that would fail. | QA | Browser test per interactable |
| AC4 | The game renders and plays with WebGL disabled. | QA | Browser test with WebGL off |
| AC5 | Each fold is learned only by finding its diagram and completing every drag step; a missed drag springs back and never costs a sheet. | QA | Playwright drag test per fold |
| AC6 | A first-time player completes each fold in under 30 seconds. | PM / owner | Playtest timing |
| AC7 | The packing screen sets slot order by drag and drop, and Tab cycles in exactly that order. | QA | Browser test |
| AC8 | Every level has mini-levels separated by checkpoints; dying restarts the current mini-level only; checkpoints save, refill hearts, and open the packing screen. | QA | Browser test |
| AC9 | Levels unlock in order on the world map, and completed levels can be replayed. | QA | Browser test |
| AC10 | 1-1 to 1-3 can be completed without the Fan; the 1-2 clue ledge is Frog-only, and at least 2 of 3 playtesters describe it as optional. | QA + PM | Scripted run + playtest notes |
| AC11 | Every counter shows in all three channels, with taunts on by default. | Art / Design Lead | Review screenshots |
| AC12 | In a greyscale screenshot at 50% size, the player, enemies, interactables, and hazards are each identifiable. | Art / Design Lead | Greyscale screenshots |
| AC13 | Every Moth Queen Dive and Dust Cloud is telegraphed at least 0.8 s before it lands. | QA | Deterministic test |
| AC14 | Only owner-approved assets ship, each credited in `assets/CREDITS.md` with its tool (Codex or Gemini) if generated. | Art / Design Lead + QA | Asset list + credits check |
| AC15 | The folding and packing screens can each be completed with the keyboard alone (arrows + Space). | QA | Browser test without mouse |

## 13. GDD Update: Entries for "Changes Since G1" Only

Owner rule (2026-11-25): the G1 text of the GDD is **not modified**. After the owner approves this brief, the PM adds these dated bullets to the **Changes Since G1** section and changes nothing else in the GDD:

- **2026-11-25 — Engine:** The game is built with Phaser and TypeScript instead of Three.js, for built-in 2D tilemaps and levels and an automatic Canvas fallback when WebGL is unavailable.
- **2026-11-25 — Controls:** Simplified to reduce cognitive load: arrows/WASD move; Space/E does the on-screen action and uses the selected fold; X attacks with the ruler; Tab switches folds in the order the player packed them. The mouse is used only to pack and fold. Controls are taught one at a time, with at most three key hints shown.
- **2026-11-25 — Level structure:** The single-map stage with a fixed crossing, fight, crossing, boss pattern is replaced by a Mario-style world map of progressive levels (Workshop; Paper Woods 1-1 to 1-4). Each level has three mini-levels (introduce, develop, twist) separated by checkpoint workbenches; dying restarts only the current mini-level.
- **2026-11-25 — Learning folds:** Each new fold is learned by finding its diagram and folding it at a workbench by dragging the paper along its creases. Once learned, a fold is packed with one drag. Beating the Moth Queen drops the Paper Dart diagram. A simplified version of the deferred Folding Table minigame is now in scope; procedural folding remains excluded.
- **2026-11-25 — Satchel order:** Before each level and at every checkpoint, the player drags folds into the satchel and sets their order; Tab follows that order.
- **2026-11-25 — Taunts:** Boss taunts are on by default and can be turned off in settings.

## 14. Production Plan to the G2/G3 Recording (Nov 28)

Greybox first, art second, so a playable build exists at every point.

| Day | Tech Lead | Art / Design Lead | QA / PM |
| --- | --- | --- | --- |
| **Nov 25–26** | Phaser scaffold + CI (#3); movement, collisions, text-grid level loader with mini-levels and checkpoints; context prompts; Space/X/Tab; packing screen with drag and drop (#5); folding screen with drag steps; Boat + Frog (#6); Workshop and 1-1 greybox. | Write all mini-level layouts as text grids; run P0 asset prompts in Codex and Gemini. | PM opens issues for the world map, packing screen, folding screen, mini-levels and checkpoints, then updates the board. QA drafts AC1, AC3–AC5, AC7–AC8. |
| **Nov 27** | World map; 1-2 and 1-3 greybox; ruler attack + hearts (#7); Mothling + Soot Mote (#9); local Commander with validator and fallback (#11); telemetry (#13). | Owner approves P0 assets; hand them to Tech. | QA runs AC1, AC3–AC5, AC7–AC9. |
| **Nov 28** | 1-4 Moth Queen in two phases (#10); art swap; fixes. | Implementation review (AC11, AC12, AC14). | QA full pass (#14); one external playtest (#15); recording. |

**Cut line if behind** (owner approves each cut):

1. Ship greybox shapes in the final palette instead of generated art.
2. Live Gemini (#12) slips; the local Commander with validator and fallback ships.
3. The world map becomes a simple level-select list.
4. 1-3 is cut; 1-2 leads to the boss.

Never cut: the four controls, drag-and-drop folding, the packing order, and mini-level checkpoints. These are the owner's core fixes.

## 15. Out of Scope for the Slice

Stages 2–3, Shield and Umbrella, Dart glide, the seed-paper ending, per-region music, settings beyond the taunt toggle, touch controls, key remapping, villager dialogue, procedural folding.

## 16. Owner Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D1 | What the removed build got wrong | **Answered:** too many unknown controls, cognitive overload; no level complexity; the old beat template was bad. |
| D2 | Engine | **Answered:** Phaser. |
| D3 | Practice-gap beat | **Withdrawn:** replaced by mini-levels. |
| D4 | Three-channel counter feedback, taunts on | **Answered:** yes. |
| D5 | Keep Nov 28 | **Answered:** keep. |
| D6 | Image tool | **Answered:** Codex and Gemini interchangeably, one tool per asset family. |
| D7 | Controls | **Answered:** X attack, Tab switch fold in packed order (Section 4). |
| D8 | World map with progressive levels | **Answered:** yes, with mini-levels and checkpoints (Section 5). |
| D9 | How folds are learned | **Answered:** drag and drop (Section 7). |
| D10 | GDD changes | **Answered:** record only under "Changes Since G1"; do not modify G1 text (Section 13). |
| D11 | Approve this revision 3 as a whole | **Answered 2026-11-25:** approved; owner will revisit if it doesn't work in play. GDD entries added; Design-to-Tech handoff written. |
| D12 | Keyboard alternative for drag screens (Section 11) | **Answered:** yes (AC15). |
