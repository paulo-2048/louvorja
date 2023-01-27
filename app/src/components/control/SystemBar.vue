<template>
  <v-system-bar>
    <!-- system status: is WEb? is Desktop? server websocket status? projection activated? -->
    <span class="bg-info px-1">{{ hostname }}:{{ port }}{{ path }}</span>
  </v-system-bar>
</template>
<script setup>
const { hostname, port } = window.location;
const path = window.location.pathname.split("control.html")[0];
</script>
