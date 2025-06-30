import { describe, it, expect } from "vitest";
import { ListDocuments } from "./listDocuments";
import type { Document, DocumentRepository } from "../domain/document";

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

describe("ListDocuments", () => {
  it("calls repo.getAll", async () => {
    let called = false;
    const repo: DocumentRepository = {
      getAll: async () => {
        called = true;
        return docs;
      },
      add: async () => {},
    };
    const useCase = new ListDocuments(repo);
    const result = await useCase.execute();
    expect(called).toBe(true);
    expect(result).toEqual(docs);
  });
});
