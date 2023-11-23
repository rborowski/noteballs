<template>
  <div class="edit-note">
    <Form label="Add a new note">
      <template #button>
        <button @click="$router.back()" class="button is-light mr-2">
          Cancel
        </button>
        <button @click="submitEditNote" class="button is-link" :disabled="!storeNotes.content">
          Save changes
        </button>
      </template>
    </Form>
  </div>
</template>

<script setup>
import Form from "../components/layout/Form.vue";
import { useNotesStore } from "../stores/storeNotes"
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const storeNotes = useNotesStore()
const router = useRouter()

function submitEditNote() {
  if (!storeNotes.content) return
  storeNotes.submitEditNote()
  router.push({ name: "Notes" })
}

onMounted(() => {
  if (storeNotes.editedNote) {
    storeNotes.content = storeNotes.editedNote.content;
  }
})

</script>