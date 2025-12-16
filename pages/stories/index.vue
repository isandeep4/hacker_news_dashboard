<script setup>
import StoryList from "~/components/stories/StoryList.vue";

const { stories, error, refresh, pending } = useFetchStories();
console.log("stories", stories.value);
</script>
<template>
  <section>
    <h1>Top 10 Stories</h1>

    <p v-if="pending">Loading...</p>
    <p v-else-if="error">Failed to load Stories</p>

    <StoryList v-else :storyList="stories" />
  </section>
</template>
