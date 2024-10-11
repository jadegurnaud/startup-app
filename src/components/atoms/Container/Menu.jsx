import React from "react";
import { DOM } from "../../nanites";

const Menu = ({ children }) => {

  return (
    <DOM.StyledContainer
      width= "100%"
    >
      {children}
    </DOM.StyledContainer>
  );
};

export default Menu;
