import React from 'react';
import {Text, Container, Button} from "../atoms";
import {GuidesContainer} from "../organisms";

const MyTravelsPast = ({guides}) => {
  
  return (
    <Container.MesBrouillonsMyGuidesContainer>
        <Text.Paragraph>Mes voyages passés</Text.Paragraph>
        {guides.length > 0 ? (
                <GuidesContainer
              guides={guides}
              favorites={{}}
              handleToggleFavorite={() => {}}
              isProfilePage={true}
              />

              ) : (
                <Text.Paragraph>Vous n'avez pas encore de voyages passés</Text.Paragraph>
              )}
    </Container.MesBrouillonsMyGuidesContainer>
      
  );
};

export default MyTravelsPast;