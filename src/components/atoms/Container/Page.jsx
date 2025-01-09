import React from "react";
import { DOM } from "../../nanites";

const Page = ({children, ...props}) => {
    return  (
    <DOM.StyledContainer
      position= "relative"
      top= "74px"
      height= "calc(100vh - 74px)"
      width= "100%"
      padding= "20px 40px"
      style={{ boxSizing: "border-box" }}
      {...props}
    >{children}
    </DOM.StyledContainer>
);
}

export default Page;