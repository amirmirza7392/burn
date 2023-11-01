// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKmhCECE9-y6jsPQggVkkUAsm7ijemLnI",
  authDomain: "delulu-3f367.firebaseapp.com",
  projectId: "delulu-3f367",
  storageBucket: "delulu-3f367.appspot.com",
  messagingSenderId: "357311118485",
  appId: "1:357311118485:web:cfbd55b3a38ab480d12f9c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);