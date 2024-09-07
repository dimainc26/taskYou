<template>
    <p class="time-value">
      <span>{{ formatTime(hours) }}</span> : <span>{{ formatTime(minutes) }} AM</span>
    </p>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{ hours: number; minutes: number }>();
  
  function formatTime(time: number): string {
    return String(time).padStart(2, "0");
  }
  </script>
  
  <style scoped>
  </style>
  