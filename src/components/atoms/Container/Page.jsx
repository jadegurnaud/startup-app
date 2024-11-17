import React from "react";
import { DOM } from "../../nanites";

const Page = ({children, ...props}) => {
    return  (
    <DOM.StyledContainer
      $position= "absolute"
      $left= "12rem"
      $width= "calc(100% - 12rem)"
      $padding= "0.7rem"
      style={{ boxSizing: "border-box"}}
      {...props}
    >{children}
    </DOM.StyledContainer>
);
}

export default Page;