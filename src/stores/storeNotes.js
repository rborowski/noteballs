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

  function deleteNote(noteId) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
  }

  function submitNewNote(content) {
    notes.value.unshift({
      id: notes.value.length + 1,
      content,
    });
  }

  function submitEditNote(editedNote) {
    console.log(editedNote.id)
    notes.value.find(
      (note) => note.id === editedNote.id
    ).content = editedNote.content;
  }

  const getNoteContent = computed(() => (id) =>
    notes.value.find((note) => note.id === id)
  );

  return {
    notes,
    deleteNote,
    submitNewNote,
    submitEditNote,
    getNoteContent,
  };
});
