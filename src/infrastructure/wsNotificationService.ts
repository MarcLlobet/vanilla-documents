import type {
  DocumentNotification,
  NotificationService,
} from "../domain/documentRepository";

export class WsNotificationService implements NotificationService {
  private ws: WebSocket | null = null;
  onNewDocument(callback: (_notification: DocumentNotification) => void): void {
    this.ws = new WebSocket("ws://localhost:8080/notifications");
    this.ws.onmessage = (event) => {
      const notif = JSON.parse(event.data);
      callback(notif);
    };
  }
}
