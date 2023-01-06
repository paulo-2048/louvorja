import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { Config } from "@louvorja/shared";
const config = Config.load();

import Fastify from "fastify";
import { modules } from "@louvorja/shared";
const fastify = Fastify({
  logger: config.server.debug,
});

function getPort(server) {
  return server.server.address().port;
}

// Declare ping route
fastify.get("/ping", function (request, reply) {
  reply.send("pong");
});

/***************************
 * ROUTES
 */
fastify.addHook("onRoute", (route) => {
  console.log("Route", route);
});

const routesDirectory = path.join(modules.dirname(import.meta), "routes");
console.log("Searching routes on ${routesDirectory}");
const routeModules = fs.readdirSync(routesDirectory);
for (const file of routeModules) {
  console.log("Installing routes from ${file}");
  const routes = await import(
    url.pathToFileURL(path.join(routesDirectory, file))
  );
  routes.install(fastify);
}

// Run the server!
fastify.listen({ port: config.server.port || 0 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  const port = getPort(fastify);
  console.log(`Server running on http://localhost:${port}`);
});
