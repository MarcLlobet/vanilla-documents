import { describe, it, expect, vi } from "vitest";
import { DocumentForm } from "./index";

describe("DocumentForm", () => {
  it("calls onSubmit with correct data", () => {
    const onSubmit = vi.fn();
    const el = DocumentForm({ onSubmit });
    const form = el.querySelector("form")!;
    (form.querySelector('[name="title"]') as HTMLInputElement).value = "Test";
    (form.querySelector('[name="version-major"]') as HTMLInputElement).value =
      "2";
    (form.querySelector('[name="version-minor"]') as HTMLInputElement).value =
      "1";
    (form.querySelector('[name="version-patch"]') as HTMLInputElement).value =
      "3";
    (form.querySelector('[name="contributors"]') as HTMLInputElement).value =
      "ContributorA, ContributorB";
    (form.querySelector('[name="attachments"]') as HTMLInputElement).value =
      "AttachmentA, AttachmentB";

    (form.querySelector("button[type=submit]") as HTMLButtonElement).click();

    expect(onSubmit).toHaveBeenCalledWith({
      Title: "Test",
      Version: "2.1.3",
      Attachments: ["AttachmentA", "AttachmentB"],
      Contributors: [
        { ID: "c-0", Name: "ContributorA" },
        { ID: "c-1", Name: "ContributorB" },
      ],
    });
  });

  it("calls onCancel", () => {
    const onCancel = vi.fn();
    const el = DocumentForm({ onSubmit: vi.fn(), onCancel });
    const cancelBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent === "Cancel",
    )!;
    cancelBtn.click();
    expect(onCancel).toHaveBeenCalled();
  });
});
