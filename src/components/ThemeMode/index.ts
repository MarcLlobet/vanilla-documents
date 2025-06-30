import { createElement } from "../../utils";
import ThemeModeButton from "./themeModeButton.svg?raw";
import "./style.css";

export const ColorSlider = () =>
  createElement({
    type: "input",
    inputType: "range",
    className: "colorSlider",
    min: "0",
    max: "360",
    value: "150",
    step: "10",
    onChange: (event: Event) => {
      const input = (event?.target as HTMLInputElement)?.value ?? "150";
      document.documentElement.style.setProperty("--key-color-h", input);
    },
  });

export const DarkModeButton = () => {
  const darkModeButton = createElement({
    type: "button",
    className: "darkMode",
    onClick: () => {
      const variablesCSS = [
        "key-color-l",
        "highlight-color-l",
        "highlight-color-soft-l",
        "key-color-text-l",
        "text-color-l",
        "background-color-l",
        "background-paper-l",
        "highlight-color-mid-l",
      ];

      const hasDarkMode = document.body.classList.contains("dark-mode");

      const themeMode = hasDarkMode ? "bright" : "dark";

      variablesCSS.forEach((variable) => {
        document.documentElement.style.setProperty(
          `--${variable}`,
          `var(--${variable}-${themeMode})`,
        );
      });

      if (hasDarkMode) {
        document.body.classList.remove("dark-mode");
      } else {
        document.body.classList.add("dark-mode");
      }
    },
  });

  darkModeButton.innerHTML = ThemeModeButton;
  return darkModeButton;
};
