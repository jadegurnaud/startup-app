import React from "react";
import { DOM } from "../../nanites";

const Menu = ({ children }) => {

  return (
    <DOM.StyledSubContainer
      $width= "100%"
    >
      {children}
    </DOM.StyledSubContainer>
  );
};

export default Menu;
