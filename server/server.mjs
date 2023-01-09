import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { Config } from "@louvorja/shared";
const config = Config.load();

import Fastify from "fastify";
import { modules, prefix } from "@louvorja/shared";
const server = Fastify({
  logger: config.server.debug,
});

/***************************
 * ROUTES
 */
server.addHook("onRoute", (route) => {
  console.log(`Route ${route.method} ${route.routePath}`);
});

const routesDirectory = path.join(modules.parent(import.meta), "routes");
console.log(`Searching routes on ${routesDirectory}`);
const routeModules = fs.readdirSync(routesDirectory);
for (const file of routeModules) {
  console.log(`Installing routes from ${file}`);
  const moduleUrl = url.pathToFileURL(path.join(routesDirectory, file));
  const routes = await import(moduleUrl);
  const applyPrefix = prefix.prefixRoute(
    modules.basename({ url: moduleUrl.toString() })
  );
  await routes.install(server, applyPrefix);
}

/**
 *
 * @returns {{address: string, family: string, port: number}[]}
 */
export async function start() {
  await server
    .listen({
      port: config.server.port || 0,
      host: config.server.host || "0.0.0.0",
    })
    .then((address) => {
      console.log(`Server running on ${address}`);
    })
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
  return server.addresses();
}
if (process.argv[1].endsWith(modules.filename(import.meta))) {
  start();
}
