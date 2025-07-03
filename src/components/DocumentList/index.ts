import "./style.css";
import type { Document } from "../../application/document";
import { createElement } from "../../utils";

export interface DocumentListProps {
  documentListId: string;
  documents: Document[];
  addArea?: () => HTMLElement;
  viewMode: "list" | "grid";
}

export type GridViewWrapper = HTMLElement & {
  controls: {
    toggleView: () => void;
    isGridViewShown: () => boolean;
  };
};

export const addDocumentRow = (document: Document) =>
  createElement(
    {
      className: "vd-doc-list__row",
    },
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      createElement(
        {
          className: "vd-doc-list__title",
        },
        document.Title,
      ),
      createElement(
        {
          className: "vd-doc-list__version",
        },
        document.Version,
      ),
    ),
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      document.Contributors.map((contributors) => contributors.Name).join(", "),
    ),
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      document.Attachments.join(", "),
    ),
  );

export function DocumentList({
  documentListId,
  documents,
  addArea,
  viewMode,
}: DocumentListProps): GridViewWrapper {
  const listWrapper = createElement({
    id: documentListId,
    className: "vd-doc-list-wrapper",
  });

  if (viewMode === "grid") {
    listWrapper.classList.add("vd-doc-list--grid");
  }

  const listHeader = createElement(
    {
      className: "vd-doc-list vd-doc-list__head-row",
    },
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      "Name",
    ),
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      "Contributors",
    ),
    createElement(
      {
        className: "vd-doc-list__cell",
      },
      "Attachments",
    ),
  );

  const listBody = createElement({
    id: "list-body",
    "data-testid": "list-body",
    className: "vd-doc-list",
  });

  const addButtonRow = createElement(
    {
      className: "vd-doc-list__row vd-doc-list__row--add",
    },
    ...(addArea ? [addArea()] : []),
  );

  listBody.append(
    ...documents.map(addDocumentRow),
    ...(addArea ? [addButtonRow] : []),
  );

  listWrapper.append(listHeader, listBody);

  (listWrapper as GridViewWrapper).controls = {
    isGridViewShown: () => listWrapper.classList.contains("vd-doc-list--grid"),
    toggleView: () => {
      listWrapper.classList.toggle("vd-doc-list--grid");
    },
  };

  return listWrapper as GridViewWrapper;
}
