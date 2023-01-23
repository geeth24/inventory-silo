// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD91MI0Vb8klPkChadkdNchfz7GVtfDChM",
    authDomain: "inventorysilo.firebaseapp.com",
    projectId: "inventorysilo",
    storageBucket: "inventorysilo.appspot.com",
    messagingSenderId: "818865591670",
    appId: "1:818865591670:web:9398ecf1bc22e983ff5657",
    measurementId: "G-1XTQ4L1RB1",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
