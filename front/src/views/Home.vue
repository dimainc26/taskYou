<template>
  <div>Home</div>
  <p>{{ apiUrl }}</p>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // Accéder aux variables d'environnement
      apiUrl: import.meta.env.VITE_API_BASE_URL
    };
  },
}
</script>

<style>

</style>