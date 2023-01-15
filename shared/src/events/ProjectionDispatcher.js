import { ProjectionEvent } from "./ProjectionEvent.js";

export const KEY = "louvorja:projection:event";

export class ProjectionDispatcher {
  elements;
  handlers;

  /**
   *
   * @param {HTMLElement[]} elements
   * @param {object} param1
   */
  constructor(elements, handlers) {
    this.elements = Object.fromEntries(
      Object.entries(elements).map((entry) => [
        entry[0],
        entry[1].value || entry[1],
      ])
    );
    this.handlers = handlers || {};
  }

  /** @param {ProjectionEvent} event */
  send(event) {
    const json = JSON.stringify(event.detail);
    console.log(event, json);
    // for other tabs or iframess
    window.localStorage.removeItem(KEY);
    window.localStorage.setItem(KEY, json);
    // for same tab (no iframes)
    window.dispatchEvent(event);
  }

  /** @param {ProjectionEvent} event */
  receive = async (event) => {
    console.log(`Event ${KEY}: ${event}`);
    const { target, command, args } = event;
    console.log(this);
    console.info(
      `Projection event: ${target} ${command} ${JSON.stringify(args)}`
    );

    try {
      console.log(this.handlers[target]);
      this.handlers[target][command](args);
    } catch (error) {
      console.log(
        `Projection [handle] error for ${target} ${command} ${JSON.stringify(
          args
        )}.`,
        error
      );
    }
  };

  receiveStorageEvent = (event) => {
    console.log(`Event (storage) ${KEY}: ${event.newValue}`);
    if (event.key === KEY && event.newValue) {
      this.receive(ProjectionEvent.of(JSON.parse(event.newValue)));
    }
  };

  register() {
    window.addEventListener(KEY, this.receive, { capture: true });
    window.addEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
  }

  unregister() {
    window.removeEventListener(KEY, this.receive, { capture: true });
    window.removeEventListener("storage", this.receiveStorageEvent, {
      capture: true,
    });
    window.localStorage.removeItem(KEY);
  }
}
