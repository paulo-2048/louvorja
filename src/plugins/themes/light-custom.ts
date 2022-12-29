import { id, name } from "@/lib/theme";
import type { NamedThemeDefinition } from "@/lib/theme";

export default {
  id: id(import.meta),
  theme: <NamedThemeDefinition>{
    dark: false,
    name: name(import.meta),
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#6200EE",
      "primary-darken-1": "#3700B3",
      secondary: "#03DAC6",
      "secondary-darken-1": "#018786",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  },
};
