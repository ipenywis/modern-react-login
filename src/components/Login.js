import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {useAuth} from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()  //para poder usar en el form lo que creamos en AuthContext
    const [error, setError] = useState('') //vacio porque no va a tener un error por default
    const [loading, setLoading] = useState(false) //como estado inicial no estamos cargando nada
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault() //prevent our form to refresh


        try {
            setError('') //antes de intentar cualquier cosa queremos resetear el mensaje de error
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/report")
        } catch(error) {
            console.log(error)
            setError('El email o la contraseña no es correcta')
        }
        setLoading(false)

    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Iniciar sesión</h2>
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
                        <Button disabled={loading} className="w-100" type="submit">
                            Iniciar sesión
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                ¿No tienes una cuenta? <Link to="/signup">Registrase</Link>
            </div>
        </div>
    )
}