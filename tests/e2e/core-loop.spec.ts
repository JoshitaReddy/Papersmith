import { expect, test } from "@playwright/test";

test("player can open the workbench and inspect the Stage 1 satchel", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("hud")).toContainText("ruler");
  await page.keyboard.press("KeyX");
  await expect(page.getByRole("heading", { name: "The Folding Table" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Paper Frog/ })).toBeVisible();
  await page.screenshot({ path: "tests/artifacts/workbench.png", fullPage: true });
  await page.keyboard.press("Escape");
  await page.screenshot({ path: "tests/artifacts/stage1-start.png", fullPage: true });
});

test("forced timeout visibly falls back without blocking play", async ({ page }) => {
  await page.goto("/?forceTimeout=1");
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(1500);
  await page.keyboard.up("KeyD");
  await page.keyboard.press("Enter");
  await page.keyboard.press("KeyX");
  await expect(page.getByRole("status")).toContainText("Boat launched");
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(2800);
  await page.keyboard.up("KeyD");
  await page.waitForTimeout(2300);
  await expect(page.getByRole("status")).toContainText("fallback", { ignoreCase: true });
  await expect(page.getByTestId("hud")).toContainText("boat");
  await page.screenshot({ path: "tests/artifacts/forced-timeout-fallback.png", fullPage: true });
});
