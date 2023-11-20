<template>
  <div class="notes">
    <h1>Notes</h1>
    <Form v-model="newNote" @addNote="addNewNote" />
    <Note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import Note from "../components/layout/Note.vue";
import Form from "../components/layout/Form.vue";
import { ref } from "vue";

function addNewNote(content) {
  notes.value.unshift({
    id: notes.value.length + 1,
    content
  })
}

const newNote = ref('')

const notes = ref([
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In adipisci odio asperiores neque. Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?',
  },
  {
    id: 2,
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit?`,
  },
  {
    id: 3,
    content: `Lorem ipsum dolor sit amet consectetur dipisci odio asperiores neque. Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?`,
  },
  {
    id: 4,
    content: `Lorem ipsum dolor sit amet consectetur Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?`,
  },
])

</script>