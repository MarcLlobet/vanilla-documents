import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpDocumentRepository } from "./httpDocumentRepository";
import type { Document } from "../application/document";

const docs: Document[] = [
  {
    ID: "1",
    Title: "Doc",
    Version: "1.0.0",
    CreatedAt: "2024-01-01",
    UpdatedAt: "2024-01-01",
    Attachments: [],
    Contributors: [],
  },
];

describe("HttpDocumentRepository", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          json: async (): Promise<Document[]> => docs,
        }) as Promise<Response>,
    );
  });

  it("getAll fetches and merges memory", async () => {
    const repo = new HttpDocumentRepository();
    await repo.add({ ...docs[0], ID: "2" });
    const result = await repo.getAll();
    expect(result).toContainEqual(docs[0]);
    expect(result.some((d) => d.ID === "2")).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it("add adds to memory", async () => {
    const repo = new HttpDocumentRepository();
    await repo.add(docs[0]);
    const result = await repo.getAll();
    expect(result).toContainEqual(docs[0]);
  });
});
