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
      <a @click.prevent="editNote" class="card-footer-item">Edit</a>
      <a @click.prevent="deleteNote" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ note: { type: Object, required: true } })
const emit = defineEmits(["deleteNote", "editNote"])

const noteLength = computed(() => props.note.content.length + " " + (props.note.content.length > 1 ? "characters" : "character"))

function editNote() {
  emit("editNote", props.note.id)
}

function deleteNote() {
  emit("deleteNote", props.note.id)
}


</script>

<style scoped>
.content {
  white-space: pre-wrap;
}
</style>