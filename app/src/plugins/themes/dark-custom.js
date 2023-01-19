import { theme } from "@louvorja/shared";
const { id, name, NamedThemeDefinition } = theme;
/**
 * @type {NamedThemeDefinition}
 */
export default {
  id: id(import.meta),
  theme: {
    dark: true,
    name: name(import.meta),
    colors: {
      background: "#000000",
      surface: "#000000",
      primary: "#9DFF11",
      "primary-darken-1": "#C8FF4C",
      secondary: "#FC2539",
      "secondary-darken-1": "#FDACC0",
      error: "#4FFFDF",
      info: "#DE690C",
      success: "#B350AF",
      warning: "#0473FF",
    },
  },
};
