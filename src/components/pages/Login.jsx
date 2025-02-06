import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../store/reducers";
import { ReactComponent as LogoVvoycoVert } from "../../assets/LogoVertical/LogoVvoycoVert.svg";

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
        <Container.ColumnContainer gap='30px' width='534px' padding='20px' borderRadius= '8px' border= '2px solid #EFEFEF'>
            <Text.Title style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal' }}>Connexion</Text.Title>
            <DOM.StyledContainer width= '100%' style={{ display: 'flex', justifyContent: 'center' }}>
                <LogoVvoycoVert style={{ width: '116px'}}/>
            </DOM.StyledContainer>
            <Form onSubmit={handleLogin}>
                <Container.ColumnContainer gap='12px'>
                    <Input.Label>Adresse e-mail</Input.Label>
                    <Input.InputForm type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {Array.isArray(error) && error.filter(err => err.startsWith('email')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <Container.ColumnContainer gap='12px'>
                    <Input.Label>Mot de passe</Input.Label>
                    <Input.InputForm type="password" value={password} onChange={(e) => setPassword(e.target.value)} marginBottom='10px' />
                    {Array.isArray(error) && error.filter(err => err.startsWith('password')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.MainButton type="submit" backgroundColor="#3E5544"
                hoverBackgroundColor="#56735D">
                        Confirmer
                    </Button.MainButton>
                </DOM.StyledContainer>
            </Form>
            <Container.ColumnContainer textAlign= 'center' gap='10px'>
                <Text.Paragraph style={{ marginTop: '10px' }}>Vous n'avez pas encore de compte ?</Text.Paragraph>
                <Link to="/register" style={{ textDecoration: 'none', color: '#000' }}>Créer un compte</Link>
            </Container.ColumnContainer>
        </Container.ColumnContainer>
    </Container.Page>
  );
};

export default Login;