<template>
  <v-navigation-drawer
    location="right"
    v-model="isOpen"
    name="Preview"
    floating
    elevation="12"
  >
    <div class="drawer-right">
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
      <div class="preview-url text-primary bg-surface">
        <v-btn @click="open('preview')" block>
          <v-icon size="x-small">mdi-link-variant</v-icon>
          Preview
          <v-tooltip activator="parent">Open preview in new tab</v-tooltip>
        </v-btn>
      </div>

      <div>
        <v-list density="compact">
          <v-list-subheader>Configuration</v-list-subheader>

          <template v-for="(group, key) in CONFIG">
            <v-list-group
              value="Actions"
              :prepend-icon="'mdi-' + key"
              :title="group._name"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="group._name">
                  <v-tooltip activator="parent">
                    {{ group._description }}
                  </v-tooltip>
                </v-list-item>
              </template>

              <v-list-item v-for="(prop, i) in group._properties">
                <v-list-item-title>
                  {{ prop.name }}: {{ prop.value }}
                  <v-tooltip activator="parent">{{
                    prop.description
                  }}</v-tooltip>
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import useModelWrapper from "@/composables/modelWrapper";
import useProjection from "@/composables/projection";
import { CONFIG } from "@louvorja/shared";

// isOpen (open/close)
const props = defineProps({
  isOpen: { type: Boolean, required: false, default: true },
});
const emit = defineEmits(["update:isOpen"]);
const isOpen = useModelWrapper(props, emit, "isOpen");

const aspectRatios = reactive(["4/3", "16/9"]);
const currentAspectRatio = ref("16/9");

const { open, url } = useProjection();
const previewUrl = url("preview");
</script>

<style scoped lang="scss">
.drawer-right {
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

    background-image: url(@/assets/images/bg-drawer-right.jpg);
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
    opacity: 0.1;
  }
}

.preview {
  aspect-ratio: 16/9;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  position: relative;

  & > span {
    font-family: monospace;
    color: rgba(var(--v-theme-primary));
    font-weight: bold;

    margin: 0;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);

    z-index: 800;
    opacity: 0.3;
  }

  & > iframe {
    z-index: 900;
    opacity: 0.75;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}

.preview-url {
  white-space: nowrap;
  text-align: center;
  direction: rtl;
  overfow-x: hidden;
}
</style>
