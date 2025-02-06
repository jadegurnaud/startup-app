import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { Form } from "../molecules";
import {DOM} from "../nanites";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../store/reducers";
import { useSelector } from "react-redux";
import { ReactComponent as LogoVvoycoVert } from "../../assets/LogoVertical/LogoVvoycoVert.svg";

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
        <Container.ColumnContainer gap='30px' width='534px' padding='20px' borderRadius= '8px' border= '2px solid #EFEFEF'>
        
            <Text.Title style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal' }}>Créer un compte</Text.Title>
            <DOM.StyledContainer width= '100%' style={{ display: 'flex', justifyContent: 'center' }}>
                <LogoVvoycoVert style={{ width: '116px'}}/>
            </DOM.StyledContainer>
            <Form onSubmit={handleRegister}>
                <Container.ColumnContainer gap='12px'>
                    <Input.Label>E-mail</Input.Label>
                    <Input.InputForm type="email" value={email} onChange={(e) => setEmail(e.target.value)} marginBottom='10px' />
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
                <Container.ColumnContainer>
                    <Input.Label>Confirmer le mot de passe</Input.Label>
                    <Input.InputForm type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} marginBottom='10px' />
                    {localError && <Text.Error>{localError}</Text.Error>}
                </Container.ColumnContainer>
                <Container.ColumnContainer>
                    <Input.Label>Pseudo</Input.Label>
                    <Input.InputForm type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} marginBottom='10px' />
                    {Array.isArray(error) && error.filter(err => err.startsWith('pseudo')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <Container.ColumnContainer>
                    <Input.Label>Prénom</Input.Label>
                    <Input.InputForm type="text" value={firstName} onChange={(e) => setFistName(e.target.value)} marginBottom='10px' />
                    {Array.isArray(error) && error.filter(err => err.startsWith('firstName')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <Container.ColumnContainer>
                    <Input.Label>Nom</Input.Label>
                    <Input.InputForm type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} marginBottom='10px' />
                    {Array.isArray(error) && error.filter(err => err.startsWith('lastName')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <Container.ColumnContainer>
                    <Input.Label>Date de naissance</Input.Label>
                    <Input.InputForm type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} marginBottom='10px' />
                    {Array.isArray(error) && error.filter(err => err.startsWith('dateOfBirth')).map((err, index) => (
                        <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                    ))}
                </Container.ColumnContainer>
                <DOM.StyledContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button.MainButton type="submit" backgroundColor="#3E5544"
                                    hoverBackgroundColor="#56735D">
                        Créer mon compte
                    </Button.MainButton>
                </DOM.StyledContainer>
            </Form>
            <Container.ColumnContainer textAlign= 'center' gap='10px'>
                <Text.Paragraph style={{ marginTop: '10px' }}>Vous avez déjà un compte compte ? </Text.Paragraph>
                <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>Se connecter</Link>
            </Container.ColumnContainer>
        </Container.ColumnContainer>
    </Container.Page>
  );
};

export default Register;