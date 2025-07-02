import { ListDocuments } from "../application/listDocuments";
import { Document } from "../domain/document";
import { HttpDocumentRepository } from "../infrastructure/httpDocumentRepository";
import { WsNotificationService } from "../infrastructure/wsNotificationService";
import { Store } from "../state/store";

export const documentsService = (store: Store) => {
  const repo = new HttpDocumentRepository();
  const listDocuments = new ListDocuments(repo);

  listDocuments.execute().then(
    (docs) => {
      store.dispatch({ type: "setDocuments", payload: docs });
    },
    () => {
      store.dispatch({
        type: "addAlert",
        payload: {
          message: "Documents service is not working",
          date: new Date(),
        },
      });
    },
  );
};

export const notificationsService = (store: Store) => {
  const wsService = new WsNotificationService();

  wsService.ws.addEventListener("error", () => {
    store.dispatch({
      type: "addAlert",
      payload: {
        message: "Notifications service is not working",
        date: new Date(),
      },
    });
  });

  wsService.onNewDocument((docNotif) => {
    const doc: Document = {
      ID: docNotif.ID,
      Title: docNotif.Title,
      Version: docNotif.Version,
      CreatedAt: docNotif.CreatedAt,
      UpdatedAt: docNotif.UpdatedAt,
      Attachments: docNotif.Attachments,
      Contributors: docNotif.Contributors,
    };

    const state = store.getState();

    if (
      !state.documents.some((d) => d.ID === doc.ID) &&
      !state.notificatedDocuments.some((d) => d.ID === doc.ID)
    ) {
      store.dispatch({ type: "addNotificatedDocument", payload: doc });
    }
  });
};

export const ServicesContainer = (store: Store) => {
  documentsService(store);

  notificationsService(store);
};
