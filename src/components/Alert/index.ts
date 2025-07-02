import { createElement } from "../../utils";
import "./style.css";

export interface AlertProps {
  text: string;
  icon?: string;
  badgeCount?: number;
  onClick?: () => void;
}

export const AlertWrapper = () =>
  createElement({
    className: "vd-alert-wrapper",
  });

export function Alert({ text, icon = "ℹ️" }: AlertProps): HTMLElement {
  return createElement(
    {
      className: "vd-alert-row",
    },
    createElement(
      {
        type: "button",
        className: `vd-alert doc-app__notifbtn`,
      },
      createElement(
        {
          className: "vd-alert__img",
        },
        ...(icon
          ? [
              createElement(
                {
                  type: "span",
                  className: "vd-alert__icon",
                },
                icon,
              ),
            ]
          : []),
      ),
      createElement(
        {
          type: "span",
          className: "vd-alert__text",
        },
        text,
      ),
    ),
  );
}
