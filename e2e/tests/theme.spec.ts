import { expect } from "@playwright/test";
import { test } from "../setup";

test("changes hue value", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("slider").fill("290");
  await expect(page.getByRole("slider")).toBeVisible();
  const hueValue = await page.evaluate(() =>
    document.documentElement.style.getPropertyValue("--key-color-h"),
  );
  expect(hueValue).toEqual("290");
});

test("switches to dark mode", async ({ page }) => {
  await page.goto("/");
  await page.locator(".darkMode").click();
  await expect(page.getByRole("slider")).toBeVisible();
  const body = page.locator("body");
  await expect(body).toContainClass("dark-mode");
});
