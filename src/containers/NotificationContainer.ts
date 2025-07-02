import { Container } from ".";
import { Notification } from "../components";
import { createElement } from "../utils";

type RenderProps = {
  notificationCount: number;
  onClick: () => void;
};

export const NotificationContainer: Container = (store) => {
  const container = createElement({
    className: "doc-app",
  });

  const render = ({ notificationCount, onClick }: RenderProps) => {
    const notifContainer = createElement({
      id: "notification-area",
    });

    if (notificationCount > 0) {
      const notif = Notification({
        text: `new document${notificationCount > 1 ? "s" : ""}`,
        icon: "🔔",
        badgeCount: notificationCount,
        onClick,
      });
      notifContainer.appendChild(notif);
    }

    const oldNotifications = container.querySelector("#notification-area");

    if (!oldNotifications) {
      container.appendChild(notifContainer);
    } else {
      oldNotifications.replaceWith(notifContainer);
    }
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
