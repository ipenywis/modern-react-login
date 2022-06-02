import React, {useEffect, useRef, useState} from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import {addDoc, collection, GeoPoint} from "@firebase/firestore";
import {db} from "../firebase";
import firebase from "firebase/compat";

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()  //para poder usar en el form lo que creamos en AuthContext
    const [error, setError] = useState('') //vacio porque no va a tener un error por default
    const [info, setInfo] = useState(true)
    const [loading, setLoading] = useState(false) //como estado inicial no estamos cargando nada
    const history = useHistory()

    const [newDni, setNewDni] = useState("")
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "registeredUsers")

    const createRegisteredUsers = () =>{
        const registeredUsersRef = firebase.database().ref('registeredUsers/')
        const regisUsers = {
            dni: newDni,
            phone_number: newPhone,
            name: newName
        };
        registeredUsersRef.push(regisUsers);

    }



    /*const createUser = async () => {
        await addDoc(usersCollectionRef, {dni: newDni,
            phone_number: newPhone,
            name: newName

        })
    }
*/

    async function handleSubmit(e) {
        e.preventDefault() //prevent our form to refresh

        if(passwordRef.current.value !==
            passwordConfirmRef.current.value) {
             return [setError('Las contraseñas no coinciden'), setInfo(false)]
        }

        try {
            setError('') //antes de intentar cualquier cosa queremos resetear el mensaje de error
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch(error) {
            console.log(error)
            return [setError('La cuenta que intenta crear ya existe'), setInfo(false)]
        }
        setLoading(false)

    }
    return (
        <div>
            <Card>
                <Card.Body>
                   <h2 className="text-center mb-4">Registarse</h2>
                    {info && <Alert variant="info">Las contraseñas deben tener más de 6 caracteres</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="dni">
                           <Form.Label>DNI</Form.Label>
                           <Form.Control type="text" onChange={(event) => {
                               setNewDni(event.target.value);
                           }}/>
                       </Form.Group>
                       <Form.Group id="phone" >
                           <Form.Label>Número de teléfono</Form.Label>
                           <Form.Control type="text" onChange={(event) => {
                               setNewPhone(event.target.value);
                           }}/>
                       </Form.Group>
                       <Form.Group id="name" >
                           <Form.Label>Nombre</Form.Label>
                           <Form.Control type="text" onChange={(event) => {
                               setNewName(event.target.value);
                           }}/>
                       </Form.Group>
                       <Form.Group id="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="email" ref={emailRef} required />
                       </Form.Group>
                       <Form.Group id="password">
                           <Form.Label>Contraseña</Form.Label>
                           <Form.Control type="password" ref={passwordRef} required />
                       </Form.Group>
                       <Form.Group id="password-confirm">
                           <Form.Label>Confirmar contraseña</Form.Label>
                           <Form.Control type="password" ref={passwordConfirmRef} required />
                       </Form.Group>
                       <Button disabled={loading} className="w-100" type="submit" onClick={createRegisteredUsers}>
                           Registrarse
                       </Button>
                   </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
            </div>
        </div>
    )
}