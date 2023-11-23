<template>
  <div class="edit-note">
    <Form
      v-model="noteContent"
      @enter-submit="handleSubmit"
      bgColor="link"
      label="Edit note"
      placeholder="Edit note..."
      ref="noteFormRef"
      :isEdit="true"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-light mr-2">
          Cancel
        </button>
        <button @click="handleSubmit" class="button is-link" :disabled="!noteContent">
          Save changes
        </button>
      </template>
    </Form>
  </div>
</template>

<script setup>
import Form from "../components/layout/Form.vue";
import { useNotesStore } from "../stores/storeNotes"
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const storeNotes = useNotesStore()
const route = useRoute()
const router = useRouter()

const noteFormRef = ref(null)
const noteContent = ref("")

noteContent.value = storeNotes.getNoteContent(+route.params.id).content


function handleSubmit() {
  if (!noteContent.value) return
  storeNotes.submitEditNote({id: +route.params.id, content: noteContent.value})
  router.push({ name: "Notes" })
  noteFormRef.value.focusTextarea()
}

</script>