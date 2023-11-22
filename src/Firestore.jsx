import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbkqjrQtSYHY5hte9NftiAu11_kMePgyI",
  authDomain: "quizzy-5bda1.firebaseapp.com",
  projectId: "quizzy-5bda1",
  storageBucket: "quizzy-5bda1.appspot.com",
  messagingSenderId: "739910765113",
  appId: "1:739910765113:web:8bee7bea9fa9eee2bc5be8",
  measurementId: "G-X7RE78GJ9C",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
