import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../store/reducers";
import { useSelector } from "react-redux";
import { CgOverflow } from "react-icons/cg";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
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
        dispatch(User.register({ email, password, firstName, lastName, pseudo, dateOfBirth })).then((result) => {
            if (User.register.fulfilled.match(result)) {
                navigate("/login");
            }
        });
    }

  return (
    
    <Container.Page className="Register" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: "border-box", overflow: "auto" }}>
        <DOM.StyledContainer width='400px'>
            <Text.Title>Créez-vous un votre compte</Text.Title>
            <Form onSubmit={handleRegister}>
                <Text.Paragraph>E-mail</Text.Paragraph>
                <Input.Base type="email" value={email} onChange={(e) => setEmail(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('email')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Mot de passe</Text.Paragraph>
                <Input.Base type="password" value={password} onChange={(e) => setPassword(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('password')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Confirmer le mot de passe</Text.Paragraph>
                <Input.Base type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} marginBottom='10px' />
                {localError && <Text.Error>{localError}</Text.Error>}
                <Text.Paragraph>Pseudo</Text.Paragraph>
                <Input.Base type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('pseudo')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Prénom</Text.Paragraph>
                <Input.Base type="text" value={firstName} onChange={(e) => setFistName(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('firstName')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Nom</Text.Paragraph>
                <Input.Base type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('lastName')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Text.Paragraph>Date de naissance</Text.Paragraph>
                <Input.Base type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} marginBottom='10px' />
                {Array.isArray(error) && error.filter(err => err.startsWith('dateOfBirth')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <DOM.StyledSubContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.Base type="submit">
                        <Text.Paragraph>Créer le compte</Text.Paragraph>
                    </Button.Base>
                </DOM.StyledSubContainer>
            </Form>
        </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Register;