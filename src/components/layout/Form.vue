<template>
  <div class="card mb-5 p-4 has-background-success-dark">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note" ref="newNoteRef" v-model="content"
          @keydown.enter.exact.prevent="submit" autofocus>{{ editContent }}</textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button @click="submit" class="button is-success" :disabled="!content">
          {{ storeNotes.editedNote ? "Submit edit" : "Add new note" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNotesStore } from "../../stores/storeNotes"

const storeNotes = useNotesStore()

const newNoteRef = ref(null)
const content = ref("")

const editContent = computed(() => {
  if (!content || !storeNotes.editedNote) return
  content.value = storeNotes.editedNote.content
})

function submit() {
  if (!content.value) return
  if (!storeNotes.editedNote) {
    storeNotes.submitNewNote(content.value)
  } else {
    storeNotes.submitEditNote(content.value)
  }
  content.value = ""
  newNoteRef.value.focus()
}

</script>