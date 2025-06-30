import { describe, it, expect } from "vitest";
import { DocumentList, addDocumentRow } from "./index";
import type { Document } from "../../domain/document";

const doc: Document = {
  ID: "1",
  Title: "Doc",
  Version: "1.0.0",
  CreatedAt: "2024-01-01",
  UpdatedAt: "2024-01-01",
  Attachments: ["A", "B"],
  Contributors: [{ ID: "c1", Name: "Anna" }],
};

describe("addDocumentRow", () => {
  it("renders document row", () => {
    const row = addDocumentRow(doc);
    expect(row.textContent).toContain("Doc");
    expect(row.textContent).toContain("1.0.0");
    expect(row.textContent).toContain("Anna");
    expect(row.textContent).toContain("A");
  });
});

describe("DocumentList", () => {
  it("renders list with documents", () => {
    const el = DocumentList({
      documentListId: "list",
      documents: [doc],
      viewMode: "list",
    });
    expect(el.querySelector(".vd-doc-list__title")?.textContent).toBe("Doc");
  });

  it("renders addArea if provided", () => {
    const el = DocumentList({
      documentListId: "list",
      documents: [],
      addArea: () => {
        const btn = document.createElement("button");
        btn.textContent = "Add";
        return btn;
      },
      viewMode: "list",
    });
    expect(el.textContent).toContain("Add");
  });

  it("toggles grid view", () => {
    const el = DocumentList({
      documentListId: "list",
      documents: [],
      viewMode: "list",
    });
    expect(el.classList.contains("vd-doc-list--grid")).toBe(false);
    el.controls.toggleView();
    expect(el.classList.contains("vd-doc-list--grid")).toBe(true);
  });
});
