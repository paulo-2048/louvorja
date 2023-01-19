<template>
  <v-app full-height>
    <v-layout full-height>
      <v-system-bar
        >system status: is WEb? is Desktop? server websocket status? projection
        activated?</v-system-bar
      >

      <v-app-bar density="compact" ref="app-bar">
        <template v-slot:title>
          <v-tabs centered grow>
            <v-tab :to="{ name: 'home' }">
              <v-img
                style="height: 100%; width: 36px"
                src="src/assets/images/louvor-ja.svg"
              ></v-img>
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
          <iframe :src="`${projectionUrl}?mode=preview`"> </iframe>
        </div>
      </v-navigation-drawer>
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
import { main as mainStore } from "@/store/index";
import { useTheme } from "vuetify";
import { strings } from "@louvorja/shared";
import { theme as themeMod } from "@louvorja/shared";
import { computed, ref, watch } from "vue";

const drawerRight = ref(null);
const aspectRatio = ref("16/9");

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

const projectionUrl = `${
  window.location.origin
}${window.location.pathname.replace("/control", "/projection")}`;
const openProjection = () => {
  window.open(`${projectionUrl}?mode=projection`, "projection");
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
