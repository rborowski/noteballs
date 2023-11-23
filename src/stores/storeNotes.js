import { defineStore } from "pinia";
import { ref, computed } from "vue";

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
  const content = ref("");

  function deleteNote(noteId) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
  }

  function editNote(noteId) {
    editedNote.value = notes.value.find((note) => note.id === noteId);
  }

  function submitNewNote() {
    notes.value.unshift({
      id: notes.value.length + 1,
      content: content.value,
    });
    content.value = "";
  }

  function submitEditNote() {
    notes.value.find((note) => note.id === editedNote.value.id).content =
      content.value;
    editedNote.value = null;
    content.value = "";
  }

  return {
    notes,
    editedNote,
    content,
    deleteNote,
    editNote,
    submitNewNote,
    submitEditNote,
  };
});
