import type { Document } from "./document";
import type { DocumentRepository } from "../services/httpDocumentRepository";

export class ListDocuments {
  constructor(private repo: DocumentRepository) {
    this.repo = repo;
  }
  async execute(): Promise<Document[]> {
    return this.repo.getAll();
  }
}
