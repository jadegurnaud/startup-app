import React from "react";
import { DOM } from "../../nanites";

const MesBrouillonsMyGuidesContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
    display="flex"
    flexDirection="column"
    gap="20px"
    margin="40px"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default MesBrouillonsMyGuidesContainer;