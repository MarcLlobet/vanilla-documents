import { describe, it, expect } from "vitest";
import { pageWrapper } from "./index";

describe("pageWrapper", () => {
  it("wraps single child", () => {
    const child = document.createElement("div");
    const el = pageWrapper({ align: "center" }, child);
    expect(el.contains(child)).toBe(true);
  });

  it("wraps multiple children", () => {
    const a = document.createElement("span");
    const b = document.createElement("span");
    const el = pageWrapper({ align: "center" }, a, b);
    expect(el.children.length).toBe(2);
  });

  it("applies alignment class", () => {
    const el = pageWrapper({ align: "center" }, document.createElement("div"));
    expect(el.className).toContain("vd-page-wrapper--center");
  });

  it("applies direction class", () => {
    const el = pageWrapper({ direction: "row" }, document.createElement("div"));
    expect(el.className).toContain("vd-page-wrapper--row");
  });
});
