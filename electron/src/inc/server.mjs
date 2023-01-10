/**
 * @returns {URLs} Server url.
 */
async function start() {
  const server = await import("@louvorja/server");
  const addresses = [...(await server.start())];
  console.log(addresses);
  const address = addresses
    .filter((a) => a.family === "IPv4")
    .filter((a) => {
      console.log("ADDR", a.address, a);
      return ["localhost", "127.0.0.1", "0.0.0.0"].includes(a.address);
    })[0];
  address.address = address.address.replace("0.0.0.0", "127.0.0.1");
  return `http://${address.address}:${address.port}/`;
}
