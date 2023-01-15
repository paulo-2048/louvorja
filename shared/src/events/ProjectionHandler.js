const EXCLUDED_METHODS = ["constructor", "element", "htmlToNodes"];

export class ProjectionHandler {
  /** @type {HTMLElement} */
  #element;

  elements = [];
  /**
   *
   * @param {HTMLElement} target Target element for this handler instance.
   */
  constructor(element) {
    this.#element = element;
  }

  /**
   * Return the target element that will be manipulated.
   */
  get element() {
    return this.#element;
  }

  //   get elements() {
  //     const els = this.elements;
  //     // deep freeze
  //     Object.keys(els).forEach((prop) => {
  //       if (typeof els[prop] === "object" && !Object.isFrozen(els[prop])) {
  //         deepFreeze(els[prop]);
  //       }
  //     });
  //     return Object.freeze(els);
  //   }

  /**
   * List supported actions (methods).
   */
  get supportedActions() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      (name) => !EXCLUDED_METHODS.includes(name)
    );
  }

  /**
   * @param {string} html HTML representing any number of sibling elements
   * @returns {NodeList}
   */
  htmlToNodes(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
  }
}

export class DefaultProjectionHandler extends ProjectionHandler {
  constructor(element) {
    super(element);
  }

  /**
   *
   * @param {{template: string, animate: { cssClass: string}}} args
   */
  add(args) {
    const { template, animate } = args;
    for (const child of this.htmlToNodes(template)) {
      const dataId = child.dataset.id;
      if (dataId !== undefined) {
        console.log(this.elements, dataId, this.elements.includes(dataId));
        if (this.elements.includes(dataId)) {
          this.remove({ dataId: dataId, delay: 0 });
        }
        this.elements.push(dataId);
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => child.classList.add(cssClass));
        this.element.appendChild(child);
      } else {
        throw new Error("Node don't have [data-id] attribute.");
      }
    }
  }

  /**
   *
   * @param {{id: string, animate: { cssClass: string}}, delay: number} args
   */
  remove(args) {
    console.log("remove from add", args);
    const { dataId, animate, delay } = args;
    try {
      const children = this.element.querySelectorAll(`[data-id="${dataId}"]`);
      for (const child of children) {
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => child.classList.add(cssClass));

        setTimeout(() => {
          child.remove();
          if (this.elements.includes(dataId)) {
            this.elements = this.elements.splice(
              this.elements.indexOf(dataId),
              1
            );
          }
        }, delay || 0);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Element [data-id="${dataId}"] not found to remove.`);
    }
  }
}
