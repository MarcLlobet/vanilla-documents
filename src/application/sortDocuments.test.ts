import { describe, it, expect } from "vitest";
import { sortDocuments } from "./sortDocuments";
import type { Document } from "./document";

const docs: Document[] = [
  {
    ID: "1",
    Title: "B",
    Version: "1.2.0",
    CreatedAt: "2024-01-01",
    UpdatedAt: "2024-01-03",
    Attachments: [],
    Contributors: [],
  },
  {
    ID: "2",
    Title: "A",
    Version: "2.0.0",
    CreatedAt: "2024-01-02",
    UpdatedAt: "2024-01-01",
    Attachments: [],
    Contributors: [],
  },
  {
    ID: "3",
    Title: "C",
    Version: "1.1.1",
    CreatedAt: "2024-01-03",
    UpdatedAt: "2024-01-02",
    Attachments: [],
    Contributors: [],
  },
];

describe("sortDocuments", () => {
  it("sorts by Title asc", () => {
    const sorted = sortDocuments(docs, "Title", "asc");
    expect(sorted.map((d) => d.Title)).toEqual(["A", "B", "C"]);
  });

  it("sorts by Title desc", () => {
    const sorted = sortDocuments(docs, "Title", "desc");
    expect(sorted.map((d) => d.Title)).toEqual(["C", "B", "A"]);
  });

  it("sorts by Version asc", () => {
    const sorted = sortDocuments(docs, "Version", "asc");
    expect(sorted.map((d) => d.Version)).toEqual(["1.1.1", "1.2.0", "2.0.0"]);
  });

  it("sorts by Version desc", () => {
    const sorted = sortDocuments(docs, "Version", "desc");
    expect(sorted.map((d) => d.Version)).toEqual(["2.0.0", "1.2.0", "1.1.1"]);
  });

  it("sorts by UpdatedAt asc", () => {
    const sorted = sortDocuments(docs, "UpdatedAt", "asc");
    expect(sorted.map((d) => d.UpdatedAt)).toEqual([
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
    ]);
  });

  it("sorts by UpdatedAt desc", () => {
    const sorted = sortDocuments(docs, "UpdatedAt", "desc");
    expect(sorted.map((d) => d.UpdatedAt)).toEqual([
      "2024-01-03",
      "2024-01-02",
      "2024-01-01",
    ]);
  });
});
