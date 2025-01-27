import React from "react";
import { DOM } from "../../nanites";

const HomeCategorieTexte = (props) => {
    return <DOM.StyledSpan className="span"
        color="#000000" fontSize="12px" fontWeight="700" padding="16px 10px" width="90px" textAlign="center" hoverBackgroundColor="#F0EFEB" cursor="pointer" borderRadius="5px"

        {...props}></DOM.StyledSpan>;
}

export default HomeCategorieTexte;