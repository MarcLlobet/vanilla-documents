import "./global.css";
import { HttpDocumentRepository } from "./infrastructure/httpDocumentRepository";
import { WsNotificationService } from "./infrastructure/wsNotificationService";
import { ListDocuments } from "./application/listDocuments";
import { NotificationContainer } from "./containers/NotificationContainer";
import { DocumentContainer } from "./containers/DocumentContainer";
import type { Document } from "./domain/document";
import { store } from "./state/store";
import { Title } from "./components/Title";
import { ColorSlider, DarkModeButton } from "./components/ThemeMode";
import { PageWrapper } from "./components";

const appRoot = document.querySelector<HTMLDivElement>("#app")!;
const repo = new HttpDocumentRepository();
const wsService = new WsNotificationService();
const listDocuments = new ListDocuments(repo);

listDocuments.execute().then((docs) => {
  store.dispatch({ type: "setDocuments", payload: docs });
  renderApp();
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

function renderApp() {
  appRoot.append(
    PageWrapper({
      children: [ColorSlider(), DarkModeButton()],
      align: "right",
    }),
  );
  appRoot.appendChild(NotificationContainer());
  appRoot.appendChild(Title("Documents"));
  appRoot.appendChild(DocumentContainer());
}
