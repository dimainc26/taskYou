<template>
  <div class="vuecal__cell-content">
    <p>{{ events.length > 0 ? events.length : "" }}</p>
  </div>
</template>

<script setup lang="ts">
import { CalendarEventInterface } from '../../types/CalendarEventInterface';

const props = defineProps<{ events: CalendarEventInterface[] }>();
</script>


<style></style>
