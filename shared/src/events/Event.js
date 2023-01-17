import { KEY } from "./Dispatcher.js";
import cuid from "cuid";

export class Event extends CustomEvent {
  static create(target, command, args) {
    const id = `evt_${cuid()}`;
    return new Event(id, target, command, args);
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
    return new Event(id, target, command, args);
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

  /** @type {string} */
  get dataId() {
    return this.detail.dataId;
  }

  with(details) {
    return Event.of(Object.assign(this.toJSON(), details));
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
