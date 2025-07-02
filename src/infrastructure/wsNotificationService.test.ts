import { describe, it, expect, vi } from "vitest";
import { WsNotificationService } from "./wsNotificationService";
import { Document } from "../domain/document";

vi.spyOn(globalThis, "WebSocket").mockImplementation(
  function mockWebSocket(url) {
    return {
      url,
      onmessage: () => {},
      sendMessage(
        this: { onmessage: (_arg0: { data: string }) => void },
        data: object,
      ) {
        this.onmessage?.({
          data: JSON.stringify(data),
        });
      },
    } as unknown as WebSocket;
  },
);

describe("WsNotificationService", () => {
  it("calls callback on new document", () => {
    const service = new WsNotificationService();
    const notif: Document = {
      ID: "1",
      Title: "Doc",
      Version: "1.0.0",
      CreatedAt: "2024-01-01",
      UpdatedAt: "2024-01-01",
      Attachments: [],
      Contributors: [],
    };
    let called = false;
    service.onNewDocument((n) => {
      called = true;
      expect(n).toEqual(notif);
    });
    // @ts-expect-error: access private ws
    service.ws.sendMessage(notif);
    expect(called).toBe(true);
  });
});
