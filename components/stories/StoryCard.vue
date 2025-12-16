<template>
  <NuxtLink
    :to="`/stories/${story.id}`"
    class="grid-table__row"
    role="row"
    :aria-label="`Story: ${story.title}, by ${story.by}, score ${story.score}`"
  >
    <div
      v-for="col in columns"
      :key="col.key"
      :data-label="col.label"
      role="cell"
      class="cell"
    >
      <div v-if="col.key === 'image'">
        <img
          :src="story[col.key]"
          :alt="`Image for ${story.title}`"
          width="50"
          height="50"
        />
      </div>
      <div v-else-if="col.key === 'title'">
        <a
          :href="story.url"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          {{ story.title }}
        </a>
      </div>
      <div v-else>
        {{ story[col.key] }}
      </div>
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
