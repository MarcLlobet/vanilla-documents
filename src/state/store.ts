import type { Document } from "../domain/document";

export type SortKey = "Title" | "Version" | "UpdatedAt";
export type SortOrder = "asc" | "desc";
export type ViewMode = "list" | "grid";

export type AppState = {
  sortKey: SortKey;
  sortOrder: SortOrder;
  viewMode: ViewMode;
  notificationCount: number;
  documents: Document[];
  notificatedDocuments: Document[];
};

export const initialState: AppState = {
  sortKey: "UpdatedAt",
  sortOrder: "asc",
  viewMode: "list",
  notificationCount: 0,
  documents: [],
  notificatedDocuments: [],
};

export type Action =
  | { type: "setSortKey"; payload: SortKey }
  | { type: "setSortOrder"; payload: SortOrder }
  | { type: "setViewMode"; payload: ViewMode }
  | { type: "setDocuments"; payload: Document[] }
  | { type: "addDocument"; payload: Document }
  | { type: "addNotificatedDocument"; payload: Document }
  | { type: "clearNotificatedDocuments" };

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
    default:
      return state;
  }
}

export type StateListener = (_state: AppState, _prevState: AppState) => void;

export function createStore(initial: AppState) {
  let state = initial;
  let listeners: StateListener[] = [];

  function getState() {
    return state;
  }

  function dispatch(action: Action) {
    const prev = state;
    state = reducer(state, action);
    if (prev !== state) listeners.forEach((fn) => fn(state, prev));
  }

  function subscribe(fn: StateListener) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  return { getState, dispatch, subscribe };
}

export const store = createStore(initialState);
