import React from "react";
import { DOM } from "../../nanites";

const Label = (props) => {
    return <DOM.StyledLabel
fontSize= "12px"
fontStyle= "normal"
fontWeight= "600"
lineHeight= "normal"
    {...props}></DOM.StyledLabel>;
}

export default Label;