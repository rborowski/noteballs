<template>
  <div class="card mb-5 p-4 " :class="!storeNotes.editedNote ? 'has-background-success-dark' : 'has-background-link-dark' ">
    <div class="field">
      <div class="control">
        <label for="textarea" class="label has-text-white">{{ label }}</label>
        <textarea class="textarea" ref="textarea" id="textarea" placeholder="Type text..." v-model="storeNotes.content"
          @keydown.enter.exact.prevent="submit" autofocus></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="button" />
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

const props = defineProps({
  label: {type: String}
})

const textarea = ref(null)

function submit() {
  if (!storeNotes.content) return
  if (!storeNotes.editedNote) {
    storeNotes.submitNewNote()
    focusTextarea()
  } else {
    storeNotes.submitEditNote()
    router.push({ name: "Notes" })
  }
}

function focusTextarea() {
  textarea.value.focus()
}

defineExpose({focusTextarea})

</script>