import { createLogger } from "../logging.js";

const logger = createLogger();

export const CONNECTING = 0;
export const OPEN = 1;
export const CLOSING = 2;
export const CLOSED = 3;

export class ReconnectingWebSockect extends EventTarget {
  #url;
  #protocols;
  #ws;
  #queue = [];
  #listeners = {
    open: [],
    message: [],
    close: [],
    error: [],
  };

  constructor(url, protocols = []) {
    super();
    this.#url = url;
    this.#protocols = protocols;
  }

  get binaryType() {
    return this.#ws.binaryType;
  }
  get bufferedAmount() {
    return this.#ws.bufferedAmount;
  }
  get extensions() {
    return this.#ws.extensions;
  }
  get protocol() {
    return this.#ws.protocol;
  }
  get readyState() {
    return this.#ws.readyState;
  }
  get url() {
    return this.#ws.url;
  }

  set onopen(listener) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onmessage(listener) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onclose(listener) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  set onerror(listener) {
    throw new Error("Not supported. Use addEventListener instead!");
  }

  async send(message) {
    this.#queue.push(message);
    await this.#assureOpen();
    if (this.#ws.readyState === OPEN) {
      while (this.#queue.length > 0) {
        this.#ws.send(this.#queue.shift());
      }
    }
  }

  close(code) {
    this.#ws.close(code);
  }

  addEventListener(type, listener, options = {}) {
    if (typeof options === "boolean") {
      options = { capture: options };
    }
    options.capture = options.capture || false;
    this.#listeners[type].push({ listener, options });
  }

  removeEventListener(type, listener, options = {}) {
    if (typeof options === "boolean") {
      options = { capture: options };
    }
    options.capture = options.capture || false;
    const list = this.#listeners[type];
    const index = list.findIndex(
      (el) => el.listener === listener && el.options.capture === options.capture
    );
    if (index >= 0) {
      list.splice(index, 1);
    }
    this.#ws.removeEventListener(type, listener, options);
  }

  dispatchEvent(event) {
    this.#ws.dispatchEvent(event);
  }

  async #open() {
    const promise = new Promise((resolve, reject) => {
      this.#ws = new WebSocket(this.#url, this.#protocols);

      for (const type in this.#listeners) {
        for (const { listener, options } of this.#listeners[type]) {
          this.#ws.addEventListener(type, listener, options);
        }
      }

      this.#ws.onopen = (event) => {
        logger.warn("WebSocket opened: " + JSON.stringify(event));
        resolve();
      };
      this.#ws.onmessage = function (event) {
        logger.trace(JSON.stringify(JSON.parse(event.data)));
      };
      this.#ws.onerror = function (event) {
        logger.error("WebSocket error: " + JSON.stringify(event));
        if (this.#ws.readyState < OPEN) {
          reject();
        }
      };
      this.#ws.onclose = function (event) {
        logger.warn("WebSocket closed: " + JSON.stringify(event));
      };
    });
    await promise;
  }

  async #assureOpen() {
    if (this.#ws.readyState > OPEN) {
      await this.#open();
    }
  }

  logListeners() {
    console.log(this.#listeners);
  }
}
