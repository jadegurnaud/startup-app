import React from 'react';
import {Text, Container, Button} from "../atoms";
import {GuidesContainer} from "../organisms";

const MyTravelsInProgress = ({guides}) => {
  
  return (
    <Container.MesBrouillonsMyGuidesContainer>
        <Text.Paragraph>Mes voyages en cours</Text.Paragraph>
        {guides.length > 0 ? (
                <GuidesContainer
              guides={guides}
              favorites={{}}
              handleToggleFavorite={() => {}}
              isProfilePage={true}
              />

              ) : (
                <Text.Paragraph>Vous n'avez pas encore de voyages en cours</Text.Paragraph>
              )}
    </Container.MesBrouillonsMyGuidesContainer>
      
  );
};

export default MyTravelsInProgress;