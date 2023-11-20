<template>
  <div class="card mb-5 p-4 has-background-success-dark">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note" ref="newNoteRef" v-model="content" @keydown.enter.exact.prevent="addNote" autofocus></textarea>
      </div>
    </div>
    
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button @click="addNote" class="button is-success" :disabled="!content">
          Add new note
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addNote"])
const newNoteRef = ref(null)

function addNote() {
  if (!content.value) return
  emit("addNote", content.value)
  content.value = ""
  newNoteRef.value.focus()
}

const content = ref('')

</script>