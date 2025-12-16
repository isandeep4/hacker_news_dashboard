<template>
  <div v-if="story">
    <h1>{{ story.title }}</h1>

    <img :src="story.image" alt="" />

    <p><strong>Score:</strong> {{ story.score }}</p>
    <p><strong>By:</strong> {{ story.by }}</p>
    <p><strong>Time:</strong> {{ story.time }}</p>
    <p>
      <strong>URL:</strong>
      <a :href="story.url" target="_blank">
        {{ story.url }}
      </a>
    </p>
  </div>

  <p v-else>Loading story...</p>
</template>
<script setup>
const route = useRoute();
const cached = useNuxtData("stories");
const story = computed(() =>
  cached.data.value?.find((story) => String(story.id) === route.params.id)
);
</script>
