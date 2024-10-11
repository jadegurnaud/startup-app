import React from "react";
import { Menu } from "../molecules";
import { Container } from "../atoms";

const Aside = () => {
  return (
    <Container.Aside className="Aside">
      <Menu
        configs={[
            { displayName: "Accueil", slug: "accueil" },
            { displayName: "Contact", slug: "contact" },
            { displayName: "Profile", slug: "profile" },
        ]}
      ></Menu>
    </Container.Aside>
  );
};

export default Aside;