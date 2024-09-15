<template>
  <div class="weekly-view__container">
    <VueCal
      hide-view-selector
      :time-cell-height="80"
      allDayBarHeight="200"
      :time-from="0 * 60"
      :time-to="24 * 60"
      :disable-views="['years', 'year']"
      :events="events"
      @event-click="onEventClick"
      @cell-click="onDateClick"
      active-view="week"
      locale="it"
      min-event-width="90"
    >
      <template #weekday-heading="{ heading }">
        <WeekdayHeading :heading="heading" />
      </template>

      <template #time-cell="{ hours, minutes }">
        <TimeCell :hours="hours" :minutes="minutes" />
      </template>

      <template #cell-content="{ events }">
        <CellContent :events="events" />
      </template>

      <template #event="{ event }">
        <EventBox :event="event" />
      </template>


    </VueCal>
  </div>
</template>

<script setup lang="ts">
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { TaskInterface } from '../../types/TaskInterface';
import { CalendarEventInterface } from '../../types/CalendarEventInterface';
import WeekdayHeading from './WeekdayHeading.vue';
import TimeCell from './TimeCell.vue';
import CellContent from './CellContent.vue';
import EventBox from './EventBox.vue';

const props = defineProps<{
  tasks: TaskInterface[];
}>();

const events = computed<CalendarEventInterface[]>(() => {
  return props.tasks.map((task) => ({
    start: dayjs(task.startDate).format('YYYY-MM-DD HH:mm'),
    end: dayjs(task.dueDate).format('YYYY-MM-DD HH:mm'),
    title: task.title,
    content: task.description,
    class: getPriorityClass(task.priority),
  }));
});

function onEventClick(event: CalendarEventInterface, e: MouseEvent): void {
  alert(
    `Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}\nDescription: ${event.content}`
  );
  e.stopPropagation();
}

function onDateClick({ date }: { date: Date }): void {
  console.log('Date cliquée : ', date);
}

function getPriorityClass(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return 'high-priority';
    case 'medium':
      return 'medium-priority';
    case 'low':
      return 'low-priority';
    default:
      return '';
  }
}
</script>
