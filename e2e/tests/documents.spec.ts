import { expect } from "@playwright/test";
import { test } from "../setup";
import { getDocuments } from "../mocks";
import {
  sortDocuments,
  type SortOrder,
} from "../../src/application/sortDocuments";
import type { Document } from "../../src/domain/document";

const documents = getDocuments();
const labelBySortKey: Partial<Record<keyof Document, string>> = {
  Title: "Name",
  Version: "Version",
  UpdatedAt: "Date",
};
const sortingKeys = Object.keys(labelBySortKey) as (keyof Document)[];
const sortingOrders: SortOrder[] = ["asc", "desc"];

type SortingCombination = {
  sortingKey: keyof Document;
  sortingOrder: SortOrder;
  sortedTitles: string[];
};

const sortingCombinations = sortingKeys.reduce(
  (prev, sortingKey) => [
    ...prev,
    ...sortingOrders.map(
      (sortingOrder) =>
        ({
          sortingKey,
          sortingOrder,
          sortedTitles: sortDocuments(documents, sortingKey, sortingOrder).map(
            ({ Title }) => Title,
          ),
        }) as unknown as SortingCombination,
    ),
  ],
  [] as SortingCombination[],
);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should display the documents list", async ({ page }) => {
  await expect(page.getByTestId("list-body")).toBeVisible();
});

test.describe("sorting documents", () => {
  sortingCombinations.forEach(({ sortingKey, sortingOrder, sortedTitles }) => {
    test(`sorts documents by '${sortingKey}' in '${sortingOrder}' order`, async ({
      page,
    }) => {
      const select = page.locator("select#vd-doc-list__sort");
      await select.selectOption({
        label: labelBySortKey[sortingKey] as unknown as string,
      });

      const sortButton = page.getByTestId(`sort--${sortingOrder}`);
      const isDisabled = await sortButton.isDisabled();

      if (!isDisabled) {
        await sortButton.click();
      }

      const titleCells = page.locator(".vd-doc-list__row .vd-doc-list__title");

      expect(titleCells).toContainText(sortedTitles);
    });
  });
});

test("should switch to grid view", async ({ page }) => {
  await page.getByRole("button", { name: /grid/i }).click();
  await expect(page.locator(".vd-doc-list--grid")).toBeVisible();
});

test.describe("add document", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("button", { name: "+ Add document" }).click();
    await page.getByRole("textbox", { name: "Name" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill("Name");
    await page.getByRole("textbox", { name: "Name" }).press("Tab");
    await page.getByRole("spinbutton", { name: "Version" }).press("ArrowUp");
    await page.getByRole("spinbutton", { name: "Version" }).press("Tab");
    await page.locator("#form__version-minor").press("ArrowUp");
    await page.locator("#form__version-minor").press("Tab");
    await page.locator("#form__version-patch").press("ArrowUp");
    await page.locator("#form__version-patch").press("Tab");
    await page
      .getByRole("textbox", { name: "Contributors" })
      .fill("ContributorA");
    await page.getByRole("textbox", { name: "Contributors" }).press("Tab");
    await page
      .getByRole("textbox", { name: "Attachments" })
      .fill("AttachmentA");
    await page.getByRole("button", { name: "Create document" }).click();
  });

  test("shows button after add document", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "+ Add document" }),
    ).toBeVisible();
  });

  test("add document in the list", async ({ page }) => {
    await expect(page.locator("#list-body").getByText("Name")).toBeVisible();
  });
});
