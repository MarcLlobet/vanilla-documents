import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore, initialState } from "../state/store";
import { AlertContainer } from "./AlertContainer";

describe("DocumentContainer", () => {
  const store = createStore(initialState);
  beforeEach(() => {
    store.resetState();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("adds Alert", () => {
    const container = AlertContainer(store);

    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert",
        date: new Date(),
      },
    });

    const alert = container.querySelector(".vd-alert-row");

    expect(alert?.textContent).toEqual("🔔Custom alert");
  });

  it("removes Alert after a delay", async () => {
    const container = AlertContainer(store);

    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert",
        date: new Date(),
      },
    });

    vi.advanceTimersToNextTimer();

    const alert = container.querySelector(".vd-alert-row");

    expect(alert).toEqual(null);
  });

  it("logs Alert", () => {
    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert1",
        date: new Date("1234-12-30"),
      },
    });

    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert2",
        date: new Date("1234-12-30"),
      },
    });

    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert3",
        date: new Date("1234-12-30"),
      },
    });

    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Custom alert4",
        date: new Date("1234-12-30"),
      },
    });

    expect(store.getState().alerts).toEqual([
      expect.objectContaining({
        message: "Custom alert1",
      }),
      expect.objectContaining({
        message: "Custom alert2",
      }),
      expect.objectContaining({
        message: "Custom alert3",
      }),
      expect.objectContaining({
        message: "Custom alert4",
      }),
    ]);
  });
});
