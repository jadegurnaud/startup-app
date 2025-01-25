import React from "react";
import { DOM } from "../../nanites";

const Aside = ({ children, ...props }) => {
    return (
        <DOM.StyledContainer
            display="flex"
            height="90px"
            padding="22px 40px"
            justifyContent="center"
            alignItems="center"
            borderBottom="2px solid #F2F2F2"
            backgroundColor="rgba(255, 255, 255, 0.80)"
            position="fixed"
            left="0"
            top="0"
            right="0"
            paddingHorizontal={20}
            zIndex={100}
            {...props}
        >{children}
        </DOM.StyledContainer>
    );
}

export default Aside;