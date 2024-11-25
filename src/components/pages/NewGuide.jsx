import React, { useState } from "react";
import { Text, Container, Input, Button } from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";

const NewGuide = () => {
    
    const [title, setTitle] = useState("");
    const [description, setDescritption] = useState("");
    const { error } = useSelector((state) => state.guide);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateGuide = () => {
        dispatch(Guide.createGuide({ title, description, userId: user.id })).then((result) => {
            if (Guide.createGuide.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

    return (
        <Container.Page className="Profil">
            <Text.Title>Créer un guide</Text.Title>
            <Button.Base onClick={() => handleCreateGuide()} style={{ position: "absolute", top: 10, right: 10 }}><Text.Paragraph>Publier</Text.Paragraph></Button.Base>
            <DOM.StyledContainer style={{ display:"flex", flexDirection:"column"}}>
                <Input.Base style={{ border: "none", fontSize: "2rem" }} type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                {error && error.filter(err => err.startsWith('title')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
                <Input.Base style={{ border: "none" }} type="text" placeholder="Description" value={description} onChange={(e) => setDescritption(e.target.value)} />
               {error && error.filter(err => err.startsWith('description')).map((err, index) => (
                    <Text.Span key={index} style={{ color: 'red' }}>{err.split(': ')[1]}</Text.Span>
                ))}
            </DOM.StyledContainer>
        </Container.Page>
    )
}

export default NewGuide;