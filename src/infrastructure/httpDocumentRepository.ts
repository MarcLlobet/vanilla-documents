import type { Document } from "../domain/document";

export type DocumentRepository = {
  getAll(): Promise<Document[]>;
  add(_document: Document): Promise<void>;
};

export class HttpDocumentRepository implements DocumentRepository {
  private memory: Document[] = [];
  async getAll(): Promise<Document[]> {
    const res = await fetch("http://localhost:8080/documents");
    const docs = await res.json();
    return [...docs, ...this.memory];
  }
  async add(document: Document): Promise<void> {
    this.memory.unshift(document);
  }
}
