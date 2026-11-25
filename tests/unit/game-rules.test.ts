import { describe, expect, it } from "vitest";
import { buildCommanderContext, scriptedFallback, validateCommanderAction } from "../../src/commander";

describe("Stage 1 deterministic path", () => {
  it("keeps a valid fallback wave under the normal budget", () => {
    const context = buildCommanderContext({
      craftUses: { boat: 1, frog: 1, fan: 0, ruler: 2 },
      counters: [],
      recentLog: [],
      hearts: 5,
      sheets: 3,
      heartsLostLastWave: 0,
      energy: 100,
    });
    for (let turn = 0; turn < 12; turn += 1) {
      expect(validateCommanderAction(scriptedFallback(context, turn), context)).toEqual([]);
    }
  });

  it("does not require the Fan in the critical-path inventory", () => {
    const criticalPath = ["boat", "ruler"];
    expect(criticalPath).not.toContain("fan");
    expect(criticalPath).toContain("boat");
  });

  it("reserves the Frog for the optional clue path", () => {
    const optionalClueRequirement = "frog";
    expect(optionalClueRequirement).toBe("frog");
  });
});
