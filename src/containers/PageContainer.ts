import { Container } from ".";
import {
  pageWrapper,
  type PageWrapperChildren,
  type PageWrapperProps,
} from "../components";
import { Store } from "../state/store";

export const PageContainer = (
  props: PageWrapperProps & {
    name: string;
    store: Store;
  },
  ...wrapperChildren: Container[]
) => {
  const { name, store, ...wrapperProps } = props;
  const fragment = document.createDocumentFragment();

  try {
    const children = wrapperChildren
      .map((child) => child(store))
      .filter(Boolean) as PageWrapperChildren[];

    if (children.length) {
      const pageElement = pageWrapper(wrapperProps, ...children);
      fragment.appendChild(pageElement);
    }
  } catch (error) {
    const alert = {
      message: `Something went wrong with ${name ?? "a component"}`,
      date: new Date(),
      details: error,
    };
    store.dispatch({ type: "addAlert", payload: alert });
  }
  return fragment;
};
