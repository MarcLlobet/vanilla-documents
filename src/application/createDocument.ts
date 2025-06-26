import type { Document, DocumentRepository } from "../domain/document";

export class CreateDocument {
  constructor(private repo: DocumentRepository) {}
  async execute(doc: Omit<Document, "ID" | "CreatedAt">): Promise<Document> {
    const newDoc: Document = {
      ...doc,
      ID: crypto.randomUUID(),
      CreatedAt: new Date().toISOString(),
    };
    await this.repo.add(newDoc);
    return newDoc;
  }
}
