import path from "node:path";
import fs from "node:fs";
import { modules } from "@louvorja/shared";

export async function install(router, applyPrefix) {
  router.get("/", (req, reply) => reply.send("Hi"));
}
