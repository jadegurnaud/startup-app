import React from 'react';
import {Input, Container} from "../atoms";
import { DOM } from "../nanites";

import { ReactComponent as Search } from '../../assets/Search.svg';

const SearchBar = () => {
 
  
  return (
    <Container.SearchContainer>
        <Container.ColumnContainer>
          <Input.Label>Rechercher un pays, une ville</Input.Label>
          <Input.Search placeholder="ex : Paris" />
        </Container.ColumnContainer>
        
        <DOM.StyledContainer backgroundColor="#3E5544" padding= "10px" borderRadius= "999px" display= "flex" alignItems= "center" justifyContent= "center">
            <Search />
        </DOM.StyledContainer>
    </Container.SearchContainer>
      
  );
};

export default SearchBar;