import { createLogger, STDOUT } from "../_logging.js";

const LOGGER = createLogger(STDOUT);

const EXCLUDED_METHODS = ["constructor", "element", "htmlToNodes"];

export class ProjectionHandler {
  /** @type {HTMLElement} */
  #element;
  events = [];
  autoplay = false;
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
  add = async (event) => {
    const id = event.id;
    if (id !== undefined) {
      const { template, animate } = event.args;
      // remove previous if exits
      if (this.events.includes(id)) {
        await this.remove(event.clone({ args: { delay: 0 } }));
      }
      this.events.push(id);
      for (const node of this.htmlToNodes(template)) {
        node.dataset.eid = id;
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => node.classList.add(cssClass));
        // avoid flickering when removing same id node
        setTimeout(() => this.element.appendChild(node), 0);
      }
    } else {
      throw new Error(
        "Event don't have [id] attribute. Please use ProjectionEvent class to create events."
      );
    }
  };

  /**
   *
   * @param {{id: string, animate: { cssClass: string}}, delay: number} args
   */
  remove = async (event) => {
    const id = event.id;
    const { animate, delay } = event.args;
    try {
      const children = this.element.querySelectorAll(`[data-eid="${id}"]`);
      const promises = [];
      for (const child of children) {
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => child.classList.add(cssClass));
        promises.push(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              child.remove();
              if (this.events.includes(id)) {
                this.events = this.events.splice(this.events.indexOf(id), 1);
              }
              resolve();
            }, delay || 0);
          })
        );
      }
      await Promise.all(promises);
    } catch (error) {
      LOGGER.error(error);
    }
  };
}
