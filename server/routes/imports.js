import path from "node:path";

import Liturgy from "@louvorja/shared/specs/liturgy.js";
import { APPDATA } from "@louvorja/shared/_platform.js";

export function install(router, applyPrefix) {
  router.get(applyPrefix("/liturgia.ja"), async (request, reply) => {
    reply.send(Liturgy.fromIni(path.join(APPDATA, "Louvor JA", "liturgia.ja")));
  });
}
