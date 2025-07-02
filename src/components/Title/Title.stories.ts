import { Title } from ".";
import { createElement } from "../../utils";

export default {
  title: "Components/Typography",
};

export const Default = () =>
  createElement(
    {
      style:
        "display: flex; flex-direction: column; justify-content: flex-start;",
    },
    Title(),
    createElement(
      {
        type: "label",
      },
      "Label",
    ),
    createElement(
      {
        type: "b",
      },
      "Bold text",
    ),
    createElement(
      {
        type: "p",
      },
      "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ),
  );
