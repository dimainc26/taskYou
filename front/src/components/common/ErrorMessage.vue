<template>
    <div style="color: red;">{{ message }}</div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    message: string;
  }
  
  // Récupérer les props
  const props = defineProps<Props>();
  console.log(props);
  </script>
  
  <style></style>
  