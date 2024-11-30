import React from "react";
import { DOM } from "../../nanites";

const Aside = ({children, ...props}) => {
    return  (
    <DOM.StyledSubContainer 
        position= "fixed" left="0" top="0" bottom="0" width= "20vw"
        style={{     
            overflowY: "auto",
        }}
        {...props}
    >{children}
    </DOM.StyledSubContainer>
);
}

export default Aside;