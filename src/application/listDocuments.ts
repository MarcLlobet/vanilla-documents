import type { Document, DocumentRepository } from "../domain/document";

export class ListDocuments {
  constructor(private repo: DocumentRepository) {
    this.repo = repo;
  }
  async execute(): Promise<Document[]> {
    return this.repo.getAll();
  }
}
