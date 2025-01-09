import React from "react";
import { DOM } from "../../nanites";

const RowContainer = ({children, ...props }) => {
  console.log(props);
  return (
    <DOM.StyledSubContainer
      flex
      flexDirection="row"
      {...props}
    >
      {children}
    </DOM.StyledSubContainer>
  );
}

export default RowContainer;