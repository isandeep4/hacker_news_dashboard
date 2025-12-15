<template>
  <ul v-if="hackerNews.length">
    <HackerNewsCard
      v-for="hackerNew in hackerNews"
      :key="hackerNew.id"
      :hackerNew="hackerNew"
    />
  </ul>
</template>
<script setup>
defineProps({
  hackerNews: {
    type: Array,
    required: true,
  },
});
</script>
