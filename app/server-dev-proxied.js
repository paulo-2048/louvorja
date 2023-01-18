import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const server = Fastify();

server.register(proxy, {
  upstream: "http://localhost:5175/control",
  prefix: "/control",
});

const modes = ["projection", "preview", "return", "bible", "lyrics", "chords"];

server.register(proxy, {
  upstream: "http://localhost:5176/projection",
  prefix: `/projection`,
});

server.listen({ host: "0.0.0.0", port: 5177 }, (error, address) => {
  const file = import.meta.url.split("/").pop();
  console.log(file, address.replace("[::1]", "localhost") + "/control");
  modes.forEach((mode) =>
    console.log(
      file,
      address.replace("[::1]", "localhost") + `/projection?mode=${mode}`
    )
  );

  if (error) {
    console.error(error);
  }
});
