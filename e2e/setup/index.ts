import { test as base } from "@playwright/test";
import { getDocuments, getNotificationGetter } from "../mocks/index.ts";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("http://**/documents", async (route) => {
      const documents = getDocuments();

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(documents),
      });
    });

    await page.routeWebSocket("ws://**/notifications", (ws) => {
      const getNotification = getNotificationGetter();
      page.exposeFunction("sendServerNotification", (notification) => {
        ws.send(JSON.stringify(notification ?? getNotification()));
      });
    });

    await use(page);
  },
});
