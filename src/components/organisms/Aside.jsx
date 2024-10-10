import React from "react";
import { Menu } from "../molecules";

const Aside = () => {
  return (
    <Menu
        configs={[
            { displayName: "Accueil", slug: "accueil" },
            { displayName: "Contact", slug: "contact" },
            { displayName: "Profile", slug: "profile" },
        ]}
    ></Menu>
  );
};

export default Aside;