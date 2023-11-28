import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from "../js/firebase";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  async function getNotes() {

    onSnapshot(collection(db, "notes"), (querySnapshot) => {
      let dbNotes = []
      querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content
          }
          dbNotes.push(note)
        })
        notes.value = dbNotes
    });
  }

  function deleteNote(noteId) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
  }

  function submitNewNote(content) {
    notes.value.unshift({
      id: notes.value.length + 1,
      content,
    });
  }

  function submitEditNote(id, content) {
    notes.value.find((note) => note.id === id).content = content;
  }

  const getNoteContent = computed(() => (id) =>
    notes.value.find((note) => note.id === id)
  );

  const getTotalNotesCount = computed(() => notes.value.length);

  const getTotalCharactersCount = computed(() =>
    notes.value.map((note) => note.content.length).reduce((a, b) => a + b, 0)
  );

  return {
    notes,
    deleteNote,
    submitNewNote,
    submitEditNote,
    getNoteContent,
    getTotalNotesCount,
    getTotalCharactersCount,
    getNotes,
  };
});
