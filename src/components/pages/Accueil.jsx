import React from "react";
import { Aside } from "../organisms";
import { Text } from "../atoms";
import { Image } from "../atoms";

const Accueil = () => {
  return (
    <div className="Accueil">
      <Aside></Aside>
      <div
        style={{
          position: "absolute",
          left: "20vw",
          top: 0,
          height: "100vh",
          width: "calc(100% - 20vw)",
        }}>
        <Text.Title>Accueil</Text.Title>
        <Text.SubTitle>
          Bienvenue sur la page d'accueil de notre site.
        </Text.SubTitle>
        <Text.Paragraph>
          Bienvenue sur la page d'accueil de notre site. Vous trouverez ici
          toutes les informations nécessaires pour naviguer sur notre site.
        </Text.Paragraph>
        <Image.Base src="https://via.placeholder.com/150" />
      </div>
    </div>
  );
};

export default Accueil;