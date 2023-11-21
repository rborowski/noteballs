import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In adipisci odio asperiores neque. Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?",
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
  ]);

  const editedNote = ref(null);

  function deleteNote(noteId) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
  }

  function editNote(noteId) {
    editedNote.value = notes.value.find((note) => note.id === noteId);
  }

  function submitNewNote(content) {
    notes.value.unshift({
      id: notes.value.length + 1,
      content,
    });
  }

  function submitEditNote(noteContent) {
    notes.value.find(
      (note) => note.id === editedNote.value.id
    ).content = noteContent;
    editedNote.value = null;
  }

  return {
    notes,
    submitNewNote,
    deleteNote,
    submitEditNote,
    editedNote,
    editNote,
  };
});
