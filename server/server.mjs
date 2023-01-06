import Koa from "koa";
import Router from "@koa/router";

import { Config } from "@louvorja/shared";

console.log(Config)

const config = Config.load();

import Import from "./routes/imports.js";

const app = new Koa();

app.use(Import.routes()).use(new Router().allowedMethods());

function getPort(server) {
  return server.address().port;
}

const server = app.listen(config.server.port || 0);
const port = getPort(server);
console.log(`Server running on http://localhost:${port}`);

export { port };
