export class ProjectionHandlerLoader {
  /** @type(string) */
  async load(target) {
    await new Promise((resolve, reject) => {
      reject("Must be implemented in subclass.");
    });
  }
}

export class DefaultProjectionHandlerLoader extends ProjectionHandlerLoader {
  /** @type(string) */
  async load(target) {
    await import(`./handlers/${target}.js`);
  }
}
