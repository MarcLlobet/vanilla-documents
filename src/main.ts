import "./style.css";
import { HttpDocumentRepository } from "./infrastructure/httpDocumentRepository";
import { WsNotificationService } from "./infrastructure/wsNotificationService";
import { ListDocuments } from "./application/listDocuments";
import { CreateDocument } from "./application/createDocument";
import { MainView } from "./adapters/ui/mainView";
import { DocumentController } from "./adapters/controllers/documentController";
import { NotificationController } from "./adapters/controllers/notificationController";

const appRoot = document.querySelector<HTMLDivElement>("#app")!;
const mainView = new MainView(appRoot);
const repo = new HttpDocumentRepository();
const wsService = new WsNotificationService();
const listDocuments = new ListDocuments(repo);
const createDocument = new CreateDocument(repo);
const docController = new DocumentController(
  listDocuments,
  createDocument,
  mainView,
);
const notifController = new NotificationController(
  wsService,
  mainView,
  docController,
);

docController.init();
notifController.listen();
