import React from "react";
import { Aside } from "../organisms";
import { Text, Container } from "../atoms";
import {DOM} from "../nanites";

const Login = () => {
  return (
    <DOM.StyledContainer className="Login">
      <Container.App>
            <Text.Title>Se connecter</Text.Title>
        </Container.App>
    </DOM.StyledContainer>
  );
};

export default Login;