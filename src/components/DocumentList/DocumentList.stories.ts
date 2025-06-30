import { DocumentList, DocumentListProps } from "./index";
import type { Document } from "../../domain/document";
import { createElement } from "../../utils";

const mockDocs: Document[] = [
  {
    ID: "1",
    Title: "Doc 1",
    Version: "1.0.0",
    CreatedAt: "2024-01-01",
    UpdatedAt: "2024-01-01",
    Attachments: ["A", "B"],
    Contributors: [{ ID: "c1", Name: "Anna" }],
  },
  {
    ID: "2",
    Title: "Doc 2",
    Version: "2.1.0",
    CreatedAt: "2024-02-01",
    UpdatedAt: "2024-02-01",
    Attachments: ["C"],
    Contributors: [{ ID: "c2", Name: "Marc" }],
  },
  {
    ID: "3",
    Title: "Doc 3",
    Version: "3.1.0",
    CreatedAt: "2025-02-01",
    UpdatedAt: "2025-02-01",
    Attachments: ["D", "E", "F"],
    Contributors: [{ ID: "c3", Name: "John" }],
  },
];

export default {
  title: "Components/DocumentList",
  argTypes: {
    viewMode: { type: "select", options: ["list", "grid"] },
  },
};

export const Default = (args: DocumentListProps) =>
  DocumentList({
    ...args,
    documents: mockDocs,
  });

export const addArea = (args: DocumentListProps) => {
  const addedArea = () =>
    createElement(
      {
        type: "button",
        onClick: () => alert("Custom functionality!"),
      },
      "Custom piece of UI",
    );

  const documentList = DocumentList({
    ...args,
    documents: mockDocs,
    addArea: () => addedArea(),
  });
  return documentList;
};
