<template>
  <div class="notes">
    <Form
      v-model="noteContent"
      @enter-submit="handleSubmit"
      bgColor="success"
      label="Add a new note"
      placeholder="Add a new note..."
      ref="noteFormRef"
    >
      <template #buttons>
        <button
          :disabled="!noteContent"
          @click="handleSubmit"
          class="button is-success"
        >
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
import { useWatchCharacters } from "../use/useWatchCharacters";

const storeNotes = useNotesStore()
const noteFormRef = ref(null)

const noteContent = ref("")

function handleSubmit() {
  if (!noteContent.value) return
  storeNotes.submitNewNote(noteContent.value)
  noteFormRef.value.focusTextarea()
  noteContent.value = ""
}

useWatchCharacters(noteContent, 100)

</script>