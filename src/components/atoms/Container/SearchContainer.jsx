import React from "react";
import { DOM } from "../../nanites";
import '../../molecules/SearchBar.css'

const SearchContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
    display="flex"
    alignItems="center"
    margin="0px auto"
    justifyContent="space-between"
    width="50%"
    padding="12px 17px 12px 33px"
    borderRadius= "999px"
backgroundColor= "#FFF"
boxShadow= "0px 0px 20px 0px rgba(0, 0, 0, 0.10)"
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default SearchContainer;