import React from "react";
import { Menu } from "../molecules";
import { Container } from "../atoms";

const Aside = () => {
  return (
    <Container.Aside className="Aside">
      <Menu
        configs={[
            { displayName: "Accueil", slug: "accueil" },
            { displayName: "Se connecter", slug: "seconnecter" },
        ]}
      ></Menu>
    </Container.Aside>
  );
};

export default Aside;