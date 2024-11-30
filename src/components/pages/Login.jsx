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
    
    <Container.Page className="Login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: "border-box", overflow: "auto" }}>
        <DOM.StyledContainer width='400px'>
            <Text.Title style={{ marginBottom: '5vh' }}>Connectez-vous à votre compte</Text.Title>
            <Form onSubmit={handleLogin}>
                <Text.Paragraph>Identifiant</Text.Paragraph>
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('email')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('password')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <DOM.StyledSubContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit">
                        <Text.Paragraph>Se connecter</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledSubContainer>
            </Form>
            <Text.Paragraph textAlign= 'center' style={{ marginTop: '10px' }}>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></Text.Paragraph>
        </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Login;