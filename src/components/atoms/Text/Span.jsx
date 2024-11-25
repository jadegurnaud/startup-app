import React from "react";
import { DOM } from "../../nanites";

const Span = (props) => {
    return <DOM.StyledSpan className="span" {...props}></DOM.StyledSpan>;
}

export default Span;