import { expect } from "@playwright/test";
import { test } from "../setup";
import { getNotification, getDocuments } from "../mocks";

test.describe("Notifications", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("receives one notification", async ({ page }) => {
    await page.evaluate(() => {
      globalThis.sendServerNotification?.();
    });

    const notification = page.locator(".vd-notification__badge");
    await expect(notification).toContainText("1");
  });

  test("receives multiple notification", async ({ page }) => {
    await page.evaluate(() => {
      globalThis.sendServerNotification?.();
      globalThis.sendServerNotification?.();
      globalThis.sendServerNotification?.();
      globalThis.sendServerNotification?.();
      globalThis.sendServerNotification?.();
    });

    const notification = page.locator(".vd-notification__badge");
    await expect(notification).toContainText("5");
  });

  test("existent notifications aren't added", async ({ page }) => {
    const documents = getDocuments();
    const notification = getNotification();

    const [firstDocument] = documents;

    notification.ID = firstDocument.ID;

    await page.evaluate((notification) => {
      globalThis.sendServerNotification?.(notification);
    }, notification);

    const badge = page.locator(".vd-notification__badge");
    await expect(badge).not.toBeVisible();
  });

  test.describe("click on notifications", () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        globalThis.sendServerNotification?.();
      });
      await page.locator("#notification-area").click();
    });

    test("adds notification", async ({ page }) => {
      const documentRows = page.locator("#list-body .vd-doc-list__row");
      const notificatedDocument = documentRows.getByText(
        "Mock - Westmalle Trappist Tripel",
      );
      await expect(notificatedDocument).toBeVisible();
    });

    test("clears notifications", async ({ page }) => {
      await expect(page.locator("#notification-area")).not.toBeVisible();
    });
  });
});
