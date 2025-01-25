import React from "react";
import { DOM } from "../../nanites";

const RowContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
      display="flex"
      flexDirection="row"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default RowContainer;