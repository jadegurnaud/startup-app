import React from "react";
import { DOM } from "../../nanites";

const ColumnContainer = ({ children, ...props }) => {
  return (
    <DOM.StyledContainer
      display="flex"
      flexDirection="column"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default ColumnContainer;