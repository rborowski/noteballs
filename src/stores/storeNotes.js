import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../js/firebase";

const notesCollection = collection(db, "notes")

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  const notesLoaded = ref(false);

  async function getNotes() {
    const q = query(notesCollection, orderBy("date", "desc"))
    onSnapshot(q, (querySnapshot) => {
      let dbNotes = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          date: doc.data().date,
          content: doc.data().content,
        };
        dbNotes.push(note);
      });
      notes.value = dbNotes;
      notesLoaded.value = true
    });
  }

  async function deleteNote(noteId) {
    await deleteDoc(doc(notesCollection, noteId.toString()));
  }

  async function submitNewNote(content) {
    const date = new Date().getTime().toString()
    await addDoc(notesCollection, {
      date,
      content,
    });
  }

  async function submitEditNote(id, content) {
    const noteRef = doc(notesCollection, id);
    await updateDoc(noteRef, { content });
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
    notesLoaded,
    deleteNote,
    submitNewNote,
    submitEditNote,
    getNoteContent,
    getTotalNotesCount,
    getTotalCharactersCount,
    getNotes,
  };
});
