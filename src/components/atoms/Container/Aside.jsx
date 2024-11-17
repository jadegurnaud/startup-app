import React from "react";
import { DOM } from "../../nanites";

const Aside = ({children}) => {
    return  (
    <DOM.StyledContainer 
        $backgroundColor= "#D9D9D9" $position= "fixed" $left="0" $top="0" $bottom="0" $width= "12rem"
        style={{     
            overflowY: "auto",
        }}
    >{children}
    </DOM.StyledContainer>
);
}

export default Aside;