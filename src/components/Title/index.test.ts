import { describe, it, expect } from "vitest";
import { Title } from "./index";

describe("Title", () => {
  it("renders h1 with text", () => {
    const el = Title();
    expect(el.querySelector("h1")?.textContent).toBe("Documents");
  });
});
