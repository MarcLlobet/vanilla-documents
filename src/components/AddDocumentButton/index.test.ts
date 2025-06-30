import { describe, it, expect, vi } from "vitest";
import { AddDocumentButton } from "./index";

describe("AddDocumentButton", () => {
  it("renders with label", () => {
    const el = AddDocumentButton({ label: "Add" });
    expect(el.textContent).toBe("Add");
  });

  it("calls onClick", () => {
    const onClick = vi.fn();
    const el = AddDocumentButton({ onClick });
    el.click();
    expect(onClick).toHaveBeenCalled();
  });
});
