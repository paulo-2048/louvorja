import { KEY } from "./ProjectionDispatcher.js";
import cuid from "cuid";

export class ProjectionEvent extends CustomEvent {
  static create(targetOrId, commandOrTarget, argsOrCommand, argsIfId) {
    const shift = !!argsIfId;
    const id = shift
      ? targetOrId.startsWith("evt")
        ? targetOrId
        : `evt_${targetOrId}`
      : `evt_${cuid()}`;
    const target = shift ? commandOrTarget : targetOrId;
    const command = shift ? argsOrCommand : commandOrTarget;
    const args = shift ? argsIfId : argsOrCommand;
    return new ProjectionEvent(id, target, command, args);
  }

  static of(eventOrId, target, command, args) {
    let id = eventOrId.id;
    if (id) {
      target = eventOrId.target;
      command = eventOrId.command;
      args = eventOrId.args || {};
    } else {
      id = eventOrId;
    }
    return new ProjectionEvent(id, target, command, args);
  }

  constructor(id, target, command, args = {}) {
    if (!target) {
      throw new Error(`Target is not defined (target=${target})`);
    }
    if (!command) {
      throw new Error(`Command is not defined (command=${command})`);
    }
    super(KEY, {
      detail: { id, target, command, args },
    });
  }

  get id() {
    return this.detail.id;
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

  toJSON() {
    return {
      id: this.id,
      target: this.target,
      command: this.command,
      args: this.args,
    };
  }

  equals(other) {
    return this.id === other.id;
  }
}
