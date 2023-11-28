<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<style> @import 'bulma/css/bulma.min.css';
</style>


<script setup>
import NavBar from './components/layout/NavBar.vue';
import { onMounted } from "vue";
import { useNotesStore } from "./stores/storeNotes"

const storeNotes = useNotesStore()

onMounted(() => storeNotes.getNotes())



</script>
