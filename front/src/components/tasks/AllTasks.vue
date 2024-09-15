<template>
  <div>
    <LoadingIndicator v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <WeekView v-else :tasks="tasks" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTasks } from '../../utils/api.ts';
import WeekView from './WeekView.vue';
import LoadingIndicator from '../common/LoadingIndicator.vue';
import ErrorMessage from '../common/ErrorMessage.vue';

// Définition des références réactives
const tasks = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Fonction pour récupérer les tâches
async function fetchTasks() {
  loading.value = true;
  error.value = null;

  try {
    const response = await getTasks();
    tasks.value = response.data;
  } catch (err) {
    error.value = "Erreur lors de la récupération des tâches.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

// Appel de fetchTasks() lorsque le composant est monté
onMounted(() => {
  fetchTasks();
});
</script>

<style></style>
