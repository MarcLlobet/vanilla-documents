import {
  DocumentControls,
  DocumentList,
  DocumentForm,
  AddDocumentButton,
  addDocumentRow,
} from "../components";
import { store } from "../state/store";
import { sortDocuments } from "../application/sortDocuments";

const SORT_OPTIONS = [
  { key: "Title", label: "Name" },
  { key: "Version", label: "Version" },
  { key: "UpdatedAt", label: "Date" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["key"];

const getFullDate = () => {
  const fullDate = new Date();
  const day = fullDate.getUTCDate().toString().padStart(2, "0");
  const month = fullDate.getUTCMonth().toString().padStart(2, "0");
  const year = fullDate.getUTCFullYear();

  return `${year}-${month}-${day}`;
};

const addArea = () => {
  const addButton = AddDocumentButton({
    label: "+ Add document",
    onClick: () => handleAddButtonClick(),
  });

  const handleAddButtonClick = () => {
    const listBody = addButton.closest("#list-body");
    const addButtonRow = addButton.closest(".vd-doc-list__row--add");

    const documentForm = DocumentForm({
      onSubmit: (documentData) => {
        const date = getFullDate();
        const newDocument = {
          ...documentData,
          CreatedAt: date,
          UpdatedAt: date,
          ID: `document-${Math.round(Math.random() * 1000)}`,
        };
        const newDocumentRow = addDocumentRow(newDocument);
        listBody?.insertBefore(newDocumentRow, addButtonRow);

        store.dispatch({ type: "addDocument", payload: newDocument });
      },
      onCancel: () => {
        addButtonRow?.replaceChild(addButton, documentForm);
      },
    });

    addButtonRow?.replaceChild(documentForm, addButton);
  };

  return addButton;
};

export const DocumentContainer = () => {
  const container = document.createElement("div");

  const renderControls = () => {
    const state = store.getState();
    const oldDocumentControls = container.querySelector("#documentControls");

    const documentControls = DocumentControls({
      documentControlsId: "documentControls",
      sortOptions: SORT_OPTIONS.slice(),
      sortKey: state.sortKey,
      sortOrder: state.sortOrder,
      viewMode: state.viewMode,
      onSortKeyChange: (key) =>
        store.dispatch({ type: "setSortKey", payload: key as SortKey }),
      onSortOrderChange: (order) =>
        store.dispatch({ type: "setSortOrder", payload: order }),
      onViewModeChange: (mode) =>
        store.dispatch({ type: "setViewMode", payload: mode }),
    });

    if (oldDocumentControls) {
      oldDocumentControls.replaceWith(documentControls);
    } else {
      container.appendChild(documentControls);
    }

    return documentControls;
  };

  const renderDocuments = () => {
    const state = store.getState();
    const oldDocumentList = container.querySelector("#documentList");
    const sortedDocs = sortDocuments(
      state.documents,
      state.sortKey,
      state.sortOrder,
    );

    const documentList = DocumentList({
      documentListId: "documentList",
      documents: sortedDocs,
      addArea: () => addArea(),
      viewMode: state.viewMode,
    });

    if (oldDocumentList) {
      oldDocumentList.replaceWith(documentList);
    } else {
      container.appendChild(documentList);
    }

    return documentList;
  };

  renderControls();
  let currentDocuments = renderDocuments();

  store.subscribe((state, prev) => {
    if (state.viewMode !== prev.viewMode) {
      renderControls();
      currentDocuments.controls.toggleView();
    }

    if (state.documents !== prev.documents) {
      currentDocuments = renderDocuments();
    }

    if (state.sortKey !== prev.sortKey || state.sortOrder !== prev.sortOrder) {
      renderControls();
      currentDocuments = renderDocuments();
    }
  });

  return container;
};
