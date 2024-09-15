<!-- TaskAdder.vue -->
<template>
    <div>
      <button @click="showModal = true">Ajouter une Tâche</button>
      <TaskModal
        v-model:modelValue="showModal"
        @task-added="handleTaskAdded"
      />
    </div>
  </template>
  
  <script>
  import TaskModal from '../components/common/TaskModal.vue';
  
  export default {
    name: 'TaskAdder',
    components: {
      TaskModal
    },
    data() {
      return {
        showModal: false
      };
    },
    methods: {
      handleTaskAdded(task) {
        console.log('Tâche ajoutée:', task);
        // Logique pour ajouter la tâche à la liste ou effectuer d'autres actions
      }
    }
  };
  </script>
  