import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNotesStore } from "../stores/storeNotes";

export const useStoreAuth = defineStore("storeAuth", () => {
  const user = ref({});
  const userLoaded = ref(false);
  const router = useRouter();

  function init() {
    const storeNotes = useNotesStore();

    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        user.value.id = userData.uid;
        user.value.email = userData.email;
        userLoaded.value = true;
        router.push({ name: "Notes" });
        storeNotes.init();
      } else {
        user.value = {};
        storeNotes.clearNotes();
        userLoaded.value = true;
        router.replace({ name: "Auth" });
      }
    });
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function logoutUser() {
    signOut(auth)
      .then(() => {
        console.log("successfully logout");
      })
      .catch((e) => {
        console.log("logout failed", e.message);
      });
  }

  return {
    user,
    userLoaded,
    init,
    registerUser,
    loginUser,
    logoutUser,
  };
});
