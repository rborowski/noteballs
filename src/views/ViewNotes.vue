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
    <progress class="progress is-large is-success" max="100" v-if="!storeNotes.notesLoaded"/>
    <div
      v-if="!storeNotes.notes.length && storeNotes.notesLoaded"
      class="is-size-4 has-text-centered has-text-grey-light py-6"
    >
    There are no notes added!
    </div>
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

useWatchCharacters(noteContent, 300)

</script>