import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationContainer } from "./NotificationContainer";
import { createStore, initialState } from "../state/store";
import { Document } from "../domain/document";

const store = createStore(initialState);

describe("NotificationContainer", () => {
  beforeEach(() => {
    store.resetState();
    vi.clearAllMocks();
  });

  it("returns a container element", () => {
    const container = NotificationContainer(store);
    expect(container).toBeInstanceOf(HTMLElement);
  });

  it("reacts to notificationCount changes", () => {
    const container = NotificationContainer(store);

    store.dispatch({
      type: "addNotificatedDocument",
      payload: {
        ID: "123",
        Title: "NotificatedDocument",
      } as Document,
    });

    expect(
      container.querySelector(".vd-notification__badge")?.textContent,
    ).toEqual("1");
  });
});
