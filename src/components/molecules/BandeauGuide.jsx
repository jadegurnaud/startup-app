import React from 'react';
import {Text, Container, Button} from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";

const BandeauGuide = ({ srcCoverImage, guideTitle, guideCountry }) => {
    const navigate = useNavigate();
  
  return (
    <Container.BandeauGuideContainer backgroundImage={srcCoverImage}>
        <Button.Base onClick={() => navigate("/accueil")}>Retour</Button.Base>
        <DOM.StyledContainer color='#FFF' display="flex" flexDirection= "column" gap="20px" padding="20px 40px">
        <Text.Title>{ guideTitle }</Text.Title>
        <Text.Span>{ guideCountry }</Text.Span>
        </DOM.StyledContainer>
    </Container.BandeauGuideContainer>
      
  );
};

export default BandeauGuide;