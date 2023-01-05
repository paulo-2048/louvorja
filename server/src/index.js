import Koa from "koa";
import Router from "@koa/router";

import Import from "./imports.js";

const app = new Koa();

app.use(Import.routes()).use(new Router().allowedMethods());

function getPort(server) {
  return (server.address()).port;
}

const server = app.listen(0);
console.log(`Server running on http://localhost:${getPort(server)}`);

export const port = getPort(server);
