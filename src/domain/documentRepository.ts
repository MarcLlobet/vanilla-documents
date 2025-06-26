export interface DocumentNotification {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Attachments: string[];
  Contributors: { ID: string; Name: string }[];
  Version: string;
}

export interface NotificationService {
  onNewDocument(callback: (notification: DocumentNotification) => void): void;
}
