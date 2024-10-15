import React, { useState, useContext } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password, navigate);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    
    <Container.App className="Login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <DOM.StyledContainer style={{ width: '100%', maxWidth: '400px' }}>
        <Text.Title style={{ textAlign: 'center', marginBottom: '10vh' }}>Connectez-vous à votre compte</Text.Title>
        <Form onSubmit={handleLogin} style={{ backgroundColor: '#DCDCDC', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <Text.Paragraph>Identifiant</Text.Paragraph>
            <Input.Base type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
            <Text.Paragraph>Mot de passe</Text.Paragraph>
            <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
            <Text.Paragraph>Mot de passe oublié ?</Text.Paragraph>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button.Base type="submit" style={{ borderRadius: '5px', cursor: 'pointer' }}>
                    <Text.Paragraph>Se connecter</Text.Paragraph>
                </Button.Base>
            </div>
        </Form>
    </DOM.StyledContainer>
</Container.App>
  );
};

export default Login;