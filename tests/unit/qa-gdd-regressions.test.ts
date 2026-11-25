import { describe, expect, it } from "vitest";
import { buildCommanderContext, chooseCommanderAction, validateCommanderAction } from "../../src/commander";
import type { CommanderAction, CommanderContext } from "../../src/types";

describe("QA regressions from the GDD fair-play rules", () => {
  it("evaluation case 5 rejects targeting the Boat over deep water with no spare craft", () => {
    const summary = buildCommanderContext({
      craftUses: { boat: 4 },
      counters: [],
      recentLog: [],
      hearts: 3,
      sheets: 0,
      heartsLostLastWave: 0,
      energy: 100,
    });

    // Raw position remains game-side, but the validator still needs this
    // authoritative director state to enforce the no-trap rule.
    const context = Object.assign(summary, {
      playerOverDeepWater: true,
      usablePackedCrafts: ["boat"],
    }) as CommanderContext & { playerOverDeepWater: boolean; usablePackedCrafts: string[] };
    const action: CommanderAction = {
      kind: "WAVE",
      minions: ["soot-mote"],
      spawnPoint: 0,
      targetCraft: "boat",
      reason: "Counter the Boat",
    };

    expect(validateCommanderAction(action, context)).toContain(
      "Cannot target the Boat while the player is over deep water with no spare craft",
    );
  });

  it("rejects a wave spawn closer than four tiles", () => {
    const context = buildCommanderContext({
      craftUses: { ruler: 1 }, counters: [], recentLog: [], hearts: 5, sheets: 3, heartsLostLastWave: 0, energy: 100,
    });
    const action: CommanderAction = {
      kind: "WAVE", minions: ["mothling"], spawnPoint: 1, reason: "Close pressure",
    };

    expect(validateCommanderAction(action, context, {
      playerOverDeepWater: false,
      usablePackedCrafts: ["boat"],
      spawnDistances: { 0: 6, 1: 3, 2: 8 },
    })).toContain("Spawn point is within 4 tiles of the player");
  });

  it("sanitizes the scripted fallback using director-side safety state", async () => {
    const context = buildCommanderContext({
      craftUses: { boat: 8 }, counters: [], recentLog: [], hearts: 5, sheets: 0, heartsLostLastWave: 0, energy: 100,
    });
    const result = await chooseCommanderAction(context, 1, {
      safetyState: {
        playerOverDeepWater: true,
        usablePackedCrafts: ["boat"],
        spawnDistances: { 0: 2, 1: 3, 2: 7 },
      },
    });

    expect(result.source).toBe("fallback");
    expect(result.action).toMatchObject({ kind: "WAVE", spawnPoint: 2 });
    if (result.action.kind === "WAVE") expect(result.action.targetCraft).toBeUndefined();
  });
});
