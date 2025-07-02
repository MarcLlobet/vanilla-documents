import { Container } from ".";
import { Alert, AlertWrapper } from "../components/Alert";
import { Alert as AlertProps } from "../state/store";

type Controls = {
  addAlert: (_message: string) => void;
  getAlerts: () => AlertProps[];
};

type UIContainer = HTMLElement & {
  controls: Controls;
};

export const AlertContainer: Container = (store): UIContainer => {
  const alertWrapper = AlertWrapper() as UIContainer;

  const controls = {
    addAlert: (message: string) =>
      store.dispatch({
        type: "addAlert",
        payload: {
          message: message ?? "Fake Alert",
          date: new Date(),
        },
      }),
    getAlerts: () => store.getState().alerts,
  } as Controls;

  alertWrapper.controls = controls;

  store.subscribe((state, prev) => {
    if (state.alerts !== prev.alerts) {
      const newAlert = state.alerts.at(-1);

      const newAlertElement = Alert({
        icon: "🔔",
        text: newAlert?.message ?? "Something went wrong",
      });

      alertWrapper.appendChild(newAlertElement);

      setTimeout(() => {
        alertWrapper.removeChild(newAlertElement);
      }, 4500);
    }
  });

  return alertWrapper;
};
