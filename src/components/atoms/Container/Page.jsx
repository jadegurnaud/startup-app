import React from "react";
import { DOM } from "../../nanites";

const Page = ({children, ...props}) => {
    return  (
    <DOM.StyledContainer
      position= "absolute"
      left= "20vw"
      height= "100vh"
      width= "calc(100% - 20vw)"
      padding= "10px"
      style={{ boxSizing: "border-box" }}
      {...props}
    >{children}
    </DOM.StyledContainer>
);
}

export default Page;