import React from "react";
import { DOM } from "../../nanites";

const Menu = ({ children }) => {

  return (
    <DOM.StyledContainer
        style={{
            position: "relative",
            left: 0,
            top: 0,
            width: "20vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            
        }}
    >
      {children}
    </DOM.StyledContainer>
  );
};

export default Menu;
