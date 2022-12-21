import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./partials/i18n";
import store from "./store/index.js";
import Vue3Storage from "vue3-storage";
import { StorageType } from "vue3-storage";
import TreeView from "vue-json-tree-view";
import * as FlagIcon from "vue-country-flag-next";
import VueFullscreen from "vue-fullscreen";
import ShortKey from "vue3-shortkey";

import "./assets/dist/css/custom.css";


const app = createApp(App);

app
  .use(FlagIcon)
  .use(i18n)
  .use(TreeView)
  .use(router)
  .use(ShortKey, { prevent: ["input", "textarea"] })
  .use(store)
  .use(Vue3Storage, { namespace: "lja_", storage: StorageType.Local })
  .use(vuetify)
  .use(VueFullscreen)
  .mount("#app");

//process.env.VUE_APP_VERSION = require('./package.json').version
