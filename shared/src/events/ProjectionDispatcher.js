import { ProjectionEvent } from "./ProjectionEvent.js";
import { ProjectionHandler } from "./ProjectionHandler.js";
import { createLogger, STDOUT } from "../_logging.js";
import cuid from "cuid";
const LOGGER = createLogger(STDOUT);

/** @type {string} Running instance unique ID. */
export const CUID = cuid();
LOGGER.warn(`CUID ${CUID}`);

export const KEY = "louvorja:projection:event";
export const KEY_CONTROL = "louvorja:mode:control";
export const KEY_PROJECTION = "louvorja:mode:projection";

export const CONTROL = "control";
export const PROJECTION = "projection";
export const PREVIEW = "preview";

export class ProjectionDispatcher {
  cuid = CUID;
  handlers;
  mode = CONTROL;
  autoplay = false;

  /**
   *
   * @param {ProjectionHandler[]}
   */
  constructor(handlers = null) {
    // use first path segment as mode
    this.mode = window.location.pathname.split("/").filter((el) => !!el)[0];
    this.autoplay = this.mode === PROJECTION;
    LOGGER.warn(`Mode: ${this.mode}`);
    this.handlers = handlers || {};
    Object.values(this.handlers).forEach((h) => (h.autoplay = this.autoplay));
    if ([PROJECTION, PREVIEW].includes(this.mode) && !handlers) {
      throw new Error(
        `Modes ${PROJECTION} and ${PREVIEW} need handlers. None provided!`
      );
    }
  }

  /** @param {ProjectionEvent} event */
  send(event) {
    const json = JSON.stringify(event.detail);
    LOGGER.debug(event, json);
    // for other tabs or iframess
    window.localStorage.removeItem(KEY);
    window.localStorage.setItem(KEY, json);
    // for same tab (no iframes)
    window.dispatchEvent(event);
  }

  /** @param {ProjectionEvent} event */
  process = async (event) => {
    const { target, command, args } = event;
    try {
      LOGGER.debug(this.handlers[target]);
      this.handlers[target][command](event, this);
    } catch (error) {
      LOGGER.error(
        `Projection [handle] error for ${target} ${command} ${JSON.stringify(
          args
        )}.`,
        error
      );
    }
  };

  /** @param {ProjectionEvent} event */
  receive = async (event) => {
    LOGGER.debug(`Event ${KEY}: ${event}`);
    if (this.mode === PROJECTION) {
      this.process(ProjectionEvent.of(event));
    }
  };

  receiveStorageEvent = (event) => {
    LOGGER.debug(`Event (storage) ${KEY}: ${event.newValue}`);
    if (event.key === KEY && event.newValue) {
      this.receive(JSON.parse(event.newValue));
    }
  };

  /** @returns {{key: string, value: string[]}} */
  modeKeyAndValue() {
    const key = this.mode === CONTROL ? KEY_CONTROL : KEY_PROJECTION;
    return {
      key,
      value: JSON.parse(window.localStorage.getItem(key) || "[]"),
    };
  }

  registerMode() {
    const { key, value } = this.modeKeyAndValue();
    if (!value.includes(this.cuid)) {
      value.push(this.cuid);
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  unregisterMode() {
    const { key, value } = this.modeKeyAndValue();
    if (value.includes(this.cuid)) {
      value.splice(value.indexOf(this.cuid), 1);
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  register() {
    this.registerMode();
    window.addEventListener(KEY, this.receive, { capture: true });
    window.addEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
  }

  unregister() {
    this.unregisterMode();
    window.removeEventListener(KEY, this.receive, { capture: true });
    window.removeEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
    window.localStorage.removeItem(KEY);
  }
}
