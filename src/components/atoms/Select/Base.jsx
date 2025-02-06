import React from "react";
import { DOM } from "../../nanites";

const Base = (props) => {
    return <DOM.StyledSelect className="select" {...props}></DOM.StyledSelect>;
}

export default Base;