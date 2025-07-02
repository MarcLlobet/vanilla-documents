import { AlertWrapper, Alert } from "./index";

export default {
  title: "Components/Alert",
};

const wrapper = AlertWrapper();

wrapper.appendChild(
  Alert({
    text: "First alert",
    icon: "🔔",
  }),
);

let alertId = 2;

setInterval(() => {
  wrapper.append(
    Alert({
      text: `Alert #${alertId}`,
      icon: "⚠️",
    }),
  );
  ++alertId;
}, 1500);

export const Default = () => wrapper;
