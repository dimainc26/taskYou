<template>
    <div class="task">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p>Priorité: {{ task.priority }}</p>
      <p>Début: {{ formattedStartDate }}</p>
      <p>Échéance: {{ formattedDueDate }}</p>
      <p v-if="task.reminder">Rappel: {{ formattedReminder }}</p>
      <p>Status: {{ task.completed ? "Complété" : "Non complété" }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Task",
    props: {
      task: {
        type: Object,
        required: true,
        validator(value) {
          // Validate that the task object has all required fields with correct types
          return (
            typeof value._id === "string" &&
            typeof value.title === "string" &&
            typeof value.description === "string" &&
            typeof value.priority === "string" &&
            typeof value.startDate === "string" &&
            typeof value.dueDate === "string" &&
            (typeof value.reminder === "string" || value.reminder === null) &&
            typeof value.completed === "boolean" &&
            typeof value.createdAt === "string" &&
            typeof value.updatedAt === "string"
          );
        },
      },
    },
    computed: {
      // Format the dates for display
      formattedStartDate() {
        return new Date(this.task.startDate).toLocaleString();
      },
      formattedDueDate() {
        return new Date(this.task.dueDate).toLocaleString();
      },
      formattedReminder() {
        return this.task.reminder ? new Date(this.task.reminder).toLocaleString() : "Pas de rappel";
      },
    },
  };
  </script>
  
  <style></style>
  