let customEvent;

// if not exists CustomEvent, polyfill it
if (typeof customEvent !== "function") {
  class CustomEvent extends Event {
    #detail;

    constructor(type, options) {
      super(type, options);
      this.#detail = options?.detail ?? null;
    }

    get detail() {
      return this.#detail;
    }
  }
  customEvent = CustomEvent;
} else {
  // else use the existing declaration
  customEvent = CustomEvent;
}

export const CustomEvent = customEvent;
