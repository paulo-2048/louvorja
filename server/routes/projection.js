import path from "node:path";
import fs from "node:fs";
import { modules } from "@louvorja/shared";

export async function install(router, applyPrefix) {
  // if public dir exists, server files there (as in electron app)
  // otherwise proxy call to vite server (vue app dev mode)
  const staticDir = path.join(modules.parent(import.meta), "static");
  if (fs.existsSync(staticDir)) {
    router.register(await import("@fastify/static"), {
      root: staticDir,
      prefix: applyPrefix("/"),
    });
  } else {
    router.log.error('Projection static directory not found!');
  }
}
