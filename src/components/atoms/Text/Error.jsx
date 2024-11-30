import React from "react";
import { DOM } from "../../nanites";

const Error = (props) => {
    return <DOM.StyledSpan color="red" className="error" {...props}></DOM.StyledSpan>;
}

export default Error;