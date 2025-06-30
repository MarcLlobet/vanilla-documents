import { describe, it, expect, vi } from "vitest";
import { Notification } from "./index";

describe("Notification", () => {
  it("renders text and icon", () => {
    const el = Notification({ text: "Hello", icon: "🔔" });
    expect(el.textContent).toContain("Hello");
    expect(el.querySelector(".vd-notification__icon")?.textContent).toBe("🔔");
  });

  it("renders badgeCount", () => {
    const el = Notification({ text: "Hi", badgeCount: 3 });
    expect(el.querySelector(".vd-notification__badge")?.textContent).toBe("3");
  });

  it("calls onClick", () => {
    const onClick = vi.fn();
    const el = Notification({ text: "Click", onClick });
    el.click();
    expect(onClick).toHaveBeenCalled();
  });
});
