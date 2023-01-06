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

function getPort(server) {
  return server.server.address().port;
}

/***************************
 * ROUTES
 */
server.addHook("onRoute", (route) => {
  console.log(`Route ${route.method} ${route.routePath}`);
});

const routesDirectory = path.join(modules.dirname(import.meta), "routes");
console.log(`Searching routes on ${routesDirectory}`);
const routeModules = fs.readdirSync(routesDirectory);
for (const file of routeModules) {
  console.log(`Installing routes from ${file}`);
  const moduleUrl = url.pathToFileURL(path.join(routesDirectory, file));
  const routes = await import(moduleUrl);
  const applyPrefix = prefix.prefixRoute(modules.basename({ url: moduleUrl.toString() }));
  routes.install(server, applyPrefix);
}

// Run the server!
server.listen({ port: config.server.port || 0 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  const port = getPort(server);
  console.log(`Server running on http://localhost:${port}`);
});
