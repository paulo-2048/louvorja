<template>
  <v-app full-height>
    <v-layout fill-height>
      <v-system-bar></v-system-bar>

      <v-app-bar title="Louvor JA">
        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          @click="toggleTheme"
        >
          Toggle Theme
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer> </v-navigation-drawer>
      <v-main>
        <v-container>
          <json-viewer :value="store"></json-viewer>
          <router-view v-slot="{ Component, route }">
            <transition name="fade">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
          Content area
        </v-container>
      </v-main>

      <v-footer></v-footer>
      <v-bottom-navigation></v-bottom-navigation>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { main as mainStore } from "@/store/index";
import { useTheme } from "vuetify";

const store = mainStore();
const theme = useTheme();

store.ui.theme = theme.global.name;

const toggleTheme = () => {
  const actual = theme.global.name.value;
  console.log(theme.global.name)
  const newLight = actual.replace("dark", "light");
  const newDark = actual.replace("light", "dark");
  store.ui.theme = actual === newDark ? newLight : newDark;
  theme.global.name.value = store.ui.theme;
};

window.matchMedia('(prefers-color-scheme: dark)').addListener(toggleTheme);
</script>

<style></style>
