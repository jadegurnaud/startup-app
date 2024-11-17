import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../store/reducers";
import { useSelector } from "react-redux";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [localError, setLocalError] = useState("");
    const { error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setLocalError("Les mots de passe ne correspondent pas");
            return;
        }
        dispatch(User.register({ email, password, firstName, lastName })).then((result) => {
            if (User.register.fulfilled.match(result)) {
                navigate("/login");
            }
        });
    }

  return (
    
    <Container.Page className="Register" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DOM.StyledContainer style={{ width: '100%', maxWidth: '400px' }}>
            <Text.Title style={{ textAlign: 'center', marginBottom: '10vh' }}>Créez-vous un compte</Text.Title>
            <Form onSubmit={handleRegister} style={{ backgroundColor: '#DCDCDC', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Text.Paragraph>E-mail</Text.Paragraph>
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('email')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('password')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <Text.Paragraph>Confirmer le mot de passe</Text.Paragraph>
                <Input.Base type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                {localError && <Text.Span style={{ color: 'red' }}>{localError}</Text.Span>}
                <Text.Paragraph>Prénom</Text.Paragraph>
                <Input.Base type="text" value={firstName} onChange={(e) => setFistName(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('firstName')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <Text.Paragraph>Nom</Text.Paragraph>
                <Input.Base type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ marginBottom: '10px' }} />
                {error && error.filter(err => err.startsWith('lastName')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit" style={{ borderRadius: '5px', cursor: 'pointer' }}>
                        <Text.Paragraph>Créer le compte</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledContainer>
            </Form>
        </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Register;