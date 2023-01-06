import path from "node:path";

import Liturgy from "@louvorja/shared/specs/liturgy.js";
import { APPDATA } from "@louvorja/shared/_platform.js";

/**
 *
 * @param {string} path
 * @returns {string} Prefixed route path
 */
function prefixed(path) {
  path = path.startsWith("/") ? path : "/${path}";
  return `/import${path}`;
}

export function install(router) {
  router.get(prefixed("/liturgia.ja"), async (request, reply) => {
    reply.send(Liturgy.fromIni(path.join(APPDATA, "Louvor JA", "liturgia.ja")));
  });
}
