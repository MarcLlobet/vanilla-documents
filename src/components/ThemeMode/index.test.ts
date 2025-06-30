import { describe, it, expect } from "vitest";
import { ColorSlider, DarkModeButton } from "./index";

describe("ColorSlider", () => {
  it("renders input[type=range]", () => {
    const el = ColorSlider();
    expect(el.tagName).toBe("INPUT");
    expect(el.getAttribute("type")).toBe("range");
  });

  it("changes --key-color-h on change", () => {
    const el = ColorSlider();
    document.documentElement.style.setProperty("--key-color-h", "0");
    (el as HTMLInputElement).value = "200";
    el.dispatchEvent(new Event("change"));
    expect(
      document.documentElement.style.getPropertyValue("--key-color-h"),
    ).toBe("200");
  });
});

describe("DarkModeButton", () => {
  it("toggles dark mode class", () => {
    document.body.classList.remove("dark-mode");
    const el = DarkModeButton();
    el.click();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    el.click();
    expect(document.body.classList.contains("dark-mode")).toBe(false);
  });
});
