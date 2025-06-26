import type { Document, DocumentRepository } from "../domain/document";

export class ListDocuments {
  constructor(private repo: DocumentRepository) {}
  async execute(): Promise<Document[]> {
    return this.repo.getAll();
  }
}
