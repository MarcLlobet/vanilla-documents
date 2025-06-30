import { Notification, PageWrapper } from "../components";
import { store } from "../state/store";
import { createElement } from "../utils";

type RenderProps = {
  notificationCount: number;
  onClick: () => void;
};

export const NotificationContainer = () => {
  const container = document.createElement("div");

  const render = ({ notificationCount, onClick }: RenderProps) => {
    container.innerHTML = "";
    const notifContainer = createElement({
      id: "notification-area",
    });
    const notificationWrapper = PageWrapper({
      children: notifContainer,
      align: "center",
    });
    notificationWrapper.classList.add("doc-app");

    if (notificationCount > 0) {
      const notif = Notification({
        text: `new document${notificationCount > 1 ? "s" : ""}`,
        icon: "🔔",
        badgeCount: notificationCount,
        onClick,
      });
      notifContainer.appendChild(notif);
    }

    container.appendChild(notificationWrapper);
  };

  const onClick = () => {
    const state = store.getState();
    if (state.notificatedDocuments.length > 0) {
      const newDocs = [...state.notificatedDocuments, ...state.documents];
      store.dispatch({ type: "setDocuments", payload: newDocs });
      store.dispatch({ type: "clearNotificatedDocuments" });
    }
  };

  store.subscribe((state, prev) => {
    if (state.notificationCount !== prev.notificationCount) {
      render({
        notificationCount: state.notificationCount,
        onClick,
      });
    }
  });

  render({
    notificationCount: store.getState().notificationCount,
    onClick,
  });

  return container;
};
