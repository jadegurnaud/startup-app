import React from "react";
import { DOM } from "../../nanites";

const Page = ({ children, ...props }) => {
  return (
    <DOM.StyledContainer
      position="relative"
      top="90px"
      height="calc(100vh - 90px)"
      width="100%"
      {...props}
    >{children}
    </DOM.StyledContainer>
  );
}

export default Page;