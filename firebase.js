import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoEMQsvLoZ25-SYVynQwsl3Zn854ffiB8",
  authDomain: "chatgpt-clone-2fb46.firebaseapp.com",
  projectId: "chatgpt-clone-2fb46",
  storageBucket: "chatgpt-clone-2fb46.appspot.com",
  messagingSenderId: "640666227224",
  appId: "1:640666227224:web:d6d7dcaf18efc31141296d",
};
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };