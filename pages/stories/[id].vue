<template>
  <article v-if="story">
    <h1>{{ story.title }}</h1>
    <p>{{ story.text }}</p>
  </article>
</template>
<script setup>
const route = useRoute();
const cached = useNuxtData("stories");
const story = computed(() =>
  cached.data.value?.find((story) => String(story.id) === route.params.id)
);
</script>
