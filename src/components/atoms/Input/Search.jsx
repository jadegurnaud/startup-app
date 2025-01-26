import React from "react";
import { DOM } from "../../nanites";

const Search = (props) => {
    return <DOM.StyledInput
    border="none"
    {...props}></DOM.StyledInput>;
}

export default Search;