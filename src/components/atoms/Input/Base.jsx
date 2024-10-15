import React from "react";
import { DOM } from "../../nanites";

const Base = (props) => {
    return <DOM.StyledInput className="input" {...props}></DOM.StyledInput>;
}

export default Base;