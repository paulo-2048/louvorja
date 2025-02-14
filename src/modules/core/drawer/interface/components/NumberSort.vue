<template>
  <div>
    <v-container fluid>
      <div class="d-flex flex-column align-center justify-center pa-6">
        <h2 class="text-h4 mb-4">{{ t("numberDraw") }}</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="startRange"
              :label="t('startNumber')"
              type="number"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="endRange"
              :label="t('endNumber')"
              type="number"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          class="mt-4"
          @click="drawNumber"
          :disabled="!isValidRange"
        >
          {{ t("draw") }}
        </v-btn>
        <div v-if="currentNumber !== null" class="text-h2 mt-6">
          {{ currentNumber }}
        </div>
      </div>
    </v-container>

    <Footer :t="t" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, defineProps } from "vue";
import Footer from "../layouts/Footer.vue";

// Props
defineProps({
  t: Function,
});

// Setup a saveHistory emit to parent component
const emit = defineEmits(["saveHistory"]);

const startRange = ref(1);
const endRange = ref(100);
const currentNumber = ref(null);

// Computed
const isValidRange = computed(() => {
  return (
    startRange.value < endRange.value &&
    Number.isInteger(startRange.value) &&
    Number.isInteger(endRange.value)
  );
});

// Methods
function drawNumber() {
  const min = Math.ceil(startRange.value);
  const max = Math.floor(endRange.value);
  currentNumber.value = Math.floor(Math.random() * (max - min + 1)) + min;
  emit("saveHistory", {
    type: "number",
    value: currentNumber.value,
  });
}
</script>

<style></style>
