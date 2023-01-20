import { createLogger, STDOUT } from "../logging.js";

const LOGGER = createLogger(STDOUT);

const EXCLUDED_METHODS = ["constructor", "element", "htmlToNodes"];

export class Handler {
  /** @type {HTMLElement} */
  #element;
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

export class DefaultHandler extends Handler {
  constructor(element) {
    super(element);
  }

  /**
   *
   * @param {{template: string, animate: { cssClass: string}}} args
   */
  add = async (event) => {
    const id = event.dataId;

    const { template, animate } = event.args;
    for (const node of this.htmlToNodes(template)) {
      node.dataset.id = node.dataset.id || id;
      animate?.cssClass
        ?.split(" ")
        .forEach((cssClass) => node.classList.add(cssClass));
      // avoid flickering when removing same id node
      setTimeout(() => this.element.appendChild(node), 0);
    }
  };

  /**
   *
   * @param {{id: string, animate: { cssClass: string}}, delay: number} args
   */
  remove = async (event) => {
    let ids = event.args.dataId || [];
    if (typeof ids === "string") {
      ids = [ids];
    } else if (!ids.length && event.args.template?.includes("data-id")) {
      ids = this.htmlToNodes(args.template).map((node) => node.dataset.id);
    }
    if (!ids.length) {
      throw new Error("Data id (data-id) not provided! Use clear instead.");
    }

    const { animate, delay } = event.args;
    const promises = [];
    for (const id of ids) {
      try {
        const children = this.element.querySelectorAll(`[data-id="${id}"]`);
        for (const child of children) {
          animate?.cssClass
            ?.split(" ")
            .forEach((cssClass) => child.classList.add(cssClass));
          promises.push(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                child.remove();
                resolve();
              }, delay || 0);
            })
          );
        }
      } catch (error) {
        LOGGER.error(error);
      }
      await Promise.all(promises);
    }
  };

  clear = async (event) => {
    try {
      const animate = event.args.animate;
      const children = this.element.querySelectorAll(`*`);
      const promises = [];
      for (const child of children) {
        animate?.cssClass
          ?.split(" ")
          .forEach((cssClass) => child.classList.add(cssClass));
        promises.push(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              child.remove();
              resolve();
            }, event.args.delay || 0);
          })
        );
      }
      await Promise.all(promises);
    } catch (error) {
      LOGGER.error(error);
    }
  };
}
