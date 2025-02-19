import React from 'react';
import {Text, Container, Button} from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Plus } from "../../assets/Plus.svg";

const HeaderMyTravels = ({onNewTravelClick}) => {
  
  return (
    <Container.HeaderMyGuidesContainer>
        <Text.SubTitle>Planifier mon voyage</Text.SubTitle>
        <Button.MainButton backgroundColor="#3E5544"
                hoverBackgroundColor="#56735D" onClick={onNewTravelClick}><Plus />Nouveau</Button.MainButton>
    </Container.HeaderMyGuidesContainer>
      
  );
};

export default HeaderMyTravels;