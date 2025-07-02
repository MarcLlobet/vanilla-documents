import type { Document } from "../domain/document";
export interface NotificationService {
  onNewDocument(_callback: (_notification: Document) => void): void;
}

export class WsNotificationService implements NotificationService {
  ws: WebSocket;
  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/notifications");
  }

  onNewDocument(callback: (_notification: Document) => void): void {
    this.ws.onmessage = (event) => {
      const notif: Document = JSON.parse(event.data);
      callback(notif);
    };
  }
}
