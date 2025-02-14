<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="border w-full">
    <div class="info">
      <div class="info-icon" v-if="!isProjecting">
        <v-icon class="text-warning" icon="mdi-circle"></v-icon>
      </div>

      <div class="info-icon" v-else>
        <v-icon class="text-success" icon="mdi-circle"></v-icon>
      </div>
      <div>Projection {{ isProjecting ? "Active" : "Off" }}</div>
    </div>

    <div class="stats">
      <div>{{ t("footer.total") }}: {{ total }}</div>
      <div>{{ t("footer.sorted") }}: {{ sorted }}</div>
      <div>{{ t("footer.remaining") }}: {{ remaining }}</div>
    </div>
  </footer>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  t: Function,
  total: {
    type: Number,
    default: 0,
  },
  sorted: {
    type: Number,
    default: 0,
  },
});

const remaining = computed(() => props.total - props.sorted || 0);

const isProjecting = false;
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid #e9ecef;
}

.info {
  display: flex;
  align-items: center;
  padding-left: 1em;
  gap: 0.5em;
}

.stats {
  padding-right: 1em;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1em;
}

.info-icon {
  font-size: 0.5em;
  animation: pulse 1s infinite;
}
</style>
