<template>
  <v-app-bar
    v-if="louvorJA?.application"
    density="comfortable"
    ref="title-bar"
    :elevation="4"
  >
    <template v-slot:prepend>
      <img
        style="height: 100%; width: 36px"
        src="@/assets/images/louvor-ja.svg"
      />
      <span class="text-overline ml-3 mr-0 pr-0">{{ CONFIG.application.name }}</span>
    </template>

    <v-app-bar-title class="text-center">
      <v-alert style="-webkit-app-region: drag"
        class="rounded-pill" variant="tonal"
        >
      </v-alert>
    </v-app-bar-title>

    <template v-slot:append>
        <v-btn icon @click="louvorJA.application.minimize()">
          <v-icon icon="mdi-window-minimize"></v-icon>
          <v-tooltip activator="parent" location="bottom">Minimize</v-tooltip>
        </v-btn>
        <v-btn icon @click="unmaximize()" v-if="isMaximized">
          <v-icon icon="mdi-window-restore"></v-icon>
          <v-tooltip activator="parent" location="bottom">Unmaximize</v-tooltip>
        </v-btn>
        <v-btn icon @click="maximize()" v-if="!isMaximized">
          <v-icon icon="mdi-window-maximize"></v-icon>
          <v-tooltip activator="parent" location="bottom">Maximize</v-tooltip>
        </v-btn>
        <v-btn icon @click="showQuit = true">
          <v-icon icon="mdi-window-close"></v-icon>
          <v-tooltip activator="parent" location="bottom">Quit</v-tooltip>
        </v-btn>
    </template>
  </v-app-bar>
  <v-dialog
      v-model="showQuit"
      width="auto"
    >
      <v-card>
        <v-card-text>
          Do you really want to quit?
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="error" class="flex-grow-1" icon="mdi-exit-run" @click="quit()">Yes</v-btn>
          <v-btn color="primary" class="flex-grow-1" icon="mdi-cancel" @click="showQuit = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { CONFIG } from "@louvorja/shared";
import { ref } from "vue";

const louvorJA = window.louvorJA;
const showQuit = ref(false);
const isMaximized = ref(false);

const checkState = async () => {
  isMaximized.value = await louvorJA?.application.isMaximized();
};
checkState();

const maximize = async () => {
  isMaximized.value = await louvorJA.application.maximize();
  setTimeout(checkState, 250);
};
const unmaximize = async () => {
  isMaximized.value = !(await louvorJA.application.unmaximize());
  setTimeout(checkState, 250);
};

const quit = () => {
    louvorJA.application.quit();
};
</script>
