<template>
  <div class="notes">
    <h1>Notes</h1>
    <Form @submitEditNote="submitEditNote" :editedNote="editedNote" @addNote="addNewNote" />
    <Note @deleteNote="deleteNote" @editNote="editNote" v-for="note in notes" :key="note.id" :note="note" />
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

function deleteNote(noteId) {
  notes.value = notes.value.filter((note) => note.id !== noteId)
}

function editNote(noteId) {
  editedNote.value = notes.value.find((note => note.id === noteId))
}

function submitEditNote(noteContent) {
  notes.value.find((note => note.id === editedNote.value.id)).content = noteContent
  editedNote.value = null
}

const editedNote = ref(null) 

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