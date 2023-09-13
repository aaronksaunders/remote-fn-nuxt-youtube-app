<template>
  <div>
    <div style="margin: 8px">
      <input type="text" placeholder="Describe Stuff" v-model="stuffInput" />
    </div>
    <div style="margin: 8px">
      <label for="important">
        <span>Important</span>
        <input
          v-model="importantInput"
          name="important"
          type="checkbox"
          placeholder="Important"
        />
      </label>
    </div>
    <div style="margin: 8px">
      <button @click="addStuffToDatabase">ADD TO DATABASE</button>
    </div>
  </div>
  <div>
  <p v-if="newRecordError">Error Adding Record {{ newRecordError }}</p>
  </div>
  <div>
    <div v-for="item in stuffResults" :key="item.id">
      <p>{{ item }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NuxtError } from "nuxt/app";
import { basicFunction, addTheStuff, getAllTheStuff } from "./lib/api.server";
const stuffInput = ref();
const importantInput = ref();
const newRecordResult = ref();
const newRecordError = ref();

const basicResult = await basicFunction("Aaron Saunders");

const { data: stuffResults, error: stuffResultsError } = useAsyncData(
  "stuff",
  () => getAllTheStuff(),
  { watch: [newRecordResult] }
);

/**
 *
 */
const addStuffToDatabase = async () => {
  try {
    newRecordResult.value = await addTheStuff({
      stuff: stuffInput.value,
      important: importantInput.value ? 1 : 0,
    });
    console.log(newRecordResult.value);
  } catch (error) {
    newRecordError.value = (error as NuxtError).data?.message;
  }
};
</script>
