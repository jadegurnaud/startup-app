import React from "react";
import { DOM } from "../../nanites";

const Aside = ({children}) => {
    return  (
    <DOM.StyledContainer 
    backgroundcolor= "#D3D3D3" position= "fixed" left="0" top="0" bottom="0" width= "20vw"
        style={{     
            overflowY: "auto",
        }}
    >{children}
    </DOM.StyledContainer>
);
}

export default Aside;