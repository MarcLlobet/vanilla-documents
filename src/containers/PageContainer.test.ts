import { describe, it, expect, vi, beforeEach } from "vitest";
import { PageContainer } from "./PageContainer";
import { initialState, createStore, Store } from "../state/store";
import * as components from "../components";

describe("PageContainer", () => {
  const store = createStore(initialState);

  beforeEach(() => {
    store.resetState();
    vi.clearAllMocks();
  });

  it("returns a fragment with a page element", () => {
    const fragment = PageContainer({ name: "TestPage", store }, () =>
      document.createElement("div"),
    );
    expect(fragment).toBeInstanceOf(DocumentFragment);
  });

  it("handles errors", () => {
    const FailError = new Error("Fail");

    const mockDispatch = vi.fn();
    const store = {
      dispatch: mockDispatch,
    } as unknown as Store;

    vi.spyOn(components, "pageWrapper").mockImplementation(() => {
      throw FailError;
    });

    PageContainer({ name: "TestPage", store }, () =>
      document.createElement("div"),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "addAlert",
        payload: expect.objectContaining({
          message: expect.stringContaining("Something went wrong"),
          details: FailError,
        }),
      }),
    );
  });
});
