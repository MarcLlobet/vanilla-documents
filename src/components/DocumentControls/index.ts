import "./style.css";
import { createElement } from "../../utils";
import { Document } from "../../application/document";
import ArrowUpSvg from "./arrow-up.svg";
import ArrowDownSvg from "./arrow-down.svg";
import ListSvg from "./list.svg";
import GridSvg from "./grid.svg";

export interface DocumentControlsProps {
  documentControlsId: string;
  sortOptions: { key: keyof Document; label: string }[];
  sortKey: keyof Document;
  sortOrder: "asc" | "desc";
  viewMode: "list" | "grid";
  onSortKeyChange: (_key: keyof Document) => void;
  onSortOrderChange: (_order: "asc" | "desc") => void;
  onViewModeChange: (_mode: "list" | "grid") => void;
}

export function DocumentControls({
  documentControlsId,
  viewMode,
  sortOptions,
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
  onViewModeChange,
}: DocumentControlsProps): HTMLElement {
  const sortingUI = createElement(
    {
      className: "vd-doc__header-group",
    },
    createElement(
      {
        className: "vd-doc-list__sort",
      },
      createElement(
        {
          type: "label",
          className: "vd-doc-list__sort-label",
          for: "vd-doc-list__sort",
        },
        "Sort by",
      ),
      createElement(
        {
          type: "select",
          className: "vd-doc-list__sort-input",
          id: "vd-doc-list__sort",
          onChange: (e: Event) => {
            onSortKeyChange(
              (e.target as HTMLSelectElement).value as keyof Document,
            );
          },
        },
        ...sortOptions.map((option) =>
          createElement(
            {
              type: "option",
              value: option.key,
              selected: option.key === sortKey,
            },
            option.label,
          ),
        ),
      ),
    ),
    createElement(
      {
        type: "button",
        "data-testid": "sort--asc",
        disabled: sortOrder === "asc",
        className: [
          "vd-doc__header-button",
          ...(sortOrder === "asc" ? ["vd-doc__header-button--active"] : []),
        ].join(" "),
        onClick: () => onSortOrderChange("asc"),
      },
      createElement({
        type: "img",
        src: ArrowUpSvg,
        alt: "sort asc",
      }),
    ),
    createElement(
      {
        type: "button",
        "data-testid": "sort--desc",
        disabled: sortOrder === "desc",
        className: [
          "vd-doc__header-button",
          ...(sortOrder === "desc" ? ["vd-doc__header-button--active"] : []),
        ].join(" "),
        onClick: () => onSortOrderChange("desc"),
      },
      createElement({
        type: "img",
        src: ArrowDownSvg,
        alt: "sort desc",
      }),
    ),
  );

  const viewUI = createElement(
    {
      className: "vd-doc__header-group",
    },
    createElement(
      {
        type: "button",
        disabled: viewMode === "list",
        className: [
          "vd-doc__header-button",
          ...(viewMode === "list" ? ["vd-doc__header-button--active"] : []),
        ].join(" "),
        onClick: () => onViewModeChange("list"),
      },
      createElement({
        type: "img",
        src: ListSvg,
        alt: "list view",
      }),
    ),
    createElement(
      {
        type: "button",
        disabled: viewMode === "grid",
        className: [
          "vd-doc__header-button",
          ...(viewMode === "grid" ? ["vd-doc__header-button--active"] : []),
        ].join(" "),
        onClick: () => onViewModeChange("grid"),
      },
      createElement({
        type: "img",
        src: GridSvg,
        alt: "grid view",
      }),
    ),
  );

  const container = createElement(
    {
      id: documentControlsId,
    },
    createElement(
      {
        className: "vd-doc__header",
      },
      sortingUI,
      viewUI,
    ),
  );

  return container;
}
