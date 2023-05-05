import { EVENT_TYPE } from "./Dispatcher.js";
import cuid from "cuid";
import { CustomEvent } from "./CustomEvent.js";
import { EventParticipant } from "./EventParticipant.js";

export class Event extends CustomEvent {

  /**
   * @type source {EventParticipant}
   * @type target {EventParticipant}
   * @type command {string}
   * @type args {Object}
   */
  static create(source, target, command, args = {}) {
    const id = `evt_${cuid()}`;
    const objectId = `obj_${cuid()}`;
    return new Event(id, source, target, objectId, command, args);
  }

  static of({detail: {id, source, target, objectId, command, args}}) {
    return Event.create(id, source, target, objectId, command, args);
  }

  constructor(id, source, target, objectId, command, args = {}) {
    if (!source) {
      throw new Error(`Source is not defined (${source})`);
    }
    if (!target) {
      throw new Error(`Target is not defined (${target})`);
    }
    if (!command) {
      throw new Error(`Command is not defined (${command})`);
    }
    super(EVENT_TYPE, {
      detail: { id, objectId, source, target, command, args }
    });
  }

  /**
   * Event self ID.
   */
  get eid() {
    return this.detail.id;
  }

  /**
   * Event Object ID.
   */
  get oid() {
    return this.detail.objectId;
  }

  /**
   * Event source using screen destination and component, e.g.:
   * - control:liturgy;
   * - projection:top.
   * @type {string}
   **/
  get source() {
    return this.detail.source;
  }

  /**
   * Event target.
   * @see {@link #source}
   * @type {string}
   **/
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
