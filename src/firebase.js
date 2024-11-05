// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzp3TURm3sV1Dm_FGUnmVtunwZxKe1jvY",
  authDomain: "open-mic-82bb0.firebaseapp.com",
  projectId: "open-mic-82bb0",
  storageBucket: "open-mic-82bb0.appspot.com",
  messagingSenderId: "1045341399846",
  appId: "1:1045341399846:web:789d02c252d0ebb62aefe7",
  measurementId: "G-0WMXT5C04F"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
export { db }