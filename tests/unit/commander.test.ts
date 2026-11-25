import { describe, expect, it, vi } from "vitest";
import {
  buildCommanderContext,
  chooseCommanderAction,
  scriptedBossFallback,
  scriptedFallback,
  validateCommanderAction,
} from "../../src/commander";
import type { ContextInput } from "../../src/commander";
import type { CommanderAction } from "../../src/types";

function input(overrides: Partial<ContextInput> = {}): ContextInput {
  return {
    craftUses: { boat: 8, frog: 1, fan: 0, ruler: 2 },
    counters: [],
    recentLog: [],
    hearts: 5,
    sheets: 3,
    heartsLostLastWave: 0,
    energy: 100,
    ...overrides,
  };
}

describe("Commander evaluation cases", () => {
  it("case 1: rejects a third consecutive counter against the boat", () => {
    const context = buildCommanderContext(input({
      counters: [
        { craft: "boat", encounter: 1, succeeded: true },
        { craft: "boat", encounter: 2, succeeded: true },
      ],
    }));
    const action: CommanderAction = {
      kind: "WAVE",
      minions: ["soot-mote"],
      spawnPoint: 0,
      targetCraft: "boat",
      reason: "Counter the favorite",
    };
    expect(validateCommanderAction(action, context)).toContain(
      "Variety cap forbids countering the same craft a third wave in a row",
    );
    expect(scriptedFallback(context, 2)).not.toHaveProperty("targetCraft", "boat");
  });

  it("case 2: applies the two-point mercy wave cap", () => {
    const context = buildCommanderContext(input({ heartsLostLastWave: 2 }));
    const invalid: CommanderAction = {
      kind: "WAVE",
      minions: ["mothling", "soot-mote", "soot-mote"],
      spawnPoint: 1,
      reason: "Too hard",
    };
    expect(validateCommanderAction(invalid, context)).toContain("Wave exceeds 2-point budget");
    const fallback = scriptedFallback(context, 0);
    expect(fallback.kind).toBe("WAVE");
    if (fallback.kind === "WAVE") expect(fallback.minions).toHaveLength(1);
  });

  it("case 3: rejects an unaffordable boss move", () => {
    const context = buildCommanderContext(input({ energy: 20, pendingWarning: true }));
    const action: CommanderAction = { kind: "BOSS_MOVE", move: "DUST_CLOUD", target: "player", reason: "Darkness" };
    expect(validateCommanderAction(action, context)).toContain("Boss move is unaffordable");
  });

  it("case 4: requires a warning before Dust Cloud", () => {
    const context = buildCommanderContext(input({ pendingWarning: false }));
    const action: CommanderAction = { kind: "BOSS_MOVE", move: "DUST_CLOUD", target: "player", reason: "Darkness" };
    expect(validateCommanderAction(action, context)).toContain("Dust Cloud requires a warning turn");
  });

  it("cases 6 and 7: uses the fallback on invalid output or timeout", async () => {
    const context = buildCommanderContext(input());
    const invalidFetcher = vi.fn(async () => new Response(JSON.stringify({ kind: "BOSS_MOVE", move: "DUST_CLOUD", target: "player", reason: "bad" })));
    const invalid = await chooseCommanderAction(context, 0, { endpoint: "https://example.test", fetcher: invalidFetcher });
    expect(invalid.source).toBe("fallback");

    const timeoutFetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.signal?.aborted) throw new DOMException("Aborted", "AbortError");
      return new Response(JSON.stringify({ kind: "WAIT", reason: "late" }));
    });
    const timedOut = await chooseCommanderAction(context, 0, {
      endpoint: "https://example.test",
      timeoutMs: 1,
      forceTimeout: true,
      fetcher: timeoutFetcher,
    });
    expect(timedOut.source).toBe("fallback");
  });

  it("case 8: carries a newly used craft into context", () => {
    const context = buildCommanderContext(input({ craftUses: { boat: 5, frog: 1 } }));
    expect(context.craftUses.frog).toBe(1);
  });

  it("case 9: preserves both crafts when the player alternates", () => {
    const context = buildCommanderContext(input({
      counters: [
        { craft: "boat", encounter: 1, succeeded: true },
        { craft: "frog", encounter: 2, succeeded: false },
        { craft: "boat", encounter: 3, succeeded: true },
        { craft: "frog", encounter: 4, succeeded: true },
      ],
    }));
    expect(context.countersByCraft.boat).toBe(2);
    expect(context.countersByCraft.frog).toBe(2);
    expect(context.counterSuccessByCraft.boat).toBe(2);
    expect(context.counterSuccessByCraft.frog).toBe(1);
    expect(context.consecutiveCounterCount).toBe(1);
  });

  it("runs warned boss moves through a safe scripted rotation", () => {
    const warned = buildCommanderContext(input({ pendingWarning: true, energy: 60 }));
    const move = scriptedBossFallback(warned, 3);
    expect(move).toMatchObject({ kind: "BOSS_MOVE", move: "DUST_CLOUD" });
    expect(validateCommanderAction(move, warned)).toEqual([]);
  });
});
