import { describe, it, expect, vi, beforeEach } from "vitest";
import { DocumentContainer } from "./DocumentContainer";
import { createStore, initialState } from "../state/store";
import { Document } from "../domain/document";

describe("DocumentContainer", () => {
  const store = createStore(initialState);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets sort key", () => {
    const documentWrapper = DocumentContainer(store);
    store.dispatch({ type: "setSortKey", payload: "Version" });

    const sortKeySelect = documentWrapper.querySelector("#vd-doc-list__sort");
    const selectedOption = sortKeySelect?.querySelector("option[selected]");

    expect(selectedOption?.textContent).toEqual("Version");
  });

  it("sets view mode", () => {
    const documentWrapper = DocumentContainer(store);
    store.dispatch({ type: "setViewMode", payload: "grid" });

    const gridButton = documentWrapper.querySelector('img[alt="grid view"]');
    const isGridActive = gridButton?.parentElement?.classList.contains(
      "vd-doc__header-button--active",
    );

    expect(isGridActive).toBeTruthy();
  });

  it("adds document", () => {
    const documentWrapper = DocumentContainer(store);
    store.dispatch({
      type: "addDocument",
      payload: {
        ID: "123",
        Title: "AddedDocument",
        Contributors: [],
        Attachments: [],
        Version: "1.2.3",
        CreatedAt: "aaaa-mm-dd",
        UpdatedAt: "aaaa-mm-dd",
      } as Document,
    });

    const listBody = documentWrapper.querySelector("#list-body");
    const title = listBody?.querySelector(".vd-doc-list__title");

    expect(title?.textContent).toEqual("AddedDocument");
  });
});
