import "./global.css";
import {
  NotificationContainer,
  DocumentContainer,
  PageContainer,
  AlertContainer,
  ServicesContainer,
} from "./containers";
import { store } from "./state/store";
import { Title, ColorSlider, DarkModeButton } from "./components";

const appRoot = document.querySelector<HTMLDivElement>("#app")!;

function renderApp() {
  ServicesContainer(store);

  return appRoot.append(
    PageContainer(
      {
        name: "Theme",
        align: "right",
        direction: "row",
        store,
      },
      ColorSlider,
      DarkModeButton,
    ),
    PageContainer(
      {
        name: "Notifications",
        align: "center",
        direction: "row",
        store,
      },
      NotificationContainer,
    ),
    PageContainer(
      {
        name: "Title",
        align: "left",
        store,
      },
      Title,
    ),
    PageContainer(
      {
        name: "Documents",
        align: "left",
        store,
      },
      DocumentContainer,
    ),
    PageContainer(
      {
        name: "Alerts",
        store,
      },
      AlertContainer,
    ),
  );
}

renderApp();
