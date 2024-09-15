<template>
  <div>
    <p class="day">{{ formatDate(heading.date) }}</p>
    <div class="week-time">
      <p class="week-day-name">{{ heading.label.substring(0, 3) }}</p>
      <p class="day-time">0:00:00</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Heading {
  date: string;
  label: string;
}

const props = defineProps<{ heading: Heading }>();

function formatDate(date: string): string {
  return dayjs(date).format('D');
}
</script>


<style lang="scss">
.vuecal--view-with-time .vuecal__weekdays-headings  {
  background-color: gray;
  
  padding: inherit !important;
  margin: 0 !important;
  margin-left: 100px !important;
}

.vuecal__weekdays-headings {

  .vuecal__heading {
    height: 80px;

    .vuecal__flex {
      .weekday-label {
        div {
          display: flex;
          align-items: center;

          .day {
            font-weight: bold;
            font-size: 2.2rem;
            margin: 0;
            padding: 0;
            padding-right: 10px;
          }

          .week-time {
            display: flex;
            flex-direction: column;
            gap: 0;
            align-items: start;

            .week-day-name {
              margin: 0;
              padding: 0;
              font-size: 1.4rem;
              font-weight: var(--font-weight-regular);
              color: var(--color-light-blue);
            }

            .day-time {
              font-size: 1.2rem;
              color: var(--color-gray-lines);
              margin: 0;
              padding: 0;
            }
          }
        }
      }
    }
  }
}
</style>
