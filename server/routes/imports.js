import path from "node:path";

import { APPDATA, specs } from "@louvorja/shared";

export async function install(router, applyPrefix) {
  router.get(applyPrefix("/liturgia.ja"), async (request, reply) => {
    reply.send(
      Liturgy.fromIni(path.join(APPDATA, "Louvor JA", "liturgia.ja"))
    );
  });
}
