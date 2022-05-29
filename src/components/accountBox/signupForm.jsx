import React, {useContext, useRef, useState} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Link from "@material-ui/core/Link";
import { useAuth } from "../../contexts/AuthContext";
import {Alert} from "@mui/material";

//import "../css/styles.css";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()  //para poder usar en el form lo que creamos en AuthContext
  const [error, setError] = useState('') //vacio porque no va a tener un error por default
  const [loading, setLoading] = useState(false) //como estado inicial no estamos cargando nada

  async function handleSubmit(e) {
      e.preventDefault()

      if(passwordRef.current.valueOf() !==
      passwordConfirmRef.current.valueOf()) {
          return setError('Las contraseñas no coinciden')
      }
      try {
        setError('') //antes de intentar cualquier cosa queremos resetear el mensaje de error
        setLoading(true)
        await signup(emailRef.current.valueOf(), passwordRef.current.valueOf())
      } catch /*si hubo un error:*/ {
          setError('Hubo un fallo al crear la cuenta')
      }
      setLoading(false)

  }

  return (
    <BoxContainer>
        {error && <Alert variant="danger">{error}</Alert>}
      <FormContainer onSubmit={handleSubmit()}>
        <Input type="text" placeholder="DNI" />
        <Input type="text" placeholder="Teléfono" />
        <Input type="email" inputRef={emailRef} required placeholder="Email" />
        <Input type="password" inputRef={passwordRef} required placeholder="Contraseña" />
        <Input type="password" inputRef={passwordConfirmRef} required placeholder="Repetir Contraseña" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" disabled={loading}>
          <Link className= "linkCSS" href="report" style={{ color: '#FFF' }}>Comenzar</Link>
          </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        ¿Ya tienes una cuenta?
        <BoldLink href="#" onClick={switchToSignin}>
          Ingresar
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
