<template>
    <div>
      <div v-if="loading">Chargement des tâches...</div>
      <div v-else-if="error">{{ error }}</div>
      <!-- <div v-else-if="tasks && tasks.length">
        <ul>
          <li v-for="task in tasks" :key="task._id">
            <Task :task="task" />
          </li>
        </ul>
      </div>
      <div v-else>Aucune tâche trouvée.</div> -->
      <WeekView v-else :tasks="tasks" />
      <!-- <TaskAdder/> -->
    </div>
  </template>
  
  <script>
  import { getTasks } from "../utils/api.js";
  import Task from "./Task.vue";
  import CalendarView from "./CalendarView.vue";
import TaskAdder from "../composables/TaskAdder.vue";
import WeekView from "./WeekView.vue";
  
  export default {
    name: "AllTasks",
    components: { Task, CalendarView, TaskAdder , WeekView },
  
    data() {
      return {
        tasks: [],
        loading: false,
        error: null,
      };
    },
    methods: {
      fetchTasks() {
        this.loading = true;
        this.error = null;
        getTasks()
          .then((response) => {
            this.tasks = response.data;
          })
          .catch((error) => {
            this.error = "Erreur lors de la récupération des tâches.";
            console.error("Erreur lors de la récupération des tâches: ", error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
    created() {
      this.fetchTasks();
    },
  };
  </script>
  
  <style></style>
  