import * as VueI18n from "vue-i18n";

import es from "@/lang/es";
import pt from "@/lang/pt";

export default VueI18n.createI18n({
  locale: "pt",
  messages: {
    es,
    pt,
  },
});
