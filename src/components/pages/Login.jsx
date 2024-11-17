import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../store/reducers";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(User.login({ email, password })).then((result) => {
            if (User.login.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

  return (
    
    <Container.Page className="Login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DOM.StyledContainer style={{ width: '100%', maxWidth: '400px' }}>
            <Text.Title style={{ textAlign: 'center', marginBottom: '10vh' }}>Connectez-vous à votre compte</Text.Title>
            <Form onSubmit={handleLogin} style={{ backgroundColor: '#DCDCDC', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Text.Paragraph>Identifiant</Text.Paragraph>
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('email')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('password')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit" style={{ borderRadius: '5px', cursor: 'pointer' }}>
                        <Text.Paragraph>Se connecter</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledContainer>
            </Form>
            <Text.Paragraph style={{ textAlign: 'center', marginTop: '10px' }}>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></Text.Paragraph>
        </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Login;