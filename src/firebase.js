import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBij-O7j3otIEfD8AhRJDSjoEfklRD255g",
  authDomain: "foodapp-19b0a.firebaseapp.com",
  projectId: "foodapp-19b0a",
  storageBucket: "foodapp-19b0a.appspot.com",
  messagingSenderId: "331701057373",
  appId: "1:331701057373:web:98f3cc8a20d407315d9ab4",
  measurementId: "G-4CZC1PCVQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
