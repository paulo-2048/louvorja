import path from "node:path";
import fs from "node:fs";
import { modules } from "@louvorja/shared";

export async function install(router, applyPrefix) {
  // if public dir exists, server files there (as in electron app)
  // otherwise proxy call to vite server (vue app dev mode)
  const publicDir = path.join(modules.parent(import.meta), "public");
  if (fs.existsSync(publicDir)) {
    router.register(await import("@fastify/static"), {
      root: publicDir,
      prefix: "/",
    });
  } else {
    router.register(await import("@fastify/http-proxy"), {
      upstream: "http://localhost:5173",
    });
  }
}
