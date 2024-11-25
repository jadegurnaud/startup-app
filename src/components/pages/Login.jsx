import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/user";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        navigate("/accueil");
    }

  return (
    
    <Container.App className="Login" style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DOM.StyledSubContainer style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
            <Text.Title style={{ textAlign: 'center' }}>Connectez-vous à votre compte</Text.Title>
            <Form onSubmit={handleLogin} style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Text.Paragraph>Identifiant</Text.Paragraph>
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                <DOM.StyledSubContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit" style={{ borderRadius: '5px', cursor: 'pointer' }}>
                        <Text.Paragraph>Se connecter</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledSubContainer>
            </Form>
        </DOM.StyledSubContainer>
        <Text.Paragraph style={{ textAlign: 'center', marginTop: '10px' }}>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></Text.Paragraph>
    </Container.App>
  );
};

export default Login;