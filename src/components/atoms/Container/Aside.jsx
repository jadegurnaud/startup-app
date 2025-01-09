import React from "react";
import { DOM } from "../../nanites";

const Aside = ({children, ...props}) => {
    return  (
    <DOM.StyledSubContainer 
        position= "fixed" left="0" top="0" right="0" height= "74px"
        style={{     
            overflowY: "auto",
        }}
        {...props}
    >{children}
    </DOM.StyledSubContainer>
);
}

export default Aside;