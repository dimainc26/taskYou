<template>
  <div>
    <p class="vuecal__event-title">{{ event.title }}</p>
    <p class="vuecal__event-content">{{ event.content }}</p>
    <div class="event-box-data">
      <p class="event-box-icon">XX</p>
      <p class="vuecal__event-time">{{ eventDuration }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarEventInterface } from '../../types/CalendarEventInterface';

const props = defineProps<{ event: CalendarEventInterface }>();

const eventDuration = computed(() => {
  const startTime = new Date(props.event.start).getTime();
  const endTime = new Date(props.event.end).getTime();

  const diffInMilliseconds = endTime - startTime;
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
});
</script>

<style lang="scss">
.vuecal__event {
  background-color: var(--color-light-green);
  border-radius: 12px;
  padding: 8px;
  box-shadow: var(--shadow-soft);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .vuecal__event-title {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: start;

    margin: 0;
    padding: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vuecal__event-content {
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    text-align: start;
  }

  .event-box-data {
    display: flex;
    align-items: end;
    gap: 12px;

    .event-box-icon {
      min-width: 35px;
      min-height: 35px;
      background-color: black;
    }

    .vuecal__event-time {
      text-align: start;
      font-weight: bold;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -8px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: gray;
        border-top: 1px solid gray;
      }
    }
  }
}
</style>
