<template>
  <NuxtLink to="/" class="back-button"> ← Back to Stories </NuxtLink>
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
<style scoped lang="scss">
.back-button {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #1babd6;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}
</style>
