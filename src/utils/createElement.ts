type CreateElementProps = Partial<{
  type: string;
  className: string;
  onClick: (_ev: MouseEvent) => void;
  id: string;
  for: string;
  value: string;
  onChange: (_ev: Event) => void;
  selected: boolean;
  name: string;
  autocomplete: "on" | "off";
  required: boolean;
  inputType: string;
  min: string;
  max: string;
  step: string;
  pattern: string;
  src: string;
  disabled: boolean;
  alt: string;
  style: string;
}>;
type CreateElementChild = Node | string;
type CreateElement = (
  _arg0: CreateElementProps | Node | string,
  ..._arg1: CreateElementChild[]
) => HTMLElement;

export const createElement: CreateElement = (firstArgument, ...children) => {
  if (
    firstArgument instanceof HTMLElement ||
    typeof firstArgument === "string"
  ) {
    const element = document.createElement("div");
    const innerHTML = [firstArgument, ...children];
    element.append(...innerHTML);
    return element;
  }

  const { type, className, onClick, onChange, ...options } =
    firstArgument as CreateElementProps;

  const element = document.createElement(type ?? "div");

  if (className) {
    element.classList.add(...className.split(" "));
  }

  if (onClick) {
    element.onclick = onClick;
  }
  if (onChange) {
    element.onchange = onChange;
  }

  Object.entries(options as Record<string, string | boolean>).forEach(
    ([key, value]) => {
      if (typeof value === "boolean") {
        if (value === true) {
          return element.setAttribute(key, "");
        }
        return;
      }

      if (key === "inputType") {
        return element.setAttribute("type", value);
      }

      element.setAttribute(key, value);
    },
  );

  if (children.length) {
    element.append(...children);
  }

  return element;
};
