import React from "react";
import { Aside, Contenu } from "../organisms";
import { Text } from "../atoms";

const Accueil = () => {
  return (
    <div className="Accueil">
      <Aside></Aside>
      <Contenu>
        <Text.Title title="Accueil"></Text.Title>
        <Text.SubTitle>
          Bienvenue sur la page d'accueil de notre site.
        </Text.SubTitle>
        <Text.Paragraph>
          Bienvenue sur la page d'accueil de notre site. Vous trouverez ici
          toutes les informations nécessaires pour naviguer sur notre site.
        </Text.Paragraph>
      </Contenu>
    </div>
  );
};

export default Accueil;