import { AddDocumentButton, AddDocumentButtonProps } from "./index";

export default {
  title: "Components/AddDocumentButton",
};

export const Default = (args: AddDocumentButtonProps) =>
  AddDocumentButton({
    ...args,
    onClick: () => alert("clicked!"),
  });
