import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()  //para poder usar en el form lo que creamos en AuthContext
    const [error, setError] = useState('') //vacio porque no va a tener un error por default
    const [info, setInfo] = useState(true)
    const [loading, setLoading] = useState(false) //como estado inicial no estamos cargando nada
    const history = useHistory()

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
            return [setError('Hubo un fallo al crear la cuenta'), setInfo(false)]
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
                       <Button disabled={loading} className="w-100" type="submit">
                           Registrarse
                       </Button>
                   </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
        </div>
    )
}