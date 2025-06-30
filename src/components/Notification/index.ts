import { createElement } from "../../utils";
import "./style.css";

export interface NotificationProps {
  text: string;
  icon?: string;
  badgeCount?: number;
  onClick?: () => void;
}

export function Notification({
  text,
  icon = "ℹ️",
  badgeCount,
  onClick,
}: NotificationProps): HTMLElement {
  return createElement(
    {
      type: "button",
      className: `vd-notification doc-app__notifbtn`,
      onClick,
    },
    createElement(
      {
        className: "vd-notification__img",
      },
      ...(icon
        ? [
            createElement(
              {
                type: "span",
                className: "vd-notification__icon",
              },
              icon,
            ),
          ]
        : []),
      ...(typeof badgeCount === "number"
        ? [
            createElement(
              {
                type: "span",
                className: "vd-notification__badge",
              },
              `${badgeCount}`,
            ),
          ]
        : []),
    ),
    createElement(
      {
        type: "span",
        className: "vd-notification__text",
      },
      text,
    ),
  );
}
