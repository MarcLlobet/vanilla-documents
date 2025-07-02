import { Store } from "../state/store";

export * from "./AlertContainer";
export * from "./DocumentContainer";
export * from "./NotificationContainer";
export * from "./PageContainer";
export * from "./ServicesContainer";

export type Container = (_store: Store) => HTMLElement | DocumentFragment;
