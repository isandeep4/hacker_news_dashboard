<template>
  <li>
    <span>
      {{ hackerNew.title }}
    </span>
  </li>
</template>

<script setup>
defineProps({
  hackerNew: Object,
});
</script>
