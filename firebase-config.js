import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDso2WfG5kmFFQNf50wRZj986OIQmQlmvU",
  authDomain: "clone-spotify-aca16.firebaseapp.com",
  databaseURL: "https://clone-spotify-aca16-default-rtdb.firebaseio.com",
  projectId: "clone-spotify-aca16",
  storageBucket: "clone-spotify-aca16.firebasestorage.app",
  messagingSenderId: "842579746708",
  appId: "1:842579746708:web:e28246eb18b640c76bb981",
  measurementId: "G-Q2TQ9WH9JD"
};


const app = initializeApp(firebaseConfig);


export const db = getDatabase(app); 

