import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYt5JoAnWRmZLkrVnkt9P07N4F78IYfZg",
  authDomain: "colorgame-a0c4e.firebaseapp.com",
  projectId: "colorgame-a0c4e",
  storageBucket: "colorgame-a0c4e.firebasestorage.app",
  messagingSenderId: "1040625415213",
  appId: "1:1040625415213:android:d1517f8f04e1b4f744b4a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export the initialized app, Firestore database, and authentication instance
export { app, db, auth };
