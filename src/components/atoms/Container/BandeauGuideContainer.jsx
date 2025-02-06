import React from "react";
import { DOM } from "../../nanites";

const BandeauGuideContainer = ({children, ...props }) => {
  return (
    <DOM.StyledContainer
     height="300px" width="100%" position="relative" display= "flex" flexDirection= "column"
alignItems= "flex-start" justifyContent="space-between" backgroundSize= "cover"
backgroundImage= {`url(${props.srcCoverImage})`}
      {...props}
    >
      {children}
    </DOM.StyledContainer>
  );
}

export default BandeauGuideContainer;