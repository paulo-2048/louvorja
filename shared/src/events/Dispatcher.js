import { Event } from "./Event.js";
import { Handler } from "./Handler.js";
import { createLogger, STDOUT } from "../logging.js";
import { CONFIG } from '../config.js';

const LOGGER = createLogger(STDOUT);

export const EVENT_TYPE = "louvorja:event";

export class Dispatcher {
  handlers;
  mode;

  /**
   *
   * @param {Handler[]}
   */
  constructor(handlers = null) {
    // use first path segment as mode
    this.mode = window.location.pathname.split("/").filter((el) => !!el)[0];
    this.handlers = handlers || {};
    LOGGER.warn(
      `Mode: ${this.mode} with handlers ${Object.keys(this.handlers).join(
        ", "
      )}`
    );
    Object.values(this.handlers).forEach((h) => (h.autoplay = this.autoplay));
    if (this.mode !== "control" && !handlers) {
      LOGGER.error(`None handlers provided!`);
    }
  }

  /** @param {Event} event */
  send(event) {
    const json = JSON.stringify(event.detail);
    LOGGER.debug(event, json);
    // for other tabs or iframess
    window.localStorage.removeItem(EVENT_TYPE);
    window.localStorage.setItem(EVENT_TYPE, json);
    // for same tab (no iframes)
    window.dispatchEvent(event);
  }

  /** @param {Event} event */
  process = async (event) => {
    const { target, command, args } = event;
    try {
      LOGGER.debug(this.handlers[target]);
      this.handlers[target][command](event);
    } catch (error) {
      LOGGER.error(
        `Projection [handle] error for ${target} ${command} ${JSON.stringify(
          args
        )}.`,
        error
      );
    }
  };

  /** @param {Event} event */
  receive = async (event) => {
    if (event.type === EVENT_TYPE) {
        LOGGER.debug(`Event ${EVENT_TYPE}: ${event}`);
        this.process(Event.of(event));
    }
  };

  receiveStorageEvent = (event) => {
    LOGGER.debug(`Event (storage) ${EVENT_TYPE}: ${event.newValue}`);
    if (event.key === EVENT_TYPE && event.newValue) {
      this.receive(JSON.parse(event.newValue));
    }
  };

  register() {
    // try connect with websocket, if fail use events in browser
    window.addEventListener(EVENT_TYPE, this.receive, { capture: true });
    window.addEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
  }

  unregister() {
    // try disconnect with websocket, if fail remove events in browser
    window.removeEventListener(EVENT_TYPE, this.receive, { capture: true });
    window.removeEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
    window.localStorage.removeItem(EVENT_TYPE);
  }
}
