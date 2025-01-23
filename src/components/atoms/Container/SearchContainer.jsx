import React from "react";
import { DOM } from "../../nanites";

const SearchContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
    display="flex"
    alignItems="center"
    justifyContent="center"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default SearchContainer;