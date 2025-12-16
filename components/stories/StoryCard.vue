<template>
  <NuxtLink :to="`/stories/${story.id}`" class="grid-table__row">
    <div v-for="col in columns" :key="col.key" :data-label="col.label">
      <template v-if="col.key === 'image'">
        <img :src="story[col.key]" alt="item image" width="50" height="50" />
      </template>
      <template v-else>
        {{ story[col.key] }}
      </template>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { StoryI, Column } from "~/components/stories/types.ts";

const props = defineProps<{
  story: StoryI;
  columns: Array<Column>;
}>();
</script>
<style lang="scss" src="./grid-table.scss" scoped></style>
