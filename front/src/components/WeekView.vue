<template>
  <div class="weekly-view__container">
    <VueCal
      hide-view-selector
      :time-cell-height="60"
      allDayBarHeight="200"
      :time-from="0 * 60"
      :time-to="24 * 60"
      :disable-views="['years', 'year']"
      :events="events"
      @event-click="onEventClick"
      @cell-click="onDateClick"
      active-view="week"
      locale="it"
    >
      <template #weekday-heading="{ heading }">
        <WeekdayHeading :heading="heading" />
      </template>

      <template #time-cell="{ hours, minutes }">
        <TimeCell :hours="hours" :minutes="minutes" />
      </template>

      <template v-slot:cell="props">
        <pre>{{ props }}</pre>
        <CellContent :events="props.events" />
      </template>

      <template #cell-content="{events}">
        <p>{{events.length > 0 ? events.length : ''}}</p>
      </template>

    </VueCal>
  </div>
</template>

<script setup lang="ts">
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import dayjs from "dayjs";
import { computed } from "vue";
import { TaskInterface } from "../types/TaskInterface";
import { CalendarEventInterface } from "../types/CalendarEventInterface";
import WeekdayHeading from "../composables/WeekdayHeading.vue";
import TimeCell from "../composables/TimeCell.vue";
import CellContent from "../composables/CellContent.vue";

const props = defineProps<{
  tasks: TaskInterface[];
}>();

const events = computed<CalendarEventInterface[]>(() => {
  return props.tasks.map((task: TaskInterface) => ({
    start: dayjs(task.startDate).format("YYYY-MM-DD HH:mm"),
    end: dayjs(task.dueDate).format("YYYY-MM-DD HH:mm"),
    title: task.title,
    content: task.description,
    class: getPriorityClass(task.priority),
  }));
});

function onEventClick(event: CalendarEventInterface, e: MouseEvent) {
  alert(
    `Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}\nDescription: ${event.content}`
  );
  e.stopPropagation();
}

function onDateClick({ date }: { date: Date }): void {
  console.log("Date cliquée : ", date);
  // Logique pour afficher ou ajouter une tâche pour la date cliquée
}

function getPriorityClass(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "high-priority";
    case "medium":
      return "medium-priority";
    case "low":
      return "low-priority";
    default:
      return "";
  }
}
</script>

<style></style>
