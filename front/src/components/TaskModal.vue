<!-- TaskModal.vue -->
<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <button class="close-btn" @click="close">×</button>
        <h2>Ajouter une Tâche</h2>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="title">Titre:</label>
            <input type="text" id="title" v-model="task.title" required />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="task.description"></textarea>
          </div>
          <div class="form-group">
            <label for="priority">Priorité:</label>
            <select id="priority" v-model="task.priority">
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
          <div class="form-group">
            <label for="startDate">Date de Début:</label>
            <input type="date" id="startDate" v-model="task.startDate" />
          </div>
          <div class="form-group">
            <label for="dueDate">Date d'Échéance:</label>
            <input type="date" id="dueDate" v-model="task.dueDate" />
          </div>
          <div class="form-group">
            <label for="reminder">Rappel:</label>
            <input type="date" id="reminder" v-model="task.reminder" />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TaskModal",
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        task: {
          title: "",
          description: "",
          priority: "medium",
          startDate: "",
          dueDate: "",
          reminder: "",
        },
      };
    },
    computed: {
      isVisible() {
        return this.modelValue;
      },
    },
    methods: {
      close() {
        this.$emit("update:modelValue", false);
      },
      submit() {
        this.$emit("task-added", this.task);
        this.close();
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed; /* Utilisation de fixed pour que le modal reste en place */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Couleur de fond sombre pour plus de contraste */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Assure que le modal est au-dessus des autres éléments */
  }
  
  .modal {
    background: #fff; /* Couleur blanche pour le modal pour plus de contraste */
    padding: 20px;
    border-radius: 8px; /* Bord arrondi pour un meilleur aspect visuel */
    width: 300px;
    max-width: 100%;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre légère pour un effet de profondeur */
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  