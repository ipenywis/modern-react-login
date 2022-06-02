import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import 'firebase/compat/database'



const firebaseConfig = {
    apiKey: "AIzaSyCyJdSWOoFzq3HxTCBhQsIBVqdqdsyGw3k",
    authDomain: "segurita-development.firebaseapp.com",
    databaseURL: "https://segurita-development-default-rtdb.firebaseio.com/",
    projectId: "segurita-development",
    storageBucket: "segurita-development.appspot.com",
    messagingSenderId: "560831976556",
    appId: "1:560831976556:web:c992932377ff1c942c3449"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export const auth = getAuth() //instancia de autenticacion
export const db = getFirestore(app)

export default database;
