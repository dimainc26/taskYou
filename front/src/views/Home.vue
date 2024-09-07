<template>
  <AllTasks />
</template>

<script>
import AllTasks from "../components/AllTasks.vue";

export default {
  name: "Home",
  components: { AllTasks },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_BASE_URL,
    };
  },
};
</script>

<style></style>
