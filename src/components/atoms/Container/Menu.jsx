import React from "react";
import { DOM } from "../../nanites";

const Menu = ({ children }) => {
  return (
    <DOM.StyledSubContainer
      width="100%"
      height="100%"
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </DOM.StyledSubContainer>
  );
};

export default Menu;
