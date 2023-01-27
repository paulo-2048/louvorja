<template>
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
          <v-tooltip activator="parent" location="bottom"> Liturgy </v-tooltip>
        </v-tab>
        <v-tab :to="{ name: 'tools' }" ripple exact>
          <v-icon size="x-large">mdi-toolbox</v-icon>
          <span class="ml-4 d-none d-sm-inline-block">Tools</span>
          <v-tooltip activator="parent" location="bottom"> Tools </v-tooltip>
        </v-tab>
      </v-tabs>
    </template>

    <template v-slot:append>
      <theme-switcher></theme-switcher>
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
</template>

<script setup>
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { open as openProjection } from "@/composables/projection";

</script>
