import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext";
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()  //para poder usar en el form lo que creamos en AuthContext
    const [error, setError] = useState('') //vacio porque no va a tener un error por default
    const [loading, setLoading] = useState(false) //como estado inicial no estamos cargando nada
    const [message, setMessage] = useState('')


    async function handleSubmit(e) {
        e.preventDefault() //prevent our form to refresh


        try {
            setMessage('')
            setError('') //antes de intentar cualquier cosa queremos resetear el mensaje de error
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Revisa tu email para más instrucciones')
        } catch(error) {
            console.log(error)
            setError('Hubo un fallo al reiniciar la contraseña')
        }
        setLoading(false)

    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reiniciar contraseña</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Reiniciar contraseña
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/">Iniciar sesión</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                ¿No tienes una cuenta? <Link to="/signup">Registrase</Link>
            </div>
        </div>
    )
}