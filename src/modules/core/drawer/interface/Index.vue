<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ModuleContainer ref="moduleContainer" :manifest="manifest">
    <template v-slot:header>
      <v-tabs v-model="tab" align-tabs="center" :color="$theme.primary()">
        <v-tab :value="1">{{ t("numberDraw") }}</v-tab>
        <v-tab :value="2">{{ t("nameDraw") }}</v-tab>
        <v-tab :value="3">{{ t("history") }}</v-tab>
      </v-tabs>
    </template>

    <v-tabs-window v-model="tab">
      <!-- Number Draw Tab -->
      <v-tabs-window-item :value="1">
        <NumberSort :t="t" @saveHistory="saveHistory" />
      </v-tabs-window-item>

      <!-- Name Draw Tab -->
      <v-tabs-window-item :value="2">
        <NameSort :t="t" @saveHistory="saveHistory" />
      </v-tabs-window-item>

      <!-- History Tab -->
      <v-tabs-window-item :value="3">
        <v-container fluid>
          <v-list>
            <v-list-item
              v-for="(item, index) in history"
              :key="index"
              :title="
                item.type === 'number'
                  ? t('numberDrawResult')
                  : t('nameDrawResult')
              "
              :subtitle="item.value.toString()"
            >
              <template v-slot:prepend>
                <v-icon
                  :icon="item.type === 'number' ? 'mdi-numeric' : 'mdi-account'"
                ></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </ModuleContainer>
</template>

<script setup>
import { ref } from "vue";
import ModuleContainer from "@/layout/ModuleContainer.vue";
import manifest from "../manifest.json";
import NumberSort from "./components/NumberSort.vue";
import NameSort from "./components/NameSort.vue";

// Translation setup
const moduleContainer = ref(null);
const t = (key) => {
  return moduleContainer.value?.t(key) || key;
};

// State
const tab = ref(1);
const history = ref([]);

// Function to child components save history
function saveHistory(item) {
  history.value.unshift(item);
}
</script>
