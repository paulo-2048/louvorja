import Router from "@koa/router";
import path from "node:path";

import liturgy from "../specs/liturgy.ts";
import { APPDATA } from "../lib/platform.mjs";

const router = new Router({
  prefix: "/import",
});

router.get("/liturgia.ja", async (ctx, next) => {
  ctx.body = liturgy.liturgyFromIni(path.join(APPDATA, "Louvor JA", "liturgia.ja"));
});

export default router;
