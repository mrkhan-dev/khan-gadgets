// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTsyNqG5hg0mCgYGHgD5TmWClEGgxlY2w",
  authDomain: "khan-gadgets.firebaseapp.com",
  projectId: "khan-gadgets",
  storageBucket: "khan-gadgets.appspot.com",
  messagingSenderId: "703629647041",
  appId: "1:703629647041:web:fb0e1240efd0ab6a130840",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
