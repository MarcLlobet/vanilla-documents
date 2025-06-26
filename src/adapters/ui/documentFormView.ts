import type { Contributor } from "../../domain/document";

export class DocumentFormView {
  public container: HTMLElement;
  constructor(container: HTMLElement) {
    this.container = container;
  }

  private buildDocumentFromForm(form: HTMLFormElement): {
    Title: string;
    Version: string;
    Attachments: string[];
    Contributors: Contributor[];
    UpdatedAt: string;
  } {
    const formData = new FormData(form);
    const major = Math.max(Number(formData.get("version-major")) || 1, 0);
    const minor = Math.max(Number(formData.get("version-minor")) || 0, 0);
    const patch = Math.max(Number(formData.get("version-patch")) || 0, 0);
    return {
      Title: this.getStringField(formData, "title"),
      Version: `${major}.${minor}.${patch}`,
      Attachments: this.getStringArrayField(formData, "attachments"),
      Contributors: this.getContributorsField(formData, "contributors"),
      UpdatedAt: this.getStringField(formData, "updatedAt"),
    };
  }

  private getStringField(formData: FormData, field: string): string {
    return ((formData.get(field) as string) || "").trim();
  }

  private getStringArrayField(formData: FormData, field: string): string[] {
    return ((formData.get(field) as string) || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  private getContributorsField(
    formData: FormData,
    field: string,
  ): Contributor[] {
    return ((formData.get(field) as string) || "")
      .split(",")
      .map((name, i) => ({ ID: `${i}`, Name: name.trim() }))
      .filter((c) => c.Name);
  }

  render(
    onSubmit: (data: {
      Title: string;
      Version: string;
      Attachments: string[];
      Contributors: Contributor[];
      UpdatedAt: string;
    }) => void,
    viewMode: "list" | "grid" = "list"
  ) {
    // Obté la data actual en format yyyy-mm-dd
    const today = new Date().toISOString().split("T")[0];
    this.container.innerHTML = `
      <div class="doc-table__row" aria-labelledby="doc-form__submit">
        <form id="doc-form" class="doc-form__form" autocomplete="off">
          <div class="doc-form__group">
            <div class="doc-form__group doc-form__group--inputs">
              <div class="doc-form__group">
                <div class="doc-form__label-input">
                  <label for="title" class="doc-form__label">Name</label>
                  <input id="title" name="title" class="doc-form__input" required type="text" />
                </div>
                <div class="doc-form__group">
                  <div class="doc-form__label-input">
                    <label class="doc-form__label" for="version-major">Version</label>
                    <div class="doc-form__version-fields-under">
                      <input id="version-major" name="version-major" class="doc-form__input doc-form__input--version-under" type="number" min="0" value="1" required aria-label="Versió major" />
                      <span class="doc-form__version-dot">.</span>
                      <input id="version-minor" name="version-minor" class="doc-form__input doc-form__input--version-under" type="number" min="0" value="0" required aria-label="Versió menor" />
                      <span class="doc-form__version-dot">.</span>
                      <input id="version-patch" name="version-patch" class="doc-form__input doc-form__input--version-under" type="number" min="0" value="0" required aria-label="Versió patch" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="doc-form__group">
                <div class="doc-form__label-input">
                  <label for="contributors" class="doc-form__label">Contributors</label>
                  <input id="contributors" name="contributors" class="doc-form__input" type="text" required />
                </div>
                <div class="doc-form__label-input">
                  <label for="updatedAt" class="doc-form__label">Date</label>
                  <input id="updatedAt" name="updatedAt" class="doc-form__input" type="date" value="${today}" required />
                </div>
              </div>
              <div class="doc-form__label-input">
                <label for="attachments" class="doc-form__label">Attachments</label>
                <input id="attachments" name="attachments" class="doc-form__input" type="text" required />
              </div>
            </div>
            <div class="doc-form__group doc-form__group--buttons">
              <button id="doc-form__cancel" type="button" class="doc-form__cancel">Cancel</button>
              <button id="doc-form__submit" type="submit" class="doc-form__submit">Create document</button>
            </div>
          </div>
        </form>
      </div>
    `;
    const form = this.container.querySelector("form")!;
    form.onsubmit = (e) => {
      e.preventDefault();
      const docData = this.buildDocumentFromForm(form);
      onSubmit(docData);
      form.reset();
    };
    // Handler pel botó cancel·lar
    const cancelBtn = this.container.querySelector("#doc-form__cancel") as HTMLButtonElement | null;
    if (cancelBtn) {
      cancelBtn.onclick = (e) => {
        e.preventDefault();
        // Eliminar el formulari i tornar a mostrar el botó "Afegeix document"
        this.container.innerHTML = "";
        // El contenidor pare sempre té id="add-doc-form"
        const addBtn = document.createElement("button");
        addBtn.id = "add-doc-btn";
        addBtn.className = "add-document-btn";
        addBtn.setAttribute("aria-label", "Afegeix un document");
        addBtn.textContent = "+ Afegir document345";
        this.container.appendChild(addBtn);
        // Simula el click handler original si existeix
        if ((this.container as any).onAddClick) {
          addBtn.onclick = (this.container as any).onAddClick;
        }
      };
    }
  }
}
