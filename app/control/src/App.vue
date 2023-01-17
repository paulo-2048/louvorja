<template>
  <v-app>
    <v-layout>
      <v-system-bar
        >system status: is WEb? is Desktop? server websocket status? projection
        activated?</v-system-bar
      >

      <v-app-bar density="compact" ref="app-bar">
        <template v-slot:prepend>
          <img
            style="height: 46px; width: 46px"
            src="src/assets/images/louvor-ja.svg"
          />
        </template>

        <template v-slot:title>
          <v-tabs centered grow>
            <v-tab to="liturgy">
              <v-icon size="x-large">mdi-church</v-icon>
              <v-tooltip activator="parent" location="bottom">
                Liturgy
              </v-tooltip>
            </v-tab>
            <v-tab to="tools">
              <v-icon size="x-large">mdi-toolbox</v-icon>
              <v-tooltip activator="parent" location="bottom">
                Tools
              </v-tooltip>
            </v-tab>
          </v-tabs>
        </template>

        <template v-slot:append>
          <v-menu
            bottom
            left
            :close-on-content-click="true"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn :icon="themeIcon" v-bind="props"> </v-btn>
            </template>

            <v-list density="compact">
              <v-list-item v-for="theme in themes" :key="theme.id">
                <v-list-item @click="toggleTheme(theme.id)">
                  <v-icon>{{ iconFor(theme) }}</v-icon>
                  {{ theme.name }}
                </v-list-item>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <v-btn icon @click.stop="openProjection()">
          <v-icon>mdi-monitor-screenshot</v-icon>
        </v-btn>

        <v-btn icon @click.stop="drawerRight = !drawerRight">
          <v-icon>mdi-monitor-eye</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer location="right" v-model="drawerRight" permanent>
        <div>
          <v-btn
            width="33.33333%"
            @click="aspectRatio = '4/3'"
            :variant="aspectRatio === '4/3' ? 'tonal' : 'text'"
          >
            4/3
          </v-btn>
          <v-btn
            width="33.33333%"
            @click="aspectRatio = '16/9'"
            :variant="aspectRatio === '16/9' ? 'tonal' : 'text'"
          >
            16/9
          </v-btn>
          <v-btn
            width="33.33333%"
            @click="aspectRatio = '1/1'"
            :variant="
              aspectRatio !== '16/9' && aspectRatio !== '4/3' ? 'tonal' : 'text'
            "
          >
            Screen
            <v-tooltip activator="parent" location="left">
              Should use projection screen aspect ratio
            </v-tooltip>
          </v-btn>
        </div>

        <div class="preview" :style="{ aspectRatio: aspectRatio }">
          <iframe :src="`${origin}/preview`"> </iframe>
        </div>

        <v-btn @click="add()">add</v-btn>
        <v-btn @click="rm()">rm</v-btn>
        <v-btn @click="clear()">clear</v-btn>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view v-slot="{ Component, route }">
            <transition name="fade">
              <!-- <keep-alive> -->
              <component :is="Component" :key="route.path" />
              <!-- </keep-alive> -->
            </transition>
          </router-view>
        </v-container>
      </v-main>
      <v-footer app>
        <v-row justify="center" no-gutters>
          <p>Louvor JA ©2023 - All rights reserved</p>
        </v-row>
      </v-footer>
    </v-layout>
  </v-app>
</template>

<script setup>
import { main as mainStore } from "@/store/index";
import { useTheme } from "vuetify";
import { strings } from "@louvorja/shared";
import { theme as themeMod } from "@louvorja/shared";
import { computed, ref, watch } from "vue";

import { Dispatcher, Event } from "@louvorja/shared";

const drawerRight = ref(null);
const aspectRatio = ref("16/9");
const origin = window.location.origin;

const { defaultTheme, isDarkMode, NamedThemeDefinition } = themeMod;

const store = mainStore();
const theme = useTheme();

const themes = Object.entries(theme.themes.value).map((t) => {
  return {
    id: t[0],
    name: t[1].name || strings.capitalize(t[0]),
    dark: t[1].dark,
  };
});
themes.splice(0, 0, {
  id: "auto",
  name: "Auto",
  dark: isDarkMode(),
});

const toggleTheme = (newTheme) => {
  // theme follows browser/operating system unless manually setted
  newTheme = typeof newTheme === "string" ? newTheme : newTheme.toString();
  if (newTheme === "auto") {
    selectedTheme.value = store.ui.theme = newTheme;
    theme.global.name.value = defaultTheme();
  } else if (store.ui.theme === "auto") {
    selectedTheme.value = theme.global.name.value = newTheme;
  } else {
    selectedTheme.value = theme.global.name.value = store.ui.theme = newTheme;
  }
};

const openProjection = () => {
  window.open(`${origin}/projection`, "projection");
};

store.ui.theme = theme.global.name.value;
const selectedTheme = ref(store.ui.theme);
watch(selectedTheme, (n, o) => toggleTheme(n));

const iconFor = (theme) => {
  return theme.dark ? "mdi-weather-night" : "mdi-weather-sunny";
};

const themeIcon = computed(() => {
  console.log(selectedTheme.value);
  return iconFor(themes.filter((t) => t.id === selectedTheme.value)[0]);
});

window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
  toggleTheme(defaultTheme());
});

/*
 *  DISPACTHER
 */

const event = Event.create("center", "add", {
  template: "<h1 data-id='title' style='font-size: 10vh'>Louvor JA</h1>",
  animate: {
    cssClass: "animate__animated animate__fadeIn animate__faster",
  },
});

const dispatcher = new Dispatcher();
dispatcher.register();

window.addEventListener(
  "beforeunload",
  function (e) {
    dispatcher?.unregister();
  },
  false
);

const add = () => {
  dispatcher.send(event);
};
const clear = () => {
  dispatcher.send(
    event.with({
      layer: "*",
      command: "clear",
      args: {
        animate: {
          cssClass: "animate__animated animate__fadeOut animate__faster",
        },
        delay: 500,
      },
    })
  );
};
const rm = () => {
  dispatcher.send(
    event.with({
      layer: "center",
      command: "remove",
      args: {
        dataId: "title",
        animate: {
          cssClass: "animate__animated animate__fadeOut animate__faster",
        },
        delay: 500,
      },
    })
  );
};
</script>

<style scoped lang="scss">
.preview {
  background: yellow;
  width: 100%;
  box-sizing: border-box;
  display: flex;

  & > iframe {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
