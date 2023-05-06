<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-btn @click="add()">add</v-btn>
    <v-btn @click="rm()">rm</v-btn>
    <v-btn @click="clear()">clear</v-btn>
  </div>
</template>

<script setup>
const debug = true;

import { Dispatcher, Event, Participant } from "@louvorja/shared";
/*
 *  DISPACTHER
 */

const event = Event.create(
  Participant.control("tools", "demo"),
  Participant.projection("layers", "center"),
  "add", {
  template: "<h1 data-id='title' style='font-size: 10vh'>Louvor JA</h1>",
  animate: {
      cssClass: "animate__animated animate__fadeIn animate__faster",
  },
});

const dispatcher = new Dispatcher();
dispatcher.register();

window.addEventListener(
  "beforeunload",
  function (e) {
    dispatcher?.unregister();
  },
  false
);

const add = () => {
  dispatcher.send(event);
};
const clear = () => {
  dispatcher.send(
    event.with({
      layer: "*",
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
  dispatcher.send(
    event.with({
      layer: "center",
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
