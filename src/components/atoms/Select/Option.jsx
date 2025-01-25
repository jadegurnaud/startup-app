import React from "react";
import { DOM } from "../../nanites";

const Option = (props) => {
    return <DOM.StyledOption className="option" {...props}></DOM.StyledOption>;
}

export default Option;