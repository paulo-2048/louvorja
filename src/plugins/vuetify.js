import 'vuetify/styles'
import * as Vuetify from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Translation provided by Vuetify (javascript)
import pt from "vuetify/lib/locale/pt";
import es from "vuetify/lib/locale/es";

export default Vuetify.createVuetify({
  components,
  directives,
  locale: {
    locale: "pt",
    messages: { pt, es },
  },
});
