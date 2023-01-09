export function install(router, applyPrefix) {
  router.get(applyPrefix("/ping"), function (request, reply) {
    reply.send("pong");
  });

  router.get(applyPrefix("/version"), async function (request, reply) {
    reply.send({
      louvorja: process.versions["npm_package_version"],
      chrome: process.versions["chrome"],
      node: process.versions["node"],
      electron: process.versions["electron"],
    });
  });
}
