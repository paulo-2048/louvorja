import { defineStore } from "pinia";

export const main = defineStore("main", () => {
  return {
    ui: {
        theme: null,
        accent: '#880000'
    }
  };
});

export default main;
