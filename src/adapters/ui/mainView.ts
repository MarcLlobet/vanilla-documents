import { DocumentListView } from "./documentListView";
import { DocumentFormView } from "./documentFormView";
import type { Document } from "../../domain/document";

export class MainView {
  listView: DocumentListView;
  formView: DocumentFormView;
  notificationButton: HTMLButtonElement | null = null;
  pendingDocuments: Document[] = [];
  private showAddForm = false;
  private onFormSubmit: ((data: any) => void) | null = null;

  constructor(root: HTMLElement) {
    root.innerHTML = `
      <div class="doc-app">
        <div class="doc-app__notifbar">
          <button id="notif-btn" class="doc-app__notifbtn" style="display:none"></button>
        </div>
        <div id="notifications" class="doc-app__notifications" aria-live="polite"></div>
        <div id="list" class="doc-app__list"></div>
      </div>
    `;
    this.listView = new DocumentListView(document.getElementById("list")!);
    this.formView = new DocumentFormView(document.createElement("div")); // Placeholder, renderitzem dinàmicament
    this.notificationButton = document.getElementById(
      "notif-btn",
    ) as HTMLButtonElement;
    this.pendingDocuments = [];
  }

  setAddHandlers(onFormSubmit: (data: any) => void) {
    this.onFormSubmit = onFormSubmit;
    this.listView.setAddHandler(() => {
      this.showAddForm = true;
      this.renderAddForm();
    });
  }

  setShowAddForm(show: boolean) {
    this.showAddForm = show;
  }

  renderList(
    documents: Document[],
    sortOptions?: { key: keyof Document; label: string }[],
    sortKey?: keyof Document,
    sortOrder?: "asc" | "desc",
    viewMode: "list" | "grid" = "list",
  ) {
    this.listView.render(documents, sortOptions, sortKey, sortOrder, viewMode);
    if (this.showAddForm) this.renderAddForm(viewMode);
  }

  renderAddForm(viewMode: "list" | "grid" = "list") {
    const formContainer = this.listView.container.querySelector("#add-doc-form");
    if (formContainer && this.onFormSubmit) {
      this.formView.container = formContainer as HTMLElement;
      this.formView.render((data) => {
        this.showAddForm = false;
        this.setShowAddForm(false);
        this.onFormSubmit!(data);
      }, viewMode);
      // Focus accessible al primer input
      const firstInput = formContainer.querySelector("input");
      if (firstInput) (firstInput as HTMLElement).focus();

      // Handler per quan es cancel·la el formulari
      const cancelBtn = formContainer.querySelector("#doc-form__cancel") as HTMLButtonElement | null;
      if (cancelBtn) {
        cancelBtn.onclick = (e) => {
          e.preventDefault();
          this.showAddForm = false;
          this.setShowAddForm(false);
          // Elimina el formulari i mostra el botó "Afegeix document"
          formContainer.innerHTML = "";
          const addBtn = document.createElement("button");
          addBtn.id = "add-doc-btn";
          addBtn.className = "add-document-btn";
          addBtn.setAttribute("aria-label", "Afegeix un document");
          addBtn.textContent = "+ Afegir document";
          formContainer.appendChild(addBtn);
          // Assigna el handler original
          if ((this.listView.container as any).onAddClick) {
            addBtn.onclick = (this.listView.container as any).onAddClick;
          }
        };
      }
    }
  }

  showNotificationButton(count: number, onClick: () => void) {
    if (!this.notificationButton) return;
    this.notificationButton.textContent = `${count} document${count > 1 ? "s" : ""} added`;
    this.notificationButton.style.display = "inline-block";
    this.notificationButton.onclick = () => {
      this.notificationButton!.style.display = "none";
      onClick();
    };
  }
  hideNotificationButton() {
    if (this.notificationButton) this.notificationButton.style.display = "none";
  }
}
