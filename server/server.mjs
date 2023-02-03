import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { CONFIG, logging } from "@louvorja/shared";
// FIXME add file path as first parameter
const logger = logging.createLogger();
logger.level = CONFIG.server.logLevel;

import Fastify from "fastify";
import websocket from "@fastify/websocket";

import { modules, prefix } from "@louvorja/shared";
const server = Fastify({
  logger: {
    level: CONFIG.server.logLevel,
    transport: logging.PINO_PRETTY_TARGET,
  },
});

server.register(websocket);

/***************************
 * ROUTES
 */
server.addHook("onRoute", (route) => {
  server.log.trace(`Route ${route.method} ${route.routePath}`);
});

const routesDirectory = path.join(modules.parent(import.meta), "routes");
server.log.trace(`Searching routes on ${routesDirectory}`);
const routeModules = fs.readdirSync(routesDirectory);
for (const file of routeModules) {
  server.log.trace(`Installing routes from ${file}`);
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
      port: CONFIG.server.port,
      host: CONFIG.server.bind,
    })
    .then((address) => {
      server.log.warn(`Server running on ${address}`);
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
