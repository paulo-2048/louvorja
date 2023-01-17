export class HandlerLoader {
  /** @type(string) */
  async load(target) {
    await new Promise((resolve, reject) => {
      reject("Must be implemented in subclass.");
    });
  }
}

export class DefaultHandlerLoader extends HandlerLoader {
  /** @type(string) */
  async load(target) {
    await import(`./handlers/${target}.js`);
  }
}
