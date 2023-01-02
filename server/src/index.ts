import Koa from "koa";
import Router from "@koa/router";
import { Server } from "http";
import { AddressInfo } from "net";

import Import from "./imports";

const app = new Koa();

app.use(Import.routes()).use(new Router().allowedMethods());

function getPort(server: Server) {
  return (<AddressInfo>server.address()).port;
}

const server = app.listen(0);
console.log(`Server running on http://localhost:${getPort(server)}`);

export const port = getPort(server);
