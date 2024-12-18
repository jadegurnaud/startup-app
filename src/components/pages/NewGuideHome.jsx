import React, { useState } from "react";
import { Text, Container, Input, Button, Image } from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";


const NewGuideHome = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNewGuideClick = () => {
        window.open("/newGuide", "_blank");
    };

    return (
        <Container.Page className="NewGuideHome">
            <Button.Base onClick={handleNewGuideClick}>Nouveau</Button.Base>
            
            
        </Container.Page>
    )
}

export default NewGuideHome;