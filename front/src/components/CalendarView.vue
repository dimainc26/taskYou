<template>
  <div>
    <vue-cal
      :events="events"
      :time-from="0 * 60"
      :time-to="0 * 60"
      :time-step="60"
     

       :on-event-click="onEventClick"
    >
    </vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import dayjs from "dayjs";

export default {
  name: "CalendarView",
  components: { VueCal },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    events() {
      return this.tasks.map((task) => ({
        start: dayjs(task.startDate).format("YYYY-MM-DD HH:mm"),
        end: dayjs(task.dueDate).format("YYYY-MM-DD HH:mm"),
        title: task.title,
        content: task.description,
        class: this.getPriorityClass(task.priority),
      }));
    },
  },
  methods: {
    getPriorityClass(priority) {
      // Retourne une classe CSS basée sur la priorité
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
    },
    onEventClick(event, e) {
      // Afficher un alert avec les détails de l'événement
      alert(`Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}\nDescription: ${event.content}`);
      // Empêcher le comportement par défaut
      e.stopPropagation();
    },
    onDateClick({ date }) {
      console.log("Date cliquée : ", date);
      // Logique pour afficher ou ajouter une tâche pour la date cliquée
    },
  },
};
</script>

<style>
/* Styles pour les tâches selon leur priorité */
.high-priority {
  background-color: #ff4d4f;
}
.medium-priority {
  background-color: #ffa940;
}
.low-priority {
  background-color: #73d13d;
}
</style>
