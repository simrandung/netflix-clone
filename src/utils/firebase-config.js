import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0Mr-BzjJfIBFFPK21H_zQi2O-9s6EV8Q",
  authDomain: "react-netflix-clone-eb85f.firebaseapp.com",
  projectId: "react-netflix-clone-eb85f",
  storageBucket: "react-netflix-clone-eb85f.appspot.com",
  messagingSenderId: "312259845848",
  appId: "1:312259845848:web:3cbb80f73ac4e8c91681ad",
  measurementId: "G-7LXT7K85LV"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);