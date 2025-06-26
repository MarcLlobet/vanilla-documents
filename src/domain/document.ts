export interface Contributor {
  ID: string;
  Name: string;
}

export interface Document {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  UpdatedAt: string;
  Attachments: string[];
  Contributors: Contributor[];
}

export interface DocumentRepository {
  getAll(): Promise<Document[]>;
  add(document: Document): Promise<void>;
}

export {};
