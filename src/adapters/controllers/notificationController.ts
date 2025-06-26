import { WsNotificationService } from "../../infrastructure/wsNotificationService";
import { MainView } from "../ui/mainView";
import { DocumentController } from "./documentController";

export class NotificationController {
  wsService: WsNotificationService;
  view: MainView;
  docController: DocumentController;
  constructor(
    wsService: WsNotificationService,
    view: MainView,
    docController: DocumentController,
  ) {
    this.wsService = wsService;
    this.view = view;
    this.docController = docController;
  }

  listen() {
    this.wsService.onNewDocument((notif) => {
      this.docController.addDocumentFromNotification(notif);
    });
  }
}
