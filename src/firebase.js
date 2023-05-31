import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxBtLU3aJavd6k02WTXj4SFEj2Bu20wzM",
  authDomain: "sample-login-register.firebaseapp.com",
  projectId: "sample-login-register",
  storageBucket: "sample-login-register.appspot.com",
  messagingSenderId: "1095791100293",
  appId: "1:1095791100293:web:50b6ea8fbdb1cc34a304ec",
  measurementId: "G-S8ZLTH62ZV"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
