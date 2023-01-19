<template>
  <div class="projection-wrapper" ref="wrapper">
    <div class="projection-background" ref="background"></div>
    <div class="projection-player" ref="player"></div>
    <div class="projection-main" ref="main"></div>
    <div class="projection-left" ref="left"></div>
    <div class="projection-right" ref="right"></div>
    <div class="projection-top" ref="top"></div>
    <div class="projection-bottom" ref="bottom"></div>
    <div class="projection-center" ref="center"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import {
  Dispatcher,
  Event,
  DefaultHandler,
  DefaultHandlerLoader,
} from "@louvorja/shared";

const wrapper = ref(null);
const background = ref(null);
const player = ref(null);
const main = ref(null);
const left = ref(null);
const right = ref(null);
const top = ref(null);
const bottom = ref(null);
const center = ref(null);

let videoTag;

const resizePlayers = (event = null) => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  document.querySelector("video.fullscreen")?.forEach((video) => {
    video.width = vw;
    video.height = vh;
  });
};

const targetHandlers = {};

let dispatcher = null;

onMounted(async () => {
  videoTag = player.value.querySelector("video");

  const elements = {
    wrapper,
    background,
    player,
    main,
    left,
    right,
    top,
    bottom,
    center,
  };
  const loaders = [new DefaultHandlerLoader()];
  const handlers = {};
  for (const target in elements) {
    let handler;
    for (let loader in loaders) {
      try {
        handler = await loader.load(target);
      } catch (error) {
        console.warn(
          `App (projection) import error for ${target}. Will use default instead!`
        );
      }
    }
    handlers[target] = handler || new DefaultHandler(elements[target].value);
  }
  dispatcher = new Dispatcher(handlers);

  dispatcher.register();
  resizePlayers();
});

onBeforeUnmount(() => {
  dispatcher?.unregister();
});

window.addEventListener(
  "beforeunload",
  function (e) {
    dispatcher?.unregister();
  },
  false
);

window.onresize = resizePlayers;

</script>

<style scoped lang="scss">
.projection-wrapper,
.projection-wrapper > *,
.projection-video > video {
  margin: 0;
  padding: 0;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: transparent;

  pointer-events: none;
}
.projection-wrapper {
  & > * > * {
    pointer-events: auto;
  }

  & > .projection-video {
  }

  & > .projection-top {
    text-align: center;
    color: red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
  }

  & > .projection-bottom {
    text-align: center;
    color: blue;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
  }

  & > .projection-left {
    text-align: center;
    color: green;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
  }

  & > .projection-right {
    text-align: right;
    color: yellow;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
  }

  & > .projection-center {
    text-align: justify;
    color: pink;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }
}
</style>
