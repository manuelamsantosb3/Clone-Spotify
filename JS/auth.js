import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export function observeAuth(callback, onError) {
  return onAuthStateChanged(auth, callback, onError);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function createAccount(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}
