// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQiKjDZSXVqHE21uJNS7xs7anGbIlhvy8",
  authDomain: "file-forge-ccc4c.firebaseapp.com",
  projectId: "file-forge-ccc4c",
  storageBucket: "file-forge-ccc4c.appspot.com",
  messagingSenderId: "618248282339",
  appId: "1:618248282339:web:334968d3e52169a456e5d6",
  measurementId: "G-80NS4TSR7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;