# Papersmith of the Crinkled Kingdom

**Initial Configuration Document · Version 0.1 (G1, Nov 15, 2026)**

This document describes the in-game agent (the commander) and the agent team that builds the game.

> **Status labels:** everything in this Initial version is **[Planned]** unless marked. **[Open]** marks an unresolved question. **[Implemented]** and **[Verified]** will be added at G2/G3 as features are built and tested.

---

## 1. In-game agent: the Commander [Planned]

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

## 2. Context and memory [Planned]

**Boundary between world state and agent knowledge:** the game holds the full world state (positions, level layout, every craft's durability, enemy states). The commander sees only a summary built by the context builder. It never sees raw positions, the level layout or earlier stages.

**Named context sources** (sent each call, about 500 tokens):

- `player_profile`: favorite craft and its share, crafts never used, counter success rates, hearts, sheets left, hearts lost last wave
- `recent_log`: the last 3 encounters, one line each
- `budget`: energy, regeneration rate, cooldowns, pending warning
- `allowed_actions`: this boss's minions, spawn points, moves with energy costs, maximum wave points
- `goal`: "Push the player to try different crafts. Keep fights fair and winnable."

**Retrieval:** none. The context is built fresh each call from game events; there is no external knowledge base.

**Memory policy:** the commander writes nothing and is stateless between calls. The stage profile resets at the start of each stage, so each boss meets the player fresh. Nothing carries across sessions.

---

## 3. Model, prompt and settings [Planned]

| Setting | Value |
|---|---|
| Model | Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`) on Vertex AI |
| Temperature | 0.4 |
| Max output tokens | 200 |
| Output format | JSON matching `agents/commander/schema.json` |
| Timeout | 2 s per call |
| Retries | 0 in game (fallback instead); 1 in offline evaluation |
| Spending limits | $0.05 per session, $5 per day; over the limit, the scripted fallback runs |
| Config version | Logged with every call (`commander-v0.1`) |

**System prompt (summary):** "You are the commander for {boss} in a paper-folding adventure. Read the player summary. Choose ONE action from allowed_actions that pushes the player to try a different craft. Never break the fair-play rules. Reply only with JSON matching the schema, including a one-line read explaining your choice and a taunt_id from the taunt list." The full prompt lives at `agents/commander/prompt.md`.

**Taunts:** the commander picks a `taunt_id` from a pre-written list (3–5 lines per craft per boss, in `agents/commander/taunts.json`) rather than writing free text, so every line is safe for an E rating and testable. Taunts appear as a short speech bubble, and players can turn them on or off in the settings menu (on by default). An unknown ID shows no taunt. Taunts are logged either way.

**Fallback behavior:** on a timeout, invalid JSON, a broken rule or the spending cap, the scripted pattern runs (a fixed wave order and boss move rotation per stage), and the event is logged. The scripted pattern is also the baseline for comparison.

---

## 4. Failure modes and evaluation cases [Planned]

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

**Deterministic tests (run on every PR):** rule invariants, a valid winning path for each stage with the scripted pattern, rejection of invalid actions (cases 3–7 with mocked model output), and one regression test per fixed bug.

**Live-model trials:** a small suite of cases 1–8 whenever the model, prompt or rules change, and a fuller run before each gate. Each run records the model, config version, outcomes, latency, cost, and any failed or unavailable calls, within a capped number of trials.

---

## 5. Logging and human override [Planned]

- **Logging:** each session writes a JSONL log to `logs/` with every context sent, choice returned, validator result, latency, token count and fallback event. No personal data is logged.
- **Human override points:** a config flag `COMMANDER_MODE=agent|scripted` switches the whole game to the scripted baseline (also used for playtest comparisons). A debug key forces the fallback mid-session. Any change to the prompt, schema or rules needs my approval on a pull request.

---

## 6. Executable artifacts, test command and CI [Planned]

| Artifact | Location |
|---|---|
| Common manifest (syllabus's required fields; points to the files below) | `agents/commander/manifest.json` |
| System prompt | `agents/commander/prompt.md` |
| Output schema | `agents/commander/schema.json` |
| Taunt list | `agents/commander/taunts.json` |
| Config version | `commander-v0.1`, logged with every call |
| Session logs | `logs/` |
| Test command | `npm test` |
| CI workflow | `.github/workflows/ci.yml` (runs all deterministic tests on every pull request; passing checks are required to merge) |

---

## 7. Agent team role coverage (planned)

I hold the Executive Producer, Creative Director, Design Lead and Tech Lead roles, and approve all agent output; the instructor is the gate approver. Roles are adapted from Chandler's *The Game Production Toolbox*, sections 2.2 and 2.3. Working roles are shown at G2/G3.

| Role | Executable artifact | Purpose | Context | Tools and permissions | Outputs and handoff | Evaluation | My approval |
|---|---|---|---|---|---|---|---|
| Producer | Planning skill | Track tasks against gate dates; keep the risk register | Project plan, GDD, gate dates | Reads repo; edits plan docs only | Weekly plan update to me | Plan matches gates | Any scope or date change |
| Designer | Design skill | Draft mechanics, stats and level layouts | GDD, playtest logs | Edits draft design docs only | Proposals to me, then to engineering | Proposals fit pillars and scope | Every design change |
| Engineer | Coding agent in the repo | Build features | GDD, this document, codebase | Branches and tests; no push to main | Pull requests to QA | CI passes | I review and merge every PR |
| QA | Test-writing skill plus CI | Write deterministic tests; run the evaluation harness | Rules, schema, evaluation cases | Test folder and CI only | Test reports to engineering and me | Coverage of rules and cases | New suites and gate runs |
| Art assistant | Codex now; Gemini image generation planned | Draft concept art and fold frames | Look and Sound section | Drafts only | Options to me | Fits the style guide | I pick and finish every asset |
| Commander (in game) | Gemini function-calling interface | Choose waves and boss moves | Summary only (see Context and memory) | One action per call; validated in code | Choice to the encounter director | Evaluation cases 1–8 | Prompt, schema and rule changes |

---

## 8. Open questions

- [ ] **[Open]** Is temperature 0.4 the right balance between variety and reliability? Tune with live trials.
- [ ] **[Open]** Is the context summary enough for clever choices, or does the commander need more of the recent log?
- [ ] **[Open]** Does Gemini meet the 2-second timeout from the deployed game? Measure at the Nov 23 checkpoint.

---

## AI Disclosure

I drafted this document with help from Claude, which proposed the commander's context, fair-play rules, evaluation cases and role map based on references I supplied. Every setting, rule and role was reviewed and approved by me. Values such as temperature, timeouts and spending caps are starting points, to be tested in the prototype.
