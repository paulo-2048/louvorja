export class Property {
  name;
  /** @type {string} text, file, number, time, datetime, date */
  inputType;
  description;

  constructor(name) {}
}

export class Control {
  /** @type {string} */
  mediaType;

  /** @type {Property[]} */
  properties;

  constructor() {
    this.properties = [];
  }
}
