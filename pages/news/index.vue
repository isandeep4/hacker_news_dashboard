<script setup>
const { hackerNews, error, refresh, pending } = useHackerNews();
</script>
<template>
  <section>
    <h1>Hacker News</h1>

    <p v-if="pending">Loading...</p>
    <p v-else-if="error">Failed to load todos</p>

    <HackerNewsList v-else :hackerNews="hackerNews" />
  </section>
</template>
