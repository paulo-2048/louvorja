<template>
  <v-navigation-drawer location="right" v-model="isOpen" permanent>
    <div>
      <v-btn
        v-for="aspectRatio of aspectRatios"
        :style="{ width: `${100 / aspectRatios.length}%` }"
        @click="currentAspectRatio = aspectRatio"
        :variant="aspectRatio === currentAspectRatio ? 'tonal' : 'text'"
      >
        {{ aspectRatio }}
      </v-btn>
    </div>

    <div class="preview" :style="{ aspectRatio: currentAspectRatio }">
      <span>PREVIEW</span>
      <iframe :src="previewUrl"></iframe>
    </div>
    <div class="preview-url text-info">{{ previewUrl }}</div>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import useModelWrapper from "@/composables/modelWrapper";
import useProjection from "@/composables/projection";

// isOpen (open/close)
const props = defineProps(["isOpen"]);
const emit = defineEmits(["update:isOpen"]);
const isOpen = useModelWrapper(props, emit, "isOpen");

const aspectRatios = reactive(["4/3", "16/9"]);
const currentAspectRatio = ref("16/9");

const { url } = useProjection();
let previewUrl = url("preview");
</script>

<style scoped lang="scss">
.preview {
  aspect-ratio: 16/9;
  background: yellow;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  position: relative;

  & > span {
    font-family: monospace;
    color: black;
    font-weight: bold;

    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);

    z-index: 800;
  }

  & > iframe {
    z-index: 900;

    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}

.preview-url {
  /*font-family: "DIN Pro";*/
  white-space: nowrap;
  text-align: center;
  direction: rtl;
  overfow-x: hidden;
}
</style>
