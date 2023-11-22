<template>
  <div class="card mb-5 p-4 has-background-success-dark">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note" ref="newNoteRef" v-model="storeNotes.content"
          @keydown.enter.exact.prevent="submit" autofocus></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button @click="submit" class="button is-success" :disabled="!storeNotes.content">
          <slot name="button-name" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "../../stores/storeNotes"
import { useRouter } from "vue-router";

const storeNotes = useNotesStore()
const router = useRouter()

const newNoteRef = ref(null)

function submit() {
  if (!storeNotes.content) return
  if (!storeNotes.editedNote) {
    storeNotes.submitNewNote()
  } else {
    storeNotes.submitEditNote()
  }
  storeNotes.content = ""
  newNoteRef.value.focus()
  router.push({ name: "Notes" })
}

</script>