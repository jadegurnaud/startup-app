import React from 'react';
import {Input, Container} from "../atoms";
import { DOM } from "../nanites";

import { ReactComponent as Search } from '../../assets/Search.svg';

const SearchBar = () => {
 
  
  return (
    <Container.SearchContainer>
        <DOM.StyledContainer position="relative" left="35px">
            <Search />
        </DOM.StyledContainer>
        <Input.Search placeholder="Rechercher un pays, une ville..." />
    </Container.SearchContainer>
      
  );
};

export default SearchBar;