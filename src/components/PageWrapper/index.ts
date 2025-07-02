import { createElement } from "../../utils";
import "./style.css";

export type PageWrapperProps = {
  align?: "left" | "center" | "right";
  direction?: "row" | "column";
};
export type PageWrapperChildren = HTMLElement | Node;

type PageWrapper = (
  _arg0: PageWrapperProps,
  ..._arg1: PageWrapperChildren[]
) => HTMLElement;

export const pageWrapper: PageWrapper = ({ align, direction }, ...children) => {
  const wrapper = createElement({
    className: "vd-page-wrapper",
  });

  if (direction && direction !== "column") {
    wrapper.classList.add(`vd-page-wrapper--${direction}`);
  }

  if (align && align !== "left") {
    wrapper.classList.add(`vd-page-wrapper--${align}`);
  }

  wrapper.append(...children);

  return wrapper;
};
