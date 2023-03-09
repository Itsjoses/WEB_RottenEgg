// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDIpiXC1SF28v3Fny0cJPRP0QxLOjEX0q0",

  authDomain: "tpaweb-7a7f2.firebaseapp.com",

  projectId: "tpaweb-7a7f2",

  storageBucket: "tpaweb-7a7f2.appspot.com",

  messagingSenderId: "673233458726",

  appId: "1:673233458726:web:c3ca158aa7fa15feb438e7",

  measurementId: "G-W7R6P8NRF4"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)