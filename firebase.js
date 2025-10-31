// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDELVozQaqtaa-DS_b8JnNwZ_KiRJT3ZnQ",
  authDomain: "wordcounter-blog.firebaseapp.com",
  projectId: "wordcounter-blog",
  storageBucket: "wordcounter-blog.appspot.com",
  messagingSenderId: "862039163681",
  appId: "1:862039163681:web:6b591aa78fa1d16bd17460",
  measurementId: "G-P2FF94CZCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
