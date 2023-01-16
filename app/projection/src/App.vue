<template>
  <div class="projection-wrapper" ref="wrapper">
    <div class="projection-background" ref="background"></div>
    <div class="projection-player" ref="player">
      <video autoplay controls poster="poster.jpg">
        <source src="./movie.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="projection-main" ref="main">
      <button @click="add()">add</button>
      <button @click="rm()">rm</button>
      <button @click="clear()">clear</button>
    </div>
    <div class="projection-left" ref="left"></div>
    <div class="projection-right" ref="right"></div>
    <div class="projection-top" ref="top"></div>
    <div class="projection-bottom" ref="bottom"></div>
    <div class="projection-center" ref="center"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { LoremIpsum } from "lorem-ipsum";

import {
  ProjectionDispatcher,
  ProjectionEvent,
  DefaultProjectionHandler,
  DefaultProjectionHandlerLoader,
} from "@louvorja/shared";

const loremIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const lorem = () => loremIpsum.generateParagraphs(1);

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

const resizePlayer = (event = null) => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  videoTag.width = vw;
  videoTag.height = vh;
};

const targetHandlers = {};

let projectionDispatcher = null;

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
  const loaders = [new DefaultProjectionHandlerLoader()];
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
    handlers[target] =
      handler || new DefaultProjectionHandler(elements[target].value);
  }
  projectionDispatcher = new ProjectionDispatcher(handlers);

  projectionDispatcher.register();
  resizePlayer();
});

onBeforeUnmount(() => {
  projectionDispatcher?.unregister();
});

window.addEventListener(
  "beforeunload",
  function (e) {
    projectionDispatcher?.unregister();
  },
  false
);

window.onresize = resizePlayer;

let counter = 0;

const event = ProjectionEvent.create("center", "add", {
  template: "<h1 data-id='title'>Louvor JA</h1>",
  animate: {
    cssClass: "animate__animated animate__fadeIn animate__faster",
  },
});

const add = () => {
  projectionDispatcher.send(event);
};
const clear = () => {
  projectionDispatcher.send(
    event.with({
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
  projectionDispatcher.send(
    event.with({
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
