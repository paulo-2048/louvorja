import { CONFIG } from '../config.js';

let customEvent;

// if not exists CustomEvent, polyfill it
if (typeof customEvent !== "function") {
  class CustomEvent extends Event {

    /** @type {Object} */
    #detail;

    constructor(type, options) {
      super(type, options);
      this.#detail = options?.detail ?? null;
    }

    get detail() {
      return this.#detail;
    }

    /** @type {string} */
    static get appID() {
        return CONFIG.application.id;
    }

  }
  customEvent = CustomEvent;
} else {
  // else use the existing declaration
  customEvent = CustomEvent;
}

export const CustomEvent = customEvent;
