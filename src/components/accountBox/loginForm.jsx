import React, { useContext } from "react";
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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">¿Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">
                <Link className= "linkCSS" href="report" style={{ color: '#FFF' }}>Ingresar</Link>
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        ¿No tienes una cuenta?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
