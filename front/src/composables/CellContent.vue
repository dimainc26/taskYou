<template>
    <div class="vuecal__cell-content">
      <div v-if="events.length">
        <div
          v-for="event in events"
          :key="event.id"
          class="vuecal__cell-event"
        >
          <span class="vuecal__event-title">{{ event.title }}</span>
        </div>
      </div>
      <div v-else>
        <span>No events</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{ events: any[] }>();
  </script>
  
  <style>
  </style>
  