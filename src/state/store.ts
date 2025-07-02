import type { Document } from "../domain/document";

export type SortKey = "Title" | "Version" | "UpdatedAt";
export type SortOrder = "asc" | "desc";
export type ViewMode = "list" | "grid";
export type Alert = {
  message: string;
  date: Date;
};

export type AppState = {
  sortKey: SortKey;
  sortOrder: SortOrder;
  viewMode: ViewMode;
  notificationCount: number;
  documents: Document[];
  notificatedDocuments: Document[];
  alerts: Alert[];
};

export const initialState: AppState = {
  sortKey: "UpdatedAt",
  sortOrder: "asc",
  viewMode: "list",
  notificationCount: 0,
  documents: [],
  notificatedDocuments: [],
  alerts: [],
};

export type Action =
  | { type: "setSortKey"; payload: SortKey }
  | { type: "setSortOrder"; payload: SortOrder }
  | { type: "setViewMode"; payload: ViewMode }
  | { type: "setDocuments"; payload: Document[] }
  | { type: "addDocument"; payload: Document }
  | { type: "addNotificatedDocument"; payload: Document }
  | { type: "clearNotificatedDocuments" }
  | { type: "addAlert"; payload: Alert };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "setSortKey":
      return { ...state, sortKey: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    case "setViewMode":
      return { ...state, viewMode: action.payload };
    case "setDocuments":
      return { ...state, documents: action.payload };
    case "addDocument":
      return { ...state, documents: [action.payload, ...state.documents] };
    case "addNotificatedDocument":
      return {
        ...state,
        notificatedDocuments: [...state.notificatedDocuments, action.payload],
        notificationCount: state.notificationCount + 1,
      };
    case "clearNotificatedDocuments":
      return { ...state, notificatedDocuments: [], notificationCount: 0 };
    case "addAlert":
      return { ...state, alerts: [...state.alerts, action.payload] };
    default:
      return state;
  }
}

export type StateListener = (_state: AppState, _prevState: AppState) => void;

export type Store = {
  getState: () => AppState;
  dispatch: (_action: Action) => void;
  subscribe: (_fn: StateListener) => () => void;
  resetState: () => void;
};

export type CreateStore = (_state: AppState) => Store;

export const createStore: CreateStore = (initial: AppState) => {
  let state = initial;
  let listeners: StateListener[] = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action: Action) => {
    const prev = state;
    state = reducer(state, action);
    if (prev !== state) listeners.forEach((fn) => fn(state, prev));
  };

  const subscribe = (fn: StateListener) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  };

  const resetState = () => {
    state = initial;
  };

  return { getState, dispatch, subscribe, resetState };
};

export const store: Store = createStore(initialState);
