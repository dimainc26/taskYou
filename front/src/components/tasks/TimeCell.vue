<template>
  <p class="time-value">
    <span>{{ formatTime(hours) }}</span> :
    <span>{{ formatTime(minutes) }} AM</span>
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{ hours: number; minutes: number }>();

function formatTime(time: number): string {
  return String(time).padStart(2, '0');
}
</script>


<style lang="scss">
.vuecal__time-column {
  width: max-content;
  .vuecal__time-cell {
    display: flex;
    justify-content: center;
    align-items: center;

    .time-value {
      color: var(--color-gray-lines);
      margin: 0;
      padding: 8px;
      font-size: 1.1rem;
    }
  }
}
</style>
