import React from "react";
import { DOM } from "../../nanites";

const NavSpanLink = (props) => {
    return <DOM.StyledSpan className="span"
        color="#3E5544" margin="0 10px 0 0" fontSize="12px" fontWeight="700"

        {...props}></DOM.StyledSpan>;
}

export default NavSpanLink;