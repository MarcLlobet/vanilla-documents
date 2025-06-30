import { Notification, NotificationProps } from "./index";

export default {
  title: "Components/Notification",
  argTypes: {
    text: { control: "text" },
    icon: { control: "select", options: [null, "🔔", "⚠️"] },
    badgeCount: { control: "select", options: [null, 5, 10] },
  },
};

export const Default = (args: NotificationProps) =>
  Notification({
    ...args,
    onClick: () => alert("clicked!"),
  });
Default.args = { text: "Notification", icon: "🔔", badgeCount: 5 };
