import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../js/firebase";

const notesCollection = collection(db, "notes")

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  async function getNotes() {
    const q = query(notesCollection, orderBy("id", "desc"))
    onSnapshot(q, (querySnapshot) => {
      let dbNotes = [];
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
        };
        dbNotes.push(note);
      });
      notes.value = dbNotes;
    });
  }

  async function deleteNote(noteId) {
    await deleteDoc(doc(notesCollection, noteId.toString()));
  }

  async function submitNewNote(content) {
    const id = new Date().getTime().toString()
    await setDoc(doc(notesCollection, id), {
      id,
      content,
    });
  }

  async function submitEditNote(id, content) {
    const noteRef = doc(notesCollection, id);
    await setDoc(noteRef, { content }, { merge: true } );
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
