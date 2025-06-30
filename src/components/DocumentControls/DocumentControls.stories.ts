import { DocumentControls, DocumentControlsProps } from ".";

const sortOptions = [
  {
    label: "Name",
    key: "Title",
  },
  {
    label: "Version",
    key: "Version",
  },
  {
    label: "Date",
    key: "UpdatedAt",
  },
];

export default {
  title: "Components/DocumentControls",
  args: {
    sortKey: "Title",
    viewMode: "list",
    sortOrder: "asc",
  },
  argTypes: {
    sortKey: {
      control: {
        type: "inline-radio",
        labels: sortOptions.reduce(
          (prev, { label, key }) => ({
            ...prev,
            [key]: label,
          }),
          {},
        ),
      },
      options: sortOptions.map(({ key }) => key),
    },
    viewMode: {
      control: {
        type: "inline-radio",
      },
      options: ["list", "grid"],
    },
    sortOrder: {
      control: {
        type: "inline-radio",
      },
      options: ["asc", "desc"],
    },
  },
};

export const Default = (args: DocumentControlsProps) =>
  DocumentControls({
    ...args,
    documentControlsId: "documentControlsId",
    sortOptions,
    onSortKeyChange: () => {},
    onSortOrderChange: () => {},
    onViewModeChange: () => {},
  } as DocumentControlsProps);
