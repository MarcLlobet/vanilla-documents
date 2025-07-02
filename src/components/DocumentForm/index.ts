import "./style.css";
import { createElement } from "../../utils";
import { Contributor, Document } from "../../domain/document";

export type DocumentFormProps = {
  onSubmit: (_data: {
    Title: Document["Title"];
    Version: Document["Version"];
    Attachments: Document["Attachments"];
    Contributors: Document["Contributors"];
  }) => void;
  onCancel?: () => void;
};

export function DocumentForm({
  onSubmit,
  onCancel,
}: DocumentFormProps): HTMLElement {
  const formWrapper = createElement({
    className: "vd-doc-form__container",
  });

  const formElement = createElement({
    type: "form",
    autocomplete: "off",
    className: "vd-doc-form__form",
  });

  const formFields = createElement(
    {
      className: "vd-doc-form__fields",
    },
    createElement(
      {
        className: "vd-doc-form__group",
      },
      createElement(
        {
          className: "vd-doc-form__label-input",
        },
        createElement(
          {
            type: "label",
            for: "form__title",
          },
          "Name",
        ),
        createElement({
          type: "input",
          id: "form__title",
          name: "title",
          className: "vd-doc-form__input",
          inputType: "text",
          required: true,
          pattern: "[a-zA-Z]{2,16}",
        }),
      ),
      createElement(
        {
          className: "vd-doc-form__label-input",
        },
        createElement(
          {
            type: "label",
            for: "form__version-major",
          },
          "Version",
        ),
        createElement(
          {
            className: "vd-doc-form__input-group",
          },
          createElement({
            id: "form__version-major",
            type: "input",
            inputType: "number",
            required: true,
            className: "vd-doc-form__input vd-doc-form__input--version",
            name: "version-major",
            min: "0",
            value: "1",
          }),
          createElement(
            {
              type: "span",
            },
            ".",
          ),
          createElement({
            id: "form__version-minor",
            type: "input",
            inputType: "number",
            required: true,
            className: "vd-doc-form__input vd-doc-form__input--version",
            name: "version-minor",
            min: "0",
            value: "0",
          }),
          createElement(
            {
              type: "span",
            },
            ".",
          ),
          createElement({
            id: "form__version-patch",
            type: "input",
            inputType: "number",
            required: true,
            className: "vd-doc-form__input vd-doc-form__input--version",
            name: "version-patch",
            min: "0",
            value: "0",
          }),
        ),
      ),
    ),
    createElement(
      {
        className: "vd-doc-form__group",
      },
      createElement(
        {
          className: "vd-doc-form__label-input",
        },
        createElement(
          {
            type: "label",
            for: "form_contributors",
          },
          "Contributors",
        ),
        createElement({
          id: "form_contributors",
          type: "input",
          name: "contributors",
          className: "vd-doc-form__input",
          for: "form_contributors",
          inputType: "text",
          required: true,
          pattern: "([a-zA-Z]{2,16}(, ?)?)+",
        }),
      ),
    ),
    createElement(
      {
        className: "vd-doc-form__group",
      },
      createElement(
        {
          className: "vd-doc-form__label-input",
        },
        createElement(
          {
            type: "label",
            for: "form_attachments",
          },
          "Attachments",
        ),
        createElement({
          id: "form_attachments",
          type: "input",
          name: "attachments",
          className: "vd-doc-form__input",
          for: "form_attachments",
          inputType: "text",
          required: true,
          pattern: "([a-zA-Z]{2,16}(, ?)?)+",
        }),
      ),
    ),
  );

  const handleFormSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const formElement = (event?.currentTarget as HTMLElement)?.closest?.(
      "form",
    ) as HTMLFormElement;

    const isValidForm = formElement.checkValidity();

    if (!isValidForm) {
      return formElement.reportValidity();
    }

    const formData = new FormData(formElement);

    const major = formData.get("version-major") ?? 1;
    const minor = formData.get("version-minor") ?? 0;
    const patch = formData.get("version-patch") ?? 0;

    const version = `${major}.${minor}.${patch}`;
    const title = (formData.get("title") as string).trim();

    const attachments = (formData.get("attachments") as string)
      .split(",")
      .map((attachment) => attachment.trim())
      .filter(Boolean);

    const contributors: Contributor[] = (formData.get("contributors") as string)
      .split(",")
      .map((contributor) => contributor.trim())
      .filter(Boolean)
      .map((contributor, contributorIndex) => ({
        ID: `c-${contributorIndex}`,
        Name: contributor,
      }));

    onSubmit({
      Title: title,
      Version: version,
      Attachments: attachments,
      Contributors: contributors,
    });

    (formElement as HTMLFormElement).reset();
  };

  const handleFormCancel = (event: MouseEvent) => {
    event.preventDefault();
    onCancel?.();
  };

  const formActions = createElement(
    {
      className: "vd-doc-form__actions",
    },
    createElement(
      {
        type: "button",
        inputType: "button",
        className: "vd-doc-action vd-doc-action__cancel",
        onClick: handleFormCancel,
      },
      "Cancel",
    ),
    createElement(
      {
        type: "button",
        inputType: "submit",
        className: "vd-doc-action vd-doc-action__submit",
        onClick: handleFormSubmit,
      },
      "Create document",
    ),
  );

  formElement.append(formFields, formActions);
  formWrapper.append(formElement);

  return formWrapper;
}

export default DocumentForm;
