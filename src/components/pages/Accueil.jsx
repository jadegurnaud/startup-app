import React from "react";
import { Aside } from "../organisms";
import { Text, Container, Image } from "../atoms";
import { DOM } from "../nanites";

const Accueil = () => {
  return (
    <DOM.StyledContainer className="Accueil">
      <Aside></Aside>
      <Container.App>
        <Text.Title>Accueil</Text.Title>
        <Text.SubTitle>
          Bienvenue sur la page d'accueil de notre site.
        </Text.SubTitle>
        <Text.Paragraph>
          Bienvenue sur la page d'accueil de notre site. Vous trouverez ici
          toutes les informations nécessaires pour naviguer sur notre site.
        </Text.Paragraph>
        <Image.Base src="https://via.placeholder.com/150" />
      </Container.App>
    </DOM.StyledContainer>
  );
};

export default Accueil;