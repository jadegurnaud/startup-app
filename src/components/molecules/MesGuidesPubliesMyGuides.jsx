import React from 'react';
import {Text, Container, Button} from "../atoms";
import {GuidesContainer} from "../organisms";

const MesGuidesPubliesMyGuides = ({guides}) => {
  
  return (
    <Container.MesGuidesPubliesMyGuidesContainer>
        <Text.Paragraph>Mes guides publiés</Text.Paragraph>
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
    </Container.MesGuidesPubliesMyGuidesContainer>
      
  );
};

export default MesGuidesPubliesMyGuides;