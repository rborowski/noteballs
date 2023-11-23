<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ noteLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer ">
      <RouterLink :to="{ name: 'Edit', params: { id: note.id } }" @click="storeNotes.editNote(note.id)"
        class="card-footer-item">Edit</RouterLink>
      <a @click.prevent="storeNotes.deleteNote(note.id)" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNotesStore } from "../../stores/storeNotes"

const storeNotes = useNotesStore()

const props = defineProps({ note: { type: Object, required: true } })

const noteLength = computed(() => props.note.content.length + " " + (props.note.content.length > 1 ? "characters" : "character"))



</script>

<style scoped>
.content {
  white-space: pre-wrap;
}
</style>