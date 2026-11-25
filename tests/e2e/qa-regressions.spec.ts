import { expect, test } from "@playwright/test";

async function hold(page: import("@playwright/test").Page, key: string, milliseconds: number): Promise<void> {
  await page.keyboard.down(key);
  await page.waitForTimeout(milliseconds);
  await page.keyboard.up(key);
}

test("HUD panels stay fully visible at the recorded 1280x720 viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");

  const portrait = await page.locator(".portrait").boundingBox();
  const resources = await page.locator(".resources").boundingBox();
  const controls = await page.locator("#controls-card").boundingBox();

  expect(portrait?.width ?? 0, "health panel should include the five-heart readout").toBeGreaterThan(140);
  expect(resources?.width ?? 0, "sheet panel should include count and label").toBeGreaterThan(130);
  expect(controls?.width ?? 0, "keyboard instructions should not be clipped").toBeGreaterThan(170);
});

test("the optional clue cannot be reached by walking around the gap without a Frog", async ({ page }) => {
  test.setTimeout(30_000);
  await page.goto("/");

  // Start with only the ruler and Boat, cross the river, then walk around the
  // finite lower gap boundary toward the clue. The clue must remain gated.
  await hold(page, "KeyD", 1_500);
  await page.keyboard.press("Enter");
  await page.keyboard.press("KeyX");
  await expect(page.getByRole("status")).toContainText("Boat launched");
  await hold(page, "KeyD", 1_800);
  await hold(page, "KeyS", 1_800);
  await hold(page, "KeyD", 2_200);

  await expect(page.getByTestId("hud"), "walking must not collect the Frog-only clue").not.toContainText("clue found");
});

test("Canvas 2D fallback keeps the checkpoint visible when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function getContext(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return Reflect.apply(originalGetContext, this, [type, ...args]);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });

  await page.goto("/");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.locator("#viewport canvas")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Canvas compatibility mode active");
  await expect(page.getByTestId("hud")).toContainText("ruler");
  await page.keyboard.press("KeyX");
  await expect(page.getByRole("heading", { name: "The Folding Table" })).toBeVisible();
  await page.screenshot({ path: "tests/artifacts/canvas-fallback.png", fullPage: true });
});

test("startup failure is visible when neither WebGL nor Canvas 2D is available", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;
  });

  await page.goto("/");
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("The paper world could not unfold");
  await expect(page.getByRole("alert")).toContainText("neither WebGL nor a Canvas 2D context");
});

test("context prompt opens the workbench and launches the Boat without manual selection", async ({ page }) => {
  await page.goto("/");
  const prompt = page.locator("#action-prompt");

  await expect(prompt).toContainText("SPACE / E");
  await expect(prompt).toContainText("Open folding table");
  await page.keyboard.press("Space");
  await expect(page.getByRole("heading", { name: "The Folding Table" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "The Folding Table" })).not.toBeVisible();
  await page.waitForTimeout(100);

  // Keep the ruler selected. The river interaction should select and launch
  // the packed Boat contextually, without requiring a cycle/use sequence.
  await hold(page, "KeyD", 1_500);
  await expect(prompt).toContainText("Launch Paper Boat");
  await page.keyboard.press("KeyE");
  await expect(page.getByRole("status")).toContainText("Boat launched");
  await expect(page.locator('.slot[data-craft-id="boat"]')).toHaveAttribute("aria-pressed", "true");
});

test("number keys and clickable slots select directly while Z remains a direct ruler action", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: /Paper Frog/ }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "The Folding Table" })).not.toBeVisible();
  const ruler = page.locator('.slot[data-craft-id="ruler"]');
  const boat = page.locator('.slot[data-craft-id="boat"]');
  const frog = page.locator('.slot[data-craft-id="frog"]');
  const prompt = page.locator("#action-prompt");

  await page.keyboard.press("Digit3");
  await expect(frog).toHaveAttribute("aria-pressed", "true");
  await boat.click();
  await expect(boat).toHaveAttribute("aria-pressed", "true");
  await hold(page, "KeyD", 650);
  await expect(prompt).toContainText("Use Paper Boat");

  await page.keyboard.press("Digit1");
  await expect(ruler).toHaveAttribute("aria-pressed", "true");
  await expect(prompt).toContainText("Strike with ruler");

  await page.keyboard.press("Digit2");
  await expect(boat).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("KeyZ");
  await expect(page.getByRole("status")).toContainText("ruler snaps through empty air", { ignoreCase: true });

  await page.keyboard.press("Tab");
  await expect(frog).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("KeyQ");
  await expect(ruler).toHaveAttribute("aria-pressed", "true");
  await boat.click();
  await expect(boat).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("KeyX");
  await expect(page.getByRole("status")).toContainText("Boat needs a water's edge");
});
