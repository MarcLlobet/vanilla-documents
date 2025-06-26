import type { Document } from "../../domain/document";

export class DocumentListView {
  public container: HTMLElement;
  private onAddClick: (() => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  setAddHandler(onAddClick: () => void) {
    this.onAddClick = onAddClick;
    (this.container as any).onAddClick = onAddClick;
  }

  render(
    documents: Document[],
    sortOptions?: { key: keyof Document; label: string }[],
    sortKey?: keyof Document,
    sortOrder?: "asc" | "desc",
    viewMode: "list" | "grid" = "list",
  ) {
    this.container.innerHTML = `
      <section class="doc-app">
        <header class="doc-app__header">
          <h1 class="doc-app__title">Documents</h1>
          <div class="doc-app__actions">
            ${
              sortOptions && sortKey && sortOrder
                ? `
              <span class="doc-app__sort-label">Sort by</span>
              <select id="sort-key" class="doc-app__sort" aria-label="Ordena per">
                ${sortOptions.map((opt) => `<option value="${opt.key}" ${sortKey === opt.key ? "selected" : ""}>${opt.label}</option>`).join("")}
              </select>
              <button id="sort-order" class="doc-app__sort-order" aria-label="Canvia ordre">${sortOrder === "asc" ? "↑" : "↓"}</button>
            `
                : ""
            }
            <button id="view-list" class="doc-app__view-btn" aria-label="Vista llista">📄</button>
            <button id="view-grid" class="doc-app__view-btn" aria-label="Vista graella">🔲</button>
          </div>
        </header>
        <div class="doc-app__table doc-app__table--${viewMode}">
          <div class="doc-table__head-row">
            <div class="doc-table__row">
              <div class="doc-table__cell doc-table__cell--head">Name</div>
              <div class="doc-table__cell doc-table__cell--head">Contributors</div>
              <div class="doc-table__cell doc-table__cell--head">Attachments</div>
            </div>
          </div>
          <div class="doc-table__body">
            ${documents
              .map((doc) => `
                <div class="doc-table__row">
                  <div class="doc-table__cell">
                    <div class="doc-table__title">${doc.Title}</div>
                    <div class="doc-table__version">${doc.Version}</div>
                  </div>
                  <div class="doc-table__cell doc-table__cell--contributors">${doc.Contributors.map((c) => c.Name).join(", ")}</div>
                  <div class="doc-table__cell doc-table__cell--attachments">${doc.Attachments.join(", ")}</div>
                </div>
              `)
              .join("")}
            <div class="doc-table__row doc-table__row--add">
              <div id="add-doc-form" class="add-doc-form">
                <button id="add-doc-btn" class="add-document-btn" aria-label="Afegeix un document">+ Add document</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Assigna el handler només al botó
    const btn = this.container.querySelector("#add-doc-btn") as HTMLButtonElement | null;
    if (btn && this.onAddClick) btn.onclick = this.onAddClick;
  }
}
