<template>
  <div class="grid-table" :style="{ '--grid-columns': gridTemplateColumns }">
    <div class="grid-table__header">
      <div
        v-for="col in columns"
        :key="col.key"
        @click="onSort(col)"
        class="header-cell"
        :class="{ sortable: col.sortable }"
      >
        {{ col.label }}
        <span v-if="col.sortable" class="sort-icon">
          <span v-if="sortKey === col.key">
            {{ sortOrder === "asc" ? "▲" : "▼" }}
          </span>
          <span v-else class="inactive">▲▼</span>
        </span>
      </div>
    </div>
    <div v-if="stories.length">
      <StoryCard
        v-for="story in sortedStories"
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
  { key: "image", label: "Image", width: "1fr", sortable: false },
  { key: "title", label: "Article title", width: "2fr", sortable: false },
  { key: "time", label: "DateTime", width: "1fr", sortable: true },
  { key: "score", label: "Article score", width: "0.6fr", sortable: true },
  { key: "id", label: "Author ID", width: "1fr", sortable: false },
  {
    key: "karma",
    label: "Author karma score",
    width: "0.6fr",
    sortable: false,
  },
];
const gridTemplateColumns = columns.map((c) => c.width).join(" ");
const sortKey = ref<string | null>(null);
const sortOrder = ref<"asc" | "desc">("asc");

function onSort(col: Column) {
  if (!col.sortable) return;
  if (sortKey.value === col.key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = col.key;
    sortOrder.value = "asc";
  }
}

const sortedStories = computed(() => {
  if (!sortKey.value) return stories;
  return [...stories].sort((a, b) => {
    const aVal = a[sortKey.value!];
    const bVal = b[sortKey.value!];
    if (aVal === bVal) return 0;
    const result = aVal! > bVal! ? 1 : -1;
    return sortOrder.value === "asc" ? result : -result;
  });
});
</script>
<style lang="scss" src="./grid-table.scss" scoped></style>
