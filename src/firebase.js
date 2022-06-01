import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCyJdSWOoFzq3HxTCBhQsIBVqdqdsyGw3k",
    authDomain: "segurita-development.firebaseapp.com",
    databaseURL: "process.env.REACT_APP_FIREBASE_DATABASE_URL",
    projectId: "segurita-development",
    storageBucket: "segurita-development.appspot.com",
    messagingSenderId:"560831976556",
    appId: "1:560831976556:web:c992932377ff1c942c3449"
})

export const auth = getAuth() //instancia de autenticacion

export const db = getFirestore(app)

export default app