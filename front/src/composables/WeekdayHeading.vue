<template>
  <div>
    <p class="day">{{ formatDate(heading.date) }}</p>
    <div class="week-time">
      <p class="week-day-name">{{ heading.label }}</p>
      <p class="day-time">0:00:00</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps<{ heading: any }>();
function formatDate(date: string): string {
  return dayjs(date).format("D");
}
</script>

<style scoped>
</style>
