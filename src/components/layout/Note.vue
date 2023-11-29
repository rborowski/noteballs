<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="is-flex is-justify-content-space-between has-text-grey-light mt-2">
          <div><small>{{ dateFormated }}</small></div>
          <div><small>{{ noteLength }}</small></div>
        </div>
      </div>
    </div>
    <footer class="card-footer ">
      <RouterLink :to="{ name: 'Edit', params: { id: note.id } }" class="card-footer-item">Edit</RouterLink>
      <a @click.prevent="modals.deleteNote = true" class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :id="note.id"/>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import ModalDeleteNote from "./ModalDeleteNote.vue";
import { useDateFormat } from "@vueuse/core";

const props = defineProps({ note: { type: Object, required: true } })

const noteLength = computed(() => props.note.content.length + " " + (props.note.content.length > 1 ? "characters" : "character"))

const dateFormated = computed(() => {
  const date = new Date(+props.note.date)
  return useDateFormat(date , "YYYY-MM-DD HH:mm").value
})

const modals = reactive({
  deleteNote: false
})

</script>

<style scoped>
.content {
  white-space: pre-wrap;
}
</style>