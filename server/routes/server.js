export function install(router, applyPrefix) {
  router.get(applyPrefix("/ping"), function (request, reply) {
    reply.send("pong");
  });
}
