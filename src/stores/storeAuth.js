import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  function registerUser(credentials) {
    
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("register", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
      });
  }

  function logUser(credentials) {
    console.log("login");
  }

  function logoutUser() {
    signOut(auth).then(() => {
      console.log("successfully logout")
    }).catch((e)=> {
      console.log("logout failed", e.message)
    })
  }

  return {
    registerUser,
    logUser,
    logoutUser,
  };
});
