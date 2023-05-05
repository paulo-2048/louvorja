import path from "node:path";
import fs from "node:fs";
import { CONFIG } from "@louvorja/shared";
import { info } from "node:console";

export async function install(router, applyPrefix) {
  router.get("/", (req, reply) => reply.send(CONFIG.application.name));
}
