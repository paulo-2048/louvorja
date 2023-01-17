<template>
  <v-app full-height>
    <v-layout full-height>
      <v-system-bar></v-system-bar>

      <v-app-bar title="Louvor JA">
        <v-spacer></v-spacer>
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
      </v-app-bar>
      <v-navigation-drawer location="right">
        <div
          style="
            background: yellow;
            width: 100%;
            color: black;
            aspect-ratio: 16/9;
          "
        >
          <iframe src="http://localhost:5177/projection"></iframe>
        </div>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <v-container fluid class="overflow-y-auto" style="height: 100%">
          <v-row>
            <v-col>
              <json-viewer :value="store"></json-viewer>
              <json-viewer :value="store"></json-viewer>

              <json-viewer :value="store"></json-viewer>
              <json-viewer :value="store"></json-viewer>
            </v-col>
            <v-col>
              <router-view v-slot="{ Component, route }">
                <transition name="fade">
                  <keep-alive>
                    <component :is="Component" :key="route.path" />
                  </keep-alive>
                </transition>
              </router-view>
            </v-col>
          </v-row>
        </v-container>

        <v-bottom-navigation></v-bottom-navigation>
      </v-main>

      <v-footer app>
        LITURGIA | UTILITARIOS (mobile only | use tabs instead of 2
        cols)</v-footer
      >
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

const dispatcher = new Dispatcher();
dispatcher.register();

window.addEventListener(
  "beforeunload",
  function (e) {
    dispatcher?.unregister();
  },
  false
);

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
</script>

<style></style>
