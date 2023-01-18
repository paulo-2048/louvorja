<template>
  <div
    class="d-flex align-center justify-center fill-height"
    style="background: rgba(11, 61, 98, 1)"
  >
    <!-- <ico src="louvorja" size="100" /> -->
    <div
      v-if="debug"
      class="white flex-grow-1 fill-height"
      style="overflow: auto"
    >
      <json-viewer :value="$data" copyable boxed sort theme="jv-light" />
    </div>
  </div>
</template>

<script setup>
</script>
