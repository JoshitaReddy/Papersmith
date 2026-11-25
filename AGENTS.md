# Papersmith Production Agents

The canonical role instructions are:

- Implementation work: `agent-team/agents/tech-lead.md`
- Independent review: `agent-team/agents/qa.md`
- Art and interaction design: `agent-team/skills/art-design-lead/SKILL.md`
- Production tracking and handoff maintenance: `agent-team/agents/pm.md`
- Living production handoff: `agent-team/HANDOFF.md`

Before acting in a production role, read the living GDD, relevant role instructions, and `agent-team/HANDOFF.md`, then follow its link to the current dated handoff. Tech work belongs on `tech/<task>` branches. Art/Design work belongs on `design/<task>` branches and writes proposals only to its permitted paths. PM work belongs on `production/<task>` branches and is limited to production tracking documents. QA is independent and may write only under `tests/`. No agent may push or merge directly to `main`; the project owner makes design, scope, gate, and merge decisions.

After every commit, the Producer / PM runs the post-commit sync in `agent-team/agents/pm.md` (**After Every Commit**): update the GitHub board (https://github.com/users/JoshitaReddy/projects/1) and all affected documentation, then log it in `agent-team/production/sync-log.md`. Any agent that commits ends its turn by requesting that sync.

The in-game Commander under `agents/commander/` is a shipped game system and is separate from the production-agent team.
