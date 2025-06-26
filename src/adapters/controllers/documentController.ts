import type { Document } from "../../domain/document";
import { ListDocuments } from "../../application/listDocuments";
import { CreateDocument } from "../../application/createDocument";
import { sortDocuments } from "../../application/sortDocuments";
import { MainView } from "../ui/mainView";

export class DocumentController {
  docs: Document[] = [];
  pendingDocuments: Document[] = [];
  private static readonly sortOptions = [
    { key: "Title", label: "Nom" },
    { key: "Version", label: "Versió" },
    { key: "CreatedAt", label: "Data" },
  ] as const;
  sortKey: keyof Document = "CreatedAt";
  sortOrder: "asc" | "desc" = "desc";
  viewMode: "list" | "grid" = "list";
  view: MainView;
  listDocuments: ListDocuments;
  createDocument: CreateDocument;
  constructor(
    listDocuments: ListDocuments,
    createDocument: CreateDocument,
    view: MainView,
  ) {
    this.listDocuments = listDocuments;
    this.createDocument = createDocument;
    this.view = view;
  }

  async init() {
    this.docs = await this.listDocuments.execute();
    this.view.setAddHandlers(async (data) => {
      const doc = await this.createDocument.execute(data);
      this.docs.unshift(doc);
      this.render();
    });
    this.render();
    this.setupSorting();
  }

  render() {
    const sorted = sortDocuments(this.docs, this.sortKey, this.sortOrder);
    this.view.renderList(
      sorted,
      Array.from(DocumentController.sortOptions),
      this.sortKey,
      this.sortOrder,
      this.viewMode,
    );
    // Gestiona la classe de vista a l'arrel de la taula
    const table = document.querySelector(".doc-app__table");
    if (table) {
      table.classList.remove("doc-app__table--list", "doc-app__table--grid");
      table.classList.add(`doc-app__table--${this.viewMode}`);
    }
    this.setupSorting();
    this.setupViewMode();
  }

  setupSorting() {
    const sortKeySelect = document.getElementById(
      "sort-key",
    ) as HTMLSelectElement | null;
    const sortOrderBtn = document.getElementById(
      "sort-order",
    ) as HTMLButtonElement | null;
    if (!sortKeySelect || !sortOrderBtn) return;
    sortKeySelect.innerHTML = DocumentController.sortOptions
      .map(
        (opt) =>
          `<option value="${opt.key}" ${this.sortKey === opt.key ? "selected" : ""}>${opt.label}</option>`,
      )
      .join("");
    sortKeySelect.value = this.sortKey;
    sortOrderBtn.textContent = this.sortOrder === "asc" ? "⬆️" : "⬇️";
    sortKeySelect.onchange = (e) => {
      this.sortKey = (e.target as HTMLSelectElement).value as keyof Document;
      this.render();
    };
    sortOrderBtn.onclick = () => {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      sortOrderBtn.textContent = this.sortOrder === "asc" ? "↑" : "↓";
      this.render();
    };
  }

  setupViewMode() {
    const btnList = document.getElementById(
      "view-list",
    ) as HTMLButtonElement | null;
    const btnGrid = document.getElementById(
      "view-grid",
    ) as HTMLButtonElement | null;
    if (!btnList || !btnGrid) return;
    btnList.classList.toggle("active", this.viewMode === "list");
    btnGrid.classList.toggle("active", this.viewMode === "grid");
    btnList.onclick = () => {
      this.viewMode = "list";
      this.render();
    };
    btnGrid.onclick = () => {
      this.viewMode = "grid";
      this.render();
    };
  }

  addDocumentFromNotification(doc: Document) {
    if (
      !this.docs.some((d) => d.ID === doc.ID) &&
      !this.pendingDocuments.some((d) => d.ID === doc.ID)
    ) {
      this.pendingDocuments.push(doc);
    }
    this.view.showNotificationButton(this.pendingDocuments.length, async () => {
      const allDocs = [
        ...this.docs,
        ...this.pendingDocuments.filter(
          (d) => !this.docs.some((existing) => existing.ID === d.ID),
        ),
      ];
      this.docs = sortDocuments(allDocs, this.sortKey, this.sortOrder);
      this.pendingDocuments = [];
      this.render();
      this.view.hideNotificationButton();
    });
  }
}

function mergeDocuments(base: Document[], toAdd: Document[]): Document[] {
  const ids = new Set(base.map((d) => d.ID));
  const merged = [...base];
  for (const doc of toAdd) {
    if (!ids.has(doc.ID)) merged.push(doc);
  }
  return merged;
}
