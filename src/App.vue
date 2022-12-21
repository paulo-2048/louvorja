<template>
  <v-app :dark="$root.data.layout.dark">
    <app-side-bar />
    <app-dialog />
    <!-- <app-store /> -->
    <app-alert />
    <app-lyric />

    <v-layout fill-height style="height: 100vh">
      <v-layout column fill-height style="height: 100vh">
        <app-header />
        <app-tabs />
        <v-main style="overflow: auto; flex: auto">
          <keep-alive :include="tabs">
            <router-view />
          </keep-alive>
        </v-main>
        <app-player />
        <app-progress />
        <app-footer />
      </v-layout>
      <app-music-bar />
    </v-layout>
  </v-app>
</template>

<script>
export default {
  components: {
    AppSideBar: () => import("@/layout/SideBar.vue"),
    AppDialog: () => import("@/layout/Dialog.vue"),
    //AppStore: () => import("@/layout/Store.vue"),
    AppAlert: () => import("@/layout/Alert.vue"),
    AppLyric: () => import("@/layout/Lyric.vue"),
    AppHeader: () => import("@/layout/Header.vue"),
    AppTabs: () => import("@/layout/TabsPages.vue"),
    AppPlayer: () => import("@/layout/Player.vue"),
    AppProgress: () => import("@/layout/Progress.vue"),
    AppFooter: () => import("@/layout/Footer.vue"),
    AppMusicBar: () => import("@/layout/Music.vue"),
  },
  created() {
    document.title = "Louvor JA";
  },
  computed: {
    tabs: function () {
      return this.$root.openpages.map((item) => {
        return item.name;
      });
    },
  },
};
</script>

<style>
@font-face {
  font-family: din-condensed-bold;
  src: url("~@/assets/fonts/din-condensed-bold.ttf");
}
</style>
