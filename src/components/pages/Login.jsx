import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store";
import { getAuthenticatedUser } from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
            try {
                e.preventDefault();
                const response = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const data = await response.json();
                if ((response.status === 200 || response.status === 201) && data.access_token) {
                    alert("Connexion réussie");
                    dispatch(setToken(data.access_token));
                    const user = await getAuthenticatedUser();
                    if (user) {
                        dispatch(setUser(user));
                    }
                    console.log(user);
                    navigate("/accueil");
                    return;
                } else {
                    alert("Erreur lors de la connexion");
                }
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
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                <Text.Paragraph>Mot de passe oublié ?</Text.Paragraph>
                <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit" style={{ borderRadius: '5px', cursor: 'pointer' }}>
                        <Text.Paragraph>Se connecter</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledContainer>
            </Form>
        </DOM.StyledContainer>
    </Container.App>
  );
};

export default Login;