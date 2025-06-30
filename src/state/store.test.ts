import { describe, it, expect } from "vitest";
import { reducer, initialState, createStore } from "./store";
import type { Document } from "../domain/document";

const doc: Document = {
  ID: "1",
  Title: "Doc",
  Version: "1.0.0",
  CreatedAt: "2024-01-01",
  UpdatedAt: "2024-01-02",
  Attachments: ["A"],
  Contributors: [{ ID: "c1", Name: "Anna" }],
};

describe("reducer", () => {
  it("sets sortKey", () => {
    const state = reducer(initialState, {
      type: "setSortKey",
      payload: "Title",
    });
    expect(state.sortKey).toBe("Title");
  });

  it("sets sortOrder", () => {
    const state = reducer(initialState, {
      type: "setSortOrder",
      payload: "desc",
    });
    expect(state.sortOrder).toBe("desc");
  });

  it("sets viewMode", () => {
    const state = reducer(initialState, {
      type: "setViewMode",
      payload: "grid",
    });
    expect(state.viewMode).toBe("grid");
  });

  it("sets documents", () => {
    const state = reducer(initialState, {
      type: "setDocuments",
      payload: [doc],
    });
    expect(state.documents).toEqual([doc]);
  });

  it("adds document", () => {
    const state = reducer(initialState, { type: "addDocument", payload: doc });
    expect(state.documents[0]).toEqual(doc);
  });

  it("adds notificated document and increments count", () => {
    const state = reducer(initialState, {
      type: "addNotificatedDocument",
      payload: doc,
    });
    expect(state.notificatedDocuments[0]).toEqual(doc);
    expect(state.notificationCount).toBe(1);
  });

  it("clears notificated documents", () => {
    const withNotif = {
      ...initialState,
      notificatedDocuments: [doc],
      notificationCount: 1,
    };
    const state = reducer(withNotif, { type: "clearNotificatedDocuments" });
    expect(state.notificatedDocuments).toEqual([]);
    expect(state.notificationCount).toBe(0);
  });
});

describe("createStore", () => {
  it("getState returns initial", () => {
    const store = createStore(initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it("dispatch updates state", () => {
    const store = createStore(initialState);
    store.dispatch({ type: "setSortKey", payload: "Title" });
    expect(store.getState().sortKey).toBe("Title");
  });

  it("subscribe is called on state change", () => {
    const store = createStore(initialState);
    let called = false;
    store.subscribe(() => {
      called = true;
    });
    store.dispatch({ type: "setSortKey", payload: "Title" });
    expect(called).toBe(true);
  });

  it("unsubscribe removes listener", () => {
    const store = createStore(initialState);
    let called = 0;
    const unsub = store.subscribe(() => {
      called++;
    });
    store.dispatch({ type: "setSortKey", payload: "Title" });
    unsub();
    store.dispatch({ type: "setSortKey", payload: "Version" });
    expect(called).toBe(1);
  });
});
