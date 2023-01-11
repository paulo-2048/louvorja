<template>
  <div>
    <system />
    <stop-watch v-if="page == 'stopwatch'" />
  </div>
</template>

<script>
import System from "@/layout/sidebars/SystemSidebar.vue";
import StopWatch from "@/layout/sidebars/StopwatchSidebar.vue";

export default {
  data() {
    return this.$store.state;
  },
  components: {
    System,
    StopWatch,
  },
};
</script>
