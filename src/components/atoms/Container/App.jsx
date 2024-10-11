import React from "react";
import { DOM } from "../../nanites";

const App = ({children}) => {
    return  (
    <DOM.StyledContainer
      position= "absolute"
      left= "20vw"
      height= "100vh"
      width= "calc(100% - 20vw)"
    >{children}
    </DOM.StyledContainer>
);
}

export default App;