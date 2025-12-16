<template>
  <div
    class="grid-table"
    :style="{ '--grid-columns': gridTemplateColumns }"
    role="table"
    :aria-label="'Story list table'"
  >
    <div class="grid-table__header" role="rowgroup">
      <div
        v-for="col in columns"
        :key="col.key"
        @click="onSort(col)"
        class="header-cell"
        :class="{ sortable: col.sortable }"
        role="columnheader"
        :aria-sort="
          sortKey === col.key
            ? sortOrder === 'asc'
              ? 'ascending'
              : 'descending'
            : 'none'
        "
        tabindex="0"
        @keydown.enter.space="col.sortable ? onSort(col) : null"
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
    <div v-if="stories.length" role="rowgroup">
      <StoryCard
        v-for="story in sortedStories"
        :key="story.id"
        :story="story"
        :columns="columns"
        role="row"
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
  { key: "score", label: "Score", width: "0.7fr", sortable: true },
  { key: "id", label: "Author ID", width: "0.5fr", sortable: false },
  {
    key: "karma",
    label: "karma",
    width: "0.5fr",
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
