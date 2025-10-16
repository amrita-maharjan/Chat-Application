// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ3kPEecNkmXF68TN7FiE8ty46MKDGJz0",
  authDomain: "chatapplication-f5f23.firebaseapp.com",
  projectId: "chatapplication-f5f23",
  storageBucket: "chatapplication-f5f23.firebasestorage.app",
  messagingSenderId: "4386747355",
  appId: "1:4386747355:web:fff9f4c1e5e603089f6dfe",
  measurementId: "G-GVY62T3RB6",
};

const app = initializeApp(firebaseConfig);

export { app };
