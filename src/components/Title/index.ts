import { createElement } from "../../utils";
import { PageWrapper } from "../PageWrapper";
import "./style.css";

export function Title(title: string): HTMLElement {
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
      title,
    ),
  );

  return PageWrapper({
    children: header,
  });
}
