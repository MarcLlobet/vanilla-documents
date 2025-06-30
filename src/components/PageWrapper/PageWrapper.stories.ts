import { createElement } from "../../utils";
import { PageWrapper, PageWrapperProps } from "./index";

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

example.style.border = "5px solid red";
example.style.width = "200px";

export default {
  title: "Components/PageWrapper",
  argTypes: {
    align: { control: "select", options: ["left", "center", "right"] },
  },
};

export const Default = (args: PageWrapperProps) =>
  PageWrapper({
    ...args,
    children: example,
  });
