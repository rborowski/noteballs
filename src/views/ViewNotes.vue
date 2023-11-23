<template>
  <div class="notes">
    <Form ref="editNoteRef" label="Add a new note">
      <template #button>
        <button @click="submitNewNote" class="button is-success" :disabled="!storeNotes.content">
          Add new note
        </button>
      </template>
    </Form>
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import Note from "../components/layout/Note.vue";
import Form from "../components/layout/Form.vue";
import { useNotesStore } from "../stores/storeNotes"
import { ref } from "vue";

const storeNotes = useNotesStore()
const editNoteRef = ref(null)

function submitNewNote() {
  if (!storeNotes.content) return
  storeNotes.submitNewNote()
  editNoteRef.value.focusTextarea()
}

</script>