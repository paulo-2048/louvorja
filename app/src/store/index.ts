import { defineStore } from "pinia";

export interface UI {
  theme: string;
  accent: string;
}

export interface MainStore {
  ui: UI;
}

const defaultMainStore: MainStore = {
  ui: {
    theme: 'auto',
    accent: "#880000",
  },
};

// load from loca storage
const loadedMainStore: MainStore | null = null;

export const main = defineStore("main", (): MainStore => {
  return loadedMainStore || defaultMainStore;
});

export default main;
