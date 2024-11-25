import React from "react";
import { DOM } from "../../nanites";

const App = ({children, ...props}) => {
    return  (
    <DOM.StyledContainer
      $position= "absolute"
      $left= "20vw"
      $width= "calc(100% - 20vw)"
      $height= "100vh"
      {...props}
    >{children}
    </DOM.StyledContainer>
);
}

export default App;