import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
    return <DOM.StyledForm {...props}></DOM.StyledForm>;
};

export default Base;
