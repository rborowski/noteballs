import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router"

export const useAuthStore = defineStore("authStore", () => {
  
  const user = ref({})
  const router = useRouter()
  
  function init() {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        user.value.id = userData.uid
        user.value.email = userData.email
        router.push({ name: "Notes" })
      } else {
        user.value = {}
        router.replace({ name: "Auth" })
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
    init,
    registerUser,
    loginUser,
    logoutUser,
  };
});
