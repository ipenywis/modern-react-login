import React, {useContext, useEffect, useState} from "react";
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext) //tenemos acceso al AuthContext a traves del hook useAuth
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

     function signup(email, password){
       return createUserWithEmailAndPassword(auth, email, password)
     }

     function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
     }

     function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
     }

     useEffect(() =>{
         const unsubscribe = auth.onAuthStateChanged(user => {
             setCurrentUser(user)   //ahora tenemos nuestro usuario seteado
             setLoading(false)
         }) //solo queremos correr esto cuando montamos nuestro componente, así que vadentro de un useEffect

         return unsubscribe //nos va a unsubscribe del listener en onAuthState.. cuando desmontemos el componente
     }, [])


    const value= {
        currentUser,
        login,
        signup,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}