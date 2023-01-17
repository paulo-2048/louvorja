import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const server = Fastify();

server.register(proxy, {
  upstream: "http://localhost:5175/control/",
  prefix: "/control/",
});

const modes = ["projection", "preview", "return", "bible", "lyrics", "chords"];

for (const mode of modes) {
  console.log(`Registering proxy for mode ${mode}`);
  server.register(proxy, {
    upstream: "http://localhost:5176/projection/",
    prefix: `/${mode}/`,
  });
}

server.listen({ port: 5177 }, (error, address) => {
  const file = import.meta.url.split("/").pop();
  console.log(file, address.replace("[::1]", "localhost") + "/control/");
  modes.forEach((mode) =>
    console.log(file, address.replace("[::1]", "localhost") + `/${mode}/`)
  );

  if (error) {
    console.error(error);
  }
});
