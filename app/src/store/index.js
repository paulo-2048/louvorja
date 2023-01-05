import { defineStore } from "pinia";

export class UI {
  /**
   * @type string
   */
  theme;
  /**
   * @type string
   */
  accent;
}

export class MainStore {
  /**
   * @type {UI}
   */
  ui;
}

/**
 * @type {MainStore}
 */
const defaultMainStore = Object.freeze({
  ui: {
    theme: "auto",
    accent: "#880000",
  },
});

// load from loca storage
/**
 * @type {MainStore}
 */
const loadedMainStore = null;

/**
 * @type {MainStore}
 */
function initMainStore() {
  return loadedMainStore || defaultMainStore;
}

export const main = defineStore("main", initMainStore);

export default main;
