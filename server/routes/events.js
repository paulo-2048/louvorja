import path from "node:path";
import fs from "node:fs";
import { modules } from "@louvorja/shared";

export async function install(router, applyPrefix) {
  router.register(async function () {
    router.route({
      method: "GET",
      url: applyPrefix(""),
      handler: (req, reply) => {
        // this will handle http requests
        reply.type("text/html");
        reply.send(`
        <body onunload="ws.close(1000)">
                <p>This is the websocket test page</p>
                <button onclick="counter++; ws.send(JSON.stringify({counter}))">send</button>
                <button onclick="ws.close(1000)">close</button>
                <pre id="log"></pre>
                <script>
                const CONNECTING = 0;
                const OPEN = 1;
                const CLOSING = 2;
                const CLOSED = 3;

                function log(text) {
                    document.querySelector("#log").innerText = document.querySelector("#log").innerText + "\\n" + text;
                }

                let counter = 0;
                class WebSocketWrapper {

                    #url
                    #ws
                    #line = []

                    constructor(url) {
                        this.#url = url;
                        this.#open();
                    }

                    async #open() {
                        const promise = new Promise((resolve, reject) =>{
                            this.#ws = new WebSocket(this.#url, ["json"/*, "xml"*/]);
                            this.#ws.onopen = (event) => {
                                log("WebSocket opened: " + JSON.stringify(event));
                                resolve();
                            };
                            this.#ws.onmessage = function (event) {
                                log(JSON.stringify(JSON.parse(event.data)));
                            }
                            this.#ws.onerror = function (event) {
                                log("WebSocket error: " + JSON.stringify(event));
                                if (this.#ws.readyState < OPEN) {
                                    reject();
                                }
                            }
                            this.#ws.onclose = function (event) {
                                log("WebSocket closed: " + JSON.stringify(event));
                            }
                        })
                        await promise
                    }

                   async #assureOpen() {
                        if (this.#ws.readyState > OPEN) {
                            await this.#open();
                        }
                    }

                    async send(message) {
                        this.#line.push(message);
                        await this.#assureOpen();
                        if (this.#ws.readyState === OPEN) {
                           while(this.#line.length > 0) {
                                this.#ws.send(this.#line.shift());
                            }
                        }
                    }

                    close(code) {
                        this.#ws.close(code)
                    }

                }

                const ws = new WebSocketWrapper("ws://localhost:5174/events/")

                </script>
        `);
      },
      wsHandler: (connection, req) => {
        // this will handle websockets connections
        connection.socket.on("message", (message) => {
          message = JSON.parse(message);
          router.log.trace(message);
          connection.socket.send(JSON.stringify(message));
        });
      },
    });
  });
}
