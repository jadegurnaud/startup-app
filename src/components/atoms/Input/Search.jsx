import React from "react";
import { DOM } from "../../nanites";

const Search = (props) => {
    return <DOM.StyledInput
    width="485px"
    padding="12px"
    paddingLeft="40px"
    borderRadius= "999px"
backgroundColor= "#F2F2F2"
    {...props}></DOM.StyledInput>;
}

export default Search;