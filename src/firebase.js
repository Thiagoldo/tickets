// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { } from 'firebase/firestore';
import { } from 'firebase/database';
import { } from 'firebase/remote-config';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv6oO0k4B59PtcP7UlxCcCrbnexv0Too8",
  authDomain: "tickets-web2022.firebaseapp.com",
  databaseURL: "https://tickets-web2022-default-rtdb.firebaseio.com",
  projectId: "tickets-web2022",
  storageBucket: "tickets-web2022.appspot.com",
  messagingSenderId: "256587071819",
  appId: "1:256587071819:web:b2e1777bfc94f38e0768ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
