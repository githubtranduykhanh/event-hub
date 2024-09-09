// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APP_API_KEY_FIREBASE,
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
// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export default app;