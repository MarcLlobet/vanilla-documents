import Documents from "./documents.json" with { type: "json" };
import Notification from "./notification.json" with { type: "json" };

export const getDocuments = () => Documents;

export const getNotification = () => Notification;
export const getNotificationGetter = () => {
  let i = 0;
  const getNotificationClosure = () => {
    const notification = getNotification();
    notification.ID = `${i}`;
    ++i;
    return notification;
  };
  return getNotificationClosure;
};
