import Router from "@koa/router";
import path from "node:path";

import Liturgy from "@louvorja/shared/specs/liturgy.js";
import { APPDATA } from "@louvorja/shared/_platform.js";

const router = new Router({
  prefix: "/import",
});

router.get("/liturgia.ja", async (ctx, next) => {
  ctx.body = Liturgy.fromIni(path.join(APPDATA, "Louvor JA", "liturgia.ja"));
});

export default router;
