<template>
  <div class="card mb-5 p-4 has-background-success-dark">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note" ref="newNoteRef" v-model="content"
          @keydown.enter.exact.prevent="editedNote ? submitEditNote() : addNote()" autofocus>{{ editContent }}</textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button @click="editedNote ? submitEditNote() : addNote()" class="button is-success" :disabled="!content">
          {{ editedNote ? "Submit edit" : "Add new note" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["editedNote"])
const emit = defineEmits(["addNote", "submitEditNote"])
const newNoteRef = ref(null)
const content = ref("")

const editContent = computed(() => {
  if(!content || !props.editedNote) return
  content.value = props.editedNote.content})

function addNote() {
  if (!content.value) return
  emit("addNote", content.value)
  content.value = ""
  newNoteRef.value.focus()
}

function submitEditNote() {
  if (!content.value) return
  emit("submitEditNote", content.value)
  content.value = ""
  newNoteRef.value.focus()
}




</script>