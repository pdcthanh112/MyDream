// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt_DDyVvOOKBvfux9mLa5icTISruKznCA",
  authDomain: "congthanh-project.firebaseapp.com",
  projectId: "congthanh-project",
  storageBucket: "congthanh-project.appspot.com",
  messagingSenderId: "1085433653419",
  appId: "1:1085433653419:web:4e998619aed7b8f8142fee",
  measurementId: "G-Q2XZTSFQQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);