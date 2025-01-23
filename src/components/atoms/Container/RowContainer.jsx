import React from "react";
import { DOM } from "../../nanites";

const RowContainer = ({children, ...props }) => {
  return (
    <DOM.StyledSubContainer
      flex="true"
      flexDirection="row"
      {...props}
    >
      {children}
    </DOM.StyledSubContainer>
  );
}

export default RowContainer;