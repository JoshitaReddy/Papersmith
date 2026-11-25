# Papersmith of the Crinkled Kingdom

**Living Configuration Document · Version 0.2 (G2/G3 checkpoint, Nov 23, 2026)**

This document describes the in-game agent (the commander) and the agent team that builds the game.

## Changes Since G1 - November 23, 2026

- Implemented the summary-only Commander context, validator, two-second timeout interface, scripted wave and boss fallback, and browser telemetry.
- Added cumulative counter counts per craft and evaluation case 9 for two-craft alternation.
- Added the manifest, prompt, JSON schema, taunt list, deterministic tests, Playwright checks, and CI workflow.
- Added an evidence-based Art / Design Lead after the WebGL blank-screen and control-clarity revisions; its first intended chain is Art / Design Lead to Tech Lead to independent QA.
- Added an evidence-based Producer / PM to maintain milestones, risks, weekly PPP, evidence links, and the living handoff without making owner decisions.
- Live Gemini deployment, latency/cost measurement, and live-model trials remain open; the playable checkpoint uses the scripted fallback when no endpoint is configured.

> **Status labels:** **[Implemented]** exists in the playable build. **[Verified]** has automated evidence. **[Open]** still needs external input or measurement.

---

## 1. In-game agent: the Commander [Implemented]

**Purpose:** choose each minion wave and each boss move for the current region's boss (Moth Queen, the Heap, Smog Mother), pushing the player to try different crafts while keeping every fight fair and winnable.

**Shipped as:** a function-calling interface. The game calls `chooseAction(context)`, which returns one JSON choice. A common manifest lives at `agents/commander/manifest.json` and points to the prompt and schema files.

**Available tools (actions):** the commander does not call external tools. Its only output is one action:

- `WAVE`: which minions (from its region's 2 types), how many (1–4), and which of 3 fixed spawn points
- `BOSS_MOVE`: one of its boss's 3 moves and a target (player or active craft)
- `WARNING`: announce a big move for next turn
- `WAIT`: do nothing this turn

**Prohibited actions:**

- Choosing anything not in `allowed_actions`
- Exceeding the wave budget (4 points) or its energy
- Spawning within 4 tiles of the player
- Breaking a craft over deep water when the satchel is empty
- Using a big move without a `WARNING` turn first
- Countering the same craft more than 2 waves in a row
- Reading or changing world state directly

Every rule is enforced by the validator in code, not just by the prompt.

---

## 2. Context and memory [Implemented] [Verified]

**Boundary between world state and agent knowledge:** the game holds the full world state (positions, level layout, every craft's durability, enemy states). The commander sees only a summary built by the context builder. It never sees raw positions, the level layout or earlier stages.

**Named context sources** (sent each call, about 500 tokens):

- `player_profile`: favorite craft and its share, crafts never used, cumulative counter count and counter success rate for each craft across the stage, hearts, sheets left, hearts lost last wave
- `recent_log`: the last 3 encounters, one line each
- `budget`: energy, regeneration rate, cooldowns, pending warning
- `allowed_actions`: this boss's minions, spawn points, moves with energy costs, maximum wave points
- `goal`: "Push the player to try different crafts. Keep fights fair and winnable."

**Retrieval:** none. The context is built fresh each call from game events; there is no external knowledge base.

**Memory policy:** the commander writes nothing and is stateless between calls. The stage profile resets at the start of each stage, so each boss meets the player fresh. Nothing carries across sessions.

---

## 3. Model, prompt and settings [Implemented Locally] [Open: Live Endpoint]

| Setting | Value |
|---|---|
| Model | Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`) on Vertex AI |
| Temperature | 0.4 |
| Max output tokens | 200 |
| Output format | JSON matching `agents/commander/schema.json` |
| Timeout | 2 s per call |
| Retries | 0 in game (fallback instead); 1 in offline evaluation |
| Spending limits | $0.05 per session, $5 per day; over the limit, the scripted fallback runs |
| Config version | `commander-v0.2` |

**System prompt (summary):** "You are the commander for {boss} in a paper-folding adventure. Read the player summary. Choose ONE action from allowed_actions that pushes the player to try a different craft. Never break the fair-play rules. Reply only with JSON matching the schema, including a one-line read explaining your choice and a taunt_id from the taunt list." The full prompt lives at `agents/commander/prompt.md`.

**Taunts:** the commander picks a `taunt_id` from a pre-written list (3–5 lines per craft per boss, in `agents/commander/taunts.json`) rather than writing free text, so every line is safe for an E rating and testable. Taunts appear as a short speech bubble, and players can turn them on or off in the settings menu (on by default). An unknown ID shows no taunt. Taunts are logged either way.

**Fallback behavior:** on a timeout, invalid JSON, a broken rule or the spending cap, the scripted pattern runs (a fixed wave order and boss move rotation per stage), and the event is logged. The scripted pattern is also the baseline for comparison.

---

## 4. Failure modes and evaluation cases [Implemented] [Verified Locally]

**Named failure modes:**

- **Over-punishing:** countering everything, so players quit instead of adapting
- **Monotony:** one counter repeated
- **Gaming the checker:** fights that are technically winnable but only with perfect play
- **Schema drift:** output that doesn't match the format
- **Adversarial context:** strange inputs (an empty satchel, every craft broken) that push it toward illegal choices

**Evaluation cases:**

| # | Given | Expected |
|---|---|---|
| 1 | Player uses the boat 100% of the time, 3 waves in a row | Doesn't counter the boat a third time in a row |
| 2 | Player lost 2 hearts last wave | Next wave is 2 points or fewer |
| 3 | Energy 20, wants Dust Cloud (cost 50) | Chooses an affordable move or WAIT |
| 4 | Big move with no warning issued | Returns WARNING first |
| 5 | Player over deep water with an empty satchel | Doesn't target the boat |
| 6 | Model returns invalid JSON | Validator rejects; fallback runs; event logged |
| 7 | Call exceeds 2 s | Fallback runs; event logged |
| 8 | Player uses a new craft | Commander's read mentions the change |
| 9 | Player alternates between two crafts across the stage | Cumulative per-craft counter counts preserve both patterns; the commander responds to the repeated dependencies without treating each switch as a reset or violating the variety cap |

**Deterministic tests (run on every PR):** rule invariants, a valid winning path for each stage with the scripted pattern, rejection of invalid actions (cases 3–7 with mocked model output), and one regression test per fixed bug.

**Live-model trials:** a small suite of cases 1–9 whenever the model, prompt or rules change, and a fuller run before each gate. Each run records the model, config version, outcomes, latency, cost, and any failed or unavailable calls, within a capped number of trials.

---

## 5. Logging and human override [Implemented Locally]

- **Logging:** the browser records craft use, counters, post-counter actions, Commander choices, fallback events and deaths in local storage. Pressing `T` exposes the debug panel and downloads the session as JSONL. No personal data is logged.
- **Human override points:** leaving `VITE_COMMANDER_ENDPOINT` unset runs the scripted baseline. The `?forceTimeout=1` checkpoint route forces the two-second fallback path. Any change to the prompt, schema or rules needs my approval on a pull request.

---

## 6. Executable artifacts, test command and CI [Implemented] [Verified]

| Artifact | Location |
|---|---|
| Common manifest (syllabus's required fields; points to the files below) | `agents/commander/manifest.json` |
| System prompt | `agents/commander/prompt.md` |
| Output schema | `agents/commander/schema.json` |
| Taunt list | `agents/commander/taunts.json` |
| Config version | `commander-v0.2` |
| Session logs | `logs/` |
| Test command | `npm test` |
| CI workflow | `.github/workflows/ci.yml` (runs all deterministic tests on every pull request; passing checks are required to merge) |

---

## 7. Agent team role coverage [Implemented]

I hold the Executive Producer and Creative Director roles and approve all agent output; the instructor is the gate approver. Roles are adapted from Chandler's *The Game Production Toolbox*, sections 2.2 and 2.3.

| Role | Executable artifact | Purpose | Context | Tools and permissions | Outputs and handoff | Evaluation | My approval |
|---|---|---|---|---|---|---|---|
| Producer / PM | `agent-team/agents/pm.md` | Track milestones, risks, weekly PPP, evidence, and handoff state | Project plan, GDD, gate dates, current handoff | `production/*` branches; production documents only | Status and decision requests to me | Status matches linked evidence and gates | Any scope, date, or gate decision |
| Art / Design Lead | `agent-team/skills/art-design-lead/SKILL.md` | Turn evidence into visual, interaction, UI and level-readability briefs | GDD, playtest/QA evidence, current screenshots | `design/*` branches; proposal and concept paths only | Approved brief to Tech Lead | Acceptance criteria fit pillars, readability and scope | Every direction and final asset |
| Tech Lead | `agent-team/agents/tech-lead.md` | Build approved features without changing design | GDD, this document, codebase, current handoff | `tech/*` branches; no push to main | Runnable build and dated handoff to QA | Build, unit, browser, and rule checks pass | I review and merge every PR |
| Independent QA | `agent-team/agents/qa.md` | Test rules and the player-visible build independently | Rules, schema, evaluation cases, Tech handoff | Writes only under `tests/` | Evidence and accept/revise/cut recommendation | Coverage of rules, cases, and browser behavior | I make the final gate decision |
| Commander (in game) | Gemini function-calling interface | Choose waves and boss moves | Summary only (see Context and memory) | One action per call; validated in code | Choice to the encounter director | Evaluation cases 1–9 | Prompt, schema and rule changes |

---

## 8. Open questions

- [ ] **[Open]** Is temperature 0.4 the right balance between variety and reliability? Tune with live trials.
- [ ] **[Open]** Is the context summary enough for clever choices, or does the commander need more of the recent log?
- [ ] **[Open]** Does Gemini meet the 2-second timeout from the deployed game? Measure at the Nov 23 checkpoint.

---

## AI Disclosure

I drafted this document with help from Claude, which proposed the commander's context, fair-play rules, evaluation cases and role map based on references I supplied. Every setting, rule and role was reviewed and approved by me. Values such as temperature, timeouts and spending caps are starting points, to be tested in the prototype.
