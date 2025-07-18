export type Contributor = {
  ID: string;
  Name: string;
};
export type Document = {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  UpdatedAt: string;
  Attachments: string[];
  Contributors: Contributor[];
};

export {};
