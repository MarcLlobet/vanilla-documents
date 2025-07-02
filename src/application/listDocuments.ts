import type { Document } from "../domain/document";
import type { DocumentRepository } from "../infrastructure/httpDocumentRepository";

export class ListDocuments {
  constructor(private repo: DocumentRepository) {
    this.repo = repo;
  }
  async execute(): Promise<Document[]> {
    return this.repo.getAll();
  }
}
