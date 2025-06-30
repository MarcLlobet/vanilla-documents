import { describe, it, expect } from "vitest";
import { PageWrapper } from "./index";

describe("PageWrapper", () => {
  it("wraps single child", () => {
    const child = document.createElement("div");
    const el = PageWrapper({ children: child });
    expect(el.contains(child)).toBe(true);
  });

  it("wraps multiple children", () => {
    const a = document.createElement("span");
    const b = document.createElement("span");
    const el = PageWrapper({ children: [a, b] });
    expect(el.children.length).toBe(2);
  });

  it("applies alignment class", () => {
    const el = PageWrapper({
      children: document.createElement("div"),
      align: "center",
    });
    expect(el.className).toContain("vd-page-wrapper--center");
  });
});
