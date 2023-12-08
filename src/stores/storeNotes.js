import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  collection,
  doc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { useStoreAuth } from "./storeAuth";

let notesCollection;
let q;
let unsub;

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);
  const notesLoaded = ref(false);

  function init() {
    const storeAuth = useStoreAuth();
    notesCollection = collection(db, "users", storeAuth.user.id, "notes");
    q = query(notesCollection, orderBy("date", "desc"));
    getNotes();
  }

  async function getNotes() {
    if (unsub) unsub(); // unsubscribe if there is already an onSnapshot listener

    unsub = onSnapshot(q, (querySnapshot) => {
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
      notesLoaded.value = true;
    });
  }

  function clearNotes() {
    notes.value = [];
    notesLoaded.value = false;
    notesCollection = {};
    if (unsub) unsub(); // unsubscribe if there is already an onSnapshot listener
  }

  async function deleteNote(noteId) {
    await deleteDoc(doc(notesCollection, noteId.toString()));
  }

  async function submitNewNote(content) {
    const date = new Date().getTime().toString();
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
    init,
    getNotes,
    clearNotes,
    deleteNote,
    submitNewNote,
    submitEditNote,
    getNoteContent,
    getTotalNotesCount,
    getTotalCharactersCount,
  };
});
