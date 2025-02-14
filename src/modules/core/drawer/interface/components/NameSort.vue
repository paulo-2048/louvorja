<template>
  <div>
    <v-container fluid>
      <div class="d-flex flex-column align-center justify-center pa-6">
        <h2 class="text-h4 mb-4">{{ t("nameDraw") }}</h2>
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="newName"
              :label="t('enterName')"
              variant="outlined"
              @keyup.enter="addName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn
              color="secondary"
              min-width="12em"
              @click="addName"
              :disabled="!newName"
            >
              {{ t("addName") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-list class="w-100 mt-4">
          <v-list-item
            v-for="(name, index) in names"
            :key="index"
            :title="name"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-delete"
                variant="text"
                @click="removeName(index)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-btn
          color="primary"
          class="mt-4"
          @click="drawName"
          :disabled="names.length === 0"
        >
          {{ t("draw") }}
        </v-btn>
        <div v-if="currentName" class="text-h2 mt-6">
          {{ currentName }}
        </div>
      </div>
    </v-container>

    <Footer :t="t" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps } from "vue";
import Footer from "../layouts/Footer.vue";

// Props
defineProps({
  t: Function,
});

// Setup a saveHistory emit to parent component
const emit = defineEmits(["saveHistory"]);

const names = ref([]);
const newName = ref("");
const currentName = ref(null);

function addName() {
  if (newName.value.trim()) {
    names.value.push(newName.value.trim());
    newName.value = "";
  }
}

function removeName(index) {
  names.value.splice(index, 1);
}

function drawName() {
  if (names.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * names.value.length);
    currentName.value = names.value[randomIndex];
    emit("saveHistory", {
      type: "name",
      value: currentName.value,
    });
  }
}
</script>

<style></style>
