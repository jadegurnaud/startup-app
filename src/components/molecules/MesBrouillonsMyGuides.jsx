import React from 'react';
import {Text, Container, Button} from "../atoms";
import {GuidesContainer} from "../organisms";

const MesBrouillonsMyGuides = ({guides}) => {
  
  return (
    <Container.MesBrouillonsMyGuidesContainer>
        <Text.Paragraph>Brouillons</Text.Paragraph>
        {guides.length > 0 ? (
                <GuidesContainer
              guides={guides}
              favorites={{}}
              handleToggleFavorite={() => {}}
              isProfilePage={true}
              />

              ) : (
                <Text.Paragraph>Vous n'avez pas encore crée de guides.</Text.Paragraph>
              )}
    </Container.MesBrouillonsMyGuidesContainer>
      
  );
};

export default MesBrouillonsMyGuides;