<template>
  <div class="edit-note">
    <h1>Edit note <span class="has-text-success">id {{ $route.params.id }}</span></h1>
  </div>
  <Form>
    <template #button-name>
      Submit edit
    </template>
  </Form>
</template>

<script setup>
import Form from "../components/layout/Form.vue";
import { useNotesStore } from "../stores/storeNotes"
import { onMounted } from "vue";

const storeNotes = useNotesStore()

onMounted(() => {
  if (storeNotes.editedNote) {
    storeNotes.content = storeNotes.editedNote.content;
  }
})

</script>