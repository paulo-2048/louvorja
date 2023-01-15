import { KEY } from "./ProjectionDispatcher.js";

export class ProjectionEvent extends CustomEvent {
  static of(eventOrTarget, command, args = {}) {
    let target = eventOrTarget.target;
    if (target) {
      command = eventOrTarget.command;
      args = eventOrTarget.args;
    } else {
      target = eventOrTarget;
    }
    return new ProjectionEvent(target, command, args);
  }

  constructor(target, command, args = {}) {
    if (!target) {
      throw new Error(`Target is not defined (target=${target})`);
    }
    if (!command) {
      throw new Error(`Command is not defined (command=${command})`);
    }
    super(KEY, {
      detail: { target, command, args },
    });
  }

  /** @type {string} */
  get target() {
    return this.detail.target;
  }

  /** @type {string} */
  get command() {
    return this.detail.command;
  }

  /** @type {object} */
  get args() {
    return this.detail.args;
  }

  toString() {
    return `#${this.target}.${this.command}(${JSON.stringify(this.args)})`;
  }
}
