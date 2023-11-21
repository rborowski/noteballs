<template>
  <div class="notes">
    <h1>Notes</h1>
    <Form />
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import Note from "../components/layout/Note.vue";
import Form from "../components/layout/Form.vue";
import { useNotesStore } from "../stores/storeNotes"

const storeNotes = useNotesStore()

</script>