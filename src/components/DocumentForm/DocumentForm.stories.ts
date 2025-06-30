import { createElement } from "../../utils";
import { DocumentForm } from "./index";

export default {
  title: "Components/DocumentForm",
  argTypes: {
    viewMode: {
      control: { type: "select" },
      options: ["list", "grid"],
      defaultValue: "list",
    },
  },
};

const Template = (args: { viewMode: "list" | "grid" }) => {
  return createElement(
    {
      className: [
        "vd-doc-list-wrapper",
        ...(args.viewMode === "grid" ? ["vd-doc-list--grid"] : [""]),
      ]
        .filter(Boolean)
        .join(" "),
    },
    DocumentForm({
      onSubmit: () => alert("Submitted"),
      onCancel: () => alert("Cancelled"),
    }),
  );
};

export const Default = Template.bind({});
