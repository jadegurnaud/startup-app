import React from "react";
import { DOM } from "../../nanites";

const HeaderMyGuidesContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
    display="flex"
    alignItems="center"
    gap="43px"
    margin="40px"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default HeaderMyGuidesContainer;