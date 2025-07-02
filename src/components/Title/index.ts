import { createElement } from "../../utils";
import "./style.css";

export function Title(): HTMLElement {
  const header = createElement(
    {
      type: "header",
      className: "vd-header",
    },
    createElement(
      {
        type: "h1",
        className: `vd-title`,
      },
      "Documents",
    ),
  );

  return header;
}
