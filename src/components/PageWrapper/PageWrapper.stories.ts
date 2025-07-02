import { createElement } from "../../utils";
import { pageWrapper, PageWrapperProps } from "./index";

const example = createElement(
  createElement(
    {
      type: "h1",
    },
    "Example Content",
  ),
  createElement(
    {
      type: "p",
    },
    "This is an example of content inside the PageWrapper.",
  ),
);

example.style.width = "200px";
example.style.border = "5px solid red";

const example2 = example.cloneNode(true) as HTMLElement;
example2.style.border = "5px solid green";

export default {
  title: "Components/PageWrapper",
  argTypes: {
    align: { control: "radio", options: ["left", "center", "right"] },
    direction: { control: "radio", options: ["row", "column"] },
  },
};

export const Default = (args: PageWrapperProps) =>
  pageWrapper(
    {
      ...args,
    },
    example,
    example2,
  );
