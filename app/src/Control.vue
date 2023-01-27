<template>
  <v-app full-height>
    <v-layout full-height>
      <v-system-bar>
        <!-- system status: is WEb? is Desktop? server websocket status? projection activated? -->
        <span class="bg-info px-1">{{ hostname }}:{{ port }}{{path}}</span>
      </v-system-bar>

      <v-app-bar density="compact" ref="app-bar">
        <template v-slot:title>
          <v-tabs centered grow>
            <v-tab :to="{ name: 'home' }">
              <img
                style="height: 100%; width: 36px"
                src="@/assets/images/louvor-ja.svg"
              />
              <span class="ml-4 d-none d-sm-inline-block">Louvor JA</span>
            </v-tab>
            <v-tab :to="{ name: 'liturgy' }" ripple exact>
              <v-icon size="x-large">mdi-church</v-icon>
              <span class="ml-4 d-none d-sm-inline-block">Liturgy</span>
              <v-tooltip activator="parent" location="bottom">
                Liturgy
              </v-tooltip>
            </v-tab>
            <v-tab :to="{ name: 'tools' }" ripple exact>
              <v-icon size="x-large">mdi-toolbox</v-icon>
              <span class="ml-4 d-none d-sm-inline-block">Tools</span>
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
              <v-tooltip activator="parent">Theme toggle</v-tooltip>
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
          <v-tooltip activator="parent">Open projection in new tab</v-tooltip>
        </v-btn>

        <v-btn icon @click.stop="drawerRight = !drawerRight">
          <v-icon>mdi-monitor-eye</v-icon>
          <v-tooltip activator="parent">Show/hide drawer preview</v-tooltip>
        </v-btn>
      </v-app-bar>
      <drawer-right v-model.isOpen="drawerRight"></drawer-right>
      <v-main scrollable>
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
import { useRouter, useRoute } from "vue-router";
import { open as openProjection } from "@/composables/projection";

import { main as mainStore } from "@/store/index";
import { useTheme } from "vuetify";
import { strings } from "@louvorja/shared";
import { theme as themeMod, CONFIG } from "@louvorja/shared";
import { computed, ref, watch, onMounted } from "vue";

import DrawerRight from "./components/control/DrawerRight.vue";
const drawerRight = ref(null);

const router = useRouter();
onMounted(() => router.push({ name: CONFIG.app.startPage }));

window.document.title = CONFIG.app.name;

const { hostname, port } = window.location;
const path = window.location.pathname.split('control.html')[0]

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
