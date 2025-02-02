import React from 'react';
import {Text, Container, Button} from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";

const HeaderMyGuides = () => {
  
  return (
    <Container.HeaderMyGuidesContainer>
        <Text.SubTitle>Mes Guides</Text.SubTitle>
        <Button.MainButton backgroundColor="#3E5544"
                hoverBackgroundColor="#56735D">Nouveau</Button.MainButton>
    </Container.HeaderMyGuidesContainer>
      
  );
};

export default HeaderMyGuides;