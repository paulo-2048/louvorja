import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const server = Fastify();

server.register(proxy, {
  upstream: "http://localhost:5175/control",
  prefix: "/control",
});

server.register(proxy, {
  upstream: "http://localhost:5176/projection",
  prefix: "/projection",
});

server.listen({ port: 5177 }, (error, address) => {
  const file = import.meta.url.split("/").pop();
  console.log(file, address.replace("[::1]", "localhost") + "/control");
  console.log(file, address.replace("[::1]", "localhost") + "/projection");
  if (error) {
    console.error(error);
  }
});
