import * as Vuetify from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { md1 } from "vuetify/blueprints";

// Translation provided by Vuetify (javascript)
import pt from "vuetify/lib/locale/pt";
import es from "vuetify/lib/locale/es";

import lightCustom from "./themes/light-custom";
import darkCustom from "./themes/dark-custom";
import { theme } from "@louvorja/shared";

const THEMES = Object.fromEntries(
  [lightCustom, darkCustom].map((t) => [t.id, t.theme])
);

export default Vuetify.createVuetify({
  blueprint: md1,
  theme: {
    defaultTheme: theme.defaultTheme(),
    themes: { ...THEMES },
  },
  components,
  directives,
  locale: {
    locale: "pt",
    messages: { pt, es },
  },
});
