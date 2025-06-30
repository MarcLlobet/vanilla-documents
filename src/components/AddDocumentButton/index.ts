import "./style.css";

export interface AddDocumentButtonProps {
  label?: string;
  onClick?: () => void;
}

export function AddDocumentButton({
  label = "+ Add document",
  onClick,
}: AddDocumentButtonProps): HTMLElement {
  const btn = document.createElement("button");
  btn.className = "vd-add-document-btn";
  btn.textContent = label;
  if (onClick) btn.onclick = onClick;
  return btn;
}
