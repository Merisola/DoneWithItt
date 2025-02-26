import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdHpAHaKM7iV8CdaNfQ4JoWyHmqgEoMGQ",
  authDomain: "colorgame-a0c4e.firebaseapp.com",
  projectId: "colorgame-a0c4e",
  storageBucket: "colorgame-a0c4e.firebasestorage.app",
  messagingSenderId: "1040625415213",
  appId: "1:1040625415213:android:d1517f8f04e1b4f744b4a4",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, db, auth };
