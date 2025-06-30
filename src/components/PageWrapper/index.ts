import "./style.css";

export interface PageWrapperProps {
  children: HTMLElement | HTMLElement[];
  align?: "left" | "center" | "right";
}

export function PageWrapper({
  children,
  align,
}: PageWrapperProps): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("vd-page-wrapper");

  if (align) {
    wrapper.classList.add(`vd-page-wrapper--${align}`);
  }

  if (Array.isArray(children)) {
    wrapper.append(...children);
  } else {
    wrapper.appendChild(children);
  }
  return wrapper;
}
