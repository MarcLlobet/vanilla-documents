import { describe, it, expect, vi } from "vitest";
import { DocumentControls, DocumentControlsProps } from "./index";

describe("DocumentControls", () => {
  const sortOptions = [
    { key: "Title", label: "Name" },
    { key: "Version", label: "Version" },
    { key: "UpdatedAt", label: "Date" },
  ] as DocumentControlsProps["sortOptions"];

  it("renders sort options and view buttons", () => {
    const el = DocumentControls({
      documentControlsId: "id",
      sortOptions,
      sortKey: "Title",
      sortOrder: "asc",
      viewMode: "list",
      onSortKeyChange: vi.fn(),
      onSortOrderChange: vi.fn(),
      onViewModeChange: vi.fn(),
    });
    expect(el.querySelector("select")).toBeTruthy();
    expect(el.querySelectorAll("button").length).toBeGreaterThan(0);
  });

  it("calls onSortKeyChange", () => {
    const onSortKeyChange = vi.fn();
    const el = DocumentControls({
      documentControlsId: "id",
      sortOptions,
      sortKey: "Title",
      sortOrder: "asc",
      viewMode: "list",
      onSortKeyChange,
      onSortOrderChange: vi.fn(),
      onViewModeChange: vi.fn(),
    });
    const select = el.querySelector("select")!;
    select.value = "Version";
    select.dispatchEvent(new Event("change"));
    expect(onSortKeyChange).toHaveBeenCalledWith("Version");
  });
});
