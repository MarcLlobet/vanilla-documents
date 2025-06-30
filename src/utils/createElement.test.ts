import { describe, it, expect, vi } from "vitest";
import { createElement } from "./createElement";

describe("createElement", () => {
  it("creates a div with string child", () => {
    const el = createElement("hello");
    expect(el.tagName).toBe("DIV");
    expect(el.textContent).toBe("hello");
  });

  it("creates an element with type and className", () => {
    const el = createElement({ type: "span", className: "foo bar" }, "hi");
    expect(el.tagName).toBe("SPAN");
    expect(el.classList.contains("foo")).toBe(true);
    expect(el.classList.contains("bar")).toBe(true);
    expect(el.textContent).toBe("hi");
  });

  it("sets boolean and string attributes", () => {
    const el = createElement({ type: "input", required: true, value: "abc" });
    expect(el.getAttribute("required")).toBe("");
    expect(el.getAttribute("value")).toBe("abc");
  });

  it("sets inputType as type attribute", () => {
    const el = createElement({ type: "input", inputType: "number" });
    expect(el.getAttribute("type")).toBe("number");
  });

  it("sets event handlers", () => {
    const onClick = vi.fn();
    const el = createElement({ type: "button", onClick });
    el.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("appends multiple children", () => {
    const el = createElement({ type: "div" }, "a", "b");
    expect(el.childNodes.length).toBe(2);
  });
});
