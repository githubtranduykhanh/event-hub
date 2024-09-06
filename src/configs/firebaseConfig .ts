// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA0kHBIkFyu_DncUXtKdxEMy0AqpKqwG4E",
  authDomain: "event-hub-4f241.firebaseapp.com",
  projectId: "event-hub-4f241",
  storageBucket: "event-hub-4f241.appspot.com",
  messagingSenderId: "417776265673",
  appId: "1:417776265673:web:1d1c619ff1c534ad572018",
  measurementId: "G-EGL9K8XZE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)


export default app;