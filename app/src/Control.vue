<template>
  <v-app full-height>
    <v-layout full-height>

      <title-bar></title-bar>

      <system-bar></system-bar>

      <app-bar></app-bar>

      <drawer-right v-model.isOpen="drawerRight"></drawer-right>

      <v-main scrollable>
        <div class="wrapper-main">
          <v-container fluid>
            <router-view v-slot="{ Component, route }">
              <transition name="fade">
                <!-- <keep-alive> -->
                <component :is="Component" :key="route.path" />
                <!-- </keep-alive> -->
              </transition>
            </router-view>
          </v-container>
        </div>
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
import { CONFIG } from "@louvorja/shared";

import { useRouter, useRoute } from "vue-router";

import { computed, ref, watch, onMounted } from "vue";

import TitleBar from "./components/control/TitleBar.vue";
import SystemBar from "./components/control/SystemBar.vue";
import AppBar from "./components/control/AppBar.vue";
import DrawerRight from "./components/control/DrawerRight.vue";

const drawerRight = ref(null);

const router = useRouter();
onMounted(() => router.push({ name: CONFIG.application.startPage }));

window.document.title = CONFIG.application.name;
</script>
<style scoped lang="scss">
.wrapper-main {
  height: 100%;

  &:before {
    z-index: 0;
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-image: url(@/assets/images/bg-main.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.1;
  }
}
</style>
