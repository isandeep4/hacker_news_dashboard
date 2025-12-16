<template>
  <div class="grid-table" :style="{ '--grid-columns': gridTemplateColumns }">
    <div class="grid-table__header">
      <div v-for="col in columns" :key="col.key">{{ col.label }}</div>
    </div>
    <div v-if="stories.length">
      <StoryCard
        v-for="story in storyList"
        :key="story.id"
        :story="story"
        :columns="columns"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { StoryI, Column } from "~/components/stories/types.ts";
import StoryCard from "~/components/stories/StoryCard.vue";

const props = defineProps<{ storyList?: StoryI[] }>();
const stories = props.storyList ?? [];

const columns: Column[] = [
  { key: "image", label: "Image", width: "1fr" },
  { key: "title", label: "Article title", width: "2fr" },
  { key: "time", label: "Formatted timestamp", width: "1fr" },
  { key: "score", label: "Article score", width: "1fr" },
  { key: "id", label: "Author ID", width: "1fr" },
  { key: "karma", label: "Author karma score", width: "1fr" },
];
const gridTemplateColumns = columns.map((c) => c.width).join(" ");
</script>
<style lang="scss" src="./grid-table.scss" scoped></style>
